"format global";
(function (global) {
  var babelHelpers = global.babelHelpers = {};

  babelHelpers.inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  babelHelpers.defaults = function (obj, defaults) {
    var keys = Object.getOwnPropertyNames(defaults);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = Object.getOwnPropertyDescriptor(defaults, key);

      if (value && value.configurable && obj[key] === undefined) {
        Object.defineProperty(obj, key, value);
      }
    }

    return obj;
  };

  babelHelpers.createClass = (function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();

  babelHelpers.createDecoratedClass = (function () {
    function defineProperties(target, descriptors, initializers) {
      for (var i = 0; i < descriptors.length; i++) {
        var descriptor = descriptors[i];
        var decorators = descriptor.decorators;
        var key = descriptor.key;
        delete descriptor.key;
        delete descriptor.decorators;
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor || descriptor.initializer) descriptor.writable = true;

        if (decorators) {
          for (var f = 0; f < decorators.length; f++) {
            var decorator = decorators[f];

            if (typeof decorator === "function") {
              descriptor = decorator(target, key, descriptor) || descriptor;
            } else {
              throw new TypeError("The decorator for method " + descriptor.key + " is of the invalid type " + typeof decorator);
            }
          }

          if (descriptor.initializer !== undefined) {
            initializers[key] = descriptor;
            continue;
          }
        }

        Object.defineProperty(target, key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers);
      if (staticProps) defineProperties(Constructor, staticProps, staticInitializers);
      return Constructor;
    };
  })();

  babelHelpers.createDecoratedObject = function (descriptors) {
    var target = {};

    for (var i = 0; i < descriptors.length; i++) {
      var descriptor = descriptors[i];
      var decorators = descriptor.decorators;
      var key = descriptor.key;
      delete descriptor.key;
      delete descriptor.decorators;
      descriptor.enumerable = true;
      descriptor.configurable = true;
      if ("value" in descriptor || descriptor.initializer) descriptor.writable = true;

      if (decorators) {
        for (var f = 0; f < decorators.length; f++) {
          var decorator = decorators[f];

          if (typeof decorator === "function") {
            descriptor = decorator(target, key, descriptor) || descriptor;
          } else {
            throw new TypeError("The decorator for method " + descriptor.key + " is of the invalid type " + typeof decorator);
          }
        }
      }

      if (descriptor.initializer) {
        descriptor.value = descriptor.initializer.call(target);
      }

      Object.defineProperty(target, key, descriptor);
    }

    return target;
  };

  babelHelpers.defineDecoratedPropertyDescriptor = function (target, key, descriptors) {
    var _descriptor = descriptors[key];
    if (!_descriptor) return;
    var descriptor = {};

    for (var _key in _descriptor) descriptor[_key] = _descriptor[_key];

    descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined;
    Object.defineProperty(target, key, descriptor);
  };

  babelHelpers.taggedTemplateLiteral = function (strings, raw) {
    return Object.freeze(Object.defineProperties(strings, {
      raw: {
        value: Object.freeze(raw)
      }
    }));
  };

  babelHelpers.taggedTemplateLiteralLoose = function (strings, raw) {
    strings.raw = raw;
    return strings;
  };

  babelHelpers.toArray = function (arr) {
    return Array.isArray(arr) ? arr : Array.from(arr);
  };

  babelHelpers.toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  babelHelpers.slicedToArray = (function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  })();

  babelHelpers.slicedToArrayLoose = function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      var _arr = [];

      for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
        _arr.push(_step.value);

        if (i && _arr.length === i) break;
      }

      return _arr;
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };

  babelHelpers.objectWithoutProperties = function (obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  };

  babelHelpers.hasOwn = Object.prototype.hasOwnProperty;
  babelHelpers.slice = Array.prototype.slice;
  babelHelpers.bind = Function.prototype.bind;

  babelHelpers.defineProperty = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  babelHelpers.asyncToGenerator = function (fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        var callNext = step.bind(null, "next");
        var callThrow = step.bind(null, "throw");

        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            Promise.resolve(value).then(callNext, callThrow);
          }
        }

        callNext();
      });
    };
  };

  babelHelpers.interopExportWildcard = function (obj, defaults) {
    var newObj = defaults({}, obj);
    delete newObj["default"];
    return newObj;
  };

  babelHelpers.interopRequireWildcard = function (obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj["default"] = obj;
      return newObj;
    }
  };

  babelHelpers.interopRequireDefault = function (obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  };

  babelHelpers._typeof = function (obj) {
    return obj && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  babelHelpers._extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  babelHelpers.get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  babelHelpers.set = function set(object, property, value, receiver) {
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent !== null) {
        set(parent, property, value, receiver);
      }
    } else if ("value" in desc && desc.writable) {
      desc.value = value;
    } else {
      var setter = desc.set;

      if (setter !== undefined) {
        setter.call(receiver, value);
      }
    }

    return value;
  };

  babelHelpers.newArrowCheck = function (innerThis, boundThis) {
    if (innerThis !== boundThis) {
      throw new TypeError("Cannot instantiate an arrow function");
    }
  };

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  babelHelpers.objectDestructuringEmpty = function (obj) {
    if (obj == null) throw new TypeError("Cannot destructure undefined");
  };

  babelHelpers.temporalUndefined = {};

  babelHelpers.temporalAssertDefined = function (val, name, undef) {
    if (val === undef) {
      throw new ReferenceError(name + " is not defined - temporal dead zone");
    }

    return true;
  };

  babelHelpers.selfGlobal = typeof global === "undefined" ? self : global;
  babelHelpers.typeofReactElement = typeof Symbol === "function" && Symbol["for"] && Symbol["for"]("react.element") || 60103;

  babelHelpers.defaultProps = function (defaultProps, props) {
    if (defaultProps) {
      for (var propName in defaultProps) {
        if (typeof props[propName] === "undefined") {
          props[propName] = defaultProps[propName];
        }
      }
    }

    return props;
  };

  babelHelpers._instanceof = function (left, right) {
    if (right != null && right[Symbol.hasInstance]) {
      return right[Symbol.hasInstance](left);
    } else {
      return left instanceof right;
    }
  };

  babelHelpers.interopRequire = function (obj) {
    return obj && obj.__esModule ? obj["default"] : obj;
  };
})(typeof global === "undefined" ? self : global);

(function(global) {

  var defined = {};

  // indexOf polyfill for IE8
  var indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++)
      if (this[i] === item)
        return i;
    return -1;
  }

  var getOwnPropertyDescriptor = true;
  try {
    Object.getOwnPropertyDescriptor({ a: 0 }, 'a');
  }
  catch(e) {
    getOwnPropertyDescriptor = false;
  }

  var defineProperty;
  (function () {
    try {
      if (!!Object.defineProperty({}, 'a', {}))
        defineProperty = Object.defineProperty;
    }
    catch (e) {
      defineProperty = function(obj, prop, opt) {
        try {
          obj[prop] = opt.value || opt.get.call(obj);
        }
        catch(e) {}
      }
    }
  })();

  function register(name, deps, declare) {
    if (arguments.length === 4)
      return registerDynamic.apply(this, arguments);
    doRegister(name, {
      declarative: true,
      deps: deps,
      declare: declare
    });
  }

  function registerDynamic(name, deps, executingRequire, execute) {
    doRegister(name, {
      declarative: false,
      deps: deps,
      executingRequire: executingRequire,
      execute: execute
    });
  }

  function doRegister(name, entry) {
    entry.name = name;

    // we never overwrite an existing define
    if (!(name in defined))
      defined[name] = entry;

    // we have to normalize dependencies
    // (assume dependencies are normalized for now)
    // entry.normalizedDeps = entry.deps.map(normalize);
    entry.normalizedDeps = entry.deps;
  }


  function buildGroups(entry, groups) {
    groups[entry.groupIndex] = groups[entry.groupIndex] || [];

    if (indexOf.call(groups[entry.groupIndex], entry) != -1)
      return;

    groups[entry.groupIndex].push(entry);

    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
      var depName = entry.normalizedDeps[i];
      var depEntry = defined[depName];

      // not in the registry means already linked / ES6
      if (!depEntry || depEntry.evaluated)
        continue;

      // now we know the entry is in our unlinked linkage group
      var depGroupIndex = entry.groupIndex + (depEntry.declarative != entry.declarative);

      // the group index of an entry is always the maximum
      if (depEntry.groupIndex === undefined || depEntry.groupIndex < depGroupIndex) {

        // if already in a group, remove from the old group
        if (depEntry.groupIndex !== undefined) {
          groups[depEntry.groupIndex].splice(indexOf.call(groups[depEntry.groupIndex], depEntry), 1);

          // if the old group is empty, then we have a mixed depndency cycle
          if (groups[depEntry.groupIndex].length == 0)
            throw new TypeError("Mixed dependency cycle detected");
        }

        depEntry.groupIndex = depGroupIndex;
      }

      buildGroups(depEntry, groups);
    }
  }

  function link(name) {
    var startEntry = defined[name];

    startEntry.groupIndex = 0;

    var groups = [];

    buildGroups(startEntry, groups);

    var curGroupDeclarative = !!startEntry.declarative == groups.length % 2;
    for (var i = groups.length - 1; i >= 0; i--) {
      var group = groups[i];
      for (var j = 0; j < group.length; j++) {
        var entry = group[j];

        // link each group
        if (curGroupDeclarative)
          linkDeclarativeModule(entry);
        else
          linkDynamicModule(entry);
      }
      curGroupDeclarative = !curGroupDeclarative; 
    }
  }

  // module binding records
  var moduleRecords = {};
  function getOrCreateModuleRecord(name) {
    return moduleRecords[name] || (moduleRecords[name] = {
      name: name,
      dependencies: [],
      exports: {}, // start from an empty module and extend
      importers: []
    })
  }

  function linkDeclarativeModule(entry) {
    // only link if already not already started linking (stops at circular)
    if (entry.module)
      return;

    var module = entry.module = getOrCreateModuleRecord(entry.name);
    var exports = entry.module.exports;

    var declaration = entry.declare.call(global, function(name, value) {
      module.locked = true;

      if (typeof name == 'object') {
        for (var p in name)
          exports[p] = name[p];
      }
      else {
        exports[name] = value;
      }

      for (var i = 0, l = module.importers.length; i < l; i++) {
        var importerModule = module.importers[i];
        if (!importerModule.locked) {
          for (var j = 0; j < importerModule.dependencies.length; ++j) {
            if (importerModule.dependencies[j] === module) {
              importerModule.setters[j](exports);
            }
          }
        }
      }

      module.locked = false;
      return value;
    });

    module.setters = declaration.setters;
    module.execute = declaration.execute;

    // now link all the module dependencies
    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
      var depName = entry.normalizedDeps[i];
      var depEntry = defined[depName];
      var depModule = moduleRecords[depName];

      // work out how to set depExports based on scenarios...
      var depExports;

      if (depModule) {
        depExports = depModule.exports;
      }
      else if (depEntry && !depEntry.declarative) {
        depExports = depEntry.esModule;
      }
      // in the module registry
      else if (!depEntry) {
        depExports = load(depName);
      }
      // we have an entry -> link
      else {
        linkDeclarativeModule(depEntry);
        depModule = depEntry.module;
        depExports = depModule.exports;
      }

      // only declarative modules have dynamic bindings
      if (depModule && depModule.importers) {
        depModule.importers.push(module);
        module.dependencies.push(depModule);
      }
      else
        module.dependencies.push(null);

      // run the setter for this dependency
      if (module.setters[i])
        module.setters[i](depExports);
    }
  }

  // An analog to loader.get covering execution of all three layers (real declarative, simulated declarative, simulated dynamic)
  function getModule(name) {
    var exports;
    var entry = defined[name];

    if (!entry) {
      exports = load(name);
      if (!exports)
        throw new Error("Unable to load dependency " + name + ".");
    }

    else {
      if (entry.declarative)
        ensureEvaluated(name, []);

      else if (!entry.evaluated)
        linkDynamicModule(entry);

      exports = entry.module.exports;
    }

    if ((!entry || entry.declarative) && exports && exports.__useDefault)
      return exports['default'];

    return exports;
  }

  function linkDynamicModule(entry) {
    if (entry.module)
      return;

    var exports = {};

    var module = entry.module = { exports: exports, id: entry.name };

    // AMD requires execute the tree first
    if (!entry.executingRequire) {
      for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
        var depName = entry.normalizedDeps[i];
        var depEntry = defined[depName];
        if (depEntry)
          linkDynamicModule(depEntry);
      }
    }

    // now execute
    entry.evaluated = true;
    var output = entry.execute.call(global, function(name) {
      for (var i = 0, l = entry.deps.length; i < l; i++) {
        if (entry.deps[i] != name)
          continue;
        return getModule(entry.normalizedDeps[i]);
      }
      throw new TypeError('Module ' + name + ' not declared as a dependency.');
    }, exports, module);

    if (output)
      module.exports = output;

    // create the esModule object, which allows ES6 named imports of dynamics
    exports = module.exports;
 
    if (exports && exports.__esModule) {
      entry.esModule = exports;
    }
    else {
      entry.esModule = {};
      
      // don't trigger getters/setters in environments that support them
      if ((typeof exports == 'object' || typeof exports == 'function') && exports !== global) {
        if (getOwnPropertyDescriptor) {
          var d;
          for (var p in exports)
            if (d = Object.getOwnPropertyDescriptor(exports, p))
              defineProperty(entry.esModule, p, d);
        }
        else {
          var hasOwnProperty = exports && exports.hasOwnProperty;
          for (var p in exports) {
            if (!hasOwnProperty || exports.hasOwnProperty(p))
              entry.esModule[p] = exports[p];
          }
         }
       }
      entry.esModule['default'] = exports;
      defineProperty(entry.esModule, '__useDefault', {
        value: true
      });
    }
  }

  /*
   * Given a module, and the list of modules for this current branch,
   *  ensure that each of the dependencies of this module is evaluated
   *  (unless one is a circular dependency already in the list of seen
   *  modules, in which case we execute it)
   *
   * Then we evaluate the module itself depth-first left to right 
   * execution to match ES6 modules
   */
  function ensureEvaluated(moduleName, seen) {
    var entry = defined[moduleName];

    // if already seen, that means it's an already-evaluated non circular dependency
    if (!entry || entry.evaluated || !entry.declarative)
      return;

    // this only applies to declarative modules which late-execute

    seen.push(moduleName);

    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
      var depName = entry.normalizedDeps[i];
      if (indexOf.call(seen, depName) == -1) {
        if (!defined[depName])
          load(depName);
        else
          ensureEvaluated(depName, seen);
      }
    }

    if (entry.evaluated)
      return;

    entry.evaluated = true;
    entry.module.execute.call(global);
  }

  // magical execution function
  var modules = {};
  function load(name) {
    if (modules[name])
      return modules[name];

    // node core modules
    if (name.substr(0, 6) == '@node/')
      return require(name.substr(6));

    var entry = defined[name];

    // first we check if this module has already been defined in the registry
    if (!entry)
      throw "Module " + name + " not present.";

    // recursively ensure that the module and all its 
    // dependencies are linked (with dependency group handling)
    link(name);

    // now handle dependency execution in correct order
    ensureEvaluated(name, []);

    // remove from the registry
    defined[name] = undefined;

    // exported modules get __esModule defined for interop
    if (entry.declarative)
      defineProperty(entry.module.exports, '__esModule', { value: true });

    // return the defined module object
    return modules[name] = entry.declarative ? entry.module.exports : entry.esModule;
  };

  return function(mains, depNames, declare) {
    return function(formatDetect) {
      formatDetect(function(deps) {
        var System = {
          _nodeRequire: typeof require != 'undefined' && require.resolve && typeof process != 'undefined' && require,
          register: register,
          registerDynamic: registerDynamic,
          get: load, 
          set: function(name, module) {
            modules[name] = module; 
          },
          newModule: function(module) {
            return module;
          }
        };
        System.set('@empty', {});

        // register external dependencies
        for (var i = 0; i < depNames.length; i++) (function(depName, dep) {
          if (dep && dep.__esModule)
            System.register(depName, [], function(_export) {
              return {
                setters: [],
                execute: function() {
                  for (var p in dep)
                    if (p != '__esModule' && !(typeof p == 'object' && p + '' == 'Module'))
                      _export(p, dep[p]);
                }
              };
            });
          else
            System.registerDynamic(depName, [], false, function() {
              return dep;
            });
        })(depNames[i], arguments[i]);

        // register modules in this bundle
        declare(System);

        // load mains
        var firstLoad = load(mains[0]);
        if (mains.length > 1)
          for (var i = 1; i < mains.length; i++)
            load(mains[i]);

        if (firstLoad.__useDefault)
          return firstLoad['default'];
        else
          return firstLoad;
      });
    };
  };

})(typeof self != 'undefined' ? self : global)
/* (['mainModule'], ['external-dep'], function($__System) {
  System.register(...);
})
(function(factory) {
  if (typeof define && define.amd)
    define(['external-dep'], factory);
  // etc UMD / module pattern
})*/

(['1'], [], function($__System) {

(function(__global) {
  var loader = $__System;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++)
      if (this[i] === item)
        return i;
    return -1;
  }

  function readMemberExpression(p, value) {
    var pParts = p.split('.');
    while (pParts.length)
      value = value[pParts.shift()];
    return value;
  }

  // bare minimum ignores for IE8
  var ignoredGlobalProps = ['_g', 'sessionStorage', 'localStorage', 'clipboardData', 'frames', 'external', 'mozAnimationStartTime', 'webkitStorageInfo', 'webkitIndexedDB'];

  var globalSnapshot;

  function forEachGlobal(callback) {
    if (Object.keys)
      Object.keys(__global).forEach(callback);
    else
      for (var g in __global) {
        if (!hasOwnProperty.call(__global, g))
          continue;
        callback(g);
      }
  }

  function forEachGlobalValue(callback) {
    forEachGlobal(function(globalName) {
      if (indexOf.call(ignoredGlobalProps, globalName) != -1)
        return;
      try {
        var value = __global[globalName];
      }
      catch (e) {
        ignoredGlobalProps.push(globalName);
      }
      callback(globalName, value);
    });
  }

  loader.set('@@global-helpers', loader.newModule({
    prepareGlobal: function(moduleName, exportName, globals) {
      // disable module detection
      var curDefine = __global.define;
       
      __global.define = undefined;
      __global.exports = undefined;
      if (__global.module && __global.module.exports)
        __global.module = undefined;

      // set globals
      var oldGlobals;
      if (globals) {
        oldGlobals = {};
        for (var g in globals) {
          oldGlobals[g] = globals[g];
          __global[g] = globals[g];
        }
      }

      // store a complete copy of the global object in order to detect changes
      if (!exportName) {
        globalSnapshot = {};

        forEachGlobalValue(function(name, value) {
          globalSnapshot[name] = value;
        });
      }

      // return function to retrieve global
      return function() {
        var globalValue;

        if (exportName) {
          globalValue = readMemberExpression(exportName, __global);
        }
        else {
          var singleGlobal;
          var multipleExports;
          var exports = {};

          forEachGlobalValue(function(name, value) {
            if (globalSnapshot[name] === value)
              return;
            if (typeof value == 'undefined')
              return;
            exports[name] = value;

            if (typeof singleGlobal != 'undefined') {
              if (!multipleExports && singleGlobal !== value)
                multipleExports = true;
            }
            else {
              singleGlobal = value;
            }
          });
          globalValue = multipleExports ? exports : singleGlobal;
        }

        // revert globals
        if (oldGlobals) {
          for (var g in oldGlobals)
            __global[g] = oldGlobals[g];
        }
        __global.define = curDefine;

        return globalValue;
      };
    }
  }));

})(typeof self != 'undefined' ? self : global);

(function(__global) {
  var loader = $__System;
  var indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++)
      if (this[i] === item)
        return i;
    return -1;
  }

  var commentRegEx = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg;
  var cjsRequirePre = "(?:^|[^$_a-zA-Z\\xA0-\\uFFFF.])";
  var cjsRequirePost = "\\s*\\(\\s*(\"([^\"]+)\"|'([^']+)')\\s*\\)";
  var fnBracketRegEx = /\(([^\)]*)\)/;
  var wsRegEx = /^\s+|\s+$/g;
  
  var requireRegExs = {};

  function getCJSDeps(source, requireIndex) {

    // remove comments
    source = source.replace(commentRegEx, '');

    // determine the require alias
    var params = source.match(fnBracketRegEx);
    var requireAlias = (params[1].split(',')[requireIndex] || 'require').replace(wsRegEx, '');

    // find or generate the regex for this requireAlias
    var requireRegEx = requireRegExs[requireAlias] || (requireRegExs[requireAlias] = new RegExp(cjsRequirePre + requireAlias + cjsRequirePost, 'g'));

    requireRegEx.lastIndex = 0;

    var deps = [];

    var match;
    while (match = requireRegEx.exec(source))
      deps.push(match[2] || match[3]);

    return deps;
  }

  /*
    AMD-compatible require
    To copy RequireJS, set window.require = window.requirejs = loader.amdRequire
  */
  function require(names, callback, errback, referer) {
    // in amd, first arg can be a config object... we just ignore
    if (typeof names == 'object' && !(names instanceof Array))
      return require.apply(null, Array.prototype.splice.call(arguments, 1, arguments.length - 1));

    // amd require
    if (typeof names == 'string' && typeof callback == 'function')
      names = [names];
    if (names instanceof Array) {
      var dynamicRequires = [];
      for (var i = 0; i < names.length; i++)
        dynamicRequires.push(loader['import'](names[i], referer));
      Promise.all(dynamicRequires).then(function(modules) {
        if (callback)
          callback.apply(null, modules);
      }, errback);
    }

    // commonjs require
    else if (typeof names == 'string') {
      var module = loader.get(names);
      return module.__useDefault ? module['default'] : module;
    }

    else
      throw new TypeError('Invalid require');
  }

  function define(name, deps, factory) {
    if (typeof name != 'string') {
      factory = deps;
      deps = name;
      name = null;
    }
    if (!(deps instanceof Array)) {
      factory = deps;
      deps = ['require', 'exports', 'module'].splice(0, factory.length);
    }

    if (typeof factory != 'function')
      factory = (function(factory) {
        return function() { return factory; }
      })(factory);

    // in IE8, a trailing comma becomes a trailing undefined entry
    if (deps[deps.length - 1] === undefined)
      deps.pop();

    // remove system dependencies
    var requireIndex, exportsIndex, moduleIndex;
    
    if ((requireIndex = indexOf.call(deps, 'require')) != -1) {
      
      deps.splice(requireIndex, 1);

      // only trace cjs requires for non-named
      // named defines assume the trace has already been done
      if (!name)
        deps = deps.concat(getCJSDeps(factory.toString(), requireIndex));
    }

    if ((exportsIndex = indexOf.call(deps, 'exports')) != -1)
      deps.splice(exportsIndex, 1);
    
    if ((moduleIndex = indexOf.call(deps, 'module')) != -1)
      deps.splice(moduleIndex, 1);

    var define = {
      name: name,
      deps: deps,
      execute: function(req, exports, module) {

        var depValues = [];
        for (var i = 0; i < deps.length; i++)
          depValues.push(req(deps[i]));

        module.uri = module.id;

        module.config = function() {};

        // add back in system dependencies
        if (moduleIndex != -1)
          depValues.splice(moduleIndex, 0, module);
        
        if (exportsIndex != -1)
          depValues.splice(exportsIndex, 0, exports);
        
        if (requireIndex != -1) 
          depValues.splice(requireIndex, 0, function(names, callback, errback) {
            if (typeof names == 'string' && typeof callback != 'function')
              return req(names);
            return require.call(loader, names, callback, errback, module.id);
          });

        var output = factory.apply(exportsIndex == -1 ? __global : exports, depValues);

        if (typeof output == 'undefined' && module)
          output = module.exports;

        if (typeof output != 'undefined')
          return output;
      }
    };

    // anonymous define
    if (!name) {
      // already defined anonymously -> throw
      if (lastModule.anonDefine)
        throw new TypeError('Multiple defines for anonymous module');
      lastModule.anonDefine = define;
    }
    // named define
    else {
      // if we don't have any other defines,
      // then let this be an anonymous define
      // this is just to support single modules of the form:
      // define('jquery')
      // still loading anonymously
      // because it is done widely enough to be useful
      if (!lastModule.anonDefine && !lastModule.isBundle) {
        lastModule.anonDefine = define;
      }
      // otherwise its a bundle only
      else {
        // if there is an anonDefine already (we thought it could have had a single named define)
        // then we define it now
        // this is to avoid defining named defines when they are actually anonymous
        if (lastModule.anonDefine && lastModule.anonDefine.name)
          loader.registerDynamic(lastModule.anonDefine.name, lastModule.anonDefine.deps, false, lastModule.anonDefine.execute);

        lastModule.anonDefine = null;
      }

      // note this is now a bundle
      lastModule.isBundle = true;

      // define the module through the register registry
      loader.registerDynamic(name, define.deps, false, define.execute);
    }
  }
  define.amd = {};

  // adds define as a global (potentially just temporarily)
  function createDefine(loader) {
    lastModule.anonDefine = null;
    lastModule.isBundle = false;

    // ensure no NodeJS environment detection
    var oldModule = __global.module;
    var oldExports = __global.exports;
    var oldDefine = __global.define;

    __global.module = undefined;
    __global.exports = undefined;
    __global.define = define;

    return function() {
      __global.define = oldDefine;
      __global.module = oldModule;
      __global.exports = oldExports;
    };
  }

  var lastModule = {
    isBundle: false,
    anonDefine: null
  };

  loader.set('@@amd-helpers', loader.newModule({
    createDefine: createDefine,
    require: require,
    define: define,
    lastModule: lastModule
  }));
  loader.amdDefine = define;
  loader.amdRequire = require;
})(typeof self != 'undefined' ? self : global);

"bundle";
(function() {
var _removeDefine = $__System.get("@@amd-helpers").createDefine();
(function() {
  var acorn = {};
  (function(exports) {
    var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/;
    var nonASCIIidentifierStartChars = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc";
    var nonASCIIidentifierChars = "\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u0620-\u0649\u0672-\u06d3\u06e7-\u06e8\u06fb-\u06fc\u0730-\u074a\u0800-\u0814\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0840-\u0857\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962-\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09d7\u09df-\u09e0\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5f-\u0b60\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2-\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d46-\u0d48\u0d57\u0d62-\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e34-\u0e3a\u0e40-\u0e45\u0e50-\u0e59\u0eb4-\u0eb9\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f41-\u0f47\u0f71-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1029\u1040-\u1049\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u170e-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17b2\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1920-\u192b\u1930-\u193b\u1951-\u196d\u19b0-\u19c0\u19c8-\u19c9\u19d0-\u19d9\u1a00-\u1a15\u1a20-\u1a53\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b46-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1bb0-\u1bb9\u1be6-\u1bf3\u1c00-\u1c22\u1c40-\u1c49\u1c5b-\u1c7d\u1cd0-\u1cd2\u1d00-\u1dbe\u1e01-\u1f15\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2d81-\u2d96\u2de0-\u2dff\u3021-\u3028\u3099\u309a\ua640-\ua66d\ua674-\ua67d\ua69f\ua6f0-\ua6f1\ua7f8-\ua800\ua806\ua80b\ua823-\ua827\ua880-\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8f3-\ua8f7\ua900-\ua909\ua926-\ua92d\ua930-\ua945\ua980-\ua983\ua9b3-\ua9c0\uaa00-\uaa27\uaa40-\uaa41\uaa4c-\uaa4d\uaa50-\uaa59\uaa7b\uaae0-\uaae9\uaaf2-\uaaf3\uabc0-\uabe1\uabec\uabed\uabf0-\uabf9\ufb20-\ufb28\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f";
    var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
    var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");
    var newline = exports.newline = /[\n\r\u2028\u2029]/;
    var lineBreak = exports.lineBreak = /\r\n|[\n\r\u2028\u2029]/g;
    var isIdentifierStart = exports.isIdentifierStart = function(code) {
      if (code < 65)
        return code === 36;
      if (code < 91)
        return true;
      if (code < 97)
        return code === 95;
      if (code < 123)
        return true;
      return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code));
    };
    var isIdentifierChar = exports.isIdentifierChar = function(code) {
      if (code < 48)
        return code === 36;
      if (code < 58)
        return true;
      if (code < 65)
        return false;
      if (code < 91)
        return true;
      if (code < 97)
        return code === 95;
      if (code < 123)
        return true;
      return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code));
    };
  })(acorn);
  function in_array(what, arr) {
    for (var i = 0; i < arr.length; i += 1) {
      if (arr[i] === what) {
        return true;
      }
    }
    return false;
  }
  function trim(s) {
    return s.replace(/^\s+|\s+$/g, '');
  }
  function ltrim(s) {
    return s.replace(/^\s+/g, '');
  }
  function rtrim(s) {
    return s.replace(/\s+$/g, '');
  }
  function js_beautify(js_source_text, options) {
    "use strict";
    var beautifier = new Beautifier(js_source_text, options);
    return beautifier.beautify();
  }
  var MODE = {
    BlockStatement: 'BlockStatement',
    Statement: 'Statement',
    ObjectLiteral: 'ObjectLiteral',
    ArrayLiteral: 'ArrayLiteral',
    ForInitializer: 'ForInitializer',
    Conditional: 'Conditional',
    Expression: 'Expression'
  };
  function Beautifier(js_source_text, options) {
    "use strict";
    var output;
    var tokens = [],
        token_pos;
    var Tokenizer;
    var current_token;
    var last_type,
        last_last_text,
        indent_string;
    var flags,
        previous_flags,
        flag_store;
    var prefix;
    var handlers,
        opt;
    var baseIndentString = '';
    handlers = {
      'TK_START_EXPR': handle_start_expr,
      'TK_END_EXPR': handle_end_expr,
      'TK_START_BLOCK': handle_start_block,
      'TK_END_BLOCK': handle_end_block,
      'TK_WORD': handle_word,
      'TK_RESERVED': handle_word,
      'TK_SEMICOLON': handle_semicolon,
      'TK_STRING': handle_string,
      'TK_EQUALS': handle_equals,
      'TK_OPERATOR': handle_operator,
      'TK_COMMA': handle_comma,
      'TK_BLOCK_COMMENT': handle_block_comment,
      'TK_COMMENT': handle_comment,
      'TK_DOT': handle_dot,
      'TK_UNKNOWN': handle_unknown,
      'TK_EOF': handle_eof
    };
    function create_flags(flags_base, mode) {
      var next_indent_level = 0;
      if (flags_base) {
        next_indent_level = flags_base.indentation_level;
        if (!output.just_added_newline() && flags_base.line_indent_level > next_indent_level) {
          next_indent_level = flags_base.line_indent_level;
        }
      }
      var next_flags = {
        mode: mode,
        parent: flags_base,
        last_text: flags_base ? flags_base.last_text : '',
        last_word: flags_base ? flags_base.last_word : '',
        declaration_statement: false,
        declaration_assignment: false,
        multiline_frame: false,
        if_block: false,
        else_block: false,
        do_block: false,
        do_while: false,
        in_case_statement: false,
        in_case: false,
        case_body: false,
        indentation_level: next_indent_level,
        line_indent_level: flags_base ? flags_base.line_indent_level : next_indent_level,
        start_line_index: output.get_line_number(),
        ternary_depth: 0
      };
      return next_flags;
    }
    options = options ? options : {};
    opt = {};
    if (options.braces_on_own_line !== undefined) {
      opt.brace_style = options.braces_on_own_line ? "expand" : "collapse";
    }
    opt.brace_style = options.brace_style ? options.brace_style : (opt.brace_style ? opt.brace_style : "collapse");
    if (opt.brace_style === "expand-strict") {
      opt.brace_style = "expand";
    }
    opt.indent_size = options.indent_size ? parseInt(options.indent_size, 10) : 4;
    opt.indent_char = options.indent_char ? options.indent_char : ' ';
    opt.eol = options.eol ? options.eol : '\n';
    opt.preserve_newlines = (options.preserve_newlines === undefined) ? true : options.preserve_newlines;
    opt.break_chained_methods = (options.break_chained_methods === undefined) ? false : options.break_chained_methods;
    opt.max_preserve_newlines = (options.max_preserve_newlines === undefined) ? 0 : parseInt(options.max_preserve_newlines, 10);
    opt.space_in_paren = (options.space_in_paren === undefined) ? false : options.space_in_paren;
    opt.space_in_empty_paren = (options.space_in_empty_paren === undefined) ? false : options.space_in_empty_paren;
    opt.jslint_happy = (options.jslint_happy === undefined) ? false : options.jslint_happy;
    opt.space_after_anon_function = (options.space_after_anon_function === undefined) ? false : options.space_after_anon_function;
    opt.keep_array_indentation = (options.keep_array_indentation === undefined) ? false : options.keep_array_indentation;
    opt.space_before_conditional = (options.space_before_conditional === undefined) ? true : options.space_before_conditional;
    opt.unescape_strings = (options.unescape_strings === undefined) ? false : options.unescape_strings;
    opt.wrap_line_length = (options.wrap_line_length === undefined) ? 0 : parseInt(options.wrap_line_length, 10);
    opt.e4x = (options.e4x === undefined) ? false : options.e4x;
    opt.end_with_newline = (options.end_with_newline === undefined) ? false : options.end_with_newline;
    opt.comma_first = (options.comma_first === undefined) ? false : options.comma_first;
    opt.test_output_raw = (options.test_output_raw === undefined) ? false : options.test_output_raw;
    if (opt.jslint_happy) {
      opt.space_after_anon_function = true;
    }
    if (options.indent_with_tabs) {
      opt.indent_char = '\t';
      opt.indent_size = 1;
    }
    opt.eol = opt.eol.replace(/\\r/, '\r').replace(/\\n/, '\n');
    indent_string = '';
    while (opt.indent_size > 0) {
      indent_string += opt.indent_char;
      opt.indent_size -= 1;
    }
    var preindent_index = 0;
    if (js_source_text && js_source_text.length) {
      while ((js_source_text.charAt(preindent_index) === ' ' || js_source_text.charAt(preindent_index) === '\t')) {
        baseIndentString += js_source_text.charAt(preindent_index);
        preindent_index += 1;
      }
      js_source_text = js_source_text.substring(preindent_index);
    }
    last_type = 'TK_START_BLOCK';
    last_last_text = '';
    output = new Output(indent_string, baseIndentString);
    output.raw = opt.test_output_raw;
    flag_store = [];
    set_mode(MODE.BlockStatement);
    this.beautify = function() {
      var local_token,
          sweet_code;
      Tokenizer = new tokenizer(js_source_text, opt, indent_string);
      tokens = Tokenizer.tokenize();
      token_pos = 0;
      while (local_token = get_token()) {
        for (var i = 0; i < local_token.comments_before.length; i++) {
          handle_token(local_token.comments_before[i]);
        }
        handle_token(local_token);
        last_last_text = flags.last_text;
        last_type = local_token.type;
        flags.last_text = local_token.text;
        token_pos += 1;
      }
      sweet_code = output.get_code();
      if (opt.end_with_newline) {
        sweet_code += '\n';
      }
      if (opt.eol != '\n') {
        sweet_code = sweet_code.replace(/[\n]/g, opt.eol);
      }
      return sweet_code;
    };
    function handle_token(local_token) {
      var newlines = local_token.newlines;
      var keep_whitespace = opt.keep_array_indentation && is_array(flags.mode);
      if (keep_whitespace) {
        for (i = 0; i < newlines; i += 1) {
          print_newline(i > 0);
        }
      } else {
        if (opt.max_preserve_newlines && newlines > opt.max_preserve_newlines) {
          newlines = opt.max_preserve_newlines;
        }
        if (opt.preserve_newlines) {
          if (local_token.newlines > 1) {
            print_newline();
            for (var i = 1; i < newlines; i += 1) {
              print_newline(true);
            }
          }
        }
      }
      current_token = local_token;
      handlers[current_token.type]();
    }
    function split_newlines(s) {
      s = s.replace(/\x0d/g, '');
      var out = [],
          idx = s.indexOf("\n");
      while (idx !== -1) {
        out.push(s.substring(0, idx));
        s = s.substring(idx + 1);
        idx = s.indexOf("\n");
      }
      if (s.length) {
        out.push(s);
      }
      return out;
    }
    function allow_wrap_or_preserved_newline(force_linewrap) {
      force_linewrap = (force_linewrap === undefined) ? false : force_linewrap;
      if (output.just_added_newline()) {
        return;
      }
      if ((opt.preserve_newlines && current_token.wanted_newline) || force_linewrap) {
        print_newline(false, true);
      } else if (opt.wrap_line_length) {
        var proposed_line_length = output.current_line.get_character_count() + current_token.text.length + (output.space_before_token ? 1 : 0);
        if (proposed_line_length >= opt.wrap_line_length) {
          print_newline(false, true);
        }
      }
    }
    function print_newline(force_newline, preserve_statement_flags) {
      if (!preserve_statement_flags) {
        if (flags.last_text !== ';' && flags.last_text !== ',' && flags.last_text !== '=' && last_type !== 'TK_OPERATOR') {
          while (flags.mode === MODE.Statement && !flags.if_block && !flags.do_block) {
            restore_mode();
          }
        }
      }
      if (output.add_new_line(force_newline)) {
        flags.multiline_frame = true;
      }
    }
    function print_token_line_indentation() {
      if (output.just_added_newline()) {
        if (opt.keep_array_indentation && is_array(flags.mode) && current_token.wanted_newline) {
          output.current_line.push(current_token.whitespace_before);
          output.space_before_token = false;
        } else if (output.set_indent(flags.indentation_level)) {
          flags.line_indent_level = flags.indentation_level;
        }
      }
    }
    function print_token(printable_token) {
      if (output.raw) {
        output.add_raw_token(current_token);
        return;
      }
      if (opt.comma_first && last_type === 'TK_COMMA' && output.just_added_newline()) {
        if (output.previous_line.last() === ',') {
          output.previous_line.pop();
          print_token_line_indentation();
          output.add_token(',');
          output.space_before_token = true;
        }
      }
      printable_token = printable_token || current_token.text;
      print_token_line_indentation();
      output.add_token(printable_token);
    }
    function indent() {
      flags.indentation_level += 1;
    }
    function deindent() {
      if (flags.indentation_level > 0 && ((!flags.parent) || flags.indentation_level > flags.parent.indentation_level))
        flags.indentation_level -= 1;
    }
    function set_mode(mode) {
      if (flags) {
        flag_store.push(flags);
        previous_flags = flags;
      } else {
        previous_flags = create_flags(null, mode);
      }
      flags = create_flags(previous_flags, mode);
    }
    function is_array(mode) {
      return mode === MODE.ArrayLiteral;
    }
    function is_expression(mode) {
      return in_array(mode, [MODE.Expression, MODE.ForInitializer, MODE.Conditional]);
    }
    function restore_mode() {
      if (flag_store.length > 0) {
        previous_flags = flags;
        flags = flag_store.pop();
        if (previous_flags.mode === MODE.Statement) {
          output.remove_redundant_indentation(previous_flags);
        }
      }
    }
    function start_of_object_property() {
      return flags.parent.mode === MODE.ObjectLiteral && flags.mode === MODE.Statement && ((flags.last_text === ':' && flags.ternary_depth === 0) || (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['get', 'set'])));
    }
    function start_of_statement() {
      if ((last_type === 'TK_RESERVED' && in_array(flags.last_text, ['var', 'let', 'const']) && current_token.type === 'TK_WORD') || (last_type === 'TK_RESERVED' && flags.last_text === 'do') || (last_type === 'TK_RESERVED' && flags.last_text === 'return' && !current_token.wanted_newline) || (last_type === 'TK_RESERVED' && flags.last_text === 'else' && !(current_token.type === 'TK_RESERVED' && current_token.text === 'if')) || (last_type === 'TK_END_EXPR' && (previous_flags.mode === MODE.ForInitializer || previous_flags.mode === MODE.Conditional)) || (last_type === 'TK_WORD' && flags.mode === MODE.BlockStatement && !flags.in_case && !(current_token.text === '--' || current_token.text === '++') && last_last_text !== 'function' && current_token.type !== 'TK_WORD' && current_token.type !== 'TK_RESERVED') || (flags.mode === MODE.ObjectLiteral && ((flags.last_text === ':' && flags.ternary_depth === 0) || (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['get', 'set']))))) {
        set_mode(MODE.Statement);
        indent();
        if (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['var', 'let', 'const']) && current_token.type === 'TK_WORD') {
          flags.declaration_statement = true;
        }
        if (!start_of_object_property()) {
          allow_wrap_or_preserved_newline(current_token.type === 'TK_RESERVED' && in_array(current_token.text, ['do', 'for', 'if', 'while']));
        }
        return true;
      }
      return false;
    }
    function all_lines_start_with(lines, c) {
      for (var i = 0; i < lines.length; i++) {
        var line = trim(lines[i]);
        if (line.charAt(0) !== c) {
          return false;
        }
      }
      return true;
    }
    function each_line_matches_indent(lines, indent) {
      var i = 0,
          len = lines.length,
          line;
      for (; i < len; i++) {
        line = lines[i];
        if (line && line.indexOf(indent) !== 0) {
          return false;
        }
      }
      return true;
    }
    function is_special_word(word) {
      return in_array(word, ['case', 'return', 'do', 'if', 'throw', 'else']);
    }
    function get_token(offset) {
      var index = token_pos + (offset || 0);
      return (index < 0 || index >= tokens.length) ? null : tokens[index];
    }
    function handle_start_expr() {
      if (start_of_statement()) {}
      var next_mode = MODE.Expression;
      if (current_token.text === '[') {
        if (last_type === 'TK_WORD' || flags.last_text === ')') {
          if (last_type === 'TK_RESERVED' && in_array(flags.last_text, Tokenizer.line_starters)) {
            output.space_before_token = true;
          }
          set_mode(next_mode);
          print_token();
          indent();
          if (opt.space_in_paren) {
            output.space_before_token = true;
          }
          return;
        }
        next_mode = MODE.ArrayLiteral;
        if (is_array(flags.mode)) {
          if (flags.last_text === '[' || (flags.last_text === ',' && (last_last_text === ']' || last_last_text === '}'))) {
            if (!opt.keep_array_indentation) {
              print_newline();
            }
          }
        }
      } else {
        if (last_type === 'TK_RESERVED' && flags.last_text === 'for') {
          next_mode = MODE.ForInitializer;
        } else if (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['if', 'while'])) {
          next_mode = MODE.Conditional;
        } else {}
      }
      if (flags.last_text === ';' || last_type === 'TK_START_BLOCK') {
        print_newline();
      } else if (last_type === 'TK_END_EXPR' || last_type === 'TK_START_EXPR' || last_type === 'TK_END_BLOCK' || flags.last_text === '.') {
        allow_wrap_or_preserved_newline(current_token.wanted_newline);
      } else if (!(last_type === 'TK_RESERVED' && current_token.text === '(') && last_type !== 'TK_WORD' && last_type !== 'TK_OPERATOR') {
        output.space_before_token = true;
      } else if ((last_type === 'TK_RESERVED' && (flags.last_word === 'function' || flags.last_word === 'typeof')) || (flags.last_text === '*' && last_last_text === 'function')) {
        if (opt.space_after_anon_function) {
          output.space_before_token = true;
        }
      } else if (last_type === 'TK_RESERVED' && (in_array(flags.last_text, Tokenizer.line_starters) || flags.last_text === 'catch')) {
        if (opt.space_before_conditional) {
          output.space_before_token = true;
        }
      }
      if (current_token.text === '(' && last_type === 'TK_RESERVED' && flags.last_word === 'await') {
        output.space_before_token = true;
      }
      if (current_token.text === '(') {
        if (last_type === 'TK_EQUALS' || last_type === 'TK_OPERATOR') {
          if (!start_of_object_property()) {
            allow_wrap_or_preserved_newline();
          }
        }
      }
      set_mode(next_mode);
      print_token();
      if (opt.space_in_paren) {
        output.space_before_token = true;
      }
      indent();
    }
    function handle_end_expr() {
      while (flags.mode === MODE.Statement) {
        restore_mode();
      }
      if (flags.multiline_frame) {
        allow_wrap_or_preserved_newline(current_token.text === ']' && is_array(flags.mode) && !opt.keep_array_indentation);
      }
      if (opt.space_in_paren) {
        if (last_type === 'TK_START_EXPR' && !opt.space_in_empty_paren) {
          output.trim();
          output.space_before_token = false;
        } else {
          output.space_before_token = true;
        }
      }
      if (current_token.text === ']' && opt.keep_array_indentation) {
        print_token();
        restore_mode();
      } else {
        restore_mode();
        print_token();
      }
      output.remove_redundant_indentation(previous_flags);
      if (flags.do_while && previous_flags.mode === MODE.Conditional) {
        previous_flags.mode = MODE.Expression;
        flags.do_block = false;
        flags.do_while = false;
      }
    }
    function handle_start_block() {
      var next_token = get_token(1);
      var second_token = get_token(2);
      if (second_token && ((second_token.text === ':' && in_array(next_token.type, ['TK_STRING', 'TK_WORD', 'TK_RESERVED'])) || (in_array(next_token.text, ['get', 'set']) && in_array(second_token.type, ['TK_WORD', 'TK_RESERVED'])))) {
        if (!in_array(last_last_text, ['class', 'interface'])) {
          set_mode(MODE.ObjectLiteral);
        } else {
          set_mode(MODE.BlockStatement);
        }
      } else {
        set_mode(MODE.BlockStatement);
      }
      var empty_braces = !next_token.comments_before.length && next_token.text === '}';
      var empty_anonymous_function = empty_braces && flags.last_word === 'function' && last_type === 'TK_END_EXPR';
      if (opt.brace_style === "expand" || (opt.brace_style === "none" && current_token.wanted_newline)) {
        if (last_type !== 'TK_OPERATOR' && (empty_anonymous_function || last_type === 'TK_EQUALS' || (last_type === 'TK_RESERVED' && is_special_word(flags.last_text) && flags.last_text !== 'else'))) {
          output.space_before_token = true;
        } else {
          print_newline(false, true);
        }
      } else {
        if (last_type !== 'TK_OPERATOR' && last_type !== 'TK_START_EXPR') {
          if (last_type === 'TK_START_BLOCK') {
            print_newline();
          } else {
            output.space_before_token = true;
          }
        } else {
          if (is_array(previous_flags.mode) && flags.last_text === ',') {
            if (last_last_text === '}') {
              output.space_before_token = true;
            } else {
              print_newline();
            }
          }
        }
      }
      print_token();
      indent();
    }
    function handle_end_block() {
      while (flags.mode === MODE.Statement) {
        restore_mode();
      }
      var empty_braces = last_type === 'TK_START_BLOCK';
      if (opt.brace_style === "expand") {
        if (!empty_braces) {
          print_newline();
        }
      } else {
        if (!empty_braces) {
          if (is_array(flags.mode) && opt.keep_array_indentation) {
            opt.keep_array_indentation = false;
            print_newline();
            opt.keep_array_indentation = true;
          } else {
            print_newline();
          }
        }
      }
      restore_mode();
      print_token();
    }
    function handle_word() {
      if (current_token.type === 'TK_RESERVED' && flags.mode !== MODE.ObjectLiteral && in_array(current_token.text, ['set', 'get'])) {
        current_token.type = 'TK_WORD';
      }
      if (current_token.type === 'TK_RESERVED' && flags.mode === MODE.ObjectLiteral) {
        var next_token = get_token(1);
        if (next_token.text == ':') {
          current_token.type = 'TK_WORD';
        }
      }
      if (start_of_statement()) {} else if (current_token.wanted_newline && !is_expression(flags.mode) && (last_type !== 'TK_OPERATOR' || (flags.last_text === '--' || flags.last_text === '++')) && last_type !== 'TK_EQUALS' && (opt.preserve_newlines || !(last_type === 'TK_RESERVED' && in_array(flags.last_text, ['var', 'let', 'const', 'set', 'get'])))) {
        print_newline();
      }
      if (flags.do_block && !flags.do_while) {
        if (current_token.type === 'TK_RESERVED' && current_token.text === 'while') {
          output.space_before_token = true;
          print_token();
          output.space_before_token = true;
          flags.do_while = true;
          return;
        } else {
          print_newline();
          flags.do_block = false;
        }
      }
      if (flags.if_block) {
        if (!flags.else_block && (current_token.type === 'TK_RESERVED' && current_token.text === 'else')) {
          flags.else_block = true;
        } else {
          while (flags.mode === MODE.Statement) {
            restore_mode();
          }
          flags.if_block = false;
          flags.else_block = false;
        }
      }
      if (current_token.type === 'TK_RESERVED' && (current_token.text === 'case' || (current_token.text === 'default' && flags.in_case_statement))) {
        print_newline();
        if (flags.case_body || opt.jslint_happy) {
          deindent();
          flags.case_body = false;
        }
        print_token();
        flags.in_case = true;
        flags.in_case_statement = true;
        return;
      }
      if (current_token.type === 'TK_RESERVED' && current_token.text === 'function') {
        if (in_array(flags.last_text, ['}', ';']) || (output.just_added_newline() && !in_array(flags.last_text, ['[', '{', ':', '=', ',']))) {
          if (!output.just_added_blankline() && !current_token.comments_before.length) {
            print_newline();
            print_newline(true);
          }
        }
        if (last_type === 'TK_RESERVED' || last_type === 'TK_WORD') {
          if (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['get', 'set', 'new', 'return', 'export', 'async'])) {
            output.space_before_token = true;
          } else if (last_type === 'TK_RESERVED' && flags.last_text === 'default' && last_last_text === 'export') {
            output.space_before_token = true;
          } else {
            print_newline();
          }
        } else if (last_type === 'TK_OPERATOR' || flags.last_text === '=') {
          output.space_before_token = true;
        } else if (!flags.multiline_frame && (is_expression(flags.mode) || is_array(flags.mode))) {} else {
          print_newline();
        }
      }
      if (last_type === 'TK_COMMA' || last_type === 'TK_START_EXPR' || last_type === 'TK_EQUALS' || last_type === 'TK_OPERATOR') {
        if (!start_of_object_property()) {
          allow_wrap_or_preserved_newline();
        }
      }
      if (current_token.type === 'TK_RESERVED' && in_array(current_token.text, ['function', 'get', 'set'])) {
        print_token();
        flags.last_word = current_token.text;
        return;
      }
      prefix = 'NONE';
      if (last_type === 'TK_END_BLOCK') {
        if (!(current_token.type === 'TK_RESERVED' && in_array(current_token.text, ['else', 'catch', 'finally']))) {
          prefix = 'NEWLINE';
        } else {
          if (opt.brace_style === "expand" || opt.brace_style === "end-expand" || (opt.brace_style === "none" && current_token.wanted_newline)) {
            prefix = 'NEWLINE';
          } else {
            prefix = 'SPACE';
            output.space_before_token = true;
          }
        }
      } else if (last_type === 'TK_SEMICOLON' && flags.mode === MODE.BlockStatement) {
        prefix = 'NEWLINE';
      } else if (last_type === 'TK_SEMICOLON' && is_expression(flags.mode)) {
        prefix = 'SPACE';
      } else if (last_type === 'TK_STRING') {
        prefix = 'NEWLINE';
      } else if (last_type === 'TK_RESERVED' || last_type === 'TK_WORD' || (flags.last_text === '*' && last_last_text === 'function')) {
        prefix = 'SPACE';
      } else if (last_type === 'TK_START_BLOCK') {
        prefix = 'NEWLINE';
      } else if (last_type === 'TK_END_EXPR') {
        output.space_before_token = true;
        prefix = 'NEWLINE';
      }
      if (current_token.type === 'TK_RESERVED' && in_array(current_token.text, Tokenizer.line_starters) && flags.last_text !== ')') {
        if (flags.last_text === 'else' || flags.last_text === 'export') {
          prefix = 'SPACE';
        } else {
          prefix = 'NEWLINE';
        }
      }
      if (current_token.type === 'TK_RESERVED' && in_array(current_token.text, ['else', 'catch', 'finally'])) {
        if (last_type !== 'TK_END_BLOCK' || opt.brace_style === "expand" || opt.brace_style === "end-expand" || (opt.brace_style === "none" && current_token.wanted_newline)) {
          print_newline();
        } else {
          output.trim(true);
          var line = output.current_line;
          if (line.last() !== '}') {
            print_newline();
          }
          output.space_before_token = true;
        }
      } else if (prefix === 'NEWLINE') {
        if (last_type === 'TK_RESERVED' && is_special_word(flags.last_text)) {
          output.space_before_token = true;
        } else if (last_type !== 'TK_END_EXPR') {
          if ((last_type !== 'TK_START_EXPR' || !(current_token.type === 'TK_RESERVED' && in_array(current_token.text, ['var', 'let', 'const']))) && flags.last_text !== ':') {
            if (current_token.type === 'TK_RESERVED' && current_token.text === 'if' && flags.last_text === 'else') {
              output.space_before_token = true;
            } else {
              print_newline();
            }
          }
        } else if (current_token.type === 'TK_RESERVED' && in_array(current_token.text, Tokenizer.line_starters) && flags.last_text !== ')') {
          print_newline();
        }
      } else if (flags.multiline_frame && is_array(flags.mode) && flags.last_text === ',' && last_last_text === '}') {
        print_newline();
      } else if (prefix === 'SPACE') {
        output.space_before_token = true;
      }
      print_token();
      flags.last_word = current_token.text;
      if (current_token.type === 'TK_RESERVED' && current_token.text === 'do') {
        flags.do_block = true;
      }
      if (current_token.type === 'TK_RESERVED' && current_token.text === 'if') {
        flags.if_block = true;
      }
    }
    function handle_semicolon() {
      if (start_of_statement()) {
        output.space_before_token = false;
      }
      while (flags.mode === MODE.Statement && !flags.if_block && !flags.do_block) {
        restore_mode();
      }
      print_token();
    }
    function handle_string() {
      if (start_of_statement()) {
        output.space_before_token = true;
      } else if (last_type === 'TK_RESERVED' || last_type === 'TK_WORD') {
        output.space_before_token = true;
      } else if (last_type === 'TK_COMMA' || last_type === 'TK_START_EXPR' || last_type === 'TK_EQUALS' || last_type === 'TK_OPERATOR') {
        if (!start_of_object_property()) {
          allow_wrap_or_preserved_newline();
        }
      } else {
        print_newline();
      }
      print_token();
    }
    function handle_equals() {
      if (start_of_statement()) {}
      if (flags.declaration_statement) {
        flags.declaration_assignment = true;
      }
      output.space_before_token = true;
      print_token();
      output.space_before_token = true;
    }
    function handle_comma() {
      if (flags.declaration_statement) {
        if (is_expression(flags.parent.mode)) {
          flags.declaration_assignment = false;
        }
        print_token();
        if (flags.declaration_assignment) {
          flags.declaration_assignment = false;
          print_newline(false, true);
        } else {
          output.space_before_token = true;
          if (opt.comma_first) {
            allow_wrap_or_preserved_newline();
          }
        }
        return;
      }
      print_token();
      if (flags.mode === MODE.ObjectLiteral || (flags.mode === MODE.Statement && flags.parent.mode === MODE.ObjectLiteral)) {
        if (flags.mode === MODE.Statement) {
          restore_mode();
        }
        print_newline();
      } else {
        output.space_before_token = true;
        if (opt.comma_first) {
          allow_wrap_or_preserved_newline();
        }
      }
    }
    function handle_operator() {
      if (start_of_statement()) {}
      if (last_type === 'TK_RESERVED' && is_special_word(flags.last_text)) {
        output.space_before_token = true;
        print_token();
        return;
      }
      if (current_token.text === '*' && last_type === 'TK_DOT') {
        print_token();
        return;
      }
      if (current_token.text === ':' && flags.in_case) {
        flags.case_body = true;
        indent();
        print_token();
        print_newline();
        flags.in_case = false;
        return;
      }
      if (current_token.text === '::') {
        print_token();
        return;
      }
      if (last_type === 'TK_OPERATOR') {
        allow_wrap_or_preserved_newline();
      }
      var space_before = true;
      var space_after = true;
      if (in_array(current_token.text, ['--', '++', '!', '~']) || (in_array(current_token.text, ['-', '+']) && (in_array(last_type, ['TK_START_BLOCK', 'TK_START_EXPR', 'TK_EQUALS', 'TK_OPERATOR']) || in_array(flags.last_text, Tokenizer.line_starters) || flags.last_text === ','))) {
        space_before = false;
        space_after = false;
        if (current_token.wanted_newline && (current_token.text === '--' || current_token.text === '++')) {
          print_newline(false, true);
        }
        if (flags.last_text === ';' && is_expression(flags.mode)) {
          space_before = true;
        }
        if (last_type === 'TK_RESERVED') {
          space_before = true;
        } else if (last_type === 'TK_END_EXPR') {
          space_before = !(flags.last_text === ']' && (current_token.text === '--' || current_token.text === '++'));
        } else if (last_type === 'TK_OPERATOR') {
          space_before = in_array(current_token.text, ['--', '-', '++', '+']) && in_array(flags.last_text, ['--', '-', '++', '+']);
          if (in_array(current_token.text, ['+', '-']) && in_array(flags.last_text, ['--', '++'])) {
            space_after = true;
          }
        }
        if ((flags.mode === MODE.BlockStatement || flags.mode === MODE.Statement) && (flags.last_text === '{' || flags.last_text === ';')) {
          print_newline();
        }
      } else if (current_token.text === ':') {
        if (flags.ternary_depth === 0) {
          space_before = false;
        } else {
          flags.ternary_depth -= 1;
        }
      } else if (current_token.text === '?') {
        flags.ternary_depth += 1;
      } else if (current_token.text === '*' && last_type === 'TK_RESERVED' && flags.last_text === 'function') {
        space_before = false;
        space_after = false;
      }
      output.space_before_token = output.space_before_token || space_before;
      print_token();
      output.space_before_token = space_after;
    }
    function handle_block_comment() {
      if (output.raw) {
        output.add_raw_token(current_token);
        if (current_token.directives && current_token.directives['preserve'] === 'end') {
          if (!opt.test_output_raw) {
            output.raw = false;
          }
        }
        return;
      }
      if (current_token.directives) {
        print_newline(false, true);
        print_token();
        if (current_token.directives['preserve'] === 'start') {
          output.raw = true;
        }
        print_newline(false, true);
        return;
      }
      if (!acorn.newline.test(current_token.text) && !current_token.wanted_newline) {
        output.space_before_token = true;
        print_token();
        output.space_before_token = true;
        return;
      }
      var lines = split_newlines(current_token.text);
      var j;
      var javadoc = false;
      var starless = false;
      var lastIndent = current_token.whitespace_before;
      var lastIndentLength = lastIndent.length;
      print_newline(false, true);
      if (lines.length > 1) {
        if (all_lines_start_with(lines.slice(1), '*')) {
          javadoc = true;
        } else if (each_line_matches_indent(lines.slice(1), lastIndent)) {
          starless = true;
        }
      }
      print_token(lines[0]);
      for (j = 1; j < lines.length; j++) {
        print_newline(false, true);
        if (javadoc) {
          print_token(' ' + ltrim(lines[j]));
        } else if (starless && lines[j].length > lastIndentLength) {
          print_token(lines[j].substring(lastIndentLength));
        } else {
          output.add_token(lines[j]);
        }
      }
      print_newline(false, true);
    }
    function handle_comment() {
      if (current_token.wanted_newline) {
        print_newline(false, true);
      } else {
        output.trim(true);
      }
      output.space_before_token = true;
      print_token();
      print_newline(false, true);
    }
    function handle_dot() {
      if (start_of_statement()) {}
      if (last_type === 'TK_RESERVED' && is_special_word(flags.last_text)) {
        output.space_before_token = true;
      } else {
        allow_wrap_or_preserved_newline(flags.last_text === ')' && opt.break_chained_methods);
      }
      print_token();
    }
    function handle_unknown() {
      print_token();
      if (current_token.text[current_token.text.length - 1] === '\n') {
        print_newline();
      }
    }
    function handle_eof() {
      while (flags.mode === MODE.Statement) {
        restore_mode();
      }
    }
  }
  function OutputLine(parent) {
    var _character_count = 0;
    var _indent_count = -1;
    var _items = [];
    var _empty = true;
    this.set_indent = function(level) {
      _character_count = parent.baseIndentLength + level * parent.indent_length;
      _indent_count = level;
    };
    this.get_character_count = function() {
      return _character_count;
    };
    this.is_empty = function() {
      return _empty;
    };
    this.last = function() {
      if (!this._empty) {
        return _items[_items.length - 1];
      } else {
        return null;
      }
    };
    this.push = function(input) {
      _items.push(input);
      _character_count += input.length;
      _empty = false;
    };
    this.pop = function() {
      var item = null;
      if (!_empty) {
        item = _items.pop();
        _character_count -= item.length;
        _empty = _items.length === 0;
      }
      return item;
    };
    this.remove_indent = function() {
      if (_indent_count > 0) {
        _indent_count -= 1;
        _character_count -= parent.indent_length;
      }
    };
    this.trim = function() {
      while (this.last() === ' ') {
        var item = _items.pop();
        _character_count -= 1;
      }
      _empty = _items.length === 0;
    };
    this.toString = function() {
      var result = '';
      if (!this._empty) {
        if (_indent_count >= 0) {
          result = parent.indent_cache[_indent_count];
        }
        result += _items.join('');
      }
      return result;
    };
  }
  function Output(indent_string, baseIndentString) {
    baseIndentString = baseIndentString || '';
    this.indent_cache = [baseIndentString];
    this.baseIndentLength = baseIndentString.length;
    this.indent_length = indent_string.length;
    this.raw = false;
    var lines = [];
    this.baseIndentString = baseIndentString;
    this.indent_string = indent_string;
    this.previous_line = null;
    this.current_line = null;
    this.space_before_token = false;
    this.add_outputline = function() {
      this.previous_line = this.current_line;
      this.current_line = new OutputLine(this);
      lines.push(this.current_line);
    };
    this.add_outputline();
    this.get_line_number = function() {
      return lines.length;
    };
    this.add_new_line = function(force_newline) {
      if (this.get_line_number() === 1 && this.just_added_newline()) {
        return false;
      }
      if (force_newline || !this.just_added_newline()) {
        if (!this.raw) {
          this.add_outputline();
        }
        return true;
      }
      return false;
    };
    this.get_code = function() {
      var sweet_code = lines.join('\n').replace(/[\r\n\t ]+$/, '');
      return sweet_code;
    };
    this.set_indent = function(level) {
      if (lines.length > 1) {
        while (level >= this.indent_cache.length) {
          this.indent_cache.push(this.indent_cache[this.indent_cache.length - 1] + this.indent_string);
        }
        this.current_line.set_indent(level);
        return true;
      }
      this.current_line.set_indent(0);
      return false;
    };
    this.add_raw_token = function(token) {
      for (var x = 0; x < token.newlines; x++) {
        this.add_outputline();
      }
      this.current_line.push(token.whitespace_before);
      this.current_line.push(token.text);
      this.space_before_token = false;
    };
    this.add_token = function(printable_token) {
      this.add_space_before_token();
      this.current_line.push(printable_token);
    };
    this.add_space_before_token = function() {
      if (this.space_before_token && !this.just_added_newline()) {
        this.current_line.push(' ');
      }
      this.space_before_token = false;
    };
    this.remove_redundant_indentation = function(frame) {
      if (frame.multiline_frame || frame.mode === MODE.ForInitializer || frame.mode === MODE.Conditional) {
        return;
      }
      var index = frame.start_line_index;
      var line;
      var output_length = lines.length;
      while (index < output_length) {
        lines[index].remove_indent();
        index++;
      }
    };
    this.trim = function(eat_newlines) {
      eat_newlines = (eat_newlines === undefined) ? false : eat_newlines;
      this.current_line.trim(indent_string, baseIndentString);
      while (eat_newlines && lines.length > 1 && this.current_line.is_empty()) {
        lines.pop();
        this.current_line = lines[lines.length - 1];
        this.current_line.trim();
      }
      this.previous_line = lines.length > 1 ? lines[lines.length - 2] : null;
    };
    this.just_added_newline = function() {
      return this.current_line.is_empty();
    };
    this.just_added_blankline = function() {
      if (this.just_added_newline()) {
        if (lines.length === 1) {
          return true;
        }
        var line = lines[lines.length - 2];
        return line.is_empty();
      }
      return false;
    };
  }
  var Token = function(type, text, newlines, whitespace_before, mode, parent) {
    this.type = type;
    this.text = text;
    this.comments_before = [];
    this.newlines = newlines || 0;
    this.wanted_newline = newlines > 0;
    this.whitespace_before = whitespace_before || '';
    this.parent = null;
    this.directives = null;
  };
  function tokenizer(input, opts, indent_string) {
    var whitespace = "\n\r\t ".split('');
    var digit = /[0-9]/;
    var digit_hex = /[0123456789abcdefABCDEF]/;
    var punct = ('+ - * / % & ++ -- = += -= *= /= %= == === != !== > < >= <= >> << >>> >>>= >>= <<= && &= | || ! ~ , : ? ^ ^= |= :: =>' + ' <%= <% %> <?= <? ?>').split(' ');
    this.line_starters = 'continue,try,throw,return,var,let,const,if,switch,case,default,for,while,break,function,import,export'.split(',');
    var reserved_words = this.line_starters.concat(['do', 'in', 'else', 'get', 'set', 'new', 'catch', 'finally', 'typeof', 'yield', 'async', 'await']);
    var block_comment_pattern = /([\s\S]*?)((?:\*\/)|$)/g;
    var comment_pattern = /([^\n\r\u2028\u2029]*)/g;
    var directives_block_pattern = /\/\* beautify( \w+[:]\w+)+ \*\//g;
    var directive_pattern = / (\w+)[:](\w+)/g;
    var directives_end_ignore_pattern = /([\s\S]*?)((?:\/\*\sbeautify\signore:end\s\*\/)|$)/g;
    var template_pattern = /((<\?php|<\?=)[\s\S]*?\?>)|(<%[\s\S]*?%>)/g;
    var n_newlines,
        whitespace_before_token,
        in_html_comment,
        tokens,
        parser_pos;
    var input_length;
    this.tokenize = function() {
      input_length = input.length;
      parser_pos = 0;
      in_html_comment = false;
      tokens = [];
      var next,
          last;
      var token_values;
      var open = null;
      var open_stack = [];
      var comments = [];
      while (!(last && last.type === 'TK_EOF')) {
        token_values = tokenize_next();
        next = new Token(token_values[1], token_values[0], n_newlines, whitespace_before_token);
        while (next.type === 'TK_COMMENT' || next.type === 'TK_BLOCK_COMMENT' || next.type === 'TK_UNKNOWN') {
          if (next.type === 'TK_BLOCK_COMMENT') {
            next.directives = token_values[2];
          }
          comments.push(next);
          token_values = tokenize_next();
          next = new Token(token_values[1], token_values[0], n_newlines, whitespace_before_token);
        }
        if (comments.length) {
          next.comments_before = comments;
          comments = [];
        }
        if (next.type === 'TK_START_BLOCK' || next.type === 'TK_START_EXPR') {
          next.parent = last;
          open_stack.push(open);
          open = next;
        } else if ((next.type === 'TK_END_BLOCK' || next.type === 'TK_END_EXPR') && (open && ((next.text === ']' && open.text === '[') || (next.text === ')' && open.text === '(') || (next.text === '}' && open.text === '{')))) {
          next.parent = open.parent;
          open = open_stack.pop();
        }
        tokens.push(next);
        last = next;
      }
      return tokens;
    };
    function get_directives(text) {
      if (!text.match(directives_block_pattern)) {
        return null;
      }
      var directives = {};
      directive_pattern.lastIndex = 0;
      var directive_match = directive_pattern.exec(text);
      while (directive_match) {
        directives[directive_match[1]] = directive_match[2];
        directive_match = directive_pattern.exec(text);
      }
      return directives;
    }
    function tokenize_next() {
      var i,
          resulting_string;
      var whitespace_on_this_line = [];
      n_newlines = 0;
      whitespace_before_token = '';
      if (parser_pos >= input_length) {
        return ['', 'TK_EOF'];
      }
      var last_token;
      if (tokens.length) {
        last_token = tokens[tokens.length - 1];
      } else {
        last_token = new Token('TK_START_BLOCK', '{');
      }
      var c = input.charAt(parser_pos);
      parser_pos += 1;
      while (in_array(c, whitespace)) {
        if (acorn.newline.test(c)) {
          if (!(c === '\n' && input.charAt(parser_pos - 2) === '\r')) {
            n_newlines += 1;
            whitespace_on_this_line = [];
          }
        } else {
          whitespace_on_this_line.push(c);
        }
        if (parser_pos >= input_length) {
          return ['', 'TK_EOF'];
        }
        c = input.charAt(parser_pos);
        parser_pos += 1;
      }
      if (whitespace_on_this_line.length) {
        whitespace_before_token = whitespace_on_this_line.join('');
      }
      if (digit.test(c)) {
        var allow_decimal = true;
        var allow_e = true;
        var local_digit = digit;
        if (c === '0' && parser_pos < input_length && /[Xx]/.test(input.charAt(parser_pos))) {
          allow_decimal = false;
          allow_e = false;
          c += input.charAt(parser_pos);
          parser_pos += 1;
          local_digit = digit_hex;
        } else {
          c = '';
          parser_pos -= 1;
        }
        while (parser_pos < input_length && local_digit.test(input.charAt(parser_pos))) {
          c += input.charAt(parser_pos);
          parser_pos += 1;
          if (allow_decimal && parser_pos < input_length && input.charAt(parser_pos) === '.') {
            c += input.charAt(parser_pos);
            parser_pos += 1;
            allow_decimal = false;
          }
          if (allow_e && parser_pos < input_length && /[Ee]/.test(input.charAt(parser_pos))) {
            c += input.charAt(parser_pos);
            parser_pos += 1;
            if (parser_pos < input_length && /[+-]/.test(input.charAt(parser_pos))) {
              c += input.charAt(parser_pos);
              parser_pos += 1;
            }
            allow_e = false;
            allow_decimal = false;
          }
        }
        return [c, 'TK_WORD'];
      }
      if (acorn.isIdentifierStart(input.charCodeAt(parser_pos - 1))) {
        if (parser_pos < input_length) {
          while (acorn.isIdentifierChar(input.charCodeAt(parser_pos))) {
            c += input.charAt(parser_pos);
            parser_pos += 1;
            if (parser_pos === input_length) {
              break;
            }
          }
        }
        if (!(last_token.type === 'TK_DOT' || (last_token.type === 'TK_RESERVED' && in_array(last_token.text, ['set', 'get']))) && in_array(c, reserved_words)) {
          if (c === 'in') {
            return [c, 'TK_OPERATOR'];
          }
          return [c, 'TK_RESERVED'];
        }
        return [c, 'TK_WORD'];
      }
      if (c === '(' || c === '[') {
        return [c, 'TK_START_EXPR'];
      }
      if (c === ')' || c === ']') {
        return [c, 'TK_END_EXPR'];
      }
      if (c === '{') {
        return [c, 'TK_START_BLOCK'];
      }
      if (c === '}') {
        return [c, 'TK_END_BLOCK'];
      }
      if (c === ';') {
        return [c, 'TK_SEMICOLON'];
      }
      if (c === '/') {
        var comment = '';
        if (input.charAt(parser_pos) === '*') {
          parser_pos += 1;
          block_comment_pattern.lastIndex = parser_pos;
          var comment_match = block_comment_pattern.exec(input);
          comment = '/*' + comment_match[0];
          parser_pos += comment_match[0].length;
          var directives = get_directives(comment);
          if (directives && directives['ignore'] === 'start') {
            directives_end_ignore_pattern.lastIndex = parser_pos;
            comment_match = directives_end_ignore_pattern.exec(input);
            comment += comment_match[0];
            parser_pos += comment_match[0].length;
          }
          comment = comment.replace(acorn.lineBreak, '\n');
          return [comment, 'TK_BLOCK_COMMENT', directives];
        }
        if (input.charAt(parser_pos) === '/') {
          parser_pos += 1;
          comment_pattern.lastIndex = parser_pos;
          var comment_match = comment_pattern.exec(input);
          comment = '//' + comment_match[0];
          parser_pos += comment_match[0].length;
          return [comment, 'TK_COMMENT'];
        }
      }
      if (c === '`' || c === "'" || c === '"' || ((c === '/') || (opts.e4x && c === "<" && input.slice(parser_pos - 1).match(/^<([-a-zA-Z:0-9_.]+|{[^{}]*}|!\[CDATA\[[\s\S]*?\]\])(\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{.*?}))*\s*(\/?)\s*>/))) && ((last_token.type === 'TK_RESERVED' && in_array(last_token.text, ['return', 'case', 'throw', 'else', 'do', 'typeof', 'yield'])) || (last_token.type === 'TK_END_EXPR' && last_token.text === ')' && last_token.parent && last_token.parent.type === 'TK_RESERVED' && in_array(last_token.parent.text, ['if', 'while', 'for'])) || (in_array(last_token.type, ['TK_COMMENT', 'TK_START_EXPR', 'TK_START_BLOCK', 'TK_END_BLOCK', 'TK_OPERATOR', 'TK_EQUALS', 'TK_EOF', 'TK_SEMICOLON', 'TK_COMMA'])))) {
        var sep = c,
            esc = false,
            has_char_escapes = false;
        resulting_string = c;
        if (sep === '/') {
          var in_char_class = false;
          while (parser_pos < input_length && ((esc || in_char_class || input.charAt(parser_pos) !== sep) && !acorn.newline.test(input.charAt(parser_pos)))) {
            resulting_string += input.charAt(parser_pos);
            if (!esc) {
              esc = input.charAt(parser_pos) === '\\';
              if (input.charAt(parser_pos) === '[') {
                in_char_class = true;
              } else if (input.charAt(parser_pos) === ']') {
                in_char_class = false;
              }
            } else {
              esc = false;
            }
            parser_pos += 1;
          }
        } else if (opts.e4x && sep === '<') {
          var xmlRegExp = /<(\/?)([-a-zA-Z:0-9_.]+|{[^{}]*}|!\[CDATA\[[\s\S]*?\]\])(\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{.*?}))*\s*(\/?)\s*>/g;
          var xmlStr = input.slice(parser_pos - 1);
          var match = xmlRegExp.exec(xmlStr);
          if (match && match.index === 0) {
            var rootTag = match[2];
            var depth = 0;
            while (match) {
              var isEndTag = !!match[1];
              var tagName = match[2];
              var isSingletonTag = (!!match[match.length - 1]) || (tagName.slice(0, 8) === "![CDATA[");
              if (tagName === rootTag && !isSingletonTag) {
                if (isEndTag) {
                  --depth;
                } else {
                  ++depth;
                }
              }
              if (depth <= 0) {
                break;
              }
              match = xmlRegExp.exec(xmlStr);
            }
            var xmlLength = match ? match.index + match[0].length : xmlStr.length;
            xmlStr = xmlStr.slice(0, xmlLength);
            parser_pos += xmlLength - 1;
            xmlStr = xmlStr.replace(acorn.lineBreak, '\n');
            return [xmlStr, "TK_STRING"];
          }
        } else {
          while (parser_pos < input_length && (esc || (input.charAt(parser_pos) !== sep && (sep === '`' || !acorn.newline.test(input.charAt(parser_pos)))))) {
            if ((esc || sep === '`') && acorn.newline.test(input.charAt(parser_pos))) {
              if (input.charAt(parser_pos) === '\r' && input.charAt(parser_pos + 1) === '\n') {
                parser_pos += 1;
              }
              resulting_string += '\n';
            } else {
              resulting_string += input.charAt(parser_pos);
            }
            if (esc) {
              if (input.charAt(parser_pos) === 'x' || input.charAt(parser_pos) === 'u') {
                has_char_escapes = true;
              }
              esc = false;
            } else {
              esc = input.charAt(parser_pos) === '\\';
            }
            parser_pos += 1;
          }
        }
        if (has_char_escapes && opts.unescape_strings) {
          resulting_string = unescape_string(resulting_string);
        }
        if (parser_pos < input_length && input.charAt(parser_pos) === sep) {
          resulting_string += sep;
          parser_pos += 1;
          if (sep === '/') {
            while (parser_pos < input_length && acorn.isIdentifierStart(input.charCodeAt(parser_pos))) {
              resulting_string += input.charAt(parser_pos);
              parser_pos += 1;
            }
          }
        }
        return [resulting_string, 'TK_STRING'];
      }
      if (c === '#') {
        if (tokens.length === 0 && input.charAt(parser_pos) === '!') {
          resulting_string = c;
          while (parser_pos < input_length && c !== '\n') {
            c = input.charAt(parser_pos);
            resulting_string += c;
            parser_pos += 1;
          }
          return [trim(resulting_string) + '\n', 'TK_UNKNOWN'];
        }
        var sharp = '#';
        if (parser_pos < input_length && digit.test(input.charAt(parser_pos))) {
          do {
            c = input.charAt(parser_pos);
            sharp += c;
            parser_pos += 1;
          } while (parser_pos < input_length && c !== '#' && c !== '=');
          if (c === '#') {} else if (input.charAt(parser_pos) === '[' && input.charAt(parser_pos + 1) === ']') {
            sharp += '[]';
            parser_pos += 2;
          } else if (input.charAt(parser_pos) === '{' && input.charAt(parser_pos + 1) === '}') {
            sharp += '{}';
            parser_pos += 2;
          }
          return [sharp, 'TK_WORD'];
        }
      }
      if (c === '<' && (input.charAt(parser_pos) === '?' || input.charAt(parser_pos) === '%')) {
        template_pattern.lastIndex = parser_pos - 1;
        var template_match = template_pattern.exec(input);
        if (template_match) {
          c = template_match[0];
          parser_pos += c.length - 1;
          c = c.replace(acorn.lineBreak, '\n');
          return [c, 'TK_STRING'];
        }
      }
      if (c === '<' && input.substring(parser_pos - 1, parser_pos + 3) === '<!--') {
        parser_pos += 3;
        c = '<!--';
        while (!acorn.newline.test(input.charAt(parser_pos)) && parser_pos < input_length) {
          c += input.charAt(parser_pos);
          parser_pos++;
        }
        in_html_comment = true;
        return [c, 'TK_COMMENT'];
      }
      if (c === '-' && in_html_comment && input.substring(parser_pos - 1, parser_pos + 2) === '-->') {
        in_html_comment = false;
        parser_pos += 2;
        return ['-->', 'TK_COMMENT'];
      }
      if (c === '.') {
        return [c, 'TK_DOT'];
      }
      if (in_array(c, punct)) {
        while (parser_pos < input_length && in_array(c + input.charAt(parser_pos), punct)) {
          c += input.charAt(parser_pos);
          parser_pos += 1;
          if (parser_pos >= input_length) {
            break;
          }
        }
        if (c === ',') {
          return [c, 'TK_COMMA'];
        } else if (c === '=') {
          return [c, 'TK_EQUALS'];
        } else {
          return [c, 'TK_OPERATOR'];
        }
      }
      return [c, 'TK_UNKNOWN'];
    }
    function unescape_string(s) {
      var esc = false,
          out = '',
          pos = 0,
          s_hex = '',
          escaped = 0,
          c;
      while (esc || pos < s.length) {
        c = s.charAt(pos);
        pos++;
        if (esc) {
          esc = false;
          if (c === 'x') {
            s_hex = s.substr(pos, 2);
            pos += 2;
          } else if (c === 'u') {
            s_hex = s.substr(pos, 4);
            pos += 4;
          } else {
            out += '\\' + c;
            continue;
          }
          if (!s_hex.match(/^[0123456789abcdefABCDEF]+$/)) {
            return s;
          }
          escaped = parseInt(s_hex, 16);
          if (escaped >= 0x00 && escaped < 0x20) {
            if (c === 'x') {
              out += '\\x' + s_hex;
            } else {
              out += '\\u' + s_hex;
            }
            continue;
          } else if (escaped === 0x22 || escaped === 0x27 || escaped === 0x5c) {
            out += '\\' + String.fromCharCode(escaped);
          } else if (c === 'x' && escaped > 0x7e && escaped <= 0xff) {
            return s;
          } else {
            out += String.fromCharCode(escaped);
          }
        } else if (c === '\\') {
          esc = true;
        } else {
          out += c;
        }
      }
      return out;
    }
  }
  if (typeof define === "function" && define.amd) {
    define("2", [], function() {
      return {js_beautify: js_beautify};
    });
  } else if (typeof exports !== "undefined") {
    exports.js_beautify = js_beautify;
  } else if (typeof window !== "undefined") {
    window.js_beautify = js_beautify;
  } else if (typeof global !== "undefined") {
    global.js_beautify = js_beautify;
  }
}());

_removeDefine();
})();
$__System.registerDynamic("3", [], false, function(__require, __exports, __module) {
  var _retrieveGlobal = $__System.get("@@global-helpers").prepareGlobal(__module.id, null, null);
  (function() {
    var jsonlint = this["jsonlint"];
    var jsonlint = function() {
      var a = !0,
          b = !1,
          c = {},
          d = function() {
            var a = {
              trace: function() {},
              yy: {},
              symbols_: {
                error: 2,
                JSONString: 3,
                STRING: 4,
                JSONNumber: 5,
                NUMBER: 6,
                JSONNullLiteral: 7,
                NULL: 8,
                JSONBooleanLiteral: 9,
                TRUE: 10,
                FALSE: 11,
                JSONText: 12,
                JSONValue: 13,
                EOF: 14,
                JSONObject: 15,
                JSONArray: 16,
                "{": 17,
                "}": 18,
                JSONMemberList: 19,
                JSONMember: 20,
                ":": 21,
                ",": 22,
                "[": 23,
                "]": 24,
                JSONElementList: 25,
                $accept: 0,
                $end: 1
              },
              terminals_: {
                2: "error",
                4: "STRING",
                6: "NUMBER",
                8: "NULL",
                10: "TRUE",
                11: "FALSE",
                14: "EOF",
                17: "{",
                18: "}",
                21: ":",
                22: ",",
                23: "[",
                24: "]"
              },
              productions_: [0, [3, 1], [5, 1], [7, 1], [9, 1], [9, 1], [12, 2], [13, 1], [13, 1], [13, 1], [13, 1], [13, 1], [13, 1], [15, 2], [15, 3], [20, 3], [19, 1], [19, 3], [16, 2], [16, 3], [25, 1], [25, 3]],
              performAction: function(b, c, d, e, f, g, h) {
                var i = g.length - 1;
                switch (f) {
                  case 1:
                    this.$ = b.replace(/\\(\\|")/g, "$1").replace(/\\n/g, "\n").replace(/\\r/g, "\r").replace(/\\t/g, "	").replace(/\\v/g, "").replace(/\\f/g, "\f").replace(/\\b/g, "\b");
                    break;
                  case 2:
                    this.$ = Number(b);
                    break;
                  case 3:
                    this.$ = null;
                    break;
                  case 4:
                    this.$ = !0;
                    break;
                  case 5:
                    this.$ = !1;
                    break;
                  case 6:
                    return this.$ = g[i - 1];
                  case 13:
                    this.$ = {};
                    break;
                  case 14:
                    this.$ = g[i - 1];
                    break;
                  case 15:
                    this.$ = [g[i - 2], g[i]];
                    break;
                  case 16:
                    this.$ = {}, this.$[g[i][0]] = g[i][1];
                    break;
                  case 17:
                    this.$ = g[i - 2], g[i - 2][g[i][0]] = g[i][1];
                    break;
                  case 18:
                    this.$ = [];
                    break;
                  case 19:
                    this.$ = g[i - 1];
                    break;
                  case 20:
                    this.$ = [g[i]];
                    break;
                  case 21:
                    this.$ = g[i - 2], g[i - 2].push(g[i]);
                }
              },
              table: [{
                3: 5,
                4: [1, 12],
                5: 6,
                6: [1, 13],
                7: 3,
                8: [1, 9],
                9: 4,
                10: [1, 10],
                11: [1, 11],
                12: 1,
                13: 2,
                15: 7,
                16: 8,
                17: [1, 14],
                23: [1, 15]
              }, {1: [3]}, {14: [1, 16]}, {
                14: [2, 7],
                18: [2, 7],
                22: [2, 7],
                24: [2, 7]
              }, {
                14: [2, 8],
                18: [2, 8],
                22: [2, 8],
                24: [2, 8]
              }, {
                14: [2, 9],
                18: [2, 9],
                22: [2, 9],
                24: [2, 9]
              }, {
                14: [2, 10],
                18: [2, 10],
                22: [2, 10],
                24: [2, 10]
              }, {
                14: [2, 11],
                18: [2, 11],
                22: [2, 11],
                24: [2, 11]
              }, {
                14: [2, 12],
                18: [2, 12],
                22: [2, 12],
                24: [2, 12]
              }, {
                14: [2, 3],
                18: [2, 3],
                22: [2, 3],
                24: [2, 3]
              }, {
                14: [2, 4],
                18: [2, 4],
                22: [2, 4],
                24: [2, 4]
              }, {
                14: [2, 5],
                18: [2, 5],
                22: [2, 5],
                24: [2, 5]
              }, {
                14: [2, 1],
                18: [2, 1],
                21: [2, 1],
                22: [2, 1],
                24: [2, 1]
              }, {
                14: [2, 2],
                18: [2, 2],
                22: [2, 2],
                24: [2, 2]
              }, {
                3: 20,
                4: [1, 12],
                18: [1, 17],
                19: 18,
                20: 19
              }, {
                3: 5,
                4: [1, 12],
                5: 6,
                6: [1, 13],
                7: 3,
                8: [1, 9],
                9: 4,
                10: [1, 10],
                11: [1, 11],
                13: 23,
                15: 7,
                16: 8,
                17: [1, 14],
                23: [1, 15],
                24: [1, 21],
                25: 22
              }, {1: [2, 6]}, {
                14: [2, 13],
                18: [2, 13],
                22: [2, 13],
                24: [2, 13]
              }, {
                18: [1, 24],
                22: [1, 25]
              }, {
                18: [2, 16],
                22: [2, 16]
              }, {21: [1, 26]}, {
                14: [2, 18],
                18: [2, 18],
                22: [2, 18],
                24: [2, 18]
              }, {
                22: [1, 28],
                24: [1, 27]
              }, {
                22: [2, 20],
                24: [2, 20]
              }, {
                14: [2, 14],
                18: [2, 14],
                22: [2, 14],
                24: [2, 14]
              }, {
                3: 20,
                4: [1, 12],
                20: 29
              }, {
                3: 5,
                4: [1, 12],
                5: 6,
                6: [1, 13],
                7: 3,
                8: [1, 9],
                9: 4,
                10: [1, 10],
                11: [1, 11],
                13: 30,
                15: 7,
                16: 8,
                17: [1, 14],
                23: [1, 15]
              }, {
                14: [2, 19],
                18: [2, 19],
                22: [2, 19],
                24: [2, 19]
              }, {
                3: 5,
                4: [1, 12],
                5: 6,
                6: [1, 13],
                7: 3,
                8: [1, 9],
                9: 4,
                10: [1, 10],
                11: [1, 11],
                13: 31,
                15: 7,
                16: 8,
                17: [1, 14],
                23: [1, 15]
              }, {
                18: [2, 17],
                22: [2, 17]
              }, {
                18: [2, 15],
                22: [2, 15]
              }, {
                22: [2, 21],
                24: [2, 21]
              }],
              defaultActions: {16: [2, 6]},
              parseError: function(b, c) {
                throw new Error(b);
              },
              parse: function(b) {
                function o(a) {
                  d.length = d.length - 2 * a, e.length = e.length - a, f.length = f.length - a;
                }
                function p() {
                  var a;
                  return a = c.lexer.lex() || 1, typeof a != "number" && (a = c.symbols_[a] || a), a;
                }
                var c = this,
                    d = [0],
                    e = [null],
                    f = [],
                    g = this.table,
                    h = "",
                    i = 0,
                    j = 0,
                    k = 0,
                    l = 2,
                    m = 1;
                this.lexer.setInput(b), this.lexer.yy = this.yy, this.yy.lexer = this.lexer, typeof this.lexer.yylloc == "undefined" && (this.lexer.yylloc = {});
                var n = this.lexer.yylloc;
                f.push(n), typeof this.yy.parseError == "function" && (this.parseError = this.yy.parseError);
                var q,
                    r,
                    s,
                    t,
                    u,
                    v,
                    w = {},
                    x,
                    y,
                    z,
                    A;
                for (; ; ) {
                  s = d[d.length - 1], this.defaultActions[s] ? t = this.defaultActions[s] : (q == null && (q = p()), t = g[s] && g[s][q]);
                  if (typeof t == "undefined" || !t.length || !t[0]) {
                    if (!k) {
                      A = [];
                      for (x in g[s])
                        this.terminals_[x] && x > 2 && A.push("'" + this.terminals_[x] + "'");
                      var B = "";
                      this.lexer.showPosition ? B = "Parse error on line " + (i + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + A.join(", ") + ", got '" + this.terminals_[q] + "'" : B = "Parse error on line " + (i + 1) + ": Unexpected " + (q == 1 ? "end of input" : "'" + (this.terminals_[q] || q) + "'"), this.parseError(B, {
                        text: this.lexer.match,
                        token: this.terminals_[q] || q,
                        line: this.lexer.yylineno,
                        loc: n,
                        expected: A
                      });
                    }
                    if (k == 3) {
                      if (q == m)
                        throw new Error(B || "Parsing halted.");
                      j = this.lexer.yyleng, h = this.lexer.yytext, i = this.lexer.yylineno, n = this.lexer.yylloc, q = p();
                    }
                    for (; ; ) {
                      if (l.toString() in g[s])
                        break;
                      if (s == 0)
                        throw new Error(B || "Parsing halted.");
                      o(1), s = d[d.length - 1];
                    }
                    r = q, q = l, s = d[d.length - 1], t = g[s] && g[s][l], k = 3;
                  }
                  if (t[0] instanceof Array && t.length > 1)
                    throw new Error("Parse Error: multiple actions possible at state: " + s + ", token: " + q);
                  switch (t[0]) {
                    case 1:
                      d.push(q), e.push(this.lexer.yytext), f.push(this.lexer.yylloc), d.push(t[1]), q = null, r ? (q = r, r = null) : (j = this.lexer.yyleng, h = this.lexer.yytext, i = this.lexer.yylineno, n = this.lexer.yylloc, k > 0 && k--);
                      break;
                    case 2:
                      y = this.productions_[t[1]][1], w.$ = e[e.length - y], w._$ = {
                        first_line: f[f.length - (y || 1)].first_line,
                        last_line: f[f.length - 1].last_line,
                        first_column: f[f.length - (y || 1)].first_column,
                        last_column: f[f.length - 1].last_column
                      }, v = this.performAction.call(w, h, j, i, this.yy, t[1], e, f);
                      if (typeof v != "undefined")
                        return v;
                      y && (d = d.slice(0, -1 * y * 2), e = e.slice(0, -1 * y), f = f.slice(0, -1 * y)), d.push(this.productions_[t[1]][0]), e.push(w.$), f.push(w._$), z = g[d[d.length - 2]][d[d.length - 1]], d.push(z);
                      break;
                    case 3:
                      return !0;
                  }
                }
                return !0;
              }
            },
                b = function() {
                  var a = {
                    EOF: 1,
                    parseError: function(b, c) {
                      if (!this.yy.parseError)
                        throw new Error(b);
                      this.yy.parseError(b, c);
                    },
                    setInput: function(a) {
                      return this._input = a, this._more = this._less = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
                        first_line: 1,
                        first_column: 0,
                        last_line: 1,
                        last_column: 0
                      }, this;
                    },
                    input: function() {
                      var a = this._input[0];
                      this.yytext += a, this.yyleng++, this.match += a, this.matched += a;
                      var b = a.match(/\n/);
                      return b && this.yylineno++, this._input = this._input.slice(1), a;
                    },
                    unput: function(a) {
                      return this._input = a + this._input, this;
                    },
                    more: function() {
                      return this._more = !0, this;
                    },
                    less: function(a) {
                      this._input = this.match.slice(a) + this._input;
                    },
                    pastInput: function() {
                      var a = this.matched.substr(0, this.matched.length - this.match.length);
                      return (a.length > 20 ? "..." : "") + a.substr(-20).replace(/\n/g, "");
                    },
                    upcomingInput: function() {
                      var a = this.match;
                      return a.length < 20 && (a += this._input.substr(0, 20 - a.length)), (a.substr(0, 20) + (a.length > 20 ? "..." : "")).replace(/\n/g, "");
                    },
                    showPosition: function() {
                      var a = this.pastInput(),
                          b = (new Array(a.length + 1)).join("-");
                      return a + this.upcomingInput() + "\n" + b + "^";
                    },
                    next: function() {
                      if (this.done)
                        return this.EOF;
                      this._input || (this.done = !0);
                      var a,
                          b,
                          c,
                          d,
                          e,
                          f;
                      this._more || (this.yytext = "", this.match = "");
                      var g = this._currentRules();
                      for (var h = 0; h < g.length; h++) {
                        c = this._input.match(this.rules[g[h]]);
                        if (c && (!b || c[0].length > b[0].length)) {
                          b = c, d = h;
                          if (!this.options.flex)
                            break;
                        }
                      }
                      if (b) {
                        f = b[0].match(/\n.*/g), f && (this.yylineno += f.length), this.yylloc = {
                          first_line: this.yylloc.last_line,
                          last_line: this.yylineno + 1,
                          first_column: this.yylloc.last_column,
                          last_column: f ? f[f.length - 1].length - 1 : this.yylloc.last_column + b[0].length
                        }, this.yytext += b[0], this.match += b[0], this.yyleng = this.yytext.length, this._more = !1, this._input = this._input.slice(b[0].length), this.matched += b[0], a = this.performAction.call(this, this.yy, this, g[d], this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1);
                        if (a)
                          return a;
                        return;
                      }
                      if (this._input === "")
                        return this.EOF;
                      this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                      });
                    },
                    lex: function() {
                      var b = this.next();
                      return typeof b != "undefined" ? b : this.lex();
                    },
                    begin: function(b) {
                      this.conditionStack.push(b);
                    },
                    popState: function() {
                      return this.conditionStack.pop();
                    },
                    _currentRules: function() {
                      return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
                    },
                    topState: function() {
                      return this.conditionStack[this.conditionStack.length - 2];
                    },
                    pushState: function(b) {
                      this.begin(b);
                    }
                  };
                  return a.options = {}, a.performAction = function(b, c, d, e) {
                    var f = e;
                    switch (d) {
                      case 0:
                        break;
                      case 1:
                        return 6;
                      case 2:
                        return c.yytext = c.yytext.substr(1, c.yyleng - 2), 4;
                      case 3:
                        return 17;
                      case 4:
                        return 18;
                      case 5:
                        return 23;
                      case 6:
                        return 24;
                      case 7:
                        return 22;
                      case 8:
                        return 21;
                      case 9:
                        return 10;
                      case 10:
                        return 11;
                      case 11:
                        return 8;
                      case 12:
                        return 14;
                      case 13:
                        return "INVALID";
                    }
                  }, a.rules = [/^(?:\s+)/, /^(?:(-?([0-9]|[1-9][0-9]+))(\.[0-9]+)?([eE][-+]?[0-9]+)?\b)/, /^(?:"(?:\\[\\"bfnrt/]|\\u[a-fA-F0-9]{4}|[^\\\0-\x09\x0a-\x1f"])*")/, /^(?:\{)/, /^(?:\})/, /^(?:\[)/, /^(?:\])/, /^(?:,)/, /^(?::)/, /^(?:true\b)/, /^(?:false\b)/, /^(?:null\b)/, /^(?:$)/, /^(?:.)/], a.conditions = {INITIAL: {
                      rules: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                      inclusive: !0
                    }}, a;
                }();
            return a.lexer = b, a;
          }();
      return typeof a != "undefined" && typeof c != "undefined" && (c.parser = d, c.parse = function() {
        return d.parse.apply(d, arguments);
      }, c.main = function(d) {
        if (!d[1])
          throw new Error("Usage: " + d[0] + " FILE");
        if (typeof process != "undefined")
          var e = a("fs").readFileSync(a("path").join(process.cwd(), d[1]), "utf8");
        else
          var f = a("file").path(a("file").cwd()),
              e = f.join(d[1]).read({charset: "utf-8"});
        return c.parser.parse(e);
      }, typeof b != "undefined" && a.main === b && c.main(typeof process != "undefined" ? process.argv.slice(1) : a("system").args)), c;
    }();
    this["jsonlint"] = jsonlint;
  })();
  return _retrieveGlobal();
});

(function() {
var _removeDefine = $__System.get("@@amd-helpers").createDefine();
(function(mod) {
  if (typeof exports == "object" && typeof module == "object")
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd)
    define("4", ["5"], mod);
  else
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";
  CodeMirror.defineMode("javascript", function(config, parserConfig) {
    var indentUnit = config.indentUnit;
    var statementIndent = parserConfig.statementIndent;
    var jsonldMode = parserConfig.jsonld;
    var jsonMode = parserConfig.json || jsonldMode;
    var isTS = parserConfig.typescript;
    var wordRE = parserConfig.wordCharacters || /[\w$\xa1-\uffff]/;
    var keywords = function() {
      function kw(type) {
        return {
          type: type,
          style: "keyword"
        };
      }
      var A = kw("keyword a"),
          B = kw("keyword b"),
          C = kw("keyword c");
      var operator = kw("operator"),
          atom = {
            type: "atom",
            style: "atom"
          };
      var jsKeywords = {
        "if": kw("if"),
        "while": A,
        "with": A,
        "else": B,
        "do": B,
        "try": B,
        "finally": B,
        "return": C,
        "break": C,
        "continue": C,
        "new": kw("new"),
        "delete": C,
        "throw": C,
        "debugger": C,
        "var": kw("var"),
        "const": kw("var"),
        "let": kw("var"),
        "async": kw("async"),
        "function": kw("function"),
        "catch": kw("catch"),
        "for": kw("for"),
        "switch": kw("switch"),
        "case": kw("case"),
        "default": kw("default"),
        "in": operator,
        "typeof": operator,
        "instanceof": operator,
        "true": atom,
        "false": atom,
        "null": atom,
        "undefined": atom,
        "NaN": atom,
        "Infinity": atom,
        "this": kw("this"),
        "class": kw("class"),
        "super": kw("atom"),
        "await": C,
        "yield": C,
        "export": kw("export"),
        "import": kw("import"),
        "extends": C
      };
      if (isTS) {
        var type = {
          type: "variable",
          style: "variable-3"
        };
        var tsKeywords = {
          "interface": kw("interface"),
          "extends": kw("extends"),
          "constructor": kw("constructor"),
          "public": kw("public"),
          "private": kw("private"),
          "protected": kw("protected"),
          "static": kw("static"),
          "string": type,
          "number": type,
          "boolean": type,
          "any": type
        };
        for (var attr in tsKeywords) {
          jsKeywords[attr] = tsKeywords[attr];
        }
      }
      return jsKeywords;
    }();
    var isOperatorChar = /[+\-*&%=<>!?|~^]/;
    var isJsonldKeyword = /^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/;
    function readRegexp(stream) {
      var escaped = false,
          next,
          inSet = false;
      while ((next = stream.next()) != null) {
        if (!escaped) {
          if (next == "/" && !inSet)
            return;
          if (next == "[")
            inSet = true;
          else if (inSet && next == "]")
            inSet = false;
        }
        escaped = !escaped && next == "\\";
      }
    }
    var type,
        content;
    function ret(tp, style, cont) {
      type = tp;
      content = cont;
      return style;
    }
    function tokenBase(stream, state) {
      var ch = stream.next();
      if (ch == '"' || ch == "'") {
        state.tokenize = tokenString(ch);
        return state.tokenize(stream, state);
      } else if (ch == "." && stream.match(/^\d+(?:[eE][+\-]?\d+)?/)) {
        return ret("number", "number");
      } else if (ch == "." && stream.match("..")) {
        return ret("spread", "meta");
      } else if (/[\[\]{}\(\),;\:\.]/.test(ch)) {
        return ret(ch);
      } else if (ch == "=" && stream.eat(">")) {
        return ret("=>", "operator");
      } else if (ch == "0" && stream.eat(/x/i)) {
        stream.eatWhile(/[\da-f]/i);
        return ret("number", "number");
      } else if (ch == "0" && stream.eat(/o/i)) {
        stream.eatWhile(/[0-7]/i);
        return ret("number", "number");
      } else if (ch == "0" && stream.eat(/b/i)) {
        stream.eatWhile(/[01]/i);
        return ret("number", "number");
      } else if (/\d/.test(ch)) {
        stream.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/);
        return ret("number", "number");
      } else if (ch == "/") {
        if (stream.eat("*")) {
          state.tokenize = tokenComment;
          return tokenComment(stream, state);
        } else if (stream.eat("/")) {
          stream.skipToEnd();
          return ret("comment", "comment");
        } else if (state.lastType == "operator" || state.lastType == "keyword c" || state.lastType == "sof" || /^[\[{}\(,;:]$/.test(state.lastType)) {
          readRegexp(stream);
          stream.match(/^\b(([gimyu])(?![gimyu]*\2))+\b/);
          return ret("regexp", "string-2");
        } else {
          stream.eatWhile(isOperatorChar);
          return ret("operator", "operator", stream.current());
        }
      } else if (ch == "`") {
        state.tokenize = tokenQuasi;
        return tokenQuasi(stream, state);
      } else if (ch == "#") {
        stream.skipToEnd();
        return ret("error", "error");
      } else if (isOperatorChar.test(ch)) {
        stream.eatWhile(isOperatorChar);
        return ret("operator", "operator", stream.current());
      } else if (wordRE.test(ch)) {
        stream.eatWhile(wordRE);
        var word = stream.current(),
            known = keywords.propertyIsEnumerable(word) && keywords[word];
        return (known && state.lastType != ".") ? ret(known.type, known.style, word) : ret("variable", "variable", word);
      }
    }
    function tokenString(quote) {
      return function(stream, state) {
        var escaped = false,
            next;
        if (jsonldMode && stream.peek() == "@" && stream.match(isJsonldKeyword)) {
          state.tokenize = tokenBase;
          return ret("jsonld-keyword", "meta");
        }
        while ((next = stream.next()) != null) {
          if (next == quote && !escaped)
            break;
          escaped = !escaped && next == "\\";
        }
        if (!escaped)
          state.tokenize = tokenBase;
        return ret("string", "string");
      };
    }
    function tokenComment(stream, state) {
      var maybeEnd = false,
          ch;
      while (ch = stream.next()) {
        if (ch == "/" && maybeEnd) {
          state.tokenize = tokenBase;
          break;
        }
        maybeEnd = (ch == "*");
      }
      return ret("comment", "comment");
    }
    function tokenQuasi(stream, state) {
      var escaped = false,
          next;
      while ((next = stream.next()) != null) {
        if (!escaped && (next == "`" || next == "$" && stream.eat("{"))) {
          state.tokenize = tokenBase;
          break;
        }
        escaped = !escaped && next == "\\";
      }
      return ret("quasi", "string-2", stream.current());
    }
    var brackets = "([{}])";
    function findFatArrow(stream, state) {
      if (state.fatArrowAt)
        state.fatArrowAt = null;
      var arrow = stream.string.indexOf("=>", stream.start);
      if (arrow < 0)
        return;
      var depth = 0,
          sawSomething = false;
      for (var pos = arrow - 1; pos >= 0; --pos) {
        var ch = stream.string.charAt(pos);
        var bracket = brackets.indexOf(ch);
        if (bracket >= 0 && bracket < 3) {
          if (!depth) {
            ++pos;
            break;
          }
          if (--depth == 0)
            break;
        } else if (bracket >= 3 && bracket < 6) {
          ++depth;
        } else if (wordRE.test(ch)) {
          sawSomething = true;
        } else if (/["'\/]/.test(ch)) {
          return;
        } else if (sawSomething && !depth) {
          ++pos;
          break;
        }
      }
      if (sawSomething && !depth)
        state.fatArrowAt = pos;
    }
    var atomicTypes = {
      "atom": true,
      "number": true,
      "variable": true,
      "string": true,
      "regexp": true,
      "this": true,
      "jsonld-keyword": true
    };
    function JSLexical(indented, column, type, align, prev, info) {
      this.indented = indented;
      this.column = column;
      this.type = type;
      this.prev = prev;
      this.info = info;
      if (align != null)
        this.align = align;
    }
    function inScope(state, varname) {
      for (var v = state.localVars; v; v = v.next)
        if (v.name == varname)
          return true;
      for (var cx = state.context; cx; cx = cx.prev) {
        for (var v = cx.vars; v; v = v.next)
          if (v.name == varname)
            return true;
      }
    }
    function parseJS(state, style, type, content, stream) {
      var cc = state.cc;
      cx.state = state;
      cx.stream = stream;
      cx.marked = null, cx.cc = cc;
      cx.style = style;
      if (!state.lexical.hasOwnProperty("align"))
        state.lexical.align = true;
      while (true) {
        var combinator = cc.length ? cc.pop() : jsonMode ? expression : statement;
        if (combinator(type, content)) {
          while (cc.length && cc[cc.length - 1].lex)
            cc.pop()();
          if (cx.marked)
            return cx.marked;
          if (type == "variable" && inScope(state, content))
            return "variable-2";
          return style;
        }
      }
    }
    var cx = {
      state: null,
      column: null,
      marked: null,
      cc: null
    };
    function pass() {
      for (var i = arguments.length - 1; i >= 0; i--)
        cx.cc.push(arguments[i]);
    }
    function cont() {
      pass.apply(null, arguments);
      return true;
    }
    function register(varname) {
      function inList(list) {
        for (var v = list; v; v = v.next)
          if (v.name == varname)
            return true;
        return false;
      }
      var state = cx.state;
      cx.marked = "def";
      if (state.context) {
        if (inList(state.localVars))
          return;
        state.localVars = {
          name: varname,
          next: state.localVars
        };
      } else {
        if (inList(state.globalVars))
          return;
        if (parserConfig.globalVars)
          state.globalVars = {
            name: varname,
            next: state.globalVars
          };
      }
    }
    var defaultVars = {
      name: "this",
      next: {name: "arguments"}
    };
    function pushcontext() {
      cx.state.context = {
        prev: cx.state.context,
        vars: cx.state.localVars
      };
      cx.state.localVars = defaultVars;
    }
    function popcontext() {
      cx.state.localVars = cx.state.context.vars;
      cx.state.context = cx.state.context.prev;
    }
    function pushlex(type, info) {
      var result = function() {
        var state = cx.state,
            indent = state.indented;
        if (state.lexical.type == "stat")
          indent = state.lexical.indented;
        else
          for (var outer = state.lexical; outer && outer.type == ")" && outer.align; outer = outer.prev)
            indent = outer.indented;
        state.lexical = new JSLexical(indent, cx.stream.column(), type, null, state.lexical, info);
      };
      result.lex = true;
      return result;
    }
    function poplex() {
      var state = cx.state;
      if (state.lexical.prev) {
        if (state.lexical.type == ")")
          state.indented = state.lexical.indented;
        state.lexical = state.lexical.prev;
      }
    }
    poplex.lex = true;
    function expect(wanted) {
      function exp(type) {
        if (type == wanted)
          return cont();
        else if (wanted == ";")
          return pass();
        else
          return cont(exp);
      }
      ;
      return exp;
    }
    function statement(type, value) {
      if (type == "var")
        return cont(pushlex("vardef", value.length), vardef, expect(";"), poplex);
      if (type == "keyword a")
        return cont(pushlex("form"), expression, statement, poplex);
      if (type == "keyword b")
        return cont(pushlex("form"), statement, poplex);
      if (type == "{")
        return cont(pushlex("}"), block, poplex);
      if (type == ";")
        return cont();
      if (type == "if") {
        if (cx.state.lexical.info == "else" && cx.state.cc[cx.state.cc.length - 1] == poplex)
          cx.state.cc.pop()();
        return cont(pushlex("form"), expression, statement, poplex, maybeelse);
      }
      if (type == "function")
        return cont(functiondef);
      if (type == "for")
        return cont(pushlex("form"), forspec, statement, poplex);
      if (type == "variable")
        return cont(pushlex("stat"), maybelabel);
      if (type == "switch")
        return cont(pushlex("form"), expression, pushlex("}", "switch"), expect("{"), block, poplex, poplex);
      if (type == "case")
        return cont(expression, expect(":"));
      if (type == "default")
        return cont(expect(":"));
      if (type == "catch")
        return cont(pushlex("form"), pushcontext, expect("("), funarg, expect(")"), statement, poplex, popcontext);
      if (type == "class")
        return cont(pushlex("form"), className, poplex);
      if (type == "export")
        return cont(pushlex("stat"), afterExport, poplex);
      if (type == "import")
        return cont(pushlex("stat"), afterImport, poplex);
      return pass(pushlex("stat"), expression, expect(";"), poplex);
    }
    function expression(type) {
      return expressionInner(type, false);
    }
    function expressionNoComma(type) {
      return expressionInner(type, true);
    }
    function expressionInner(type, noComma) {
      if (cx.state.fatArrowAt == cx.stream.start) {
        var body = noComma ? arrowBodyNoComma : arrowBody;
        if (type == "(")
          return cont(pushcontext, pushlex(")"), commasep(pattern, ")"), poplex, expect("=>"), body, popcontext);
        else if (type == "variable")
          return pass(pushcontext, pattern, expect("=>"), body, popcontext);
      }
      var maybeop = noComma ? maybeoperatorNoComma : maybeoperatorComma;
      if (atomicTypes.hasOwnProperty(type))
        return cont(maybeop);
      if (type == "async")
        return cont(expression);
      if (type == "function")
        return cont(functiondef, maybeop);
      if (type == "keyword c")
        return cont(noComma ? maybeexpressionNoComma : maybeexpression);
      if (type == "(")
        return cont(pushlex(")"), maybeexpression, comprehension, expect(")"), poplex, maybeop);
      if (type == "operator" || type == "spread")
        return cont(noComma ? expressionNoComma : expression);
      if (type == "[")
        return cont(pushlex("]"), arrayLiteral, poplex, maybeop);
      if (type == "{")
        return contCommasep(objprop, "}", null, maybeop);
      if (type == "quasi")
        return pass(quasi, maybeop);
      if (type == "new")
        return cont(maybeTarget(noComma));
      return cont();
    }
    function maybeexpression(type) {
      if (type.match(/[;\}\)\],]/))
        return pass();
      return pass(expression);
    }
    function maybeexpressionNoComma(type) {
      if (type.match(/[;\}\)\],]/))
        return pass();
      return pass(expressionNoComma);
    }
    function maybeoperatorComma(type, value) {
      if (type == ",")
        return cont(expression);
      return maybeoperatorNoComma(type, value, false);
    }
    function maybeoperatorNoComma(type, value, noComma) {
      var me = noComma == false ? maybeoperatorComma : maybeoperatorNoComma;
      var expr = noComma == false ? expression : expressionNoComma;
      if (type == "=>")
        return cont(pushcontext, noComma ? arrowBodyNoComma : arrowBody, popcontext);
      if (type == "operator") {
        if (/\+\+|--/.test(value))
          return cont(me);
        if (value == "?")
          return cont(expression, expect(":"), expr);
        return cont(expr);
      }
      if (type == "quasi") {
        return pass(quasi, me);
      }
      if (type == ";")
        return;
      if (type == "(")
        return contCommasep(expressionNoComma, ")", "call", me);
      if (type == ".")
        return cont(property, me);
      if (type == "[")
        return cont(pushlex("]"), maybeexpression, expect("]"), poplex, me);
    }
    function quasi(type, value) {
      if (type != "quasi")
        return pass();
      if (value.slice(value.length - 2) != "${")
        return cont(quasi);
      return cont(expression, continueQuasi);
    }
    function continueQuasi(type) {
      if (type == "}") {
        cx.marked = "string-2";
        cx.state.tokenize = tokenQuasi;
        return cont(quasi);
      }
    }
    function arrowBody(type) {
      findFatArrow(cx.stream, cx.state);
      return pass(type == "{" ? statement : expression);
    }
    function arrowBodyNoComma(type) {
      findFatArrow(cx.stream, cx.state);
      return pass(type == "{" ? statement : expressionNoComma);
    }
    function maybeTarget(noComma) {
      return function(type) {
        if (type == ".")
          return cont(noComma ? targetNoComma : target);
        else
          return pass(noComma ? expressionNoComma : expression);
      };
    }
    function target(_, value) {
      if (value == "target") {
        cx.marked = "keyword";
        return cont(maybeoperatorComma);
      }
    }
    function targetNoComma(_, value) {
      if (value == "target") {
        cx.marked = "keyword";
        return cont(maybeoperatorNoComma);
      }
    }
    function maybelabel(type) {
      if (type == ":")
        return cont(poplex, statement);
      return pass(maybeoperatorComma, expect(";"), poplex);
    }
    function property(type) {
      if (type == "variable") {
        cx.marked = "property";
        return cont();
      }
    }
    function objprop(type, value) {
      if (type == "async") {
        return cont(objprop);
      } else if (type == "variable" || cx.style == "keyword") {
        cx.marked = "property";
        if (value == "get" || value == "set")
          return cont(getterSetter);
        return cont(afterprop);
      } else if (type == "number" || type == "string") {
        cx.marked = jsonldMode ? "property" : (cx.style + " property");
        return cont(afterprop);
      } else if (type == "jsonld-keyword") {
        return cont(afterprop);
      } else if (type == "[") {
        return cont(expression, expect("]"), afterprop);
      }
    }
    function getterSetter(type) {
      if (type != "variable")
        return pass(afterprop);
      cx.marked = "property";
      return cont(functiondef);
    }
    function afterprop(type) {
      if (type == ":")
        return cont(expressionNoComma);
      if (type == "(")
        return pass(functiondef);
    }
    function commasep(what, end) {
      function proceed(type) {
        if (type == ",") {
          var lex = cx.state.lexical;
          if (lex.info == "call")
            lex.pos = (lex.pos || 0) + 1;
          return cont(what, proceed);
        }
        if (type == end)
          return cont();
        return cont(expect(end));
      }
      return function(type) {
        if (type == end)
          return cont();
        return pass(what, proceed);
      };
    }
    function contCommasep(what, end, info) {
      for (var i = 3; i < arguments.length; i++)
        cx.cc.push(arguments[i]);
      return cont(pushlex(end, info), commasep(what, end), poplex);
    }
    function block(type) {
      if (type == "}")
        return cont();
      return pass(statement, block);
    }
    function maybetype(type) {
      if (isTS && type == ":")
        return cont(typedef);
    }
    function maybedefault(_, value) {
      if (value == "=")
        return cont(expressionNoComma);
    }
    function typedef(type) {
      if (type == "variable") {
        cx.marked = "variable-3";
        return cont();
      }
    }
    function vardef() {
      return pass(pattern, maybetype, maybeAssign, vardefCont);
    }
    function pattern(type, value) {
      if (type == "variable") {
        register(value);
        return cont();
      }
      if (type == "spread")
        return cont(pattern);
      if (type == "[")
        return contCommasep(pattern, "]");
      if (type == "{")
        return contCommasep(proppattern, "}");
    }
    function proppattern(type, value) {
      if (type == "variable" && !cx.stream.match(/^\s*:/, false)) {
        register(value);
        return cont(maybeAssign);
      }
      if (type == "variable")
        cx.marked = "property";
      if (type == "spread")
        return cont(pattern);
      return cont(expect(":"), pattern, maybeAssign);
    }
    function maybeAssign(_type, value) {
      if (value == "=")
        return cont(expressionNoComma);
    }
    function vardefCont(type) {
      if (type == ",")
        return cont(vardef);
    }
    function maybeelse(type, value) {
      if (type == "keyword b" && value == "else")
        return cont(pushlex("form", "else"), statement, poplex);
    }
    function forspec(type) {
      if (type == "(")
        return cont(pushlex(")"), forspec1, expect(")"), poplex);
    }
    function forspec1(type) {
      if (type == "var")
        return cont(vardef, expect(";"), forspec2);
      if (type == ";")
        return cont(forspec2);
      if (type == "variable")
        return cont(formaybeinof);
      return pass(expression, expect(";"), forspec2);
    }
    function formaybeinof(_type, value) {
      if (value == "in" || value == "of") {
        cx.marked = "keyword";
        return cont(expression);
      }
      return cont(maybeoperatorComma, forspec2);
    }
    function forspec2(type, value) {
      if (type == ";")
        return cont(forspec3);
      if (value == "in" || value == "of") {
        cx.marked = "keyword";
        return cont(expression);
      }
      return pass(expression, expect(";"), forspec3);
    }
    function forspec3(type) {
      if (type != ")")
        cont(expression);
    }
    function functiondef(type, value) {
      if (value == "*") {
        cx.marked = "keyword";
        return cont(functiondef);
      }
      if (type == "variable") {
        register(value);
        return cont(functiondef);
      }
      if (type == "(")
        return cont(pushcontext, pushlex(")"), commasep(funarg, ")"), poplex, statement, popcontext);
    }
    function funarg(type) {
      if (type == "spread")
        return cont(funarg);
      return pass(pattern, maybetype, maybedefault);
    }
    function className(type, value) {
      if (type == "variable") {
        register(value);
        return cont(classNameAfter);
      }
    }
    function classNameAfter(type, value) {
      if (value == "extends")
        return cont(expression, classNameAfter);
      if (type == "{")
        return cont(pushlex("}"), classBody, poplex);
    }
    function classBody(type, value) {
      if (type == "variable" || cx.style == "keyword") {
        if (value == "static") {
          cx.marked = "keyword";
          return cont(classBody);
        }
        cx.marked = "property";
        if (value == "get" || value == "set")
          return cont(classGetterSetter, functiondef, classBody);
        return cont(functiondef, classBody);
      }
      if (value == "*") {
        cx.marked = "keyword";
        return cont(classBody);
      }
      if (type == ";")
        return cont(classBody);
      if (type == "}")
        return cont();
    }
    function classGetterSetter(type) {
      if (type != "variable")
        return pass();
      cx.marked = "property";
      return cont();
    }
    function afterExport(_type, value) {
      if (value == "*") {
        cx.marked = "keyword";
        return cont(maybeFrom, expect(";"));
      }
      if (value == "default") {
        cx.marked = "keyword";
        return cont(expression, expect(";"));
      }
      return pass(statement);
    }
    function afterImport(type) {
      if (type == "string")
        return cont();
      return pass(importSpec, maybeFrom);
    }
    function importSpec(type, value) {
      if (type == "{")
        return contCommasep(importSpec, "}");
      if (type == "variable")
        register(value);
      if (value == "*")
        cx.marked = "keyword";
      return cont(maybeAs);
    }
    function maybeAs(_type, value) {
      if (value == "as") {
        cx.marked = "keyword";
        return cont(importSpec);
      }
    }
    function maybeFrom(_type, value) {
      if (value == "from") {
        cx.marked = "keyword";
        return cont(expression);
      }
    }
    function arrayLiteral(type) {
      if (type == "]")
        return cont();
      return pass(expressionNoComma, maybeArrayComprehension);
    }
    function maybeArrayComprehension(type) {
      if (type == "for")
        return pass(comprehension, expect("]"));
      if (type == ",")
        return cont(commasep(maybeexpressionNoComma, "]"));
      return pass(commasep(expressionNoComma, "]"));
    }
    function comprehension(type) {
      if (type == "for")
        return cont(forspec, comprehension);
      if (type == "if")
        return cont(expression, comprehension);
    }
    function isContinuedStatement(state, textAfter) {
      return state.lastType == "operator" || state.lastType == "," || isOperatorChar.test(textAfter.charAt(0)) || /[,.]/.test(textAfter.charAt(0));
    }
    return {
      startState: function(basecolumn) {
        var state = {
          tokenize: tokenBase,
          lastType: "sof",
          cc: [],
          lexical: new JSLexical((basecolumn || 0) - indentUnit, 0, "block", false),
          localVars: parserConfig.localVars,
          context: parserConfig.localVars && {vars: parserConfig.localVars},
          indented: 0
        };
        if (parserConfig.globalVars && typeof parserConfig.globalVars == "object")
          state.globalVars = parserConfig.globalVars;
        return state;
      },
      token: function(stream, state) {
        if (stream.sol()) {
          if (!state.lexical.hasOwnProperty("align"))
            state.lexical.align = false;
          state.indented = stream.indentation();
          findFatArrow(stream, state);
        }
        if (state.tokenize != tokenComment && stream.eatSpace())
          return null;
        var style = state.tokenize(stream, state);
        if (type == "comment")
          return style;
        state.lastType = type == "operator" && (content == "++" || content == "--") ? "incdec" : type;
        return parseJS(state, style, type, content, stream);
      },
      indent: function(state, textAfter) {
        if (state.tokenize == tokenComment)
          return CodeMirror.Pass;
        if (state.tokenize != tokenBase)
          return 0;
        var firstChar = textAfter && textAfter.charAt(0),
            lexical = state.lexical;
        if (!/^\s*else\b/.test(textAfter))
          for (var i = state.cc.length - 1; i >= 0; --i) {
            var c = state.cc[i];
            if (c == poplex)
              lexical = lexical.prev;
            else if (c != maybeelse)
              break;
          }
        if (lexical.type == "stat" && firstChar == "}")
          lexical = lexical.prev;
        if (statementIndent && lexical.type == ")" && lexical.prev.type == "stat")
          lexical = lexical.prev;
        var type = lexical.type,
            closing = firstChar == type;
        if (type == "vardef")
          return lexical.indented + (state.lastType == "operator" || state.lastType == "," ? lexical.info + 1 : 0);
        else if (type == "form" && firstChar == "{")
          return lexical.indented;
        else if (type == "form")
          return lexical.indented + indentUnit;
        else if (type == "stat")
          return lexical.indented + (isContinuedStatement(state, textAfter) ? statementIndent || indentUnit : 0);
        else if (lexical.info == "switch" && !closing && parserConfig.doubleIndentSwitch != false)
          return lexical.indented + (/^(?:case|default)\b/.test(textAfter) ? indentUnit : 2 * indentUnit);
        else if (lexical.align)
          return lexical.column + (closing ? 0 : 1);
        else
          return lexical.indented + (closing ? 0 : indentUnit);
      },
      electricInput: /^\s*(?:case .*?:|default:|\{|\})$/,
      blockCommentStart: jsonMode ? null : "/*",
      blockCommentEnd: jsonMode ? null : "*/",
      lineComment: jsonMode ? null : "//",
      fold: "brace",
      closeBrackets: "()[]{}''\"\"``",
      helperType: jsonMode ? "json" : "javascript",
      jsonldMode: jsonldMode,
      jsonMode: jsonMode
    };
  });
  CodeMirror.registerHelper("wordChars", "javascript", /[\w$]/);
  CodeMirror.defineMIME("text/javascript", "javascript");
  CodeMirror.defineMIME("text/ecmascript", "javascript");
  CodeMirror.defineMIME("application/javascript", "javascript");
  CodeMirror.defineMIME("application/x-javascript", "javascript");
  CodeMirror.defineMIME("application/ecmascript", "javascript");
  CodeMirror.defineMIME("application/json", {
    name: "javascript",
    json: true
  });
  CodeMirror.defineMIME("application/x-json", {
    name: "javascript",
    json: true
  });
  CodeMirror.defineMIME("application/ld+json", {
    name: "javascript",
    jsonld: true
  });
  CodeMirror.defineMIME("text/typescript", {
    name: "javascript",
    typescript: true
  });
  CodeMirror.defineMIME("application/typescript", {
    name: "javascript",
    typescript: true
  });
});

_removeDefine();
})();
(function() {
var _removeDefine = $__System.get("@@amd-helpers").createDefine();
(function(mod) {
  if (typeof exports == "object" && typeof module == "object")
    module.exports = mod();
  else if (typeof define == "function" && define.amd)
    return define("5", [], mod);
  else
    this.CodeMirror = mod();
})(function() {
  "use strict";
  var userAgent = navigator.userAgent;
  var platform = navigator.platform;
  var gecko = /gecko\/\d/i.test(userAgent);
  var ie_upto10 = /MSIE \d/.test(userAgent);
  var ie_11up = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(userAgent);
  var ie = ie_upto10 || ie_11up;
  var ie_version = ie && (ie_upto10 ? document.documentMode || 6 : ie_11up[1]);
  var webkit = /WebKit\//.test(userAgent);
  var qtwebkit = webkit && /Qt\/\d+\.\d+/.test(userAgent);
  var chrome = /Chrome\//.test(userAgent);
  var presto = /Opera\//.test(userAgent);
  var safari = /Apple Computer/.test(navigator.vendor);
  var mac_geMountainLion = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(userAgent);
  var phantom = /PhantomJS/.test(userAgent);
  var ios = /AppleWebKit/.test(userAgent) && /Mobile\/\w+/.test(userAgent);
  var mobile = ios || /Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(userAgent);
  var mac = ios || /Mac/.test(platform);
  var windows = /win/i.test(platform);
  var presto_version = presto && userAgent.match(/Version\/(\d*\.\d*)/);
  if (presto_version)
    presto_version = Number(presto_version[1]);
  if (presto_version && presto_version >= 15) {
    presto = false;
    webkit = true;
  }
  var flipCtrlCmd = mac && (qtwebkit || presto && (presto_version == null || presto_version < 12.11));
  var captureRightClick = gecko || (ie && ie_version >= 9);
  var sawReadOnlySpans = false,
      sawCollapsedSpans = false;
  function CodeMirror(place, options) {
    if (!(this instanceof CodeMirror))
      return new CodeMirror(place, options);
    this.options = options = options ? copyObj(options) : {};
    copyObj(defaults, options, false);
    setGuttersForLineNumbers(options);
    var doc = options.value;
    if (typeof doc == "string")
      doc = new Doc(doc, options.mode, null, options.lineSeparator);
    this.doc = doc;
    var input = new CodeMirror.inputStyles[options.inputStyle](this);
    var display = this.display = new Display(place, doc, input);
    display.wrapper.CodeMirror = this;
    updateGutters(this);
    themeChanged(this);
    if (options.lineWrapping)
      this.display.wrapper.className += " CodeMirror-wrap";
    if (options.autofocus && !mobile)
      display.input.focus();
    initScrollbars(this);
    this.state = {
      keyMaps: [],
      overlays: [],
      modeGen: 0,
      overwrite: false,
      delayingBlurEvent: false,
      focused: false,
      suppressEdits: false,
      pasteIncoming: false,
      cutIncoming: false,
      selectingText: false,
      draggingText: false,
      highlight: new Delayed(),
      keySeq: null,
      specialChars: null
    };
    var cm = this;
    if (ie && ie_version < 11)
      setTimeout(function() {
        cm.display.input.reset(true);
      }, 20);
    registerEventHandlers(this);
    ensureGlobalHandlers();
    startOperation(this);
    this.curOp.forceUpdate = true;
    attachDoc(this, doc);
    if ((options.autofocus && !mobile) || cm.hasFocus())
      setTimeout(bind(onFocus, this), 20);
    else
      onBlur(this);
    for (var opt in optionHandlers)
      if (optionHandlers.hasOwnProperty(opt))
        optionHandlers[opt](this, options[opt], Init);
    maybeUpdateLineNumberWidth(this);
    if (options.finishInit)
      options.finishInit(this);
    for (var i = 0; i < initHooks.length; ++i)
      initHooks[i](this);
    endOperation(this);
    if (webkit && options.lineWrapping && getComputedStyle(display.lineDiv).textRendering == "optimizelegibility")
      display.lineDiv.style.textRendering = "auto";
  }
  function Display(place, doc, input) {
    var d = this;
    this.input = input;
    d.scrollbarFiller = elt("div", null, "CodeMirror-scrollbar-filler");
    d.scrollbarFiller.setAttribute("cm-not-content", "true");
    d.gutterFiller = elt("div", null, "CodeMirror-gutter-filler");
    d.gutterFiller.setAttribute("cm-not-content", "true");
    d.lineDiv = elt("div", null, "CodeMirror-code");
    d.selectionDiv = elt("div", null, null, "position: relative; z-index: 1");
    d.cursorDiv = elt("div", null, "CodeMirror-cursors");
    d.measure = elt("div", null, "CodeMirror-measure");
    d.lineMeasure = elt("div", null, "CodeMirror-measure");
    d.lineSpace = elt("div", [d.measure, d.lineMeasure, d.selectionDiv, d.cursorDiv, d.lineDiv], null, "position: relative; outline: none");
    d.mover = elt("div", [elt("div", [d.lineSpace], "CodeMirror-lines")], null, "position: relative");
    d.sizer = elt("div", [d.mover], "CodeMirror-sizer");
    d.sizerWidth = null;
    d.heightForcer = elt("div", null, null, "position: absolute; height: " + scrollerGap + "px; width: 1px;");
    d.gutters = elt("div", null, "CodeMirror-gutters");
    d.lineGutter = null;
    d.scroller = elt("div", [d.sizer, d.heightForcer, d.gutters], "CodeMirror-scroll");
    d.scroller.setAttribute("tabIndex", "-1");
    d.wrapper = elt("div", [d.scrollbarFiller, d.gutterFiller, d.scroller], "CodeMirror");
    if (ie && ie_version < 8) {
      d.gutters.style.zIndex = -1;
      d.scroller.style.paddingRight = 0;
    }
    if (!webkit && !(gecko && mobile))
      d.scroller.draggable = true;
    if (place) {
      if (place.appendChild)
        place.appendChild(d.wrapper);
      else
        place(d.wrapper);
    }
    d.viewFrom = d.viewTo = doc.first;
    d.reportedViewFrom = d.reportedViewTo = doc.first;
    d.view = [];
    d.renderedView = null;
    d.externalMeasured = null;
    d.viewOffset = 0;
    d.lastWrapHeight = d.lastWrapWidth = 0;
    d.updateLineNumbers = null;
    d.nativeBarWidth = d.barHeight = d.barWidth = 0;
    d.scrollbarsClipped = false;
    d.lineNumWidth = d.lineNumInnerWidth = d.lineNumChars = null;
    d.alignWidgets = false;
    d.cachedCharWidth = d.cachedTextHeight = d.cachedPaddingH = null;
    d.maxLine = null;
    d.maxLineLength = 0;
    d.maxLineChanged = false;
    d.wheelDX = d.wheelDY = d.wheelStartX = d.wheelStartY = null;
    d.shift = false;
    d.selForContextMenu = null;
    d.activeTouch = null;
    input.init(d);
  }
  function loadMode(cm) {
    cm.doc.mode = CodeMirror.getMode(cm.options, cm.doc.modeOption);
    resetModeState(cm);
  }
  function resetModeState(cm) {
    cm.doc.iter(function(line) {
      if (line.stateAfter)
        line.stateAfter = null;
      if (line.styles)
        line.styles = null;
    });
    cm.doc.frontier = cm.doc.first;
    startWorker(cm, 100);
    cm.state.modeGen++;
    if (cm.curOp)
      regChange(cm);
  }
  function wrappingChanged(cm) {
    if (cm.options.lineWrapping) {
      addClass(cm.display.wrapper, "CodeMirror-wrap");
      cm.display.sizer.style.minWidth = "";
      cm.display.sizerWidth = null;
    } else {
      rmClass(cm.display.wrapper, "CodeMirror-wrap");
      findMaxLine(cm);
    }
    estimateLineHeights(cm);
    regChange(cm);
    clearCaches(cm);
    setTimeout(function() {
      updateScrollbars(cm);
    }, 100);
  }
  function estimateHeight(cm) {
    var th = textHeight(cm.display),
        wrapping = cm.options.lineWrapping;
    var perLine = wrapping && Math.max(5, cm.display.scroller.clientWidth / charWidth(cm.display) - 3);
    return function(line) {
      if (lineIsHidden(cm.doc, line))
        return 0;
      var widgetsHeight = 0;
      if (line.widgets)
        for (var i = 0; i < line.widgets.length; i++) {
          if (line.widgets[i].height)
            widgetsHeight += line.widgets[i].height;
        }
      if (wrapping)
        return widgetsHeight + (Math.ceil(line.text.length / perLine) || 1) * th;
      else
        return widgetsHeight + th;
    };
  }
  function estimateLineHeights(cm) {
    var doc = cm.doc,
        est = estimateHeight(cm);
    doc.iter(function(line) {
      var estHeight = est(line);
      if (estHeight != line.height)
        updateLineHeight(line, estHeight);
    });
  }
  function themeChanged(cm) {
    cm.display.wrapper.className = cm.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + cm.options.theme.replace(/(^|\s)\s*/g, " cm-s-");
    clearCaches(cm);
  }
  function guttersChanged(cm) {
    updateGutters(cm);
    regChange(cm);
    setTimeout(function() {
      alignHorizontally(cm);
    }, 20);
  }
  function updateGutters(cm) {
    var gutters = cm.display.gutters,
        specs = cm.options.gutters;
    removeChildren(gutters);
    for (var i = 0; i < specs.length; ++i) {
      var gutterClass = specs[i];
      var gElt = gutters.appendChild(elt("div", null, "CodeMirror-gutter " + gutterClass));
      if (gutterClass == "CodeMirror-linenumbers") {
        cm.display.lineGutter = gElt;
        gElt.style.width = (cm.display.lineNumWidth || 1) + "px";
      }
    }
    gutters.style.display = i ? "" : "none";
    updateGutterSpace(cm);
  }
  function updateGutterSpace(cm) {
    var width = cm.display.gutters.offsetWidth;
    cm.display.sizer.style.marginLeft = width + "px";
  }
  function lineLength(line) {
    if (line.height == 0)
      return 0;
    var len = line.text.length,
        merged,
        cur = line;
    while (merged = collapsedSpanAtStart(cur)) {
      var found = merged.find(0, true);
      cur = found.from.line;
      len += found.from.ch - found.to.ch;
    }
    cur = line;
    while (merged = collapsedSpanAtEnd(cur)) {
      var found = merged.find(0, true);
      len -= cur.text.length - found.from.ch;
      cur = found.to.line;
      len += cur.text.length - found.to.ch;
    }
    return len;
  }
  function findMaxLine(cm) {
    var d = cm.display,
        doc = cm.doc;
    d.maxLine = getLine(doc, doc.first);
    d.maxLineLength = lineLength(d.maxLine);
    d.maxLineChanged = true;
    doc.iter(function(line) {
      var len = lineLength(line);
      if (len > d.maxLineLength) {
        d.maxLineLength = len;
        d.maxLine = line;
      }
    });
  }
  function setGuttersForLineNumbers(options) {
    var found = indexOf(options.gutters, "CodeMirror-linenumbers");
    if (found == -1 && options.lineNumbers) {
      options.gutters = options.gutters.concat(["CodeMirror-linenumbers"]);
    } else if (found > -1 && !options.lineNumbers) {
      options.gutters = options.gutters.slice(0);
      options.gutters.splice(found, 1);
    }
  }
  function measureForScrollbars(cm) {
    var d = cm.display,
        gutterW = d.gutters.offsetWidth;
    var docH = Math.round(cm.doc.height + paddingVert(cm.display));
    return {
      clientHeight: d.scroller.clientHeight,
      viewHeight: d.wrapper.clientHeight,
      scrollWidth: d.scroller.scrollWidth,
      clientWidth: d.scroller.clientWidth,
      viewWidth: d.wrapper.clientWidth,
      barLeft: cm.options.fixedGutter ? gutterW : 0,
      docHeight: docH,
      scrollHeight: docH + scrollGap(cm) + d.barHeight,
      nativeBarWidth: d.nativeBarWidth,
      gutterWidth: gutterW
    };
  }
  function NativeScrollbars(place, scroll, cm) {
    this.cm = cm;
    var vert = this.vert = elt("div", [elt("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar");
    var horiz = this.horiz = elt("div", [elt("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");
    place(vert);
    place(horiz);
    on(vert, "scroll", function() {
      if (vert.clientHeight)
        scroll(vert.scrollTop, "vertical");
    });
    on(horiz, "scroll", function() {
      if (horiz.clientWidth)
        scroll(horiz.scrollLeft, "horizontal");
    });
    this.checkedOverlay = false;
    if (ie && ie_version < 8)
      this.horiz.style.minHeight = this.vert.style.minWidth = "18px";
  }
  NativeScrollbars.prototype = copyObj({
    update: function(measure) {
      var needsH = measure.scrollWidth > measure.clientWidth + 1;
      var needsV = measure.scrollHeight > measure.clientHeight + 1;
      var sWidth = measure.nativeBarWidth;
      if (needsV) {
        this.vert.style.display = "block";
        this.vert.style.bottom = needsH ? sWidth + "px" : "0";
        var totalHeight = measure.viewHeight - (needsH ? sWidth : 0);
        this.vert.firstChild.style.height = Math.max(0, measure.scrollHeight - measure.clientHeight + totalHeight) + "px";
      } else {
        this.vert.style.display = "";
        this.vert.firstChild.style.height = "0";
      }
      if (needsH) {
        this.horiz.style.display = "block";
        this.horiz.style.right = needsV ? sWidth + "px" : "0";
        this.horiz.style.left = measure.barLeft + "px";
        var totalWidth = measure.viewWidth - measure.barLeft - (needsV ? sWidth : 0);
        this.horiz.firstChild.style.width = (measure.scrollWidth - measure.clientWidth + totalWidth) + "px";
      } else {
        this.horiz.style.display = "";
        this.horiz.firstChild.style.width = "0";
      }
      if (!this.checkedOverlay && measure.clientHeight > 0) {
        if (sWidth == 0)
          this.overlayHack();
        this.checkedOverlay = true;
      }
      return {
        right: needsV ? sWidth : 0,
        bottom: needsH ? sWidth : 0
      };
    },
    setScrollLeft: function(pos) {
      if (this.horiz.scrollLeft != pos)
        this.horiz.scrollLeft = pos;
    },
    setScrollTop: function(pos) {
      if (this.vert.scrollTop != pos)
        this.vert.scrollTop = pos;
    },
    overlayHack: function() {
      var w = mac && !mac_geMountainLion ? "12px" : "18px";
      this.horiz.style.minHeight = this.vert.style.minWidth = w;
      var self = this;
      var barMouseDown = function(e) {
        if (e_target(e) != self.vert && e_target(e) != self.horiz)
          operation(self.cm, onMouseDown)(e);
      };
      on(this.vert, "mousedown", barMouseDown);
      on(this.horiz, "mousedown", barMouseDown);
    },
    clear: function() {
      var parent = this.horiz.parentNode;
      parent.removeChild(this.horiz);
      parent.removeChild(this.vert);
    }
  }, NativeScrollbars.prototype);
  function NullScrollbars() {}
  NullScrollbars.prototype = copyObj({
    update: function() {
      return {
        bottom: 0,
        right: 0
      };
    },
    setScrollLeft: function() {},
    setScrollTop: function() {},
    clear: function() {}
  }, NullScrollbars.prototype);
  CodeMirror.scrollbarModel = {
    "native": NativeScrollbars,
    "null": NullScrollbars
  };
  function initScrollbars(cm) {
    if (cm.display.scrollbars) {
      cm.display.scrollbars.clear();
      if (cm.display.scrollbars.addClass)
        rmClass(cm.display.wrapper, cm.display.scrollbars.addClass);
    }
    cm.display.scrollbars = new CodeMirror.scrollbarModel[cm.options.scrollbarStyle](function(node) {
      cm.display.wrapper.insertBefore(node, cm.display.scrollbarFiller);
      on(node, "mousedown", function() {
        if (cm.state.focused)
          setTimeout(function() {
            cm.display.input.focus();
          }, 0);
      });
      node.setAttribute("cm-not-content", "true");
    }, function(pos, axis) {
      if (axis == "horizontal")
        setScrollLeft(cm, pos);
      else
        setScrollTop(cm, pos);
    }, cm);
    if (cm.display.scrollbars.addClass)
      addClass(cm.display.wrapper, cm.display.scrollbars.addClass);
  }
  function updateScrollbars(cm, measure) {
    if (!measure)
      measure = measureForScrollbars(cm);
    var startWidth = cm.display.barWidth,
        startHeight = cm.display.barHeight;
    updateScrollbarsInner(cm, measure);
    for (var i = 0; i < 4 && startWidth != cm.display.barWidth || startHeight != cm.display.barHeight; i++) {
      if (startWidth != cm.display.barWidth && cm.options.lineWrapping)
        updateHeightsInViewport(cm);
      updateScrollbarsInner(cm, measureForScrollbars(cm));
      startWidth = cm.display.barWidth;
      startHeight = cm.display.barHeight;
    }
  }
  function updateScrollbarsInner(cm, measure) {
    var d = cm.display;
    var sizes = d.scrollbars.update(measure);
    d.sizer.style.paddingRight = (d.barWidth = sizes.right) + "px";
    d.sizer.style.paddingBottom = (d.barHeight = sizes.bottom) + "px";
    if (sizes.right && sizes.bottom) {
      d.scrollbarFiller.style.display = "block";
      d.scrollbarFiller.style.height = sizes.bottom + "px";
      d.scrollbarFiller.style.width = sizes.right + "px";
    } else
      d.scrollbarFiller.style.display = "";
    if (sizes.bottom && cm.options.coverGutterNextToScrollbar && cm.options.fixedGutter) {
      d.gutterFiller.style.display = "block";
      d.gutterFiller.style.height = sizes.bottom + "px";
      d.gutterFiller.style.width = measure.gutterWidth + "px";
    } else
      d.gutterFiller.style.display = "";
  }
  function visibleLines(display, doc, viewport) {
    var top = viewport && viewport.top != null ? Math.max(0, viewport.top) : display.scroller.scrollTop;
    top = Math.floor(top - paddingTop(display));
    var bottom = viewport && viewport.bottom != null ? viewport.bottom : top + display.wrapper.clientHeight;
    var from = lineAtHeight(doc, top),
        to = lineAtHeight(doc, bottom);
    if (viewport && viewport.ensure) {
      var ensureFrom = viewport.ensure.from.line,
          ensureTo = viewport.ensure.to.line;
      if (ensureFrom < from) {
        from = ensureFrom;
        to = lineAtHeight(doc, heightAtLine(getLine(doc, ensureFrom)) + display.wrapper.clientHeight);
      } else if (Math.min(ensureTo, doc.lastLine()) >= to) {
        from = lineAtHeight(doc, heightAtLine(getLine(doc, ensureTo)) - display.wrapper.clientHeight);
        to = ensureTo;
      }
    }
    return {
      from: from,
      to: Math.max(to, from + 1)
    };
  }
  function alignHorizontally(cm) {
    var display = cm.display,
        view = display.view;
    if (!display.alignWidgets && (!display.gutters.firstChild || !cm.options.fixedGutter))
      return;
    var comp = compensateForHScroll(display) - display.scroller.scrollLeft + cm.doc.scrollLeft;
    var gutterW = display.gutters.offsetWidth,
        left = comp + "px";
    for (var i = 0; i < view.length; i++)
      if (!view[i].hidden) {
        if (cm.options.fixedGutter && view[i].gutter)
          view[i].gutter.style.left = left;
        var align = view[i].alignable;
        if (align)
          for (var j = 0; j < align.length; j++)
            align[j].style.left = left;
      }
    if (cm.options.fixedGutter)
      display.gutters.style.left = (comp + gutterW) + "px";
  }
  function maybeUpdateLineNumberWidth(cm) {
    if (!cm.options.lineNumbers)
      return false;
    var doc = cm.doc,
        last = lineNumberFor(cm.options, doc.first + doc.size - 1),
        display = cm.display;
    if (last.length != display.lineNumChars) {
      var test = display.measure.appendChild(elt("div", [elt("div", last)], "CodeMirror-linenumber CodeMirror-gutter-elt"));
      var innerW = test.firstChild.offsetWidth,
          padding = test.offsetWidth - innerW;
      display.lineGutter.style.width = "";
      display.lineNumInnerWidth = Math.max(innerW, display.lineGutter.offsetWidth - padding) + 1;
      display.lineNumWidth = display.lineNumInnerWidth + padding;
      display.lineNumChars = display.lineNumInnerWidth ? last.length : -1;
      display.lineGutter.style.width = display.lineNumWidth + "px";
      updateGutterSpace(cm);
      return true;
    }
    return false;
  }
  function lineNumberFor(options, i) {
    return String(options.lineNumberFormatter(i + options.firstLineNumber));
  }
  function compensateForHScroll(display) {
    return display.scroller.getBoundingClientRect().left - display.sizer.getBoundingClientRect().left;
  }
  function DisplayUpdate(cm, viewport, force) {
    var display = cm.display;
    this.viewport = viewport;
    this.visible = visibleLines(display, cm.doc, viewport);
    this.editorIsHidden = !display.wrapper.offsetWidth;
    this.wrapperHeight = display.wrapper.clientHeight;
    this.wrapperWidth = display.wrapper.clientWidth;
    this.oldDisplayWidth = displayWidth(cm);
    this.force = force;
    this.dims = getDimensions(cm);
    this.events = [];
  }
  DisplayUpdate.prototype.signal = function(emitter, type) {
    if (hasHandler(emitter, type))
      this.events.push(arguments);
  };
  DisplayUpdate.prototype.finish = function() {
    for (var i = 0; i < this.events.length; i++)
      signal.apply(null, this.events[i]);
  };
  function maybeClipScrollbars(cm) {
    var display = cm.display;
    if (!display.scrollbarsClipped && display.scroller.offsetWidth) {
      display.nativeBarWidth = display.scroller.offsetWidth - display.scroller.clientWidth;
      display.heightForcer.style.height = scrollGap(cm) + "px";
      display.sizer.style.marginBottom = -display.nativeBarWidth + "px";
      display.sizer.style.borderRightWidth = scrollGap(cm) + "px";
      display.scrollbarsClipped = true;
    }
  }
  function updateDisplayIfNeeded(cm, update) {
    var display = cm.display,
        doc = cm.doc;
    if (update.editorIsHidden) {
      resetView(cm);
      return false;
    }
    if (!update.force && update.visible.from >= display.viewFrom && update.visible.to <= display.viewTo && (display.updateLineNumbers == null || display.updateLineNumbers >= display.viewTo) && display.renderedView == display.view && countDirtyView(cm) == 0)
      return false;
    if (maybeUpdateLineNumberWidth(cm)) {
      resetView(cm);
      update.dims = getDimensions(cm);
    }
    var end = doc.first + doc.size;
    var from = Math.max(update.visible.from - cm.options.viewportMargin, doc.first);
    var to = Math.min(end, update.visible.to + cm.options.viewportMargin);
    if (display.viewFrom < from && from - display.viewFrom < 20)
      from = Math.max(doc.first, display.viewFrom);
    if (display.viewTo > to && display.viewTo - to < 20)
      to = Math.min(end, display.viewTo);
    if (sawCollapsedSpans) {
      from = visualLineNo(cm.doc, from);
      to = visualLineEndNo(cm.doc, to);
    }
    var different = from != display.viewFrom || to != display.viewTo || display.lastWrapHeight != update.wrapperHeight || display.lastWrapWidth != update.wrapperWidth;
    adjustView(cm, from, to);
    display.viewOffset = heightAtLine(getLine(cm.doc, display.viewFrom));
    cm.display.mover.style.top = display.viewOffset + "px";
    var toUpdate = countDirtyView(cm);
    if (!different && toUpdate == 0 && !update.force && display.renderedView == display.view && (display.updateLineNumbers == null || display.updateLineNumbers >= display.viewTo))
      return false;
    var focused = activeElt();
    if (toUpdate > 4)
      display.lineDiv.style.display = "none";
    patchDisplay(cm, display.updateLineNumbers, update.dims);
    if (toUpdate > 4)
      display.lineDiv.style.display = "";
    display.renderedView = display.view;
    if (focused && activeElt() != focused && focused.offsetHeight)
      focused.focus();
    removeChildren(display.cursorDiv);
    removeChildren(display.selectionDiv);
    display.gutters.style.height = display.sizer.style.minHeight = 0;
    if (different) {
      display.lastWrapHeight = update.wrapperHeight;
      display.lastWrapWidth = update.wrapperWidth;
      startWorker(cm, 400);
    }
    display.updateLineNumbers = null;
    return true;
  }
  function postUpdateDisplay(cm, update) {
    var viewport = update.viewport;
    for (var first = true; ; first = false) {
      if (!first || !cm.options.lineWrapping || update.oldDisplayWidth == displayWidth(cm)) {
        if (viewport && viewport.top != null)
          viewport = {top: Math.min(cm.doc.height + paddingVert(cm.display) - displayHeight(cm), viewport.top)};
        update.visible = visibleLines(cm.display, cm.doc, viewport);
        if (update.visible.from >= cm.display.viewFrom && update.visible.to <= cm.display.viewTo)
          break;
      }
      if (!updateDisplayIfNeeded(cm, update))
        break;
      updateHeightsInViewport(cm);
      var barMeasure = measureForScrollbars(cm);
      updateSelection(cm);
      setDocumentHeight(cm, barMeasure);
      updateScrollbars(cm, barMeasure);
    }
    update.signal(cm, "update", cm);
    if (cm.display.viewFrom != cm.display.reportedViewFrom || cm.display.viewTo != cm.display.reportedViewTo) {
      update.signal(cm, "viewportChange", cm, cm.display.viewFrom, cm.display.viewTo);
      cm.display.reportedViewFrom = cm.display.viewFrom;
      cm.display.reportedViewTo = cm.display.viewTo;
    }
  }
  function updateDisplaySimple(cm, viewport) {
    var update = new DisplayUpdate(cm, viewport);
    if (updateDisplayIfNeeded(cm, update)) {
      updateHeightsInViewport(cm);
      postUpdateDisplay(cm, update);
      var barMeasure = measureForScrollbars(cm);
      updateSelection(cm);
      setDocumentHeight(cm, barMeasure);
      updateScrollbars(cm, barMeasure);
      update.finish();
    }
  }
  function setDocumentHeight(cm, measure) {
    cm.display.sizer.style.minHeight = measure.docHeight + "px";
    var total = measure.docHeight + cm.display.barHeight;
    cm.display.heightForcer.style.top = total + "px";
    cm.display.gutters.style.height = Math.max(total + scrollGap(cm), measure.clientHeight) + "px";
  }
  function updateHeightsInViewport(cm) {
    var display = cm.display;
    var prevBottom = display.lineDiv.offsetTop;
    for (var i = 0; i < display.view.length; i++) {
      var cur = display.view[i],
          height;
      if (cur.hidden)
        continue;
      if (ie && ie_version < 8) {
        var bot = cur.node.offsetTop + cur.node.offsetHeight;
        height = bot - prevBottom;
        prevBottom = bot;
      } else {
        var box = cur.node.getBoundingClientRect();
        height = box.bottom - box.top;
      }
      var diff = cur.line.height - height;
      if (height < 2)
        height = textHeight(display);
      if (diff > .001 || diff < -.001) {
        updateLineHeight(cur.line, height);
        updateWidgetHeight(cur.line);
        if (cur.rest)
          for (var j = 0; j < cur.rest.length; j++)
            updateWidgetHeight(cur.rest[j]);
      }
    }
  }
  function updateWidgetHeight(line) {
    if (line.widgets)
      for (var i = 0; i < line.widgets.length; ++i)
        line.widgets[i].height = line.widgets[i].node.offsetHeight;
  }
  function getDimensions(cm) {
    var d = cm.display,
        left = {},
        width = {};
    var gutterLeft = d.gutters.clientLeft;
    for (var n = d.gutters.firstChild,
        i = 0; n; n = n.nextSibling, ++i) {
      left[cm.options.gutters[i]] = n.offsetLeft + n.clientLeft + gutterLeft;
      width[cm.options.gutters[i]] = n.clientWidth;
    }
    return {
      fixedPos: compensateForHScroll(d),
      gutterTotalWidth: d.gutters.offsetWidth,
      gutterLeft: left,
      gutterWidth: width,
      wrapperWidth: d.wrapper.clientWidth
    };
  }
  function patchDisplay(cm, updateNumbersFrom, dims) {
    var display = cm.display,
        lineNumbers = cm.options.lineNumbers;
    var container = display.lineDiv,
        cur = container.firstChild;
    function rm(node) {
      var next = node.nextSibling;
      if (webkit && mac && cm.display.currentWheelTarget == node)
        node.style.display = "none";
      else
        node.parentNode.removeChild(node);
      return next;
    }
    var view = display.view,
        lineN = display.viewFrom;
    for (var i = 0; i < view.length; i++) {
      var lineView = view[i];
      if (lineView.hidden) {} else if (!lineView.node || lineView.node.parentNode != container) {
        var node = buildLineElement(cm, lineView, lineN, dims);
        container.insertBefore(node, cur);
      } else {
        while (cur != lineView.node)
          cur = rm(cur);
        var updateNumber = lineNumbers && updateNumbersFrom != null && updateNumbersFrom <= lineN && lineView.lineNumber;
        if (lineView.changes) {
          if (indexOf(lineView.changes, "gutter") > -1)
            updateNumber = false;
          updateLineForChanges(cm, lineView, lineN, dims);
        }
        if (updateNumber) {
          removeChildren(lineView.lineNumber);
          lineView.lineNumber.appendChild(document.createTextNode(lineNumberFor(cm.options, lineN)));
        }
        cur = lineView.node.nextSibling;
      }
      lineN += lineView.size;
    }
    while (cur)
      cur = rm(cur);
  }
  function updateLineForChanges(cm, lineView, lineN, dims) {
    for (var j = 0; j < lineView.changes.length; j++) {
      var type = lineView.changes[j];
      if (type == "text")
        updateLineText(cm, lineView);
      else if (type == "gutter")
        updateLineGutter(cm, lineView, lineN, dims);
      else if (type == "class")
        updateLineClasses(lineView);
      else if (type == "widget")
        updateLineWidgets(cm, lineView, dims);
    }
    lineView.changes = null;
  }
  function ensureLineWrapped(lineView) {
    if (lineView.node == lineView.text) {
      lineView.node = elt("div", null, null, "position: relative");
      if (lineView.text.parentNode)
        lineView.text.parentNode.replaceChild(lineView.node, lineView.text);
      lineView.node.appendChild(lineView.text);
      if (ie && ie_version < 8)
        lineView.node.style.zIndex = 2;
    }
    return lineView.node;
  }
  function updateLineBackground(lineView) {
    var cls = lineView.bgClass ? lineView.bgClass + " " + (lineView.line.bgClass || "") : lineView.line.bgClass;
    if (cls)
      cls += " CodeMirror-linebackground";
    if (lineView.background) {
      if (cls)
        lineView.background.className = cls;
      else {
        lineView.background.parentNode.removeChild(lineView.background);
        lineView.background = null;
      }
    } else if (cls) {
      var wrap = ensureLineWrapped(lineView);
      lineView.background = wrap.insertBefore(elt("div", null, cls), wrap.firstChild);
    }
  }
  function getLineContent(cm, lineView) {
    var ext = cm.display.externalMeasured;
    if (ext && ext.line == lineView.line) {
      cm.display.externalMeasured = null;
      lineView.measure = ext.measure;
      return ext.built;
    }
    return buildLineContent(cm, lineView);
  }
  function updateLineText(cm, lineView) {
    var cls = lineView.text.className;
    var built = getLineContent(cm, lineView);
    if (lineView.text == lineView.node)
      lineView.node = built.pre;
    lineView.text.parentNode.replaceChild(built.pre, lineView.text);
    lineView.text = built.pre;
    if (built.bgClass != lineView.bgClass || built.textClass != lineView.textClass) {
      lineView.bgClass = built.bgClass;
      lineView.textClass = built.textClass;
      updateLineClasses(lineView);
    } else if (cls) {
      lineView.text.className = cls;
    }
  }
  function updateLineClasses(lineView) {
    updateLineBackground(lineView);
    if (lineView.line.wrapClass)
      ensureLineWrapped(lineView).className = lineView.line.wrapClass;
    else if (lineView.node != lineView.text)
      lineView.node.className = "";
    var textClass = lineView.textClass ? lineView.textClass + " " + (lineView.line.textClass || "") : lineView.line.textClass;
    lineView.text.className = textClass || "";
  }
  function updateLineGutter(cm, lineView, lineN, dims) {
    if (lineView.gutter) {
      lineView.node.removeChild(lineView.gutter);
      lineView.gutter = null;
    }
    if (lineView.gutterBackground) {
      lineView.node.removeChild(lineView.gutterBackground);
      lineView.gutterBackground = null;
    }
    if (lineView.line.gutterClass) {
      var wrap = ensureLineWrapped(lineView);
      lineView.gutterBackground = elt("div", null, "CodeMirror-gutter-background " + lineView.line.gutterClass, "left: " + (cm.options.fixedGutter ? dims.fixedPos : -dims.gutterTotalWidth) + "px; width: " + dims.gutterTotalWidth + "px");
      wrap.insertBefore(lineView.gutterBackground, lineView.text);
    }
    var markers = lineView.line.gutterMarkers;
    if (cm.options.lineNumbers || markers) {
      var wrap = ensureLineWrapped(lineView);
      var gutterWrap = lineView.gutter = elt("div", null, "CodeMirror-gutter-wrapper", "left: " + (cm.options.fixedGutter ? dims.fixedPos : -dims.gutterTotalWidth) + "px");
      cm.display.input.setUneditable(gutterWrap);
      wrap.insertBefore(gutterWrap, lineView.text);
      if (lineView.line.gutterClass)
        gutterWrap.className += " " + lineView.line.gutterClass;
      if (cm.options.lineNumbers && (!markers || !markers["CodeMirror-linenumbers"]))
        lineView.lineNumber = gutterWrap.appendChild(elt("div", lineNumberFor(cm.options, lineN), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + dims.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + cm.display.lineNumInnerWidth + "px"));
      if (markers)
        for (var k = 0; k < cm.options.gutters.length; ++k) {
          var id = cm.options.gutters[k],
              found = markers.hasOwnProperty(id) && markers[id];
          if (found)
            gutterWrap.appendChild(elt("div", [found], "CodeMirror-gutter-elt", "left: " + dims.gutterLeft[id] + "px; width: " + dims.gutterWidth[id] + "px"));
        }
    }
  }
  function updateLineWidgets(cm, lineView, dims) {
    if (lineView.alignable)
      lineView.alignable = null;
    for (var node = lineView.node.firstChild,
        next; node; node = next) {
      var next = node.nextSibling;
      if (node.className == "CodeMirror-linewidget")
        lineView.node.removeChild(node);
    }
    insertLineWidgets(cm, lineView, dims);
  }
  function buildLineElement(cm, lineView, lineN, dims) {
    var built = getLineContent(cm, lineView);
    lineView.text = lineView.node = built.pre;
    if (built.bgClass)
      lineView.bgClass = built.bgClass;
    if (built.textClass)
      lineView.textClass = built.textClass;
    updateLineClasses(lineView);
    updateLineGutter(cm, lineView, lineN, dims);
    insertLineWidgets(cm, lineView, dims);
    return lineView.node;
  }
  function insertLineWidgets(cm, lineView, dims) {
    insertLineWidgetsFor(cm, lineView.line, lineView, dims, true);
    if (lineView.rest)
      for (var i = 0; i < lineView.rest.length; i++)
        insertLineWidgetsFor(cm, lineView.rest[i], lineView, dims, false);
  }
  function insertLineWidgetsFor(cm, line, lineView, dims, allowAbove) {
    if (!line.widgets)
      return;
    var wrap = ensureLineWrapped(lineView);
    for (var i = 0,
        ws = line.widgets; i < ws.length; ++i) {
      var widget = ws[i],
          node = elt("div", [widget.node], "CodeMirror-linewidget");
      if (!widget.handleMouseEvents)
        node.setAttribute("cm-ignore-events", "true");
      positionLineWidget(widget, node, lineView, dims);
      cm.display.input.setUneditable(node);
      if (allowAbove && widget.above)
        wrap.insertBefore(node, lineView.gutter || lineView.text);
      else
        wrap.appendChild(node);
      signalLater(widget, "redraw");
    }
  }
  function positionLineWidget(widget, node, lineView, dims) {
    if (widget.noHScroll) {
      (lineView.alignable || (lineView.alignable = [])).push(node);
      var width = dims.wrapperWidth;
      node.style.left = dims.fixedPos + "px";
      if (!widget.coverGutter) {
        width -= dims.gutterTotalWidth;
        node.style.paddingLeft = dims.gutterTotalWidth + "px";
      }
      node.style.width = width + "px";
    }
    if (widget.coverGutter) {
      node.style.zIndex = 5;
      node.style.position = "relative";
      if (!widget.noHScroll)
        node.style.marginLeft = -dims.gutterTotalWidth + "px";
    }
  }
  var Pos = CodeMirror.Pos = function(line, ch) {
    if (!(this instanceof Pos))
      return new Pos(line, ch);
    this.line = line;
    this.ch = ch;
  };
  var cmp = CodeMirror.cmpPos = function(a, b) {
    return a.line - b.line || a.ch - b.ch;
  };
  function copyPos(x) {
    return Pos(x.line, x.ch);
  }
  function maxPos(a, b) {
    return cmp(a, b) < 0 ? b : a;
  }
  function minPos(a, b) {
    return cmp(a, b) < 0 ? a : b;
  }
  function ensureFocus(cm) {
    if (!cm.state.focused) {
      cm.display.input.focus();
      onFocus(cm);
    }
  }
  function isReadOnly(cm) {
    return cm.options.readOnly || cm.doc.cantEdit;
  }
  var lastCopied = null;
  function applyTextInput(cm, inserted, deleted, sel, origin) {
    var doc = cm.doc;
    cm.display.shift = false;
    if (!sel)
      sel = doc.sel;
    var paste = cm.state.pasteIncoming || origin == "paste";
    var textLines = doc.splitLines(inserted),
        multiPaste = null;
    if (paste && sel.ranges.length > 1) {
      if (lastCopied && lastCopied.join("\n") == inserted) {
        if (sel.ranges.length % lastCopied.length == 0) {
          multiPaste = [];
          for (var i = 0; i < lastCopied.length; i++)
            multiPaste.push(doc.splitLines(lastCopied[i]));
        }
      } else if (textLines.length == sel.ranges.length) {
        multiPaste = map(textLines, function(l) {
          return [l];
        });
      }
    }
    for (var i = sel.ranges.length - 1; i >= 0; i--) {
      var range = sel.ranges[i];
      var from = range.from(),
          to = range.to();
      if (range.empty()) {
        if (deleted && deleted > 0)
          from = Pos(from.line, from.ch - deleted);
        else if (cm.state.overwrite && !paste)
          to = Pos(to.line, Math.min(getLine(doc, to.line).text.length, to.ch + lst(textLines).length));
      }
      var updateInput = cm.curOp.updateInput;
      var changeEvent = {
        from: from,
        to: to,
        text: multiPaste ? multiPaste[i % multiPaste.length] : textLines,
        origin: origin || (paste ? "paste" : cm.state.cutIncoming ? "cut" : "+input")
      };
      makeChange(cm.doc, changeEvent);
      signalLater(cm, "inputRead", cm, changeEvent);
    }
    if (inserted && !paste)
      triggerElectric(cm, inserted);
    ensureCursorVisible(cm);
    cm.curOp.updateInput = updateInput;
    cm.curOp.typing = true;
    cm.state.pasteIncoming = cm.state.cutIncoming = false;
  }
  function handlePaste(e, cm) {
    var pasted = e.clipboardData && e.clipboardData.getData("text/plain");
    if (pasted) {
      e.preventDefault();
      if (!isReadOnly(cm) && !cm.options.disableInput)
        runInOp(cm, function() {
          applyTextInput(cm, pasted, 0, null, "paste");
        });
      return true;
    }
  }
  function triggerElectric(cm, inserted) {
    if (!cm.options.electricChars || !cm.options.smartIndent)
      return;
    var sel = cm.doc.sel;
    for (var i = sel.ranges.length - 1; i >= 0; i--) {
      var range = sel.ranges[i];
      if (range.head.ch > 100 || (i && sel.ranges[i - 1].head.line == range.head.line))
        continue;
      var mode = cm.getModeAt(range.head);
      var indented = false;
      if (mode.electricChars) {
        for (var j = 0; j < mode.electricChars.length; j++)
          if (inserted.indexOf(mode.electricChars.charAt(j)) > -1) {
            indented = indentLine(cm, range.head.line, "smart");
            break;
          }
      } else if (mode.electricInput) {
        if (mode.electricInput.test(getLine(cm.doc, range.head.line).text.slice(0, range.head.ch)))
          indented = indentLine(cm, range.head.line, "smart");
      }
      if (indented)
        signalLater(cm, "electricInput", cm, range.head.line);
    }
  }
  function copyableRanges(cm) {
    var text = [],
        ranges = [];
    for (var i = 0; i < cm.doc.sel.ranges.length; i++) {
      var line = cm.doc.sel.ranges[i].head.line;
      var lineRange = {
        anchor: Pos(line, 0),
        head: Pos(line + 1, 0)
      };
      ranges.push(lineRange);
      text.push(cm.getRange(lineRange.anchor, lineRange.head));
    }
    return {
      text: text,
      ranges: ranges
    };
  }
  function disableBrowserMagic(field) {
    field.setAttribute("autocorrect", "off");
    field.setAttribute("autocapitalize", "off");
    field.setAttribute("spellcheck", "false");
  }
  function TextareaInput(cm) {
    this.cm = cm;
    this.prevInput = "";
    this.pollingFast = false;
    this.polling = new Delayed();
    this.inaccurateSelection = false;
    this.hasSelection = false;
    this.composing = null;
  }
  ;
  function hiddenTextarea() {
    var te = elt("textarea", null, null, "position: absolute; padding: 0; width: 1px; height: 1em; outline: none");
    var div = elt("div", [te], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
    if (webkit)
      te.style.width = "1000px";
    else
      te.setAttribute("wrap", "off");
    if (ios)
      te.style.border = "1px solid black";
    disableBrowserMagic(te);
    return div;
  }
  TextareaInput.prototype = copyObj({
    init: function(display) {
      var input = this,
          cm = this.cm;
      var div = this.wrapper = hiddenTextarea();
      var te = this.textarea = div.firstChild;
      display.wrapper.insertBefore(div, display.wrapper.firstChild);
      if (ios)
        te.style.width = "0px";
      on(te, "input", function() {
        if (ie && ie_version >= 9 && input.hasSelection)
          input.hasSelection = null;
        input.poll();
      });
      on(te, "paste", function(e) {
        if (handlePaste(e, cm))
          return true;
        cm.state.pasteIncoming = true;
        input.fastPoll();
      });
      function prepareCopyCut(e) {
        if (cm.somethingSelected()) {
          lastCopied = cm.getSelections();
          if (input.inaccurateSelection) {
            input.prevInput = "";
            input.inaccurateSelection = false;
            te.value = lastCopied.join("\n");
            selectInput(te);
          }
        } else if (!cm.options.lineWiseCopyCut) {
          return;
        } else {
          var ranges = copyableRanges(cm);
          lastCopied = ranges.text;
          if (e.type == "cut") {
            cm.setSelections(ranges.ranges, null, sel_dontScroll);
          } else {
            input.prevInput = "";
            te.value = ranges.text.join("\n");
            selectInput(te);
          }
        }
        if (e.type == "cut")
          cm.state.cutIncoming = true;
      }
      on(te, "cut", prepareCopyCut);
      on(te, "copy", prepareCopyCut);
      on(display.scroller, "paste", function(e) {
        if (eventInWidget(display, e))
          return;
        cm.state.pasteIncoming = true;
        input.focus();
      });
      on(display.lineSpace, "selectstart", function(e) {
        if (!eventInWidget(display, e))
          e_preventDefault(e);
      });
      on(te, "compositionstart", function() {
        var start = cm.getCursor("from");
        if (input.composing)
          input.composing.range.clear();
        input.composing = {
          start: start,
          range: cm.markText(start, cm.getCursor("to"), {className: "CodeMirror-composing"})
        };
      });
      on(te, "compositionend", function() {
        if (input.composing) {
          input.poll();
          input.composing.range.clear();
          input.composing = null;
        }
      });
    },
    prepareSelection: function() {
      var cm = this.cm,
          display = cm.display,
          doc = cm.doc;
      var result = prepareSelection(cm);
      if (cm.options.moveInputWithCursor) {
        var headPos = cursorCoords(cm, doc.sel.primary().head, "div");
        var wrapOff = display.wrapper.getBoundingClientRect(),
            lineOff = display.lineDiv.getBoundingClientRect();
        result.teTop = Math.max(0, Math.min(display.wrapper.clientHeight - 10, headPos.top + lineOff.top - wrapOff.top));
        result.teLeft = Math.max(0, Math.min(display.wrapper.clientWidth - 10, headPos.left + lineOff.left - wrapOff.left));
      }
      return result;
    },
    showSelection: function(drawn) {
      var cm = this.cm,
          display = cm.display;
      removeChildrenAndAdd(display.cursorDiv, drawn.cursors);
      removeChildrenAndAdd(display.selectionDiv, drawn.selection);
      if (drawn.teTop != null) {
        this.wrapper.style.top = drawn.teTop + "px";
        this.wrapper.style.left = drawn.teLeft + "px";
      }
    },
    reset: function(typing) {
      if (this.contextMenuPending)
        return;
      var minimal,
          selected,
          cm = this.cm,
          doc = cm.doc;
      if (cm.somethingSelected()) {
        this.prevInput = "";
        var range = doc.sel.primary();
        minimal = hasCopyEvent && (range.to().line - range.from().line > 100 || (selected = cm.getSelection()).length > 1000);
        var content = minimal ? "-" : selected || cm.getSelection();
        this.textarea.value = content;
        if (cm.state.focused)
          selectInput(this.textarea);
        if (ie && ie_version >= 9)
          this.hasSelection = content;
      } else if (!typing) {
        this.prevInput = this.textarea.value = "";
        if (ie && ie_version >= 9)
          this.hasSelection = null;
      }
      this.inaccurateSelection = minimal;
    },
    getField: function() {
      return this.textarea;
    },
    supportsTouch: function() {
      return false;
    },
    focus: function() {
      if (this.cm.options.readOnly != "nocursor" && (!mobile || activeElt() != this.textarea)) {
        try {
          this.textarea.focus();
        } catch (e) {}
      }
    },
    blur: function() {
      this.textarea.blur();
    },
    resetPosition: function() {
      this.wrapper.style.top = this.wrapper.style.left = 0;
    },
    receivedFocus: function() {
      this.slowPoll();
    },
    slowPoll: function() {
      var input = this;
      if (input.pollingFast)
        return;
      input.polling.set(this.cm.options.pollInterval, function() {
        input.poll();
        if (input.cm.state.focused)
          input.slowPoll();
      });
    },
    fastPoll: function() {
      var missed = false,
          input = this;
      input.pollingFast = true;
      function p() {
        var changed = input.poll();
        if (!changed && !missed) {
          missed = true;
          input.polling.set(60, p);
        } else {
          input.pollingFast = false;
          input.slowPoll();
        }
      }
      input.polling.set(20, p);
    },
    poll: function() {
      var cm = this.cm,
          input = this.textarea,
          prevInput = this.prevInput;
      if (this.contextMenuPending || !cm.state.focused || (hasSelection(input) && !prevInput && !this.composing) || isReadOnly(cm) || cm.options.disableInput || cm.state.keySeq)
        return false;
      var text = input.value;
      if (text == prevInput && !cm.somethingSelected())
        return false;
      if (ie && ie_version >= 9 && this.hasSelection === text || mac && /[\uf700-\uf7ff]/.test(text)) {
        cm.display.input.reset();
        return false;
      }
      if (cm.doc.sel == cm.display.selForContextMenu) {
        var first = text.charCodeAt(0);
        if (first == 0x200b && !prevInput)
          prevInput = "\u200b";
        if (first == 0x21da) {
          this.reset();
          return this.cm.execCommand("undo");
        }
      }
      var same = 0,
          l = Math.min(prevInput.length, text.length);
      while (same < l && prevInput.charCodeAt(same) == text.charCodeAt(same))
        ++same;
      var self = this;
      runInOp(cm, function() {
        applyTextInput(cm, text.slice(same), prevInput.length - same, null, self.composing ? "*compose" : null);
        if (text.length > 1000 || text.indexOf("\n") > -1)
          input.value = self.prevInput = "";
        else
          self.prevInput = text;
        if (self.composing) {
          self.composing.range.clear();
          self.composing.range = cm.markText(self.composing.start, cm.getCursor("to"), {className: "CodeMirror-composing"});
        }
      });
      return true;
    },
    ensurePolled: function() {
      if (this.pollingFast && this.poll())
        this.pollingFast = false;
    },
    onKeyPress: function() {
      if (ie && ie_version >= 9)
        this.hasSelection = null;
      this.fastPoll();
    },
    onContextMenu: function(e) {
      var input = this,
          cm = input.cm,
          display = cm.display,
          te = input.textarea;
      var pos = posFromMouse(cm, e),
          scrollPos = display.scroller.scrollTop;
      if (!pos || presto)
        return;
      var reset = cm.options.resetSelectionOnContextMenu;
      if (reset && cm.doc.sel.contains(pos) == -1)
        operation(cm, setSelection)(cm.doc, simpleSelection(pos), sel_dontScroll);
      var oldCSS = te.style.cssText;
      input.wrapper.style.position = "absolute";
      te.style.cssText = "position: fixed; width: 30px; height: 30px; top: " + (e.clientY - 5) + "px; left: " + (e.clientX - 5) + "px; z-index: 1000; background: " + (ie ? "rgba(255, 255, 255, .05)" : "transparent") + "; outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);";
      if (webkit)
        var oldScrollY = window.scrollY;
      display.input.focus();
      if (webkit)
        window.scrollTo(null, oldScrollY);
      display.input.reset();
      if (!cm.somethingSelected())
        te.value = input.prevInput = " ";
      input.contextMenuPending = true;
      display.selForContextMenu = cm.doc.sel;
      clearTimeout(display.detectingSelectAll);
      function prepareSelectAllHack() {
        if (te.selectionStart != null) {
          var selected = cm.somethingSelected();
          var extval = "\u200b" + (selected ? te.value : "");
          te.value = "\u21da";
          te.value = extval;
          input.prevInput = selected ? "" : "\u200b";
          te.selectionStart = 1;
          te.selectionEnd = extval.length;
          display.selForContextMenu = cm.doc.sel;
        }
      }
      function rehide() {
        input.contextMenuPending = false;
        input.wrapper.style.position = "relative";
        te.style.cssText = oldCSS;
        if (ie && ie_version < 9)
          display.scrollbars.setScrollTop(display.scroller.scrollTop = scrollPos);
        if (te.selectionStart != null) {
          if (!ie || (ie && ie_version < 9))
            prepareSelectAllHack();
          var i = 0,
              poll = function() {
                if (display.selForContextMenu == cm.doc.sel && te.selectionStart == 0 && te.selectionEnd > 0 && input.prevInput == "\u200b")
                  operation(cm, commands.selectAll)(cm);
                else if (i++ < 10)
                  display.detectingSelectAll = setTimeout(poll, 500);
                else
                  display.input.reset();
              };
          display.detectingSelectAll = setTimeout(poll, 200);
        }
      }
      if (ie && ie_version >= 9)
        prepareSelectAllHack();
      if (captureRightClick) {
        e_stop(e);
        var mouseup = function() {
          off(window, "mouseup", mouseup);
          setTimeout(rehide, 20);
        };
        on(window, "mouseup", mouseup);
      } else {
        setTimeout(rehide, 50);
      }
    },
    readOnlyChanged: function(val) {
      if (!val)
        this.reset();
    },
    setUneditable: nothing,
    needsContentAttribute: false
  }, TextareaInput.prototype);
  function ContentEditableInput(cm) {
    this.cm = cm;
    this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null;
    this.polling = new Delayed();
    this.gracePeriod = false;
  }
  ContentEditableInput.prototype = copyObj({
    init: function(display) {
      var input = this,
          cm = input.cm;
      var div = input.div = display.lineDiv;
      disableBrowserMagic(div);
      on(div, "paste", function(e) {
        handlePaste(e, cm);
      });
      on(div, "compositionstart", function(e) {
        var data = e.data;
        input.composing = {
          sel: cm.doc.sel,
          data: data,
          startData: data
        };
        if (!data)
          return;
        var prim = cm.doc.sel.primary();
        var line = cm.getLine(prim.head.line);
        var found = line.indexOf(data, Math.max(0, prim.head.ch - data.length));
        if (found > -1 && found <= prim.head.ch)
          input.composing.sel = simpleSelection(Pos(prim.head.line, found), Pos(prim.head.line, found + data.length));
      });
      on(div, "compositionupdate", function(e) {
        input.composing.data = e.data;
      });
      on(div, "compositionend", function(e) {
        var ours = input.composing;
        if (!ours)
          return;
        if (e.data != ours.startData && !/\u200b/.test(e.data))
          ours.data = e.data;
        setTimeout(function() {
          if (!ours.handled)
            input.applyComposition(ours);
          if (input.composing == ours)
            input.composing = null;
        }, 50);
      });
      on(div, "touchstart", function() {
        input.forceCompositionEnd();
      });
      on(div, "input", function() {
        if (input.composing)
          return;
        if (isReadOnly(cm) || !input.pollContent())
          runInOp(input.cm, function() {
            regChange(cm);
          });
      });
      function onCopyCut(e) {
        if (cm.somethingSelected()) {
          lastCopied = cm.getSelections();
          if (e.type == "cut")
            cm.replaceSelection("", null, "cut");
        } else if (!cm.options.lineWiseCopyCut) {
          return;
        } else {
          var ranges = copyableRanges(cm);
          lastCopied = ranges.text;
          if (e.type == "cut") {
            cm.operation(function() {
              cm.setSelections(ranges.ranges, 0, sel_dontScroll);
              cm.replaceSelection("", null, "cut");
            });
          }
        }
        if (e.clipboardData && !ios) {
          e.preventDefault();
          e.clipboardData.clearData();
          e.clipboardData.setData("text/plain", lastCopied.join("\n"));
        } else {
          var kludge = hiddenTextarea(),
              te = kludge.firstChild;
          cm.display.lineSpace.insertBefore(kludge, cm.display.lineSpace.firstChild);
          te.value = lastCopied.join("\n");
          var hadFocus = document.activeElement;
          selectInput(te);
          setTimeout(function() {
            cm.display.lineSpace.removeChild(kludge);
            hadFocus.focus();
          }, 50);
        }
      }
      on(div, "copy", onCopyCut);
      on(div, "cut", onCopyCut);
    },
    prepareSelection: function() {
      var result = prepareSelection(this.cm, false);
      result.focus = this.cm.state.focused;
      return result;
    },
    showSelection: function(info) {
      if (!info || !this.cm.display.view.length)
        return;
      if (info.focus)
        this.showPrimarySelection();
      this.showMultipleSelections(info);
    },
    showPrimarySelection: function() {
      var sel = window.getSelection(),
          prim = this.cm.doc.sel.primary();
      var curAnchor = domToPos(this.cm, sel.anchorNode, sel.anchorOffset);
      var curFocus = domToPos(this.cm, sel.focusNode, sel.focusOffset);
      if (curAnchor && !curAnchor.bad && curFocus && !curFocus.bad && cmp(minPos(curAnchor, curFocus), prim.from()) == 0 && cmp(maxPos(curAnchor, curFocus), prim.to()) == 0)
        return;
      var start = posToDOM(this.cm, prim.from());
      var end = posToDOM(this.cm, prim.to());
      if (!start && !end)
        return;
      var view = this.cm.display.view;
      var old = sel.rangeCount && sel.getRangeAt(0);
      if (!start) {
        start = {
          node: view[0].measure.map[2],
          offset: 0
        };
      } else if (!end) {
        var measure = view[view.length - 1].measure;
        var map = measure.maps ? measure.maps[measure.maps.length - 1] : measure.map;
        end = {
          node: map[map.length - 1],
          offset: map[map.length - 2] - map[map.length - 3]
        };
      }
      try {
        var rng = range(start.node, start.offset, end.offset, end.node);
      } catch (e) {}
      if (rng) {
        sel.removeAllRanges();
        sel.addRange(rng);
        if (old && sel.anchorNode == null)
          sel.addRange(old);
        else if (gecko)
          this.startGracePeriod();
      }
      this.rememberSelection();
    },
    startGracePeriod: function() {
      var input = this;
      clearTimeout(this.gracePeriod);
      this.gracePeriod = setTimeout(function() {
        input.gracePeriod = false;
        if (input.selectionChanged())
          input.cm.operation(function() {
            input.cm.curOp.selectionChanged = true;
          });
      }, 20);
    },
    showMultipleSelections: function(info) {
      removeChildrenAndAdd(this.cm.display.cursorDiv, info.cursors);
      removeChildrenAndAdd(this.cm.display.selectionDiv, info.selection);
    },
    rememberSelection: function() {
      var sel = window.getSelection();
      this.lastAnchorNode = sel.anchorNode;
      this.lastAnchorOffset = sel.anchorOffset;
      this.lastFocusNode = sel.focusNode;
      this.lastFocusOffset = sel.focusOffset;
    },
    selectionInEditor: function() {
      var sel = window.getSelection();
      if (!sel.rangeCount)
        return false;
      var node = sel.getRangeAt(0).commonAncestorContainer;
      return contains(this.div, node);
    },
    focus: function() {
      if (this.cm.options.readOnly != "nocursor")
        this.div.focus();
    },
    blur: function() {
      this.div.blur();
    },
    getField: function() {
      return this.div;
    },
    supportsTouch: function() {
      return true;
    },
    receivedFocus: function() {
      var input = this;
      if (this.selectionInEditor())
        this.pollSelection();
      else
        runInOp(this.cm, function() {
          input.cm.curOp.selectionChanged = true;
        });
      function poll() {
        if (input.cm.state.focused) {
          input.pollSelection();
          input.polling.set(input.cm.options.pollInterval, poll);
        }
      }
      this.polling.set(this.cm.options.pollInterval, poll);
    },
    selectionChanged: function() {
      var sel = window.getSelection();
      return sel.anchorNode != this.lastAnchorNode || sel.anchorOffset != this.lastAnchorOffset || sel.focusNode != this.lastFocusNode || sel.focusOffset != this.lastFocusOffset;
    },
    pollSelection: function() {
      if (!this.composing && !this.gracePeriod && this.selectionChanged()) {
        var sel = window.getSelection(),
            cm = this.cm;
        this.rememberSelection();
        var anchor = domToPos(cm, sel.anchorNode, sel.anchorOffset);
        var head = domToPos(cm, sel.focusNode, sel.focusOffset);
        if (anchor && head)
          runInOp(cm, function() {
            setSelection(cm.doc, simpleSelection(anchor, head), sel_dontScroll);
            if (anchor.bad || head.bad)
              cm.curOp.selectionChanged = true;
          });
      }
    },
    pollContent: function() {
      var cm = this.cm,
          display = cm.display,
          sel = cm.doc.sel.primary();
      var from = sel.from(),
          to = sel.to();
      if (from.line < display.viewFrom || to.line > display.viewTo - 1)
        return false;
      var fromIndex;
      if (from.line == display.viewFrom || (fromIndex = findViewIndex(cm, from.line)) == 0) {
        var fromLine = lineNo(display.view[0].line);
        var fromNode = display.view[0].node;
      } else {
        var fromLine = lineNo(display.view[fromIndex].line);
        var fromNode = display.view[fromIndex - 1].node.nextSibling;
      }
      var toIndex = findViewIndex(cm, to.line);
      if (toIndex == display.view.length - 1) {
        var toLine = display.viewTo - 1;
        var toNode = display.lineDiv.lastChild;
      } else {
        var toLine = lineNo(display.view[toIndex + 1].line) - 1;
        var toNode = display.view[toIndex + 1].node.previousSibling;
      }
      var newText = cm.doc.splitLines(domTextBetween(cm, fromNode, toNode, fromLine, toLine));
      var oldText = getBetween(cm.doc, Pos(fromLine, 0), Pos(toLine, getLine(cm.doc, toLine).text.length));
      while (newText.length > 1 && oldText.length > 1) {
        if (lst(newText) == lst(oldText)) {
          newText.pop();
          oldText.pop();
          toLine--;
        } else if (newText[0] == oldText[0]) {
          newText.shift();
          oldText.shift();
          fromLine++;
        } else
          break;
      }
      var cutFront = 0,
          cutEnd = 0;
      var newTop = newText[0],
          oldTop = oldText[0],
          maxCutFront = Math.min(newTop.length, oldTop.length);
      while (cutFront < maxCutFront && newTop.charCodeAt(cutFront) == oldTop.charCodeAt(cutFront))
        ++cutFront;
      var newBot = lst(newText),
          oldBot = lst(oldText);
      var maxCutEnd = Math.min(newBot.length - (newText.length == 1 ? cutFront : 0), oldBot.length - (oldText.length == 1 ? cutFront : 0));
      while (cutEnd < maxCutEnd && newBot.charCodeAt(newBot.length - cutEnd - 1) == oldBot.charCodeAt(oldBot.length - cutEnd - 1))
        ++cutEnd;
      newText[newText.length - 1] = newBot.slice(0, newBot.length - cutEnd);
      newText[0] = newText[0].slice(cutFront);
      var chFrom = Pos(fromLine, cutFront);
      var chTo = Pos(toLine, oldText.length ? lst(oldText).length - cutEnd : 0);
      if (newText.length > 1 || newText[0] || cmp(chFrom, chTo)) {
        replaceRange(cm.doc, newText, chFrom, chTo, "+input");
        return true;
      }
    },
    ensurePolled: function() {
      this.forceCompositionEnd();
    },
    reset: function() {
      this.forceCompositionEnd();
    },
    forceCompositionEnd: function() {
      if (!this.composing || this.composing.handled)
        return;
      this.applyComposition(this.composing);
      this.composing.handled = true;
      this.div.blur();
      this.div.focus();
    },
    applyComposition: function(composing) {
      if (isReadOnly(this.cm))
        operation(this.cm, regChange)(this.cm);
      else if (composing.data && composing.data != composing.startData)
        operation(this.cm, applyTextInput)(this.cm, composing.data, 0, composing.sel);
    },
    setUneditable: function(node) {
      node.contentEditable = "false";
    },
    onKeyPress: function(e) {
      e.preventDefault();
      if (!isReadOnly(this.cm))
        operation(this.cm, applyTextInput)(this.cm, String.fromCharCode(e.charCode == null ? e.keyCode : e.charCode), 0);
    },
    readOnlyChanged: function(val) {
      this.div.contentEditable = String(val != "nocursor");
    },
    onContextMenu: nothing,
    resetPosition: nothing,
    needsContentAttribute: true
  }, ContentEditableInput.prototype);
  function posToDOM(cm, pos) {
    var view = findViewForLine(cm, pos.line);
    if (!view || view.hidden)
      return null;
    var line = getLine(cm.doc, pos.line);
    var info = mapFromLineView(view, line, pos.line);
    var order = getOrder(line),
        side = "left";
    if (order) {
      var partPos = getBidiPartAt(order, pos.ch);
      side = partPos % 2 ? "right" : "left";
    }
    var result = nodeAndOffsetInLineMap(info.map, pos.ch, side);
    result.offset = result.collapse == "right" ? result.end : result.start;
    return result;
  }
  function badPos(pos, bad) {
    if (bad)
      pos.bad = true;
    return pos;
  }
  function domToPos(cm, node, offset) {
    var lineNode;
    if (node == cm.display.lineDiv) {
      lineNode = cm.display.lineDiv.childNodes[offset];
      if (!lineNode)
        return badPos(cm.clipPos(Pos(cm.display.viewTo - 1)), true);
      node = null;
      offset = 0;
    } else {
      for (lineNode = node; ; lineNode = lineNode.parentNode) {
        if (!lineNode || lineNode == cm.display.lineDiv)
          return null;
        if (lineNode.parentNode && lineNode.parentNode == cm.display.lineDiv)
          break;
      }
    }
    for (var i = 0; i < cm.display.view.length; i++) {
      var lineView = cm.display.view[i];
      if (lineView.node == lineNode)
        return locateNodeInLineView(lineView, node, offset);
    }
  }
  function locateNodeInLineView(lineView, node, offset) {
    var wrapper = lineView.text.firstChild,
        bad = false;
    if (!node || !contains(wrapper, node))
      return badPos(Pos(lineNo(lineView.line), 0), true);
    if (node == wrapper) {
      bad = true;
      node = wrapper.childNodes[offset];
      offset = 0;
      if (!node) {
        var line = lineView.rest ? lst(lineView.rest) : lineView.line;
        return badPos(Pos(lineNo(line), line.text.length), bad);
      }
    }
    var textNode = node.nodeType == 3 ? node : null,
        topNode = node;
    if (!textNode && node.childNodes.length == 1 && node.firstChild.nodeType == 3) {
      textNode = node.firstChild;
      if (offset)
        offset = textNode.nodeValue.length;
    }
    while (topNode.parentNode != wrapper)
      topNode = topNode.parentNode;
    var measure = lineView.measure,
        maps = measure.maps;
    function find(textNode, topNode, offset) {
      for (var i = -1; i < (maps ? maps.length : 0); i++) {
        var map = i < 0 ? measure.map : maps[i];
        for (var j = 0; j < map.length; j += 3) {
          var curNode = map[j + 2];
          if (curNode == textNode || curNode == topNode) {
            var line = lineNo(i < 0 ? lineView.line : lineView.rest[i]);
            var ch = map[j] + offset;
            if (offset < 0 || curNode != textNode)
              ch = map[j + (offset ? 1 : 0)];
            return Pos(line, ch);
          }
        }
      }
    }
    var found = find(textNode, topNode, offset);
    if (found)
      return badPos(found, bad);
    for (var after = topNode.nextSibling,
        dist = textNode ? textNode.nodeValue.length - offset : 0; after; after = after.nextSibling) {
      found = find(after, after.firstChild, 0);
      if (found)
        return badPos(Pos(found.line, found.ch - dist), bad);
      else
        dist += after.textContent.length;
    }
    for (var before = topNode.previousSibling,
        dist = offset; before; before = before.previousSibling) {
      found = find(before, before.firstChild, -1);
      if (found)
        return badPos(Pos(found.line, found.ch + dist), bad);
      else
        dist += after.textContent.length;
    }
  }
  function domTextBetween(cm, from, to, fromLine, toLine) {
    var text = "",
        closing = false,
        lineSep = cm.doc.lineSeparator();
    function recognizeMarker(id) {
      return function(marker) {
        return marker.id == id;
      };
    }
    function walk(node) {
      if (node.nodeType == 1) {
        var cmText = node.getAttribute("cm-text");
        if (cmText != null) {
          if (cmText == "")
            cmText = node.textContent.replace(/\u200b/g, "");
          text += cmText;
          return;
        }
        var markerID = node.getAttribute("cm-marker"),
            range;
        if (markerID) {
          var found = cm.findMarks(Pos(fromLine, 0), Pos(toLine + 1, 0), recognizeMarker(+markerID));
          if (found.length && (range = found[0].find()))
            text += getBetween(cm.doc, range.from, range.to).join(lineSep);
          return;
        }
        if (node.getAttribute("contenteditable") == "false")
          return;
        for (var i = 0; i < node.childNodes.length; i++)
          walk(node.childNodes[i]);
        if (/^(pre|div|p)$/i.test(node.nodeName))
          closing = true;
      } else if (node.nodeType == 3) {
        var val = node.nodeValue;
        if (!val)
          return;
        if (closing) {
          text += lineSep;
          closing = false;
        }
        text += val;
      }
    }
    for (; ; ) {
      walk(from);
      if (from == to)
        break;
      from = from.nextSibling;
    }
    return text;
  }
  CodeMirror.inputStyles = {
    "textarea": TextareaInput,
    "contenteditable": ContentEditableInput
  };
  function Selection(ranges, primIndex) {
    this.ranges = ranges;
    this.primIndex = primIndex;
  }
  Selection.prototype = {
    primary: function() {
      return this.ranges[this.primIndex];
    },
    equals: function(other) {
      if (other == this)
        return true;
      if (other.primIndex != this.primIndex || other.ranges.length != this.ranges.length)
        return false;
      for (var i = 0; i < this.ranges.length; i++) {
        var here = this.ranges[i],
            there = other.ranges[i];
        if (cmp(here.anchor, there.anchor) != 0 || cmp(here.head, there.head) != 0)
          return false;
      }
      return true;
    },
    deepCopy: function() {
      for (var out = [],
          i = 0; i < this.ranges.length; i++)
        out[i] = new Range(copyPos(this.ranges[i].anchor), copyPos(this.ranges[i].head));
      return new Selection(out, this.primIndex);
    },
    somethingSelected: function() {
      for (var i = 0; i < this.ranges.length; i++)
        if (!this.ranges[i].empty())
          return true;
      return false;
    },
    contains: function(pos, end) {
      if (!end)
        end = pos;
      for (var i = 0; i < this.ranges.length; i++) {
        var range = this.ranges[i];
        if (cmp(end, range.from()) >= 0 && cmp(pos, range.to()) <= 0)
          return i;
      }
      return -1;
    }
  };
  function Range(anchor, head) {
    this.anchor = anchor;
    this.head = head;
  }
  Range.prototype = {
    from: function() {
      return minPos(this.anchor, this.head);
    },
    to: function() {
      return maxPos(this.anchor, this.head);
    },
    empty: function() {
      return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch;
    }
  };
  function normalizeSelection(ranges, primIndex) {
    var prim = ranges[primIndex];
    ranges.sort(function(a, b) {
      return cmp(a.from(), b.from());
    });
    primIndex = indexOf(ranges, prim);
    for (var i = 1; i < ranges.length; i++) {
      var cur = ranges[i],
          prev = ranges[i - 1];
      if (cmp(prev.to(), cur.from()) >= 0) {
        var from = minPos(prev.from(), cur.from()),
            to = maxPos(prev.to(), cur.to());
        var inv = prev.empty() ? cur.from() == cur.head : prev.from() == prev.head;
        if (i <= primIndex)
          --primIndex;
        ranges.splice(--i, 2, new Range(inv ? to : from, inv ? from : to));
      }
    }
    return new Selection(ranges, primIndex);
  }
  function simpleSelection(anchor, head) {
    return new Selection([new Range(anchor, head || anchor)], 0);
  }
  function clipLine(doc, n) {
    return Math.max(doc.first, Math.min(n, doc.first + doc.size - 1));
  }
  function clipPos(doc, pos) {
    if (pos.line < doc.first)
      return Pos(doc.first, 0);
    var last = doc.first + doc.size - 1;
    if (pos.line > last)
      return Pos(last, getLine(doc, last).text.length);
    return clipToLen(pos, getLine(doc, pos.line).text.length);
  }
  function clipToLen(pos, linelen) {
    var ch = pos.ch;
    if (ch == null || ch > linelen)
      return Pos(pos.line, linelen);
    else if (ch < 0)
      return Pos(pos.line, 0);
    else
      return pos;
  }
  function isLine(doc, l) {
    return l >= doc.first && l < doc.first + doc.size;
  }
  function clipPosArray(doc, array) {
    for (var out = [],
        i = 0; i < array.length; i++)
      out[i] = clipPos(doc, array[i]);
    return out;
  }
  function extendRange(doc, range, head, other) {
    if (doc.cm && doc.cm.display.shift || doc.extend) {
      var anchor = range.anchor;
      if (other) {
        var posBefore = cmp(head, anchor) < 0;
        if (posBefore != (cmp(other, anchor) < 0)) {
          anchor = head;
          head = other;
        } else if (posBefore != (cmp(head, other) < 0)) {
          head = other;
        }
      }
      return new Range(anchor, head);
    } else {
      return new Range(other || head, head);
    }
  }
  function extendSelection(doc, head, other, options) {
    setSelection(doc, new Selection([extendRange(doc, doc.sel.primary(), head, other)], 0), options);
  }
  function extendSelections(doc, heads, options) {
    for (var out = [],
        i = 0; i < doc.sel.ranges.length; i++)
      out[i] = extendRange(doc, doc.sel.ranges[i], heads[i], null);
    var newSel = normalizeSelection(out, doc.sel.primIndex);
    setSelection(doc, newSel, options);
  }
  function replaceOneSelection(doc, i, range, options) {
    var ranges = doc.sel.ranges.slice(0);
    ranges[i] = range;
    setSelection(doc, normalizeSelection(ranges, doc.sel.primIndex), options);
  }
  function setSimpleSelection(doc, anchor, head, options) {
    setSelection(doc, simpleSelection(anchor, head), options);
  }
  function filterSelectionChange(doc, sel) {
    var obj = {
      ranges: sel.ranges,
      update: function(ranges) {
        this.ranges = [];
        for (var i = 0; i < ranges.length; i++)
          this.ranges[i] = new Range(clipPos(doc, ranges[i].anchor), clipPos(doc, ranges[i].head));
      }
    };
    signal(doc, "beforeSelectionChange", doc, obj);
    if (doc.cm)
      signal(doc.cm, "beforeSelectionChange", doc.cm, obj);
    if (obj.ranges != sel.ranges)
      return normalizeSelection(obj.ranges, obj.ranges.length - 1);
    else
      return sel;
  }
  function setSelectionReplaceHistory(doc, sel, options) {
    var done = doc.history.done,
        last = lst(done);
    if (last && last.ranges) {
      done[done.length - 1] = sel;
      setSelectionNoUndo(doc, sel, options);
    } else {
      setSelection(doc, sel, options);
    }
  }
  function setSelection(doc, sel, options) {
    setSelectionNoUndo(doc, sel, options);
    addSelectionToHistory(doc, doc.sel, doc.cm ? doc.cm.curOp.id : NaN, options);
  }
  function setSelectionNoUndo(doc, sel, options) {
    if (hasHandler(doc, "beforeSelectionChange") || doc.cm && hasHandler(doc.cm, "beforeSelectionChange"))
      sel = filterSelectionChange(doc, sel);
    var bias = options && options.bias || (cmp(sel.primary().head, doc.sel.primary().head) < 0 ? -1 : 1);
    setSelectionInner(doc, skipAtomicInSelection(doc, sel, bias, true));
    if (!(options && options.scroll === false) && doc.cm)
      ensureCursorVisible(doc.cm);
  }
  function setSelectionInner(doc, sel) {
    if (sel.equals(doc.sel))
      return;
    doc.sel = sel;
    if (doc.cm) {
      doc.cm.curOp.updateInput = doc.cm.curOp.selectionChanged = true;
      signalCursorActivity(doc.cm);
    }
    signalLater(doc, "cursorActivity", doc);
  }
  function reCheckSelection(doc) {
    setSelectionInner(doc, skipAtomicInSelection(doc, doc.sel, null, false), sel_dontScroll);
  }
  function skipAtomicInSelection(doc, sel, bias, mayClear) {
    var out;
    for (var i = 0; i < sel.ranges.length; i++) {
      var range = sel.ranges[i];
      var newAnchor = skipAtomic(doc, range.anchor, bias, mayClear);
      var newHead = skipAtomic(doc, range.head, bias, mayClear);
      if (out || newAnchor != range.anchor || newHead != range.head) {
        if (!out)
          out = sel.ranges.slice(0, i);
        out[i] = new Range(newAnchor, newHead);
      }
    }
    return out ? normalizeSelection(out, sel.primIndex) : sel;
  }
  function skipAtomic(doc, pos, bias, mayClear) {
    var flipped = false,
        curPos = pos;
    var dir = bias || 1;
    doc.cantEdit = false;
    search: for (; ; ) {
      var line = getLine(doc, curPos.line);
      if (line.markedSpans) {
        for (var i = 0; i < line.markedSpans.length; ++i) {
          var sp = line.markedSpans[i],
              m = sp.marker;
          if ((sp.from == null || (m.inclusiveLeft ? sp.from <= curPos.ch : sp.from < curPos.ch)) && (sp.to == null || (m.inclusiveRight ? sp.to >= curPos.ch : sp.to > curPos.ch))) {
            if (mayClear) {
              signal(m, "beforeCursorEnter");
              if (m.explicitlyCleared) {
                if (!line.markedSpans)
                  break;
                else {
                  --i;
                  continue;
                }
              }
            }
            if (!m.atomic)
              continue;
            var newPos = m.find(dir < 0 ? -1 : 1);
            if (cmp(newPos, curPos) == 0) {
              newPos.ch += dir;
              if (newPos.ch < 0) {
                if (newPos.line > doc.first)
                  newPos = clipPos(doc, Pos(newPos.line - 1));
                else
                  newPos = null;
              } else if (newPos.ch > line.text.length) {
                if (newPos.line < doc.first + doc.size - 1)
                  newPos = Pos(newPos.line + 1, 0);
                else
                  newPos = null;
              }
              if (!newPos) {
                if (flipped) {
                  if (!mayClear)
                    return skipAtomic(doc, pos, bias, true);
                  doc.cantEdit = true;
                  return Pos(doc.first, 0);
                }
                flipped = true;
                newPos = pos;
                dir = -dir;
              }
            }
            curPos = newPos;
            continue search;
          }
        }
      }
      return curPos;
    }
  }
  function updateSelection(cm) {
    cm.display.input.showSelection(cm.display.input.prepareSelection());
  }
  function prepareSelection(cm, primary) {
    var doc = cm.doc,
        result = {};
    var curFragment = result.cursors = document.createDocumentFragment();
    var selFragment = result.selection = document.createDocumentFragment();
    for (var i = 0; i < doc.sel.ranges.length; i++) {
      if (primary === false && i == doc.sel.primIndex)
        continue;
      var range = doc.sel.ranges[i];
      var collapsed = range.empty();
      if (collapsed || cm.options.showCursorWhenSelecting)
        drawSelectionCursor(cm, range.head, curFragment);
      if (!collapsed)
        drawSelectionRange(cm, range, selFragment);
    }
    return result;
  }
  function drawSelectionCursor(cm, head, output) {
    var pos = cursorCoords(cm, head, "div", null, null, !cm.options.singleCursorHeightPerLine);
    var cursor = output.appendChild(elt("div", "\u00a0", "CodeMirror-cursor"));
    cursor.style.left = pos.left + "px";
    cursor.style.top = pos.top + "px";
    cursor.style.height = Math.max(0, pos.bottom - pos.top) * cm.options.cursorHeight + "px";
    if (pos.other) {
      var otherCursor = output.appendChild(elt("div", "\u00a0", "CodeMirror-cursor CodeMirror-secondarycursor"));
      otherCursor.style.display = "";
      otherCursor.style.left = pos.other.left + "px";
      otherCursor.style.top = pos.other.top + "px";
      otherCursor.style.height = (pos.other.bottom - pos.other.top) * .85 + "px";
    }
  }
  function drawSelectionRange(cm, range, output) {
    var display = cm.display,
        doc = cm.doc;
    var fragment = document.createDocumentFragment();
    var padding = paddingH(cm.display),
        leftSide = padding.left;
    var rightSide = Math.max(display.sizerWidth, displayWidth(cm) - display.sizer.offsetLeft) - padding.right;
    function add(left, top, width, bottom) {
      if (top < 0)
        top = 0;
      top = Math.round(top);
      bottom = Math.round(bottom);
      fragment.appendChild(elt("div", null, "CodeMirror-selected", "position: absolute; left: " + left + "px; top: " + top + "px; width: " + (width == null ? rightSide - left : width) + "px; height: " + (bottom - top) + "px"));
    }
    function drawForLine(line, fromArg, toArg) {
      var lineObj = getLine(doc, line);
      var lineLen = lineObj.text.length;
      var start,
          end;
      function coords(ch, bias) {
        return charCoords(cm, Pos(line, ch), "div", lineObj, bias);
      }
      iterateBidiSections(getOrder(lineObj), fromArg || 0, toArg == null ? lineLen : toArg, function(from, to, dir) {
        var leftPos = coords(from, "left"),
            rightPos,
            left,
            right;
        if (from == to) {
          rightPos = leftPos;
          left = right = leftPos.left;
        } else {
          rightPos = coords(to - 1, "right");
          if (dir == "rtl") {
            var tmp = leftPos;
            leftPos = rightPos;
            rightPos = tmp;
          }
          left = leftPos.left;
          right = rightPos.right;
        }
        if (fromArg == null && from == 0)
          left = leftSide;
        if (rightPos.top - leftPos.top > 3) {
          add(left, leftPos.top, null, leftPos.bottom);
          left = leftSide;
          if (leftPos.bottom < rightPos.top)
            add(left, leftPos.bottom, null, rightPos.top);
        }
        if (toArg == null && to == lineLen)
          right = rightSide;
        if (!start || leftPos.top < start.top || leftPos.top == start.top && leftPos.left < start.left)
          start = leftPos;
        if (!end || rightPos.bottom > end.bottom || rightPos.bottom == end.bottom && rightPos.right > end.right)
          end = rightPos;
        if (left < leftSide + 1)
          left = leftSide;
        add(left, rightPos.top, right - left, rightPos.bottom);
      });
      return {
        start: start,
        end: end
      };
    }
    var sFrom = range.from(),
        sTo = range.to();
    if (sFrom.line == sTo.line) {
      drawForLine(sFrom.line, sFrom.ch, sTo.ch);
    } else {
      var fromLine = getLine(doc, sFrom.line),
          toLine = getLine(doc, sTo.line);
      var singleVLine = visualLine(fromLine) == visualLine(toLine);
      var leftEnd = drawForLine(sFrom.line, sFrom.ch, singleVLine ? fromLine.text.length + 1 : null).end;
      var rightStart = drawForLine(sTo.line, singleVLine ? 0 : null, sTo.ch).start;
      if (singleVLine) {
        if (leftEnd.top < rightStart.top - 2) {
          add(leftEnd.right, leftEnd.top, null, leftEnd.bottom);
          add(leftSide, rightStart.top, rightStart.left, rightStart.bottom);
        } else {
          add(leftEnd.right, leftEnd.top, rightStart.left - leftEnd.right, leftEnd.bottom);
        }
      }
      if (leftEnd.bottom < rightStart.top)
        add(leftSide, leftEnd.bottom, null, rightStart.top);
    }
    output.appendChild(fragment);
  }
  function restartBlink(cm) {
    if (!cm.state.focused)
      return;
    var display = cm.display;
    clearInterval(display.blinker);
    var on = true;
    display.cursorDiv.style.visibility = "";
    if (cm.options.cursorBlinkRate > 0)
      display.blinker = setInterval(function() {
        display.cursorDiv.style.visibility = (on = !on) ? "" : "hidden";
      }, cm.options.cursorBlinkRate);
    else if (cm.options.cursorBlinkRate < 0)
      display.cursorDiv.style.visibility = "hidden";
  }
  function startWorker(cm, time) {
    if (cm.doc.mode.startState && cm.doc.frontier < cm.display.viewTo)
      cm.state.highlight.set(time, bind(highlightWorker, cm));
  }
  function highlightWorker(cm) {
    var doc = cm.doc;
    if (doc.frontier < doc.first)
      doc.frontier = doc.first;
    if (doc.frontier >= cm.display.viewTo)
      return;
    var end = +new Date + cm.options.workTime;
    var state = copyState(doc.mode, getStateBefore(cm, doc.frontier));
    var changedLines = [];
    doc.iter(doc.frontier, Math.min(doc.first + doc.size, cm.display.viewTo + 500), function(line) {
      if (doc.frontier >= cm.display.viewFrom) {
        var oldStyles = line.styles,
            tooLong = line.text.length > cm.options.maxHighlightLength;
        var highlighted = highlightLine(cm, line, tooLong ? copyState(doc.mode, state) : state, true);
        line.styles = highlighted.styles;
        var oldCls = line.styleClasses,
            newCls = highlighted.classes;
        if (newCls)
          line.styleClasses = newCls;
        else if (oldCls)
          line.styleClasses = null;
        var ischange = !oldStyles || oldStyles.length != line.styles.length || oldCls != newCls && (!oldCls || !newCls || oldCls.bgClass != newCls.bgClass || oldCls.textClass != newCls.textClass);
        for (var i = 0; !ischange && i < oldStyles.length; ++i)
          ischange = oldStyles[i] != line.styles[i];
        if (ischange)
          changedLines.push(doc.frontier);
        line.stateAfter = tooLong ? state : copyState(doc.mode, state);
      } else {
        if (line.text.length <= cm.options.maxHighlightLength)
          processLine(cm, line.text, state);
        line.stateAfter = doc.frontier % 5 == 0 ? copyState(doc.mode, state) : null;
      }
      ++doc.frontier;
      if (+new Date > end) {
        startWorker(cm, cm.options.workDelay);
        return true;
      }
    });
    if (changedLines.length)
      runInOp(cm, function() {
        for (var i = 0; i < changedLines.length; i++)
          regLineChange(cm, changedLines[i], "text");
      });
  }
  function findStartLine(cm, n, precise) {
    var minindent,
        minline,
        doc = cm.doc;
    var lim = precise ? -1 : n - (cm.doc.mode.innerMode ? 1000 : 100);
    for (var search = n; search > lim; --search) {
      if (search <= doc.first)
        return doc.first;
      var line = getLine(doc, search - 1);
      if (line.stateAfter && (!precise || search <= doc.frontier))
        return search;
      var indented = countColumn(line.text, null, cm.options.tabSize);
      if (minline == null || minindent > indented) {
        minline = search - 1;
        minindent = indented;
      }
    }
    return minline;
  }
  function getStateBefore(cm, n, precise) {
    var doc = cm.doc,
        display = cm.display;
    if (!doc.mode.startState)
      return true;
    var pos = findStartLine(cm, n, precise),
        state = pos > doc.first && getLine(doc, pos - 1).stateAfter;
    if (!state)
      state = startState(doc.mode);
    else
      state = copyState(doc.mode, state);
    doc.iter(pos, n, function(line) {
      processLine(cm, line.text, state);
      var save = pos == n - 1 || pos % 5 == 0 || pos >= display.viewFrom && pos < display.viewTo;
      line.stateAfter = save ? copyState(doc.mode, state) : null;
      ++pos;
    });
    if (precise)
      doc.frontier = pos;
    return state;
  }
  function paddingTop(display) {
    return display.lineSpace.offsetTop;
  }
  function paddingVert(display) {
    return display.mover.offsetHeight - display.lineSpace.offsetHeight;
  }
  function paddingH(display) {
    if (display.cachedPaddingH)
      return display.cachedPaddingH;
    var e = removeChildrenAndAdd(display.measure, elt("pre", "x"));
    var style = window.getComputedStyle ? window.getComputedStyle(e) : e.currentStyle;
    var data = {
      left: parseInt(style.paddingLeft),
      right: parseInt(style.paddingRight)
    };
    if (!isNaN(data.left) && !isNaN(data.right))
      display.cachedPaddingH = data;
    return data;
  }
  function scrollGap(cm) {
    return scrollerGap - cm.display.nativeBarWidth;
  }
  function displayWidth(cm) {
    return cm.display.scroller.clientWidth - scrollGap(cm) - cm.display.barWidth;
  }
  function displayHeight(cm) {
    return cm.display.scroller.clientHeight - scrollGap(cm) - cm.display.barHeight;
  }
  function ensureLineHeights(cm, lineView, rect) {
    var wrapping = cm.options.lineWrapping;
    var curWidth = wrapping && displayWidth(cm);
    if (!lineView.measure.heights || wrapping && lineView.measure.width != curWidth) {
      var heights = lineView.measure.heights = [];
      if (wrapping) {
        lineView.measure.width = curWidth;
        var rects = lineView.text.firstChild.getClientRects();
        for (var i = 0; i < rects.length - 1; i++) {
          var cur = rects[i],
              next = rects[i + 1];
          if (Math.abs(cur.bottom - next.bottom) > 2)
            heights.push((cur.bottom + next.top) / 2 - rect.top);
        }
      }
      heights.push(rect.bottom - rect.top);
    }
  }
  function mapFromLineView(lineView, line, lineN) {
    if (lineView.line == line)
      return {
        map: lineView.measure.map,
        cache: lineView.measure.cache
      };
    for (var i = 0; i < lineView.rest.length; i++)
      if (lineView.rest[i] == line)
        return {
          map: lineView.measure.maps[i],
          cache: lineView.measure.caches[i]
        };
    for (var i = 0; i < lineView.rest.length; i++)
      if (lineNo(lineView.rest[i]) > lineN)
        return {
          map: lineView.measure.maps[i],
          cache: lineView.measure.caches[i],
          before: true
        };
  }
  function updateExternalMeasurement(cm, line) {
    line = visualLine(line);
    var lineN = lineNo(line);
    var view = cm.display.externalMeasured = new LineView(cm.doc, line, lineN);
    view.lineN = lineN;
    var built = view.built = buildLineContent(cm, view);
    view.text = built.pre;
    removeChildrenAndAdd(cm.display.lineMeasure, built.pre);
    return view;
  }
  function measureChar(cm, line, ch, bias) {
    return measureCharPrepared(cm, prepareMeasureForLine(cm, line), ch, bias);
  }
  function findViewForLine(cm, lineN) {
    if (lineN >= cm.display.viewFrom && lineN < cm.display.viewTo)
      return cm.display.view[findViewIndex(cm, lineN)];
    var ext = cm.display.externalMeasured;
    if (ext && lineN >= ext.lineN && lineN < ext.lineN + ext.size)
      return ext;
  }
  function prepareMeasureForLine(cm, line) {
    var lineN = lineNo(line);
    var view = findViewForLine(cm, lineN);
    if (view && !view.text) {
      view = null;
    } else if (view && view.changes) {
      updateLineForChanges(cm, view, lineN, getDimensions(cm));
      cm.curOp.forceUpdate = true;
    }
    if (!view)
      view = updateExternalMeasurement(cm, line);
    var info = mapFromLineView(view, line, lineN);
    return {
      line: line,
      view: view,
      rect: null,
      map: info.map,
      cache: info.cache,
      before: info.before,
      hasHeights: false
    };
  }
  function measureCharPrepared(cm, prepared, ch, bias, varHeight) {
    if (prepared.before)
      ch = -1;
    var key = ch + (bias || ""),
        found;
    if (prepared.cache.hasOwnProperty(key)) {
      found = prepared.cache[key];
    } else {
      if (!prepared.rect)
        prepared.rect = prepared.view.text.getBoundingClientRect();
      if (!prepared.hasHeights) {
        ensureLineHeights(cm, prepared.view, prepared.rect);
        prepared.hasHeights = true;
      }
      found = measureCharInner(cm, prepared, ch, bias);
      if (!found.bogus)
        prepared.cache[key] = found;
    }
    return {
      left: found.left,
      right: found.right,
      top: varHeight ? found.rtop : found.top,
      bottom: varHeight ? found.rbottom : found.bottom
    };
  }
  var nullRect = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  };
  function nodeAndOffsetInLineMap(map, ch, bias) {
    var node,
        start,
        end,
        collapse;
    for (var i = 0; i < map.length; i += 3) {
      var mStart = map[i],
          mEnd = map[i + 1];
      if (ch < mStart) {
        start = 0;
        end = 1;
        collapse = "left";
      } else if (ch < mEnd) {
        start = ch - mStart;
        end = start + 1;
      } else if (i == map.length - 3 || ch == mEnd && map[i + 3] > ch) {
        end = mEnd - mStart;
        start = end - 1;
        if (ch >= mEnd)
          collapse = "right";
      }
      if (start != null) {
        node = map[i + 2];
        if (mStart == mEnd && bias == (node.insertLeft ? "left" : "right"))
          collapse = bias;
        if (bias == "left" && start == 0)
          while (i && map[i - 2] == map[i - 3] && map[i - 1].insertLeft) {
            node = map[(i -= 3) + 2];
            collapse = "left";
          }
        if (bias == "right" && start == mEnd - mStart)
          while (i < map.length - 3 && map[i + 3] == map[i + 4] && !map[i + 5].insertLeft) {
            node = map[(i += 3) + 2];
            collapse = "right";
          }
        break;
      }
    }
    return {
      node: node,
      start: start,
      end: end,
      collapse: collapse,
      coverStart: mStart,
      coverEnd: mEnd
    };
  }
  function measureCharInner(cm, prepared, ch, bias) {
    var place = nodeAndOffsetInLineMap(prepared.map, ch, bias);
    var node = place.node,
        start = place.start,
        end = place.end,
        collapse = place.collapse;
    var rect;
    if (node.nodeType == 3) {
      for (var i = 0; i < 4; i++) {
        while (start && isExtendingChar(prepared.line.text.charAt(place.coverStart + start)))
          --start;
        while (place.coverStart + end < place.coverEnd && isExtendingChar(prepared.line.text.charAt(place.coverStart + end)))
          ++end;
        if (ie && ie_version < 9 && start == 0 && end == place.coverEnd - place.coverStart) {
          rect = node.parentNode.getBoundingClientRect();
        } else if (ie && cm.options.lineWrapping) {
          var rects = range(node, start, end).getClientRects();
          if (rects.length)
            rect = rects[bias == "right" ? rects.length - 1 : 0];
          else
            rect = nullRect;
        } else {
          rect = range(node, start, end).getBoundingClientRect() || nullRect;
        }
        if (rect.left || rect.right || start == 0)
          break;
        end = start;
        start = start - 1;
        collapse = "right";
      }
      if (ie && ie_version < 11)
        rect = maybeUpdateRectForZooming(cm.display.measure, rect);
    } else {
      if (start > 0)
        collapse = bias = "right";
      var rects;
      if (cm.options.lineWrapping && (rects = node.getClientRects()).length > 1)
        rect = rects[bias == "right" ? rects.length - 1 : 0];
      else
        rect = node.getBoundingClientRect();
    }
    if (ie && ie_version < 9 && !start && (!rect || !rect.left && !rect.right)) {
      var rSpan = node.parentNode.getClientRects()[0];
      if (rSpan)
        rect = {
          left: rSpan.left,
          right: rSpan.left + charWidth(cm.display),
          top: rSpan.top,
          bottom: rSpan.bottom
        };
      else
        rect = nullRect;
    }
    var rtop = rect.top - prepared.rect.top,
        rbot = rect.bottom - prepared.rect.top;
    var mid = (rtop + rbot) / 2;
    var heights = prepared.view.measure.heights;
    for (var i = 0; i < heights.length - 1; i++)
      if (mid < heights[i])
        break;
    var top = i ? heights[i - 1] : 0,
        bot = heights[i];
    var result = {
      left: (collapse == "right" ? rect.right : rect.left) - prepared.rect.left,
      right: (collapse == "left" ? rect.left : rect.right) - prepared.rect.left,
      top: top,
      bottom: bot
    };
    if (!rect.left && !rect.right)
      result.bogus = true;
    if (!cm.options.singleCursorHeightPerLine) {
      result.rtop = rtop;
      result.rbottom = rbot;
    }
    return result;
  }
  function maybeUpdateRectForZooming(measure, rect) {
    if (!window.screen || screen.logicalXDPI == null || screen.logicalXDPI == screen.deviceXDPI || !hasBadZoomedRects(measure))
      return rect;
    var scaleX = screen.logicalXDPI / screen.deviceXDPI;
    var scaleY = screen.logicalYDPI / screen.deviceYDPI;
    return {
      left: rect.left * scaleX,
      right: rect.right * scaleX,
      top: rect.top * scaleY,
      bottom: rect.bottom * scaleY
    };
  }
  function clearLineMeasurementCacheFor(lineView) {
    if (lineView.measure) {
      lineView.measure.cache = {};
      lineView.measure.heights = null;
      if (lineView.rest)
        for (var i = 0; i < lineView.rest.length; i++)
          lineView.measure.caches[i] = {};
    }
  }
  function clearLineMeasurementCache(cm) {
    cm.display.externalMeasure = null;
    removeChildren(cm.display.lineMeasure);
    for (var i = 0; i < cm.display.view.length; i++)
      clearLineMeasurementCacheFor(cm.display.view[i]);
  }
  function clearCaches(cm) {
    clearLineMeasurementCache(cm);
    cm.display.cachedCharWidth = cm.display.cachedTextHeight = cm.display.cachedPaddingH = null;
    if (!cm.options.lineWrapping)
      cm.display.maxLineChanged = true;
    cm.display.lineNumChars = null;
  }
  function pageScrollX() {
    return window.pageXOffset || (document.documentElement || document.body).scrollLeft;
  }
  function pageScrollY() {
    return window.pageYOffset || (document.documentElement || document.body).scrollTop;
  }
  function intoCoordSystem(cm, lineObj, rect, context) {
    if (lineObj.widgets)
      for (var i = 0; i < lineObj.widgets.length; ++i)
        if (lineObj.widgets[i].above) {
          var size = widgetHeight(lineObj.widgets[i]);
          rect.top += size;
          rect.bottom += size;
        }
    if (context == "line")
      return rect;
    if (!context)
      context = "local";
    var yOff = heightAtLine(lineObj);
    if (context == "local")
      yOff += paddingTop(cm.display);
    else
      yOff -= cm.display.viewOffset;
    if (context == "page" || context == "window") {
      var lOff = cm.display.lineSpace.getBoundingClientRect();
      yOff += lOff.top + (context == "window" ? 0 : pageScrollY());
      var xOff = lOff.left + (context == "window" ? 0 : pageScrollX());
      rect.left += xOff;
      rect.right += xOff;
    }
    rect.top += yOff;
    rect.bottom += yOff;
    return rect;
  }
  function fromCoordSystem(cm, coords, context) {
    if (context == "div")
      return coords;
    var left = coords.left,
        top = coords.top;
    if (context == "page") {
      left -= pageScrollX();
      top -= pageScrollY();
    } else if (context == "local" || !context) {
      var localBox = cm.display.sizer.getBoundingClientRect();
      left += localBox.left;
      top += localBox.top;
    }
    var lineSpaceBox = cm.display.lineSpace.getBoundingClientRect();
    return {
      left: left - lineSpaceBox.left,
      top: top - lineSpaceBox.top
    };
  }
  function charCoords(cm, pos, context, lineObj, bias) {
    if (!lineObj)
      lineObj = getLine(cm.doc, pos.line);
    return intoCoordSystem(cm, lineObj, measureChar(cm, lineObj, pos.ch, bias), context);
  }
  function cursorCoords(cm, pos, context, lineObj, preparedMeasure, varHeight) {
    lineObj = lineObj || getLine(cm.doc, pos.line);
    if (!preparedMeasure)
      preparedMeasure = prepareMeasureForLine(cm, lineObj);
    function get(ch, right) {
      var m = measureCharPrepared(cm, preparedMeasure, ch, right ? "right" : "left", varHeight);
      if (right)
        m.left = m.right;
      else
        m.right = m.left;
      return intoCoordSystem(cm, lineObj, m, context);
    }
    function getBidi(ch, partPos) {
      var part = order[partPos],
          right = part.level % 2;
      if (ch == bidiLeft(part) && partPos && part.level < order[partPos - 1].level) {
        part = order[--partPos];
        ch = bidiRight(part) - (part.level % 2 ? 0 : 1);
        right = true;
      } else if (ch == bidiRight(part) && partPos < order.length - 1 && part.level < order[partPos + 1].level) {
        part = order[++partPos];
        ch = bidiLeft(part) - part.level % 2;
        right = false;
      }
      if (right && ch == part.to && ch > part.from)
        return get(ch - 1);
      return get(ch, right);
    }
    var order = getOrder(lineObj),
        ch = pos.ch;
    if (!order)
      return get(ch);
    var partPos = getBidiPartAt(order, ch);
    var val = getBidi(ch, partPos);
    if (bidiOther != null)
      val.other = getBidi(ch, bidiOther);
    return val;
  }
  function estimateCoords(cm, pos) {
    var left = 0,
        pos = clipPos(cm.doc, pos);
    if (!cm.options.lineWrapping)
      left = charWidth(cm.display) * pos.ch;
    var lineObj = getLine(cm.doc, pos.line);
    var top = heightAtLine(lineObj) + paddingTop(cm.display);
    return {
      left: left,
      right: left,
      top: top,
      bottom: top + lineObj.height
    };
  }
  function PosWithInfo(line, ch, outside, xRel) {
    var pos = Pos(line, ch);
    pos.xRel = xRel;
    if (outside)
      pos.outside = true;
    return pos;
  }
  function coordsChar(cm, x, y) {
    var doc = cm.doc;
    y += cm.display.viewOffset;
    if (y < 0)
      return PosWithInfo(doc.first, 0, true, -1);
    var lineN = lineAtHeight(doc, y),
        last = doc.first + doc.size - 1;
    if (lineN > last)
      return PosWithInfo(doc.first + doc.size - 1, getLine(doc, last).text.length, true, 1);
    if (x < 0)
      x = 0;
    var lineObj = getLine(doc, lineN);
    for (; ; ) {
      var found = coordsCharInner(cm, lineObj, lineN, x, y);
      var merged = collapsedSpanAtEnd(lineObj);
      var mergedPos = merged && merged.find(0, true);
      if (merged && (found.ch > mergedPos.from.ch || found.ch == mergedPos.from.ch && found.xRel > 0))
        lineN = lineNo(lineObj = mergedPos.to.line);
      else
        return found;
    }
  }
  function coordsCharInner(cm, lineObj, lineNo, x, y) {
    var innerOff = y - heightAtLine(lineObj);
    var wrongLine = false,
        adjust = 2 * cm.display.wrapper.clientWidth;
    var preparedMeasure = prepareMeasureForLine(cm, lineObj);
    function getX(ch) {
      var sp = cursorCoords(cm, Pos(lineNo, ch), "line", lineObj, preparedMeasure);
      wrongLine = true;
      if (innerOff > sp.bottom)
        return sp.left - adjust;
      else if (innerOff < sp.top)
        return sp.left + adjust;
      else
        wrongLine = false;
      return sp.left;
    }
    var bidi = getOrder(lineObj),
        dist = lineObj.text.length;
    var from = lineLeft(lineObj),
        to = lineRight(lineObj);
    var fromX = getX(from),
        fromOutside = wrongLine,
        toX = getX(to),
        toOutside = wrongLine;
    if (x > toX)
      return PosWithInfo(lineNo, to, toOutside, 1);
    for (; ; ) {
      if (bidi ? to == from || to == moveVisually(lineObj, from, 1) : to - from <= 1) {
        var ch = x < fromX || x - fromX <= toX - x ? from : to;
        var xDiff = x - (ch == from ? fromX : toX);
        while (isExtendingChar(lineObj.text.charAt(ch)))
          ++ch;
        var pos = PosWithInfo(lineNo, ch, ch == from ? fromOutside : toOutside, xDiff < -1 ? -1 : xDiff > 1 ? 1 : 0);
        return pos;
      }
      var step = Math.ceil(dist / 2),
          middle = from + step;
      if (bidi) {
        middle = from;
        for (var i = 0; i < step; ++i)
          middle = moveVisually(lineObj, middle, 1);
      }
      var middleX = getX(middle);
      if (middleX > x) {
        to = middle;
        toX = middleX;
        if (toOutside = wrongLine)
          toX += 1000;
        dist = step;
      } else {
        from = middle;
        fromX = middleX;
        fromOutside = wrongLine;
        dist -= step;
      }
    }
  }
  var measureText;
  function textHeight(display) {
    if (display.cachedTextHeight != null)
      return display.cachedTextHeight;
    if (measureText == null) {
      measureText = elt("pre");
      for (var i = 0; i < 49; ++i) {
        measureText.appendChild(document.createTextNode("x"));
        measureText.appendChild(elt("br"));
      }
      measureText.appendChild(document.createTextNode("x"));
    }
    removeChildrenAndAdd(display.measure, measureText);
    var height = measureText.offsetHeight / 50;
    if (height > 3)
      display.cachedTextHeight = height;
    removeChildren(display.measure);
    return height || 1;
  }
  function charWidth(display) {
    if (display.cachedCharWidth != null)
      return display.cachedCharWidth;
    var anchor = elt("span", "xxxxxxxxxx");
    var pre = elt("pre", [anchor]);
    removeChildrenAndAdd(display.measure, pre);
    var rect = anchor.getBoundingClientRect(),
        width = (rect.right - rect.left) / 10;
    if (width > 2)
      display.cachedCharWidth = width;
    return width || 10;
  }
  var operationGroup = null;
  var nextOpId = 0;
  function startOperation(cm) {
    cm.curOp = {
      cm: cm,
      viewChanged: false,
      startHeight: cm.doc.height,
      forceUpdate: false,
      updateInput: null,
      typing: false,
      changeObjs: null,
      cursorActivityHandlers: null,
      cursorActivityCalled: 0,
      selectionChanged: false,
      updateMaxLine: false,
      scrollLeft: null,
      scrollTop: null,
      scrollToPos: null,
      focus: false,
      id: ++nextOpId
    };
    if (operationGroup) {
      operationGroup.ops.push(cm.curOp);
    } else {
      cm.curOp.ownsGroup = operationGroup = {
        ops: [cm.curOp],
        delayedCallbacks: []
      };
    }
  }
  function fireCallbacksForOps(group) {
    var callbacks = group.delayedCallbacks,
        i = 0;
    do {
      for (; i < callbacks.length; i++)
        callbacks[i].call(null);
      for (var j = 0; j < group.ops.length; j++) {
        var op = group.ops[j];
        if (op.cursorActivityHandlers)
          while (op.cursorActivityCalled < op.cursorActivityHandlers.length)
            op.cursorActivityHandlers[op.cursorActivityCalled++].call(null, op.cm);
      }
    } while (i < callbacks.length);
  }
  function endOperation(cm) {
    var op = cm.curOp,
        group = op.ownsGroup;
    if (!group)
      return;
    try {
      fireCallbacksForOps(group);
    } finally {
      operationGroup = null;
      for (var i = 0; i < group.ops.length; i++)
        group.ops[i].cm.curOp = null;
      endOperations(group);
    }
  }
  function endOperations(group) {
    var ops = group.ops;
    for (var i = 0; i < ops.length; i++)
      endOperation_R1(ops[i]);
    for (var i = 0; i < ops.length; i++)
      endOperation_W1(ops[i]);
    for (var i = 0; i < ops.length; i++)
      endOperation_R2(ops[i]);
    for (var i = 0; i < ops.length; i++)
      endOperation_W2(ops[i]);
    for (var i = 0; i < ops.length; i++)
      endOperation_finish(ops[i]);
  }
  function endOperation_R1(op) {
    var cm = op.cm,
        display = cm.display;
    maybeClipScrollbars(cm);
    if (op.updateMaxLine)
      findMaxLine(cm);
    op.mustUpdate = op.viewChanged || op.forceUpdate || op.scrollTop != null || op.scrollToPos && (op.scrollToPos.from.line < display.viewFrom || op.scrollToPos.to.line >= display.viewTo) || display.maxLineChanged && cm.options.lineWrapping;
    op.update = op.mustUpdate && new DisplayUpdate(cm, op.mustUpdate && {
      top: op.scrollTop,
      ensure: op.scrollToPos
    }, op.forceUpdate);
  }
  function endOperation_W1(op) {
    op.updatedDisplay = op.mustUpdate && updateDisplayIfNeeded(op.cm, op.update);
  }
  function endOperation_R2(op) {
    var cm = op.cm,
        display = cm.display;
    if (op.updatedDisplay)
      updateHeightsInViewport(cm);
    op.barMeasure = measureForScrollbars(cm);
    if (display.maxLineChanged && !cm.options.lineWrapping) {
      op.adjustWidthTo = measureChar(cm, display.maxLine, display.maxLine.text.length).left + 3;
      cm.display.sizerWidth = op.adjustWidthTo;
      op.barMeasure.scrollWidth = Math.max(display.scroller.clientWidth, display.sizer.offsetLeft + op.adjustWidthTo + scrollGap(cm) + cm.display.barWidth);
      op.maxScrollLeft = Math.max(0, display.sizer.offsetLeft + op.adjustWidthTo - displayWidth(cm));
    }
    if (op.updatedDisplay || op.selectionChanged)
      op.preparedSelection = display.input.prepareSelection();
  }
  function endOperation_W2(op) {
    var cm = op.cm;
    if (op.adjustWidthTo != null) {
      cm.display.sizer.style.minWidth = op.adjustWidthTo + "px";
      if (op.maxScrollLeft < cm.doc.scrollLeft)
        setScrollLeft(cm, Math.min(cm.display.scroller.scrollLeft, op.maxScrollLeft), true);
      cm.display.maxLineChanged = false;
    }
    if (op.preparedSelection)
      cm.display.input.showSelection(op.preparedSelection);
    if (op.updatedDisplay)
      setDocumentHeight(cm, op.barMeasure);
    if (op.updatedDisplay || op.startHeight != cm.doc.height)
      updateScrollbars(cm, op.barMeasure);
    if (op.selectionChanged)
      restartBlink(cm);
    if (cm.state.focused && op.updateInput)
      cm.display.input.reset(op.typing);
    if (op.focus && op.focus == activeElt())
      ensureFocus(op.cm);
  }
  function endOperation_finish(op) {
    var cm = op.cm,
        display = cm.display,
        doc = cm.doc;
    if (op.updatedDisplay)
      postUpdateDisplay(cm, op.update);
    if (display.wheelStartX != null && (op.scrollTop != null || op.scrollLeft != null || op.scrollToPos))
      display.wheelStartX = display.wheelStartY = null;
    if (op.scrollTop != null && (display.scroller.scrollTop != op.scrollTop || op.forceScroll)) {
      doc.scrollTop = Math.max(0, Math.min(display.scroller.scrollHeight - display.scroller.clientHeight, op.scrollTop));
      display.scrollbars.setScrollTop(doc.scrollTop);
      display.scroller.scrollTop = doc.scrollTop;
    }
    if (op.scrollLeft != null && (display.scroller.scrollLeft != op.scrollLeft || op.forceScroll)) {
      doc.scrollLeft = Math.max(0, Math.min(display.scroller.scrollWidth - displayWidth(cm), op.scrollLeft));
      display.scrollbars.setScrollLeft(doc.scrollLeft);
      display.scroller.scrollLeft = doc.scrollLeft;
      alignHorizontally(cm);
    }
    if (op.scrollToPos) {
      var coords = scrollPosIntoView(cm, clipPos(doc, op.scrollToPos.from), clipPos(doc, op.scrollToPos.to), op.scrollToPos.margin);
      if (op.scrollToPos.isCursor && cm.state.focused)
        maybeScrollWindow(cm, coords);
    }
    var hidden = op.maybeHiddenMarkers,
        unhidden = op.maybeUnhiddenMarkers;
    if (hidden)
      for (var i = 0; i < hidden.length; ++i)
        if (!hidden[i].lines.length)
          signal(hidden[i], "hide");
    if (unhidden)
      for (var i = 0; i < unhidden.length; ++i)
        if (unhidden[i].lines.length)
          signal(unhidden[i], "unhide");
    if (display.wrapper.offsetHeight)
      doc.scrollTop = cm.display.scroller.scrollTop;
    if (op.changeObjs)
      signal(cm, "changes", cm, op.changeObjs);
    if (op.update)
      op.update.finish();
  }
  function runInOp(cm, f) {
    if (cm.curOp)
      return f();
    startOperation(cm);
    try {
      return f();
    } finally {
      endOperation(cm);
    }
  }
  function operation(cm, f) {
    return function() {
      if (cm.curOp)
        return f.apply(cm, arguments);
      startOperation(cm);
      try {
        return f.apply(cm, arguments);
      } finally {
        endOperation(cm);
      }
    };
  }
  function methodOp(f) {
    return function() {
      if (this.curOp)
        return f.apply(this, arguments);
      startOperation(this);
      try {
        return f.apply(this, arguments);
      } finally {
        endOperation(this);
      }
    };
  }
  function docMethodOp(f) {
    return function() {
      var cm = this.cm;
      if (!cm || cm.curOp)
        return f.apply(this, arguments);
      startOperation(cm);
      try {
        return f.apply(this, arguments);
      } finally {
        endOperation(cm);
      }
    };
  }
  function LineView(doc, line, lineN) {
    this.line = line;
    this.rest = visualLineContinued(line);
    this.size = this.rest ? lineNo(lst(this.rest)) - lineN + 1 : 1;
    this.node = this.text = null;
    this.hidden = lineIsHidden(doc, line);
  }
  function buildViewArray(cm, from, to) {
    var array = [],
        nextPos;
    for (var pos = from; pos < to; pos = nextPos) {
      var view = new LineView(cm.doc, getLine(cm.doc, pos), pos);
      nextPos = pos + view.size;
      array.push(view);
    }
    return array;
  }
  function regChange(cm, from, to, lendiff) {
    if (from == null)
      from = cm.doc.first;
    if (to == null)
      to = cm.doc.first + cm.doc.size;
    if (!lendiff)
      lendiff = 0;
    var display = cm.display;
    if (lendiff && to < display.viewTo && (display.updateLineNumbers == null || display.updateLineNumbers > from))
      display.updateLineNumbers = from;
    cm.curOp.viewChanged = true;
    if (from >= display.viewTo) {
      if (sawCollapsedSpans && visualLineNo(cm.doc, from) < display.viewTo)
        resetView(cm);
    } else if (to <= display.viewFrom) {
      if (sawCollapsedSpans && visualLineEndNo(cm.doc, to + lendiff) > display.viewFrom) {
        resetView(cm);
      } else {
        display.viewFrom += lendiff;
        display.viewTo += lendiff;
      }
    } else if (from <= display.viewFrom && to >= display.viewTo) {
      resetView(cm);
    } else if (from <= display.viewFrom) {
      var cut = viewCuttingPoint(cm, to, to + lendiff, 1);
      if (cut) {
        display.view = display.view.slice(cut.index);
        display.viewFrom = cut.lineN;
        display.viewTo += lendiff;
      } else {
        resetView(cm);
      }
    } else if (to >= display.viewTo) {
      var cut = viewCuttingPoint(cm, from, from, -1);
      if (cut) {
        display.view = display.view.slice(0, cut.index);
        display.viewTo = cut.lineN;
      } else {
        resetView(cm);
      }
    } else {
      var cutTop = viewCuttingPoint(cm, from, from, -1);
      var cutBot = viewCuttingPoint(cm, to, to + lendiff, 1);
      if (cutTop && cutBot) {
        display.view = display.view.slice(0, cutTop.index).concat(buildViewArray(cm, cutTop.lineN, cutBot.lineN)).concat(display.view.slice(cutBot.index));
        display.viewTo += lendiff;
      } else {
        resetView(cm);
      }
    }
    var ext = display.externalMeasured;
    if (ext) {
      if (to < ext.lineN)
        ext.lineN += lendiff;
      else if (from < ext.lineN + ext.size)
        display.externalMeasured = null;
    }
  }
  function regLineChange(cm, line, type) {
    cm.curOp.viewChanged = true;
    var display = cm.display,
        ext = cm.display.externalMeasured;
    if (ext && line >= ext.lineN && line < ext.lineN + ext.size)
      display.externalMeasured = null;
    if (line < display.viewFrom || line >= display.viewTo)
      return;
    var lineView = display.view[findViewIndex(cm, line)];
    if (lineView.node == null)
      return;
    var arr = lineView.changes || (lineView.changes = []);
    if (indexOf(arr, type) == -1)
      arr.push(type);
  }
  function resetView(cm) {
    cm.display.viewFrom = cm.display.viewTo = cm.doc.first;
    cm.display.view = [];
    cm.display.viewOffset = 0;
  }
  function findViewIndex(cm, n) {
    if (n >= cm.display.viewTo)
      return null;
    n -= cm.display.viewFrom;
    if (n < 0)
      return null;
    var view = cm.display.view;
    for (var i = 0; i < view.length; i++) {
      n -= view[i].size;
      if (n < 0)
        return i;
    }
  }
  function viewCuttingPoint(cm, oldN, newN, dir) {
    var index = findViewIndex(cm, oldN),
        diff,
        view = cm.display.view;
    if (!sawCollapsedSpans || newN == cm.doc.first + cm.doc.size)
      return {
        index: index,
        lineN: newN
      };
    for (var i = 0,
        n = cm.display.viewFrom; i < index; i++)
      n += view[i].size;
    if (n != oldN) {
      if (dir > 0) {
        if (index == view.length - 1)
          return null;
        diff = (n + view[index].size) - oldN;
        index++;
      } else {
        diff = n - oldN;
      }
      oldN += diff;
      newN += diff;
    }
    while (visualLineNo(cm.doc, newN) != newN) {
      if (index == (dir < 0 ? 0 : view.length - 1))
        return null;
      newN += dir * view[index - (dir < 0 ? 1 : 0)].size;
      index += dir;
    }
    return {
      index: index,
      lineN: newN
    };
  }
  function adjustView(cm, from, to) {
    var display = cm.display,
        view = display.view;
    if (view.length == 0 || from >= display.viewTo || to <= display.viewFrom) {
      display.view = buildViewArray(cm, from, to);
      display.viewFrom = from;
    } else {
      if (display.viewFrom > from)
        display.view = buildViewArray(cm, from, display.viewFrom).concat(display.view);
      else if (display.viewFrom < from)
        display.view = display.view.slice(findViewIndex(cm, from));
      display.viewFrom = from;
      if (display.viewTo < to)
        display.view = display.view.concat(buildViewArray(cm, display.viewTo, to));
      else if (display.viewTo > to)
        display.view = display.view.slice(0, findViewIndex(cm, to));
    }
    display.viewTo = to;
  }
  function countDirtyView(cm) {
    var view = cm.display.view,
        dirty = 0;
    for (var i = 0; i < view.length; i++) {
      var lineView = view[i];
      if (!lineView.hidden && (!lineView.node || lineView.changes))
        ++dirty;
    }
    return dirty;
  }
  function registerEventHandlers(cm) {
    var d = cm.display;
    on(d.scroller, "mousedown", operation(cm, onMouseDown));
    if (ie && ie_version < 11)
      on(d.scroller, "dblclick", operation(cm, function(e) {
        if (signalDOMEvent(cm, e))
          return;
        var pos = posFromMouse(cm, e);
        if (!pos || clickInGutter(cm, e) || eventInWidget(cm.display, e))
          return;
        e_preventDefault(e);
        var word = cm.findWordAt(pos);
        extendSelection(cm.doc, word.anchor, word.head);
      }));
    else
      on(d.scroller, "dblclick", function(e) {
        signalDOMEvent(cm, e) || e_preventDefault(e);
      });
    if (!captureRightClick)
      on(d.scroller, "contextmenu", function(e) {
        onContextMenu(cm, e);
      });
    var touchFinished,
        prevTouch = {end: 0};
    function finishTouch() {
      if (d.activeTouch) {
        touchFinished = setTimeout(function() {
          d.activeTouch = null;
        }, 1000);
        prevTouch = d.activeTouch;
        prevTouch.end = +new Date;
      }
    }
    ;
    function isMouseLikeTouchEvent(e) {
      if (e.touches.length != 1)
        return false;
      var touch = e.touches[0];
      return touch.radiusX <= 1 && touch.radiusY <= 1;
    }
    function farAway(touch, other) {
      if (other.left == null)
        return true;
      var dx = other.left - touch.left,
          dy = other.top - touch.top;
      return dx * dx + dy * dy > 20 * 20;
    }
    on(d.scroller, "touchstart", function(e) {
      if (!isMouseLikeTouchEvent(e)) {
        clearTimeout(touchFinished);
        var now = +new Date;
        d.activeTouch = {
          start: now,
          moved: false,
          prev: now - prevTouch.end <= 300 ? prevTouch : null
        };
        if (e.touches.length == 1) {
          d.activeTouch.left = e.touches[0].pageX;
          d.activeTouch.top = e.touches[0].pageY;
        }
      }
    });
    on(d.scroller, "touchmove", function() {
      if (d.activeTouch)
        d.activeTouch.moved = true;
    });
    on(d.scroller, "touchend", function(e) {
      var touch = d.activeTouch;
      if (touch && !eventInWidget(d, e) && touch.left != null && !touch.moved && new Date - touch.start < 300) {
        var pos = cm.coordsChar(d.activeTouch, "page"),
            range;
        if (!touch.prev || farAway(touch, touch.prev))
          range = new Range(pos, pos);
        else if (!touch.prev.prev || farAway(touch, touch.prev.prev))
          range = cm.findWordAt(pos);
        else
          range = new Range(Pos(pos.line, 0), clipPos(cm.doc, Pos(pos.line + 1, 0)));
        cm.setSelection(range.anchor, range.head);
        cm.focus();
        e_preventDefault(e);
      }
      finishTouch();
    });
    on(d.scroller, "touchcancel", finishTouch);
    on(d.scroller, "scroll", function() {
      if (d.scroller.clientHeight) {
        setScrollTop(cm, d.scroller.scrollTop);
        setScrollLeft(cm, d.scroller.scrollLeft, true);
        signal(cm, "scroll", cm);
      }
    });
    on(d.scroller, "mousewheel", function(e) {
      onScrollWheel(cm, e);
    });
    on(d.scroller, "DOMMouseScroll", function(e) {
      onScrollWheel(cm, e);
    });
    on(d.wrapper, "scroll", function() {
      d.wrapper.scrollTop = d.wrapper.scrollLeft = 0;
    });
    d.dragFunctions = {
      enter: function(e) {
        if (!signalDOMEvent(cm, e))
          e_stop(e);
      },
      over: function(e) {
        if (!signalDOMEvent(cm, e)) {
          onDragOver(cm, e);
          e_stop(e);
        }
      },
      start: function(e) {
        onDragStart(cm, e);
      },
      drop: operation(cm, onDrop),
      leave: function() {
        clearDragCursor(cm);
      }
    };
    var inp = d.input.getField();
    on(inp, "keyup", function(e) {
      onKeyUp.call(cm, e);
    });
    on(inp, "keydown", operation(cm, onKeyDown));
    on(inp, "keypress", operation(cm, onKeyPress));
    on(inp, "focus", bind(onFocus, cm));
    on(inp, "blur", bind(onBlur, cm));
  }
  function dragDropChanged(cm, value, old) {
    var wasOn = old && old != CodeMirror.Init;
    if (!value != !wasOn) {
      var funcs = cm.display.dragFunctions;
      var toggle = value ? on : off;
      toggle(cm.display.scroller, "dragstart", funcs.start);
      toggle(cm.display.scroller, "dragenter", funcs.enter);
      toggle(cm.display.scroller, "dragover", funcs.over);
      toggle(cm.display.scroller, "dragleave", funcs.leave);
      toggle(cm.display.scroller, "drop", funcs.drop);
    }
  }
  function onResize(cm) {
    var d = cm.display;
    if (d.lastWrapHeight == d.wrapper.clientHeight && d.lastWrapWidth == d.wrapper.clientWidth)
      return;
    d.cachedCharWidth = d.cachedTextHeight = d.cachedPaddingH = null;
    d.scrollbarsClipped = false;
    cm.setSize();
  }
  function eventInWidget(display, e) {
    for (var n = e_target(e); n != display.wrapper; n = n.parentNode) {
      if (!n || (n.nodeType == 1 && n.getAttribute("cm-ignore-events") == "true") || (n.parentNode == display.sizer && n != display.mover))
        return true;
    }
  }
  function posFromMouse(cm, e, liberal, forRect) {
    var display = cm.display;
    if (!liberal && e_target(e).getAttribute("cm-not-content") == "true")
      return null;
    var x,
        y,
        space = display.lineSpace.getBoundingClientRect();
    try {
      x = e.clientX - space.left;
      y = e.clientY - space.top;
    } catch (e) {
      return null;
    }
    var coords = coordsChar(cm, x, y),
        line;
    if (forRect && coords.xRel == 1 && (line = getLine(cm.doc, coords.line).text).length == coords.ch) {
      var colDiff = countColumn(line, line.length, cm.options.tabSize) - line.length;
      coords = Pos(coords.line, Math.max(0, Math.round((x - paddingH(cm.display).left) / charWidth(cm.display)) - colDiff));
    }
    return coords;
  }
  function onMouseDown(e) {
    var cm = this,
        display = cm.display;
    if (display.activeTouch && display.input.supportsTouch() || signalDOMEvent(cm, e))
      return;
    display.shift = e.shiftKey;
    if (eventInWidget(display, e)) {
      if (!webkit) {
        display.scroller.draggable = false;
        setTimeout(function() {
          display.scroller.draggable = true;
        }, 100);
      }
      return;
    }
    if (clickInGutter(cm, e))
      return;
    var start = posFromMouse(cm, e);
    window.focus();
    switch (e_button(e)) {
      case 1:
        if (cm.state.selectingText)
          cm.state.selectingText(e);
        else if (start)
          leftButtonDown(cm, e, start);
        else if (e_target(e) == display.scroller)
          e_preventDefault(e);
        break;
      case 2:
        if (webkit)
          cm.state.lastMiddleDown = +new Date;
        if (start)
          extendSelection(cm.doc, start);
        setTimeout(function() {
          display.input.focus();
        }, 20);
        e_preventDefault(e);
        break;
      case 3:
        if (captureRightClick)
          onContextMenu(cm, e);
        else
          delayBlurEvent(cm);
        break;
    }
  }
  var lastClick,
      lastDoubleClick;
  function leftButtonDown(cm, e, start) {
    if (ie)
      setTimeout(bind(ensureFocus, cm), 0);
    else
      cm.curOp.focus = activeElt();
    var now = +new Date,
        type;
    if (lastDoubleClick && lastDoubleClick.time > now - 400 && cmp(lastDoubleClick.pos, start) == 0) {
      type = "triple";
    } else if (lastClick && lastClick.time > now - 400 && cmp(lastClick.pos, start) == 0) {
      type = "double";
      lastDoubleClick = {
        time: now,
        pos: start
      };
    } else {
      type = "single";
      lastClick = {
        time: now,
        pos: start
      };
    }
    var sel = cm.doc.sel,
        modifier = mac ? e.metaKey : e.ctrlKey,
        contained;
    if (cm.options.dragDrop && dragAndDrop && !isReadOnly(cm) && type == "single" && (contained = sel.contains(start)) > -1 && (cmp((contained = sel.ranges[contained]).from(), start) < 0 || start.xRel > 0) && (cmp(contained.to(), start) > 0 || start.xRel < 0))
      leftButtonStartDrag(cm, e, start, modifier);
    else
      leftButtonSelect(cm, e, start, type, modifier);
  }
  function leftButtonStartDrag(cm, e, start, modifier) {
    var display = cm.display,
        startTime = +new Date;
    var dragEnd = operation(cm, function(e2) {
      if (webkit)
        display.scroller.draggable = false;
      cm.state.draggingText = false;
      off(document, "mouseup", dragEnd);
      off(display.scroller, "drop", dragEnd);
      if (Math.abs(e.clientX - e2.clientX) + Math.abs(e.clientY - e2.clientY) < 10) {
        e_preventDefault(e2);
        if (!modifier && +new Date - 200 < startTime)
          extendSelection(cm.doc, start);
        if (webkit || ie && ie_version == 9)
          setTimeout(function() {
            document.body.focus();
            display.input.focus();
          }, 20);
        else
          display.input.focus();
      }
    });
    if (webkit)
      display.scroller.draggable = true;
    cm.state.draggingText = dragEnd;
    if (display.scroller.dragDrop)
      display.scroller.dragDrop();
    on(document, "mouseup", dragEnd);
    on(display.scroller, "drop", dragEnd);
  }
  function leftButtonSelect(cm, e, start, type, addNew) {
    var display = cm.display,
        doc = cm.doc;
    e_preventDefault(e);
    var ourRange,
        ourIndex,
        startSel = doc.sel,
        ranges = startSel.ranges;
    if (addNew && !e.shiftKey) {
      ourIndex = doc.sel.contains(start);
      if (ourIndex > -1)
        ourRange = ranges[ourIndex];
      else
        ourRange = new Range(start, start);
    } else {
      ourRange = doc.sel.primary();
      ourIndex = doc.sel.primIndex;
    }
    if (e.altKey) {
      type = "rect";
      if (!addNew)
        ourRange = new Range(start, start);
      start = posFromMouse(cm, e, true, true);
      ourIndex = -1;
    } else if (type == "double") {
      var word = cm.findWordAt(start);
      if (cm.display.shift || doc.extend)
        ourRange = extendRange(doc, ourRange, word.anchor, word.head);
      else
        ourRange = word;
    } else if (type == "triple") {
      var line = new Range(Pos(start.line, 0), clipPos(doc, Pos(start.line + 1, 0)));
      if (cm.display.shift || doc.extend)
        ourRange = extendRange(doc, ourRange, line.anchor, line.head);
      else
        ourRange = line;
    } else {
      ourRange = extendRange(doc, ourRange, start);
    }
    if (!addNew) {
      ourIndex = 0;
      setSelection(doc, new Selection([ourRange], 0), sel_mouse);
      startSel = doc.sel;
    } else if (ourIndex == -1) {
      ourIndex = ranges.length;
      setSelection(doc, normalizeSelection(ranges.concat([ourRange]), ourIndex), {
        scroll: false,
        origin: "*mouse"
      });
    } else if (ranges.length > 1 && ranges[ourIndex].empty() && type == "single" && !e.shiftKey) {
      setSelection(doc, normalizeSelection(ranges.slice(0, ourIndex).concat(ranges.slice(ourIndex + 1)), 0), {
        scroll: false,
        origin: "*mouse"
      });
      startSel = doc.sel;
    } else {
      replaceOneSelection(doc, ourIndex, ourRange, sel_mouse);
    }
    var lastPos = start;
    function extendTo(pos) {
      if (cmp(lastPos, pos) == 0)
        return;
      lastPos = pos;
      if (type == "rect") {
        var ranges = [],
            tabSize = cm.options.tabSize;
        var startCol = countColumn(getLine(doc, start.line).text, start.ch, tabSize);
        var posCol = countColumn(getLine(doc, pos.line).text, pos.ch, tabSize);
        var left = Math.min(startCol, posCol),
            right = Math.max(startCol, posCol);
        for (var line = Math.min(start.line, pos.line),
            end = Math.min(cm.lastLine(), Math.max(start.line, pos.line)); line <= end; line++) {
          var text = getLine(doc, line).text,
              leftPos = findColumn(text, left, tabSize);
          if (left == right)
            ranges.push(new Range(Pos(line, leftPos), Pos(line, leftPos)));
          else if (text.length > leftPos)
            ranges.push(new Range(Pos(line, leftPos), Pos(line, findColumn(text, right, tabSize))));
        }
        if (!ranges.length)
          ranges.push(new Range(start, start));
        setSelection(doc, normalizeSelection(startSel.ranges.slice(0, ourIndex).concat(ranges), ourIndex), {
          origin: "*mouse",
          scroll: false
        });
        cm.scrollIntoView(pos);
      } else {
        var oldRange = ourRange;
        var anchor = oldRange.anchor,
            head = pos;
        if (type != "single") {
          if (type == "double")
            var range = cm.findWordAt(pos);
          else
            var range = new Range(Pos(pos.line, 0), clipPos(doc, Pos(pos.line + 1, 0)));
          if (cmp(range.anchor, anchor) > 0) {
            head = range.head;
            anchor = minPos(oldRange.from(), range.anchor);
          } else {
            head = range.anchor;
            anchor = maxPos(oldRange.to(), range.head);
          }
        }
        var ranges = startSel.ranges.slice(0);
        ranges[ourIndex] = new Range(clipPos(doc, anchor), head);
        setSelection(doc, normalizeSelection(ranges, ourIndex), sel_mouse);
      }
    }
    var editorSize = display.wrapper.getBoundingClientRect();
    var counter = 0;
    function extend(e) {
      var curCount = ++counter;
      var cur = posFromMouse(cm, e, true, type == "rect");
      if (!cur)
        return;
      if (cmp(cur, lastPos) != 0) {
        cm.curOp.focus = activeElt();
        extendTo(cur);
        var visible = visibleLines(display, doc);
        if (cur.line >= visible.to || cur.line < visible.from)
          setTimeout(operation(cm, function() {
            if (counter == curCount)
              extend(e);
          }), 150);
      } else {
        var outside = e.clientY < editorSize.top ? -20 : e.clientY > editorSize.bottom ? 20 : 0;
        if (outside)
          setTimeout(operation(cm, function() {
            if (counter != curCount)
              return;
            display.scroller.scrollTop += outside;
            extend(e);
          }), 50);
      }
    }
    function done(e) {
      cm.state.selectingText = false;
      counter = Infinity;
      e_preventDefault(e);
      display.input.focus();
      off(document, "mousemove", move);
      off(document, "mouseup", up);
      doc.history.lastSelOrigin = null;
    }
    var move = operation(cm, function(e) {
      if (!e_button(e))
        done(e);
      else
        extend(e);
    });
    var up = operation(cm, done);
    cm.state.selectingText = up;
    on(document, "mousemove", move);
    on(document, "mouseup", up);
  }
  function gutterEvent(cm, e, type, prevent, signalfn) {
    try {
      var mX = e.clientX,
          mY = e.clientY;
    } catch (e) {
      return false;
    }
    if (mX >= Math.floor(cm.display.gutters.getBoundingClientRect().right))
      return false;
    if (prevent)
      e_preventDefault(e);
    var display = cm.display;
    var lineBox = display.lineDiv.getBoundingClientRect();
    if (mY > lineBox.bottom || !hasHandler(cm, type))
      return e_defaultPrevented(e);
    mY -= lineBox.top - display.viewOffset;
    for (var i = 0; i < cm.options.gutters.length; ++i) {
      var g = display.gutters.childNodes[i];
      if (g && g.getBoundingClientRect().right >= mX) {
        var line = lineAtHeight(cm.doc, mY);
        var gutter = cm.options.gutters[i];
        signalfn(cm, type, cm, line, gutter, e);
        return e_defaultPrevented(e);
      }
    }
  }
  function clickInGutter(cm, e) {
    return gutterEvent(cm, e, "gutterClick", true, signalLater);
  }
  var lastDrop = 0;
  function onDrop(e) {
    var cm = this;
    clearDragCursor(cm);
    if (signalDOMEvent(cm, e) || eventInWidget(cm.display, e))
      return;
    e_preventDefault(e);
    if (ie)
      lastDrop = +new Date;
    var pos = posFromMouse(cm, e, true),
        files = e.dataTransfer.files;
    if (!pos || isReadOnly(cm))
      return;
    if (files && files.length && window.FileReader && window.File) {
      var n = files.length,
          text = Array(n),
          read = 0;
      var loadFile = function(file, i) {
        if (cm.options.allowDropFileTypes && indexOf(cm.options.allowDropFileTypes, file.type) == -1)
          return;
        var reader = new FileReader;
        reader.onload = operation(cm, function() {
          var content = reader.result;
          if (/[\x00-\x08\x0e-\x1f]{2}/.test(content))
            content = "";
          text[i] = content;
          if (++read == n) {
            pos = clipPos(cm.doc, pos);
            var change = {
              from: pos,
              to: pos,
              text: cm.doc.splitLines(text.join(cm.doc.lineSeparator())),
              origin: "paste"
            };
            makeChange(cm.doc, change);
            setSelectionReplaceHistory(cm.doc, simpleSelection(pos, changeEnd(change)));
          }
        });
        reader.readAsText(file);
      };
      for (var i = 0; i < n; ++i)
        loadFile(files[i], i);
    } else {
      if (cm.state.draggingText && cm.doc.sel.contains(pos) > -1) {
        cm.state.draggingText(e);
        setTimeout(function() {
          cm.display.input.focus();
        }, 20);
        return;
      }
      try {
        var text = e.dataTransfer.getData("Text");
        if (text) {
          if (cm.state.draggingText && !(mac ? e.altKey : e.ctrlKey))
            var selected = cm.listSelections();
          setSelectionNoUndo(cm.doc, simpleSelection(pos, pos));
          if (selected)
            for (var i = 0; i < selected.length; ++i)
              replaceRange(cm.doc, "", selected[i].anchor, selected[i].head, "drag");
          cm.replaceSelection(text, "around", "paste");
          cm.display.input.focus();
        }
      } catch (e) {}
    }
  }
  function onDragStart(cm, e) {
    if (ie && (!cm.state.draggingText || +new Date - lastDrop < 100)) {
      e_stop(e);
      return;
    }
    if (signalDOMEvent(cm, e) || eventInWidget(cm.display, e))
      return;
    e.dataTransfer.setData("Text", cm.getSelection());
    if (e.dataTransfer.setDragImage && !safari) {
      var img = elt("img", null, null, "position: fixed; left: 0; top: 0;");
      img.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
      if (presto) {
        img.width = img.height = 1;
        cm.display.wrapper.appendChild(img);
        img._top = img.offsetTop;
      }
      e.dataTransfer.setDragImage(img, 0, 0);
      if (presto)
        img.parentNode.removeChild(img);
    }
  }
  function onDragOver(cm, e) {
    var pos = posFromMouse(cm, e);
    if (!pos)
      return;
    var frag = document.createDocumentFragment();
    drawSelectionCursor(cm, pos, frag);
    if (!cm.display.dragCursor) {
      cm.display.dragCursor = elt("div", null, "CodeMirror-cursors CodeMirror-dragcursors");
      cm.display.lineSpace.insertBefore(cm.display.dragCursor, cm.display.cursorDiv);
    }
    removeChildrenAndAdd(cm.display.dragCursor, frag);
  }
  function clearDragCursor(cm) {
    if (cm.display.dragCursor) {
      cm.display.lineSpace.removeChild(cm.display.dragCursor);
      cm.display.dragCursor = null;
    }
  }
  function setScrollTop(cm, val) {
    if (Math.abs(cm.doc.scrollTop - val) < 2)
      return;
    cm.doc.scrollTop = val;
    if (!gecko)
      updateDisplaySimple(cm, {top: val});
    if (cm.display.scroller.scrollTop != val)
      cm.display.scroller.scrollTop = val;
    cm.display.scrollbars.setScrollTop(val);
    if (gecko)
      updateDisplaySimple(cm);
    startWorker(cm, 100);
  }
  function setScrollLeft(cm, val, isScroller) {
    if (isScroller ? val == cm.doc.scrollLeft : Math.abs(cm.doc.scrollLeft - val) < 2)
      return;
    val = Math.min(val, cm.display.scroller.scrollWidth - cm.display.scroller.clientWidth);
    cm.doc.scrollLeft = val;
    alignHorizontally(cm);
    if (cm.display.scroller.scrollLeft != val)
      cm.display.scroller.scrollLeft = val;
    cm.display.scrollbars.setScrollLeft(val);
  }
  var wheelSamples = 0,
      wheelPixelsPerUnit = null;
  if (ie)
    wheelPixelsPerUnit = -.53;
  else if (gecko)
    wheelPixelsPerUnit = 15;
  else if (chrome)
    wheelPixelsPerUnit = -.7;
  else if (safari)
    wheelPixelsPerUnit = -1 / 3;
  var wheelEventDelta = function(e) {
    var dx = e.wheelDeltaX,
        dy = e.wheelDeltaY;
    if (dx == null && e.detail && e.axis == e.HORIZONTAL_AXIS)
      dx = e.detail;
    if (dy == null && e.detail && e.axis == e.VERTICAL_AXIS)
      dy = e.detail;
    else if (dy == null)
      dy = e.wheelDelta;
    return {
      x: dx,
      y: dy
    };
  };
  CodeMirror.wheelEventPixels = function(e) {
    var delta = wheelEventDelta(e);
    delta.x *= wheelPixelsPerUnit;
    delta.y *= wheelPixelsPerUnit;
    return delta;
  };
  function onScrollWheel(cm, e) {
    var delta = wheelEventDelta(e),
        dx = delta.x,
        dy = delta.y;
    var display = cm.display,
        scroll = display.scroller;
    var canScrollX = scroll.scrollWidth > scroll.clientWidth;
    var canScrollY = scroll.scrollHeight > scroll.clientHeight;
    if (!(dx && canScrollX || dy && canScrollY))
      return;
    if (dy && mac && webkit) {
      outer: for (var cur = e.target,
          view = display.view; cur != scroll; cur = cur.parentNode) {
        for (var i = 0; i < view.length; i++) {
          if (view[i].node == cur) {
            cm.display.currentWheelTarget = cur;
            break outer;
          }
        }
      }
    }
    if (dx && !gecko && !presto && wheelPixelsPerUnit != null) {
      if (dy && canScrollY)
        setScrollTop(cm, Math.max(0, Math.min(scroll.scrollTop + dy * wheelPixelsPerUnit, scroll.scrollHeight - scroll.clientHeight)));
      setScrollLeft(cm, Math.max(0, Math.min(scroll.scrollLeft + dx * wheelPixelsPerUnit, scroll.scrollWidth - scroll.clientWidth)));
      if (!dy || (dy && canScrollY))
        e_preventDefault(e);
      display.wheelStartX = null;
      return;
    }
    if (dy && wheelPixelsPerUnit != null) {
      var pixels = dy * wheelPixelsPerUnit;
      var top = cm.doc.scrollTop,
          bot = top + display.wrapper.clientHeight;
      if (pixels < 0)
        top = Math.max(0, top + pixels - 50);
      else
        bot = Math.min(cm.doc.height, bot + pixels + 50);
      updateDisplaySimple(cm, {
        top: top,
        bottom: bot
      });
    }
    if (wheelSamples < 20) {
      if (display.wheelStartX == null) {
        display.wheelStartX = scroll.scrollLeft;
        display.wheelStartY = scroll.scrollTop;
        display.wheelDX = dx;
        display.wheelDY = dy;
        setTimeout(function() {
          if (display.wheelStartX == null)
            return;
          var movedX = scroll.scrollLeft - display.wheelStartX;
          var movedY = scroll.scrollTop - display.wheelStartY;
          var sample = (movedY && display.wheelDY && movedY / display.wheelDY) || (movedX && display.wheelDX && movedX / display.wheelDX);
          display.wheelStartX = display.wheelStartY = null;
          if (!sample)
            return;
          wheelPixelsPerUnit = (wheelPixelsPerUnit * wheelSamples + sample) / (wheelSamples + 1);
          ++wheelSamples;
        }, 200);
      } else {
        display.wheelDX += dx;
        display.wheelDY += dy;
      }
    }
  }
  function doHandleBinding(cm, bound, dropShift) {
    if (typeof bound == "string") {
      bound = commands[bound];
      if (!bound)
        return false;
    }
    cm.display.input.ensurePolled();
    var prevShift = cm.display.shift,
        done = false;
    try {
      if (isReadOnly(cm))
        cm.state.suppressEdits = true;
      if (dropShift)
        cm.display.shift = false;
      done = bound(cm) != Pass;
    } finally {
      cm.display.shift = prevShift;
      cm.state.suppressEdits = false;
    }
    return done;
  }
  function lookupKeyForEditor(cm, name, handle) {
    for (var i = 0; i < cm.state.keyMaps.length; i++) {
      var result = lookupKey(name, cm.state.keyMaps[i], handle, cm);
      if (result)
        return result;
    }
    return (cm.options.extraKeys && lookupKey(name, cm.options.extraKeys, handle, cm)) || lookupKey(name, cm.options.keyMap, handle, cm);
  }
  var stopSeq = new Delayed;
  function dispatchKey(cm, name, e, handle) {
    var seq = cm.state.keySeq;
    if (seq) {
      if (isModifierKey(name))
        return "handled";
      stopSeq.set(50, function() {
        if (cm.state.keySeq == seq) {
          cm.state.keySeq = null;
          cm.display.input.reset();
        }
      });
      name = seq + " " + name;
    }
    var result = lookupKeyForEditor(cm, name, handle);
    if (result == "multi")
      cm.state.keySeq = name;
    if (result == "handled")
      signalLater(cm, "keyHandled", cm, name, e);
    if (result == "handled" || result == "multi") {
      e_preventDefault(e);
      restartBlink(cm);
    }
    if (seq && !result && /\'$/.test(name)) {
      e_preventDefault(e);
      return true;
    }
    return !!result;
  }
  function handleKeyBinding(cm, e) {
    var name = keyName(e, true);
    if (!name)
      return false;
    if (e.shiftKey && !cm.state.keySeq) {
      return dispatchKey(cm, "Shift-" + name, e, function(b) {
        return doHandleBinding(cm, b, true);
      }) || dispatchKey(cm, name, e, function(b) {
        if (typeof b == "string" ? /^go[A-Z]/.test(b) : b.motion)
          return doHandleBinding(cm, b);
      });
    } else {
      return dispatchKey(cm, name, e, function(b) {
        return doHandleBinding(cm, b);
      });
    }
  }
  function handleCharBinding(cm, e, ch) {
    return dispatchKey(cm, "'" + ch + "'", e, function(b) {
      return doHandleBinding(cm, b, true);
    });
  }
  var lastStoppedKey = null;
  function onKeyDown(e) {
    var cm = this;
    cm.curOp.focus = activeElt();
    if (signalDOMEvent(cm, e))
      return;
    if (ie && ie_version < 11 && e.keyCode == 27)
      e.returnValue = false;
    var code = e.keyCode;
    cm.display.shift = code == 16 || e.shiftKey;
    var handled = handleKeyBinding(cm, e);
    if (presto) {
      lastStoppedKey = handled ? code : null;
      if (!handled && code == 88 && !hasCopyEvent && (mac ? e.metaKey : e.ctrlKey))
        cm.replaceSelection("", null, "cut");
    }
    if (code == 18 && !/\bCodeMirror-crosshair\b/.test(cm.display.lineDiv.className))
      showCrossHair(cm);
  }
  function showCrossHair(cm) {
    var lineDiv = cm.display.lineDiv;
    addClass(lineDiv, "CodeMirror-crosshair");
    function up(e) {
      if (e.keyCode == 18 || !e.altKey) {
        rmClass(lineDiv, "CodeMirror-crosshair");
        off(document, "keyup", up);
        off(document, "mouseover", up);
      }
    }
    on(document, "keyup", up);
    on(document, "mouseover", up);
  }
  function onKeyUp(e) {
    if (e.keyCode == 16)
      this.doc.sel.shift = false;
    signalDOMEvent(this, e);
  }
  function onKeyPress(e) {
    var cm = this;
    if (eventInWidget(cm.display, e) || signalDOMEvent(cm, e) || e.ctrlKey && !e.altKey || mac && e.metaKey)
      return;
    var keyCode = e.keyCode,
        charCode = e.charCode;
    if (presto && keyCode == lastStoppedKey) {
      lastStoppedKey = null;
      e_preventDefault(e);
      return;
    }
    if ((presto && (!e.which || e.which < 10)) && handleKeyBinding(cm, e))
      return;
    var ch = String.fromCharCode(charCode == null ? keyCode : charCode);
    if (handleCharBinding(cm, e, ch))
      return;
    cm.display.input.onKeyPress(e);
  }
  function delayBlurEvent(cm) {
    cm.state.delayingBlurEvent = true;
    setTimeout(function() {
      if (cm.state.delayingBlurEvent) {
        cm.state.delayingBlurEvent = false;
        onBlur(cm);
      }
    }, 100);
  }
  function onFocus(cm) {
    if (cm.state.delayingBlurEvent)
      cm.state.delayingBlurEvent = false;
    if (cm.options.readOnly == "nocursor")
      return;
    if (!cm.state.focused) {
      signal(cm, "focus", cm);
      cm.state.focused = true;
      addClass(cm.display.wrapper, "CodeMirror-focused");
      if (!cm.curOp && cm.display.selForContextMenu != cm.doc.sel) {
        cm.display.input.reset();
        if (webkit)
          setTimeout(function() {
            cm.display.input.reset(true);
          }, 20);
      }
      cm.display.input.receivedFocus();
    }
    restartBlink(cm);
  }
  function onBlur(cm) {
    if (cm.state.delayingBlurEvent)
      return;
    if (cm.state.focused) {
      signal(cm, "blur", cm);
      cm.state.focused = false;
      rmClass(cm.display.wrapper, "CodeMirror-focused");
    }
    clearInterval(cm.display.blinker);
    setTimeout(function() {
      if (!cm.state.focused)
        cm.display.shift = false;
    }, 150);
  }
  function onContextMenu(cm, e) {
    if (eventInWidget(cm.display, e) || contextMenuInGutter(cm, e))
      return;
    if (signalDOMEvent(cm, e, "contextmenu"))
      return;
    cm.display.input.onContextMenu(e);
  }
  function contextMenuInGutter(cm, e) {
    if (!hasHandler(cm, "gutterContextMenu"))
      return false;
    return gutterEvent(cm, e, "gutterContextMenu", false, signal);
  }
  var changeEnd = CodeMirror.changeEnd = function(change) {
    if (!change.text)
      return change.to;
    return Pos(change.from.line + change.text.length - 1, lst(change.text).length + (change.text.length == 1 ? change.from.ch : 0));
  };
  function adjustForChange(pos, change) {
    if (cmp(pos, change.from) < 0)
      return pos;
    if (cmp(pos, change.to) <= 0)
      return changeEnd(change);
    var line = pos.line + change.text.length - (change.to.line - change.from.line) - 1,
        ch = pos.ch;
    if (pos.line == change.to.line)
      ch += changeEnd(change).ch - change.to.ch;
    return Pos(line, ch);
  }
  function computeSelAfterChange(doc, change) {
    var out = [];
    for (var i = 0; i < doc.sel.ranges.length; i++) {
      var range = doc.sel.ranges[i];
      out.push(new Range(adjustForChange(range.anchor, change), adjustForChange(range.head, change)));
    }
    return normalizeSelection(out, doc.sel.primIndex);
  }
  function offsetPos(pos, old, nw) {
    if (pos.line == old.line)
      return Pos(nw.line, pos.ch - old.ch + nw.ch);
    else
      return Pos(nw.line + (pos.line - old.line), pos.ch);
  }
  function computeReplacedSel(doc, changes, hint) {
    var out = [];
    var oldPrev = Pos(doc.first, 0),
        newPrev = oldPrev;
    for (var i = 0; i < changes.length; i++) {
      var change = changes[i];
      var from = offsetPos(change.from, oldPrev, newPrev);
      var to = offsetPos(changeEnd(change), oldPrev, newPrev);
      oldPrev = change.to;
      newPrev = to;
      if (hint == "around") {
        var range = doc.sel.ranges[i],
            inv = cmp(range.head, range.anchor) < 0;
        out[i] = new Range(inv ? to : from, inv ? from : to);
      } else {
        out[i] = new Range(from, from);
      }
    }
    return new Selection(out, doc.sel.primIndex);
  }
  function filterChange(doc, change, update) {
    var obj = {
      canceled: false,
      from: change.from,
      to: change.to,
      text: change.text,
      origin: change.origin,
      cancel: function() {
        this.canceled = true;
      }
    };
    if (update)
      obj.update = function(from, to, text, origin) {
        if (from)
          this.from = clipPos(doc, from);
        if (to)
          this.to = clipPos(doc, to);
        if (text)
          this.text = text;
        if (origin !== undefined)
          this.origin = origin;
      };
    signal(doc, "beforeChange", doc, obj);
    if (doc.cm)
      signal(doc.cm, "beforeChange", doc.cm, obj);
    if (obj.canceled)
      return null;
    return {
      from: obj.from,
      to: obj.to,
      text: obj.text,
      origin: obj.origin
    };
  }
  function makeChange(doc, change, ignoreReadOnly) {
    if (doc.cm) {
      if (!doc.cm.curOp)
        return operation(doc.cm, makeChange)(doc, change, ignoreReadOnly);
      if (doc.cm.state.suppressEdits)
        return;
    }
    if (hasHandler(doc, "beforeChange") || doc.cm && hasHandler(doc.cm, "beforeChange")) {
      change = filterChange(doc, change, true);
      if (!change)
        return;
    }
    var split = sawReadOnlySpans && !ignoreReadOnly && removeReadOnlyRanges(doc, change.from, change.to);
    if (split) {
      for (var i = split.length - 1; i >= 0; --i)
        makeChangeInner(doc, {
          from: split[i].from,
          to: split[i].to,
          text: i ? [""] : change.text
        });
    } else {
      makeChangeInner(doc, change);
    }
  }
  function makeChangeInner(doc, change) {
    if (change.text.length == 1 && change.text[0] == "" && cmp(change.from, change.to) == 0)
      return;
    var selAfter = computeSelAfterChange(doc, change);
    addChangeToHistory(doc, change, selAfter, doc.cm ? doc.cm.curOp.id : NaN);
    makeChangeSingleDoc(doc, change, selAfter, stretchSpansOverChange(doc, change));
    var rebased = [];
    linkedDocs(doc, function(doc, sharedHist) {
      if (!sharedHist && indexOf(rebased, doc.history) == -1) {
        rebaseHist(doc.history, change);
        rebased.push(doc.history);
      }
      makeChangeSingleDoc(doc, change, null, stretchSpansOverChange(doc, change));
    });
  }
  function makeChangeFromHistory(doc, type, allowSelectionOnly) {
    if (doc.cm && doc.cm.state.suppressEdits)
      return;
    var hist = doc.history,
        event,
        selAfter = doc.sel;
    var source = type == "undo" ? hist.done : hist.undone,
        dest = type == "undo" ? hist.undone : hist.done;
    for (var i = 0; i < source.length; i++) {
      event = source[i];
      if (allowSelectionOnly ? event.ranges && !event.equals(doc.sel) : !event.ranges)
        break;
    }
    if (i == source.length)
      return;
    hist.lastOrigin = hist.lastSelOrigin = null;
    for (; ; ) {
      event = source.pop();
      if (event.ranges) {
        pushSelectionToHistory(event, dest);
        if (allowSelectionOnly && !event.equals(doc.sel)) {
          setSelection(doc, event, {clearRedo: false});
          return;
        }
        selAfter = event;
      } else
        break;
    }
    var antiChanges = [];
    pushSelectionToHistory(selAfter, dest);
    dest.push({
      changes: antiChanges,
      generation: hist.generation
    });
    hist.generation = event.generation || ++hist.maxGeneration;
    var filter = hasHandler(doc, "beforeChange") || doc.cm && hasHandler(doc.cm, "beforeChange");
    for (var i = event.changes.length - 1; i >= 0; --i) {
      var change = event.changes[i];
      change.origin = type;
      if (filter && !filterChange(doc, change, false)) {
        source.length = 0;
        return;
      }
      antiChanges.push(historyChangeFromChange(doc, change));
      var after = i ? computeSelAfterChange(doc, change) : lst(source);
      makeChangeSingleDoc(doc, change, after, mergeOldSpans(doc, change));
      if (!i && doc.cm)
        doc.cm.scrollIntoView({
          from: change.from,
          to: changeEnd(change)
        });
      var rebased = [];
      linkedDocs(doc, function(doc, sharedHist) {
        if (!sharedHist && indexOf(rebased, doc.history) == -1) {
          rebaseHist(doc.history, change);
          rebased.push(doc.history);
        }
        makeChangeSingleDoc(doc, change, null, mergeOldSpans(doc, change));
      });
    }
  }
  function shiftDoc(doc, distance) {
    if (distance == 0)
      return;
    doc.first += distance;
    doc.sel = new Selection(map(doc.sel.ranges, function(range) {
      return new Range(Pos(range.anchor.line + distance, range.anchor.ch), Pos(range.head.line + distance, range.head.ch));
    }), doc.sel.primIndex);
    if (doc.cm) {
      regChange(doc.cm, doc.first, doc.first - distance, distance);
      for (var d = doc.cm.display,
          l = d.viewFrom; l < d.viewTo; l++)
        regLineChange(doc.cm, l, "gutter");
    }
  }
  function makeChangeSingleDoc(doc, change, selAfter, spans) {
    if (doc.cm && !doc.cm.curOp)
      return operation(doc.cm, makeChangeSingleDoc)(doc, change, selAfter, spans);
    if (change.to.line < doc.first) {
      shiftDoc(doc, change.text.length - 1 - (change.to.line - change.from.line));
      return;
    }
    if (change.from.line > doc.lastLine())
      return;
    if (change.from.line < doc.first) {
      var shift = change.text.length - 1 - (doc.first - change.from.line);
      shiftDoc(doc, shift);
      change = {
        from: Pos(doc.first, 0),
        to: Pos(change.to.line + shift, change.to.ch),
        text: [lst(change.text)],
        origin: change.origin
      };
    }
    var last = doc.lastLine();
    if (change.to.line > last) {
      change = {
        from: change.from,
        to: Pos(last, getLine(doc, last).text.length),
        text: [change.text[0]],
        origin: change.origin
      };
    }
    change.removed = getBetween(doc, change.from, change.to);
    if (!selAfter)
      selAfter = computeSelAfterChange(doc, change);
    if (doc.cm)
      makeChangeSingleDocInEditor(doc.cm, change, spans);
    else
      updateDoc(doc, change, spans);
    setSelectionNoUndo(doc, selAfter, sel_dontScroll);
  }
  function makeChangeSingleDocInEditor(cm, change, spans) {
    var doc = cm.doc,
        display = cm.display,
        from = change.from,
        to = change.to;
    var recomputeMaxLength = false,
        checkWidthStart = from.line;
    if (!cm.options.lineWrapping) {
      checkWidthStart = lineNo(visualLine(getLine(doc, from.line)));
      doc.iter(checkWidthStart, to.line + 1, function(line) {
        if (line == display.maxLine) {
          recomputeMaxLength = true;
          return true;
        }
      });
    }
    if (doc.sel.contains(change.from, change.to) > -1)
      signalCursorActivity(cm);
    updateDoc(doc, change, spans, estimateHeight(cm));
    if (!cm.options.lineWrapping) {
      doc.iter(checkWidthStart, from.line + change.text.length, function(line) {
        var len = lineLength(line);
        if (len > display.maxLineLength) {
          display.maxLine = line;
          display.maxLineLength = len;
          display.maxLineChanged = true;
          recomputeMaxLength = false;
        }
      });
      if (recomputeMaxLength)
        cm.curOp.updateMaxLine = true;
    }
    doc.frontier = Math.min(doc.frontier, from.line);
    startWorker(cm, 400);
    var lendiff = change.text.length - (to.line - from.line) - 1;
    if (change.full)
      regChange(cm);
    else if (from.line == to.line && change.text.length == 1 && !isWholeLineUpdate(cm.doc, change))
      regLineChange(cm, from.line, "text");
    else
      regChange(cm, from.line, to.line + 1, lendiff);
    var changesHandler = hasHandler(cm, "changes"),
        changeHandler = hasHandler(cm, "change");
    if (changeHandler || changesHandler) {
      var obj = {
        from: from,
        to: to,
        text: change.text,
        removed: change.removed,
        origin: change.origin
      };
      if (changeHandler)
        signalLater(cm, "change", cm, obj);
      if (changesHandler)
        (cm.curOp.changeObjs || (cm.curOp.changeObjs = [])).push(obj);
    }
    cm.display.selForContextMenu = null;
  }
  function replaceRange(doc, code, from, to, origin) {
    if (!to)
      to = from;
    if (cmp(to, from) < 0) {
      var tmp = to;
      to = from;
      from = tmp;
    }
    if (typeof code == "string")
      code = doc.splitLines(code);
    makeChange(doc, {
      from: from,
      to: to,
      text: code,
      origin: origin
    });
  }
  function maybeScrollWindow(cm, coords) {
    if (signalDOMEvent(cm, "scrollCursorIntoView"))
      return;
    var display = cm.display,
        box = display.sizer.getBoundingClientRect(),
        doScroll = null;
    if (coords.top + box.top < 0)
      doScroll = true;
    else if (coords.bottom + box.top > (window.innerHeight || document.documentElement.clientHeight))
      doScroll = false;
    if (doScroll != null && !phantom) {
      var scrollNode = elt("div", "\u200b", null, "position: absolute; top: " + (coords.top - display.viewOffset - paddingTop(cm.display)) + "px; height: " + (coords.bottom - coords.top + scrollGap(cm) + display.barHeight) + "px; left: " + coords.left + "px; width: 2px;");
      cm.display.lineSpace.appendChild(scrollNode);
      scrollNode.scrollIntoView(doScroll);
      cm.display.lineSpace.removeChild(scrollNode);
    }
  }
  function scrollPosIntoView(cm, pos, end, margin) {
    if (margin == null)
      margin = 0;
    for (var limit = 0; limit < 5; limit++) {
      var changed = false,
          coords = cursorCoords(cm, pos);
      var endCoords = !end || end == pos ? coords : cursorCoords(cm, end);
      var scrollPos = calculateScrollPos(cm, Math.min(coords.left, endCoords.left), Math.min(coords.top, endCoords.top) - margin, Math.max(coords.left, endCoords.left), Math.max(coords.bottom, endCoords.bottom) + margin);
      var startTop = cm.doc.scrollTop,
          startLeft = cm.doc.scrollLeft;
      if (scrollPos.scrollTop != null) {
        setScrollTop(cm, scrollPos.scrollTop);
        if (Math.abs(cm.doc.scrollTop - startTop) > 1)
          changed = true;
      }
      if (scrollPos.scrollLeft != null) {
        setScrollLeft(cm, scrollPos.scrollLeft);
        if (Math.abs(cm.doc.scrollLeft - startLeft) > 1)
          changed = true;
      }
      if (!changed)
        break;
    }
    return coords;
  }
  function scrollIntoView(cm, x1, y1, x2, y2) {
    var scrollPos = calculateScrollPos(cm, x1, y1, x2, y2);
    if (scrollPos.scrollTop != null)
      setScrollTop(cm, scrollPos.scrollTop);
    if (scrollPos.scrollLeft != null)
      setScrollLeft(cm, scrollPos.scrollLeft);
  }
  function calculateScrollPos(cm, x1, y1, x2, y2) {
    var display = cm.display,
        snapMargin = textHeight(cm.display);
    if (y1 < 0)
      y1 = 0;
    var screentop = cm.curOp && cm.curOp.scrollTop != null ? cm.curOp.scrollTop : display.scroller.scrollTop;
    var screen = displayHeight(cm),
        result = {};
    if (y2 - y1 > screen)
      y2 = y1 + screen;
    var docBottom = cm.doc.height + paddingVert(display);
    var atTop = y1 < snapMargin,
        atBottom = y2 > docBottom - snapMargin;
    if (y1 < screentop) {
      result.scrollTop = atTop ? 0 : y1;
    } else if (y2 > screentop + screen) {
      var newTop = Math.min(y1, (atBottom ? docBottom : y2) - screen);
      if (newTop != screentop)
        result.scrollTop = newTop;
    }
    var screenleft = cm.curOp && cm.curOp.scrollLeft != null ? cm.curOp.scrollLeft : display.scroller.scrollLeft;
    var screenw = displayWidth(cm) - (cm.options.fixedGutter ? display.gutters.offsetWidth : 0);
    var tooWide = x2 - x1 > screenw;
    if (tooWide)
      x2 = x1 + screenw;
    if (x1 < 10)
      result.scrollLeft = 0;
    else if (x1 < screenleft)
      result.scrollLeft = Math.max(0, x1 - (tooWide ? 0 : 10));
    else if (x2 > screenw + screenleft - 3)
      result.scrollLeft = x2 + (tooWide ? 0 : 10) - screenw;
    return result;
  }
  function addToScrollPos(cm, left, top) {
    if (left != null || top != null)
      resolveScrollToPos(cm);
    if (left != null)
      cm.curOp.scrollLeft = (cm.curOp.scrollLeft == null ? cm.doc.scrollLeft : cm.curOp.scrollLeft) + left;
    if (top != null)
      cm.curOp.scrollTop = (cm.curOp.scrollTop == null ? cm.doc.scrollTop : cm.curOp.scrollTop) + top;
  }
  function ensureCursorVisible(cm) {
    resolveScrollToPos(cm);
    var cur = cm.getCursor(),
        from = cur,
        to = cur;
    if (!cm.options.lineWrapping) {
      from = cur.ch ? Pos(cur.line, cur.ch - 1) : cur;
      to = Pos(cur.line, cur.ch + 1);
    }
    cm.curOp.scrollToPos = {
      from: from,
      to: to,
      margin: cm.options.cursorScrollMargin,
      isCursor: true
    };
  }
  function resolveScrollToPos(cm) {
    var range = cm.curOp.scrollToPos;
    if (range) {
      cm.curOp.scrollToPos = null;
      var from = estimateCoords(cm, range.from),
          to = estimateCoords(cm, range.to);
      var sPos = calculateScrollPos(cm, Math.min(from.left, to.left), Math.min(from.top, to.top) - range.margin, Math.max(from.right, to.right), Math.max(from.bottom, to.bottom) + range.margin);
      cm.scrollTo(sPos.scrollLeft, sPos.scrollTop);
    }
  }
  function indentLine(cm, n, how, aggressive) {
    var doc = cm.doc,
        state;
    if (how == null)
      how = "add";
    if (how == "smart") {
      if (!doc.mode.indent)
        how = "prev";
      else
        state = getStateBefore(cm, n);
    }
    var tabSize = cm.options.tabSize;
    var line = getLine(doc, n),
        curSpace = countColumn(line.text, null, tabSize);
    if (line.stateAfter)
      line.stateAfter = null;
    var curSpaceString = line.text.match(/^\s*/)[0],
        indentation;
    if (!aggressive && !/\S/.test(line.text)) {
      indentation = 0;
      how = "not";
    } else if (how == "smart") {
      indentation = doc.mode.indent(state, line.text.slice(curSpaceString.length), line.text);
      if (indentation == Pass || indentation > 150) {
        if (!aggressive)
          return;
        how = "prev";
      }
    }
    if (how == "prev") {
      if (n > doc.first)
        indentation = countColumn(getLine(doc, n - 1).text, null, tabSize);
      else
        indentation = 0;
    } else if (how == "add") {
      indentation = curSpace + cm.options.indentUnit;
    } else if (how == "subtract") {
      indentation = curSpace - cm.options.indentUnit;
    } else if (typeof how == "number") {
      indentation = curSpace + how;
    }
    indentation = Math.max(0, indentation);
    var indentString = "",
        pos = 0;
    if (cm.options.indentWithTabs)
      for (var i = Math.floor(indentation / tabSize); i; --i) {
        pos += tabSize;
        indentString += "\t";
      }
    if (pos < indentation)
      indentString += spaceStr(indentation - pos);
    if (indentString != curSpaceString) {
      replaceRange(doc, indentString, Pos(n, 0), Pos(n, curSpaceString.length), "+input");
      line.stateAfter = null;
      return true;
    } else {
      for (var i = 0; i < doc.sel.ranges.length; i++) {
        var range = doc.sel.ranges[i];
        if (range.head.line == n && range.head.ch < curSpaceString.length) {
          var pos = Pos(n, curSpaceString.length);
          replaceOneSelection(doc, i, new Range(pos, pos));
          break;
        }
      }
    }
  }
  function changeLine(doc, handle, changeType, op) {
    var no = handle,
        line = handle;
    if (typeof handle == "number")
      line = getLine(doc, clipLine(doc, handle));
    else
      no = lineNo(handle);
    if (no == null)
      return null;
    if (op(line, no) && doc.cm)
      regLineChange(doc.cm, no, changeType);
    return line;
  }
  function deleteNearSelection(cm, compute) {
    var ranges = cm.doc.sel.ranges,
        kill = [];
    for (var i = 0; i < ranges.length; i++) {
      var toKill = compute(ranges[i]);
      while (kill.length && cmp(toKill.from, lst(kill).to) <= 0) {
        var replaced = kill.pop();
        if (cmp(replaced.from, toKill.from) < 0) {
          toKill.from = replaced.from;
          break;
        }
      }
      kill.push(toKill);
    }
    runInOp(cm, function() {
      for (var i = kill.length - 1; i >= 0; i--)
        replaceRange(cm.doc, "", kill[i].from, kill[i].to, "+delete");
      ensureCursorVisible(cm);
    });
  }
  function findPosH(doc, pos, dir, unit, visually) {
    var line = pos.line,
        ch = pos.ch,
        origDir = dir;
    var lineObj = getLine(doc, line);
    var possible = true;
    function findNextLine() {
      var l = line + dir;
      if (l < doc.first || l >= doc.first + doc.size)
        return (possible = false);
      line = l;
      return lineObj = getLine(doc, l);
    }
    function moveOnce(boundToLine) {
      var next = (visually ? moveVisually : moveLogically)(lineObj, ch, dir, true);
      if (next == null) {
        if (!boundToLine && findNextLine()) {
          if (visually)
            ch = (dir < 0 ? lineRight : lineLeft)(lineObj);
          else
            ch = dir < 0 ? lineObj.text.length : 0;
        } else
          return (possible = false);
      } else
        ch = next;
      return true;
    }
    if (unit == "char")
      moveOnce();
    else if (unit == "column")
      moveOnce(true);
    else if (unit == "word" || unit == "group") {
      var sawType = null,
          group = unit == "group";
      var helper = doc.cm && doc.cm.getHelper(pos, "wordChars");
      for (var first = true; ; first = false) {
        if (dir < 0 && !moveOnce(!first))
          break;
        var cur = lineObj.text.charAt(ch) || "\n";
        var type = isWordChar(cur, helper) ? "w" : group && cur == "\n" ? "n" : !group || /\s/.test(cur) ? null : "p";
        if (group && !first && !type)
          type = "s";
        if (sawType && sawType != type) {
          if (dir < 0) {
            dir = 1;
            moveOnce();
          }
          break;
        }
        if (type)
          sawType = type;
        if (dir > 0 && !moveOnce(!first))
          break;
      }
    }
    var result = skipAtomic(doc, Pos(line, ch), origDir, true);
    if (!possible)
      result.hitSide = true;
    return result;
  }
  function findPosV(cm, pos, dir, unit) {
    var doc = cm.doc,
        x = pos.left,
        y;
    if (unit == "page") {
      var pageSize = Math.min(cm.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight);
      y = pos.top + dir * (pageSize - (dir < 0 ? 1.5 : .5) * textHeight(cm.display));
    } else if (unit == "line") {
      y = dir > 0 ? pos.bottom + 3 : pos.top - 3;
    }
    for (; ; ) {
      var target = coordsChar(cm, x, y);
      if (!target.outside)
        break;
      if (dir < 0 ? y <= 0 : y >= doc.height) {
        target.hitSide = true;
        break;
      }
      y += dir * 5;
    }
    return target;
  }
  CodeMirror.prototype = {
    constructor: CodeMirror,
    focus: function() {
      window.focus();
      this.display.input.focus();
    },
    setOption: function(option, value) {
      var options = this.options,
          old = options[option];
      if (options[option] == value && option != "mode")
        return;
      options[option] = value;
      if (optionHandlers.hasOwnProperty(option))
        operation(this, optionHandlers[option])(this, value, old);
    },
    getOption: function(option) {
      return this.options[option];
    },
    getDoc: function() {
      return this.doc;
    },
    addKeyMap: function(map, bottom) {
      this.state.keyMaps[bottom ? "push" : "unshift"](getKeyMap(map));
    },
    removeKeyMap: function(map) {
      var maps = this.state.keyMaps;
      for (var i = 0; i < maps.length; ++i)
        if (maps[i] == map || maps[i].name == map) {
          maps.splice(i, 1);
          return true;
        }
    },
    addOverlay: methodOp(function(spec, options) {
      var mode = spec.token ? spec : CodeMirror.getMode(this.options, spec);
      if (mode.startState)
        throw new Error("Overlays may not be stateful.");
      this.state.overlays.push({
        mode: mode,
        modeSpec: spec,
        opaque: options && options.opaque
      });
      this.state.modeGen++;
      regChange(this);
    }),
    removeOverlay: methodOp(function(spec) {
      var overlays = this.state.overlays;
      for (var i = 0; i < overlays.length; ++i) {
        var cur = overlays[i].modeSpec;
        if (cur == spec || typeof spec == "string" && cur.name == spec) {
          overlays.splice(i, 1);
          this.state.modeGen++;
          regChange(this);
          return;
        }
      }
    }),
    indentLine: methodOp(function(n, dir, aggressive) {
      if (typeof dir != "string" && typeof dir != "number") {
        if (dir == null)
          dir = this.options.smartIndent ? "smart" : "prev";
        else
          dir = dir ? "add" : "subtract";
      }
      if (isLine(this.doc, n))
        indentLine(this, n, dir, aggressive);
    }),
    indentSelection: methodOp(function(how) {
      var ranges = this.doc.sel.ranges,
          end = -1;
      for (var i = 0; i < ranges.length; i++) {
        var range = ranges[i];
        if (!range.empty()) {
          var from = range.from(),
              to = range.to();
          var start = Math.max(end, from.line);
          end = Math.min(this.lastLine(), to.line - (to.ch ? 0 : 1)) + 1;
          for (var j = start; j < end; ++j)
            indentLine(this, j, how);
          var newRanges = this.doc.sel.ranges;
          if (from.ch == 0 && ranges.length == newRanges.length && newRanges[i].from().ch > 0)
            replaceOneSelection(this.doc, i, new Range(from, newRanges[i].to()), sel_dontScroll);
        } else if (range.head.line > end) {
          indentLine(this, range.head.line, how, true);
          end = range.head.line;
          if (i == this.doc.sel.primIndex)
            ensureCursorVisible(this);
        }
      }
    }),
    getTokenAt: function(pos, precise) {
      return takeToken(this, pos, precise);
    },
    getLineTokens: function(line, precise) {
      return takeToken(this, Pos(line), precise, true);
    },
    getTokenTypeAt: function(pos) {
      pos = clipPos(this.doc, pos);
      var styles = getLineStyles(this, getLine(this.doc, pos.line));
      var before = 0,
          after = (styles.length - 1) / 2,
          ch = pos.ch;
      var type;
      if (ch == 0)
        type = styles[2];
      else
        for (; ; ) {
          var mid = (before + after) >> 1;
          if ((mid ? styles[mid * 2 - 1] : 0) >= ch)
            after = mid;
          else if (styles[mid * 2 + 1] < ch)
            before = mid + 1;
          else {
            type = styles[mid * 2 + 2];
            break;
          }
        }
      var cut = type ? type.indexOf("cm-overlay ") : -1;
      return cut < 0 ? type : cut == 0 ? null : type.slice(0, cut - 1);
    },
    getModeAt: function(pos) {
      var mode = this.doc.mode;
      if (!mode.innerMode)
        return mode;
      return CodeMirror.innerMode(mode, this.getTokenAt(pos).state).mode;
    },
    getHelper: function(pos, type) {
      return this.getHelpers(pos, type)[0];
    },
    getHelpers: function(pos, type) {
      var found = [];
      if (!helpers.hasOwnProperty(type))
        return found;
      var help = helpers[type],
          mode = this.getModeAt(pos);
      if (typeof mode[type] == "string") {
        if (help[mode[type]])
          found.push(help[mode[type]]);
      } else if (mode[type]) {
        for (var i = 0; i < mode[type].length; i++) {
          var val = help[mode[type][i]];
          if (val)
            found.push(val);
        }
      } else if (mode.helperType && help[mode.helperType]) {
        found.push(help[mode.helperType]);
      } else if (help[mode.name]) {
        found.push(help[mode.name]);
      }
      for (var i = 0; i < help._global.length; i++) {
        var cur = help._global[i];
        if (cur.pred(mode, this) && indexOf(found, cur.val) == -1)
          found.push(cur.val);
      }
      return found;
    },
    getStateAfter: function(line, precise) {
      var doc = this.doc;
      line = clipLine(doc, line == null ? doc.first + doc.size - 1 : line);
      return getStateBefore(this, line + 1, precise);
    },
    cursorCoords: function(start, mode) {
      var pos,
          range = this.doc.sel.primary();
      if (start == null)
        pos = range.head;
      else if (typeof start == "object")
        pos = clipPos(this.doc, start);
      else
        pos = start ? range.from() : range.to();
      return cursorCoords(this, pos, mode || "page");
    },
    charCoords: function(pos, mode) {
      return charCoords(this, clipPos(this.doc, pos), mode || "page");
    },
    coordsChar: function(coords, mode) {
      coords = fromCoordSystem(this, coords, mode || "page");
      return coordsChar(this, coords.left, coords.top);
    },
    lineAtHeight: function(height, mode) {
      height = fromCoordSystem(this, {
        top: height,
        left: 0
      }, mode || "page").top;
      return lineAtHeight(this.doc, height + this.display.viewOffset);
    },
    heightAtLine: function(line, mode) {
      var end = false,
          lineObj;
      if (typeof line == "number") {
        var last = this.doc.first + this.doc.size - 1;
        if (line < this.doc.first)
          line = this.doc.first;
        else if (line > last) {
          line = last;
          end = true;
        }
        lineObj = getLine(this.doc, line);
      } else {
        lineObj = line;
      }
      return intoCoordSystem(this, lineObj, {
        top: 0,
        left: 0
      }, mode || "page").top + (end ? this.doc.height - heightAtLine(lineObj) : 0);
    },
    defaultTextHeight: function() {
      return textHeight(this.display);
    },
    defaultCharWidth: function() {
      return charWidth(this.display);
    },
    setGutterMarker: methodOp(function(line, gutterID, value) {
      return changeLine(this.doc, line, "gutter", function(line) {
        var markers = line.gutterMarkers || (line.gutterMarkers = {});
        markers[gutterID] = value;
        if (!value && isEmpty(markers))
          line.gutterMarkers = null;
        return true;
      });
    }),
    clearGutter: methodOp(function(gutterID) {
      var cm = this,
          doc = cm.doc,
          i = doc.first;
      doc.iter(function(line) {
        if (line.gutterMarkers && line.gutterMarkers[gutterID]) {
          line.gutterMarkers[gutterID] = null;
          regLineChange(cm, i, "gutter");
          if (isEmpty(line.gutterMarkers))
            line.gutterMarkers = null;
        }
        ++i;
      });
    }),
    lineInfo: function(line) {
      if (typeof line == "number") {
        if (!isLine(this.doc, line))
          return null;
        var n = line;
        line = getLine(this.doc, line);
        if (!line)
          return null;
      } else {
        var n = lineNo(line);
        if (n == null)
          return null;
      }
      return {
        line: n,
        handle: line,
        text: line.text,
        gutterMarkers: line.gutterMarkers,
        textClass: line.textClass,
        bgClass: line.bgClass,
        wrapClass: line.wrapClass,
        widgets: line.widgets
      };
    },
    getViewport: function() {
      return {
        from: this.display.viewFrom,
        to: this.display.viewTo
      };
    },
    addWidget: function(pos, node, scroll, vert, horiz) {
      var display = this.display;
      pos = cursorCoords(this, clipPos(this.doc, pos));
      var top = pos.bottom,
          left = pos.left;
      node.style.position = "absolute";
      node.setAttribute("cm-ignore-events", "true");
      this.display.input.setUneditable(node);
      display.sizer.appendChild(node);
      if (vert == "over") {
        top = pos.top;
      } else if (vert == "above" || vert == "near") {
        var vspace = Math.max(display.wrapper.clientHeight, this.doc.height),
            hspace = Math.max(display.sizer.clientWidth, display.lineSpace.clientWidth);
        if ((vert == 'above' || pos.bottom + node.offsetHeight > vspace) && pos.top > node.offsetHeight)
          top = pos.top - node.offsetHeight;
        else if (pos.bottom + node.offsetHeight <= vspace)
          top = pos.bottom;
        if (left + node.offsetWidth > hspace)
          left = hspace - node.offsetWidth;
      }
      node.style.top = top + "px";
      node.style.left = node.style.right = "";
      if (horiz == "right") {
        left = display.sizer.clientWidth - node.offsetWidth;
        node.style.right = "0px";
      } else {
        if (horiz == "left")
          left = 0;
        else if (horiz == "middle")
          left = (display.sizer.clientWidth - node.offsetWidth) / 2;
        node.style.left = left + "px";
      }
      if (scroll)
        scrollIntoView(this, left, top, left + node.offsetWidth, top + node.offsetHeight);
    },
    triggerOnKeyDown: methodOp(onKeyDown),
    triggerOnKeyPress: methodOp(onKeyPress),
    triggerOnKeyUp: onKeyUp,
    execCommand: function(cmd) {
      if (commands.hasOwnProperty(cmd))
        return commands[cmd].call(null, this);
    },
    triggerElectric: methodOp(function(text) {
      triggerElectric(this, text);
    }),
    findPosH: function(from, amount, unit, visually) {
      var dir = 1;
      if (amount < 0) {
        dir = -1;
        amount = -amount;
      }
      for (var i = 0,
          cur = clipPos(this.doc, from); i < amount; ++i) {
        cur = findPosH(this.doc, cur, dir, unit, visually);
        if (cur.hitSide)
          break;
      }
      return cur;
    },
    moveH: methodOp(function(dir, unit) {
      var cm = this;
      cm.extendSelectionsBy(function(range) {
        if (cm.display.shift || cm.doc.extend || range.empty())
          return findPosH(cm.doc, range.head, dir, unit, cm.options.rtlMoveVisually);
        else
          return dir < 0 ? range.from() : range.to();
      }, sel_move);
    }),
    deleteH: methodOp(function(dir, unit) {
      var sel = this.doc.sel,
          doc = this.doc;
      if (sel.somethingSelected())
        doc.replaceSelection("", null, "+delete");
      else
        deleteNearSelection(this, function(range) {
          var other = findPosH(doc, range.head, dir, unit, false);
          return dir < 0 ? {
            from: other,
            to: range.head
          } : {
            from: range.head,
            to: other
          };
        });
    }),
    findPosV: function(from, amount, unit, goalColumn) {
      var dir = 1,
          x = goalColumn;
      if (amount < 0) {
        dir = -1;
        amount = -amount;
      }
      for (var i = 0,
          cur = clipPos(this.doc, from); i < amount; ++i) {
        var coords = cursorCoords(this, cur, "div");
        if (x == null)
          x = coords.left;
        else
          coords.left = x;
        cur = findPosV(this, coords, dir, unit);
        if (cur.hitSide)
          break;
      }
      return cur;
    },
    moveV: methodOp(function(dir, unit) {
      var cm = this,
          doc = this.doc,
          goals = [];
      var collapse = !cm.display.shift && !doc.extend && doc.sel.somethingSelected();
      doc.extendSelectionsBy(function(range) {
        if (collapse)
          return dir < 0 ? range.from() : range.to();
        var headPos = cursorCoords(cm, range.head, "div");
        if (range.goalColumn != null)
          headPos.left = range.goalColumn;
        goals.push(headPos.left);
        var pos = findPosV(cm, headPos, dir, unit);
        if (unit == "page" && range == doc.sel.primary())
          addToScrollPos(cm, null, charCoords(cm, pos, "div").top - headPos.top);
        return pos;
      }, sel_move);
      if (goals.length)
        for (var i = 0; i < doc.sel.ranges.length; i++)
          doc.sel.ranges[i].goalColumn = goals[i];
    }),
    findWordAt: function(pos) {
      var doc = this.doc,
          line = getLine(doc, pos.line).text;
      var start = pos.ch,
          end = pos.ch;
      if (line) {
        var helper = this.getHelper(pos, "wordChars");
        if ((pos.xRel < 0 || end == line.length) && start)
          --start;
        else
          ++end;
        var startChar = line.charAt(start);
        var check = isWordChar(startChar, helper) ? function(ch) {
          return isWordChar(ch, helper);
        } : /\s/.test(startChar) ? function(ch) {
          return /\s/.test(ch);
        } : function(ch) {
          return !/\s/.test(ch) && !isWordChar(ch);
        };
        while (start > 0 && check(line.charAt(start - 1)))
          --start;
        while (end < line.length && check(line.charAt(end)))
          ++end;
      }
      return new Range(Pos(pos.line, start), Pos(pos.line, end));
    },
    toggleOverwrite: function(value) {
      if (value != null && value == this.state.overwrite)
        return;
      if (this.state.overwrite = !this.state.overwrite)
        addClass(this.display.cursorDiv, "CodeMirror-overwrite");
      else
        rmClass(this.display.cursorDiv, "CodeMirror-overwrite");
      signal(this, "overwriteToggle", this, this.state.overwrite);
    },
    hasFocus: function() {
      return this.display.input.getField() == activeElt();
    },
    scrollTo: methodOp(function(x, y) {
      if (x != null || y != null)
        resolveScrollToPos(this);
      if (x != null)
        this.curOp.scrollLeft = x;
      if (y != null)
        this.curOp.scrollTop = y;
    }),
    getScrollInfo: function() {
      var scroller = this.display.scroller;
      return {
        left: scroller.scrollLeft,
        top: scroller.scrollTop,
        height: scroller.scrollHeight - scrollGap(this) - this.display.barHeight,
        width: scroller.scrollWidth - scrollGap(this) - this.display.barWidth,
        clientHeight: displayHeight(this),
        clientWidth: displayWidth(this)
      };
    },
    scrollIntoView: methodOp(function(range, margin) {
      if (range == null) {
        range = {
          from: this.doc.sel.primary().head,
          to: null
        };
        if (margin == null)
          margin = this.options.cursorScrollMargin;
      } else if (typeof range == "number") {
        range = {
          from: Pos(range, 0),
          to: null
        };
      } else if (range.from == null) {
        range = {
          from: range,
          to: null
        };
      }
      if (!range.to)
        range.to = range.from;
      range.margin = margin || 0;
      if (range.from.line != null) {
        resolveScrollToPos(this);
        this.curOp.scrollToPos = range;
      } else {
        var sPos = calculateScrollPos(this, Math.min(range.from.left, range.to.left), Math.min(range.from.top, range.to.top) - range.margin, Math.max(range.from.right, range.to.right), Math.max(range.from.bottom, range.to.bottom) + range.margin);
        this.scrollTo(sPos.scrollLeft, sPos.scrollTop);
      }
    }),
    setSize: methodOp(function(width, height) {
      var cm = this;
      function interpret(val) {
        return typeof val == "number" || /^\d+$/.test(String(val)) ? val + "px" : val;
      }
      if (width != null)
        cm.display.wrapper.style.width = interpret(width);
      if (height != null)
        cm.display.wrapper.style.height = interpret(height);
      if (cm.options.lineWrapping)
        clearLineMeasurementCache(this);
      var lineNo = cm.display.viewFrom;
      cm.doc.iter(lineNo, cm.display.viewTo, function(line) {
        if (line.widgets)
          for (var i = 0; i < line.widgets.length; i++)
            if (line.widgets[i].noHScroll) {
              regLineChange(cm, lineNo, "widget");
              break;
            }
        ++lineNo;
      });
      cm.curOp.forceUpdate = true;
      signal(cm, "refresh", this);
    }),
    operation: function(f) {
      return runInOp(this, f);
    },
    refresh: methodOp(function() {
      var oldHeight = this.display.cachedTextHeight;
      regChange(this);
      this.curOp.forceUpdate = true;
      clearCaches(this);
      this.scrollTo(this.doc.scrollLeft, this.doc.scrollTop);
      updateGutterSpace(this);
      if (oldHeight == null || Math.abs(oldHeight - textHeight(this.display)) > .5)
        estimateLineHeights(this);
      signal(this, "refresh", this);
    }),
    swapDoc: methodOp(function(doc) {
      var old = this.doc;
      old.cm = null;
      attachDoc(this, doc);
      clearCaches(this);
      this.display.input.reset();
      this.scrollTo(doc.scrollLeft, doc.scrollTop);
      this.curOp.forceScroll = true;
      signalLater(this, "swapDoc", this, old);
      return old;
    }),
    getInputField: function() {
      return this.display.input.getField();
    },
    getWrapperElement: function() {
      return this.display.wrapper;
    },
    getScrollerElement: function() {
      return this.display.scroller;
    },
    getGutterElement: function() {
      return this.display.gutters;
    }
  };
  eventMixin(CodeMirror);
  var defaults = CodeMirror.defaults = {};
  var optionHandlers = CodeMirror.optionHandlers = {};
  function option(name, deflt, handle, notOnInit) {
    CodeMirror.defaults[name] = deflt;
    if (handle)
      optionHandlers[name] = notOnInit ? function(cm, val, old) {
        if (old != Init)
          handle(cm, val, old);
      } : handle;
  }
  var Init = CodeMirror.Init = {toString: function() {
      return "CodeMirror.Init";
    }};
  option("value", "", function(cm, val) {
    cm.setValue(val);
  }, true);
  option("mode", null, function(cm, val) {
    cm.doc.modeOption = val;
    loadMode(cm);
  }, true);
  option("indentUnit", 2, loadMode, true);
  option("indentWithTabs", false);
  option("smartIndent", true);
  option("tabSize", 4, function(cm) {
    resetModeState(cm);
    clearCaches(cm);
    regChange(cm);
  }, true);
  option("lineSeparator", null, function(cm, val) {
    cm.doc.lineSep = val;
    if (!val)
      return;
    var newBreaks = [],
        lineNo = cm.doc.first;
    cm.doc.iter(function(line) {
      for (var pos = 0; ; ) {
        var found = line.text.indexOf(val, pos);
        if (found == -1)
          break;
        pos = found + val.length;
        newBreaks.push(Pos(lineNo, found));
      }
      lineNo++;
    });
    for (var i = newBreaks.length - 1; i >= 0; i--)
      replaceRange(cm.doc, val, newBreaks[i], Pos(newBreaks[i].line, newBreaks[i].ch + val.length));
  });
  option("specialChars", /[\t\u0000-\u0019\u00ad\u200b-\u200f\u2028\u2029\ufeff]/g, function(cm, val, old) {
    cm.state.specialChars = new RegExp(val.source + (val.test("\t") ? "" : "|\t"), "g");
    if (old != CodeMirror.Init)
      cm.refresh();
  });
  option("specialCharPlaceholder", defaultSpecialCharPlaceholder, function(cm) {
    cm.refresh();
  }, true);
  option("electricChars", true);
  option("inputStyle", mobile ? "contenteditable" : "textarea", function() {
    throw new Error("inputStyle can not (yet) be changed in a running editor");
  }, true);
  option("rtlMoveVisually", !windows);
  option("wholeLineUpdateBefore", true);
  option("theme", "default", function(cm) {
    themeChanged(cm);
    guttersChanged(cm);
  }, true);
  option("keyMap", "default", function(cm, val, old) {
    var next = getKeyMap(val);
    var prev = old != CodeMirror.Init && getKeyMap(old);
    if (prev && prev.detach)
      prev.detach(cm, next);
    if (next.attach)
      next.attach(cm, prev || null);
  });
  option("extraKeys", null);
  option("lineWrapping", false, wrappingChanged, true);
  option("gutters", [], function(cm) {
    setGuttersForLineNumbers(cm.options);
    guttersChanged(cm);
  }, true);
  option("fixedGutter", true, function(cm, val) {
    cm.display.gutters.style.left = val ? compensateForHScroll(cm.display) + "px" : "0";
    cm.refresh();
  }, true);
  option("coverGutterNextToScrollbar", false, function(cm) {
    updateScrollbars(cm);
  }, true);
  option("scrollbarStyle", "native", function(cm) {
    initScrollbars(cm);
    updateScrollbars(cm);
    cm.display.scrollbars.setScrollTop(cm.doc.scrollTop);
    cm.display.scrollbars.setScrollLeft(cm.doc.scrollLeft);
  }, true);
  option("lineNumbers", false, function(cm) {
    setGuttersForLineNumbers(cm.options);
    guttersChanged(cm);
  }, true);
  option("firstLineNumber", 1, guttersChanged, true);
  option("lineNumberFormatter", function(integer) {
    return integer;
  }, guttersChanged, true);
  option("showCursorWhenSelecting", false, updateSelection, true);
  option("resetSelectionOnContextMenu", true);
  option("lineWiseCopyCut", true);
  option("readOnly", false, function(cm, val) {
    if (val == "nocursor") {
      onBlur(cm);
      cm.display.input.blur();
      cm.display.disabled = true;
    } else {
      cm.display.disabled = false;
    }
    cm.display.input.readOnlyChanged(val);
  });
  option("disableInput", false, function(cm, val) {
    if (!val)
      cm.display.input.reset();
  }, true);
  option("dragDrop", true, dragDropChanged);
  option("allowDropFileTypes", null);
  option("cursorBlinkRate", 530);
  option("cursorScrollMargin", 0);
  option("cursorHeight", 1, updateSelection, true);
  option("singleCursorHeightPerLine", true, updateSelection, true);
  option("workTime", 100);
  option("workDelay", 100);
  option("flattenSpans", true, resetModeState, true);
  option("addModeClass", false, resetModeState, true);
  option("pollInterval", 100);
  option("undoDepth", 200, function(cm, val) {
    cm.doc.history.undoDepth = val;
  });
  option("historyEventDelay", 1250);
  option("viewportMargin", 10, function(cm) {
    cm.refresh();
  }, true);
  option("maxHighlightLength", 10000, resetModeState, true);
  option("moveInputWithCursor", true, function(cm, val) {
    if (!val)
      cm.display.input.resetPosition();
  });
  option("tabindex", null, function(cm, val) {
    cm.display.input.getField().tabIndex = val || "";
  });
  option("autofocus", null);
  var modes = CodeMirror.modes = {},
      mimeModes = CodeMirror.mimeModes = {};
  CodeMirror.defineMode = function(name, mode) {
    if (!CodeMirror.defaults.mode && name != "null")
      CodeMirror.defaults.mode = name;
    if (arguments.length > 2)
      mode.dependencies = Array.prototype.slice.call(arguments, 2);
    modes[name] = mode;
  };
  CodeMirror.defineMIME = function(mime, spec) {
    mimeModes[mime] = spec;
  };
  CodeMirror.resolveMode = function(spec) {
    if (typeof spec == "string" && mimeModes.hasOwnProperty(spec)) {
      spec = mimeModes[spec];
    } else if (spec && typeof spec.name == "string" && mimeModes.hasOwnProperty(spec.name)) {
      var found = mimeModes[spec.name];
      if (typeof found == "string")
        found = {name: found};
      spec = createObj(found, spec);
      spec.name = found.name;
    } else if (typeof spec == "string" && /^[\w\-]+\/[\w\-]+\+xml$/.test(spec)) {
      return CodeMirror.resolveMode("application/xml");
    }
    if (typeof spec == "string")
      return {name: spec};
    else
      return spec || {name: "null"};
  };
  CodeMirror.getMode = function(options, spec) {
    var spec = CodeMirror.resolveMode(spec);
    var mfactory = modes[spec.name];
    if (!mfactory)
      return CodeMirror.getMode(options, "text/plain");
    var modeObj = mfactory(options, spec);
    if (modeExtensions.hasOwnProperty(spec.name)) {
      var exts = modeExtensions[spec.name];
      for (var prop in exts) {
        if (!exts.hasOwnProperty(prop))
          continue;
        if (modeObj.hasOwnProperty(prop))
          modeObj["_" + prop] = modeObj[prop];
        modeObj[prop] = exts[prop];
      }
    }
    modeObj.name = spec.name;
    if (spec.helperType)
      modeObj.helperType = spec.helperType;
    if (spec.modeProps)
      for (var prop in spec.modeProps)
        modeObj[prop] = spec.modeProps[prop];
    return modeObj;
  };
  CodeMirror.defineMode("null", function() {
    return {token: function(stream) {
        stream.skipToEnd();
      }};
  });
  CodeMirror.defineMIME("text/plain", "null");
  var modeExtensions = CodeMirror.modeExtensions = {};
  CodeMirror.extendMode = function(mode, properties) {
    var exts = modeExtensions.hasOwnProperty(mode) ? modeExtensions[mode] : (modeExtensions[mode] = {});
    copyObj(properties, exts);
  };
  CodeMirror.defineExtension = function(name, func) {
    CodeMirror.prototype[name] = func;
  };
  CodeMirror.defineDocExtension = function(name, func) {
    Doc.prototype[name] = func;
  };
  CodeMirror.defineOption = option;
  var initHooks = [];
  CodeMirror.defineInitHook = function(f) {
    initHooks.push(f);
  };
  var helpers = CodeMirror.helpers = {};
  CodeMirror.registerHelper = function(type, name, value) {
    if (!helpers.hasOwnProperty(type))
      helpers[type] = CodeMirror[type] = {_global: []};
    helpers[type][name] = value;
  };
  CodeMirror.registerGlobalHelper = function(type, name, predicate, value) {
    CodeMirror.registerHelper(type, name, value);
    helpers[type]._global.push({
      pred: predicate,
      val: value
    });
  };
  var copyState = CodeMirror.copyState = function(mode, state) {
    if (state === true)
      return state;
    if (mode.copyState)
      return mode.copyState(state);
    var nstate = {};
    for (var n in state) {
      var val = state[n];
      if (val instanceof Array)
        val = val.concat([]);
      nstate[n] = val;
    }
    return nstate;
  };
  var startState = CodeMirror.startState = function(mode, a1, a2) {
    return mode.startState ? mode.startState(a1, a2) : true;
  };
  CodeMirror.innerMode = function(mode, state) {
    while (mode.innerMode) {
      var info = mode.innerMode(state);
      if (!info || info.mode == mode)
        break;
      state = info.state;
      mode = info.mode;
    }
    return info || {
      mode: mode,
      state: state
    };
  };
  var commands = CodeMirror.commands = {
    selectAll: function(cm) {
      cm.setSelection(Pos(cm.firstLine(), 0), Pos(cm.lastLine()), sel_dontScroll);
    },
    singleSelection: function(cm) {
      cm.setSelection(cm.getCursor("anchor"), cm.getCursor("head"), sel_dontScroll);
    },
    killLine: function(cm) {
      deleteNearSelection(cm, function(range) {
        if (range.empty()) {
          var len = getLine(cm.doc, range.head.line).text.length;
          if (range.head.ch == len && range.head.line < cm.lastLine())
            return {
              from: range.head,
              to: Pos(range.head.line + 1, 0)
            };
          else
            return {
              from: range.head,
              to: Pos(range.head.line, len)
            };
        } else {
          return {
            from: range.from(),
            to: range.to()
          };
        }
      });
    },
    deleteLine: function(cm) {
      deleteNearSelection(cm, function(range) {
        return {
          from: Pos(range.from().line, 0),
          to: clipPos(cm.doc, Pos(range.to().line + 1, 0))
        };
      });
    },
    delLineLeft: function(cm) {
      deleteNearSelection(cm, function(range) {
        return {
          from: Pos(range.from().line, 0),
          to: range.from()
        };
      });
    },
    delWrappedLineLeft: function(cm) {
      deleteNearSelection(cm, function(range) {
        var top = cm.charCoords(range.head, "div").top + 5;
        var leftPos = cm.coordsChar({
          left: 0,
          top: top
        }, "div");
        return {
          from: leftPos,
          to: range.from()
        };
      });
    },
    delWrappedLineRight: function(cm) {
      deleteNearSelection(cm, function(range) {
        var top = cm.charCoords(range.head, "div").top + 5;
        var rightPos = cm.coordsChar({
          left: cm.display.lineDiv.offsetWidth + 100,
          top: top
        }, "div");
        return {
          from: range.from(),
          to: rightPos
        };
      });
    },
    undo: function(cm) {
      cm.undo();
    },
    redo: function(cm) {
      cm.redo();
    },
    undoSelection: function(cm) {
      cm.undoSelection();
    },
    redoSelection: function(cm) {
      cm.redoSelection();
    },
    goDocStart: function(cm) {
      cm.extendSelection(Pos(cm.firstLine(), 0));
    },
    goDocEnd: function(cm) {
      cm.extendSelection(Pos(cm.lastLine()));
    },
    goLineStart: function(cm) {
      cm.extendSelectionsBy(function(range) {
        return lineStart(cm, range.head.line);
      }, {
        origin: "+move",
        bias: 1
      });
    },
    goLineStartSmart: function(cm) {
      cm.extendSelectionsBy(function(range) {
        return lineStartSmart(cm, range.head);
      }, {
        origin: "+move",
        bias: 1
      });
    },
    goLineEnd: function(cm) {
      cm.extendSelectionsBy(function(range) {
        return lineEnd(cm, range.head.line);
      }, {
        origin: "+move",
        bias: -1
      });
    },
    goLineRight: function(cm) {
      cm.extendSelectionsBy(function(range) {
        var top = cm.charCoords(range.head, "div").top + 5;
        return cm.coordsChar({
          left: cm.display.lineDiv.offsetWidth + 100,
          top: top
        }, "div");
      }, sel_move);
    },
    goLineLeft: function(cm) {
      cm.extendSelectionsBy(function(range) {
        var top = cm.charCoords(range.head, "div").top + 5;
        return cm.coordsChar({
          left: 0,
          top: top
        }, "div");
      }, sel_move);
    },
    goLineLeftSmart: function(cm) {
      cm.extendSelectionsBy(function(range) {
        var top = cm.charCoords(range.head, "div").top + 5;
        var pos = cm.coordsChar({
          left: 0,
          top: top
        }, "div");
        if (pos.ch < cm.getLine(pos.line).search(/\S/))
          return lineStartSmart(cm, range.head);
        return pos;
      }, sel_move);
    },
    goLineUp: function(cm) {
      cm.moveV(-1, "line");
    },
    goLineDown: function(cm) {
      cm.moveV(1, "line");
    },
    goPageUp: function(cm) {
      cm.moveV(-1, "page");
    },
    goPageDown: function(cm) {
      cm.moveV(1, "page");
    },
    goCharLeft: function(cm) {
      cm.moveH(-1, "char");
    },
    goCharRight: function(cm) {
      cm.moveH(1, "char");
    },
    goColumnLeft: function(cm) {
      cm.moveH(-1, "column");
    },
    goColumnRight: function(cm) {
      cm.moveH(1, "column");
    },
    goWordLeft: function(cm) {
      cm.moveH(-1, "word");
    },
    goGroupRight: function(cm) {
      cm.moveH(1, "group");
    },
    goGroupLeft: function(cm) {
      cm.moveH(-1, "group");
    },
    goWordRight: function(cm) {
      cm.moveH(1, "word");
    },
    delCharBefore: function(cm) {
      cm.deleteH(-1, "char");
    },
    delCharAfter: function(cm) {
      cm.deleteH(1, "char");
    },
    delWordBefore: function(cm) {
      cm.deleteH(-1, "word");
    },
    delWordAfter: function(cm) {
      cm.deleteH(1, "word");
    },
    delGroupBefore: function(cm) {
      cm.deleteH(-1, "group");
    },
    delGroupAfter: function(cm) {
      cm.deleteH(1, "group");
    },
    indentAuto: function(cm) {
      cm.indentSelection("smart");
    },
    indentMore: function(cm) {
      cm.indentSelection("add");
    },
    indentLess: function(cm) {
      cm.indentSelection("subtract");
    },
    insertTab: function(cm) {
      cm.replaceSelection("\t");
    },
    insertSoftTab: function(cm) {
      var spaces = [],
          ranges = cm.listSelections(),
          tabSize = cm.options.tabSize;
      for (var i = 0; i < ranges.length; i++) {
        var pos = ranges[i].from();
        var col = countColumn(cm.getLine(pos.line), pos.ch, tabSize);
        spaces.push(new Array(tabSize - col % tabSize + 1).join(" "));
      }
      cm.replaceSelections(spaces);
    },
    defaultTab: function(cm) {
      if (cm.somethingSelected())
        cm.indentSelection("add");
      else
        cm.execCommand("insertTab");
    },
    transposeChars: function(cm) {
      runInOp(cm, function() {
        var ranges = cm.listSelections(),
            newSel = [];
        for (var i = 0; i < ranges.length; i++) {
          var cur = ranges[i].head,
              line = getLine(cm.doc, cur.line).text;
          if (line) {
            if (cur.ch == line.length)
              cur = new Pos(cur.line, cur.ch - 1);
            if (cur.ch > 0) {
              cur = new Pos(cur.line, cur.ch + 1);
              cm.replaceRange(line.charAt(cur.ch - 1) + line.charAt(cur.ch - 2), Pos(cur.line, cur.ch - 2), cur, "+transpose");
            } else if (cur.line > cm.doc.first) {
              var prev = getLine(cm.doc, cur.line - 1).text;
              if (prev)
                cm.replaceRange(line.charAt(0) + cm.doc.lineSeparator() + prev.charAt(prev.length - 1), Pos(cur.line - 1, prev.length - 1), Pos(cur.line, 1), "+transpose");
            }
          }
          newSel.push(new Range(cur, cur));
        }
        cm.setSelections(newSel);
      });
    },
    newlineAndIndent: function(cm) {
      runInOp(cm, function() {
        var len = cm.listSelections().length;
        for (var i = 0; i < len; i++) {
          var range = cm.listSelections()[i];
          cm.replaceRange(cm.doc.lineSeparator(), range.anchor, range.head, "+input");
          cm.indentLine(range.from().line + 1, null, true);
        }
        ensureCursorVisible(cm);
      });
    },
    toggleOverwrite: function(cm) {
      cm.toggleOverwrite();
    }
  };
  var keyMap = CodeMirror.keyMap = {};
  keyMap.basic = {
    "Left": "goCharLeft",
    "Right": "goCharRight",
    "Up": "goLineUp",
    "Down": "goLineDown",
    "End": "goLineEnd",
    "Home": "goLineStartSmart",
    "PageUp": "goPageUp",
    "PageDown": "goPageDown",
    "Delete": "delCharAfter",
    "Backspace": "delCharBefore",
    "Shift-Backspace": "delCharBefore",
    "Tab": "defaultTab",
    "Shift-Tab": "indentAuto",
    "Enter": "newlineAndIndent",
    "Insert": "toggleOverwrite",
    "Esc": "singleSelection"
  };
  keyMap.pcDefault = {
    "Ctrl-A": "selectAll",
    "Ctrl-D": "deleteLine",
    "Ctrl-Z": "undo",
    "Shift-Ctrl-Z": "redo",
    "Ctrl-Y": "redo",
    "Ctrl-Home": "goDocStart",
    "Ctrl-End": "goDocEnd",
    "Ctrl-Up": "goLineUp",
    "Ctrl-Down": "goLineDown",
    "Ctrl-Left": "goGroupLeft",
    "Ctrl-Right": "goGroupRight",
    "Alt-Left": "goLineStart",
    "Alt-Right": "goLineEnd",
    "Ctrl-Backspace": "delGroupBefore",
    "Ctrl-Delete": "delGroupAfter",
    "Ctrl-S": "save",
    "Ctrl-F": "find",
    "Ctrl-G": "findNext",
    "Shift-Ctrl-G": "findPrev",
    "Shift-Ctrl-F": "replace",
    "Shift-Ctrl-R": "replaceAll",
    "Ctrl-[": "indentLess",
    "Ctrl-]": "indentMore",
    "Ctrl-U": "undoSelection",
    "Shift-Ctrl-U": "redoSelection",
    "Alt-U": "redoSelection",
    fallthrough: "basic"
  };
  keyMap.emacsy = {
    "Ctrl-F": "goCharRight",
    "Ctrl-B": "goCharLeft",
    "Ctrl-P": "goLineUp",
    "Ctrl-N": "goLineDown",
    "Alt-F": "goWordRight",
    "Alt-B": "goWordLeft",
    "Ctrl-A": "goLineStart",
    "Ctrl-E": "goLineEnd",
    "Ctrl-V": "goPageDown",
    "Shift-Ctrl-V": "goPageUp",
    "Ctrl-D": "delCharAfter",
    "Ctrl-H": "delCharBefore",
    "Alt-D": "delWordAfter",
    "Alt-Backspace": "delWordBefore",
    "Ctrl-K": "killLine",
    "Ctrl-T": "transposeChars"
  };
  keyMap.macDefault = {
    "Cmd-A": "selectAll",
    "Cmd-D": "deleteLine",
    "Cmd-Z": "undo",
    "Shift-Cmd-Z": "redo",
    "Cmd-Y": "redo",
    "Cmd-Home": "goDocStart",
    "Cmd-Up": "goDocStart",
    "Cmd-End": "goDocEnd",
    "Cmd-Down": "goDocEnd",
    "Alt-Left": "goGroupLeft",
    "Alt-Right": "goGroupRight",
    "Cmd-Left": "goLineLeft",
    "Cmd-Right": "goLineRight",
    "Alt-Backspace": "delGroupBefore",
    "Ctrl-Alt-Backspace": "delGroupAfter",
    "Alt-Delete": "delGroupAfter",
    "Cmd-S": "save",
    "Cmd-F": "find",
    "Cmd-G": "findNext",
    "Shift-Cmd-G": "findPrev",
    "Cmd-Alt-F": "replace",
    "Shift-Cmd-Alt-F": "replaceAll",
    "Cmd-[": "indentLess",
    "Cmd-]": "indentMore",
    "Cmd-Backspace": "delWrappedLineLeft",
    "Cmd-Delete": "delWrappedLineRight",
    "Cmd-U": "undoSelection",
    "Shift-Cmd-U": "redoSelection",
    "Ctrl-Up": "goDocStart",
    "Ctrl-Down": "goDocEnd",
    fallthrough: ["basic", "emacsy"]
  };
  keyMap["default"] = mac ? keyMap.macDefault : keyMap.pcDefault;
  function normalizeKeyName(name) {
    var parts = name.split(/-(?!$)/),
        name = parts[parts.length - 1];
    var alt,
        ctrl,
        shift,
        cmd;
    for (var i = 0; i < parts.length - 1; i++) {
      var mod = parts[i];
      if (/^(cmd|meta|m)$/i.test(mod))
        cmd = true;
      else if (/^a(lt)?$/i.test(mod))
        alt = true;
      else if (/^(c|ctrl|control)$/i.test(mod))
        ctrl = true;
      else if (/^s(hift)$/i.test(mod))
        shift = true;
      else
        throw new Error("Unrecognized modifier name: " + mod);
    }
    if (alt)
      name = "Alt-" + name;
    if (ctrl)
      name = "Ctrl-" + name;
    if (cmd)
      name = "Cmd-" + name;
    if (shift)
      name = "Shift-" + name;
    return name;
  }
  CodeMirror.normalizeKeyMap = function(keymap) {
    var copy = {};
    for (var keyname in keymap)
      if (keymap.hasOwnProperty(keyname)) {
        var value = keymap[keyname];
        if (/^(name|fallthrough|(de|at)tach)$/.test(keyname))
          continue;
        if (value == "...") {
          delete keymap[keyname];
          continue;
        }
        var keys = map(keyname.split(" "), normalizeKeyName);
        for (var i = 0; i < keys.length; i++) {
          var val,
              name;
          if (i == keys.length - 1) {
            name = keys.join(" ");
            val = value;
          } else {
            name = keys.slice(0, i + 1).join(" ");
            val = "...";
          }
          var prev = copy[name];
          if (!prev)
            copy[name] = val;
          else if (prev != val)
            throw new Error("Inconsistent bindings for " + name);
        }
        delete keymap[keyname];
      }
    for (var prop in copy)
      keymap[prop] = copy[prop];
    return keymap;
  };
  var lookupKey = CodeMirror.lookupKey = function(key, map, handle, context) {
    map = getKeyMap(map);
    var found = map.call ? map.call(key, context) : map[key];
    if (found === false)
      return "nothing";
    if (found === "...")
      return "multi";
    if (found != null && handle(found))
      return "handled";
    if (map.fallthrough) {
      if (Object.prototype.toString.call(map.fallthrough) != "[object Array]")
        return lookupKey(key, map.fallthrough, handle, context);
      for (var i = 0; i < map.fallthrough.length; i++) {
        var result = lookupKey(key, map.fallthrough[i], handle, context);
        if (result)
          return result;
      }
    }
  };
  var isModifierKey = CodeMirror.isModifierKey = function(value) {
    var name = typeof value == "string" ? value : keyNames[value.keyCode];
    return name == "Ctrl" || name == "Alt" || name == "Shift" || name == "Mod";
  };
  var keyName = CodeMirror.keyName = function(event, noShift) {
    if (presto && event.keyCode == 34 && event["char"])
      return false;
    var base = keyNames[event.keyCode],
        name = base;
    if (name == null || event.altGraphKey)
      return false;
    if (event.altKey && base != "Alt")
      name = "Alt-" + name;
    if ((flipCtrlCmd ? event.metaKey : event.ctrlKey) && base != "Ctrl")
      name = "Ctrl-" + name;
    if ((flipCtrlCmd ? event.ctrlKey : event.metaKey) && base != "Cmd")
      name = "Cmd-" + name;
    if (!noShift && event.shiftKey && base != "Shift")
      name = "Shift-" + name;
    return name;
  };
  function getKeyMap(val) {
    return typeof val == "string" ? keyMap[val] : val;
  }
  CodeMirror.fromTextArea = function(textarea, options) {
    options = options ? copyObj(options) : {};
    options.value = textarea.value;
    if (!options.tabindex && textarea.tabIndex)
      options.tabindex = textarea.tabIndex;
    if (!options.placeholder && textarea.placeholder)
      options.placeholder = textarea.placeholder;
    if (options.autofocus == null) {
      var hasFocus = activeElt();
      options.autofocus = hasFocus == textarea || textarea.getAttribute("autofocus") != null && hasFocus == document.body;
    }
    function save() {
      textarea.value = cm.getValue();
    }
    if (textarea.form) {
      on(textarea.form, "submit", save);
      if (!options.leaveSubmitMethodAlone) {
        var form = textarea.form,
            realSubmit = form.submit;
        try {
          var wrappedSubmit = form.submit = function() {
            save();
            form.submit = realSubmit;
            form.submit();
            form.submit = wrappedSubmit;
          };
        } catch (e) {}
      }
    }
    options.finishInit = function(cm) {
      cm.save = save;
      cm.getTextArea = function() {
        return textarea;
      };
      cm.toTextArea = function() {
        cm.toTextArea = isNaN;
        save();
        textarea.parentNode.removeChild(cm.getWrapperElement());
        textarea.style.display = "";
        if (textarea.form) {
          off(textarea.form, "submit", save);
          if (typeof textarea.form.submit == "function")
            textarea.form.submit = realSubmit;
        }
      };
    };
    textarea.style.display = "none";
    var cm = CodeMirror(function(node) {
      textarea.parentNode.insertBefore(node, textarea.nextSibling);
    }, options);
    return cm;
  };
  var StringStream = CodeMirror.StringStream = function(string, tabSize) {
    this.pos = this.start = 0;
    this.string = string;
    this.tabSize = tabSize || 8;
    this.lastColumnPos = this.lastColumnValue = 0;
    this.lineStart = 0;
  };
  StringStream.prototype = {
    eol: function() {
      return this.pos >= this.string.length;
    },
    sol: function() {
      return this.pos == this.lineStart;
    },
    peek: function() {
      return this.string.charAt(this.pos) || undefined;
    },
    next: function() {
      if (this.pos < this.string.length)
        return this.string.charAt(this.pos++);
    },
    eat: function(match) {
      var ch = this.string.charAt(this.pos);
      if (typeof match == "string")
        var ok = ch == match;
      else
        var ok = ch && (match.test ? match.test(ch) : match(ch));
      if (ok) {
        ++this.pos;
        return ch;
      }
    },
    eatWhile: function(match) {
      var start = this.pos;
      while (this.eat(match)) {}
      return this.pos > start;
    },
    eatSpace: function() {
      var start = this.pos;
      while (/[\s\u00a0]/.test(this.string.charAt(this.pos)))
        ++this.pos;
      return this.pos > start;
    },
    skipToEnd: function() {
      this.pos = this.string.length;
    },
    skipTo: function(ch) {
      var found = this.string.indexOf(ch, this.pos);
      if (found > -1) {
        this.pos = found;
        return true;
      }
    },
    backUp: function(n) {
      this.pos -= n;
    },
    column: function() {
      if (this.lastColumnPos < this.start) {
        this.lastColumnValue = countColumn(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue);
        this.lastColumnPos = this.start;
      }
      return this.lastColumnValue - (this.lineStart ? countColumn(this.string, this.lineStart, this.tabSize) : 0);
    },
    indentation: function() {
      return countColumn(this.string, null, this.tabSize) - (this.lineStart ? countColumn(this.string, this.lineStart, this.tabSize) : 0);
    },
    match: function(pattern, consume, caseInsensitive) {
      if (typeof pattern == "string") {
        var cased = function(str) {
          return caseInsensitive ? str.toLowerCase() : str;
        };
        var substr = this.string.substr(this.pos, pattern.length);
        if (cased(substr) == cased(pattern)) {
          if (consume !== false)
            this.pos += pattern.length;
          return true;
        }
      } else {
        var match = this.string.slice(this.pos).match(pattern);
        if (match && match.index > 0)
          return null;
        if (match && consume !== false)
          this.pos += match[0].length;
        return match;
      }
    },
    current: function() {
      return this.string.slice(this.start, this.pos);
    },
    hideFirstChars: function(n, inner) {
      this.lineStart += n;
      try {
        return inner();
      } finally {
        this.lineStart -= n;
      }
    }
  };
  var nextMarkerId = 0;
  var TextMarker = CodeMirror.TextMarker = function(doc, type) {
    this.lines = [];
    this.type = type;
    this.doc = doc;
    this.id = ++nextMarkerId;
  };
  eventMixin(TextMarker);
  TextMarker.prototype.clear = function() {
    if (this.explicitlyCleared)
      return;
    var cm = this.doc.cm,
        withOp = cm && !cm.curOp;
    if (withOp)
      startOperation(cm);
    if (hasHandler(this, "clear")) {
      var found = this.find();
      if (found)
        signalLater(this, "clear", found.from, found.to);
    }
    var min = null,
        max = null;
    for (var i = 0; i < this.lines.length; ++i) {
      var line = this.lines[i];
      var span = getMarkedSpanFor(line.markedSpans, this);
      if (cm && !this.collapsed)
        regLineChange(cm, lineNo(line), "text");
      else if (cm) {
        if (span.to != null)
          max = lineNo(line);
        if (span.from != null)
          min = lineNo(line);
      }
      line.markedSpans = removeMarkedSpan(line.markedSpans, span);
      if (span.from == null && this.collapsed && !lineIsHidden(this.doc, line) && cm)
        updateLineHeight(line, textHeight(cm.display));
    }
    if (cm && this.collapsed && !cm.options.lineWrapping)
      for (var i = 0; i < this.lines.length; ++i) {
        var visual = visualLine(this.lines[i]),
            len = lineLength(visual);
        if (len > cm.display.maxLineLength) {
          cm.display.maxLine = visual;
          cm.display.maxLineLength = len;
          cm.display.maxLineChanged = true;
        }
      }
    if (min != null && cm && this.collapsed)
      regChange(cm, min, max + 1);
    this.lines.length = 0;
    this.explicitlyCleared = true;
    if (this.atomic && this.doc.cantEdit) {
      this.doc.cantEdit = false;
      if (cm)
        reCheckSelection(cm.doc);
    }
    if (cm)
      signalLater(cm, "markerCleared", cm, this);
    if (withOp)
      endOperation(cm);
    if (this.parent)
      this.parent.clear();
  };
  TextMarker.prototype.find = function(side, lineObj) {
    if (side == null && this.type == "bookmark")
      side = 1;
    var from,
        to;
    for (var i = 0; i < this.lines.length; ++i) {
      var line = this.lines[i];
      var span = getMarkedSpanFor(line.markedSpans, this);
      if (span.from != null) {
        from = Pos(lineObj ? line : lineNo(line), span.from);
        if (side == -1)
          return from;
      }
      if (span.to != null) {
        to = Pos(lineObj ? line : lineNo(line), span.to);
        if (side == 1)
          return to;
      }
    }
    return from && {
      from: from,
      to: to
    };
  };
  TextMarker.prototype.changed = function() {
    var pos = this.find(-1, true),
        widget = this,
        cm = this.doc.cm;
    if (!pos || !cm)
      return;
    runInOp(cm, function() {
      var line = pos.line,
          lineN = lineNo(pos.line);
      var view = findViewForLine(cm, lineN);
      if (view) {
        clearLineMeasurementCacheFor(view);
        cm.curOp.selectionChanged = cm.curOp.forceUpdate = true;
      }
      cm.curOp.updateMaxLine = true;
      if (!lineIsHidden(widget.doc, line) && widget.height != null) {
        var oldHeight = widget.height;
        widget.height = null;
        var dHeight = widgetHeight(widget) - oldHeight;
        if (dHeight)
          updateLineHeight(line, line.height + dHeight);
      }
    });
  };
  TextMarker.prototype.attachLine = function(line) {
    if (!this.lines.length && this.doc.cm) {
      var op = this.doc.cm.curOp;
      if (!op.maybeHiddenMarkers || indexOf(op.maybeHiddenMarkers, this) == -1)
        (op.maybeUnhiddenMarkers || (op.maybeUnhiddenMarkers = [])).push(this);
    }
    this.lines.push(line);
  };
  TextMarker.prototype.detachLine = function(line) {
    this.lines.splice(indexOf(this.lines, line), 1);
    if (!this.lines.length && this.doc.cm) {
      var op = this.doc.cm.curOp;
      (op.maybeHiddenMarkers || (op.maybeHiddenMarkers = [])).push(this);
    }
  };
  var nextMarkerId = 0;
  function markText(doc, from, to, options, type) {
    if (options && options.shared)
      return markTextShared(doc, from, to, options, type);
    if (doc.cm && !doc.cm.curOp)
      return operation(doc.cm, markText)(doc, from, to, options, type);
    var marker = new TextMarker(doc, type),
        diff = cmp(from, to);
    if (options)
      copyObj(options, marker, false);
    if (diff > 0 || diff == 0 && marker.clearWhenEmpty !== false)
      return marker;
    if (marker.replacedWith) {
      marker.collapsed = true;
      marker.widgetNode = elt("span", [marker.replacedWith], "CodeMirror-widget");
      if (!options.handleMouseEvents)
        marker.widgetNode.setAttribute("cm-ignore-events", "true");
      if (options.insertLeft)
        marker.widgetNode.insertLeft = true;
    }
    if (marker.collapsed) {
      if (conflictingCollapsedRange(doc, from.line, from, to, marker) || from.line != to.line && conflictingCollapsedRange(doc, to.line, from, to, marker))
        throw new Error("Inserting collapsed marker partially overlapping an existing one");
      sawCollapsedSpans = true;
    }
    if (marker.addToHistory)
      addChangeToHistory(doc, {
        from: from,
        to: to,
        origin: "markText"
      }, doc.sel, NaN);
    var curLine = from.line,
        cm = doc.cm,
        updateMaxLine;
    doc.iter(curLine, to.line + 1, function(line) {
      if (cm && marker.collapsed && !cm.options.lineWrapping && visualLine(line) == cm.display.maxLine)
        updateMaxLine = true;
      if (marker.collapsed && curLine != from.line)
        updateLineHeight(line, 0);
      addMarkedSpan(line, new MarkedSpan(marker, curLine == from.line ? from.ch : null, curLine == to.line ? to.ch : null));
      ++curLine;
    });
    if (marker.collapsed)
      doc.iter(from.line, to.line + 1, function(line) {
        if (lineIsHidden(doc, line))
          updateLineHeight(line, 0);
      });
    if (marker.clearOnEnter)
      on(marker, "beforeCursorEnter", function() {
        marker.clear();
      });
    if (marker.readOnly) {
      sawReadOnlySpans = true;
      if (doc.history.done.length || doc.history.undone.length)
        doc.clearHistory();
    }
    if (marker.collapsed) {
      marker.id = ++nextMarkerId;
      marker.atomic = true;
    }
    if (cm) {
      if (updateMaxLine)
        cm.curOp.updateMaxLine = true;
      if (marker.collapsed)
        regChange(cm, from.line, to.line + 1);
      else if (marker.className || marker.title || marker.startStyle || marker.endStyle || marker.css)
        for (var i = from.line; i <= to.line; i++)
          regLineChange(cm, i, "text");
      if (marker.atomic)
        reCheckSelection(cm.doc);
      signalLater(cm, "markerAdded", cm, marker);
    }
    return marker;
  }
  var SharedTextMarker = CodeMirror.SharedTextMarker = function(markers, primary) {
    this.markers = markers;
    this.primary = primary;
    for (var i = 0; i < markers.length; ++i)
      markers[i].parent = this;
  };
  eventMixin(SharedTextMarker);
  SharedTextMarker.prototype.clear = function() {
    if (this.explicitlyCleared)
      return;
    this.explicitlyCleared = true;
    for (var i = 0; i < this.markers.length; ++i)
      this.markers[i].clear();
    signalLater(this, "clear");
  };
  SharedTextMarker.prototype.find = function(side, lineObj) {
    return this.primary.find(side, lineObj);
  };
  function markTextShared(doc, from, to, options, type) {
    options = copyObj(options);
    options.shared = false;
    var markers = [markText(doc, from, to, options, type)],
        primary = markers[0];
    var widget = options.widgetNode;
    linkedDocs(doc, function(doc) {
      if (widget)
        options.widgetNode = widget.cloneNode(true);
      markers.push(markText(doc, clipPos(doc, from), clipPos(doc, to), options, type));
      for (var i = 0; i < doc.linked.length; ++i)
        if (doc.linked[i].isParent)
          return;
      primary = lst(markers);
    });
    return new SharedTextMarker(markers, primary);
  }
  function findSharedMarkers(doc) {
    return doc.findMarks(Pos(doc.first, 0), doc.clipPos(Pos(doc.lastLine())), function(m) {
      return m.parent;
    });
  }
  function copySharedMarkers(doc, markers) {
    for (var i = 0; i < markers.length; i++) {
      var marker = markers[i],
          pos = marker.find();
      var mFrom = doc.clipPos(pos.from),
          mTo = doc.clipPos(pos.to);
      if (cmp(mFrom, mTo)) {
        var subMark = markText(doc, mFrom, mTo, marker.primary, marker.primary.type);
        marker.markers.push(subMark);
        subMark.parent = marker;
      }
    }
  }
  function detachSharedMarkers(markers) {
    for (var i = 0; i < markers.length; i++) {
      var marker = markers[i],
          linked = [marker.primary.doc];
      ;
      linkedDocs(marker.primary.doc, function(d) {
        linked.push(d);
      });
      for (var j = 0; j < marker.markers.length; j++) {
        var subMarker = marker.markers[j];
        if (indexOf(linked, subMarker.doc) == -1) {
          subMarker.parent = null;
          marker.markers.splice(j--, 1);
        }
      }
    }
  }
  function MarkedSpan(marker, from, to) {
    this.marker = marker;
    this.from = from;
    this.to = to;
  }
  function getMarkedSpanFor(spans, marker) {
    if (spans)
      for (var i = 0; i < spans.length; ++i) {
        var span = spans[i];
        if (span.marker == marker)
          return span;
      }
  }
  function removeMarkedSpan(spans, span) {
    for (var r,
        i = 0; i < spans.length; ++i)
      if (spans[i] != span)
        (r || (r = [])).push(spans[i]);
    return r;
  }
  function addMarkedSpan(line, span) {
    line.markedSpans = line.markedSpans ? line.markedSpans.concat([span]) : [span];
    span.marker.attachLine(line);
  }
  function markedSpansBefore(old, startCh, isInsert) {
    if (old)
      for (var i = 0,
          nw; i < old.length; ++i) {
        var span = old[i],
            marker = span.marker;
        var startsBefore = span.from == null || (marker.inclusiveLeft ? span.from <= startCh : span.from < startCh);
        if (startsBefore || span.from == startCh && marker.type == "bookmark" && (!isInsert || !span.marker.insertLeft)) {
          var endsAfter = span.to == null || (marker.inclusiveRight ? span.to >= startCh : span.to > startCh);
          (nw || (nw = [])).push(new MarkedSpan(marker, span.from, endsAfter ? null : span.to));
        }
      }
    return nw;
  }
  function markedSpansAfter(old, endCh, isInsert) {
    if (old)
      for (var i = 0,
          nw; i < old.length; ++i) {
        var span = old[i],
            marker = span.marker;
        var endsAfter = span.to == null || (marker.inclusiveRight ? span.to >= endCh : span.to > endCh);
        if (endsAfter || span.from == endCh && marker.type == "bookmark" && (!isInsert || span.marker.insertLeft)) {
          var startsBefore = span.from == null || (marker.inclusiveLeft ? span.from <= endCh : span.from < endCh);
          (nw || (nw = [])).push(new MarkedSpan(marker, startsBefore ? null : span.from - endCh, span.to == null ? null : span.to - endCh));
        }
      }
    return nw;
  }
  function stretchSpansOverChange(doc, change) {
    if (change.full)
      return null;
    var oldFirst = isLine(doc, change.from.line) && getLine(doc, change.from.line).markedSpans;
    var oldLast = isLine(doc, change.to.line) && getLine(doc, change.to.line).markedSpans;
    if (!oldFirst && !oldLast)
      return null;
    var startCh = change.from.ch,
        endCh = change.to.ch,
        isInsert = cmp(change.from, change.to) == 0;
    var first = markedSpansBefore(oldFirst, startCh, isInsert);
    var last = markedSpansAfter(oldLast, endCh, isInsert);
    var sameLine = change.text.length == 1,
        offset = lst(change.text).length + (sameLine ? startCh : 0);
    if (first) {
      for (var i = 0; i < first.length; ++i) {
        var span = first[i];
        if (span.to == null) {
          var found = getMarkedSpanFor(last, span.marker);
          if (!found)
            span.to = startCh;
          else if (sameLine)
            span.to = found.to == null ? null : found.to + offset;
        }
      }
    }
    if (last) {
      for (var i = 0; i < last.length; ++i) {
        var span = last[i];
        if (span.to != null)
          span.to += offset;
        if (span.from == null) {
          var found = getMarkedSpanFor(first, span.marker);
          if (!found) {
            span.from = offset;
            if (sameLine)
              (first || (first = [])).push(span);
          }
        } else {
          span.from += offset;
          if (sameLine)
            (first || (first = [])).push(span);
        }
      }
    }
    if (first)
      first = clearEmptySpans(first);
    if (last && last != first)
      last = clearEmptySpans(last);
    var newMarkers = [first];
    if (!sameLine) {
      var gap = change.text.length - 2,
          gapMarkers;
      if (gap > 0 && first)
        for (var i = 0; i < first.length; ++i)
          if (first[i].to == null)
            (gapMarkers || (gapMarkers = [])).push(new MarkedSpan(first[i].marker, null, null));
      for (var i = 0; i < gap; ++i)
        newMarkers.push(gapMarkers);
      newMarkers.push(last);
    }
    return newMarkers;
  }
  function clearEmptySpans(spans) {
    for (var i = 0; i < spans.length; ++i) {
      var span = spans[i];
      if (span.from != null && span.from == span.to && span.marker.clearWhenEmpty !== false)
        spans.splice(i--, 1);
    }
    if (!spans.length)
      return null;
    return spans;
  }
  function mergeOldSpans(doc, change) {
    var old = getOldSpans(doc, change);
    var stretched = stretchSpansOverChange(doc, change);
    if (!old)
      return stretched;
    if (!stretched)
      return old;
    for (var i = 0; i < old.length; ++i) {
      var oldCur = old[i],
          stretchCur = stretched[i];
      if (oldCur && stretchCur) {
        spans: for (var j = 0; j < stretchCur.length; ++j) {
          var span = stretchCur[j];
          for (var k = 0; k < oldCur.length; ++k)
            if (oldCur[k].marker == span.marker)
              continue spans;
          oldCur.push(span);
        }
      } else if (stretchCur) {
        old[i] = stretchCur;
      }
    }
    return old;
  }
  function removeReadOnlyRanges(doc, from, to) {
    var markers = null;
    doc.iter(from.line, to.line + 1, function(line) {
      if (line.markedSpans)
        for (var i = 0; i < line.markedSpans.length; ++i) {
          var mark = line.markedSpans[i].marker;
          if (mark.readOnly && (!markers || indexOf(markers, mark) == -1))
            (markers || (markers = [])).push(mark);
        }
    });
    if (!markers)
      return null;
    var parts = [{
      from: from,
      to: to
    }];
    for (var i = 0; i < markers.length; ++i) {
      var mk = markers[i],
          m = mk.find(0);
      for (var j = 0; j < parts.length; ++j) {
        var p = parts[j];
        if (cmp(p.to, m.from) < 0 || cmp(p.from, m.to) > 0)
          continue;
        var newParts = [j, 1],
            dfrom = cmp(p.from, m.from),
            dto = cmp(p.to, m.to);
        if (dfrom < 0 || !mk.inclusiveLeft && !dfrom)
          newParts.push({
            from: p.from,
            to: m.from
          });
        if (dto > 0 || !mk.inclusiveRight && !dto)
          newParts.push({
            from: m.to,
            to: p.to
          });
        parts.splice.apply(parts, newParts);
        j += newParts.length - 1;
      }
    }
    return parts;
  }
  function detachMarkedSpans(line) {
    var spans = line.markedSpans;
    if (!spans)
      return;
    for (var i = 0; i < spans.length; ++i)
      spans[i].marker.detachLine(line);
    line.markedSpans = null;
  }
  function attachMarkedSpans(line, spans) {
    if (!spans)
      return;
    for (var i = 0; i < spans.length; ++i)
      spans[i].marker.attachLine(line);
    line.markedSpans = spans;
  }
  function extraLeft(marker) {
    return marker.inclusiveLeft ? -1 : 0;
  }
  function extraRight(marker) {
    return marker.inclusiveRight ? 1 : 0;
  }
  function compareCollapsedMarkers(a, b) {
    var lenDiff = a.lines.length - b.lines.length;
    if (lenDiff != 0)
      return lenDiff;
    var aPos = a.find(),
        bPos = b.find();
    var fromCmp = cmp(aPos.from, bPos.from) || extraLeft(a) - extraLeft(b);
    if (fromCmp)
      return -fromCmp;
    var toCmp = cmp(aPos.to, bPos.to) || extraRight(a) - extraRight(b);
    if (toCmp)
      return toCmp;
    return b.id - a.id;
  }
  function collapsedSpanAtSide(line, start) {
    var sps = sawCollapsedSpans && line.markedSpans,
        found;
    if (sps)
      for (var sp,
          i = 0; i < sps.length; ++i) {
        sp = sps[i];
        if (sp.marker.collapsed && (start ? sp.from : sp.to) == null && (!found || compareCollapsedMarkers(found, sp.marker) < 0))
          found = sp.marker;
      }
    return found;
  }
  function collapsedSpanAtStart(line) {
    return collapsedSpanAtSide(line, true);
  }
  function collapsedSpanAtEnd(line) {
    return collapsedSpanAtSide(line, false);
  }
  function conflictingCollapsedRange(doc, lineNo, from, to, marker) {
    var line = getLine(doc, lineNo);
    var sps = sawCollapsedSpans && line.markedSpans;
    if (sps)
      for (var i = 0; i < sps.length; ++i) {
        var sp = sps[i];
        if (!sp.marker.collapsed)
          continue;
        var found = sp.marker.find(0);
        var fromCmp = cmp(found.from, from) || extraLeft(sp.marker) - extraLeft(marker);
        var toCmp = cmp(found.to, to) || extraRight(sp.marker) - extraRight(marker);
        if (fromCmp >= 0 && toCmp <= 0 || fromCmp <= 0 && toCmp >= 0)
          continue;
        if (fromCmp <= 0 && (cmp(found.to, from) > 0 || (sp.marker.inclusiveRight && marker.inclusiveLeft)) || fromCmp >= 0 && (cmp(found.from, to) < 0 || (sp.marker.inclusiveLeft && marker.inclusiveRight)))
          return true;
      }
  }
  function visualLine(line) {
    var merged;
    while (merged = collapsedSpanAtStart(line))
      line = merged.find(-1, true).line;
    return line;
  }
  function visualLineContinued(line) {
    var merged,
        lines;
    while (merged = collapsedSpanAtEnd(line)) {
      line = merged.find(1, true).line;
      (lines || (lines = [])).push(line);
    }
    return lines;
  }
  function visualLineNo(doc, lineN) {
    var line = getLine(doc, lineN),
        vis = visualLine(line);
    if (line == vis)
      return lineN;
    return lineNo(vis);
  }
  function visualLineEndNo(doc, lineN) {
    if (lineN > doc.lastLine())
      return lineN;
    var line = getLine(doc, lineN),
        merged;
    if (!lineIsHidden(doc, line))
      return lineN;
    while (merged = collapsedSpanAtEnd(line))
      line = merged.find(1, true).line;
    return lineNo(line) + 1;
  }
  function lineIsHidden(doc, line) {
    var sps = sawCollapsedSpans && line.markedSpans;
    if (sps)
      for (var sp,
          i = 0; i < sps.length; ++i) {
        sp = sps[i];
        if (!sp.marker.collapsed)
          continue;
        if (sp.from == null)
          return true;
        if (sp.marker.widgetNode)
          continue;
        if (sp.from == 0 && sp.marker.inclusiveLeft && lineIsHiddenInner(doc, line, sp))
          return true;
      }
  }
  function lineIsHiddenInner(doc, line, span) {
    if (span.to == null) {
      var end = span.marker.find(1, true);
      return lineIsHiddenInner(doc, end.line, getMarkedSpanFor(end.line.markedSpans, span.marker));
    }
    if (span.marker.inclusiveRight && span.to == line.text.length)
      return true;
    for (var sp,
        i = 0; i < line.markedSpans.length; ++i) {
      sp = line.markedSpans[i];
      if (sp.marker.collapsed && !sp.marker.widgetNode && sp.from == span.to && (sp.to == null || sp.to != span.from) && (sp.marker.inclusiveLeft || span.marker.inclusiveRight) && lineIsHiddenInner(doc, line, sp))
        return true;
    }
  }
  var LineWidget = CodeMirror.LineWidget = function(doc, node, options) {
    if (options)
      for (var opt in options)
        if (options.hasOwnProperty(opt))
          this[opt] = options[opt];
    this.doc = doc;
    this.node = node;
  };
  eventMixin(LineWidget);
  function adjustScrollWhenAboveVisible(cm, line, diff) {
    if (heightAtLine(line) < ((cm.curOp && cm.curOp.scrollTop) || cm.doc.scrollTop))
      addToScrollPos(cm, null, diff);
  }
  LineWidget.prototype.clear = function() {
    var cm = this.doc.cm,
        ws = this.line.widgets,
        line = this.line,
        no = lineNo(line);
    if (no == null || !ws)
      return;
    for (var i = 0; i < ws.length; ++i)
      if (ws[i] == this)
        ws.splice(i--, 1);
    if (!ws.length)
      line.widgets = null;
    var height = widgetHeight(this);
    updateLineHeight(line, Math.max(0, line.height - height));
    if (cm)
      runInOp(cm, function() {
        adjustScrollWhenAboveVisible(cm, line, -height);
        regLineChange(cm, no, "widget");
      });
  };
  LineWidget.prototype.changed = function() {
    var oldH = this.height,
        cm = this.doc.cm,
        line = this.line;
    this.height = null;
    var diff = widgetHeight(this) - oldH;
    if (!diff)
      return;
    updateLineHeight(line, line.height + diff);
    if (cm)
      runInOp(cm, function() {
        cm.curOp.forceUpdate = true;
        adjustScrollWhenAboveVisible(cm, line, diff);
      });
  };
  function widgetHeight(widget) {
    if (widget.height != null)
      return widget.height;
    var cm = widget.doc.cm;
    if (!cm)
      return 0;
    if (!contains(document.body, widget.node)) {
      var parentStyle = "position: relative;";
      if (widget.coverGutter)
        parentStyle += "margin-left: -" + cm.display.gutters.offsetWidth + "px;";
      if (widget.noHScroll)
        parentStyle += "width: " + cm.display.wrapper.clientWidth + "px;";
      removeChildrenAndAdd(cm.display.measure, elt("div", [widget.node], null, parentStyle));
    }
    return widget.height = widget.node.offsetHeight;
  }
  function addLineWidget(doc, handle, node, options) {
    var widget = new LineWidget(doc, node, options);
    var cm = doc.cm;
    if (cm && widget.noHScroll)
      cm.display.alignWidgets = true;
    changeLine(doc, handle, "widget", function(line) {
      var widgets = line.widgets || (line.widgets = []);
      if (widget.insertAt == null)
        widgets.push(widget);
      else
        widgets.splice(Math.min(widgets.length - 1, Math.max(0, widget.insertAt)), 0, widget);
      widget.line = line;
      if (cm && !lineIsHidden(doc, line)) {
        var aboveVisible = heightAtLine(line) < doc.scrollTop;
        updateLineHeight(line, line.height + widgetHeight(widget));
        if (aboveVisible)
          addToScrollPos(cm, null, widget.height);
        cm.curOp.forceUpdate = true;
      }
      return true;
    });
    return widget;
  }
  var Line = CodeMirror.Line = function(text, markedSpans, estimateHeight) {
    this.text = text;
    attachMarkedSpans(this, markedSpans);
    this.height = estimateHeight ? estimateHeight(this) : 1;
  };
  eventMixin(Line);
  Line.prototype.lineNo = function() {
    return lineNo(this);
  };
  function updateLine(line, text, markedSpans, estimateHeight) {
    line.text = text;
    if (line.stateAfter)
      line.stateAfter = null;
    if (line.styles)
      line.styles = null;
    if (line.order != null)
      line.order = null;
    detachMarkedSpans(line);
    attachMarkedSpans(line, markedSpans);
    var estHeight = estimateHeight ? estimateHeight(line) : 1;
    if (estHeight != line.height)
      updateLineHeight(line, estHeight);
  }
  function cleanUpLine(line) {
    line.parent = null;
    detachMarkedSpans(line);
  }
  function extractLineClasses(type, output) {
    if (type)
      for (; ; ) {
        var lineClass = type.match(/(?:^|\s+)line-(background-)?(\S+)/);
        if (!lineClass)
          break;
        type = type.slice(0, lineClass.index) + type.slice(lineClass.index + lineClass[0].length);
        var prop = lineClass[1] ? "bgClass" : "textClass";
        if (output[prop] == null)
          output[prop] = lineClass[2];
        else if (!(new RegExp("(?:^|\s)" + lineClass[2] + "(?:$|\s)")).test(output[prop]))
          output[prop] += " " + lineClass[2];
      }
    return type;
  }
  function callBlankLine(mode, state) {
    if (mode.blankLine)
      return mode.blankLine(state);
    if (!mode.innerMode)
      return;
    var inner = CodeMirror.innerMode(mode, state);
    if (inner.mode.blankLine)
      return inner.mode.blankLine(inner.state);
  }
  function readToken(mode, stream, state, inner) {
    for (var i = 0; i < 10; i++) {
      if (inner)
        inner[0] = CodeMirror.innerMode(mode, state).mode;
      var style = mode.token(stream, state);
      if (stream.pos > stream.start)
        return style;
    }
    throw new Error("Mode " + mode.name + " failed to advance stream.");
  }
  function takeToken(cm, pos, precise, asArray) {
    function getObj(copy) {
      return {
        start: stream.start,
        end: stream.pos,
        string: stream.current(),
        type: style || null,
        state: copy ? copyState(doc.mode, state) : state
      };
    }
    var doc = cm.doc,
        mode = doc.mode,
        style;
    pos = clipPos(doc, pos);
    var line = getLine(doc, pos.line),
        state = getStateBefore(cm, pos.line, precise);
    var stream = new StringStream(line.text, cm.options.tabSize),
        tokens;
    if (asArray)
      tokens = [];
    while ((asArray || stream.pos < pos.ch) && !stream.eol()) {
      stream.start = stream.pos;
      style = readToken(mode, stream, state);
      if (asArray)
        tokens.push(getObj(true));
    }
    return asArray ? tokens : getObj();
  }
  function runMode(cm, text, mode, state, f, lineClasses, forceToEnd) {
    var flattenSpans = mode.flattenSpans;
    if (flattenSpans == null)
      flattenSpans = cm.options.flattenSpans;
    var curStart = 0,
        curStyle = null;
    var stream = new StringStream(text, cm.options.tabSize),
        style;
    var inner = cm.options.addModeClass && [null];
    if (text == "")
      extractLineClasses(callBlankLine(mode, state), lineClasses);
    while (!stream.eol()) {
      if (stream.pos > cm.options.maxHighlightLength) {
        flattenSpans = false;
        if (forceToEnd)
          processLine(cm, text, state, stream.pos);
        stream.pos = text.length;
        style = null;
      } else {
        style = extractLineClasses(readToken(mode, stream, state, inner), lineClasses);
      }
      if (inner) {
        var mName = inner[0].name;
        if (mName)
          style = "m-" + (style ? mName + " " + style : mName);
      }
      if (!flattenSpans || curStyle != style) {
        while (curStart < stream.start) {
          curStart = Math.min(stream.start, curStart + 50000);
          f(curStart, curStyle);
        }
        curStyle = style;
      }
      stream.start = stream.pos;
    }
    while (curStart < stream.pos) {
      var pos = Math.min(stream.pos, curStart + 50000);
      f(pos, curStyle);
      curStart = pos;
    }
  }
  function highlightLine(cm, line, state, forceToEnd) {
    var st = [cm.state.modeGen],
        lineClasses = {};
    runMode(cm, line.text, cm.doc.mode, state, function(end, style) {
      st.push(end, style);
    }, lineClasses, forceToEnd);
    for (var o = 0; o < cm.state.overlays.length; ++o) {
      var overlay = cm.state.overlays[o],
          i = 1,
          at = 0;
      runMode(cm, line.text, overlay.mode, true, function(end, style) {
        var start = i;
        while (at < end) {
          var i_end = st[i];
          if (i_end > end)
            st.splice(i, 1, end, st[i + 1], i_end);
          i += 2;
          at = Math.min(end, i_end);
        }
        if (!style)
          return;
        if (overlay.opaque) {
          st.splice(start, i - start, end, "cm-overlay " + style);
          i = start + 2;
        } else {
          for (; start < i; start += 2) {
            var cur = st[start + 1];
            st[start + 1] = (cur ? cur + " " : "") + "cm-overlay " + style;
          }
        }
      }, lineClasses);
    }
    return {
      styles: st,
      classes: lineClasses.bgClass || lineClasses.textClass ? lineClasses : null
    };
  }
  function getLineStyles(cm, line, updateFrontier) {
    if (!line.styles || line.styles[0] != cm.state.modeGen) {
      var state = getStateBefore(cm, lineNo(line));
      var result = highlightLine(cm, line, line.text.length > cm.options.maxHighlightLength ? copyState(cm.doc.mode, state) : state);
      line.stateAfter = state;
      line.styles = result.styles;
      if (result.classes)
        line.styleClasses = result.classes;
      else if (line.styleClasses)
        line.styleClasses = null;
      if (updateFrontier === cm.doc.frontier)
        cm.doc.frontier++;
    }
    return line.styles;
  }
  function processLine(cm, text, state, startAt) {
    var mode = cm.doc.mode;
    var stream = new StringStream(text, cm.options.tabSize);
    stream.start = stream.pos = startAt || 0;
    if (text == "")
      callBlankLine(mode, state);
    while (!stream.eol()) {
      readToken(mode, stream, state);
      stream.start = stream.pos;
    }
  }
  var styleToClassCache = {},
      styleToClassCacheWithMode = {};
  function interpretTokenStyle(style, options) {
    if (!style || /^\s*$/.test(style))
      return null;
    var cache = options.addModeClass ? styleToClassCacheWithMode : styleToClassCache;
    return cache[style] || (cache[style] = style.replace(/\S+/g, "cm-$&"));
  }
  function buildLineContent(cm, lineView) {
    var content = elt("span", null, null, webkit ? "padding-right: .1px" : null);
    var builder = {
      pre: elt("pre", [content], "CodeMirror-line"),
      content: content,
      col: 0,
      pos: 0,
      cm: cm,
      splitSpaces: (ie || webkit) && cm.getOption("lineWrapping")
    };
    lineView.measure = {};
    for (var i = 0; i <= (lineView.rest ? lineView.rest.length : 0); i++) {
      var line = i ? lineView.rest[i - 1] : lineView.line,
          order;
      builder.pos = 0;
      builder.addToken = buildToken;
      if (hasBadBidiRects(cm.display.measure) && (order = getOrder(line)))
        builder.addToken = buildTokenBadBidi(builder.addToken, order);
      builder.map = [];
      var allowFrontierUpdate = lineView != cm.display.externalMeasured && lineNo(line);
      insertLineContent(line, builder, getLineStyles(cm, line, allowFrontierUpdate));
      if (line.styleClasses) {
        if (line.styleClasses.bgClass)
          builder.bgClass = joinClasses(line.styleClasses.bgClass, builder.bgClass || "");
        if (line.styleClasses.textClass)
          builder.textClass = joinClasses(line.styleClasses.textClass, builder.textClass || "");
      }
      if (builder.map.length == 0)
        builder.map.push(0, 0, builder.content.appendChild(zeroWidthElement(cm.display.measure)));
      if (i == 0) {
        lineView.measure.map = builder.map;
        lineView.measure.cache = {};
      } else {
        (lineView.measure.maps || (lineView.measure.maps = [])).push(builder.map);
        (lineView.measure.caches || (lineView.measure.caches = [])).push({});
      }
    }
    if (webkit && /\bcm-tab\b/.test(builder.content.lastChild.className))
      builder.content.className = "cm-tab-wrap-hack";
    signal(cm, "renderLine", cm, lineView.line, builder.pre);
    if (builder.pre.className)
      builder.textClass = joinClasses(builder.pre.className, builder.textClass || "");
    return builder;
  }
  function defaultSpecialCharPlaceholder(ch) {
    var token = elt("span", "\u2022", "cm-invalidchar");
    token.title = "\\u" + ch.charCodeAt(0).toString(16);
    token.setAttribute("aria-label", token.title);
    return token;
  }
  function buildToken(builder, text, style, startStyle, endStyle, title, css) {
    if (!text)
      return;
    var displayText = builder.splitSpaces ? text.replace(/ {3,}/g, splitSpaces) : text;
    var special = builder.cm.state.specialChars,
        mustWrap = false;
    if (!special.test(text)) {
      builder.col += text.length;
      var content = document.createTextNode(displayText);
      builder.map.push(builder.pos, builder.pos + text.length, content);
      if (ie && ie_version < 9)
        mustWrap = true;
      builder.pos += text.length;
    } else {
      var content = document.createDocumentFragment(),
          pos = 0;
      while (true) {
        special.lastIndex = pos;
        var m = special.exec(text);
        var skipped = m ? m.index - pos : text.length - pos;
        if (skipped) {
          var txt = document.createTextNode(displayText.slice(pos, pos + skipped));
          if (ie && ie_version < 9)
            content.appendChild(elt("span", [txt]));
          else
            content.appendChild(txt);
          builder.map.push(builder.pos, builder.pos + skipped, txt);
          builder.col += skipped;
          builder.pos += skipped;
        }
        if (!m)
          break;
        pos += skipped + 1;
        if (m[0] == "\t") {
          var tabSize = builder.cm.options.tabSize,
              tabWidth = tabSize - builder.col % tabSize;
          var txt = content.appendChild(elt("span", spaceStr(tabWidth), "cm-tab"));
          txt.setAttribute("role", "presentation");
          txt.setAttribute("cm-text", "\t");
          builder.col += tabWidth;
        } else if (m[0] == "\r" || m[0] == "\n") {
          var txt = content.appendChild(elt("span", m[0] == "\r" ? "\u240d" : "\u2424", "cm-invalidchar"));
          txt.setAttribute("cm-text", m[0]);
          builder.col += 1;
        } else {
          var txt = builder.cm.options.specialCharPlaceholder(m[0]);
          txt.setAttribute("cm-text", m[0]);
          if (ie && ie_version < 9)
            content.appendChild(elt("span", [txt]));
          else
            content.appendChild(txt);
          builder.col += 1;
        }
        builder.map.push(builder.pos, builder.pos + 1, txt);
        builder.pos++;
      }
    }
    if (style || startStyle || endStyle || mustWrap || css) {
      var fullStyle = style || "";
      if (startStyle)
        fullStyle += startStyle;
      if (endStyle)
        fullStyle += endStyle;
      var token = elt("span", [content], fullStyle, css);
      if (title)
        token.title = title;
      return builder.content.appendChild(token);
    }
    builder.content.appendChild(content);
  }
  function splitSpaces(old) {
    var out = " ";
    for (var i = 0; i < old.length - 2; ++i)
      out += i % 2 ? " " : "\u00a0";
    out += " ";
    return out;
  }
  function buildTokenBadBidi(inner, order) {
    return function(builder, text, style, startStyle, endStyle, title, css) {
      style = style ? style + " cm-force-border" : "cm-force-border";
      var start = builder.pos,
          end = start + text.length;
      for (; ; ) {
        for (var i = 0; i < order.length; i++) {
          var part = order[i];
          if (part.to > start && part.from <= start)
            break;
        }
        if (part.to >= end)
          return inner(builder, text, style, startStyle, endStyle, title, css);
        inner(builder, text.slice(0, part.to - start), style, startStyle, null, title, css);
        startStyle = null;
        text = text.slice(part.to - start);
        start = part.to;
      }
    };
  }
  function buildCollapsedSpan(builder, size, marker, ignoreWidget) {
    var widget = !ignoreWidget && marker.widgetNode;
    if (widget)
      builder.map.push(builder.pos, builder.pos + size, widget);
    if (!ignoreWidget && builder.cm.display.input.needsContentAttribute) {
      if (!widget)
        widget = builder.content.appendChild(document.createElement("span"));
      widget.setAttribute("cm-marker", marker.id);
    }
    if (widget) {
      builder.cm.display.input.setUneditable(widget);
      builder.content.appendChild(widget);
    }
    builder.pos += size;
  }
  function insertLineContent(line, builder, styles) {
    var spans = line.markedSpans,
        allText = line.text,
        at = 0;
    if (!spans) {
      for (var i = 1; i < styles.length; i += 2)
        builder.addToken(builder, allText.slice(at, at = styles[i]), interpretTokenStyle(styles[i + 1], builder.cm.options));
      return;
    }
    var len = allText.length,
        pos = 0,
        i = 1,
        text = "",
        style,
        css;
    var nextChange = 0,
        spanStyle,
        spanEndStyle,
        spanStartStyle,
        title,
        collapsed;
    for (; ; ) {
      if (nextChange == pos) {
        spanStyle = spanEndStyle = spanStartStyle = title = css = "";
        collapsed = null;
        nextChange = Infinity;
        var foundBookmarks = [];
        for (var j = 0; j < spans.length; ++j) {
          var sp = spans[j],
              m = sp.marker;
          if (m.type == "bookmark" && sp.from == pos && m.widgetNode) {
            foundBookmarks.push(m);
          } else if (sp.from <= pos && (sp.to == null || sp.to > pos || m.collapsed && sp.to == pos && sp.from == pos)) {
            if (sp.to != null && sp.to != pos && nextChange > sp.to) {
              nextChange = sp.to;
              spanEndStyle = "";
            }
            if (m.className)
              spanStyle += " " + m.className;
            if (m.css)
              css = m.css;
            if (m.startStyle && sp.from == pos)
              spanStartStyle += " " + m.startStyle;
            if (m.endStyle && sp.to == nextChange)
              spanEndStyle += " " + m.endStyle;
            if (m.title && !title)
              title = m.title;
            if (m.collapsed && (!collapsed || compareCollapsedMarkers(collapsed.marker, m) < 0))
              collapsed = sp;
          } else if (sp.from > pos && nextChange > sp.from) {
            nextChange = sp.from;
          }
        }
        if (collapsed && (collapsed.from || 0) == pos) {
          buildCollapsedSpan(builder, (collapsed.to == null ? len + 1 : collapsed.to) - pos, collapsed.marker, collapsed.from == null);
          if (collapsed.to == null)
            return;
          if (collapsed.to == pos)
            collapsed = false;
        }
        if (!collapsed && foundBookmarks.length)
          for (var j = 0; j < foundBookmarks.length; ++j)
            buildCollapsedSpan(builder, 0, foundBookmarks[j]);
      }
      if (pos >= len)
        break;
      var upto = Math.min(len, nextChange);
      while (true) {
        if (text) {
          var end = pos + text.length;
          if (!collapsed) {
            var tokenText = end > upto ? text.slice(0, upto - pos) : text;
            builder.addToken(builder, tokenText, style ? style + spanStyle : spanStyle, spanStartStyle, pos + tokenText.length == nextChange ? spanEndStyle : "", title, css);
          }
          if (end >= upto) {
            text = text.slice(upto - pos);
            pos = upto;
            break;
          }
          pos = end;
          spanStartStyle = "";
        }
        text = allText.slice(at, at = styles[i++]);
        style = interpretTokenStyle(styles[i++], builder.cm.options);
      }
    }
  }
  function isWholeLineUpdate(doc, change) {
    return change.from.ch == 0 && change.to.ch == 0 && lst(change.text) == "" && (!doc.cm || doc.cm.options.wholeLineUpdateBefore);
  }
  function updateDoc(doc, change, markedSpans, estimateHeight) {
    function spansFor(n) {
      return markedSpans ? markedSpans[n] : null;
    }
    function update(line, text, spans) {
      updateLine(line, text, spans, estimateHeight);
      signalLater(line, "change", line, change);
    }
    function linesFor(start, end) {
      for (var i = start,
          result = []; i < end; ++i)
        result.push(new Line(text[i], spansFor(i), estimateHeight));
      return result;
    }
    var from = change.from,
        to = change.to,
        text = change.text;
    var firstLine = getLine(doc, from.line),
        lastLine = getLine(doc, to.line);
    var lastText = lst(text),
        lastSpans = spansFor(text.length - 1),
        nlines = to.line - from.line;
    if (change.full) {
      doc.insert(0, linesFor(0, text.length));
      doc.remove(text.length, doc.size - text.length);
    } else if (isWholeLineUpdate(doc, change)) {
      var added = linesFor(0, text.length - 1);
      update(lastLine, lastLine.text, lastSpans);
      if (nlines)
        doc.remove(from.line, nlines);
      if (added.length)
        doc.insert(from.line, added);
    } else if (firstLine == lastLine) {
      if (text.length == 1) {
        update(firstLine, firstLine.text.slice(0, from.ch) + lastText + firstLine.text.slice(to.ch), lastSpans);
      } else {
        var added = linesFor(1, text.length - 1);
        added.push(new Line(lastText + firstLine.text.slice(to.ch), lastSpans, estimateHeight));
        update(firstLine, firstLine.text.slice(0, from.ch) + text[0], spansFor(0));
        doc.insert(from.line + 1, added);
      }
    } else if (text.length == 1) {
      update(firstLine, firstLine.text.slice(0, from.ch) + text[0] + lastLine.text.slice(to.ch), spansFor(0));
      doc.remove(from.line + 1, nlines);
    } else {
      update(firstLine, firstLine.text.slice(0, from.ch) + text[0], spansFor(0));
      update(lastLine, lastText + lastLine.text.slice(to.ch), lastSpans);
      var added = linesFor(1, text.length - 1);
      if (nlines > 1)
        doc.remove(from.line + 1, nlines - 1);
      doc.insert(from.line + 1, added);
    }
    signalLater(doc, "change", doc, change);
  }
  function LeafChunk(lines) {
    this.lines = lines;
    this.parent = null;
    for (var i = 0,
        height = 0; i < lines.length; ++i) {
      lines[i].parent = this;
      height += lines[i].height;
    }
    this.height = height;
  }
  LeafChunk.prototype = {
    chunkSize: function() {
      return this.lines.length;
    },
    removeInner: function(at, n) {
      for (var i = at,
          e = at + n; i < e; ++i) {
        var line = this.lines[i];
        this.height -= line.height;
        cleanUpLine(line);
        signalLater(line, "delete");
      }
      this.lines.splice(at, n);
    },
    collapse: function(lines) {
      lines.push.apply(lines, this.lines);
    },
    insertInner: function(at, lines, height) {
      this.height += height;
      this.lines = this.lines.slice(0, at).concat(lines).concat(this.lines.slice(at));
      for (var i = 0; i < lines.length; ++i)
        lines[i].parent = this;
    },
    iterN: function(at, n, op) {
      for (var e = at + n; at < e; ++at)
        if (op(this.lines[at]))
          return true;
    }
  };
  function BranchChunk(children) {
    this.children = children;
    var size = 0,
        height = 0;
    for (var i = 0; i < children.length; ++i) {
      var ch = children[i];
      size += ch.chunkSize();
      height += ch.height;
      ch.parent = this;
    }
    this.size = size;
    this.height = height;
    this.parent = null;
  }
  BranchChunk.prototype = {
    chunkSize: function() {
      return this.size;
    },
    removeInner: function(at, n) {
      this.size -= n;
      for (var i = 0; i < this.children.length; ++i) {
        var child = this.children[i],
            sz = child.chunkSize();
        if (at < sz) {
          var rm = Math.min(n, sz - at),
              oldHeight = child.height;
          child.removeInner(at, rm);
          this.height -= oldHeight - child.height;
          if (sz == rm) {
            this.children.splice(i--, 1);
            child.parent = null;
          }
          if ((n -= rm) == 0)
            break;
          at = 0;
        } else
          at -= sz;
      }
      if (this.size - n < 25 && (this.children.length > 1 || !(this.children[0] instanceof LeafChunk))) {
        var lines = [];
        this.collapse(lines);
        this.children = [new LeafChunk(lines)];
        this.children[0].parent = this;
      }
    },
    collapse: function(lines) {
      for (var i = 0; i < this.children.length; ++i)
        this.children[i].collapse(lines);
    },
    insertInner: function(at, lines, height) {
      this.size += lines.length;
      this.height += height;
      for (var i = 0; i < this.children.length; ++i) {
        var child = this.children[i],
            sz = child.chunkSize();
        if (at <= sz) {
          child.insertInner(at, lines, height);
          if (child.lines && child.lines.length > 50) {
            while (child.lines.length > 50) {
              var spilled = child.lines.splice(child.lines.length - 25, 25);
              var newleaf = new LeafChunk(spilled);
              child.height -= newleaf.height;
              this.children.splice(i + 1, 0, newleaf);
              newleaf.parent = this;
            }
            this.maybeSpill();
          }
          break;
        }
        at -= sz;
      }
    },
    maybeSpill: function() {
      if (this.children.length <= 10)
        return;
      var me = this;
      do {
        var spilled = me.children.splice(me.children.length - 5, 5);
        var sibling = new BranchChunk(spilled);
        if (!me.parent) {
          var copy = new BranchChunk(me.children);
          copy.parent = me;
          me.children = [copy, sibling];
          me = copy;
        } else {
          me.size -= sibling.size;
          me.height -= sibling.height;
          var myIndex = indexOf(me.parent.children, me);
          me.parent.children.splice(myIndex + 1, 0, sibling);
        }
        sibling.parent = me.parent;
      } while (me.children.length > 10);
      me.parent.maybeSpill();
    },
    iterN: function(at, n, op) {
      for (var i = 0; i < this.children.length; ++i) {
        var child = this.children[i],
            sz = child.chunkSize();
        if (at < sz) {
          var used = Math.min(n, sz - at);
          if (child.iterN(at, used, op))
            return true;
          if ((n -= used) == 0)
            break;
          at = 0;
        } else
          at -= sz;
      }
    }
  };
  var nextDocId = 0;
  var Doc = CodeMirror.Doc = function(text, mode, firstLine, lineSep) {
    if (!(this instanceof Doc))
      return new Doc(text, mode, firstLine, lineSep);
    if (firstLine == null)
      firstLine = 0;
    BranchChunk.call(this, [new LeafChunk([new Line("", null)])]);
    this.first = firstLine;
    this.scrollTop = this.scrollLeft = 0;
    this.cantEdit = false;
    this.cleanGeneration = 1;
    this.frontier = firstLine;
    var start = Pos(firstLine, 0);
    this.sel = simpleSelection(start);
    this.history = new History(null);
    this.id = ++nextDocId;
    this.modeOption = mode;
    this.lineSep = lineSep;
    if (typeof text == "string")
      text = this.splitLines(text);
    updateDoc(this, {
      from: start,
      to: start,
      text: text
    });
    setSelection(this, simpleSelection(start), sel_dontScroll);
  };
  Doc.prototype = createObj(BranchChunk.prototype, {
    constructor: Doc,
    iter: function(from, to, op) {
      if (op)
        this.iterN(from - this.first, to - from, op);
      else
        this.iterN(this.first, this.first + this.size, from);
    },
    insert: function(at, lines) {
      var height = 0;
      for (var i = 0; i < lines.length; ++i)
        height += lines[i].height;
      this.insertInner(at - this.first, lines, height);
    },
    remove: function(at, n) {
      this.removeInner(at - this.first, n);
    },
    getValue: function(lineSep) {
      var lines = getLines(this, this.first, this.first + this.size);
      if (lineSep === false)
        return lines;
      return lines.join(lineSep || this.lineSeparator());
    },
    setValue: docMethodOp(function(code) {
      var top = Pos(this.first, 0),
          last = this.first + this.size - 1;
      makeChange(this, {
        from: top,
        to: Pos(last, getLine(this, last).text.length),
        text: this.splitLines(code),
        origin: "setValue",
        full: true
      }, true);
      setSelection(this, simpleSelection(top));
    }),
    replaceRange: function(code, from, to, origin) {
      from = clipPos(this, from);
      to = to ? clipPos(this, to) : from;
      replaceRange(this, code, from, to, origin);
    },
    getRange: function(from, to, lineSep) {
      var lines = getBetween(this, clipPos(this, from), clipPos(this, to));
      if (lineSep === false)
        return lines;
      return lines.join(lineSep || this.lineSeparator());
    },
    getLine: function(line) {
      var l = this.getLineHandle(line);
      return l && l.text;
    },
    getLineHandle: function(line) {
      if (isLine(this, line))
        return getLine(this, line);
    },
    getLineNumber: function(line) {
      return lineNo(line);
    },
    getLineHandleVisualStart: function(line) {
      if (typeof line == "number")
        line = getLine(this, line);
      return visualLine(line);
    },
    lineCount: function() {
      return this.size;
    },
    firstLine: function() {
      return this.first;
    },
    lastLine: function() {
      return this.first + this.size - 1;
    },
    clipPos: function(pos) {
      return clipPos(this, pos);
    },
    getCursor: function(start) {
      var range = this.sel.primary(),
          pos;
      if (start == null || start == "head")
        pos = range.head;
      else if (start == "anchor")
        pos = range.anchor;
      else if (start == "end" || start == "to" || start === false)
        pos = range.to();
      else
        pos = range.from();
      return pos;
    },
    listSelections: function() {
      return this.sel.ranges;
    },
    somethingSelected: function() {
      return this.sel.somethingSelected();
    },
    setCursor: docMethodOp(function(line, ch, options) {
      setSimpleSelection(this, clipPos(this, typeof line == "number" ? Pos(line, ch || 0) : line), null, options);
    }),
    setSelection: docMethodOp(function(anchor, head, options) {
      setSimpleSelection(this, clipPos(this, anchor), clipPos(this, head || anchor), options);
    }),
    extendSelection: docMethodOp(function(head, other, options) {
      extendSelection(this, clipPos(this, head), other && clipPos(this, other), options);
    }),
    extendSelections: docMethodOp(function(heads, options) {
      extendSelections(this, clipPosArray(this, heads, options));
    }),
    extendSelectionsBy: docMethodOp(function(f, options) {
      extendSelections(this, map(this.sel.ranges, f), options);
    }),
    setSelections: docMethodOp(function(ranges, primary, options) {
      if (!ranges.length)
        return;
      for (var i = 0,
          out = []; i < ranges.length; i++)
        out[i] = new Range(clipPos(this, ranges[i].anchor), clipPos(this, ranges[i].head));
      if (primary == null)
        primary = Math.min(ranges.length - 1, this.sel.primIndex);
      setSelection(this, normalizeSelection(out, primary), options);
    }),
    addSelection: docMethodOp(function(anchor, head, options) {
      var ranges = this.sel.ranges.slice(0);
      ranges.push(new Range(clipPos(this, anchor), clipPos(this, head || anchor)));
      setSelection(this, normalizeSelection(ranges, ranges.length - 1), options);
    }),
    getSelection: function(lineSep) {
      var ranges = this.sel.ranges,
          lines;
      for (var i = 0; i < ranges.length; i++) {
        var sel = getBetween(this, ranges[i].from(), ranges[i].to());
        lines = lines ? lines.concat(sel) : sel;
      }
      if (lineSep === false)
        return lines;
      else
        return lines.join(lineSep || this.lineSeparator());
    },
    getSelections: function(lineSep) {
      var parts = [],
          ranges = this.sel.ranges;
      for (var i = 0; i < ranges.length; i++) {
        var sel = getBetween(this, ranges[i].from(), ranges[i].to());
        if (lineSep !== false)
          sel = sel.join(lineSep || this.lineSeparator());
        parts[i] = sel;
      }
      return parts;
    },
    replaceSelection: function(code, collapse, origin) {
      var dup = [];
      for (var i = 0; i < this.sel.ranges.length; i++)
        dup[i] = code;
      this.replaceSelections(dup, collapse, origin || "+input");
    },
    replaceSelections: docMethodOp(function(code, collapse, origin) {
      var changes = [],
          sel = this.sel;
      for (var i = 0; i < sel.ranges.length; i++) {
        var range = sel.ranges[i];
        changes[i] = {
          from: range.from(),
          to: range.to(),
          text: this.splitLines(code[i]),
          origin: origin
        };
      }
      var newSel = collapse && collapse != "end" && computeReplacedSel(this, changes, collapse);
      for (var i = changes.length - 1; i >= 0; i--)
        makeChange(this, changes[i]);
      if (newSel)
        setSelectionReplaceHistory(this, newSel);
      else if (this.cm)
        ensureCursorVisible(this.cm);
    }),
    undo: docMethodOp(function() {
      makeChangeFromHistory(this, "undo");
    }),
    redo: docMethodOp(function() {
      makeChangeFromHistory(this, "redo");
    }),
    undoSelection: docMethodOp(function() {
      makeChangeFromHistory(this, "undo", true);
    }),
    redoSelection: docMethodOp(function() {
      makeChangeFromHistory(this, "redo", true);
    }),
    setExtending: function(val) {
      this.extend = val;
    },
    getExtending: function() {
      return this.extend;
    },
    historySize: function() {
      var hist = this.history,
          done = 0,
          undone = 0;
      for (var i = 0; i < hist.done.length; i++)
        if (!hist.done[i].ranges)
          ++done;
      for (var i = 0; i < hist.undone.length; i++)
        if (!hist.undone[i].ranges)
          ++undone;
      return {
        undo: done,
        redo: undone
      };
    },
    clearHistory: function() {
      this.history = new History(this.history.maxGeneration);
    },
    markClean: function() {
      this.cleanGeneration = this.changeGeneration(true);
    },
    changeGeneration: function(forceSplit) {
      if (forceSplit)
        this.history.lastOp = this.history.lastSelOp = this.history.lastOrigin = null;
      return this.history.generation;
    },
    isClean: function(gen) {
      return this.history.generation == (gen || this.cleanGeneration);
    },
    getHistory: function() {
      return {
        done: copyHistoryArray(this.history.done),
        undone: copyHistoryArray(this.history.undone)
      };
    },
    setHistory: function(histData) {
      var hist = this.history = new History(this.history.maxGeneration);
      hist.done = copyHistoryArray(histData.done.slice(0), null, true);
      hist.undone = copyHistoryArray(histData.undone.slice(0), null, true);
    },
    addLineClass: docMethodOp(function(handle, where, cls) {
      return changeLine(this, handle, where == "gutter" ? "gutter" : "class", function(line) {
        var prop = where == "text" ? "textClass" : where == "background" ? "bgClass" : where == "gutter" ? "gutterClass" : "wrapClass";
        if (!line[prop])
          line[prop] = cls;
        else if (classTest(cls).test(line[prop]))
          return false;
        else
          line[prop] += " " + cls;
        return true;
      });
    }),
    removeLineClass: docMethodOp(function(handle, where, cls) {
      return changeLine(this, handle, where == "gutter" ? "gutter" : "class", function(line) {
        var prop = where == "text" ? "textClass" : where == "background" ? "bgClass" : where == "gutter" ? "gutterClass" : "wrapClass";
        var cur = line[prop];
        if (!cur)
          return false;
        else if (cls == null)
          line[prop] = null;
        else {
          var found = cur.match(classTest(cls));
          if (!found)
            return false;
          var end = found.index + found[0].length;
          line[prop] = cur.slice(0, found.index) + (!found.index || end == cur.length ? "" : " ") + cur.slice(end) || null;
        }
        return true;
      });
    }),
    addLineWidget: docMethodOp(function(handle, node, options) {
      return addLineWidget(this, handle, node, options);
    }),
    removeLineWidget: function(widget) {
      widget.clear();
    },
    markText: function(from, to, options) {
      return markText(this, clipPos(this, from), clipPos(this, to), options, options && options.type || "range");
    },
    setBookmark: function(pos, options) {
      var realOpts = {
        replacedWith: options && (options.nodeType == null ? options.widget : options),
        insertLeft: options && options.insertLeft,
        clearWhenEmpty: false,
        shared: options && options.shared,
        handleMouseEvents: options && options.handleMouseEvents
      };
      pos = clipPos(this, pos);
      return markText(this, pos, pos, realOpts, "bookmark");
    },
    findMarksAt: function(pos) {
      pos = clipPos(this, pos);
      var markers = [],
          spans = getLine(this, pos.line).markedSpans;
      if (spans)
        for (var i = 0; i < spans.length; ++i) {
          var span = spans[i];
          if ((span.from == null || span.from <= pos.ch) && (span.to == null || span.to >= pos.ch))
            markers.push(span.marker.parent || span.marker);
        }
      return markers;
    },
    findMarks: function(from, to, filter) {
      from = clipPos(this, from);
      to = clipPos(this, to);
      var found = [],
          lineNo = from.line;
      this.iter(from.line, to.line + 1, function(line) {
        var spans = line.markedSpans;
        if (spans)
          for (var i = 0; i < spans.length; i++) {
            var span = spans[i];
            if (!(lineNo == from.line && from.ch > span.to || span.from == null && lineNo != from.line || lineNo == to.line && span.from > to.ch) && (!filter || filter(span.marker)))
              found.push(span.marker.parent || span.marker);
          }
        ++lineNo;
      });
      return found;
    },
    getAllMarks: function() {
      var markers = [];
      this.iter(function(line) {
        var sps = line.markedSpans;
        if (sps)
          for (var i = 0; i < sps.length; ++i)
            if (sps[i].from != null)
              markers.push(sps[i].marker);
      });
      return markers;
    },
    posFromIndex: function(off) {
      var ch,
          lineNo = this.first;
      this.iter(function(line) {
        var sz = line.text.length + 1;
        if (sz > off) {
          ch = off;
          return true;
        }
        off -= sz;
        ++lineNo;
      });
      return clipPos(this, Pos(lineNo, ch));
    },
    indexFromPos: function(coords) {
      coords = clipPos(this, coords);
      var index = coords.ch;
      if (coords.line < this.first || coords.ch < 0)
        return 0;
      this.iter(this.first, coords.line, function(line) {
        index += line.text.length + 1;
      });
      return index;
    },
    copy: function(copyHistory) {
      var doc = new Doc(getLines(this, this.first, this.first + this.size), this.modeOption, this.first, this.lineSep);
      doc.scrollTop = this.scrollTop;
      doc.scrollLeft = this.scrollLeft;
      doc.sel = this.sel;
      doc.extend = false;
      if (copyHistory) {
        doc.history.undoDepth = this.history.undoDepth;
        doc.setHistory(this.getHistory());
      }
      return doc;
    },
    linkedDoc: function(options) {
      if (!options)
        options = {};
      var from = this.first,
          to = this.first + this.size;
      if (options.from != null && options.from > from)
        from = options.from;
      if (options.to != null && options.to < to)
        to = options.to;
      var copy = new Doc(getLines(this, from, to), options.mode || this.modeOption, from, this.lineSep);
      if (options.sharedHist)
        copy.history = this.history;
      (this.linked || (this.linked = [])).push({
        doc: copy,
        sharedHist: options.sharedHist
      });
      copy.linked = [{
        doc: this,
        isParent: true,
        sharedHist: options.sharedHist
      }];
      copySharedMarkers(copy, findSharedMarkers(this));
      return copy;
    },
    unlinkDoc: function(other) {
      if (other instanceof CodeMirror)
        other = other.doc;
      if (this.linked)
        for (var i = 0; i < this.linked.length; ++i) {
          var link = this.linked[i];
          if (link.doc != other)
            continue;
          this.linked.splice(i, 1);
          other.unlinkDoc(this);
          detachSharedMarkers(findSharedMarkers(this));
          break;
        }
      if (other.history == this.history) {
        var splitIds = [other.id];
        linkedDocs(other, function(doc) {
          splitIds.push(doc.id);
        }, true);
        other.history = new History(null);
        other.history.done = copyHistoryArray(this.history.done, splitIds);
        other.history.undone = copyHistoryArray(this.history.undone, splitIds);
      }
    },
    iterLinkedDocs: function(f) {
      linkedDocs(this, f);
    },
    getMode: function() {
      return this.mode;
    },
    getEditor: function() {
      return this.cm;
    },
    splitLines: function(str) {
      if (this.lineSep)
        return str.split(this.lineSep);
      return splitLinesAuto(str);
    },
    lineSeparator: function() {
      return this.lineSep || "\n";
    }
  });
  Doc.prototype.eachLine = Doc.prototype.iter;
  var dontDelegate = "iter insert remove copy getEditor constructor".split(" ");
  for (var prop in Doc.prototype)
    if (Doc.prototype.hasOwnProperty(prop) && indexOf(dontDelegate, prop) < 0)
      CodeMirror.prototype[prop] = (function(method) {
        return function() {
          return method.apply(this.doc, arguments);
        };
      })(Doc.prototype[prop]);
  eventMixin(Doc);
  function linkedDocs(doc, f, sharedHistOnly) {
    function propagate(doc, skip, sharedHist) {
      if (doc.linked)
        for (var i = 0; i < doc.linked.length; ++i) {
          var rel = doc.linked[i];
          if (rel.doc == skip)
            continue;
          var shared = sharedHist && rel.sharedHist;
          if (sharedHistOnly && !shared)
            continue;
          f(rel.doc, shared);
          propagate(rel.doc, doc, shared);
        }
    }
    propagate(doc, null, true);
  }
  function attachDoc(cm, doc) {
    if (doc.cm)
      throw new Error("This document is already in use.");
    cm.doc = doc;
    doc.cm = cm;
    estimateLineHeights(cm);
    loadMode(cm);
    if (!cm.options.lineWrapping)
      findMaxLine(cm);
    cm.options.mode = doc.modeOption;
    regChange(cm);
  }
  function getLine(doc, n) {
    n -= doc.first;
    if (n < 0 || n >= doc.size)
      throw new Error("There is no line " + (n + doc.first) + " in the document.");
    for (var chunk = doc; !chunk.lines; ) {
      for (var i = 0; ; ++i) {
        var child = chunk.children[i],
            sz = child.chunkSize();
        if (n < sz) {
          chunk = child;
          break;
        }
        n -= sz;
      }
    }
    return chunk.lines[n];
  }
  function getBetween(doc, start, end) {
    var out = [],
        n = start.line;
    doc.iter(start.line, end.line + 1, function(line) {
      var text = line.text;
      if (n == end.line)
        text = text.slice(0, end.ch);
      if (n == start.line)
        text = text.slice(start.ch);
      out.push(text);
      ++n;
    });
    return out;
  }
  function getLines(doc, from, to) {
    var out = [];
    doc.iter(from, to, function(line) {
      out.push(line.text);
    });
    return out;
  }
  function updateLineHeight(line, height) {
    var diff = height - line.height;
    if (diff)
      for (var n = line; n; n = n.parent)
        n.height += diff;
  }
  function lineNo(line) {
    if (line.parent == null)
      return null;
    var cur = line.parent,
        no = indexOf(cur.lines, line);
    for (var chunk = cur.parent; chunk; cur = chunk, chunk = chunk.parent) {
      for (var i = 0; ; ++i) {
        if (chunk.children[i] == cur)
          break;
        no += chunk.children[i].chunkSize();
      }
    }
    return no + cur.first;
  }
  function lineAtHeight(chunk, h) {
    var n = chunk.first;
    outer: do {
      for (var i = 0; i < chunk.children.length; ++i) {
        var child = chunk.children[i],
            ch = child.height;
        if (h < ch) {
          chunk = child;
          continue outer;
        }
        h -= ch;
        n += child.chunkSize();
      }
      return n;
    } while (!chunk.lines);
    for (var i = 0; i < chunk.lines.length; ++i) {
      var line = chunk.lines[i],
          lh = line.height;
      if (h < lh)
        break;
      h -= lh;
    }
    return n + i;
  }
  function heightAtLine(lineObj) {
    lineObj = visualLine(lineObj);
    var h = 0,
        chunk = lineObj.parent;
    for (var i = 0; i < chunk.lines.length; ++i) {
      var line = chunk.lines[i];
      if (line == lineObj)
        break;
      else
        h += line.height;
    }
    for (var p = chunk.parent; p; chunk = p, p = chunk.parent) {
      for (var i = 0; i < p.children.length; ++i) {
        var cur = p.children[i];
        if (cur == chunk)
          break;
        else
          h += cur.height;
      }
    }
    return h;
  }
  function getOrder(line) {
    var order = line.order;
    if (order == null)
      order = line.order = bidiOrdering(line.text);
    return order;
  }
  function History(startGen) {
    this.done = [];
    this.undone = [];
    this.undoDepth = Infinity;
    this.lastModTime = this.lastSelTime = 0;
    this.lastOp = this.lastSelOp = null;
    this.lastOrigin = this.lastSelOrigin = null;
    this.generation = this.maxGeneration = startGen || 1;
  }
  function historyChangeFromChange(doc, change) {
    var histChange = {
      from: copyPos(change.from),
      to: changeEnd(change),
      text: getBetween(doc, change.from, change.to)
    };
    attachLocalSpans(doc, histChange, change.from.line, change.to.line + 1);
    linkedDocs(doc, function(doc) {
      attachLocalSpans(doc, histChange, change.from.line, change.to.line + 1);
    }, true);
    return histChange;
  }
  function clearSelectionEvents(array) {
    while (array.length) {
      var last = lst(array);
      if (last.ranges)
        array.pop();
      else
        break;
    }
  }
  function lastChangeEvent(hist, force) {
    if (force) {
      clearSelectionEvents(hist.done);
      return lst(hist.done);
    } else if (hist.done.length && !lst(hist.done).ranges) {
      return lst(hist.done);
    } else if (hist.done.length > 1 && !hist.done[hist.done.length - 2].ranges) {
      hist.done.pop();
      return lst(hist.done);
    }
  }
  function addChangeToHistory(doc, change, selAfter, opId) {
    var hist = doc.history;
    hist.undone.length = 0;
    var time = +new Date,
        cur;
    if ((hist.lastOp == opId || hist.lastOrigin == change.origin && change.origin && ((change.origin.charAt(0) == "+" && doc.cm && hist.lastModTime > time - doc.cm.options.historyEventDelay) || change.origin.charAt(0) == "*")) && (cur = lastChangeEvent(hist, hist.lastOp == opId))) {
      var last = lst(cur.changes);
      if (cmp(change.from, change.to) == 0 && cmp(change.from, last.to) == 0) {
        last.to = changeEnd(change);
      } else {
        cur.changes.push(historyChangeFromChange(doc, change));
      }
    } else {
      var before = lst(hist.done);
      if (!before || !before.ranges)
        pushSelectionToHistory(doc.sel, hist.done);
      cur = {
        changes: [historyChangeFromChange(doc, change)],
        generation: hist.generation
      };
      hist.done.push(cur);
      while (hist.done.length > hist.undoDepth) {
        hist.done.shift();
        if (!hist.done[0].ranges)
          hist.done.shift();
      }
    }
    hist.done.push(selAfter);
    hist.generation = ++hist.maxGeneration;
    hist.lastModTime = hist.lastSelTime = time;
    hist.lastOp = hist.lastSelOp = opId;
    hist.lastOrigin = hist.lastSelOrigin = change.origin;
    if (!last)
      signal(doc, "historyAdded");
  }
  function selectionEventCanBeMerged(doc, origin, prev, sel) {
    var ch = origin.charAt(0);
    return ch == "*" || ch == "+" && prev.ranges.length == sel.ranges.length && prev.somethingSelected() == sel.somethingSelected() && new Date - doc.history.lastSelTime <= (doc.cm ? doc.cm.options.historyEventDelay : 500);
  }
  function addSelectionToHistory(doc, sel, opId, options) {
    var hist = doc.history,
        origin = options && options.origin;
    if (opId == hist.lastSelOp || (origin && hist.lastSelOrigin == origin && (hist.lastModTime == hist.lastSelTime && hist.lastOrigin == origin || selectionEventCanBeMerged(doc, origin, lst(hist.done), sel))))
      hist.done[hist.done.length - 1] = sel;
    else
      pushSelectionToHistory(sel, hist.done);
    hist.lastSelTime = +new Date;
    hist.lastSelOrigin = origin;
    hist.lastSelOp = opId;
    if (options && options.clearRedo !== false)
      clearSelectionEvents(hist.undone);
  }
  function pushSelectionToHistory(sel, dest) {
    var top = lst(dest);
    if (!(top && top.ranges && top.equals(sel)))
      dest.push(sel);
  }
  function attachLocalSpans(doc, change, from, to) {
    var existing = change["spans_" + doc.id],
        n = 0;
    doc.iter(Math.max(doc.first, from), Math.min(doc.first + doc.size, to), function(line) {
      if (line.markedSpans)
        (existing || (existing = change["spans_" + doc.id] = {}))[n] = line.markedSpans;
      ++n;
    });
  }
  function removeClearedSpans(spans) {
    if (!spans)
      return null;
    for (var i = 0,
        out; i < spans.length; ++i) {
      if (spans[i].marker.explicitlyCleared) {
        if (!out)
          out = spans.slice(0, i);
      } else if (out)
        out.push(spans[i]);
    }
    return !out ? spans : out.length ? out : null;
  }
  function getOldSpans(doc, change) {
    var found = change["spans_" + doc.id];
    if (!found)
      return null;
    for (var i = 0,
        nw = []; i < change.text.length; ++i)
      nw.push(removeClearedSpans(found[i]));
    return nw;
  }
  function copyHistoryArray(events, newGroup, instantiateSel) {
    for (var i = 0,
        copy = []; i < events.length; ++i) {
      var event = events[i];
      if (event.ranges) {
        copy.push(instantiateSel ? Selection.prototype.deepCopy.call(event) : event);
        continue;
      }
      var changes = event.changes,
          newChanges = [];
      copy.push({changes: newChanges});
      for (var j = 0; j < changes.length; ++j) {
        var change = changes[j],
            m;
        newChanges.push({
          from: change.from,
          to: change.to,
          text: change.text
        });
        if (newGroup)
          for (var prop in change)
            if (m = prop.match(/^spans_(\d+)$/)) {
              if (indexOf(newGroup, Number(m[1])) > -1) {
                lst(newChanges)[prop] = change[prop];
                delete change[prop];
              }
            }
      }
    }
    return copy;
  }
  function rebaseHistSelSingle(pos, from, to, diff) {
    if (to < pos.line) {
      pos.line += diff;
    } else if (from < pos.line) {
      pos.line = from;
      pos.ch = 0;
    }
  }
  function rebaseHistArray(array, from, to, diff) {
    for (var i = 0; i < array.length; ++i) {
      var sub = array[i],
          ok = true;
      if (sub.ranges) {
        if (!sub.copied) {
          sub = array[i] = sub.deepCopy();
          sub.copied = true;
        }
        for (var j = 0; j < sub.ranges.length; j++) {
          rebaseHistSelSingle(sub.ranges[j].anchor, from, to, diff);
          rebaseHistSelSingle(sub.ranges[j].head, from, to, diff);
        }
        continue;
      }
      for (var j = 0; j < sub.changes.length; ++j) {
        var cur = sub.changes[j];
        if (to < cur.from.line) {
          cur.from = Pos(cur.from.line + diff, cur.from.ch);
          cur.to = Pos(cur.to.line + diff, cur.to.ch);
        } else if (from <= cur.to.line) {
          ok = false;
          break;
        }
      }
      if (!ok) {
        array.splice(0, i + 1);
        i = 0;
      }
    }
  }
  function rebaseHist(hist, change) {
    var from = change.from.line,
        to = change.to.line,
        diff = change.text.length - (to - from) - 1;
    rebaseHistArray(hist.done, from, to, diff);
    rebaseHistArray(hist.undone, from, to, diff);
  }
  var e_preventDefault = CodeMirror.e_preventDefault = function(e) {
    if (e.preventDefault)
      e.preventDefault();
    else
      e.returnValue = false;
  };
  var e_stopPropagation = CodeMirror.e_stopPropagation = function(e) {
    if (e.stopPropagation)
      e.stopPropagation();
    else
      e.cancelBubble = true;
  };
  function e_defaultPrevented(e) {
    return e.defaultPrevented != null ? e.defaultPrevented : e.returnValue == false;
  }
  var e_stop = CodeMirror.e_stop = function(e) {
    e_preventDefault(e);
    e_stopPropagation(e);
  };
  function e_target(e) {
    return e.target || e.srcElement;
  }
  function e_button(e) {
    var b = e.which;
    if (b == null) {
      if (e.button & 1)
        b = 1;
      else if (e.button & 2)
        b = 3;
      else if (e.button & 4)
        b = 2;
    }
    if (mac && e.ctrlKey && b == 1)
      b = 3;
    return b;
  }
  var on = CodeMirror.on = function(emitter, type, f) {
    if (emitter.addEventListener)
      emitter.addEventListener(type, f, false);
    else if (emitter.attachEvent)
      emitter.attachEvent("on" + type, f);
    else {
      var map = emitter._handlers || (emitter._handlers = {});
      var arr = map[type] || (map[type] = []);
      arr.push(f);
    }
  };
  var noHandlers = [];
  function getHandlers(emitter, type, copy) {
    var arr = emitter._handlers && emitter._handlers[type];
    if (copy)
      return arr && arr.length > 0 ? arr.slice() : noHandlers;
    else
      return arr || noHandlers;
  }
  var off = CodeMirror.off = function(emitter, type, f) {
    if (emitter.removeEventListener)
      emitter.removeEventListener(type, f, false);
    else if (emitter.detachEvent)
      emitter.detachEvent("on" + type, f);
    else {
      var handlers = getHandlers(emitter, type, false);
      for (var i = 0; i < handlers.length; ++i)
        if (handlers[i] == f) {
          handlers.splice(i, 1);
          break;
        }
    }
  };
  var signal = CodeMirror.signal = function(emitter, type) {
    var handlers = getHandlers(emitter, type, true);
    if (!handlers.length)
      return;
    var args = Array.prototype.slice.call(arguments, 2);
    for (var i = 0; i < handlers.length; ++i)
      handlers[i].apply(null, args);
  };
  var orphanDelayedCallbacks = null;
  function signalLater(emitter, type) {
    var arr = getHandlers(emitter, type, false);
    if (!arr.length)
      return;
    var args = Array.prototype.slice.call(arguments, 2),
        list;
    if (operationGroup) {
      list = operationGroup.delayedCallbacks;
    } else if (orphanDelayedCallbacks) {
      list = orphanDelayedCallbacks;
    } else {
      list = orphanDelayedCallbacks = [];
      setTimeout(fireOrphanDelayed, 0);
    }
    function bnd(f) {
      return function() {
        f.apply(null, args);
      };
    }
    ;
    for (var i = 0; i < arr.length; ++i)
      list.push(bnd(arr[i]));
  }
  function fireOrphanDelayed() {
    var delayed = orphanDelayedCallbacks;
    orphanDelayedCallbacks = null;
    for (var i = 0; i < delayed.length; ++i)
      delayed[i]();
  }
  function signalDOMEvent(cm, e, override) {
    if (typeof e == "string")
      e = {
        type: e,
        preventDefault: function() {
          this.defaultPrevented = true;
        }
      };
    signal(cm, override || e.type, cm, e);
    return e_defaultPrevented(e) || e.codemirrorIgnore;
  }
  function signalCursorActivity(cm) {
    var arr = cm._handlers && cm._handlers.cursorActivity;
    if (!arr)
      return;
    var set = cm.curOp.cursorActivityHandlers || (cm.curOp.cursorActivityHandlers = []);
    for (var i = 0; i < arr.length; ++i)
      if (indexOf(set, arr[i]) == -1)
        set.push(arr[i]);
  }
  function hasHandler(emitter, type) {
    return getHandlers(emitter, type).length > 0;
  }
  function eventMixin(ctor) {
    ctor.prototype.on = function(type, f) {
      on(this, type, f);
    };
    ctor.prototype.off = function(type, f) {
      off(this, type, f);
    };
  }
  var scrollerGap = 30;
  var Pass = CodeMirror.Pass = {toString: function() {
      return "CodeMirror.Pass";
    }};
  var sel_dontScroll = {scroll: false},
      sel_mouse = {origin: "*mouse"},
      sel_move = {origin: "+move"};
  function Delayed() {
    this.id = null;
  }
  Delayed.prototype.set = function(ms, f) {
    clearTimeout(this.id);
    this.id = setTimeout(f, ms);
  };
  var countColumn = CodeMirror.countColumn = function(string, end, tabSize, startIndex, startValue) {
    if (end == null) {
      end = string.search(/[^\s\u00a0]/);
      if (end == -1)
        end = string.length;
    }
    for (var i = startIndex || 0,
        n = startValue || 0; ; ) {
      var nextTab = string.indexOf("\t", i);
      if (nextTab < 0 || nextTab >= end)
        return n + (end - i);
      n += nextTab - i;
      n += tabSize - (n % tabSize);
      i = nextTab + 1;
    }
  };
  var findColumn = CodeMirror.findColumn = function(string, goal, tabSize) {
    for (var pos = 0,
        col = 0; ; ) {
      var nextTab = string.indexOf("\t", pos);
      if (nextTab == -1)
        nextTab = string.length;
      var skipped = nextTab - pos;
      if (nextTab == string.length || col + skipped >= goal)
        return pos + Math.min(skipped, goal - col);
      col += nextTab - pos;
      col += tabSize - (col % tabSize);
      pos = nextTab + 1;
      if (col >= goal)
        return pos;
    }
  };
  var spaceStrs = [""];
  function spaceStr(n) {
    while (spaceStrs.length <= n)
      spaceStrs.push(lst(spaceStrs) + " ");
    return spaceStrs[n];
  }
  function lst(arr) {
    return arr[arr.length - 1];
  }
  var selectInput = function(node) {
    node.select();
  };
  if (ios)
    selectInput = function(node) {
      node.selectionStart = 0;
      node.selectionEnd = node.value.length;
    };
  else if (ie)
    selectInput = function(node) {
      try {
        node.select();
      } catch (_e) {}
    };
  function indexOf(array, elt) {
    for (var i = 0; i < array.length; ++i)
      if (array[i] == elt)
        return i;
    return -1;
  }
  function map(array, f) {
    var out = [];
    for (var i = 0; i < array.length; i++)
      out[i] = f(array[i], i);
    return out;
  }
  function nothing() {}
  function createObj(base, props) {
    var inst;
    if (Object.create) {
      inst = Object.create(base);
    } else {
      nothing.prototype = base;
      inst = new nothing();
    }
    if (props)
      copyObj(props, inst);
    return inst;
  }
  ;
  function copyObj(obj, target, overwrite) {
    if (!target)
      target = {};
    for (var prop in obj)
      if (obj.hasOwnProperty(prop) && (overwrite !== false || !target.hasOwnProperty(prop)))
        target[prop] = obj[prop];
    return target;
  }
  function bind(f) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function() {
      return f.apply(null, args);
    };
  }
  var nonASCIISingleCaseWordChar = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
  var isWordCharBasic = CodeMirror.isWordChar = function(ch) {
    return /\w/.test(ch) || ch > "\x80" && (ch.toUpperCase() != ch.toLowerCase() || nonASCIISingleCaseWordChar.test(ch));
  };
  function isWordChar(ch, helper) {
    if (!helper)
      return isWordCharBasic(ch);
    if (helper.source.indexOf("\\w") > -1 && isWordCharBasic(ch))
      return true;
    return helper.test(ch);
  }
  function isEmpty(obj) {
    for (var n in obj)
      if (obj.hasOwnProperty(n) && obj[n])
        return false;
    return true;
  }
  var extendingChars = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
  function isExtendingChar(ch) {
    return ch.charCodeAt(0) >= 768 && extendingChars.test(ch);
  }
  function elt(tag, content, className, style) {
    var e = document.createElement(tag);
    if (className)
      e.className = className;
    if (style)
      e.style.cssText = style;
    if (typeof content == "string")
      e.appendChild(document.createTextNode(content));
    else if (content)
      for (var i = 0; i < content.length; ++i)
        e.appendChild(content[i]);
    return e;
  }
  var range;
  if (document.createRange)
    range = function(node, start, end, endNode) {
      var r = document.createRange();
      r.setEnd(endNode || node, end);
      r.setStart(node, start);
      return r;
    };
  else
    range = function(node, start, end) {
      var r = document.body.createTextRange();
      try {
        r.moveToElementText(node.parentNode);
      } catch (e) {
        return r;
      }
      r.collapse(true);
      r.moveEnd("character", end);
      r.moveStart("character", start);
      return r;
    };
  function removeChildren(e) {
    for (var count = e.childNodes.length; count > 0; --count)
      e.removeChild(e.firstChild);
    return e;
  }
  function removeChildrenAndAdd(parent, e) {
    return removeChildren(parent).appendChild(e);
  }
  var contains = CodeMirror.contains = function(parent, child) {
    if (child.nodeType == 3)
      child = child.parentNode;
    if (parent.contains)
      return parent.contains(child);
    do {
      if (child.nodeType == 11)
        child = child.host;
      if (child == parent)
        return true;
    } while (child = child.parentNode);
  };
  function activeElt() {
    var activeElement = document.activeElement;
    while (activeElement && activeElement.root && activeElement.root.activeElement)
      activeElement = activeElement.root.activeElement;
    return activeElement;
  }
  if (ie && ie_version < 11)
    activeElt = function() {
      try {
        return document.activeElement;
      } catch (e) {
        return document.body;
      }
    };
  function classTest(cls) {
    return new RegExp("(^|\\s)" + cls + "(?:$|\\s)\\s*");
  }
  var rmClass = CodeMirror.rmClass = function(node, cls) {
    var current = node.className;
    var match = classTest(cls).exec(current);
    if (match) {
      var after = current.slice(match.index + match[0].length);
      node.className = current.slice(0, match.index) + (after ? match[1] + after : "");
    }
  };
  var addClass = CodeMirror.addClass = function(node, cls) {
    var current = node.className;
    if (!classTest(cls).test(current))
      node.className += (current ? " " : "") + cls;
  };
  function joinClasses(a, b) {
    var as = a.split(" ");
    for (var i = 0; i < as.length; i++)
      if (as[i] && !classTest(as[i]).test(b))
        b += " " + as[i];
    return b;
  }
  function forEachCodeMirror(f) {
    if (!document.body.getElementsByClassName)
      return;
    var byClass = document.body.getElementsByClassName("CodeMirror");
    for (var i = 0; i < byClass.length; i++) {
      var cm = byClass[i].CodeMirror;
      if (cm)
        f(cm);
    }
  }
  var globalsRegistered = false;
  function ensureGlobalHandlers() {
    if (globalsRegistered)
      return;
    registerGlobalHandlers();
    globalsRegistered = true;
  }
  function registerGlobalHandlers() {
    var resizeTimer;
    on(window, "resize", function() {
      if (resizeTimer == null)
        resizeTimer = setTimeout(function() {
          resizeTimer = null;
          forEachCodeMirror(onResize);
        }, 100);
    });
    on(window, "blur", function() {
      forEachCodeMirror(onBlur);
    });
  }
  var dragAndDrop = function() {
    if (ie && ie_version < 9)
      return false;
    var div = elt('div');
    return "draggable" in div || "dragDrop" in div;
  }();
  var zwspSupported;
  function zeroWidthElement(measure) {
    if (zwspSupported == null) {
      var test = elt("span", "\u200b");
      removeChildrenAndAdd(measure, elt("span", [test, document.createTextNode("x")]));
      if (measure.firstChild.offsetHeight != 0)
        zwspSupported = test.offsetWidth <= 1 && test.offsetHeight > 2 && !(ie && ie_version < 8);
    }
    var node = zwspSupported ? elt("span", "\u200b") : elt("span", "\u00a0", null, "display: inline-block; width: 1px; margin-right: -1px");
    node.setAttribute("cm-text", "");
    return node;
  }
  var badBidiRects;
  function hasBadBidiRects(measure) {
    if (badBidiRects != null)
      return badBidiRects;
    var txt = removeChildrenAndAdd(measure, document.createTextNode("A\u062eA"));
    var r0 = range(txt, 0, 1).getBoundingClientRect();
    if (!r0 || r0.left == r0.right)
      return false;
    var r1 = range(txt, 1, 2).getBoundingClientRect();
    return badBidiRects = (r1.right - r0.right < 3);
  }
  var splitLinesAuto = CodeMirror.splitLines = "\n\nb".split(/\n/).length != 3 ? function(string) {
    var pos = 0,
        result = [],
        l = string.length;
    while (pos <= l) {
      var nl = string.indexOf("\n", pos);
      if (nl == -1)
        nl = string.length;
      var line = string.slice(pos, string.charAt(nl - 1) == "\r" ? nl - 1 : nl);
      var rt = line.indexOf("\r");
      if (rt != -1) {
        result.push(line.slice(0, rt));
        pos += rt + 1;
      } else {
        result.push(line);
        pos = nl + 1;
      }
    }
    return result;
  } : function(string) {
    return string.split(/\r\n?|\n/);
  };
  var hasSelection = window.getSelection ? function(te) {
    try {
      return te.selectionStart != te.selectionEnd;
    } catch (e) {
      return false;
    }
  } : function(te) {
    try {
      var range = te.ownerDocument.selection.createRange();
    } catch (e) {}
    if (!range || range.parentElement() != te)
      return false;
    return range.compareEndPoints("StartToEnd", range) != 0;
  };
  var hasCopyEvent = (function() {
    var e = elt("div");
    if ("oncopy" in e)
      return true;
    e.setAttribute("oncopy", "return;");
    return typeof e.oncopy == "function";
  })();
  var badZoomedRects = null;
  function hasBadZoomedRects(measure) {
    if (badZoomedRects != null)
      return badZoomedRects;
    var node = removeChildrenAndAdd(measure, elt("span", "x"));
    var normal = node.getBoundingClientRect();
    var fromRange = range(node, 0, 1).getBoundingClientRect();
    return badZoomedRects = Math.abs(normal.left - fromRange.left) > 1;
  }
  var keyNames = CodeMirror.keyNames = {
    3: "Enter",
    8: "Backspace",
    9: "Tab",
    13: "Enter",
    16: "Shift",
    17: "Ctrl",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Esc",
    32: "Space",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "Left",
    38: "Up",
    39: "Right",
    40: "Down",
    44: "PrintScrn",
    45: "Insert",
    46: "Delete",
    59: ";",
    61: "=",
    91: "Mod",
    92: "Mod",
    93: "Mod",
    106: "*",
    107: "=",
    109: "-",
    110: ".",
    111: "/",
    127: "Delete",
    173: "-",
    186: ";",
    187: "=",
    188: ",",
    189: "-",
    190: ".",
    191: "/",
    192: "`",
    219: "[",
    220: "\\",
    221: "]",
    222: "'",
    63232: "Up",
    63233: "Down",
    63234: "Left",
    63235: "Right",
    63272: "Delete",
    63273: "Home",
    63275: "End",
    63276: "PageUp",
    63277: "PageDown",
    63302: "Insert"
  };
  (function() {
    for (var i = 0; i < 10; i++)
      keyNames[i + 48] = keyNames[i + 96] = String(i);
    for (var i = 65; i <= 90; i++)
      keyNames[i] = String.fromCharCode(i);
    for (var i = 1; i <= 12; i++)
      keyNames[i + 111] = keyNames[i + 63235] = "F" + i;
  })();
  function iterateBidiSections(order, from, to, f) {
    if (!order)
      return f(from, to, "ltr");
    var found = false;
    for (var i = 0; i < order.length; ++i) {
      var part = order[i];
      if (part.from < to && part.to > from || from == to && part.to == from) {
        f(Math.max(part.from, from), Math.min(part.to, to), part.level == 1 ? "rtl" : "ltr");
        found = true;
      }
    }
    if (!found)
      f(from, to, "ltr");
  }
  function bidiLeft(part) {
    return part.level % 2 ? part.to : part.from;
  }
  function bidiRight(part) {
    return part.level % 2 ? part.from : part.to;
  }
  function lineLeft(line) {
    var order = getOrder(line);
    return order ? bidiLeft(order[0]) : 0;
  }
  function lineRight(line) {
    var order = getOrder(line);
    if (!order)
      return line.text.length;
    return bidiRight(lst(order));
  }
  function lineStart(cm, lineN) {
    var line = getLine(cm.doc, lineN);
    var visual = visualLine(line);
    if (visual != line)
      lineN = lineNo(visual);
    var order = getOrder(visual);
    var ch = !order ? 0 : order[0].level % 2 ? lineRight(visual) : lineLeft(visual);
    return Pos(lineN, ch);
  }
  function lineEnd(cm, lineN) {
    var merged,
        line = getLine(cm.doc, lineN);
    while (merged = collapsedSpanAtEnd(line)) {
      line = merged.find(1, true).line;
      lineN = null;
    }
    var order = getOrder(line);
    var ch = !order ? line.text.length : order[0].level % 2 ? lineLeft(line) : lineRight(line);
    return Pos(lineN == null ? lineNo(line) : lineN, ch);
  }
  function lineStartSmart(cm, pos) {
    var start = lineStart(cm, pos.line);
    var line = getLine(cm.doc, start.line);
    var order = getOrder(line);
    if (!order || order[0].level == 0) {
      var firstNonWS = Math.max(0, line.text.search(/\S/));
      var inWS = pos.line == start.line && pos.ch <= firstNonWS && pos.ch;
      return Pos(start.line, inWS ? 0 : firstNonWS);
    }
    return start;
  }
  function compareBidiLevel(order, a, b) {
    var linedir = order[0].level;
    if (a == linedir)
      return true;
    if (b == linedir)
      return false;
    return a < b;
  }
  var bidiOther;
  function getBidiPartAt(order, pos) {
    bidiOther = null;
    for (var i = 0,
        found; i < order.length; ++i) {
      var cur = order[i];
      if (cur.from < pos && cur.to > pos)
        return i;
      if ((cur.from == pos || cur.to == pos)) {
        if (found == null) {
          found = i;
        } else if (compareBidiLevel(order, cur.level, order[found].level)) {
          if (cur.from != cur.to)
            bidiOther = found;
          return i;
        } else {
          if (cur.from != cur.to)
            bidiOther = i;
          return found;
        }
      }
    }
    return found;
  }
  function moveInLine(line, pos, dir, byUnit) {
    if (!byUnit)
      return pos + dir;
    do
      pos += dir;
 while (pos > 0 && isExtendingChar(line.text.charAt(pos)));
    return pos;
  }
  function moveVisually(line, start, dir, byUnit) {
    var bidi = getOrder(line);
    if (!bidi)
      return moveLogically(line, start, dir, byUnit);
    var pos = getBidiPartAt(bidi, start),
        part = bidi[pos];
    var target = moveInLine(line, start, part.level % 2 ? -dir : dir, byUnit);
    for (; ; ) {
      if (target > part.from && target < part.to)
        return target;
      if (target == part.from || target == part.to) {
        if (getBidiPartAt(bidi, target) == pos)
          return target;
        part = bidi[pos += dir];
        return (dir > 0) == part.level % 2 ? part.to : part.from;
      } else {
        part = bidi[pos += dir];
        if (!part)
          return null;
        if ((dir > 0) == part.level % 2)
          target = moveInLine(line, part.to, -1, byUnit);
        else
          target = moveInLine(line, part.from, 1, byUnit);
      }
    }
  }
  function moveLogically(line, start, dir, byUnit) {
    var target = start + dir;
    if (byUnit)
      while (target > 0 && isExtendingChar(line.text.charAt(target)))
        target += dir;
    return target < 0 || target > line.text.length ? null : target;
  }
  var bidiOrdering = (function() {
    var lowTypes = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN";
    var arabicTypes = "rrrrrrrrrrrr,rNNmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmrrrrrrrnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmNmmmm";
    function charType(code) {
      if (code <= 0xf7)
        return lowTypes.charAt(code);
      else if (0x590 <= code && code <= 0x5f4)
        return "R";
      else if (0x600 <= code && code <= 0x6ed)
        return arabicTypes.charAt(code - 0x600);
      else if (0x6ee <= code && code <= 0x8ac)
        return "r";
      else if (0x2000 <= code && code <= 0x200b)
        return "w";
      else if (code == 0x200c)
        return "b";
      else
        return "L";
    }
    var bidiRE = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
    var isNeutral = /[stwN]/,
        isStrong = /[LRr]/,
        countsAsLeft = /[Lb1n]/,
        countsAsNum = /[1n]/;
    var outerType = "L";
    function BidiSpan(level, from, to) {
      this.level = level;
      this.from = from;
      this.to = to;
    }
    return function(str) {
      if (!bidiRE.test(str))
        return false;
      var len = str.length,
          types = [];
      for (var i = 0,
          type; i < len; ++i)
        types.push(type = charType(str.charCodeAt(i)));
      for (var i = 0,
          prev = outerType; i < len; ++i) {
        var type = types[i];
        if (type == "m")
          types[i] = prev;
        else
          prev = type;
      }
      for (var i = 0,
          cur = outerType; i < len; ++i) {
        var type = types[i];
        if (type == "1" && cur == "r")
          types[i] = "n";
        else if (isStrong.test(type)) {
          cur = type;
          if (type == "r")
            types[i] = "R";
        }
      }
      for (var i = 1,
          prev = types[0]; i < len - 1; ++i) {
        var type = types[i];
        if (type == "+" && prev == "1" && types[i + 1] == "1")
          types[i] = "1";
        else if (type == "," && prev == types[i + 1] && (prev == "1" || prev == "n"))
          types[i] = prev;
        prev = type;
      }
      for (var i = 0; i < len; ++i) {
        var type = types[i];
        if (type == ",")
          types[i] = "N";
        else if (type == "%") {
          for (var end = i + 1; end < len && types[end] == "%"; ++end) {}
          var replace = (i && types[i - 1] == "!") || (end < len && types[end] == "1") ? "1" : "N";
          for (var j = i; j < end; ++j)
            types[j] = replace;
          i = end - 1;
        }
      }
      for (var i = 0,
          cur = outerType; i < len; ++i) {
        var type = types[i];
        if (cur == "L" && type == "1")
          types[i] = "L";
        else if (isStrong.test(type))
          cur = type;
      }
      for (var i = 0; i < len; ++i) {
        if (isNeutral.test(types[i])) {
          for (var end = i + 1; end < len && isNeutral.test(types[end]); ++end) {}
          var before = (i ? types[i - 1] : outerType) == "L";
          var after = (end < len ? types[end] : outerType) == "L";
          var replace = before || after ? "L" : "R";
          for (var j = i; j < end; ++j)
            types[j] = replace;
          i = end - 1;
        }
      }
      var order = [],
          m;
      for (var i = 0; i < len; ) {
        if (countsAsLeft.test(types[i])) {
          var start = i;
          for (++i; i < len && countsAsLeft.test(types[i]); ++i) {}
          order.push(new BidiSpan(0, start, i));
        } else {
          var pos = i,
              at = order.length;
          for (++i; i < len && types[i] != "L"; ++i) {}
          for (var j = pos; j < i; ) {
            if (countsAsNum.test(types[j])) {
              if (pos < j)
                order.splice(at, 0, new BidiSpan(1, pos, j));
              var nstart = j;
              for (++j; j < i && countsAsNum.test(types[j]); ++j) {}
              order.splice(at, 0, new BidiSpan(2, nstart, j));
              pos = j;
            } else
              ++j;
          }
          if (pos < i)
            order.splice(at, 0, new BidiSpan(1, pos, i));
        }
      }
      if (order[0].level == 1 && (m = str.match(/^\s+/))) {
        order[0].from = m[0].length;
        order.unshift(new BidiSpan(0, 0, m[0].length));
      }
      if (lst(order).level == 1 && (m = str.match(/\s+$/))) {
        lst(order).to -= m[0].length;
        order.push(new BidiSpan(0, len - m[0].length, len));
      }
      if (order[0].level == 2)
        order.unshift(new BidiSpan(1, order[0].to, order[0].to));
      if (order[0].level != lst(order).level)
        order.push(new BidiSpan(order[0].level, len, len));
      return order;
    };
  })();
  CodeMirror.version = "5.8.0";
  return CodeMirror;
});

_removeDefine();
})();
$__System.register('1', ['2', '3', '4', '5'], function (_export) {
	//
	'use strict';

	var beautify, jsonlint, _js, CodeMirror, doc;

	return {
		setters: [function (_4) {
			beautify = _4.js_beautify;
		}, function (_3) {
			jsonlint = _3['default'];
		}, function (_2) {
			_js = _2['default'];
		}, function (_) {
			CodeMirror = _['default'];
		}],
		execute: function () {
			doc = document;

			window.app = new ((function () {
				function Main() {
					var _this = this;

					babelHelpers.classCallCheck(this, Main);

					var form = doc.forms.main,
					    code = form.code;

					var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
						lineNumbers: true,
						styleActiveLine: true,
						matchBrackets: true
					});

					form.addEventListener('submit', function (evt) {
						evt.preventDefault();
						editor.setValue(beautify(code.value));
						try {
							jsonlint.parse(code.value);
							_this.notify(true, 'Valid JSON');
						} catch (e) {
							_this.notify(false, e);
						}
					});
				}

				babelHelpers.createClass(Main, [{
					key: 'notify',
					value: function notify(success, text) {
						var result = doc.querySelector('#result');
						result.classList.toggle('success', success);
						result.classList.toggle('error', !success);
						result.innerHTML = text;
					}
				}]);
				return Main;
			})())();
		}
	};
});

})
(function(factory) {
  factory();
});