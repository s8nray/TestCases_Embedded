import json
import sys
import os
import sys
import pika

from robotremoteserver import RobotRemoteServer
my_path = os.path.dirname(__file__)
sys.path.insert(0, my_path + '\pubsub')
sys.path.insert(0, my_path + '\pubsub\core')
sys.path.insert(0, my_path + '\libraries')
from robot.api.deco import keyword

from pubsub.core.Subscriber import Subscriber
from pubsub.core.Publisher import Publisher
from pubsub.core.fastframework import FastFW
from pubsub.configuration.config import CHANNELCONFIG

try:
    basestring
except NameError:   # Python 3
    basestring = str


class fastpubsubLibrary(object):
       
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
      retVal = self.Publish(message, payload)
      return retVal.get("message")
      
   @keyword
   def setwidgetdata(self, widget, id, data):
      payload = str(id) + "/" + str(data)
      message = "Set" + "/" + widget
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
      
      
def initialize_RMQ():
    connection_parameters = pika.ConnectionParameters('localhost')

    connection = pika.BlockingConnection(connection_parameters)

    channel = connection.channel()

    channel.queue_declare(queue='request-queue')

    channel.basic_consume(queue='request-queue', auto_ack=True,
        on_message_callback=on_message_recieved)

    print("Starting Server")
    print(" [x] Awaiting RPC requests")
    channel.start_consuming()


def on_message_recieved(ch,method, properties, payload):
    data=json.loads(payload)
    data_list = [data["ip_address"], data["port"]]
    RobotRemoteServer(fastpubsubLibrary(), *data_list)


if __name__ == '__main__':
    initialize_RMQ()