    /**
    * Painless Namespace Declaration
    *
    * @param {String} namespace to be created
    * @return {Object} an object pointing to the namespace
    *
    * Example :
    *   var ns = antz.namespace('antz.module.Booking');
    *   var ui = ns.namespace('ui');
    *
    *   ns === antz.module.Booking;     // true
    *   ui === antz.module.Booking.ui;  // true
    *
    *   ns.NewClass = function(){ };
    */
    (function(path){
        'use strict';

        var root_obj = window[path] = window[path] || {};
        root_obj.namespace = runNamespace;  // no point in creating a new Child Instance for this.
        
        function Child(){};

        function importNamespace(ns, ns_child) {
            var parts = ns.split('.')
              , namespace = (parts[0] === path) ? root_obj : (ns_child || root_obj);

            var i = (parts[0] === path)? 1 : 0;

            for (var len = parts.length; i < len; i++) {
                var _child = parts[i];
                if(!_child) break;
                namespace = ( namespace[_child] = namespace[_child] || new Child() );
            }

            return namespace;
        }

        function runNamespace(ns_string, get_ns){
            var exportNamspace = importNamespace(ns_string, this);
            if(get_ns) get_ns(exportNamspace, importNamespace);
            return exportNamspace;
        }

        Child.prototype.namespace = runNamespace

    }("antz"));
