
"""parent class for all Channel"""

from abc import ABC, abstractmethod

class IChannel(ABC):
    def __init__(self):
        pass
    
    @abstractmethod
    def read(self):
        pass
    
    @abstractmethod   
    def write(self, msg):
        pass
    
    @abstractmethod
    def connect(self):
        pass

    @abstractmethod
    def disconnect(self):
        pass








