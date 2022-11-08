import sys
sys.path.insert(0, 'D:\Test_Framework\code\Robo_demo\Embedded_Service\pubsub')
sys.path.insert(0, 'D:\Test_Framework\code\Robo_demo\Embedded_Service\pubsub\core')
from robot.api.deco import keyword
from core.Subscriber import Subscriber
from core.Publisher import Publisher
from core.fastframework import FastFW
from configuration.config import CHANNELCONFIG


class fastpubsubLibrary:
       
   ROBOT_LIBRARY_SCOPE = 'SUITE'

   # def __init__(self):
      # self.Channel = FastFW().SetupCommunicationChannel(CHANNELCONFIG);
      # Router = FastFW().SetupRouter(self.Channel);
      # self.subscriber = Subscriber().getInstance()
      # self.subscriber.setRouter(Router)
      # self.publisher = Publisher().getInstance()
      # self.publisher.setRouter(Router)
      # self.subscriber.subscribe("keypad/click", "Click")
      # self.subscriber.subscribe("keypad/drag", "Drag")
      # Router.startRouter()

   
   @keyword
   def Connect(self, channel):
      """ Connect to client
        `port` broker port (default 1883)
        `client_id` if not specified, a random id is generated
      """
      self.Channel = FastFW().SetupCommunicationChannel(channel);
      self.Channel.connect()
      self.Router = FastFW().SetupRouter(self.Channel);
      self.subscriber = Subscriber().getInstance()
      self.subscriber.setRouter(self.Router)
      self.publisher = Publisher().getInstance()
      self.publisher.setRouter(self.Router)
      # self.subscriber.subscribe("keypad/click", "Click")
      # self.subscriber.subscribe("keypad/drag", "Drag")
      self.Router.startRouter()
      

   @keyword
   def click(self, widget, id):
      payload = str(id)  
      message = "Click" + "/" + widget
      return self.Publish(message, payload)


   @keyword
   def getwidgetdata(self, widget, id):
      payload = str(id)  
      message = "Get" + "/" + widget
      return self.Publish(message, payload)

   @keyword
   def getchanneldata(self):
      return self.Router.channelData()

   @keyword
   def subscribe(self, topic, handler):
      """ Subscribe to a topic 
      `topic` topic to subscribe
      e.g. "keypad/click", "Click" 
      """
      self.subscriber.subscribe(topic, handler)
      

   
   def Publish(self, topic, message=None):
      """ Publish a message to a topic with specified qos.
        It is required that a connection has been established using `Connect`
        keyword before using this keyword.
        `topic` topic to which the message will be published
        `message` message payload to publish
      #   
        """
      return self.publisher.publish(topic, message)
 
   @keyword
   def listen(self, topic, timeout=1):
      """ Listen to a topic and return a list of message payloads received
            within the specified time. 
        `topic` topic to listen to
        `timeout` duration to listen
        """
      #   
      pass
 
   @keyword
   def unsubscribe(self, topic):
      """ Unsubscribe the specified topic.
        `topic` topic to unsubscribe from
      """
      self.subscriber.unSubscribe(topic)

   @keyword
   def disconnect(self):
      """ Disconnect 
      """     
      self.Channel.disconnect()