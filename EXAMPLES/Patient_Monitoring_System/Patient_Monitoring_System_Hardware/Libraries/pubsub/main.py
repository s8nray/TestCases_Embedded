
from core.Router import Router
from core.Subscriber import Subscriber
from core.Publisher import Publisher
from configuration.config import CHANNELCONFIG
from core.fastframework import FastFW


if __name__ == '__main__':
    Channel = FastFW().SetupCommunicationChannel(CHANNELCONFIG);
    Router = FastFW().SetupRouter(Channel);
    subscriber = Subscriber().getInstance()
    subscriber.setRouter(Router)
    publisher = Publisher().getInstance()
    publisher.setRouter(Router)
    subscriber.subscribe("keypad/click", "Click")
    subscriber.subscribe("keypad/drag", "Drag")
    Router.startRouter()
    # publisher.publish("keypad/click","enterkey");
    # publisher.publish("keypad/drag","mouse");
    
    
    
