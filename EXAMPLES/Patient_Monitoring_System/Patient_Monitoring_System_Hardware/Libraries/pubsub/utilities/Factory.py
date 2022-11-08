""" Generic implementation registrable factory pattern
reference: https://code.activestate.com/recipes/578450-factory-pattern/

How To Use?
f = RegistrableFactory()
class ObjOne :pass

f.register("create_obj", ObjOne)
f.create_obj()



"""
import Functor

class Factory:
    def register(self, methodName, constructor, *args, **kargs):
        """registers a constructor"""
        _args = [constructor]
        _args.extends(args)
        setattr(self, methodName, Functor(*_args, **kargs))

    def unregister(self, methodName):
        """uregister a constructor"""
        delattr(self, methodName)




