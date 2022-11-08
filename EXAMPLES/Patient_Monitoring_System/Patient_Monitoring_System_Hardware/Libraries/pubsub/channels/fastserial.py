from core.Channel import IChannel

class FastSerial(IChannel): 
    def __init__(self):
       pass

    def read(self):
        print("Read serial")

    def write(self, msg):
        print("write serial {}".format(msg))
        self.sendData(msg)

    def sendData(data):
        data += "\r\n"

    def connect(self):
        pass

    def disconnect(self):
        pass
        

