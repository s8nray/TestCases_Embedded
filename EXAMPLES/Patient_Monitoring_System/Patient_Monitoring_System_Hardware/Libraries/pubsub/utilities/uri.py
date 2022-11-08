


class Uri():
    def __init__(self):
        pass

    def getTopic(self, msg):
        self.topic = msg[0].split('/')
        return self.topic[0]

    def getMessage(self, msg):
        self.message = msg[0].split('/')
        return self.message[1]

    def getPayload(self, msg):
        return msg[1]
        
    def getHandler(self, msg):
        return msg[1]
        
    