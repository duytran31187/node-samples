// need to compile js file by running command: npx tsc mapTypescript.t
// then run: node mapTypescript.js
var ExtrasTypes;
(function (ExtrasTypes) {
    ExtrasTypes["FIXED_TYPE"] = "fixed";
    ExtrasTypes["PERCENTAGE_TYPE"] = "percentage";
})(ExtrasTypes || (ExtrasTypes = {}));
var dataProviders = new Map();
dataProviders.set(ExtrasTypes.FIXED_TYPE, function (data) { console.log("fixed data ".concat(data)); });
dataProviders.set(ExtrasTypes.PERCENTAGE_TYPE, function (data) { console.log("percentage data ".concat(data)); });
var fixedFunc = dataProviders.get(ExtrasTypes.FIXED_TYPE);
fixedFunc(10);
var percentageFunc = dataProviders.get(ExtrasTypes.PERCENTAGE_TYPE);
percentageFunc(10);
