"""Message holds header information and payload to carry"""

import json
import time


class Message:
    def __init__(self, topic_name, message_name, message_value):        
        self.timestamp = time.time()
        self.topic_name = topic_name
        self.message_name = message_name        
        self.message_payload = message_value
        
class SerializerFactory:
    def __init__(self):
        self.creators ={}

    def register_format(self, format, creator):
        self._creators[format] = creator

    def get_serializer(self, format):
        creator = self._creators.get(format)
        if not creator:
            raise ValueError(format)
        return creator





class JSONSerializer:
    def __init__(self) -> None:
        self._current_object = None

    def start_object(self, object_name, object_id)

    def serialize(self, message):
        message_info = {
            'timestamp': message.timestamp,
            'topic': message.topic_name,
            'message': message.message_name,               
            'payload': message.message_payload                
        }
        return json.dump(message_info)


