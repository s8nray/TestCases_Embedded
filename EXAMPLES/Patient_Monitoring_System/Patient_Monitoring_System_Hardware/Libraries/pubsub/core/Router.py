"""
Router routs the received message to respective subscriber via attached channel
"""
# import DefaultChannel
from asyncio.log import logger
import json
from threading import Thread
from utilities.uri import Uri
from messages import *
import ast
import time
import logging

class Router:
    def __init__(self, channel) -> None:
        self._subscribers =[]
        self._history =[]
        self.msgrec = None
        self. respMessage = None
        self._channel = channel
        self.read_thread = Thread(target=self.read)
       
    def attach(self, message_name):
        # self._subscribers[message_name] = callback
        if message_name not in self._subscribers:
            self._subscribers.append(message_name)


    def detach(self, message_name):
        """remove message from subscribed list"""
        if message_name in self._subscribers:
            self._subscribers.remove(message_name)
    
    def _execute(self, message_name):
        self._subscribers[message_name].execute()

    def show_history(self):
        return self._history

    def record(self, message):
        self._history.insert(message)

    def replay(self, number_of_last_messages):
        pass

    def route(self, msg):
        """This write message to Channel (Routes message to remote subscribers)"""
        return self._channel.write(msg)

    def startRouter(self):
        """Start reading thread"""
        # self.read_thread.start()
        pass

    def stopRouter(self):
        # self.read_thread.join()
        pass

    def dispatch(self, msg):
        """dispatch"""
        
        msgList = ast.literal_eval(msg)
        pubmessage = Uri().getMessage(msgList)
        pubtopic = Uri().getTopic(ast.literal_eval(msg))
        pubpayload = Uri().getPayload(ast.literal_eval(msg))
        self.sublistlength = len(self._subscribers)        
        for self.subcount in range(self.sublistlength):
            submessage = Uri().getMessage(self._subscribers[self.subcount])
            subtopic = Uri().getTopic(self._subscribers[self.subcount])
            subhandler = Uri().getHandler(self._subscribers[self.subcount])
            if pubmessage == submessage and pubtopic == subtopic:
                handler = eval(subhandler)
                handler().execute(pubpayload)
                self._history.append((time.time()), msg)
                break

    def channelData(self):
        return self.respMessage


    def read(self):
        while True:
            time.sleep(10)
            self.msgrec = self._channel.read()
            print("in read thread data is {}".format(self.msgrec))
            logger.debug(self.msgrec)
            if self.msgrec is not None:
                self.dispatch1(self.msgrec)
            
    def dispatch1(self, msg):
        msgList = ast.literal_eval(msg)
        message = msgList["message"]
        topic = msgList["topic"]
        if topic == "log":
            self. respMessage = message 
        
        
        
        