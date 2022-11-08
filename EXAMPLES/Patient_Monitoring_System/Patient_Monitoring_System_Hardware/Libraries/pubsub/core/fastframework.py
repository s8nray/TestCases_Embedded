from pubsub.channels.fastserial import FastSerial
from pubsub.channels.fastsocket import FastSocket
from pubsub.channels.fastusb import FastUSB
# from PubSub.commands.fastcmd.commandrepository import CommandRepo
#from pubsub.messages import Click, Drag
from core.Router import Router



class FastFW():
    def __init__(self):
        pass

    def SetupCommunicationChannel(self, channel):
        if channel == 'USB':
            ChannelObject = FastUSB()
        elif channel == 'SERIAL':
            ChannelObject = FastSerial()
        elif channel == 'SOCKET':
            ChannelObject = FastSocket()
        else:
            pass
        return ChannelObject

    def SetupRouter(self, channel):
        return Router(channel)
    
    