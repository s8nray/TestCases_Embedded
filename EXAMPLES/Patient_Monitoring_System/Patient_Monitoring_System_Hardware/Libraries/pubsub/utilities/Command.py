""" 
Comamnd pattern based implementation

"""

from abc import ABCMeta, abstractmethod
from ast import Raise
import datetime
import time

class ICommand(metaclass = ABCMeta):
    """The command interface, that all commands will implement"""
    @staticmethod
    @abstractmethod
    def execute():
        "all command conct=rete class will implement"

class Invoker:
    "The Invoker class"
    def __init__(self):
        self._commands = {}
        self._history = []

    def register(self, command_name, command):
        self._commands[command_name] = command

    def execute(self, command_name):
        "Execute any registered command"
        if command_name in self._commands.keys():
            self._commands[command_name].execute()
            self._history.append((time.time()), command_name)
        else:
            raise ValueError(command_name)

    def show_history(self):
        for row in self._history:
            print(
                f"{datetime.fromtimestamp((row[0]).strftime('%H:%M:%S'))}"
                f": {row[1]}"
            )
        
    def replay_last(self, number_of_commands):
        "Replay the last N commands"
        commands = self._history[-number_of_commands:]
        for command in commands:
            self._commands[command[1]].execute()


