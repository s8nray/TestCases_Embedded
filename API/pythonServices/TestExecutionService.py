import os,pika,json
import tempfile
from robot import run
from robot.api import ResultVisitor,ExecutionResult
import datetime, git

class Appconfig:
    project_path=''
    result_location=''
    env_browser=''
    run_output={}
    destination_path=''
    url=''
    branch=''
    userid=''
    projectid=''

class TestMetrics(ResultVisitor):                       
    def __init__(self,test_list):
        self.test_list=test_list

    def visit_test(self,test):

        data={"suiteName":test.parent.name,"testName":test.name,
        "testPass":1 if test.status== "PASS" else 0,
        "testFail":0 if test.status== "PASS" else 1,
        "testStatus":test.status,
        # "error":"" if test.status == "PASS" else "Failed because",
        "testStarttime" :test.starttime,
        "testEndtime":test.endtime,
        "testElapsedtime (Sec)":test.elapsedtime/float(1000),
	    "testMessage":test.message}
        self.test_list.append(data)
#Robot Listener for real time log
class ScriptStatus():
    PASSED = "Passed"
    FAIL = "Failed"
    SKIPPED = 'SKIP'

class TestRunnerAgent:
    data={}
    total_test=0
    numbertest=0
    percent=0
    log_msg={}
    ROBOT_LISTENER_API_VERSION = 2
    MAX_VARIABLE_VALUE_TEXT_LENGTH = 2048


    def start_test(self, name, attrs):

        log_msg={'Test_Started':name,'starttime':attrs['starttime']}

        channel.basic_publish('',routing_key='listener-queue',body=json.dumps(log_msg))

    def end_test(self,name,attrs):

        if attrs['status']=='PASS':
            msg='Test Passed'
        else:
            msg=attrs['message']

        TestRunnerAgent.numbertest=TestRunnerAgent.numbertest+1
        
        
        status = ScriptStatus.PASSED if attrs['status'] == 'PASS' else ScriptStatus.FAIL
        name=attrs['originalname']
        if attrs['status'] == 'PASS':
            status = ScriptStatus.PASSED
        elif attrs['status'] == 'SKIP':
            status = ScriptStatus.SKIPPED
        else:
            status = ScriptStatus.FAIL
        
        infoDict={"Test_ended":name,"status":status,"endtime":attrs['endtime'],"message":msg}
        channel.basic_publish('',routing_key='listener-queue',body=json.dumps(infoDict))
        TestRunnerAgent.data=infoDict

    def start_keyword(self,name, attrs):
        msg='START KEYWORD %s with arguments %s' % (name, attrs['args'])
        channel.basic_publish('',routing_key='listener-queue',body=json.dumps(msg))
    
    def end_keyword(self,name, attrs):
        msg='END KEYWORD %s with arguments %s' % (name, attrs['args'])
        channel.basic_publish('',routing_key='listener-queue',body=json.dumps(msg))

def pull_repo():

   

    """Raise pull request"""
    # Create temporary dir

    date_stamp=datetime.datetime.now().strftime('%Y-%m-%d_%H-%M-%S')
    # tempfile.tempdir = "D:\\Azure_code_base\\Temp_folder"
    Appconfig.destination_path = tempfile.mkdtemp(prefix='test_'+date_stamp)
    # Clone into temporary dir
    

    print("pulling from repository***")
    print("Appconfig.url***  ",Appconfig.url)
    print("Appconfig.destination_path***  ",Appconfig.destination_path)
    print("Appconfig.branch***  ",Appconfig.branch)
    # msg='Getting Details from Repo'
    # channel.basic_publish('',routing_key='testexecution-response-queue',body=json.dumps(msg))
    git.Repo.clone_from(Appconfig.url, Appconfig.destination_path, branch=Appconfig.branch, depth=1)   

def run_test(data):
    variable_list=[]
    
    date_stamp=datetime.datetime.now().strftime('%Y-%m-%d_%H-%M-%S')
    mydir = os.path.join(os.getcwd(), 'result_'+ date_stamp)
    os.makedirs(mydir)
    test_list=data['SelectedTestCases']
    Appconfig.result_location=mydir
    TestRunnerAgent.total_test=len(test_list)
    #variable_list.append('remote_url:{}'.format('http://localhost:4444/wd/hub'))
    #variable_list.append('ENV_Browser:{}'.format(Appconfig.env_browser))
    for test_dict in test_list:
        print("test_dict:  ",test_dict)
        for subdir, dirs, files in os.walk(Appconfig.destination_path):
            for filename in files:
                if filename == test_dict['FileName']:
                    filepath = subdir + os.sep + filename                         #filepath--> test suite path
                    #run(filepath,test=test_dict['TestName'],log=None,report=None,output=test_dict['TestName'],variable=variable_list,listener=TestRunnerAgent())  #run robot

                    run(filepath,test=test_dict['TestName'],debugfile=test_dict['TestName'],log=None,report=None,outputdir=mydir,output=test_dict['TestName'],listener=TestRunnerAgent())  #run robot
    
    print("Result location:  ",mydir)
    os.system('rebot --name suite --log merged_log --report merged_report --outputdir ' +mydir+' --output merged '+mydir+'\\*xml')
    return 'Execution Completed'


#getting the test Metrics from the merged xml file
def output_metrics():
    suite_list=[]
    test_list=[]
    
    for subdir, dirs, files in os.walk(Appconfig.result_location):
        for filename in files:
            filepath = subdir + os.sep + filename
            if filepath.endswith("merged.xml"):
                result = ExecutionResult(filepath)
                result.configure
                stats=result.statistics
                cntTest=stats.total.failed + stats.total.passed
                result.visit(TestMetrics(test_list))
                #code just for demo need to review, grouping suites together with total passed and failed
                empty={}
                for i in test_list:
                    name=i["suiteName"]
                    empty[name]={"totalPassed":0,"totalFailed":0,"suiteName":name}
                for i in test_list:
                    name=i["suiteName"]
                    if name in empty:
                        empty[name]['totalPassed']+=i["testPass"]
                        empty[name]['totalFailed']+=i['testFail']
                for i in empty.values():
                    i['totalTest']=i['totalPassed']+i['totalFailed']
                    suite_list.append(i)
                report_path=os.path.join(Appconfig.result_location,'merged_report.html')
                log_path=os.path.join(Appconfig.result_location,'merged_log.html')
                data={'userID':Appconfig.userid,'projectID':Appconfig.projectid,'reportPath':report_path,'logPath':log_path,'outputDestination':Appconfig.result_location,'totalTests':cntTest,'totalPassed':stats.total.passed,'totalFailed':stats.total.failed,'suiteInfo':suite_list,'passPercentage':((stats.total.passed/cntTest)*100),'testcaseInfo':test_list}
                return data
    

def on_request_message_received(ch,method, properties, payload):
    data=json.loads(payload)
    print("data from frontend: ",data)
    # Appconfig.url=data['url']
    # Appconfig.branch=data['branch']
    Appconfig.url=data['RepoURL']
    Appconfig.branch=data['Branch']
    Appconfig.userid=data['UserID']
    Appconfig.projectid=data['ProjectID']
    pull_repo()
    info=run_test(data)

    print("Run test successful: ",info)

    ch.basic_publish('', routing_key='testexecution-response-queue', body=json.dumps(info))
    out_data=output_metrics()
    ch.basic_publish('', routing_key='testexecution-response-queue', body=json.dumps(out_data))
    print('Response Published to testexecution-response-queue')


connection_parameters = pika.ConnectionParameters('localhost',heartbeat=1000)

connection = pika.BlockingConnection(connection_parameters)

channel = connection.channel()
channel.queue_declare(queue='testexecution-response-queue')

channel.queue_declare(queue='testexecution-request-queue')

channel.queue_declare(queue='listener-queue')

channel.basic_consume(queue='testexecution-request-queue', auto_ack=True,
    on_message_callback=on_request_message_received)

print("Starting Test Execution Service")


channel.start_consuming()