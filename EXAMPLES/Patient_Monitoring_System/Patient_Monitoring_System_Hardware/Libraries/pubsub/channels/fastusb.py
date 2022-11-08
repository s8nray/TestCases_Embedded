from core.Channel import IChannel


class FastUSB(IChannel):
    
    def read(self):
        print("Read USB")

    def write(self, msg):
        print("write usb {}".format(msg))

    def connect(self):
        pass

    def disconnect(self):
        pass
