/**
 * @file Party settings seneca plugin
 * @copyright Digital Living Software Corp. 2014-2016
 */

var FacetsSenecaPlugin = require('../lib/src/run/FacetsSenecaPlugin').FacetsSenecaPlugin;
var plugin = new FacetsSenecaPlugin();

module.exports = plugin.entry();