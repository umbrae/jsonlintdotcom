/**
 * Module dependencies.
 */
var postcss = require("postcss")
var colorString = require("color-string")

/**
 * Constantes
 */
var RGBA = /rgba\s*\((\s*(\d+)\s*(,)\s*){3}(\s*(\d?\.\d+)\s*)\)$/i

/**
 * PostCSS plugin to transform rgba() to hexadecimal
 */
module.exports = postcss.plugin("postcss-color-rgba-fallback",
function(options) {
  options = options || {}

  var properties = options.properties || [
    "background-color",
    "background",
    "color",
    "border",
    "border-color",
    "outline",
    "outline-color",
  ]

  return function(style) {
    style.walkDecls(function(decl) {
      if (!decl.value ||
          decl.value.indexOf("rgba") === -1 ||
          properties.indexOf(decl.prop) === -1
      ) {
        return
      }

      // if previous prop equals current prop
      // no need fallback
      if (
        decl.prev() &&
        decl.prev().prop === decl.prop
      ) {
        return
      }

      var value = transformRgba(decl.value)
      if (value) {
        decl.cloneBefore({value: value})
      }
    })
  }
})

/**
 * transform rgba() to hexadecimal.
 *
 * @param  {String} string declaration value
 * @return {String}        converted declaration value to hexadecimal
 */
function transformRgba(string) {
  var value = RGBA.exec(string)
  if (!value) {
    return
  }

  var rgb = colorString.getRgb(value[0])
  var hex = colorString.hexString(rgb)
  hex = string.replace(RGBA, hex)

  return (hex)
}
