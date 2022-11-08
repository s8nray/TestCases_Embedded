from abc import ABCMeta, abstractmethod

class CommandRepo():
      __instance = None
      @staticmethod
      def getInstance():
         """ Static access method. """
         if CommandRepo.__instance == None:
            CommandRepo()
         return CommandRepo.__instance

      def __init__(self):
         """ Virtually private constructor. """
         self.mcommands = []
         if CommandRepo.__instance != None:
            raise Exception("This class is a singleton!")
         else:
            CommandRepo.__instance = self


      # def __init__(self):
      #        self.mcommands = {}

      def register(self, command, handler):
            "Register commands in the Invoker"
            # self._commands[command_name] = command
            # self.mcommands.__setitem__(commandname, command)
            list = [command, handler]
            self.mcommands.append(list)
            print(self.mcommands)

         # @staticmethod
         # @abstractmethod      
      def execute(self):
         pass

      #  @staticmethod 
      def pressKey(payload):
         pass

      #  @staticmethod 
      def releasekey(payload):
         pass
      
      # @abstractmethod 
      def pressandhold(payload):
         pass


