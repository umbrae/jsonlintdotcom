var template = require('lodash.template');

function _compileDecls() {
  var decls =  require('./decls.json');
  var templateVars = decls
    .filter(function (decl) {
      return !decl.combined;
    })
    .reduce(function (map, decl) {
      map[decl.prop.replace(/\-/g, '')] = decl.initial;
      return map;
    }, {});
  return decls.map(function (decl) {
    if(decl.combined) {
      var t = template(decl.initial.replace(/\-/g, ''));
      decl.initial = t(templateVars);
    }
    return decl;
  });
}

var compiledDecls = _compileDecls();

function _clearDecls(rules) {
  return rules.map(function (rule) {
    return {
      prop:  rule.prop,
      value: rule.initial
    };
  });
}

function _allDecls(onlyInherited) {
  return compiledDecls.filter(function (decl) {
    var allowed = decl.combined || decl.basic;
    if(onlyInherited) return allowed && decl.inherited;
    return allowed;
  });
}

function _concreteDecl(declName) {
  return compiledDecls.filter(function (decl) {
    return declName === decl.prop;
  });
}

function makeFallbackFunction(onlyInherited) {
  return function (declName) {
    var result;
    if (declName === 'all') {
      result = _allDecls(onlyInherited);
    }else {
      result = _concreteDecl(declName);
    }
    return _clearDecls(result);
  };
}

module.exports = makeFallbackFunction;
