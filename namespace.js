    /**
    * Painless Namespace Declaration
    *
    * @param {String} namespace to be created
    * @return {Object} an object pointing to the namespace
    * 
    * Example :
    *   var ns = antz.namespace('antz.module.Booking');
    *   ns === antz.module.Booking;  // true
    *
    *   ns.NewClass = function(){ };
    */
      (function(path){
        'use strict';

        var root_obj = eval("window."+path+" = window."+path+" || {}");

        function Child(){};

        if(root_obj)
            Child = root_obj.constructor;
        else
            root_obj = new Child();

        function importNamespace(ns) { 
            var parts = ns.split('.')
              , namespace = root_obj;

            var i = (parts[0] === path)? 1 : 0; 

            for (var len = parts.length; i < len; i++) {
                var _child = parts[i];
                if(!_child) break;
                namespace = ( namespace[_child] = namespace[_child] || new Child() );
            }

            return namespace; 
        }

        Child.prototype.namespace = function(ns_string, get_ns){
            var exportNamspace = importNamespace(ns_string);
            if(get_ns) get_ns(exportNamspace, importNamespace);
            return exportNamspace;
        }

    }("antz"));