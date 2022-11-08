from time import sleep
from core.Channel import IChannel
import socket
import json


class FastSocket(IChannel): 
    def __init__(self):
        # global objServerSocket
        # objServerSocket = socket.socket()         # Create a socket object
        # host = socket.gethostname() # Get local machine name
        # port = 12345                # Reserve a port for your service.
        # objServerSocket.bind((host, port))        # Bind to the port
        # objServerSocket.listen(5)                 # Now wait for client connection.
        # global msg
        pass

    def read(self):
        # print("Read Socket")
        # return self.msg
        # self.objClientSocket = socket.socket()         # Create a socket object
        # host = '0.0.0.0' #socket.gethostname() # Get local machine name
        # port = 4795            # Reserve a port for your service.
        # self.objClientSocket.bind((host, port))        # Bind to the port
        # self.objClientSocket.listen(5)
        # self.objClientSocket.connect((host, port))
        # recData = self.objClientSocket.recv(1024)
        # recData = recData.decode('utf-8','ignore')
        # print("received data {}".format(recData))
        # objClientSocket.close
        # return (recData)
        # recData = self.objServerSocket.recv(1024)
        # recData = recData.decode('utf-8','ignore').strip().strip('\x00')
        # recData.rstrip('\x00')
        # return recData
        pass

    def write(self, msg):
        # while True:
            print("write Socket {}".format(msg))
            
            # connection, addr = self.objServerSocket.accept()     # Establish connection with client.
            # print ('Got connection from', addr)
            output = msg
            self.objServerSocket.sendall(str((output)).encode('utf-8'))
            # self.objServerSocket.close()                # Close the connection
            # self.msg = msg
            # break
            #sleep(10)
            #recData = "{\"message\":\"Set prompt with : 150\",\"topic\":\"log\"}" 
            recData = self.objServerSocket.recv(1024)  

            recData = recData.decode('utf-8','ignore').strip().strip('\x00')
            
            recData.rstrip('\x00')            

            temp = json.loads(recData)
            #temp = {"message":"Text is : 150","topic":"log"}
            return temp
            
            
        
    def connect(self):
        self.objServerSocket = socket.socket()         # Create a socket object
        host = '192.168.0.2'    #socket.gethostname() # Get local machine name
        port = 8080              # Reserve a port for your service.
        # self.objServerSocket.bind((host, port))        # Bind to the port
        # self.objServerSocket.listen(5)
        self.objServerSocket.connect((host, port))

    def disconnect(self):
         self.objServerSocket.close