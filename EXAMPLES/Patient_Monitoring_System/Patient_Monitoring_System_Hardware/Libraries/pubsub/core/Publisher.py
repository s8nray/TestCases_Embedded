import json
class Publisher():
    __instance = None
    
    @staticmethod 
    def getInstance():
      """ Static access method. """
      if Publisher.__instance == None:
         Publisher()
      return Publisher.__instance

    def __init__(self):
      """ Virtually private constructor. """
      self.router  = None
      if Publisher.__instance != None:
         raise Exception("This class is a singleton!")
      else:
         Publisher.__instance = self

    def setRouter(self, router):
        self.router = router
 
    def publish(self, msgName, payload):
        # msg1 = [msgName, payload ]
        msgDict = {'topic': msgName, "payload": payload}
        msgRoute = json.dumps(msgDict)
        return self.router.route(msgRoute)

    def broadcast(self):
        self.router.broadcast

    def post(self):
        self.router.post
