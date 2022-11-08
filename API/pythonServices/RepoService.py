
from abc import ABC, abstractmethod
import datetime
import json
import tempfile
import git, os
import pika
from robot.api import TestSuiteBuilder
# global destination_path
class const:
    destination_path=''
    git_info={}
    url=''
    branch=''
    projectID=''
    userId=''

class rabbit:
    def on_message_recieved_server(ch,method, properties, payload):
        print('messsage received')
        data=json.loads(payload)
        const.url=data['RepoURL']
        const.branch=data['Branch']
        const.projectID=data['ProjectID']
        const.userId=data['UserID']
        TestCaseParser().get_test_case_info(testRepoObj,ch,properties)

class ITestRepository(ABC):
    def __init__(self):
        pass

    @abstractmethod
    def pull(self):
        pass
    
    @abstractmethod   
    def get_statistics(self, msg):
        pass
    
    def get_connection_status():
        """Get connection status"""
        pass

    def connect(self):
        """Connect to repo"""
        pass;

    def disconnect():
        """Disconnect from repo"""
        pass

class TestRepositoryFactory():
    @staticmethod
    def get_repository(repoName):
        """Get repo"""
        if repoName == 'GIT':
            repoObj = GitRepository()
        elif repoName == "SCM":
             repoObj = SCMRepository()
        return repoObj

class TestCaseParser():

    def get_test_case_info(self, testRepoObj,ch,properties):
        """Get repo info"""
        print("""Get repo info""")
        
        testRepoObj.pull()
        proj_data=[]
        for subdir, dirs, files in os.walk(const.destination_path):
            for filename in files:

                filepath = subdir + os.sep + filename

                if filepath.endswith(".robot"):
                    suite = TestSuiteBuilder().build(filepath)
                    #proj_dict["Source"]=filepath
                    test_list=[]
                    for test in suite.tests:
                        test_case_dict={'ID':test.id,'name':test.name,'tag':str(test.tags),'doc':test.doc}
                        test_list.append(test_case_dict)

                    temp_dict = {'projectId':const.projectID,'userId':const.userId,'suiteName':os.path.basename(subdir),'scriptName':filename, 'testCases':test_list}
                    proj_data.append(temp_dict)
        
        git_data=testRepoObj.get_statistics()
        proj_data.append(git_data)
        print('before publishing the response: ',proj_data)
        ch.basic_publish('', routing_key="testcases-response-queue", body=json.dumps(proj_data))
        print('Response Published to testcases-response-queue')
    def initialize_RMQ():
        connection_parameters = pika.ConnectionParameters('localhost',heartbeat=1000)

        connection = pika.BlockingConnection(connection_parameters)

        channel = connection.channel()

        channel.queue_declare(queue='testcases-request-queue')

        channel.queue_declare(queue='testcases-response-queue')
        
        channel.basic_consume(queue='testcases-request-queue', auto_ack=True,
            on_message_callback=rabbit.on_message_recieved_server)

        print("Starting Repo Service")
        print(" [x] Awaiting requests")

        channel.start_consuming()
        

class GitRepository(ITestRepository):
    def __init__(self):
        pass

    def pull(self):
        """Raise pull request"""
        # Create temporary dir
        date_stamp=datetime.datetime.now().strftime('%Y-%m-%d_%H-%M-%S')
        #tempfile.tempdir = "D:\\Azure_code_base\\Temp_folder"
        const.destination_path = tempfile.mkdtemp(prefix='test_'+date_stamp)
        # Clone into temporary dir
        # url_='https://smartsols@dev.azure.com/smartsols/MTH/_git/FAST'
        git.Repo.clone_from(const.url, const.destination_path, branch=const.branch, depth=1)

    
    def get_statistics(self):
        """Get repo statistics"""
        repo = git.Repo(const.destination_path)
        commits = list(repo.iter_commits())
        git_info={'author':commits[0].author.name,'date':commits[0].committed_datetime.strftime('%Y-%m-%d_%H-%M-%S')}
        return git_info
    

class SCMRepository(ITestRepository):
    def __init__(self):
        pass

    def pull(self):
        """Raise pull request"""
        return 0
    
    def get_statistics(self, msg):
        """Get repo statistics"""
        pass
    

if __name__ == '__main__':
    
    config = "GIT"
    testRepoObj = TestRepositoryFactory().get_repository(config)
    testRepoObj.connect()
    TestCaseParser.initialize_RMQ()
    


