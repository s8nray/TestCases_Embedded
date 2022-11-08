class Subscriber():
    __instance = None
    
    @staticmethod 
    def getInstance():
      """ Static access method. """
      if Subscriber.__instance == None:
         Subscriber()
      return Subscriber.__instance

    def __init__(self):
      """ Virtually private constructor. """
      self.router = None
      if Subscriber.__instance != None:
         raise Exception("This class is a singleton!")
      else:
         Subscriber.__instance = self

    def setRouter(self, router):
        self.router = router

    def subscribe(self, msgTopic, msgHandler) :
        list = [msgTopic, msgHandler]
        self.router.attach(list)

    def unSubscribe(self, msgTopic):
        print("UnSubscribed to {}".format(msgTopic))
        self.router.detach(msgTopic)

       