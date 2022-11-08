import sys
import os
from robot.api.deco import keyword



class widgetmapLibrary:
       
   ROBOT_LIBRARY_SCOPE = 'TEST'

   @keyword
   def getxcoordinate(self, screen,  widget):
      """ Get X coordinate
      """     
      widgetinfo = str(screen) + "." + str(widget)
      x, y = self.getxycoordinate(widgetinfo)
      return x


   @keyword
   def getycoordinate(self, screen, widget):
      """ Get Y coordinate 
      """     
      widgetinfo = str(screen) + "." + str(widget)
      x, y = self.getxycoordinate(widgetinfo)
      return y

   def getxycoordinate(self, widget):
      """ Get xy coordinates from map file
      """
      widgetmap = self.parsepyfile("D:\\Test_Framework\\code\\Robo_demo\\Embedded_Service\\pubsub\\utilities\\fastpubsubLibrary\\widgetmapfile.py")
      # widgetname is a string as screenname.widgetname so split the string to get the name of the widget
      if widget and "." in widget:
         screen, widget = widget.split(".")
         dctwidget = widgetmap.widgets[screen][widget]
         # Calculate width and height based on top and bottom properties
         width = int(dctwidget.get("right", 0)) - int(dctwidget.get("left", 0))
         height = int(dctwidget.get("bottom", 0)) - int(dctwidget.get("top", 0))
         # Calculate the coordinates to click
         return (int(dctwidget.get("left", 0)) +
                        (width // 2), int(dctwidget.get("top", 0)) + (height // 2))  # Used in new widget map

      else:
         pass

   @staticmethod
   def parsepyfile(config, config_path=None):
      """
      Purpose: Parse given config file.
            Input:
            config - file name to parse
            config_path - File path
            Return: Returns the imported file.
      """
      if config:
         if config_path:
            sys.path.append(config_path)
         if ".py" in config:
            if os.path.dirname(config):
               sys.path.append(os.path.dirname(config))
               return __import__(os.path.basename(config).strip('.py'))
            return __import__(config.strip('.py'))
         else:
            return __import__(config)

      else :
         pass