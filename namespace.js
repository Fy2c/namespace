    /**
    * Painless Namespace Declaration
    *
    * @param {String} namespace to be created
    * @return {Object} an object pointing to the namespace
    *
    * Example :
    *   var nsFullPath = antz.namespace('antz.module.Booking');
    *   var ui = nsFullPath.namespace('ui');
    *
    *   nsFullPath === antz.module.Booking;     // true
    *   ui === antz.module.Booking.ui;  // true
    *
    *   nsFullPath.NewClass = function(){ };
    */
    (function(nsRootName){
        'use strict';

        var rootObj = window[nsRootName] = window[nsRootName] || {};
        rootObj.namespace = runNamespace;  // in case there is an object for this.
        
        function Child(){};

        function NamespaceBuilder(nsFullPath, nsChild) {
            var nsNode = nsFullPath.split('.')
              , usesRoot = (nsNode[0] === nsRootName)
              , isGlobal = (nsNode[0] === 'window')
              , isParent = (isGlobal && nsNode[1] === 'parent') || (nsNode[0] === 'parent')
              , node = (usesRoot) ? rootObj : (isParent) ? window.parent : (isGlobal) ? window : nsChild;

            var i = (isGlobal && isParent) ? 2 : (usesRoot || isParent) ? 1 : 0;  

            for (var len = nsNode.length; i < len; i++) {
                var _node = nsNode[i];
                if(!_node) break;
                node = ( node[_node] = node[_node] || {} );
                if(typeof node[_node] !== 'object') return;
                if(!node.namespace) node.namespace = runNamespace;
            }

            return node;
        }

        function runNamespace(nsPath, importNamespace){
            var exportNamespace = NamespaceBuilder(nsPath, this);
            if(importNamespace) importNamespace(exportNamespace, NamespaceBuilder);
            return exportNamespace;
        }

    }("antz"));
