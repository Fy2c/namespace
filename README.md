Namespace
=========

This is designed to create namespace painlessly, while it will also helps in avoiding code not being loaded within different namespace, like the example shown below.

```javascript
    // this will run in parsing phrase
    function Module(){ };
    
    // this will run in runtime
    var Module = function(){};
    
    //by using namespace require we can avoid script like the following:
    var Module = (function(){})();
```

Basic usage
------------

```javascript
    // beware ns existed within the global scope.
    var ns = antz.namespace('antz.module.Booking');
    ns === antz.module.Booking;  // true
    
    ns.NewClass = function(){ };
```

Dependency usage
----------------

```javascript
    // Base model
    // =========================================
    antz.namespace('antz.model.base', function(exports, require){

        var Class = exports.NewClass = function(){
            this.hello = "Hello world, ";
        }
    
        Class.prototype.SayHello = function(){
            return this.hello;
        }
        
        var secret = "can't touch me!"
        Class.prototype.GetSecret = function(){
            return secret;
        }
    });
    
    // Import/Require model.base namespace
    // ===========================================
    antz.namespace('module.schedule', function(exports, require){

        // the usage of antz is optional.
        var modelBase = require('model.base'); 

        exports.newFunction = function(){
            var plugin = new modelBase.NewClass();
            return plugin.SayHello() + plugin.GetSecret();
        }
    });

    antz.module.schedule.newFunction()  // "Hello World, can't touch me!"
    
```

Nested namespace usage
----------------------
```javascript

    // Import/Require model.base namespace
    // ===========================================
    var schedule = antz.namespace('module.schedule');
    var scheduleUI = schedule.namespace('ui');
    
    schedule === antz.module.schedule;      // true
    scheduleUI === antz.module.schedule.ui  //true
    
```
