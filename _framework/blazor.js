/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MonoPlatform_1 = __webpack_require__(7);
exports.platform = MonoPlatform_1.monoPlatform;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var InternalRegisteredFunction_1 = __webpack_require__(8);
var registeredFunctions = {};
function registerFunction(identifier, implementation) {
    if (InternalRegisteredFunction_1.internalRegisteredFunctions.hasOwnProperty(identifier)) {
        throw new Error("The function identifier '" + identifier + "' is reserved and cannot be registered.");
    }
    if (registeredFunctions.hasOwnProperty(identifier)) {
        throw new Error("A function with the identifier '" + identifier + "' has already been registered.");
    }
    registeredFunctions[identifier] = implementation;
}
exports.registerFunction = registerFunction;
function getRegisteredFunction(identifier) {
    // By prioritising the internal ones, we ensure you can't override them
    var result = InternalRegisteredFunction_1.internalRegisteredFunctions[identifier] || registeredFunctions[identifier];
    if (result) {
        return result;
    }
    else {
        throw new Error("Could not find registered function with name '" + identifier + "'.");
    }
}
exports.getRegisteredFunction = getRegisteredFunction;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function getAssemblyNameFromUrl(url) {
    var lastSegment = url.substring(url.lastIndexOf('/') + 1);
    var queryStringStartPos = lastSegment.indexOf('?');
    var filename = queryStringStartPos < 0 ? lastSegment : lastSegment.substring(0, queryStringStartPos);
    return filename.replace(/\.dll$/, '');
}
exports.getAssemblyNameFromUrl = getAssemblyNameFromUrl;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function applyCaptureIdToElement(element, referenceCaptureId) {
    element.setAttribute(getCaptureIdAttributeName(referenceCaptureId), '');
}
exports.applyCaptureIdToElement = applyCaptureIdToElement;
function getElementByCaptureId(referenceCaptureId) {
    var selector = "[" + getCaptureIdAttributeName(referenceCaptureId) + "]";
    return document.querySelector(selector);
}
exports.getElementByCaptureId = getElementByCaptureId;
function getCaptureIdAttributeName(referenceCaptureId) {
    return "_bl_" + referenceCaptureId;
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Environment_1 = __webpack_require__(0);
var RenderBatch_1 = __webpack_require__(10);
var BrowserRenderer_1 = __webpack_require__(11);
var browserRenderers = {};
function attachRootComponentToElement(browserRendererId, elementSelector, componentId) {
    var elementSelectorJs = Environment_1.platform.toJavaScriptString(elementSelector);
    var element = document.querySelector(elementSelectorJs);
    if (!element) {
        throw new Error("Could not find any element matching selector '" + elementSelectorJs + "'.");
    }
    var browserRenderer = browserRenderers[browserRendererId];
    if (!browserRenderer) {
        browserRenderer = browserRenderers[browserRendererId] = new BrowserRenderer_1.BrowserRenderer(browserRendererId);
    }
    clearElement(element);
    browserRenderer.attachRootComponentToElement(componentId, element);
}
exports.attachRootComponentToElement = attachRootComponentToElement;
function renderBatch(browserRendererId, batch) {
    var browserRenderer = browserRenderers[browserRendererId];
    if (!browserRenderer) {
        throw new Error("There is no browser renderer with ID " + browserRendererId + ".");
    }
    var updatedComponents = RenderBatch_1.renderBatch.updatedComponents(batch);
    var updatedComponentsLength = RenderBatch_1.arrayRange.count(updatedComponents);
    var updatedComponentsArray = RenderBatch_1.arrayRange.array(updatedComponents);
    var referenceFramesStruct = RenderBatch_1.renderBatch.referenceFrames(batch);
    var referenceFrames = RenderBatch_1.arrayRange.array(referenceFramesStruct);
    for (var i = 0; i < updatedComponentsLength; i++) {
        var diff = Environment_1.platform.getArrayEntryPtr(updatedComponentsArray, i, RenderBatch_1.renderTreeDiffStructLength);
        var componentId = RenderBatch_1.renderTreeDiff.componentId(diff);
        var editsArraySegment = RenderBatch_1.renderTreeDiff.edits(diff);
        var edits = RenderBatch_1.arraySegment.array(editsArraySegment);
        var editsOffset = RenderBatch_1.arraySegment.offset(editsArraySegment);
        var editsLength = RenderBatch_1.arraySegment.count(editsArraySegment);
        browserRenderer.updateComponent(componentId, edits, editsOffset, editsLength, referenceFrames);
    }
    var disposedComponentIds = RenderBatch_1.renderBatch.disposedComponentIds(batch);
    var disposedComponentIdsLength = RenderBatch_1.arrayRange.count(disposedComponentIds);
    var disposedComponentIdsArray = RenderBatch_1.arrayRange.array(disposedComponentIds);
    for (var i = 0; i < disposedComponentIdsLength; i++) {
        var componentIdPtr = Environment_1.platform.getArrayEntryPtr(disposedComponentIdsArray, i, 4);
        var componentId = Environment_1.platform.readInt32Field(componentIdPtr);
        browserRenderer.disposeComponent(componentId);
    }
    var disposedEventHandlerIds = RenderBatch_1.renderBatch.disposedEventHandlerIds(batch);
    var disposedEventHandlerIdsLength = RenderBatch_1.arrayRange.count(disposedEventHandlerIds);
    var disposedEventHandlerIdsArray = RenderBatch_1.arrayRange.array(disposedEventHandlerIds);
    for (var i = 0; i < disposedEventHandlerIdsLength; i++) {
        var eventHandlerIdPtr = Environment_1.platform.getArrayEntryPtr(disposedEventHandlerIdsArray, i, 4);
        var eventHandlerId = Environment_1.platform.readInt32Field(eventHandlerIdPtr);
        browserRenderer.disposeEventHandler(eventHandlerId);
    }
}
exports.renderBatch = renderBatch;
function clearElement(element) {
    var childNode;
    while (childNode = element.firstChild) {
        element.removeChild(childNode);
    }
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var RegisteredFunction_1 = __webpack_require__(1);
var Environment_1 = __webpack_require__(0);
var registeredFunctionPrefix = 'Microsoft.AspNetCore.Blazor.Browser.Services.BrowserUriHelper';
var notifyLocationChangedMethod;
var hasRegisteredEventListeners = false;
RegisteredFunction_1.registerFunction(registeredFunctionPrefix + ".getLocationHref", function () { return Environment_1.platform.toDotNetString(location.href); });
RegisteredFunction_1.registerFunction(registeredFunctionPrefix + ".getBaseURI", function () { return document.baseURI ? Environment_1.platform.toDotNetString(document.baseURI) : null; });
RegisteredFunction_1.registerFunction(registeredFunctionPrefix + ".enableNavigationInterception", function () {
    if (hasRegisteredEventListeners) {
        return;
    }
    hasRegisteredEventListeners = true;
    document.addEventListener('click', function (event) {
        // Intercept clicks on all <a> elements where the href is within the <base href> URI space
        var anchorTarget = findClosestAncestor(event.target, 'A');
        if (anchorTarget) {
            var href = anchorTarget.getAttribute('href');
            if (isWithinBaseUriSpace(toAbsoluteUri(href))) {
                event.preventDefault();
                performInternalNavigation(href);
            }
        }
    });
    window.addEventListener('popstate', handleInternalNavigation);
});
RegisteredFunction_1.registerFunction(registeredFunctionPrefix + ".navigateTo", function (uriDotNetString) {
    navigateTo(Environment_1.platform.toJavaScriptString(uriDotNetString));
});
function navigateTo(uri) {
    if (isWithinBaseUriSpace(toAbsoluteUri(uri))) {
        performInternalNavigation(uri);
    }
    else {
        location.href = uri;
    }
}
exports.navigateTo = navigateTo;
function performInternalNavigation(href) {
    history.pushState(null, /* ignored title */ '', href);
    handleInternalNavigation();
}
function handleInternalNavigation() {
    if (!notifyLocationChangedMethod) {
        notifyLocationChangedMethod = Environment_1.platform.findMethod('Microsoft.AspNetCore.Blazor.Browser', 'Microsoft.AspNetCore.Blazor.Browser.Services', 'BrowserUriHelper', 'NotifyLocationChanged');
    }
    Environment_1.platform.callMethod(notifyLocationChangedMethod, null, [
        Environment_1.platform.toDotNetString(location.href)
    ]);
}
var testAnchor;
function toAbsoluteUri(relativeUri) {
    testAnchor = testAnchor || document.createElement('a');
    testAnchor.href = relativeUri;
    return testAnchor.href;
}
function findClosestAncestor(element, tagName) {
    return !element
        ? null
        : element.tagName === tagName
            ? element
            : findClosestAncestor(element.parentElement, tagName);
}
function isWithinBaseUriSpace(href) {
    var baseUriPrefixWithTrailingSlash = toBaseUriPrefixWithTrailingSlash(document.baseURI); // TODO: Might baseURI really be null?
    return href.startsWith(baseUriPrefixWithTrailingSlash);
}
function toBaseUriPrefixWithTrailingSlash(baseUri) {
    return baseUri.substr(0, baseUri.lastIndexOf('/') + 1);
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Environment_1 = __webpack_require__(0);
var DotNet_1 = __webpack_require__(2);
__webpack_require__(4);
__webpack_require__(17);
__webpack_require__(5);
__webpack_require__(18);
function boot() {
    return __awaiter(this, void 0, void 0, function () {
        var allScriptElems, thisScriptElem, isLinkerEnabled, entryPointDll, entryPointMethod, entryPointAssemblyName, referenceAssembliesCommaSeparated, referenceAssemblies, loadAssemblyUrls, ex_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    allScriptElems = document.getElementsByTagName('script');
                    thisScriptElem = (document.currentScript || allScriptElems[allScriptElems.length - 1]);
                    isLinkerEnabled = thisScriptElem.getAttribute('linker-enabled') === 'true';
                    entryPointDll = getRequiredBootScriptAttribute(thisScriptElem, 'main');
                    entryPointMethod = getRequiredBootScriptAttribute(thisScriptElem, 'entrypoint');
                    entryPointAssemblyName = DotNet_1.getAssemblyNameFromUrl(entryPointDll);
                    referenceAssembliesCommaSeparated = thisScriptElem.getAttribute('references') || '';
                    referenceAssemblies = referenceAssembliesCommaSeparated
                        .split(',')
                        .map(function (s) { return s.trim(); })
                        .filter(function (s) { return !!s; });
                    if (!isLinkerEnabled) {
                        console.info('Blazor is running in dev mode without IL stripping. To make the bundle size significantly smaller, publish the application or see https://go.microsoft.com/fwlink/?linkid=870414');
                    }
                    loadAssemblyUrls = [entryPointDll]
                        .concat(referenceAssemblies)
                        .map(function (filename) { return "_framework/_bin/" + filename; });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Environment_1.platform.start(loadAssemblyUrls)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    ex_1 = _a.sent();
                    throw new Error("Failed to start platform. Reason: " + ex_1);
                case 4:
                    // Start up the application
                    Environment_1.platform.callEntryPoint(entryPointAssemblyName, entryPointMethod, []);
                    return [2 /*return*/];
            }
        });
    });
}
function getRequiredBootScriptAttribute(elem, attributeName) {
    var result = elem.getAttribute(attributeName);
    if (!result) {
        throw new Error("Missing \"" + attributeName + "\" attribute on Blazor script tag.");
    }
    return result;
}
boot();


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DotNet_1 = __webpack_require__(2);
var RegisteredFunction_1 = __webpack_require__(1);
var assemblyHandleCache = {};
var typeHandleCache = {};
var methodHandleCache = {};
var assembly_load;
var find_class;
var find_method;
var invoke_method;
var mono_string_get_utf8;
var mono_string;
exports.monoPlatform = {
    start: function start(loadAssemblyUrls) {
        return new Promise(function (resolve, reject) {
            // mono.js assumes the existence of this
            window['Browser'] = {
                init: function () { },
                asyncLoad: asyncLoad
            };
            // Emscripten works by expecting the module config to be a global
            window['Module'] = createEmscriptenModuleInstance(loadAssemblyUrls, resolve, reject);
            addScriptTagsToDocument();
        });
    },
    findMethod: findMethod,
    callEntryPoint: function callEntryPoint(assemblyName, entrypointMethod, args) {
        // Parse the entrypointMethod, which is of the form MyApp.MyNamespace.MyTypeName::MyMethodName
        // Note that we don't support specifying a method overload, so it has to be unique
        var entrypointSegments = entrypointMethod.split('::');
        if (entrypointSegments.length != 2) {
            throw new Error('Malformed entry point method name; could not resolve class name and method name.');
        }
        var typeFullName = entrypointSegments[0];
        var methodName = entrypointSegments[1];
        var lastDot = typeFullName.lastIndexOf('.');
        var namespace = lastDot > -1 ? typeFullName.substring(0, lastDot) : '';
        var typeShortName = lastDot > -1 ? typeFullName.substring(lastDot + 1) : typeFullName;
        var entryPointMethodHandle = exports.monoPlatform.findMethod(assemblyName, namespace, typeShortName, methodName);
        exports.monoPlatform.callMethod(entryPointMethodHandle, null, args);
    },
    callMethod: function callMethod(method, target, args) {
        if (args.length > 4) {
            // Hopefully this restriction can be eased soon, but for now make it clear what's going on
            throw new Error("Currently, MonoPlatform supports passing a maximum of 4 arguments from JS to .NET. You tried to pass " + args.length + ".");
        }
        var stack = Module.stackSave();
        try {
            var argsBuffer = Module.stackAlloc(args.length);
            var exceptionFlagManagedInt = Module.stackAlloc(4);
            for (var i = 0; i < args.length; ++i) {
                Module.setValue(argsBuffer + i * 4, args[i], 'i32');
            }
            Module.setValue(exceptionFlagManagedInt, 0, 'i32');
            var res = invoke_method(method, target, argsBuffer, exceptionFlagManagedInt);
            if (Module.getValue(exceptionFlagManagedInt, 'i32') !== 0) {
                // If the exception flag is set, the returned value is exception.ToString()
                throw new Error(exports.monoPlatform.toJavaScriptString(res));
            }
            return res;
        }
        finally {
            Module.stackRestore(stack);
        }
    },
    toJavaScriptString: function toJavaScriptString(managedString) {
        // Comments from original Mono sample:
        //FIXME this is wastefull, we could remove the temp malloc by going the UTF16 route
        //FIXME this is unsafe, cuz raw objects could be GC'd.
        var utf8 = mono_string_get_utf8(managedString);
        var res = Module.UTF8ToString(utf8);
        Module._free(utf8);
        return res;
    },
    toDotNetString: function toDotNetString(jsString) {
        return mono_string(jsString);
    },
    getArrayLength: function getArrayLength(array) {
        return Module.getValue(getArrayDataPointer(array), 'i32');
    },
    getArrayEntryPtr: function getArrayEntryPtr(array, index, itemSize) {
        // First byte is array length, followed by entries
        var address = getArrayDataPointer(array) + 4 + index * itemSize;
        return address;
    },
    getObjectFieldsBaseAddress: function getObjectFieldsBaseAddress(referenceTypedObject) {
        // The first two int32 values are internal Mono data
        return (referenceTypedObject + 8);
    },
    readInt32Field: function readHeapInt32(baseAddress, fieldOffset) {
        return Module.getValue(baseAddress + (fieldOffset || 0), 'i32');
    },
    readFloatField: function readHeapFloat(baseAddress, fieldOffset) {
        return Module.getValue(baseAddress + (fieldOffset || 0), 'float');
    },
    readObjectField: function readHeapObject(baseAddress, fieldOffset) {
        return Module.getValue(baseAddress + (fieldOffset || 0), 'i32');
    },
    readStringField: function readHeapObject(baseAddress, fieldOffset) {
        var fieldValue = Module.getValue(baseAddress + (fieldOffset || 0), 'i32');
        return fieldValue === 0 ? null : exports.monoPlatform.toJavaScriptString(fieldValue);
    },
    readStructField: function readStructField(baseAddress, fieldOffset) {
        return (baseAddress + (fieldOffset || 0));
    },
};
// Bypass normal type checking to add this extra function. It's only intended to be called from
// the JS code in Mono's driver.c. It's never intended to be called from TypeScript.
exports.monoPlatform.monoGetRegisteredFunction = RegisteredFunction_1.getRegisteredFunction;
function findAssembly(assemblyName) {
    var assemblyHandle = assemblyHandleCache[assemblyName];
    if (!assemblyHandle) {
        assemblyHandle = assembly_load(assemblyName);
        if (!assemblyHandle) {
            throw new Error("Could not find assembly \"" + assemblyName + "\"");
        }
        assemblyHandleCache[assemblyName] = assemblyHandle;
    }
    return assemblyHandle;
}
function findType(assemblyName, namespace, className) {
    var fullyQualifiedTypeName = "[" + assemblyName + "]" + namespace + "." + className;
    var typeHandle = typeHandleCache[fullyQualifiedTypeName];
    if (!typeHandle) {
        typeHandle = find_class(findAssembly(assemblyName), namespace, className);
        if (!typeHandle) {
            throw new Error("Could not find type \"" + className + "\" in namespace \"" + namespace + "\" in assembly \"" + assemblyName + "\"");
        }
        typeHandleCache[fullyQualifiedTypeName] = typeHandle;
    }
    return typeHandle;
}
function findMethod(assemblyName, namespace, className, methodName) {
    var fullyQualifiedMethodName = "[" + assemblyName + "]" + namespace + "." + className + "::" + methodName;
    var methodHandle = methodHandleCache[fullyQualifiedMethodName];
    if (!methodHandle) {
        methodHandle = find_method(findType(assemblyName, namespace, className), methodName, -1);
        if (!methodHandle) {
            throw new Error("Could not find method \"" + methodName + "\" on type \"" + namespace + "." + className + "\"");
        }
        methodHandleCache[fullyQualifiedMethodName] = methodHandle;
    }
    return methodHandle;
}
function addScriptTagsToDocument() {
    // Load either the wasm or asm.js version of the Mono runtime
    var browserSupportsNativeWebAssembly = typeof WebAssembly !== 'undefined' && WebAssembly.validate;
    var monoRuntimeUrlBase = '_framework/' + (browserSupportsNativeWebAssembly ? 'wasm' : 'asmjs');
    var monoRuntimeScriptUrl = monoRuntimeUrlBase + "/mono.js";
    if (!browserSupportsNativeWebAssembly) {
        // In the asmjs case, the initial memory structure is in a separate file we need to download
        var meminitXHR = Module['memoryInitializerRequest'] = new XMLHttpRequest();
        meminitXHR.open('GET', monoRuntimeUrlBase + "/mono.js.mem");
        meminitXHR.responseType = 'arraybuffer';
        meminitXHR.send(null);
    }
    document.write("<script defer src=\"" + monoRuntimeScriptUrl + "\"></script>");
}
function createEmscriptenModuleInstance(loadAssemblyUrls, onReady, onError) {
    var module = {};
    var wasmBinaryFile = '_framework/wasm/mono.wasm';
    var asmjsCodeFile = '_framework/asmjs/mono.asm.js';
    module.print = function (line) { return console.log("WASM: " + line); };
    module.printErr = function (line) { return console.error("WASM: " + line); };
    module.preRun = [];
    module.postRun = [];
    module.preloadPlugins = [];
    module.locateFile = function (fileName) {
        switch (fileName) {
            case 'mono.wasm': return wasmBinaryFile;
            case 'mono.asm.js': return asmjsCodeFile;
            default: return fileName;
        }
    };
    module.preRun.push(function () {
        // By now, emscripten should be initialised enough that we can capture these methods for later use
        assembly_load = Module.cwrap('mono_wasm_assembly_load', 'number', ['string']);
        find_class = Module.cwrap('mono_wasm_assembly_find_class', 'number', ['number', 'string', 'string']);
        find_method = Module.cwrap('mono_wasm_assembly_find_method', 'number', ['number', 'string', 'number']);
        invoke_method = Module.cwrap('mono_wasm_invoke_method', 'number', ['number', 'number', 'number']);
        mono_string_get_utf8 = Module.cwrap('mono_wasm_string_get_utf8', 'number', ['number']);
        mono_string = Module.cwrap('mono_wasm_string_from_js', 'number', ['string']);
        Module.FS_createPath('/', 'appBinDir', true, true);
        loadAssemblyUrls.forEach(function (url) {
            return FS.createPreloadedFile('appBinDir', DotNet_1.getAssemblyNameFromUrl(url) + ".dll", url, true, false, undefined, onError);
        });
    });
    module.postRun.push(function () {
        var load_runtime = Module.cwrap('mono_wasm_load_runtime', null, ['string']);
        load_runtime('appBinDir');
        onReady();
    });
    return module;
}
function asyncLoad(url, onload, onerror) {
    var xhr = new XMLHttpRequest;
    xhr.open('GET', url, /* async: */ true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function xhr_onload() {
        if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
            var asm = new Uint8Array(xhr.response);
            onload(asm);
        }
        else {
            onerror(xhr);
        }
    };
    xhr.onerror = onerror;
    xhr.send(null);
}
function getArrayDataPointer(array) {
    return array + 12; // First byte from here is length, then following bytes are entries
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var InvokeWithJsonMarshalling_1 = __webpack_require__(9);
var Renderer_1 = __webpack_require__(4);
/**
 * The definitive list of internal functions invokable from .NET code.
 * These function names are treated as 'reserved' and cannot be passed to registerFunction.
 */
exports.internalRegisteredFunctions = {
    attachRootComponentToElement: Renderer_1.attachRootComponentToElement,
    invokeWithJsonMarshalling: InvokeWithJsonMarshalling_1.invokeWithJsonMarshalling,
    renderBatch: Renderer_1.renderBatch,
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Environment_1 = __webpack_require__(0);
var RegisteredFunction_1 = __webpack_require__(1);
var ElementReferenceCapture_1 = __webpack_require__(3);
var elementRefKey = '_blazorElementRef'; // Keep in sync with ElementRef.cs
function invokeWithJsonMarshalling(identifier) {
    var argsJson = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        argsJson[_i - 1] = arguments[_i];
    }
    var identifierJsString = Environment_1.platform.toJavaScriptString(identifier);
    var funcInstance = RegisteredFunction_1.getRegisteredFunction(identifierJsString);
    var args = argsJson.map(function (json) { return JSON.parse(Environment_1.platform.toJavaScriptString(json), jsonReviver); });
    var result = funcInstance.apply(null, args);
    if (result !== null && result !== undefined) {
        var resultJson = JSON.stringify(result);
        return Environment_1.platform.toDotNetString(resultJson);
    }
    else {
        return null;
    }
}
exports.invokeWithJsonMarshalling = invokeWithJsonMarshalling;
function jsonReviver(key, value) {
    if (value && typeof value === 'object' && value.hasOwnProperty(elementRefKey) && typeof value[elementRefKey] === 'number') {
        return ElementReferenceCapture_1.getElementByCaptureId(value[elementRefKey]);
    }
    return value;
}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Environment_1 = __webpack_require__(0);
// Keep in sync with the structs in .NET code
exports.renderBatch = {
    updatedComponents: function (obj) { return Environment_1.platform.readStructField(obj, 0); },
    referenceFrames: function (obj) { return Environment_1.platform.readStructField(obj, arrayRangeStructLength); },
    disposedComponentIds: function (obj) { return Environment_1.platform.readStructField(obj, arrayRangeStructLength + arrayRangeStructLength); },
    disposedEventHandlerIds: function (obj) { return Environment_1.platform.readStructField(obj, arrayRangeStructLength + arrayRangeStructLength + arrayRangeStructLength); },
};
var arrayRangeStructLength = 8;
exports.arrayRange = {
    array: function (obj) { return Environment_1.platform.readObjectField(obj, 0); },
    count: function (obj) { return Environment_1.platform.readInt32Field(obj, 4); },
};
var arraySegmentStructLength = 12;
exports.arraySegment = {
    array: function (obj) { return Environment_1.platform.readObjectField(obj, 0); },
    offset: function (obj) { return Environment_1.platform.readInt32Field(obj, 4); },
    count: function (obj) { return Environment_1.platform.readInt32Field(obj, 8); },
};
exports.renderTreeDiffStructLength = 4 + arraySegmentStructLength;
exports.renderTreeDiff = {
    componentId: function (obj) { return Environment_1.platform.readInt32Field(obj, 0); },
    edits: function (obj) { return Environment_1.platform.readStructField(obj, 4); },
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var RenderTreeEdit_1 = __webpack_require__(12);
var RenderTreeFrame_1 = __webpack_require__(13);
var Environment_1 = __webpack_require__(0);
var EventDelegator_1 = __webpack_require__(14);
var LogicalElements_1 = __webpack_require__(16);
var ElementReferenceCapture_1 = __webpack_require__(3);
var selectValuePropname = '_blazorSelectValue';
var raiseEventMethod;
var renderComponentMethod;
var BrowserRenderer = /** @class */ (function () {
    function BrowserRenderer(browserRendererId) {
        var _this = this;
        this.browserRendererId = browserRendererId;
        this.childComponentLocations = {};
        this.eventDelegator = new EventDelegator_1.EventDelegator(function (event, componentId, eventHandlerId, eventArgs) {
            raiseEvent(event, _this.browserRendererId, componentId, eventHandlerId, eventArgs);
        });
    }
    BrowserRenderer.prototype.attachRootComponentToElement = function (componentId, element) {
        this.attachComponentToElement(componentId, LogicalElements_1.toLogicalElement(element));
    };
    BrowserRenderer.prototype.updateComponent = function (componentId, edits, editsOffset, editsLength, referenceFrames) {
        var element = this.childComponentLocations[componentId];
        if (!element) {
            throw new Error("No element is currently associated with component " + componentId);
        }
        this.applyEdits(componentId, element, 0, edits, editsOffset, editsLength, referenceFrames);
    };
    BrowserRenderer.prototype.disposeComponent = function (componentId) {
        delete this.childComponentLocations[componentId];
    };
    BrowserRenderer.prototype.disposeEventHandler = function (eventHandlerId) {
        this.eventDelegator.removeListener(eventHandlerId);
    };
    BrowserRenderer.prototype.attachComponentToElement = function (componentId, element) {
        this.childComponentLocations[componentId] = element;
    };
    BrowserRenderer.prototype.applyEdits = function (componentId, parent, childIndex, edits, editsOffset, editsLength, referenceFrames) {
        var currentDepth = 0;
        var childIndexAtCurrentDepth = childIndex;
        var maxEditIndexExcl = editsOffset + editsLength;
        for (var editIndex = editsOffset; editIndex < maxEditIndexExcl; editIndex++) {
            var edit = RenderTreeEdit_1.getRenderTreeEditPtr(edits, editIndex);
            var editType = RenderTreeEdit_1.renderTreeEdit.type(edit);
            switch (editType) {
                case RenderTreeEdit_1.EditType.prependFrame: {
                    var frameIndex = RenderTreeEdit_1.renderTreeEdit.newTreeIndex(edit);
                    var frame = RenderTreeFrame_1.getTreeFramePtr(referenceFrames, frameIndex);
                    var siblingIndex = RenderTreeEdit_1.renderTreeEdit.siblingIndex(edit);
                    this.insertFrame(componentId, parent, childIndexAtCurrentDepth + siblingIndex, referenceFrames, frame, frameIndex);
                    break;
                }
                case RenderTreeEdit_1.EditType.removeFrame: {
                    var siblingIndex = RenderTreeEdit_1.renderTreeEdit.siblingIndex(edit);
                    LogicalElements_1.removeLogicalChild(parent, childIndexAtCurrentDepth + siblingIndex);
                    break;
                }
                case RenderTreeEdit_1.EditType.setAttribute: {
                    var frameIndex = RenderTreeEdit_1.renderTreeEdit.newTreeIndex(edit);
                    var frame = RenderTreeFrame_1.getTreeFramePtr(referenceFrames, frameIndex);
                    var siblingIndex = RenderTreeEdit_1.renderTreeEdit.siblingIndex(edit);
                    var element = LogicalElements_1.getLogicalChild(parent, childIndexAtCurrentDepth + siblingIndex);
                    if (element instanceof HTMLElement) {
                        this.applyAttribute(componentId, element, frame);
                    }
                    else {
                        throw new Error("Cannot set attribute on non-element child");
                    }
                    break;
                }
                case RenderTreeEdit_1.EditType.removeAttribute: {
                    // Note that we don't have to dispose the info we track about event handlers here, because the
                    // disposed event handler IDs are delivered separately (in the 'disposedEventHandlerIds' array)
                    var siblingIndex = RenderTreeEdit_1.renderTreeEdit.siblingIndex(edit);
                    var element = LogicalElements_1.getLogicalChild(parent, childIndexAtCurrentDepth + siblingIndex);
                    if (element instanceof HTMLElement) {
                        var attributeName = RenderTreeEdit_1.renderTreeEdit.removedAttributeName(edit);
                        // First try to remove any special property we use for this attribute
                        if (!this.tryApplySpecialProperty(element, attributeName, null)) {
                            // If that's not applicable, it's a regular DOM attribute so remove that
                            element.removeAttribute(attributeName);
                        }
                    }
                    else {
                        throw new Error("Cannot remove attribute from non-element child");
                    }
                    break;
                }
                case RenderTreeEdit_1.EditType.updateText: {
                    var frameIndex = RenderTreeEdit_1.renderTreeEdit.newTreeIndex(edit);
                    var frame = RenderTreeFrame_1.getTreeFramePtr(referenceFrames, frameIndex);
                    var siblingIndex = RenderTreeEdit_1.renderTreeEdit.siblingIndex(edit);
                    var textNode = LogicalElements_1.getLogicalChild(parent, childIndexAtCurrentDepth + siblingIndex);
                    if (textNode instanceof Text) {
                        textNode.textContent = RenderTreeFrame_1.renderTreeFrame.textContent(frame);
                    }
                    else {
                        throw new Error("Cannot set text content on non-text child");
                    }
                    break;
                }
                case RenderTreeEdit_1.EditType.stepIn: {
                    var siblingIndex = RenderTreeEdit_1.renderTreeEdit.siblingIndex(edit);
                    parent = LogicalElements_1.getLogicalChild(parent, childIndexAtCurrentDepth + siblingIndex);
                    currentDepth++;
                    childIndexAtCurrentDepth = 0;
                    break;
                }
                case RenderTreeEdit_1.EditType.stepOut: {
                    parent = LogicalElements_1.getLogicalParent(parent);
                    currentDepth--;
                    childIndexAtCurrentDepth = currentDepth === 0 ? childIndex : 0; // The childIndex is only ever nonzero at zero depth
                    break;
                }
                default: {
                    var unknownType = editType; // Compile-time verification that the switch was exhaustive
                    throw new Error("Unknown edit type: " + unknownType);
                }
            }
        }
    };
    BrowserRenderer.prototype.insertFrame = function (componentId, parent, childIndex, frames, frame, frameIndex) {
        var frameType = RenderTreeFrame_1.renderTreeFrame.frameType(frame);
        switch (frameType) {
            case RenderTreeFrame_1.FrameType.element:
                this.insertElement(componentId, parent, childIndex, frames, frame, frameIndex);
                return 1;
            case RenderTreeFrame_1.FrameType.text:
                this.insertText(parent, childIndex, frame);
                return 1;
            case RenderTreeFrame_1.FrameType.attribute:
                throw new Error('Attribute frames should only be present as leading children of element frames.');
            case RenderTreeFrame_1.FrameType.component:
                this.insertComponent(parent, childIndex, frame);
                return 1;
            case RenderTreeFrame_1.FrameType.region:
                return this.insertFrameRange(componentId, parent, childIndex, frames, frameIndex + 1, frameIndex + RenderTreeFrame_1.renderTreeFrame.subtreeLength(frame));
            case RenderTreeFrame_1.FrameType.elementReferenceCapture:
                if (parent instanceof Element) {
                    ElementReferenceCapture_1.applyCaptureIdToElement(parent, RenderTreeFrame_1.renderTreeFrame.elementReferenceCaptureId(frame));
                    return 0; // A "capture" is a child in the diff, but has no node in the DOM
                }
                else {
                    throw new Error('Reference capture frames can only be children of element frames.');
                }
            default:
                var unknownType = frameType; // Compile-time verification that the switch was exhaustive
                throw new Error("Unknown frame type: " + unknownType);
        }
    };
    BrowserRenderer.prototype.insertElement = function (componentId, parent, childIndex, frames, frame, frameIndex) {
        var tagName = RenderTreeFrame_1.renderTreeFrame.elementName(frame);
        var newDomElementRaw = tagName === 'svg' || LogicalElements_1.isSvgElement(parent) ?
            document.createElementNS('http://www.w3.org/2000/svg', tagName) :
            document.createElement(tagName);
        var newElement = LogicalElements_1.toLogicalElement(newDomElementRaw);
        LogicalElements_1.insertLogicalChild(newDomElementRaw, parent, childIndex);
        // Apply attributes
        var descendantsEndIndexExcl = frameIndex + RenderTreeFrame_1.renderTreeFrame.subtreeLength(frame);
        for (var descendantIndex = frameIndex + 1; descendantIndex < descendantsEndIndexExcl; descendantIndex++) {
            var descendantFrame = RenderTreeFrame_1.getTreeFramePtr(frames, descendantIndex);
            if (RenderTreeFrame_1.renderTreeFrame.frameType(descendantFrame) === RenderTreeFrame_1.FrameType.attribute) {
                this.applyAttribute(componentId, newDomElementRaw, descendantFrame);
            }
            else {
                // As soon as we see a non-attribute child, all the subsequent child frames are
                // not attributes, so bail out and insert the remnants recursively
                this.insertFrameRange(componentId, newElement, 0, frames, descendantIndex, descendantsEndIndexExcl);
                break;
            }
        }
    };
    BrowserRenderer.prototype.insertComponent = function (parent, childIndex, frame) {
        var containerElement = LogicalElements_1.createAndInsertLogicalContainer(parent, childIndex);
        // All we have to do is associate the child component ID with its location. We don't actually
        // do any rendering here, because the diff for the child will appear later in the render batch.
        var childComponentId = RenderTreeFrame_1.renderTreeFrame.componentId(frame);
        this.attachComponentToElement(childComponentId, containerElement);
    };
    BrowserRenderer.prototype.insertText = function (parent, childIndex, textFrame) {
        var textContent = RenderTreeFrame_1.renderTreeFrame.textContent(textFrame);
        var newTextNode = document.createTextNode(textContent);
        LogicalElements_1.insertLogicalChild(newTextNode, parent, childIndex);
    };
    BrowserRenderer.prototype.applyAttribute = function (componentId, toDomElement, attributeFrame) {
        var attributeName = RenderTreeFrame_1.renderTreeFrame.attributeName(attributeFrame);
        var browserRendererId = this.browserRendererId;
        var eventHandlerId = RenderTreeFrame_1.renderTreeFrame.attributeEventHandlerId(attributeFrame);
        if (eventHandlerId) {
            var firstTwoChars = attributeName.substring(0, 2);
            var eventName = attributeName.substring(2);
            if (firstTwoChars !== 'on' || !eventName) {
                throw new Error("Attribute has nonzero event handler ID, but attribute name '" + attributeName + "' does not start with 'on'.");
            }
            this.eventDelegator.setListener(toDomElement, eventName, componentId, eventHandlerId);
            return;
        }
        // First see if we have special handling for this attribute
        if (!this.tryApplySpecialProperty(toDomElement, attributeName, attributeFrame)) {
            // If not, treat it as a regular string-valued attribute
            toDomElement.setAttribute(attributeName, RenderTreeFrame_1.renderTreeFrame.attributeValue(attributeFrame));
        }
    };
    BrowserRenderer.prototype.tryApplySpecialProperty = function (element, attributeName, attributeFrame) {
        switch (attributeName) {
            case 'value':
                return this.tryApplyValueProperty(element, attributeFrame);
            case 'checked':
                return this.tryApplyCheckedProperty(element, attributeFrame);
            default:
                return false;
        }
    };
    BrowserRenderer.prototype.tryApplyValueProperty = function (element, attributeFrame) {
        // Certain elements have built-in behaviour for their 'value' property
        switch (element.tagName) {
            case 'INPUT':
            case 'SELECT':
            case 'TEXTAREA': {
                var value = attributeFrame ? RenderTreeFrame_1.renderTreeFrame.attributeValue(attributeFrame) : null;
                element.value = value;
                if (element.tagName === 'SELECT') {
                    // <select> is special, in that anything we write to .value will be lost if there
                    // isn't yet a matching <option>. To maintain the expected behavior no matter the
                    // element insertion/update order, preserve the desired value separately so
                    // we can recover it when inserting any matching <option>.
                    element[selectValuePropname] = value;
                }
                return true;
            }
            case 'OPTION': {
                var value = attributeFrame ? RenderTreeFrame_1.renderTreeFrame.attributeValue(attributeFrame) : null;
                if (value) {
                    element.setAttribute('value', value);
                }
                else {
                    element.removeAttribute('value');
                }
                // See above for why we have this special handling for <select>/<option>
                var parentElement = element.parentElement;
                if (parentElement && (selectValuePropname in parentElement) && parentElement[selectValuePropname] === value) {
                    this.tryApplyValueProperty(parentElement, attributeFrame);
                    delete parentElement[selectValuePropname];
                }
                return true;
            }
            default:
                return false;
        }
    };
    BrowserRenderer.prototype.tryApplyCheckedProperty = function (element, attributeFrame) {
        // Certain elements have built-in behaviour for their 'checked' property
        if (element.tagName === 'INPUT') {
            var value = attributeFrame ? RenderTreeFrame_1.renderTreeFrame.attributeValue(attributeFrame) : null;
            element.checked = value !== null;
            return true;
        }
        else {
            return false;
        }
    };
    BrowserRenderer.prototype.insertFrameRange = function (componentId, parent, childIndex, frames, startIndex, endIndexExcl) {
        var origChildIndex = childIndex;
        for (var index = startIndex; index < endIndexExcl; index++) {
            var frame = RenderTreeFrame_1.getTreeFramePtr(frames, index);
            var numChildrenInserted = this.insertFrame(componentId, parent, childIndex, frames, frame, index);
            childIndex += numChildrenInserted;
            // Skip over any descendants, since they are already dealt with recursively
            index += countDescendantFrames(frame);
        }
        return (childIndex - origChildIndex); // Total number of children inserted
    };
    return BrowserRenderer;
}());
exports.BrowserRenderer = BrowserRenderer;
function countDescendantFrames(frame) {
    switch (RenderTreeFrame_1.renderTreeFrame.frameType(frame)) {
        // The following frame types have a subtree length. Other frames may use that memory slot
        // to mean something else, so we must not read it. We should consider having nominal subtypes
        // of RenderTreeFramePointer that prevent access to non-applicable fields.
        case RenderTreeFrame_1.FrameType.component:
        case RenderTreeFrame_1.FrameType.element:
        case RenderTreeFrame_1.FrameType.region:
            return RenderTreeFrame_1.renderTreeFrame.subtreeLength(frame) - 1;
        default:
            return 0;
    }
}
function raiseEvent(event, browserRendererId, componentId, eventHandlerId, eventArgs) {
    event.preventDefault();
    if (!raiseEventMethod) {
        raiseEventMethod = Environment_1.platform.findMethod('Microsoft.AspNetCore.Blazor.Browser', 'Microsoft.AspNetCore.Blazor.Browser.Rendering', 'BrowserRendererEventDispatcher', 'DispatchEvent');
    }
    var eventDescriptor = {
        BrowserRendererId: browserRendererId,
        ComponentId: componentId,
        EventHandlerId: eventHandlerId,
        EventArgsType: eventArgs.type
    };
    Environment_1.platform.callMethod(raiseEventMethod, null, [
        Environment_1.platform.toDotNetString(JSON.stringify(eventDescriptor)),
        Environment_1.platform.toDotNetString(JSON.stringify(eventArgs.data))
    ]);
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Environment_1 = __webpack_require__(0);
var renderTreeEditStructLength = 16;
function getRenderTreeEditPtr(renderTreeEdits, index) {
    return Environment_1.platform.getArrayEntryPtr(renderTreeEdits, index, renderTreeEditStructLength);
}
exports.getRenderTreeEditPtr = getRenderTreeEditPtr;
exports.renderTreeEdit = {
    // The properties and memory layout must be kept in sync with the .NET equivalent in RenderTreeEdit.cs
    type: function (edit) { return Environment_1.platform.readInt32Field(edit, 0); },
    siblingIndex: function (edit) { return Environment_1.platform.readInt32Field(edit, 4); },
    newTreeIndex: function (edit) { return Environment_1.platform.readInt32Field(edit, 8); },
    removedAttributeName: function (edit) { return Environment_1.platform.readStringField(edit, 12); },
};
var EditType;
(function (EditType) {
    EditType[EditType["prependFrame"] = 1] = "prependFrame";
    EditType[EditType["removeFrame"] = 2] = "removeFrame";
    EditType[EditType["setAttribute"] = 3] = "setAttribute";
    EditType[EditType["removeAttribute"] = 4] = "removeAttribute";
    EditType[EditType["updateText"] = 5] = "updateText";
    EditType[EditType["stepIn"] = 6] = "stepIn";
    EditType[EditType["stepOut"] = 7] = "stepOut";
})(EditType = exports.EditType || (exports.EditType = {}));


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Environment_1 = __webpack_require__(0);
var renderTreeFrameStructLength = 28;
// To minimise GC pressure, instead of instantiating a JS object to represent each tree frame,
// we work in terms of pointers to the structs on the .NET heap, and use static functions that
// know how to read property values from those structs.
function getTreeFramePtr(renderTreeEntries, index) {
    return Environment_1.platform.getArrayEntryPtr(renderTreeEntries, index, renderTreeFrameStructLength);
}
exports.getTreeFramePtr = getTreeFramePtr;
exports.renderTreeFrame = {
    // The properties and memory layout must be kept in sync with the .NET equivalent in RenderTreeFrame.cs
    frameType: function (frame) { return Environment_1.platform.readInt32Field(frame, 4); },
    subtreeLength: function (frame) { return Environment_1.platform.readInt32Field(frame, 8); },
    elementReferenceCaptureId: function (frame) { return Environment_1.platform.readInt32Field(frame, 8); },
    componentId: function (frame) { return Environment_1.platform.readInt32Field(frame, 12); },
    elementName: function (frame) { return Environment_1.platform.readStringField(frame, 16); },
    textContent: function (frame) { return Environment_1.platform.readStringField(frame, 16); },
    attributeName: function (frame) { return Environment_1.platform.readStringField(frame, 16); },
    attributeValue: function (frame) { return Environment_1.platform.readStringField(frame, 24); },
    attributeEventHandlerId: function (frame) { return Environment_1.platform.readInt32Field(frame, 8); },
};
var FrameType;
(function (FrameType) {
    // The values must be kept in sync with the .NET equivalent in RenderTreeFrameType.cs
    FrameType[FrameType["element"] = 1] = "element";
    FrameType[FrameType["text"] = 2] = "text";
    FrameType[FrameType["attribute"] = 3] = "attribute";
    FrameType[FrameType["component"] = 4] = "component";
    FrameType[FrameType["region"] = 5] = "region";
    FrameType[FrameType["elementReferenceCapture"] = 6] = "elementReferenceCapture";
})(FrameType = exports.FrameType || (exports.FrameType = {}));


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EventForDotNet_1 = __webpack_require__(15);
var nonBubblingEvents = toLookup([
    'abort', 'blur', 'change', 'error', 'focus', 'load', 'loadend', 'loadstart', 'mouseenter', 'mouseleave',
    'progress', 'reset', 'scroll', 'submit', 'unload', 'DOMNodeInsertedIntoDocument', 'DOMNodeRemovedFromDocument'
]);
// Responsible for adding/removing the eventInfo on an expando property on DOM elements, and
// calling an EventInfoStore that deals with registering/unregistering the underlying delegated
// event listeners as required (and also maps actual events back to the given callback).
var EventDelegator = /** @class */ (function () {
    function EventDelegator(onEvent) {
        this.onEvent = onEvent;
        var eventDelegatorId = ++EventDelegator.nextEventDelegatorId;
        this.eventsCollectionKey = "_blazorEvents_" + eventDelegatorId;
        this.eventInfoStore = new EventInfoStore(this.onGlobalEvent.bind(this));
    }
    EventDelegator.prototype.setListener = function (element, eventName, componentId, eventHandlerId) {
        // Ensure we have a place to store event info for this element
        var infoForElement = element[this.eventsCollectionKey];
        if (!infoForElement) {
            infoForElement = element[this.eventsCollectionKey] = {};
        }
        if (infoForElement.hasOwnProperty(eventName)) {
            // We can cheaply update the info on the existing object and don't need any other housekeeping
            var oldInfo = infoForElement[eventName];
            this.eventInfoStore.update(oldInfo.eventHandlerId, eventHandlerId);
        }
        else {
            // Go through the whole flow which might involve registering a new global handler
            var newInfo = { element: element, eventName: eventName, componentId: componentId, eventHandlerId: eventHandlerId };
            this.eventInfoStore.add(newInfo);
            infoForElement[eventName] = newInfo;
        }
    };
    EventDelegator.prototype.removeListener = function (eventHandlerId) {
        // This method gets called whenever the .NET-side code reports that a certain event handler
        // has been disposed. However we will already have disposed the info about that handler if
        // the eventHandlerId for the (element,eventName) pair was replaced during diff application.
        var info = this.eventInfoStore.remove(eventHandlerId);
        if (info) {
            // Looks like this event handler wasn't already disposed
            // Remove the associated data from the DOM element
            var element = info.element;
            if (element.hasOwnProperty(this.eventsCollectionKey)) {
                var elementEventInfos = element[this.eventsCollectionKey];
                delete elementEventInfos[info.eventName];
                if (Object.getOwnPropertyNames(elementEventInfos).length === 0) {
                    delete element[this.eventsCollectionKey];
                }
            }
        }
    };
    EventDelegator.prototype.onGlobalEvent = function (evt) {
        if (!(evt.target instanceof Element)) {
            return;
        }
        // Scan up the element hierarchy, looking for any matching registered event handlers
        var candidateElement = evt.target;
        var eventArgs = null; // Populate lazily
        var eventIsNonBubbling = nonBubblingEvents.hasOwnProperty(evt.type);
        while (candidateElement) {
            if (candidateElement.hasOwnProperty(this.eventsCollectionKey)) {
                var handlerInfos = candidateElement[this.eventsCollectionKey];
                if (handlerInfos.hasOwnProperty(evt.type)) {
                    // We are going to raise an event for this element, so prepare info needed by the .NET code
                    if (!eventArgs) {
                        eventArgs = EventForDotNet_1.EventForDotNet.fromDOMEvent(evt);
                    }
                    var handlerInfo = handlerInfos[evt.type];
                    this.onEvent(evt, handlerInfo.componentId, handlerInfo.eventHandlerId, eventArgs);
                }
            }
            candidateElement = eventIsNonBubbling ? null : candidateElement.parentElement;
        }
    };
    EventDelegator.nextEventDelegatorId = 0;
    return EventDelegator;
}());
exports.EventDelegator = EventDelegator;
// Responsible for adding and removing the global listener when the number of listeners
// for a given event name changes between zero and nonzero
var EventInfoStore = /** @class */ (function () {
    function EventInfoStore(globalListener) {
        this.globalListener = globalListener;
        this.infosByEventHandlerId = {};
        this.countByEventName = {};
    }
    EventInfoStore.prototype.add = function (info) {
        if (this.infosByEventHandlerId[info.eventHandlerId]) {
            // Should never happen, but we want to know if it does
            throw new Error("Event " + info.eventHandlerId + " is already tracked");
        }
        this.infosByEventHandlerId[info.eventHandlerId] = info;
        var eventName = info.eventName;
        if (this.countByEventName.hasOwnProperty(eventName)) {
            this.countByEventName[eventName]++;
        }
        else {
            this.countByEventName[eventName] = 1;
            // To make delegation work with non-bubbling events, register a 'capture' listener.
            // We preserve the non-bubbling behavior by only dispatching such events to the targeted element.
            var useCapture = nonBubblingEvents.hasOwnProperty(eventName);
            document.addEventListener(eventName, this.globalListener, useCapture);
        }
    };
    EventInfoStore.prototype.update = function (oldEventHandlerId, newEventHandlerId) {
        if (this.infosByEventHandlerId.hasOwnProperty(newEventHandlerId)) {
            // Should never happen, but we want to know if it does
            throw new Error("Event " + newEventHandlerId + " is already tracked");
        }
        // Since we're just updating the event handler ID, there's no need to update the global counts
        var info = this.infosByEventHandlerId[oldEventHandlerId];
        delete this.infosByEventHandlerId[oldEventHandlerId];
        info.eventHandlerId = newEventHandlerId;
        this.infosByEventHandlerId[newEventHandlerId] = info;
    };
    EventInfoStore.prototype.remove = function (eventHandlerId) {
        var info = this.infosByEventHandlerId[eventHandlerId];
        if (info) {
            delete this.infosByEventHandlerId[eventHandlerId];
            var eventName = info.eventName;
            if (--this.countByEventName[eventName] === 0) {
                delete this.countByEventName[eventName];
                document.removeEventListener(eventName, this.globalListener);
            }
        }
        return info;
    };
    return EventInfoStore;
}());
function toLookup(items) {
    var result = {};
    items.forEach(function (value) { result[value] = true; });
    return result;
}


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EventForDotNet = /** @class */ (function () {
    function EventForDotNet(type, data) {
        this.type = type;
        this.data = data;
    }
    EventForDotNet.fromDOMEvent = function (event) {
        var element = event.target;
        switch (event.type) {
            case 'change': {
                var targetIsCheckbox = isCheckbox(element);
                var newValue = targetIsCheckbox ? !!element['checked'] : element['value'];
                return new EventForDotNet('change', { Type: event.type, Value: newValue });
            }
            case 'copy':
            case 'cut':
            case 'paste':
                return new EventForDotNet('clipboard', { Type: event.type });
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
                return new EventForDotNet('drag', { Type: event.type });
            case 'error':
                return new EventForDotNet('error', { Type: event.type });
            case 'focus':
            case 'blur':
            case 'focusin':
            case 'focusout':
                return new EventForDotNet('focus', { Type: event.type });
            case 'keydown':
            case 'keyup':
            case 'keypress':
                return new EventForDotNet('keyboard', { Type: event.type, Key: event.key });
            case 'contextmenu':
            case 'click':
            case 'mouseover':
            case 'mouseout':
            case 'mousemove':
            case 'mousedown':
            case 'mouseup':
            case 'dblclick':
                return new EventForDotNet('mouse', { Type: event.type });
            case 'progress':
                return new EventForDotNet('progress', { Type: event.type });
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
                return new EventForDotNet('touch', { Type: event.type });
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointerenter':
            case 'pointerleave':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
                return new EventForDotNet('pointer', { Type: event.type });
            case 'mousewheel':
                return new EventForDotNet('wheel', { Type: event.type });
            default:
                return new EventForDotNet('unknown', { Type: event.type });
        }
    };
    return EventForDotNet;
}());
exports.EventForDotNet = EventForDotNet;
function isCheckbox(element) {
    return element && element.tagName === 'INPUT' && element.getAttribute('type') === 'checkbox';
}


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
  A LogicalElement plays the same role as an Element instance from the point of view of the
  API consumer. Inserting and removing logical elements updates the browser DOM just the same.

  The difference is that, unlike regular DOM mutation APIs, the LogicalElement APIs don't use
  the underlying DOM structure as the data storage for the element hierarchy. Instead, the
  LogicalElement APIs take care of tracking hierarchical relationships separately. The point
  of this is to permit a logical tree structure in which parent/child relationships don't
  have to be materialized in terms of DOM element parent/child relationships. And the reason
  why we want that is so that hierarchies of Blazor components can be tracked even when those
  components' render output need not be a single literal DOM element.

  Consumers of the API don't need to know about the implementation, but how it's done is:
  - Each LogicalElement is materialized in the DOM as either:
    - A Node instance, for actual Node instances inserted using 'insertLogicalChild' or
      for Element instances promoted to LogicalElement via 'toLogicalElement'
    - A Comment instance, for 'logical container' instances inserted using 'createAndInsertLogicalContainer'
  - Then, on that instance (i.e., the Node or Comment), we store an array of 'logical children'
    instances, e.g.,
      [firstChild, secondChild, thirdChild, ...]
    ... plus we store a reference to the 'logical parent' (if any)
  - The 'logical children' array means we can look up in O(1):
    - The number of logical children (not currently implemented because not required, but trivial)
    - The logical child at any given index
  - Whenever a logical child is added or removed, we update the parent's array of logical children
*/
Object.defineProperty(exports, "__esModule", { value: true });
var logicalChildrenPropname = createSymbolOrFallback('_blazorLogicalChildren');
var logicalParentPropname = createSymbolOrFallback('_blazorLogicalParent');
function toLogicalElement(element) {
    if (element.childNodes.length > 0) {
        throw new Error('New logical elements must start empty');
    }
    element[logicalChildrenPropname] = [];
    return element;
}
exports.toLogicalElement = toLogicalElement;
function createAndInsertLogicalContainer(parent, childIndex) {
    var containerElement = document.createComment('!');
    insertLogicalChild(containerElement, parent, childIndex);
    return containerElement;
}
exports.createAndInsertLogicalContainer = createAndInsertLogicalContainer;
function insertLogicalChild(child, parent, childIndex) {
    var childAsLogicalElement = child;
    if (child instanceof Comment) {
        var existingGrandchildren = getLogicalChildrenArray(childAsLogicalElement);
        if (existingGrandchildren && getLogicalChildrenArray(childAsLogicalElement).length > 0) {
            // There's nothing to stop us implementing support for this scenario, and it's not difficult
            // (after inserting 'child' itself, also iterate through its logical children and physically
            // put them as following-siblings in the DOM). However there's no scenario that requires it
            // presently, so if we did implement it there'd be no good way to have tests for it.
            throw new Error('Not implemented: inserting non-empty logical container');
        }
    }
    if (getLogicalParent(childAsLogicalElement)) {
        // Likewise, we could easily support this scenario too (in this 'if' block, just splice
        // out 'child' from the logical children array of its previous logical parent by using
        // Array.prototype.indexOf to determine its previous sibling index).
        // But again, since there's not currently any scenario that would use it, we would not
        // have any test coverage for such an implementation.
        throw new Error('Not implemented: moving existing logical children');
    }
    var newSiblings = getLogicalChildrenArray(parent);
    if (childIndex < newSiblings.length) {
        // Insert
        var nextSibling = newSiblings[childIndex];
        nextSibling.parentNode.insertBefore(child, nextSibling);
        newSiblings.splice(childIndex, 0, childAsLogicalElement);
    }
    else {
        // Append
        appendDomNode(child, parent);
        newSiblings.push(childAsLogicalElement);
    }
    childAsLogicalElement[logicalParentPropname] = parent;
    if (!(logicalChildrenPropname in childAsLogicalElement)) {
        childAsLogicalElement[logicalChildrenPropname] = [];
    }
}
exports.insertLogicalChild = insertLogicalChild;
function removeLogicalChild(parent, childIndex) {
    var childrenArray = getLogicalChildrenArray(parent);
    var childToRemove = childrenArray.splice(childIndex, 1)[0];
    // If it's a logical container, also remove its descendants
    if (childToRemove instanceof Comment) {
        var grandchildrenArray = getLogicalChildrenArray(childToRemove);
        while (grandchildrenArray.length > 0) {
            removeLogicalChild(childToRemove, 0);
        }
    }
    // Finally, remove the node itself
    var domNodeToRemove = childToRemove;
    domNodeToRemove.parentNode.removeChild(domNodeToRemove);
}
exports.removeLogicalChild = removeLogicalChild;
function getLogicalParent(element) {
    return element[logicalParentPropname] || null;
}
exports.getLogicalParent = getLogicalParent;
function getLogicalChild(parent, childIndex) {
    return getLogicalChildrenArray(parent)[childIndex];
}
exports.getLogicalChild = getLogicalChild;
function isSvgElement(element) {
    return getClosestDomElement(element).namespaceURI === 'http://www.w3.org/2000/svg';
}
exports.isSvgElement = isSvgElement;
function getLogicalChildrenArray(element) {
    return element[logicalChildrenPropname];
}
function getLogicalNextSibling(element) {
    var siblings = getLogicalChildrenArray(getLogicalParent(element));
    var siblingIndex = Array.prototype.indexOf.call(siblings, element);
    return siblings[siblingIndex + 1] || null;
}
function getClosestDomElement(logicalElement) {
    if (logicalElement instanceof Element) {
        return logicalElement;
    }
    else if (logicalElement instanceof Comment) {
        return logicalElement.parentNode;
    }
    else {
        throw new Error('Not a valid logical element');
    }
}
function appendDomNode(child, parent) {
    // This function only puts 'child' into the DOM in the right place relative to 'parent'
    // It does not update the logical children array of anything
    if (parent instanceof Element) {
        parent.appendChild(child);
    }
    else if (parent instanceof Comment) {
        var parentLogicalNextSibling = getLogicalNextSibling(parent);
        if (parentLogicalNextSibling) {
            // Since the parent has a logical next-sibling, its appended child goes right before that
            parentLogicalNextSibling.parentNode.insertBefore(child, parentLogicalNextSibling);
        }
        else {
            // Since the parent has no logical next-sibling, keep recursing upwards until we find
            // a logical ancestor that does have a next-sibling or is a physical element.
            appendDomNode(child, getLogicalParent(parent));
        }
    }
    else {
        // Should never happen
        throw new Error("Cannot append node because the parent is not a valid logical element. Parent: " + parent);
    }
}
function createSymbolOrFallback(fallback) {
    return typeof Symbol === 'function' ? Symbol() : fallback;
}
;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var RegisteredFunction_1 = __webpack_require__(1);
var Environment_1 = __webpack_require__(0);
var httpClientAssembly = 'Microsoft.AspNetCore.Blazor.Browser';
var httpClientNamespace = httpClientAssembly + ".Http";
var httpClientTypeName = 'BrowserHttpMessageHandler';
var httpClientFullTypeName = httpClientNamespace + "." + httpClientTypeName;
var receiveResponseMethod;
RegisteredFunction_1.registerFunction(httpClientFullTypeName + ".Send", function (id, method, requestUri, body, headersJson, fetchArgs) {
    sendAsync(id, method, requestUri, body, headersJson, fetchArgs);
});
function sendAsync(id, method, requestUri, body, headersJson, fetchArgs) {
    return __awaiter(this, void 0, void 0, function () {
        var response, responseText, requestInit, ex_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    requestInit = fetchArgs || {};
                    requestInit.method = method;
                    requestInit.body = body || undefined;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    requestInit.headers = headersJson ? JSON.parse(headersJson) : undefined;
                    return [4 /*yield*/, fetch(requestUri, requestInit)];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.text()];
                case 3:
                    responseText = _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    ex_1 = _a.sent();
                    dispatchErrorResponse(id, ex_1.toString());
                    return [2 /*return*/];
                case 5:
                    dispatchSuccessResponse(id, response, responseText);
                    return [2 /*return*/];
            }
        });
    });
}
function dispatchSuccessResponse(id, response, responseText) {
    var responseDescriptor = {
        StatusCode: response.status,
        Headers: []
    };
    response.headers.forEach(function (value, name) {
        responseDescriptor.Headers.push([name, value]);
    });
    dispatchResponse(id, Environment_1.platform.toDotNetString(JSON.stringify(responseDescriptor)), Environment_1.platform.toDotNetString(responseText), // TODO: Consider how to handle non-string responses
    /* errorMessage */ null);
}
function dispatchErrorResponse(id, errorMessage) {
    dispatchResponse(id, 
    /* responseDescriptor */ null, 
    /* responseText */ null, Environment_1.platform.toDotNetString(errorMessage));
}
function dispatchResponse(id, responseDescriptor, responseText, errorMessage) {
    if (!receiveResponseMethod) {
        receiveResponseMethod = Environment_1.platform.findMethod(httpClientAssembly, httpClientNamespace, httpClientTypeName, 'ReceiveResponse');
    }
    Environment_1.platform.callMethod(receiveResponseMethod, null, [
        Environment_1.platform.toDotNetString(id.toString()),
        responseDescriptor,
        responseText,
        errorMessage,
    ]);
}


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Environment_1 = __webpack_require__(0);
var RegisteredFunction_1 = __webpack_require__(1);
var UriHelper_1 = __webpack_require__(5);
if (typeof window !== 'undefined') {
    // When the library is loaded in a browser via a <script> element, make the
    // following APIs available in global scope for invocation from JS
    window['Blazor'] = {
        platform: Environment_1.platform,
        registerFunction: RegisteredFunction_1.registerFunction,
        navigateTo: UriHelper_1.navigateTo,
    };
}


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYWY2MmFjMDU3MTNmZGUwOGJhYTMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0Vudmlyb25tZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9JbnRlcm9wL1JlZ2lzdGVyZWRGdW5jdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUGxhdGZvcm0vRG90TmV0LnRzIiwid2VicGFjazovLy8uL3NyYy9SZW5kZXJpbmcvRWxlbWVudFJlZmVyZW5jZUNhcHR1cmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlbmRlcmluZy9SZW5kZXJlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU2VydmljZXMvVXJpSGVscGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9Cb290LnRzIiwid2VicGFjazovLy8uL3NyYy9QbGF0Zm9ybS9Nb25vL01vbm9QbGF0Zm9ybS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvSW50ZXJvcC9JbnRlcm5hbFJlZ2lzdGVyZWRGdW5jdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvSW50ZXJvcC9JbnZva2VXaXRoSnNvbk1hcnNoYWxsaW5nLnRzIiwid2VicGFjazovLy8uL3NyYy9SZW5kZXJpbmcvUmVuZGVyQmF0Y2gudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlbmRlcmluZy9Ccm93c2VyUmVuZGVyZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlbmRlcmluZy9SZW5kZXJUcmVlRWRpdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyaW5nL1JlbmRlclRyZWVGcmFtZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyaW5nL0V2ZW50RGVsZWdhdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9SZW5kZXJpbmcvRXZlbnRGb3JEb3ROZXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlbmRlcmluZy9Mb2dpY2FsRWxlbWVudHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NlcnZpY2VzL0h0dHAudHMiLCJ3ZWJwYWNrOi8v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LyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA2KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBhZjYyYWMwNTcxM2ZkZTA4YmFhMyIsIi8vIEV4cG9zZSBhbiBleHBvcnQgY2FsbGVkICdwbGF0Zm9ybScgb2YgdGhlIGludGVyZmFjZSB0eXBlICdQbGF0Zm9ybScsXHJcbi8vIHNvIHRoYXQgY29uc3VtZXJzIGNhbiBiZSBhZ25vc3RpYyBhYm91dCB3aGljaCBpbXBsZW1lbnRhdGlvbiB0aGV5IHVzZS5cclxuLy8gQmFzaWMgYWx0ZXJuYXRpdmUgdG8gaGF2aW5nIGFuIGFjdHVhbCBESSBjb250YWluZXIuXHJcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnLi9QbGF0Zm9ybS9QbGF0Zm9ybSc7XHJcbmltcG9ydCB7IG1vbm9QbGF0Zm9ybSB9IGZyb20gJy4vUGxhdGZvcm0vTW9uby9Nb25vUGxhdGZvcm0nO1xyXG5leHBvcnQgY29uc3QgcGxhdGZvcm06IFBsYXRmb3JtID0gbW9ub1BsYXRmb3JtO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvRW52aXJvbm1lbnQudHMiLCJpbXBvcnQgeyBpbnRlcm5hbFJlZ2lzdGVyZWRGdW5jdGlvbnMgfSBmcm9tICcuL0ludGVybmFsUmVnaXN0ZXJlZEZ1bmN0aW9uJztcclxuXHJcbmNvbnN0IHJlZ2lzdGVyZWRGdW5jdGlvbnM6IHsgW2lkZW50aWZpZXI6IHN0cmluZ106IEZ1bmN0aW9uIHwgdW5kZWZpbmVkIH0gPSB7fTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckZ1bmN0aW9uKGlkZW50aWZpZXI6IHN0cmluZywgaW1wbGVtZW50YXRpb246IEZ1bmN0aW9uKSB7XHJcbiAgaWYgKGludGVybmFsUmVnaXN0ZXJlZEZ1bmN0aW9ucy5oYXNPd25Qcm9wZXJ0eShpZGVudGlmaWVyKSkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgZnVuY3Rpb24gaWRlbnRpZmllciAnJHtpZGVudGlmaWVyfScgaXMgcmVzZXJ2ZWQgYW5kIGNhbm5vdCBiZSByZWdpc3RlcmVkLmApO1xyXG4gIH1cclxuXHJcbiAgaWYgKHJlZ2lzdGVyZWRGdW5jdGlvbnMuaGFzT3duUHJvcGVydHkoaWRlbnRpZmllcikpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihgQSBmdW5jdGlvbiB3aXRoIHRoZSBpZGVudGlmaWVyICcke2lkZW50aWZpZXJ9JyBoYXMgYWxyZWFkeSBiZWVuIHJlZ2lzdGVyZWQuYCk7XHJcbiAgfVxyXG5cclxuICByZWdpc3RlcmVkRnVuY3Rpb25zW2lkZW50aWZpZXJdID0gaW1wbGVtZW50YXRpb247XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRSZWdpc3RlcmVkRnVuY3Rpb24oaWRlbnRpZmllcjogc3RyaW5nKTogRnVuY3Rpb24ge1xyXG4gIC8vIEJ5IHByaW9yaXRpc2luZyB0aGUgaW50ZXJuYWwgb25lcywgd2UgZW5zdXJlIHlvdSBjYW4ndCBvdmVycmlkZSB0aGVtXHJcbiAgY29uc3QgcmVzdWx0ID0gaW50ZXJuYWxSZWdpc3RlcmVkRnVuY3Rpb25zW2lkZW50aWZpZXJdIHx8IHJlZ2lzdGVyZWRGdW5jdGlvbnNbaWRlbnRpZmllcl07XHJcbiAgaWYgKHJlc3VsdCkge1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9IGVsc2Uge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZmluZCByZWdpc3RlcmVkIGZ1bmN0aW9uIHdpdGggbmFtZSAnJHtpZGVudGlmaWVyfScuYCk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9JbnRlcm9wL1JlZ2lzdGVyZWRGdW5jdGlvbi50cyIsImV4cG9ydCBmdW5jdGlvbiBnZXRBc3NlbWJseU5hbWVGcm9tVXJsKHVybDogc3RyaW5nKSB7XHJcbiAgY29uc3QgbGFzdFNlZ21lbnQgPSB1cmwuc3Vic3RyaW5nKHVybC5sYXN0SW5kZXhPZignLycpICsgMSk7XHJcbiAgY29uc3QgcXVlcnlTdHJpbmdTdGFydFBvcyA9IGxhc3RTZWdtZW50LmluZGV4T2YoJz8nKTtcclxuICBjb25zdCBmaWxlbmFtZSA9IHF1ZXJ5U3RyaW5nU3RhcnRQb3MgPCAwID8gbGFzdFNlZ21lbnQgOiBsYXN0U2VnbWVudC5zdWJzdHJpbmcoMCwgcXVlcnlTdHJpbmdTdGFydFBvcyk7XHJcbiAgcmV0dXJuIGZpbGVuYW1lLnJlcGxhY2UoL1xcLmRsbCQvLCAnJyk7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1BsYXRmb3JtL0RvdE5ldC50cyIsImV4cG9ydCBmdW5jdGlvbiBhcHBseUNhcHR1cmVJZFRvRWxlbWVudChlbGVtZW50OiBFbGVtZW50LCByZWZlcmVuY2VDYXB0dXJlSWQ6IG51bWJlcikge1xyXG4gIGVsZW1lbnQuc2V0QXR0cmlidXRlKGdldENhcHR1cmVJZEF0dHJpYnV0ZU5hbWUocmVmZXJlbmNlQ2FwdHVyZUlkKSwgJycpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RWxlbWVudEJ5Q2FwdHVyZUlkKHJlZmVyZW5jZUNhcHR1cmVJZDogbnVtYmVyKSB7XHJcbiAgY29uc3Qgc2VsZWN0b3IgPSBgWyR7Z2V0Q2FwdHVyZUlkQXR0cmlidXRlTmFtZShyZWZlcmVuY2VDYXB0dXJlSWQpfV1gO1xyXG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Q2FwdHVyZUlkQXR0cmlidXRlTmFtZShyZWZlcmVuY2VDYXB0dXJlSWQ6IG51bWJlcikge1xyXG4gIHJldHVybiBgX2JsXyR7cmVmZXJlbmNlQ2FwdHVyZUlkfWA7XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvUmVuZGVyaW5nL0VsZW1lbnRSZWZlcmVuY2VDYXB0dXJlLnRzIiwiaW1wb3J0IHsgU3lzdGVtX09iamVjdCwgU3lzdGVtX1N0cmluZywgU3lzdGVtX0FycmF5LCBNZXRob2RIYW5kbGUsIFBvaW50ZXIgfSBmcm9tICcuLi9QbGF0Zm9ybS9QbGF0Zm9ybSc7XHJcbmltcG9ydCB7IHBsYXRmb3JtIH0gZnJvbSAnLi4vRW52aXJvbm1lbnQnO1xyXG5pbXBvcnQgeyByZW5kZXJCYXRjaCBhcyByZW5kZXJCYXRjaFN0cnVjdCwgYXJyYXlSYW5nZSwgYXJyYXlTZWdtZW50LCByZW5kZXJUcmVlRGlmZlN0cnVjdExlbmd0aCwgcmVuZGVyVHJlZURpZmYsIFJlbmRlckJhdGNoUG9pbnRlciwgUmVuZGVyVHJlZURpZmZQb2ludGVyIH0gZnJvbSAnLi9SZW5kZXJCYXRjaCc7XHJcbmltcG9ydCB7IEJyb3dzZXJSZW5kZXJlciB9IGZyb20gJy4vQnJvd3NlclJlbmRlcmVyJztcclxuXHJcbnR5cGUgQnJvd3NlclJlbmRlcmVyUmVnaXN0cnkgPSB7IFticm93c2VyUmVuZGVyZXJJZDogbnVtYmVyXTogQnJvd3NlclJlbmRlcmVyIH07XHJcbmNvbnN0IGJyb3dzZXJSZW5kZXJlcnM6IEJyb3dzZXJSZW5kZXJlclJlZ2lzdHJ5ID0ge307XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYXR0YWNoUm9vdENvbXBvbmVudFRvRWxlbWVudChicm93c2VyUmVuZGVyZXJJZDogbnVtYmVyLCBlbGVtZW50U2VsZWN0b3I6IFN5c3RlbV9TdHJpbmcsIGNvbXBvbmVudElkOiBudW1iZXIpIHtcclxuICBjb25zdCBlbGVtZW50U2VsZWN0b3JKcyA9IHBsYXRmb3JtLnRvSmF2YVNjcmlwdFN0cmluZyhlbGVtZW50U2VsZWN0b3IpO1xyXG4gIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsZW1lbnRTZWxlY3RvckpzKTtcclxuICBpZiAoIWVsZW1lbnQpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZpbmQgYW55IGVsZW1lbnQgbWF0Y2hpbmcgc2VsZWN0b3IgJyR7ZWxlbWVudFNlbGVjdG9ySnN9Jy5gKTtcclxuICB9XHJcblxyXG4gIGxldCBicm93c2VyUmVuZGVyZXIgPSBicm93c2VyUmVuZGVyZXJzW2Jyb3dzZXJSZW5kZXJlcklkXTtcclxuICBpZiAoIWJyb3dzZXJSZW5kZXJlcikge1xyXG4gICAgYnJvd3NlclJlbmRlcmVyID0gYnJvd3NlclJlbmRlcmVyc1ticm93c2VyUmVuZGVyZXJJZF0gPSBuZXcgQnJvd3NlclJlbmRlcmVyKGJyb3dzZXJSZW5kZXJlcklkKTtcclxuICB9XHJcbiAgY2xlYXJFbGVtZW50KGVsZW1lbnQpO1xyXG4gIGJyb3dzZXJSZW5kZXJlci5hdHRhY2hSb290Q29tcG9uZW50VG9FbGVtZW50KGNvbXBvbmVudElkLCBlbGVtZW50KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckJhdGNoKGJyb3dzZXJSZW5kZXJlcklkOiBudW1iZXIsIGJhdGNoOiBSZW5kZXJCYXRjaFBvaW50ZXIpIHtcclxuICBjb25zdCBicm93c2VyUmVuZGVyZXIgPSBicm93c2VyUmVuZGVyZXJzW2Jyb3dzZXJSZW5kZXJlcklkXTtcclxuICBpZiAoIWJyb3dzZXJSZW5kZXJlcikge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBUaGVyZSBpcyBubyBicm93c2VyIHJlbmRlcmVyIHdpdGggSUQgJHticm93c2VyUmVuZGVyZXJJZH0uYCk7XHJcbiAgfVxyXG4gIFxyXG4gIGNvbnN0IHVwZGF0ZWRDb21wb25lbnRzID0gcmVuZGVyQmF0Y2hTdHJ1Y3QudXBkYXRlZENvbXBvbmVudHMoYmF0Y2gpO1xyXG4gIGNvbnN0IHVwZGF0ZWRDb21wb25lbnRzTGVuZ3RoID0gYXJyYXlSYW5nZS5jb3VudCh1cGRhdGVkQ29tcG9uZW50cyk7XHJcbiAgY29uc3QgdXBkYXRlZENvbXBvbmVudHNBcnJheSA9IGFycmF5UmFuZ2UuYXJyYXkodXBkYXRlZENvbXBvbmVudHMpO1xyXG4gIGNvbnN0IHJlZmVyZW5jZUZyYW1lc1N0cnVjdCA9IHJlbmRlckJhdGNoU3RydWN0LnJlZmVyZW5jZUZyYW1lcyhiYXRjaCk7XHJcbiAgY29uc3QgcmVmZXJlbmNlRnJhbWVzID0gYXJyYXlSYW5nZS5hcnJheShyZWZlcmVuY2VGcmFtZXNTdHJ1Y3QpO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHVwZGF0ZWRDb21wb25lbnRzTGVuZ3RoOyBpKyspIHtcclxuICAgIGNvbnN0IGRpZmYgPSBwbGF0Zm9ybS5nZXRBcnJheUVudHJ5UHRyKHVwZGF0ZWRDb21wb25lbnRzQXJyYXksIGksIHJlbmRlclRyZWVEaWZmU3RydWN0TGVuZ3RoKTtcclxuICAgIGNvbnN0IGNvbXBvbmVudElkID0gcmVuZGVyVHJlZURpZmYuY29tcG9uZW50SWQoZGlmZik7XHJcblxyXG4gICAgY29uc3QgZWRpdHNBcnJheVNlZ21lbnQgPSByZW5kZXJUcmVlRGlmZi5lZGl0cyhkaWZmKTtcclxuICAgIGNvbnN0IGVkaXRzID0gYXJyYXlTZWdtZW50LmFycmF5KGVkaXRzQXJyYXlTZWdtZW50KTtcclxuICAgIGNvbnN0IGVkaXRzT2Zmc2V0ID0gYXJyYXlTZWdtZW50Lm9mZnNldChlZGl0c0FycmF5U2VnbWVudCk7XHJcbiAgICBjb25zdCBlZGl0c0xlbmd0aCA9IGFycmF5U2VnbWVudC5jb3VudChlZGl0c0FycmF5U2VnbWVudCk7XHJcblxyXG4gICAgYnJvd3NlclJlbmRlcmVyLnVwZGF0ZUNvbXBvbmVudChjb21wb25lbnRJZCwgZWRpdHMsIGVkaXRzT2Zmc2V0LCBlZGl0c0xlbmd0aCwgcmVmZXJlbmNlRnJhbWVzKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGRpc3Bvc2VkQ29tcG9uZW50SWRzID0gcmVuZGVyQmF0Y2hTdHJ1Y3QuZGlzcG9zZWRDb21wb25lbnRJZHMoYmF0Y2gpO1xyXG4gIGNvbnN0IGRpc3Bvc2VkQ29tcG9uZW50SWRzTGVuZ3RoID0gYXJyYXlSYW5nZS5jb3VudChkaXNwb3NlZENvbXBvbmVudElkcyk7XHJcbiAgY29uc3QgZGlzcG9zZWRDb21wb25lbnRJZHNBcnJheSA9IGFycmF5UmFuZ2UuYXJyYXkoZGlzcG9zZWRDb21wb25lbnRJZHMpO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGlzcG9zZWRDb21wb25lbnRJZHNMZW5ndGg7IGkrKykge1xyXG4gICAgY29uc3QgY29tcG9uZW50SWRQdHIgPSBwbGF0Zm9ybS5nZXRBcnJheUVudHJ5UHRyKGRpc3Bvc2VkQ29tcG9uZW50SWRzQXJyYXksIGksIDQpO1xyXG4gICAgY29uc3QgY29tcG9uZW50SWQgPSBwbGF0Zm9ybS5yZWFkSW50MzJGaWVsZChjb21wb25lbnRJZFB0cik7XHJcbiAgICBicm93c2VyUmVuZGVyZXIuZGlzcG9zZUNvbXBvbmVudChjb21wb25lbnRJZCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBkaXNwb3NlZEV2ZW50SGFuZGxlcklkcyA9IHJlbmRlckJhdGNoU3RydWN0LmRpc3Bvc2VkRXZlbnRIYW5kbGVySWRzKGJhdGNoKTtcclxuICBjb25zdCBkaXNwb3NlZEV2ZW50SGFuZGxlcklkc0xlbmd0aCA9IGFycmF5UmFuZ2UuY291bnQoZGlzcG9zZWRFdmVudEhhbmRsZXJJZHMpO1xyXG4gIGNvbnN0IGRpc3Bvc2VkRXZlbnRIYW5kbGVySWRzQXJyYXkgPSBhcnJheVJhbmdlLmFycmF5KGRpc3Bvc2VkRXZlbnRIYW5kbGVySWRzKTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGRpc3Bvc2VkRXZlbnRIYW5kbGVySWRzTGVuZ3RoOyBpKyspIHtcclxuICAgIGNvbnN0IGV2ZW50SGFuZGxlcklkUHRyID0gcGxhdGZvcm0uZ2V0QXJyYXlFbnRyeVB0cihkaXNwb3NlZEV2ZW50SGFuZGxlcklkc0FycmF5LCBpLCA0KTtcclxuICAgIGNvbnN0IGV2ZW50SGFuZGxlcklkID0gcGxhdGZvcm0ucmVhZEludDMyRmllbGQoZXZlbnRIYW5kbGVySWRQdHIpO1xyXG4gICAgYnJvd3NlclJlbmRlcmVyLmRpc3Bvc2VFdmVudEhhbmRsZXIoZXZlbnRIYW5kbGVySWQpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJFbGVtZW50KGVsZW1lbnQ6IEVsZW1lbnQpIHtcclxuICBsZXQgY2hpbGROb2RlOiBOb2RlIHwgbnVsbDtcclxuICB3aGlsZSAoY2hpbGROb2RlID0gZWxlbWVudC5maXJzdENoaWxkKSB7XHJcbiAgICBlbGVtZW50LnJlbW92ZUNoaWxkKGNoaWxkTm9kZSk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9SZW5kZXJpbmcvUmVuZGVyZXIudHMiLCJpbXBvcnQgeyByZWdpc3RlckZ1bmN0aW9uIH0gZnJvbSAnLi4vSW50ZXJvcC9SZWdpc3RlcmVkRnVuY3Rpb24nO1xyXG5pbXBvcnQgeyBwbGF0Zm9ybSB9IGZyb20gJy4uL0Vudmlyb25tZW50JztcclxuaW1wb3J0IHsgTWV0aG9kSGFuZGxlLCBTeXN0ZW1fU3RyaW5nIH0gZnJvbSAnLi4vUGxhdGZvcm0vUGxhdGZvcm0nO1xyXG5jb25zdCByZWdpc3RlcmVkRnVuY3Rpb25QcmVmaXggPSAnTWljcm9zb2Z0LkFzcE5ldENvcmUuQmxhem9yLkJyb3dzZXIuU2VydmljZXMuQnJvd3NlclVyaUhlbHBlcic7XHJcbmxldCBub3RpZnlMb2NhdGlvbkNoYW5nZWRNZXRob2Q6IE1ldGhvZEhhbmRsZTtcclxubGV0IGhhc1JlZ2lzdGVyZWRFdmVudExpc3RlbmVycyA9IGZhbHNlO1xyXG5cclxucmVnaXN0ZXJGdW5jdGlvbihgJHtyZWdpc3RlcmVkRnVuY3Rpb25QcmVmaXh9LmdldExvY2F0aW9uSHJlZmAsXHJcbiAgKCkgPT4gcGxhdGZvcm0udG9Eb3ROZXRTdHJpbmcobG9jYXRpb24uaHJlZikpO1xyXG5cclxucmVnaXN0ZXJGdW5jdGlvbihgJHtyZWdpc3RlcmVkRnVuY3Rpb25QcmVmaXh9LmdldEJhc2VVUklgLFxyXG4gICgpID0+IGRvY3VtZW50LmJhc2VVUkkgPyBwbGF0Zm9ybS50b0RvdE5ldFN0cmluZyhkb2N1bWVudC5iYXNlVVJJKSA6IG51bGwpO1xyXG5cclxucmVnaXN0ZXJGdW5jdGlvbihgJHtyZWdpc3RlcmVkRnVuY3Rpb25QcmVmaXh9LmVuYWJsZU5hdmlnYXRpb25JbnRlcmNlcHRpb25gLCAoKSA9PiB7XHJcbiAgaWYgKGhhc1JlZ2lzdGVyZWRFdmVudExpc3RlbmVycykge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICBoYXNSZWdpc3RlcmVkRXZlbnRMaXN0ZW5lcnMgPSB0cnVlO1xyXG5cclxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcclxuICAgIC8vIEludGVyY2VwdCBjbGlja3Mgb24gYWxsIDxhPiBlbGVtZW50cyB3aGVyZSB0aGUgaHJlZiBpcyB3aXRoaW4gdGhlIDxiYXNlIGhyZWY+IFVSSSBzcGFjZVxyXG4gICAgY29uc3QgYW5jaG9yVGFyZ2V0ID0gZmluZENsb3Nlc3RBbmNlc3RvcihldmVudC50YXJnZXQgYXMgRWxlbWVudCB8IG51bGwsICdBJyk7XHJcbiAgICBpZiAoYW5jaG9yVGFyZ2V0KSB7XHJcbiAgICAgIGNvbnN0IGhyZWYgPSBhbmNob3JUYXJnZXQuZ2V0QXR0cmlidXRlKCdocmVmJyk7XHJcbiAgICAgIGlmIChpc1dpdGhpbkJhc2VVcmlTcGFjZSh0b0Fic29sdXRlVXJpKGhyZWYpKSkge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgcGVyZm9ybUludGVybmFsTmF2aWdhdGlvbihocmVmKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCBoYW5kbGVJbnRlcm5hbE5hdmlnYXRpb24pO1xyXG59KTtcclxuXHJcbnJlZ2lzdGVyRnVuY3Rpb24oYCR7cmVnaXN0ZXJlZEZ1bmN0aW9uUHJlZml4fS5uYXZpZ2F0ZVRvYCwgKHVyaURvdE5ldFN0cmluZzogU3lzdGVtX1N0cmluZykgPT4ge1xyXG4gIG5hdmlnYXRlVG8ocGxhdGZvcm0udG9KYXZhU2NyaXB0U3RyaW5nKHVyaURvdE5ldFN0cmluZykpO1xyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBuYXZpZ2F0ZVRvKHVyaTogc3RyaW5nKSB7XHJcbiAgaWYgKGlzV2l0aGluQmFzZVVyaVNwYWNlKHRvQWJzb2x1dGVVcmkodXJpKSkpIHtcclxuICAgIHBlcmZvcm1JbnRlcm5hbE5hdmlnYXRpb24odXJpKTtcclxuICB9IGVsc2Uge1xyXG4gICAgbG9jYXRpb24uaHJlZiA9IHVyaTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBlcmZvcm1JbnRlcm5hbE5hdmlnYXRpb24oaHJlZjogc3RyaW5nKSB7XHJcbiAgaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgLyogaWdub3JlZCB0aXRsZSAqLyAnJywgaHJlZik7XHJcbiAgaGFuZGxlSW50ZXJuYWxOYXZpZ2F0aW9uKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhhbmRsZUludGVybmFsTmF2aWdhdGlvbigpIHtcclxuICBpZiAoIW5vdGlmeUxvY2F0aW9uQ2hhbmdlZE1ldGhvZCkge1xyXG4gICAgbm90aWZ5TG9jYXRpb25DaGFuZ2VkTWV0aG9kID0gcGxhdGZvcm0uZmluZE1ldGhvZChcclxuICAgICAgJ01pY3Jvc29mdC5Bc3BOZXRDb3JlLkJsYXpvci5Ccm93c2VyJyxcclxuICAgICAgJ01pY3Jvc29mdC5Bc3BOZXRDb3JlLkJsYXpvci5Ccm93c2VyLlNlcnZpY2VzJyxcclxuICAgICAgJ0Jyb3dzZXJVcmlIZWxwZXInLFxyXG4gICAgICAnTm90aWZ5TG9jYXRpb25DaGFuZ2VkJ1xyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHBsYXRmb3JtLmNhbGxNZXRob2Qobm90aWZ5TG9jYXRpb25DaGFuZ2VkTWV0aG9kLCBudWxsLCBbXHJcbiAgICBwbGF0Zm9ybS50b0RvdE5ldFN0cmluZyhsb2NhdGlvbi5ocmVmKVxyXG4gIF0pO1xyXG59XHJcblxyXG5sZXQgdGVzdEFuY2hvcjogSFRNTEFuY2hvckVsZW1lbnQ7XHJcbmZ1bmN0aW9uIHRvQWJzb2x1dGVVcmkocmVsYXRpdmVVcmk6IHN0cmluZykge1xyXG4gIHRlc3RBbmNob3IgPSB0ZXN0QW5jaG9yIHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICB0ZXN0QW5jaG9yLmhyZWYgPSByZWxhdGl2ZVVyaTtcclxuICByZXR1cm4gdGVzdEFuY2hvci5ocmVmO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmaW5kQ2xvc2VzdEFuY2VzdG9yKGVsZW1lbnQ6IEVsZW1lbnQgfCBudWxsLCB0YWdOYW1lOiBzdHJpbmcpIHtcclxuICByZXR1cm4gIWVsZW1lbnRcclxuICAgID8gbnVsbFxyXG4gICAgOiBlbGVtZW50LnRhZ05hbWUgPT09IHRhZ05hbWVcclxuICAgICAgPyBlbGVtZW50XHJcbiAgICAgIDogZmluZENsb3Nlc3RBbmNlc3RvcihlbGVtZW50LnBhcmVudEVsZW1lbnQsIHRhZ05hbWUpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzV2l0aGluQmFzZVVyaVNwYWNlKGhyZWY6IHN0cmluZykge1xyXG4gIGNvbnN0IGJhc2VVcmlQcmVmaXhXaXRoVHJhaWxpbmdTbGFzaCA9IHRvQmFzZVVyaVByZWZpeFdpdGhUcmFpbGluZ1NsYXNoKGRvY3VtZW50LmJhc2VVUkkhKTsgLy8gVE9ETzogTWlnaHQgYmFzZVVSSSByZWFsbHkgYmUgbnVsbD9cclxuICByZXR1cm4gaHJlZi5zdGFydHNXaXRoKGJhc2VVcmlQcmVmaXhXaXRoVHJhaWxpbmdTbGFzaCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvQmFzZVVyaVByZWZpeFdpdGhUcmFpbGluZ1NsYXNoKGJhc2VVcmk6IHN0cmluZykge1xyXG4gIHJldHVybiBiYXNlVXJpLnN1YnN0cigwLCBiYXNlVXJpLmxhc3RJbmRleE9mKCcvJykgKyAxKTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvU2VydmljZXMvVXJpSGVscGVyLnRzIiwiaW1wb3J0IHsgcGxhdGZvcm0gfSBmcm9tICcuL0Vudmlyb25tZW50JztcclxuaW1wb3J0IHsgZ2V0QXNzZW1ibHlOYW1lRnJvbVVybCB9IGZyb20gJy4vUGxhdGZvcm0vRG90TmV0JztcclxuaW1wb3J0ICcuL1JlbmRlcmluZy9SZW5kZXJlcic7XHJcbmltcG9ydCAnLi9TZXJ2aWNlcy9IdHRwJztcclxuaW1wb3J0ICcuL1NlcnZpY2VzL1VyaUhlbHBlcic7XHJcbmltcG9ydCAnLi9HbG9iYWxFeHBvcnRzJztcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGJvb3QoKSB7XHJcbiAgLy8gUmVhZCBzdGFydHVwIGNvbmZpZyBmcm9tIHRoZSA8c2NyaXB0PiBlbGVtZW50IHRoYXQncyBpbXBvcnRpbmcgdGhpcyBmaWxlXHJcbiAgY29uc3QgYWxsU2NyaXB0RWxlbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0Jyk7XHJcbiAgY29uc3QgdGhpc1NjcmlwdEVsZW0gPSAoZG9jdW1lbnQuY3VycmVudFNjcmlwdCB8fCBhbGxTY3JpcHRFbGVtc1thbGxTY3JpcHRFbGVtcy5sZW5ndGggLSAxXSkgYXMgSFRNTFNjcmlwdEVsZW1lbnQ7XHJcbiAgY29uc3QgaXNMaW5rZXJFbmFibGVkID0gdGhpc1NjcmlwdEVsZW0uZ2V0QXR0cmlidXRlKCdsaW5rZXItZW5hYmxlZCcpID09PSAndHJ1ZSc7XHJcbiAgY29uc3QgZW50cnlQb2ludERsbCA9IGdldFJlcXVpcmVkQm9vdFNjcmlwdEF0dHJpYnV0ZSh0aGlzU2NyaXB0RWxlbSwgJ21haW4nKTtcclxuICBjb25zdCBlbnRyeVBvaW50TWV0aG9kID0gZ2V0UmVxdWlyZWRCb290U2NyaXB0QXR0cmlidXRlKHRoaXNTY3JpcHRFbGVtLCAnZW50cnlwb2ludCcpO1xyXG4gIGNvbnN0IGVudHJ5UG9pbnRBc3NlbWJseU5hbWUgPSBnZXRBc3NlbWJseU5hbWVGcm9tVXJsKGVudHJ5UG9pbnREbGwpO1xyXG4gIGNvbnN0IHJlZmVyZW5jZUFzc2VtYmxpZXNDb21tYVNlcGFyYXRlZCA9IHRoaXNTY3JpcHRFbGVtLmdldEF0dHJpYnV0ZSgncmVmZXJlbmNlcycpIHx8ICcnO1xyXG4gIGNvbnN0IHJlZmVyZW5jZUFzc2VtYmxpZXMgPSByZWZlcmVuY2VBc3NlbWJsaWVzQ29tbWFTZXBhcmF0ZWRcclxuICAgIC5zcGxpdCgnLCcpXHJcbiAgICAubWFwKHMgPT4gcy50cmltKCkpXHJcbiAgICAuZmlsdGVyKHMgPT4gISFzKTtcclxuXHJcbiAgaWYgKCFpc0xpbmtlckVuYWJsZWQpIHtcclxuICAgIGNvbnNvbGUuaW5mbygnQmxhem9yIGlzIHJ1bm5pbmcgaW4gZGV2IG1vZGUgd2l0aG91dCBJTCBzdHJpcHBpbmcuIFRvIG1ha2UgdGhlIGJ1bmRsZSBzaXplIHNpZ25pZmljYW50bHkgc21hbGxlciwgcHVibGlzaCB0aGUgYXBwbGljYXRpb24gb3Igc2VlIGh0dHBzOi8vZ28ubWljcm9zb2Z0LmNvbS9md2xpbmsvP2xpbmtpZD04NzA0MTQnKTtcclxuICB9XHJcblxyXG4gIC8vIERldGVybWluZSB0aGUgVVJMcyBvZiB0aGUgYXNzZW1ibGllcyB3ZSB3YW50IHRvIGxvYWRcclxuICBjb25zdCBsb2FkQXNzZW1ibHlVcmxzID0gW2VudHJ5UG9pbnREbGxdXHJcbiAgICAuY29uY2F0KHJlZmVyZW5jZUFzc2VtYmxpZXMpXHJcbiAgICAubWFwKGZpbGVuYW1lID0+IGBfZnJhbWV3b3JrL19iaW4vJHtmaWxlbmFtZX1gKTtcclxuXHJcbiAgdHJ5IHtcclxuICAgIGF3YWl0IHBsYXRmb3JtLnN0YXJ0KGxvYWRBc3NlbWJseVVybHMpO1xyXG4gIH0gY2F0Y2ggKGV4KSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBzdGFydCBwbGF0Zm9ybS4gUmVhc29uOiAke2V4fWApO1xyXG4gIH1cclxuXHJcbiAgLy8gU3RhcnQgdXAgdGhlIGFwcGxpY2F0aW9uXHJcbiAgcGxhdGZvcm0uY2FsbEVudHJ5UG9pbnQoZW50cnlQb2ludEFzc2VtYmx5TmFtZSwgZW50cnlQb2ludE1ldGhvZCwgW10pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRSZXF1aXJlZEJvb3RTY3JpcHRBdHRyaWJ1dGUoZWxlbTogSFRNTFNjcmlwdEVsZW1lbnQsIGF0dHJpYnV0ZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgY29uc3QgcmVzdWx0ID0gZWxlbS5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7XHJcbiAgaWYgKCFyZXN1bHQpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihgTWlzc2luZyBcIiR7YXR0cmlidXRlTmFtZX1cIiBhdHRyaWJ1dGUgb24gQmxhem9yIHNjcmlwdCB0YWcuYCk7XHJcbiAgfVxyXG4gIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmJvb3QoKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0Jvb3QudHMiLCJpbXBvcnQgeyBNZXRob2RIYW5kbGUsIFN5c3RlbV9PYmplY3QsIFN5c3RlbV9TdHJpbmcsIFN5c3RlbV9BcnJheSwgUG9pbnRlciwgUGxhdGZvcm0gfSBmcm9tICcuLi9QbGF0Zm9ybSc7XHJcbmltcG9ydCB7IGdldEFzc2VtYmx5TmFtZUZyb21VcmwgfSBmcm9tICcuLi9Eb3ROZXQnO1xyXG5pbXBvcnQgeyBnZXRSZWdpc3RlcmVkRnVuY3Rpb24gfSBmcm9tICcuLi8uLi9JbnRlcm9wL1JlZ2lzdGVyZWRGdW5jdGlvbic7XHJcblxyXG5jb25zdCBhc3NlbWJseUhhbmRsZUNhY2hlOiB7IFthc3NlbWJseU5hbWU6IHN0cmluZ106IG51bWJlciB9ID0ge307XHJcbmNvbnN0IHR5cGVIYW5kbGVDYWNoZTogeyBbZnVsbHlRdWFsaWZpZWRUeXBlTmFtZTogc3RyaW5nXTogbnVtYmVyIH0gPSB7fTtcclxuY29uc3QgbWV0aG9kSGFuZGxlQ2FjaGU6IHsgW2Z1bGx5UXVhbGlmaWVkTWV0aG9kTmFtZTogc3RyaW5nXTogTWV0aG9kSGFuZGxlIH0gPSB7fTtcclxuXHJcbmxldCBhc3NlbWJseV9sb2FkOiAoYXNzZW1ibHlOYW1lOiBzdHJpbmcpID0+IG51bWJlcjtcclxubGV0IGZpbmRfY2xhc3M6IChhc3NlbWJseUhhbmRsZTogbnVtYmVyLCBuYW1lc3BhY2U6IHN0cmluZywgY2xhc3NOYW1lOiBzdHJpbmcpID0+IG51bWJlcjtcclxubGV0IGZpbmRfbWV0aG9kOiAodHlwZUhhbmRsZTogbnVtYmVyLCBtZXRob2ROYW1lOiBzdHJpbmcsIHVua25vd25Bcmc6IG51bWJlcikgPT4gTWV0aG9kSGFuZGxlO1xyXG5sZXQgaW52b2tlX21ldGhvZDogKG1ldGhvZDogTWV0aG9kSGFuZGxlLCB0YXJnZXQ6IFN5c3RlbV9PYmplY3QsIGFyZ3NBcnJheVB0cjogbnVtYmVyLCBleGNlcHRpb25GbGFnSW50UHRyOiBudW1iZXIpID0+IFN5c3RlbV9PYmplY3Q7XHJcbmxldCBtb25vX3N0cmluZ19nZXRfdXRmODogKG1hbmFnZWRTdHJpbmc6IFN5c3RlbV9TdHJpbmcpID0+IE1vbm8uVXRmOFB0cjtcclxubGV0IG1vbm9fc3RyaW5nOiAoanNTdHJpbmc6IHN0cmluZykgPT4gU3lzdGVtX1N0cmluZztcclxuXHJcbmV4cG9ydCBjb25zdCBtb25vUGxhdGZvcm06IFBsYXRmb3JtID0ge1xyXG4gIHN0YXJ0OiBmdW5jdGlvbiBzdGFydChsb2FkQXNzZW1ibHlVcmxzOiBzdHJpbmdbXSkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgLy8gbW9uby5qcyBhc3N1bWVzIHRoZSBleGlzdGVuY2Ugb2YgdGhpc1xyXG4gICAgICB3aW5kb3dbJ0Jyb3dzZXInXSA9IHtcclxuICAgICAgICBpbml0OiAoKSA9PiB7IH0sXHJcbiAgICAgICAgYXN5bmNMb2FkOiBhc3luY0xvYWRcclxuICAgICAgfTtcclxuICAgICAgLy8gRW1zY3JpcHRlbiB3b3JrcyBieSBleHBlY3RpbmcgdGhlIG1vZHVsZSBjb25maWcgdG8gYmUgYSBnbG9iYWxcclxuICAgICAgd2luZG93WydNb2R1bGUnXSA9IGNyZWF0ZUVtc2NyaXB0ZW5Nb2R1bGVJbnN0YW5jZShsb2FkQXNzZW1ibHlVcmxzLCByZXNvbHZlLCByZWplY3QpO1xyXG5cclxuICAgICAgYWRkU2NyaXB0VGFnc1RvRG9jdW1lbnQoKTtcclxuICAgIH0pO1xyXG4gIH0sXHJcblxyXG4gIGZpbmRNZXRob2Q6IGZpbmRNZXRob2QsXHJcblxyXG4gIGNhbGxFbnRyeVBvaW50OiBmdW5jdGlvbiBjYWxsRW50cnlQb2ludChhc3NlbWJseU5hbWU6IHN0cmluZywgZW50cnlwb2ludE1ldGhvZDogc3RyaW5nLCBhcmdzOiBTeXN0ZW1fT2JqZWN0W10pOiB2b2lkIHtcclxuICAgIC8vIFBhcnNlIHRoZSBlbnRyeXBvaW50TWV0aG9kLCB3aGljaCBpcyBvZiB0aGUgZm9ybSBNeUFwcC5NeU5hbWVzcGFjZS5NeVR5cGVOYW1lOjpNeU1ldGhvZE5hbWVcclxuICAgIC8vIE5vdGUgdGhhdCB3ZSBkb24ndCBzdXBwb3J0IHNwZWNpZnlpbmcgYSBtZXRob2Qgb3ZlcmxvYWQsIHNvIGl0IGhhcyB0byBiZSB1bmlxdWVcclxuICAgIGNvbnN0IGVudHJ5cG9pbnRTZWdtZW50cyA9IGVudHJ5cG9pbnRNZXRob2Quc3BsaXQoJzo6Jyk7XHJcbiAgICBpZiAoZW50cnlwb2ludFNlZ21lbnRzLmxlbmd0aCAhPSAyKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWFsZm9ybWVkIGVudHJ5IHBvaW50IG1ldGhvZCBuYW1lOyBjb3VsZCBub3QgcmVzb2x2ZSBjbGFzcyBuYW1lIGFuZCBtZXRob2QgbmFtZS4nKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHR5cGVGdWxsTmFtZSA9IGVudHJ5cG9pbnRTZWdtZW50c1swXTtcclxuICAgIGNvbnN0IG1ldGhvZE5hbWUgPSBlbnRyeXBvaW50U2VnbWVudHNbMV07XHJcbiAgICBjb25zdCBsYXN0RG90ID0gdHlwZUZ1bGxOYW1lLmxhc3RJbmRleE9mKCcuJyk7XHJcbiAgICBjb25zdCBuYW1lc3BhY2UgPSBsYXN0RG90ID4gLTEgPyB0eXBlRnVsbE5hbWUuc3Vic3RyaW5nKDAsIGxhc3REb3QpIDogJyc7XHJcbiAgICBjb25zdCB0eXBlU2hvcnROYW1lID0gbGFzdERvdCA+IC0xID8gdHlwZUZ1bGxOYW1lLnN1YnN0cmluZyhsYXN0RG90ICsgMSkgOiB0eXBlRnVsbE5hbWU7XHJcblxyXG4gICAgY29uc3QgZW50cnlQb2ludE1ldGhvZEhhbmRsZSA9IG1vbm9QbGF0Zm9ybS5maW5kTWV0aG9kKGFzc2VtYmx5TmFtZSwgbmFtZXNwYWNlLCB0eXBlU2hvcnROYW1lLCBtZXRob2ROYW1lKTtcclxuICAgIG1vbm9QbGF0Zm9ybS5jYWxsTWV0aG9kKGVudHJ5UG9pbnRNZXRob2RIYW5kbGUsIG51bGwsIGFyZ3MpO1xyXG4gIH0sXHJcblxyXG4gIGNhbGxNZXRob2Q6IGZ1bmN0aW9uIGNhbGxNZXRob2QobWV0aG9kOiBNZXRob2RIYW5kbGUsIHRhcmdldDogU3lzdGVtX09iamVjdCwgYXJnczogU3lzdGVtX09iamVjdFtdKTogU3lzdGVtX09iamVjdCB7XHJcbiAgICBpZiAoYXJncy5sZW5ndGggPiA0KSB7XHJcbiAgICAgIC8vIEhvcGVmdWxseSB0aGlzIHJlc3RyaWN0aW9uIGNhbiBiZSBlYXNlZCBzb29uLCBidXQgZm9yIG5vdyBtYWtlIGl0IGNsZWFyIHdoYXQncyBnb2luZyBvblxyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEN1cnJlbnRseSwgTW9ub1BsYXRmb3JtIHN1cHBvcnRzIHBhc3NpbmcgYSBtYXhpbXVtIG9mIDQgYXJndW1lbnRzIGZyb20gSlMgdG8gLk5FVC4gWW91IHRyaWVkIHRvIHBhc3MgJHthcmdzLmxlbmd0aH0uYCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc3RhY2sgPSBNb2R1bGUuc3RhY2tTYXZlKCk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgYXJnc0J1ZmZlciA9IE1vZHVsZS5zdGFja0FsbG9jKGFyZ3MubGVuZ3RoKTtcclxuICAgICAgY29uc3QgZXhjZXB0aW9uRmxhZ01hbmFnZWRJbnQgPSBNb2R1bGUuc3RhY2tBbGxvYyg0KTtcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgTW9kdWxlLnNldFZhbHVlKGFyZ3NCdWZmZXIgKyBpICogNCwgYXJnc1tpXSwgJ2kzMicpO1xyXG4gICAgICB9XHJcbiAgICAgIE1vZHVsZS5zZXRWYWx1ZShleGNlcHRpb25GbGFnTWFuYWdlZEludCwgMCwgJ2kzMicpO1xyXG5cclxuICAgICAgY29uc3QgcmVzID0gaW52b2tlX21ldGhvZChtZXRob2QsIHRhcmdldCwgYXJnc0J1ZmZlciwgZXhjZXB0aW9uRmxhZ01hbmFnZWRJbnQpO1xyXG5cclxuICAgICAgaWYgKE1vZHVsZS5nZXRWYWx1ZShleGNlcHRpb25GbGFnTWFuYWdlZEludCwgJ2kzMicpICE9PSAwKSB7XHJcbiAgICAgICAgLy8gSWYgdGhlIGV4Y2VwdGlvbiBmbGFnIGlzIHNldCwgdGhlIHJldHVybmVkIHZhbHVlIGlzIGV4Y2VwdGlvbi5Ub1N0cmluZygpXHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1vbm9QbGF0Zm9ybS50b0phdmFTY3JpcHRTdHJpbmcoPFN5c3RlbV9TdHJpbmc+cmVzKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiByZXM7XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBNb2R1bGUuc3RhY2tSZXN0b3JlKHN0YWNrKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICB0b0phdmFTY3JpcHRTdHJpbmc6IGZ1bmN0aW9uIHRvSmF2YVNjcmlwdFN0cmluZyhtYW5hZ2VkU3RyaW5nOiBTeXN0ZW1fU3RyaW5nKSB7XHJcbiAgICAvLyBDb21tZW50cyBmcm9tIG9yaWdpbmFsIE1vbm8gc2FtcGxlOlxyXG4gICAgLy9GSVhNRSB0aGlzIGlzIHdhc3RlZnVsbCwgd2UgY291bGQgcmVtb3ZlIHRoZSB0ZW1wIG1hbGxvYyBieSBnb2luZyB0aGUgVVRGMTYgcm91dGVcclxuICAgIC8vRklYTUUgdGhpcyBpcyB1bnNhZmUsIGN1eiByYXcgb2JqZWN0cyBjb3VsZCBiZSBHQydkLlxyXG5cclxuICAgIGNvbnN0IHV0ZjggPSBtb25vX3N0cmluZ19nZXRfdXRmOChtYW5hZ2VkU3RyaW5nKTtcclxuICAgIGNvbnN0IHJlcyA9IE1vZHVsZS5VVEY4VG9TdHJpbmcodXRmOCk7XHJcbiAgICBNb2R1bGUuX2ZyZWUodXRmOCBhcyBhbnkpO1xyXG4gICAgcmV0dXJuIHJlcztcclxuICB9LFxyXG5cclxuICB0b0RvdE5ldFN0cmluZzogZnVuY3Rpb24gdG9Eb3ROZXRTdHJpbmcoanNTdHJpbmc6IHN0cmluZyk6IFN5c3RlbV9TdHJpbmcge1xyXG4gICAgcmV0dXJuIG1vbm9fc3RyaW5nKGpzU3RyaW5nKTtcclxuICB9LFxyXG5cclxuICBnZXRBcnJheUxlbmd0aDogZnVuY3Rpb24gZ2V0QXJyYXlMZW5ndGgoYXJyYXk6IFN5c3RlbV9BcnJheTxhbnk+KTogbnVtYmVyIHtcclxuICAgIHJldHVybiBNb2R1bGUuZ2V0VmFsdWUoZ2V0QXJyYXlEYXRhUG9pbnRlcihhcnJheSksICdpMzInKTtcclxuICB9LFxyXG5cclxuICBnZXRBcnJheUVudHJ5UHRyOiBmdW5jdGlvbiBnZXRBcnJheUVudHJ5UHRyPFRQdHIgZXh0ZW5kcyBQb2ludGVyPihhcnJheTogU3lzdGVtX0FycmF5PFRQdHI+LCBpbmRleDogbnVtYmVyLCBpdGVtU2l6ZTogbnVtYmVyKTogVFB0ciB7XHJcbiAgICAvLyBGaXJzdCBieXRlIGlzIGFycmF5IGxlbmd0aCwgZm9sbG93ZWQgYnkgZW50cmllc1xyXG4gICAgY29uc3QgYWRkcmVzcyA9IGdldEFycmF5RGF0YVBvaW50ZXIoYXJyYXkpICsgNCArIGluZGV4ICogaXRlbVNpemU7XHJcbiAgICByZXR1cm4gYWRkcmVzcyBhcyBhbnkgYXMgVFB0cjtcclxuICB9LFxyXG5cclxuICBnZXRPYmplY3RGaWVsZHNCYXNlQWRkcmVzczogZnVuY3Rpb24gZ2V0T2JqZWN0RmllbGRzQmFzZUFkZHJlc3MocmVmZXJlbmNlVHlwZWRPYmplY3Q6IFN5c3RlbV9PYmplY3QpOiBQb2ludGVyIHtcclxuICAgIC8vIFRoZSBmaXJzdCB0d28gaW50MzIgdmFsdWVzIGFyZSBpbnRlcm5hbCBNb25vIGRhdGFcclxuICAgIHJldHVybiAocmVmZXJlbmNlVHlwZWRPYmplY3QgYXMgYW55IGFzIG51bWJlciArIDgpIGFzIGFueSBhcyBQb2ludGVyO1xyXG4gIH0sXHJcblxyXG4gIHJlYWRJbnQzMkZpZWxkOiBmdW5jdGlvbiByZWFkSGVhcEludDMyKGJhc2VBZGRyZXNzOiBQb2ludGVyLCBmaWVsZE9mZnNldD86IG51bWJlcik6IG51bWJlciB7XHJcbiAgICByZXR1cm4gTW9kdWxlLmdldFZhbHVlKChiYXNlQWRkcmVzcyBhcyBhbnkgYXMgbnVtYmVyKSArIChmaWVsZE9mZnNldCB8fCAwKSwgJ2kzMicpO1xyXG4gIH0sXHJcblxyXG4gIHJlYWRGbG9hdEZpZWxkOiBmdW5jdGlvbiByZWFkSGVhcEZsb2F0KGJhc2VBZGRyZXNzOiBQb2ludGVyLCBmaWVsZE9mZnNldD86IG51bWJlcik6IG51bWJlciB7XHJcbiAgICByZXR1cm4gTW9kdWxlLmdldFZhbHVlKChiYXNlQWRkcmVzcyBhcyBhbnkgYXMgbnVtYmVyKSArIChmaWVsZE9mZnNldCB8fCAwKSwgJ2Zsb2F0Jyk7XHJcbiAgfSxcclxuXHJcbiAgcmVhZE9iamVjdEZpZWxkOiBmdW5jdGlvbiByZWFkSGVhcE9iamVjdDxUIGV4dGVuZHMgU3lzdGVtX09iamVjdD4oYmFzZUFkZHJlc3M6IFBvaW50ZXIsIGZpZWxkT2Zmc2V0PzogbnVtYmVyKTogVCB7XHJcbiAgICByZXR1cm4gTW9kdWxlLmdldFZhbHVlKChiYXNlQWRkcmVzcyBhcyBhbnkgYXMgbnVtYmVyKSArIChmaWVsZE9mZnNldCB8fCAwKSwgJ2kzMicpIGFzIGFueSBhcyBUO1xyXG4gIH0sXHJcblxyXG4gIHJlYWRTdHJpbmdGaWVsZDogZnVuY3Rpb24gcmVhZEhlYXBPYmplY3QoYmFzZUFkZHJlc3M6IFBvaW50ZXIsIGZpZWxkT2Zmc2V0PzogbnVtYmVyKTogc3RyaW5nIHwgbnVsbCB7XHJcbiAgICBjb25zdCBmaWVsZFZhbHVlID0gTW9kdWxlLmdldFZhbHVlKChiYXNlQWRkcmVzcyBhcyBhbnkgYXMgbnVtYmVyKSArIChmaWVsZE9mZnNldCB8fCAwKSwgJ2kzMicpO1xyXG4gICAgcmV0dXJuIGZpZWxkVmFsdWUgPT09IDAgPyBudWxsIDogbW9ub1BsYXRmb3JtLnRvSmF2YVNjcmlwdFN0cmluZyhmaWVsZFZhbHVlIGFzIGFueSBhcyBTeXN0ZW1fU3RyaW5nKTtcclxuICB9LFxyXG5cclxuICByZWFkU3RydWN0RmllbGQ6IGZ1bmN0aW9uIHJlYWRTdHJ1Y3RGaWVsZDxUIGV4dGVuZHMgUG9pbnRlcj4oYmFzZUFkZHJlc3M6IFBvaW50ZXIsIGZpZWxkT2Zmc2V0PzogbnVtYmVyKTogVCB7XHJcbiAgICByZXR1cm4gKChiYXNlQWRkcmVzcyBhcyBhbnkgYXMgbnVtYmVyKSArIChmaWVsZE9mZnNldCB8fCAwKSkgYXMgYW55IGFzIFQ7XHJcbiAgfSxcclxufTtcclxuXHJcbi8vIEJ5cGFzcyBub3JtYWwgdHlwZSBjaGVja2luZyB0byBhZGQgdGhpcyBleHRyYSBmdW5jdGlvbi4gSXQncyBvbmx5IGludGVuZGVkIHRvIGJlIGNhbGxlZCBmcm9tXHJcbi8vIHRoZSBKUyBjb2RlIGluIE1vbm8ncyBkcml2ZXIuYy4gSXQncyBuZXZlciBpbnRlbmRlZCB0byBiZSBjYWxsZWQgZnJvbSBUeXBlU2NyaXB0LlxyXG4obW9ub1BsYXRmb3JtIGFzIGFueSkubW9ub0dldFJlZ2lzdGVyZWRGdW5jdGlvbiA9IGdldFJlZ2lzdGVyZWRGdW5jdGlvbjtcclxuXHJcbmZ1bmN0aW9uIGZpbmRBc3NlbWJseShhc3NlbWJseU5hbWU6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgbGV0IGFzc2VtYmx5SGFuZGxlID0gYXNzZW1ibHlIYW5kbGVDYWNoZVthc3NlbWJseU5hbWVdO1xyXG4gIGlmICghYXNzZW1ibHlIYW5kbGUpIHtcclxuICAgIGFzc2VtYmx5SGFuZGxlID0gYXNzZW1ibHlfbG9hZChhc3NlbWJseU5hbWUpO1xyXG4gICAgaWYgKCFhc3NlbWJseUhhbmRsZSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBmaW5kIGFzc2VtYmx5IFwiJHthc3NlbWJseU5hbWV9XCJgKTtcclxuICAgIH1cclxuICAgIGFzc2VtYmx5SGFuZGxlQ2FjaGVbYXNzZW1ibHlOYW1lXSA9IGFzc2VtYmx5SGFuZGxlO1xyXG4gIH1cclxuICByZXR1cm4gYXNzZW1ibHlIYW5kbGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbmRUeXBlKGFzc2VtYmx5TmFtZTogc3RyaW5nLCBuYW1lc3BhY2U6IHN0cmluZywgY2xhc3NOYW1lOiBzdHJpbmcpOiBudW1iZXIge1xyXG4gIGNvbnN0IGZ1bGx5UXVhbGlmaWVkVHlwZU5hbWUgPSBgWyR7YXNzZW1ibHlOYW1lfV0ke25hbWVzcGFjZX0uJHtjbGFzc05hbWV9YDtcclxuICBsZXQgdHlwZUhhbmRsZSA9IHR5cGVIYW5kbGVDYWNoZVtmdWxseVF1YWxpZmllZFR5cGVOYW1lXTtcclxuICBpZiAoIXR5cGVIYW5kbGUpIHtcclxuICAgIHR5cGVIYW5kbGUgPSBmaW5kX2NsYXNzKGZpbmRBc3NlbWJseShhc3NlbWJseU5hbWUpLCBuYW1lc3BhY2UsIGNsYXNzTmFtZSk7XHJcbiAgICBpZiAoIXR5cGVIYW5kbGUpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZmluZCB0eXBlIFwiJHtjbGFzc05hbWV9XCIgaW4gbmFtZXNwYWNlIFwiJHtuYW1lc3BhY2V9XCIgaW4gYXNzZW1ibHkgXCIke2Fzc2VtYmx5TmFtZX1cImApO1xyXG4gICAgfVxyXG4gICAgdHlwZUhhbmRsZUNhY2hlW2Z1bGx5UXVhbGlmaWVkVHlwZU5hbWVdID0gdHlwZUhhbmRsZTtcclxuICB9XHJcbiAgcmV0dXJuIHR5cGVIYW5kbGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbmRNZXRob2QoYXNzZW1ibHlOYW1lOiBzdHJpbmcsIG5hbWVzcGFjZTogc3RyaW5nLCBjbGFzc05hbWU6IHN0cmluZywgbWV0aG9kTmFtZTogc3RyaW5nKTogTWV0aG9kSGFuZGxlIHtcclxuICBjb25zdCBmdWxseVF1YWxpZmllZE1ldGhvZE5hbWUgPSBgWyR7YXNzZW1ibHlOYW1lfV0ke25hbWVzcGFjZX0uJHtjbGFzc05hbWV9Ojoke21ldGhvZE5hbWV9YDtcclxuICBsZXQgbWV0aG9kSGFuZGxlID0gbWV0aG9kSGFuZGxlQ2FjaGVbZnVsbHlRdWFsaWZpZWRNZXRob2ROYW1lXTtcclxuICBpZiAoIW1ldGhvZEhhbmRsZSkge1xyXG4gICAgbWV0aG9kSGFuZGxlID0gZmluZF9tZXRob2QoZmluZFR5cGUoYXNzZW1ibHlOYW1lLCBuYW1lc3BhY2UsIGNsYXNzTmFtZSksIG1ldGhvZE5hbWUsIC0xKTtcclxuICAgIGlmICghbWV0aG9kSGFuZGxlKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZpbmQgbWV0aG9kIFwiJHttZXRob2ROYW1lfVwiIG9uIHR5cGUgXCIke25hbWVzcGFjZX0uJHtjbGFzc05hbWV9XCJgKTtcclxuICAgIH1cclxuICAgIG1ldGhvZEhhbmRsZUNhY2hlW2Z1bGx5UXVhbGlmaWVkTWV0aG9kTmFtZV0gPSBtZXRob2RIYW5kbGU7XHJcbiAgfVxyXG4gIHJldHVybiBtZXRob2RIYW5kbGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFNjcmlwdFRhZ3NUb0RvY3VtZW50KCkge1xyXG4gIC8vIExvYWQgZWl0aGVyIHRoZSB3YXNtIG9yIGFzbS5qcyB2ZXJzaW9uIG9mIHRoZSBNb25vIHJ1bnRpbWVcclxuICBjb25zdCBicm93c2VyU3VwcG9ydHNOYXRpdmVXZWJBc3NlbWJseSA9IHR5cGVvZiBXZWJBc3NlbWJseSAhPT0gJ3VuZGVmaW5lZCcgJiYgV2ViQXNzZW1ibHkudmFsaWRhdGU7XHJcbiAgY29uc3QgbW9ub1J1bnRpbWVVcmxCYXNlID0gJ19mcmFtZXdvcmsvJyArIChicm93c2VyU3VwcG9ydHNOYXRpdmVXZWJBc3NlbWJseSA/ICd3YXNtJyA6ICdhc21qcycpO1xyXG4gIGNvbnN0IG1vbm9SdW50aW1lU2NyaXB0VXJsID0gYCR7bW9ub1J1bnRpbWVVcmxCYXNlfS9tb25vLmpzYDtcclxuXHJcbiAgaWYgKCFicm93c2VyU3VwcG9ydHNOYXRpdmVXZWJBc3NlbWJseSkge1xyXG4gICAgLy8gSW4gdGhlIGFzbWpzIGNhc2UsIHRoZSBpbml0aWFsIG1lbW9yeSBzdHJ1Y3R1cmUgaXMgaW4gYSBzZXBhcmF0ZSBmaWxlIHdlIG5lZWQgdG8gZG93bmxvYWRcclxuICAgIGNvbnN0IG1lbWluaXRYSFIgPSBNb2R1bGVbJ21lbW9yeUluaXRpYWxpemVyUmVxdWVzdCddID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICBtZW1pbml0WEhSLm9wZW4oJ0dFVCcsIGAke21vbm9SdW50aW1lVXJsQmFzZX0vbW9uby5qcy5tZW1gKTtcclxuICAgIG1lbWluaXRYSFIucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJztcclxuICAgIG1lbWluaXRYSFIuc2VuZChudWxsKTtcclxuICB9XHJcblxyXG4gIGRvY3VtZW50LndyaXRlKGA8c2NyaXB0IGRlZmVyIHNyYz1cIiR7bW9ub1J1bnRpbWVTY3JpcHRVcmx9XCI+PC9zY3JpcHQ+YCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUVtc2NyaXB0ZW5Nb2R1bGVJbnN0YW5jZShsb2FkQXNzZW1ibHlVcmxzOiBzdHJpbmdbXSwgb25SZWFkeTogKCkgPT4gdm9pZCwgb25FcnJvcjogKHJlYXNvbj86IGFueSkgPT4gdm9pZCkge1xyXG4gIGNvbnN0IG1vZHVsZSA9IHt9IGFzIHR5cGVvZiBNb2R1bGU7XHJcbiAgY29uc3Qgd2FzbUJpbmFyeUZpbGUgPSAnX2ZyYW1ld29yay93YXNtL21vbm8ud2FzbSc7XHJcbiAgY29uc3QgYXNtanNDb2RlRmlsZSA9ICdfZnJhbWV3b3JrL2FzbWpzL21vbm8uYXNtLmpzJztcclxuXHJcbiAgbW9kdWxlLnByaW50ID0gbGluZSA9PiBjb25zb2xlLmxvZyhgV0FTTTogJHtsaW5lfWApO1xyXG4gIG1vZHVsZS5wcmludEVyciA9IGxpbmUgPT4gY29uc29sZS5lcnJvcihgV0FTTTogJHtsaW5lfWApO1xyXG4gIG1vZHVsZS5wcmVSdW4gPSBbXTtcclxuICBtb2R1bGUucG9zdFJ1biA9IFtdO1xyXG4gIG1vZHVsZS5wcmVsb2FkUGx1Z2lucyA9IFtdO1xyXG5cclxuICBtb2R1bGUubG9jYXRlRmlsZSA9IGZpbGVOYW1lID0+IHtcclxuICAgIHN3aXRjaCAoZmlsZU5hbWUpIHtcclxuICAgICAgY2FzZSAnbW9uby53YXNtJzogcmV0dXJuIHdhc21CaW5hcnlGaWxlO1xyXG4gICAgICBjYXNlICdtb25vLmFzbS5qcyc6IHJldHVybiBhc21qc0NvZGVGaWxlO1xyXG4gICAgICBkZWZhdWx0OiByZXR1cm4gZmlsZU5hbWU7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgbW9kdWxlLnByZVJ1bi5wdXNoKCgpID0+IHtcclxuICAgIC8vIEJ5IG5vdywgZW1zY3JpcHRlbiBzaG91bGQgYmUgaW5pdGlhbGlzZWQgZW5vdWdoIHRoYXQgd2UgY2FuIGNhcHR1cmUgdGhlc2UgbWV0aG9kcyBmb3IgbGF0ZXIgdXNlXHJcbiAgICBhc3NlbWJseV9sb2FkID0gTW9kdWxlLmN3cmFwKCdtb25vX3dhc21fYXNzZW1ibHlfbG9hZCcsICdudW1iZXInLCBbJ3N0cmluZyddKTtcclxuICAgIGZpbmRfY2xhc3MgPSBNb2R1bGUuY3dyYXAoJ21vbm9fd2FzbV9hc3NlbWJseV9maW5kX2NsYXNzJywgJ251bWJlcicsIFsnbnVtYmVyJywgJ3N0cmluZycsICdzdHJpbmcnXSk7XHJcbiAgICBmaW5kX21ldGhvZCA9IE1vZHVsZS5jd3JhcCgnbW9ub193YXNtX2Fzc2VtYmx5X2ZpbmRfbWV0aG9kJywgJ251bWJlcicsIFsnbnVtYmVyJywgJ3N0cmluZycsICdudW1iZXInXSk7XHJcbiAgICBpbnZva2VfbWV0aG9kID0gTW9kdWxlLmN3cmFwKCdtb25vX3dhc21faW52b2tlX21ldGhvZCcsICdudW1iZXInLCBbJ251bWJlcicsICdudW1iZXInLCAnbnVtYmVyJ10pO1xyXG4gICAgbW9ub19zdHJpbmdfZ2V0X3V0ZjggPSBNb2R1bGUuY3dyYXAoJ21vbm9fd2FzbV9zdHJpbmdfZ2V0X3V0ZjgnLCAnbnVtYmVyJywgWydudW1iZXInXSk7XHJcbiAgICBtb25vX3N0cmluZyA9IE1vZHVsZS5jd3JhcCgnbW9ub193YXNtX3N0cmluZ19mcm9tX2pzJywgJ251bWJlcicsIFsnc3RyaW5nJ10pO1xyXG5cclxuICAgIE1vZHVsZS5GU19jcmVhdGVQYXRoKCcvJywgJ2FwcEJpbkRpcicsIHRydWUsIHRydWUpO1xyXG4gICAgbG9hZEFzc2VtYmx5VXJscy5mb3JFYWNoKHVybCA9PlxyXG4gICAgICBGUy5jcmVhdGVQcmVsb2FkZWRGaWxlKCdhcHBCaW5EaXInLCBgJHtnZXRBc3NlbWJseU5hbWVGcm9tVXJsKHVybCl9LmRsbGAsIHVybCwgdHJ1ZSwgZmFsc2UsIHVuZGVmaW5lZCwgb25FcnJvcikpO1xyXG4gIH0pO1xyXG5cclxuICBtb2R1bGUucG9zdFJ1bi5wdXNoKCgpID0+IHtcclxuICAgIGNvbnN0IGxvYWRfcnVudGltZSA9IE1vZHVsZS5jd3JhcCgnbW9ub193YXNtX2xvYWRfcnVudGltZScsIG51bGwsIFsnc3RyaW5nJ10pO1xyXG4gICAgbG9hZF9ydW50aW1lKCdhcHBCaW5EaXInKTtcclxuICAgIG9uUmVhZHkoKTtcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIG1vZHVsZTtcclxufVxyXG5cclxuZnVuY3Rpb24gYXN5bmNMb2FkKHVybCwgb25sb2FkLCBvbmVycm9yKSB7XHJcbiAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdDtcclxuICB4aHIub3BlbignR0VUJywgdXJsLCAvKiBhc3luYzogKi8gdHJ1ZSk7XHJcbiAgeGhyLnJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcic7XHJcbiAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uIHhocl9vbmxvYWQoKSB7XHJcbiAgICBpZiAoeGhyLnN0YXR1cyA9PSAyMDAgfHwgeGhyLnN0YXR1cyA9PSAwICYmIHhoci5yZXNwb25zZSkge1xyXG4gICAgICB2YXIgYXNtID0gbmV3IFVpbnQ4QXJyYXkoeGhyLnJlc3BvbnNlKTtcclxuICAgICAgb25sb2FkKGFzbSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBvbmVycm9yKHhocik7XHJcbiAgICB9XHJcbiAgfTtcclxuICB4aHIub25lcnJvciA9IG9uZXJyb3I7XHJcbiAgeGhyLnNlbmQobnVsbCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEFycmF5RGF0YVBvaW50ZXI8VD4oYXJyYXk6IFN5c3RlbV9BcnJheTxUPik6IG51bWJlciB7XHJcbiAgcmV0dXJuIDxudW1iZXI+PGFueT5hcnJheSArIDEyOyAvLyBGaXJzdCBieXRlIGZyb20gaGVyZSBpcyBsZW5ndGgsIHRoZW4gZm9sbG93aW5nIGJ5dGVzIGFyZSBlbnRyaWVzXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1BsYXRmb3JtL01vbm8vTW9ub1BsYXRmb3JtLnRzIiwiaW1wb3J0IHsgaW52b2tlV2l0aEpzb25NYXJzaGFsbGluZyB9IGZyb20gJy4vSW52b2tlV2l0aEpzb25NYXJzaGFsbGluZyc7XHJcbmltcG9ydCB7IGF0dGFjaFJvb3RDb21wb25lbnRUb0VsZW1lbnQsIHJlbmRlckJhdGNoIH0gZnJvbSAnLi4vUmVuZGVyaW5nL1JlbmRlcmVyJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgZGVmaW5pdGl2ZSBsaXN0IG9mIGludGVybmFsIGZ1bmN0aW9ucyBpbnZva2FibGUgZnJvbSAuTkVUIGNvZGUuXHJcbiAqIFRoZXNlIGZ1bmN0aW9uIG5hbWVzIGFyZSB0cmVhdGVkIGFzICdyZXNlcnZlZCcgYW5kIGNhbm5vdCBiZSBwYXNzZWQgdG8gcmVnaXN0ZXJGdW5jdGlvbi5cclxuICovXHJcbmV4cG9ydCBjb25zdCBpbnRlcm5hbFJlZ2lzdGVyZWRGdW5jdGlvbnMgPSB7XHJcbiAgYXR0YWNoUm9vdENvbXBvbmVudFRvRWxlbWVudCxcclxuICBpbnZva2VXaXRoSnNvbk1hcnNoYWxsaW5nLFxyXG4gIHJlbmRlckJhdGNoLFxyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvSW50ZXJvcC9JbnRlcm5hbFJlZ2lzdGVyZWRGdW5jdGlvbi50cyIsImltcG9ydCB7IHBsYXRmb3JtIH0gZnJvbSAnLi4vRW52aXJvbm1lbnQnO1xyXG5pbXBvcnQgeyBTeXN0ZW1fU3RyaW5nIH0gZnJvbSAnLi4vUGxhdGZvcm0vUGxhdGZvcm0nO1xyXG5pbXBvcnQgeyBnZXRSZWdpc3RlcmVkRnVuY3Rpb24gfSBmcm9tICcuL1JlZ2lzdGVyZWRGdW5jdGlvbic7XHJcbmltcG9ydCB7IGdldEVsZW1lbnRCeUNhcHR1cmVJZCB9IGZyb20gJy4uL1JlbmRlcmluZy9FbGVtZW50UmVmZXJlbmNlQ2FwdHVyZSc7XHJcblxyXG5jb25zdCBlbGVtZW50UmVmS2V5ID0gJ19ibGF6b3JFbGVtZW50UmVmJzsgLy8gS2VlcCBpbiBzeW5jIHdpdGggRWxlbWVudFJlZi5jc1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGludm9rZVdpdGhKc29uTWFyc2hhbGxpbmcoaWRlbnRpZmllcjogU3lzdGVtX1N0cmluZywgLi4uYXJnc0pzb246IFN5c3RlbV9TdHJpbmdbXSkge1xyXG4gIGNvbnN0IGlkZW50aWZpZXJKc1N0cmluZyA9IHBsYXRmb3JtLnRvSmF2YVNjcmlwdFN0cmluZyhpZGVudGlmaWVyKTtcclxuICBjb25zdCBmdW5jSW5zdGFuY2UgPSBnZXRSZWdpc3RlcmVkRnVuY3Rpb24oaWRlbnRpZmllckpzU3RyaW5nKTtcclxuICBjb25zdCBhcmdzID0gYXJnc0pzb24ubWFwKGpzb24gPT4gSlNPTi5wYXJzZShwbGF0Zm9ybS50b0phdmFTY3JpcHRTdHJpbmcoanNvbiksIGpzb25SZXZpdmVyKSk7XHJcbiAgY29uc3QgcmVzdWx0ID0gZnVuY0luc3RhbmNlLmFwcGx5KG51bGwsIGFyZ3MpO1xyXG4gIGlmIChyZXN1bHQgIT09IG51bGwgJiYgcmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgIGNvbnN0IHJlc3VsdEpzb24gPSBKU09OLnN0cmluZ2lmeShyZXN1bHQpO1xyXG4gICAgcmV0dXJuIHBsYXRmb3JtLnRvRG90TmV0U3RyaW5nKHJlc3VsdEpzb24pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGpzb25SZXZpdmVyKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogYW55IHtcclxuICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZS5oYXNPd25Qcm9wZXJ0eShlbGVtZW50UmVmS2V5KSAmJiB0eXBlb2YgdmFsdWVbZWxlbWVudFJlZktleV0gPT09ICdudW1iZXInKSB7XHJcbiAgICByZXR1cm4gZ2V0RWxlbWVudEJ5Q2FwdHVyZUlkKHZhbHVlW2VsZW1lbnRSZWZLZXldKTtcclxuICB9XHJcblxyXG4gIHJldHVybiB2YWx1ZTtcclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9JbnRlcm9wL0ludm9rZVdpdGhKc29uTWFyc2hhbGxpbmcudHMiLCJpbXBvcnQgeyBQb2ludGVyLCBTeXN0ZW1fQXJyYXkgfSBmcm9tICcuLi9QbGF0Zm9ybS9QbGF0Zm9ybSc7XHJcbmltcG9ydCB7IHBsYXRmb3JtIH0gZnJvbSAnLi4vRW52aXJvbm1lbnQnO1xyXG5pbXBvcnQgeyBSZW5kZXJUcmVlRnJhbWVQb2ludGVyIH0gZnJvbSAnLi9SZW5kZXJUcmVlRnJhbWUnO1xyXG5pbXBvcnQgeyBSZW5kZXJUcmVlRWRpdFBvaW50ZXIgfSBmcm9tICcuL1JlbmRlclRyZWVFZGl0JztcclxuXHJcbi8vIEtlZXAgaW4gc3luYyB3aXRoIHRoZSBzdHJ1Y3RzIGluIC5ORVQgY29kZVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlbmRlckJhdGNoID0ge1xyXG4gIHVwZGF0ZWRDb21wb25lbnRzOiAob2JqOiBSZW5kZXJCYXRjaFBvaW50ZXIpID0+IHBsYXRmb3JtLnJlYWRTdHJ1Y3RGaWVsZDxBcnJheVJhbmdlUG9pbnRlcjxSZW5kZXJUcmVlRGlmZlBvaW50ZXI+PihvYmosIDApLFxyXG4gIHJlZmVyZW5jZUZyYW1lczogKG9iajogUmVuZGVyQmF0Y2hQb2ludGVyKSA9PiBwbGF0Zm9ybS5yZWFkU3RydWN0RmllbGQ8QXJyYXlSYW5nZVBvaW50ZXI8UmVuZGVyVHJlZUZyYW1lUG9pbnRlcj4+KG9iaiwgYXJyYXlSYW5nZVN0cnVjdExlbmd0aCksXHJcbiAgZGlzcG9zZWRDb21wb25lbnRJZHM6IChvYmo6IFJlbmRlckJhdGNoUG9pbnRlcikgPT4gcGxhdGZvcm0ucmVhZFN0cnVjdEZpZWxkPEFycmF5UmFuZ2VQb2ludGVyPG51bWJlcj4+KG9iaiwgYXJyYXlSYW5nZVN0cnVjdExlbmd0aCArIGFycmF5UmFuZ2VTdHJ1Y3RMZW5ndGgpLFxyXG4gIGRpc3Bvc2VkRXZlbnRIYW5kbGVySWRzOiAob2JqOiBSZW5kZXJCYXRjaFBvaW50ZXIpID0+IHBsYXRmb3JtLnJlYWRTdHJ1Y3RGaWVsZDxBcnJheVJhbmdlUG9pbnRlcjxudW1iZXI+PihvYmosIGFycmF5UmFuZ2VTdHJ1Y3RMZW5ndGggKyBhcnJheVJhbmdlU3RydWN0TGVuZ3RoICsgYXJyYXlSYW5nZVN0cnVjdExlbmd0aCksXHJcbn07XHJcblxyXG5jb25zdCBhcnJheVJhbmdlU3RydWN0TGVuZ3RoID0gODtcclxuZXhwb3J0IGNvbnN0IGFycmF5UmFuZ2UgPSB7XHJcbiAgYXJyYXk6IDxUPihvYmo6IEFycmF5UmFuZ2VQb2ludGVyPFQ+KSA9PiBwbGF0Zm9ybS5yZWFkT2JqZWN0RmllbGQ8U3lzdGVtX0FycmF5PFQ+PihvYmosIDApLFxyXG4gIGNvdW50OiA8VD4ob2JqOiBBcnJheVJhbmdlUG9pbnRlcjxUPikgPT4gcGxhdGZvcm0ucmVhZEludDMyRmllbGQob2JqLCA0KSxcclxufTtcclxuXHJcbmNvbnN0IGFycmF5U2VnbWVudFN0cnVjdExlbmd0aCA9IDEyO1xyXG5leHBvcnQgY29uc3QgYXJyYXlTZWdtZW50ID0ge1xyXG4gIGFycmF5OiA8VD4ob2JqOiBBcnJheVNlZ21lbnRQb2ludGVyPFQ+KSA9PiBwbGF0Zm9ybS5yZWFkT2JqZWN0RmllbGQ8U3lzdGVtX0FycmF5PFQ+PihvYmosIDApLFxyXG4gIG9mZnNldDogPFQ+KG9iajogQXJyYXlTZWdtZW50UG9pbnRlcjxUPikgPT4gcGxhdGZvcm0ucmVhZEludDMyRmllbGQob2JqLCA0KSxcclxuICBjb3VudDogPFQ+KG9iajogQXJyYXlTZWdtZW50UG9pbnRlcjxUPikgPT4gcGxhdGZvcm0ucmVhZEludDMyRmllbGQob2JqLCA4KSxcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCByZW5kZXJUcmVlRGlmZlN0cnVjdExlbmd0aCA9IDQgKyBhcnJheVNlZ21lbnRTdHJ1Y3RMZW5ndGg7XHJcbmV4cG9ydCBjb25zdCByZW5kZXJUcmVlRGlmZiA9IHtcclxuICBjb21wb25lbnRJZDogKG9iajogUmVuZGVyVHJlZURpZmZQb2ludGVyKSA9PiBwbGF0Zm9ybS5yZWFkSW50MzJGaWVsZChvYmosIDApLFxyXG4gIGVkaXRzOiAob2JqOiBSZW5kZXJUcmVlRGlmZlBvaW50ZXIpID0+IHBsYXRmb3JtLnJlYWRTdHJ1Y3RGaWVsZDxBcnJheVNlZ21lbnRQb2ludGVyPFJlbmRlclRyZWVFZGl0UG9pbnRlcj4+KG9iaiwgNCksICBcclxufTtcclxuXHJcbi8vIE5vbWluYWwgdHlwZXMgdG8gZW5zdXJlIG9ubHkgdmFsaWQgcG9pbnRlcnMgYXJlIHBhc3NlZCB0byB0aGUgZnVuY3Rpb25zIGFib3ZlLlxyXG4vLyBBdCBydW50aW1lIHRoZSB2YWx1ZXMgYXJlIGp1c3QgbnVtYmVycy5cclxuZXhwb3J0IGludGVyZmFjZSBSZW5kZXJCYXRjaFBvaW50ZXIgZXh0ZW5kcyBQb2ludGVyIHsgUmVuZGVyQmF0Y2hQb2ludGVyX19ET19OT1RfSU1QTEVNRU5UOiBhbnkgfVxyXG5leHBvcnQgaW50ZXJmYWNlIEFycmF5UmFuZ2VQb2ludGVyPFQ+IGV4dGVuZHMgUG9pbnRlciB7IEFycmF5UmFuZ2VQb2ludGVyX19ET19OT1RfSU1QTEVNRU5UOiBhbnkgfVxyXG5leHBvcnQgaW50ZXJmYWNlIEFycmF5U2VnbWVudFBvaW50ZXI8VD4gZXh0ZW5kcyBQb2ludGVyIHsgQXJyYXlTZWdtZW50UG9pbnRlcl9fRE9fTk9UX0lNUExFTUVOVDogYW55IH1cclxuZXhwb3J0IGludGVyZmFjZSBSZW5kZXJUcmVlRGlmZlBvaW50ZXIgZXh0ZW5kcyBQb2ludGVyIHsgUmVuZGVyVHJlZURpZmZQb2ludGVyX19ET19OT1RfSU1QTEVNRU5UOiBhbnkgfVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvUmVuZGVyaW5nL1JlbmRlckJhdGNoLnRzIiwiaW1wb3J0IHsgU3lzdGVtX0FycmF5LCBNZXRob2RIYW5kbGUgfSBmcm9tICcuLi9QbGF0Zm9ybS9QbGF0Zm9ybSc7XHJcbmltcG9ydCB7IGdldFJlbmRlclRyZWVFZGl0UHRyLCByZW5kZXJUcmVlRWRpdCwgUmVuZGVyVHJlZUVkaXRQb2ludGVyLCBFZGl0VHlwZSB9IGZyb20gJy4vUmVuZGVyVHJlZUVkaXQnO1xyXG5pbXBvcnQgeyBnZXRUcmVlRnJhbWVQdHIsIHJlbmRlclRyZWVGcmFtZSwgRnJhbWVUeXBlLCBSZW5kZXJUcmVlRnJhbWVQb2ludGVyIH0gZnJvbSAnLi9SZW5kZXJUcmVlRnJhbWUnO1xyXG5pbXBvcnQgeyBwbGF0Zm9ybSB9IGZyb20gJy4uL0Vudmlyb25tZW50JztcclxuaW1wb3J0IHsgRXZlbnREZWxlZ2F0b3IgfSBmcm9tICcuL0V2ZW50RGVsZWdhdG9yJztcclxuaW1wb3J0IHsgRXZlbnRGb3JEb3ROZXQsIFVJRXZlbnRBcmdzIH0gZnJvbSAnLi9FdmVudEZvckRvdE5ldCc7XHJcbmltcG9ydCB7IExvZ2ljYWxFbGVtZW50LCB0b0xvZ2ljYWxFbGVtZW50LCBpbnNlcnRMb2dpY2FsQ2hpbGQsIHJlbW92ZUxvZ2ljYWxDaGlsZCwgZ2V0TG9naWNhbFBhcmVudCwgZ2V0TG9naWNhbENoaWxkLCBjcmVhdGVBbmRJbnNlcnRMb2dpY2FsQ29udGFpbmVyLCBpc1N2Z0VsZW1lbnQgfSBmcm9tICcuL0xvZ2ljYWxFbGVtZW50cyc7XHJcbmltcG9ydCB7IGFwcGx5Q2FwdHVyZUlkVG9FbGVtZW50IH0gZnJvbSAnLi9FbGVtZW50UmVmZXJlbmNlQ2FwdHVyZSc7XHJcbmNvbnN0IHNlbGVjdFZhbHVlUHJvcG5hbWUgPSAnX2JsYXpvclNlbGVjdFZhbHVlJztcclxubGV0IHJhaXNlRXZlbnRNZXRob2Q6IE1ldGhvZEhhbmRsZTtcclxubGV0IHJlbmRlckNvbXBvbmVudE1ldGhvZDogTWV0aG9kSGFuZGxlO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJyb3dzZXJSZW5kZXJlciB7XHJcbiAgcHJpdmF0ZSBldmVudERlbGVnYXRvcjogRXZlbnREZWxlZ2F0b3I7XHJcbiAgcHJpdmF0ZSBjaGlsZENvbXBvbmVudExvY2F0aW9uczogeyBbY29tcG9uZW50SWQ6IG51bWJlcl06IExvZ2ljYWxFbGVtZW50IH0gPSB7fTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBicm93c2VyUmVuZGVyZXJJZDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLmV2ZW50RGVsZWdhdG9yID0gbmV3IEV2ZW50RGVsZWdhdG9yKChldmVudCwgY29tcG9uZW50SWQsIGV2ZW50SGFuZGxlcklkLCBldmVudEFyZ3MpID0+IHtcclxuICAgICAgcmFpc2VFdmVudChldmVudCwgdGhpcy5icm93c2VyUmVuZGVyZXJJZCwgY29tcG9uZW50SWQsIGV2ZW50SGFuZGxlcklkLCBldmVudEFyZ3MpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXR0YWNoUm9vdENvbXBvbmVudFRvRWxlbWVudChjb21wb25lbnRJZDogbnVtYmVyLCBlbGVtZW50OiBFbGVtZW50KSB7XHJcbiAgICB0aGlzLmF0dGFjaENvbXBvbmVudFRvRWxlbWVudChjb21wb25lbnRJZCwgdG9Mb2dpY2FsRWxlbWVudChlbGVtZW50KSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdXBkYXRlQ29tcG9uZW50KGNvbXBvbmVudElkOiBudW1iZXIsIGVkaXRzOiBTeXN0ZW1fQXJyYXk8UmVuZGVyVHJlZUVkaXRQb2ludGVyPiwgZWRpdHNPZmZzZXQ6IG51bWJlciwgZWRpdHNMZW5ndGg6IG51bWJlciwgcmVmZXJlbmNlRnJhbWVzOiBTeXN0ZW1fQXJyYXk8UmVuZGVyVHJlZUZyYW1lUG9pbnRlcj4pIHtcclxuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmNoaWxkQ29tcG9uZW50TG9jYXRpb25zW2NvbXBvbmVudElkXTtcclxuICAgIGlmICghZWxlbWVudCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIGVsZW1lbnQgaXMgY3VycmVudGx5IGFzc29jaWF0ZWQgd2l0aCBjb21wb25lbnQgJHtjb21wb25lbnRJZH1gKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmFwcGx5RWRpdHMoY29tcG9uZW50SWQsIGVsZW1lbnQsIDAsIGVkaXRzLCBlZGl0c09mZnNldCwgZWRpdHNMZW5ndGgsIHJlZmVyZW5jZUZyYW1lcyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGlzcG9zZUNvbXBvbmVudChjb21wb25lbnRJZDogbnVtYmVyKSB7XHJcbiAgICBkZWxldGUgdGhpcy5jaGlsZENvbXBvbmVudExvY2F0aW9uc1tjb21wb25lbnRJZF07XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGlzcG9zZUV2ZW50SGFuZGxlcihldmVudEhhbmRsZXJJZDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLmV2ZW50RGVsZWdhdG9yLnJlbW92ZUxpc3RlbmVyKGV2ZW50SGFuZGxlcklkKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXR0YWNoQ29tcG9uZW50VG9FbGVtZW50KGNvbXBvbmVudElkOiBudW1iZXIsIGVsZW1lbnQ6IExvZ2ljYWxFbGVtZW50KSB7XHJcbiAgICB0aGlzLmNoaWxkQ29tcG9uZW50TG9jYXRpb25zW2NvbXBvbmVudElkXSA9IGVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFwcGx5RWRpdHMoY29tcG9uZW50SWQ6IG51bWJlciwgcGFyZW50OiBMb2dpY2FsRWxlbWVudCwgY2hpbGRJbmRleDogbnVtYmVyLCBlZGl0czogU3lzdGVtX0FycmF5PFJlbmRlclRyZWVFZGl0UG9pbnRlcj4sIGVkaXRzT2Zmc2V0OiBudW1iZXIsIGVkaXRzTGVuZ3RoOiBudW1iZXIsIHJlZmVyZW5jZUZyYW1lczogU3lzdGVtX0FycmF5PFJlbmRlclRyZWVGcmFtZVBvaW50ZXI+KSB7XHJcbiAgICBsZXQgY3VycmVudERlcHRoID0gMDtcclxuICAgIGxldCBjaGlsZEluZGV4QXRDdXJyZW50RGVwdGggPSBjaGlsZEluZGV4O1xyXG4gICAgY29uc3QgbWF4RWRpdEluZGV4RXhjbCA9IGVkaXRzT2Zmc2V0ICsgZWRpdHNMZW5ndGg7XHJcbiAgICBmb3IgKGxldCBlZGl0SW5kZXggPSBlZGl0c09mZnNldDsgZWRpdEluZGV4IDwgbWF4RWRpdEluZGV4RXhjbDsgZWRpdEluZGV4KyspIHtcclxuICAgICAgY29uc3QgZWRpdCA9IGdldFJlbmRlclRyZWVFZGl0UHRyKGVkaXRzLCBlZGl0SW5kZXgpO1xyXG4gICAgICBjb25zdCBlZGl0VHlwZSA9IHJlbmRlclRyZWVFZGl0LnR5cGUoZWRpdCk7XHJcbiAgICAgIHN3aXRjaCAoZWRpdFR5cGUpIHtcclxuICAgICAgICBjYXNlIEVkaXRUeXBlLnByZXBlbmRGcmFtZToge1xyXG4gICAgICAgICAgY29uc3QgZnJhbWVJbmRleCA9IHJlbmRlclRyZWVFZGl0Lm5ld1RyZWVJbmRleChlZGl0KTtcclxuICAgICAgICAgIGNvbnN0IGZyYW1lID0gZ2V0VHJlZUZyYW1lUHRyKHJlZmVyZW5jZUZyYW1lcywgZnJhbWVJbmRleCk7XHJcbiAgICAgICAgICBjb25zdCBzaWJsaW5nSW5kZXggPSByZW5kZXJUcmVlRWRpdC5zaWJsaW5nSW5kZXgoZWRpdCk7XHJcbiAgICAgICAgICB0aGlzLmluc2VydEZyYW1lKGNvbXBvbmVudElkLCBwYXJlbnQsIGNoaWxkSW5kZXhBdEN1cnJlbnREZXB0aCArIHNpYmxpbmdJbmRleCwgcmVmZXJlbmNlRnJhbWVzLCBmcmFtZSwgZnJhbWVJbmRleCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSBFZGl0VHlwZS5yZW1vdmVGcmFtZToge1xyXG4gICAgICAgICAgY29uc3Qgc2libGluZ0luZGV4ID0gcmVuZGVyVHJlZUVkaXQuc2libGluZ0luZGV4KGVkaXQpO1xyXG4gICAgICAgICAgcmVtb3ZlTG9naWNhbENoaWxkKHBhcmVudCwgY2hpbGRJbmRleEF0Q3VycmVudERlcHRoICsgc2libGluZ0luZGV4KTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXNlIEVkaXRUeXBlLnNldEF0dHJpYnV0ZToge1xyXG4gICAgICAgICAgY29uc3QgZnJhbWVJbmRleCA9IHJlbmRlclRyZWVFZGl0Lm5ld1RyZWVJbmRleChlZGl0KTtcclxuICAgICAgICAgIGNvbnN0IGZyYW1lID0gZ2V0VHJlZUZyYW1lUHRyKHJlZmVyZW5jZUZyYW1lcywgZnJhbWVJbmRleCk7XHJcbiAgICAgICAgICBjb25zdCBzaWJsaW5nSW5kZXggPSByZW5kZXJUcmVlRWRpdC5zaWJsaW5nSW5kZXgoZWRpdCk7XHJcbiAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZ2V0TG9naWNhbENoaWxkKHBhcmVudCwgY2hpbGRJbmRleEF0Q3VycmVudERlcHRoICsgc2libGluZ0luZGV4KTtcclxuICAgICAgICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5hcHBseUF0dHJpYnV0ZShjb21wb25lbnRJZCwgZWxlbWVudCwgZnJhbWUpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3Qgc2V0IGF0dHJpYnV0ZSBvbiBub24tZWxlbWVudCBjaGlsZGApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhc2UgRWRpdFR5cGUucmVtb3ZlQXR0cmlidXRlOiB7XHJcbiAgICAgICAgICAvLyBOb3RlIHRoYXQgd2UgZG9uJ3QgaGF2ZSB0byBkaXNwb3NlIHRoZSBpbmZvIHdlIHRyYWNrIGFib3V0IGV2ZW50IGhhbmRsZXJzIGhlcmUsIGJlY2F1c2UgdGhlXHJcbiAgICAgICAgICAvLyBkaXNwb3NlZCBldmVudCBoYW5kbGVyIElEcyBhcmUgZGVsaXZlcmVkIHNlcGFyYXRlbHkgKGluIHRoZSAnZGlzcG9zZWRFdmVudEhhbmRsZXJJZHMnIGFycmF5KVxyXG4gICAgICAgICAgY29uc3Qgc2libGluZ0luZGV4ID0gcmVuZGVyVHJlZUVkaXQuc2libGluZ0luZGV4KGVkaXQpO1xyXG4gICAgICAgICAgY29uc3QgZWxlbWVudCA9IGdldExvZ2ljYWxDaGlsZChwYXJlbnQsIGNoaWxkSW5kZXhBdEN1cnJlbnREZXB0aCArIHNpYmxpbmdJbmRleCk7XHJcbiAgICAgICAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZU5hbWUgPSByZW5kZXJUcmVlRWRpdC5yZW1vdmVkQXR0cmlidXRlTmFtZShlZGl0KSE7XHJcbiAgICAgICAgICAgIC8vIEZpcnN0IHRyeSB0byByZW1vdmUgYW55IHNwZWNpYWwgcHJvcGVydHkgd2UgdXNlIGZvciB0aGlzIGF0dHJpYnV0ZVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMudHJ5QXBwbHlTcGVjaWFsUHJvcGVydHkoZWxlbWVudCwgYXR0cmlidXRlTmFtZSwgbnVsbCkpIHtcclxuICAgICAgICAgICAgICAvLyBJZiB0aGF0J3Mgbm90IGFwcGxpY2FibGUsIGl0J3MgYSByZWd1bGFyIERPTSBhdHRyaWJ1dGUgc28gcmVtb3ZlIHRoYXRcclxuICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgcmVtb3ZlIGF0dHJpYnV0ZSBmcm9tIG5vbi1lbGVtZW50IGNoaWxkYCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSBFZGl0VHlwZS51cGRhdGVUZXh0OiB7XHJcbiAgICAgICAgICBjb25zdCBmcmFtZUluZGV4ID0gcmVuZGVyVHJlZUVkaXQubmV3VHJlZUluZGV4KGVkaXQpO1xyXG4gICAgICAgICAgY29uc3QgZnJhbWUgPSBnZXRUcmVlRnJhbWVQdHIocmVmZXJlbmNlRnJhbWVzLCBmcmFtZUluZGV4KTtcclxuICAgICAgICAgIGNvbnN0IHNpYmxpbmdJbmRleCA9IHJlbmRlclRyZWVFZGl0LnNpYmxpbmdJbmRleChlZGl0KTtcclxuICAgICAgICAgIGNvbnN0IHRleHROb2RlID0gZ2V0TG9naWNhbENoaWxkKHBhcmVudCwgY2hpbGRJbmRleEF0Q3VycmVudERlcHRoICsgc2libGluZ0luZGV4KTtcclxuICAgICAgICAgIGlmICh0ZXh0Tm9kZSBpbnN0YW5jZW9mIFRleHQpIHtcclxuICAgICAgICAgICAgdGV4dE5vZGUudGV4dENvbnRlbnQgPSByZW5kZXJUcmVlRnJhbWUudGV4dENvbnRlbnQoZnJhbWUpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3Qgc2V0IHRleHQgY29udGVudCBvbiBub24tdGV4dCBjaGlsZGApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhc2UgRWRpdFR5cGUuc3RlcEluOiB7XHJcbiAgICAgICAgICBjb25zdCBzaWJsaW5nSW5kZXggPSByZW5kZXJUcmVlRWRpdC5zaWJsaW5nSW5kZXgoZWRpdCk7XHJcbiAgICAgICAgICBwYXJlbnQgPSBnZXRMb2dpY2FsQ2hpbGQocGFyZW50LCBjaGlsZEluZGV4QXRDdXJyZW50RGVwdGggKyBzaWJsaW5nSW5kZXgpO1xyXG4gICAgICAgICAgY3VycmVudERlcHRoKys7XHJcbiAgICAgICAgICBjaGlsZEluZGV4QXRDdXJyZW50RGVwdGggPSAwO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhc2UgRWRpdFR5cGUuc3RlcE91dDoge1xyXG4gICAgICAgICAgcGFyZW50ID0gZ2V0TG9naWNhbFBhcmVudChwYXJlbnQpITtcclxuICAgICAgICAgIGN1cnJlbnREZXB0aC0tO1xyXG4gICAgICAgICAgY2hpbGRJbmRleEF0Q3VycmVudERlcHRoID0gY3VycmVudERlcHRoID09PSAwID8gY2hpbGRJbmRleCA6IDA7IC8vIFRoZSBjaGlsZEluZGV4IGlzIG9ubHkgZXZlciBub256ZXJvIGF0IHplcm8gZGVwdGhcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgICBjb25zdCB1bmtub3duVHlwZTogbmV2ZXIgPSBlZGl0VHlwZTsgLy8gQ29tcGlsZS10aW1lIHZlcmlmaWNhdGlvbiB0aGF0IHRoZSBzd2l0Y2ggd2FzIGV4aGF1c3RpdmVcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBlZGl0IHR5cGU6ICR7dW5rbm93blR5cGV9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluc2VydEZyYW1lKGNvbXBvbmVudElkOiBudW1iZXIsIHBhcmVudDogTG9naWNhbEVsZW1lbnQsIGNoaWxkSW5kZXg6IG51bWJlciwgZnJhbWVzOiBTeXN0ZW1fQXJyYXk8UmVuZGVyVHJlZUZyYW1lUG9pbnRlcj4sIGZyYW1lOiBSZW5kZXJUcmVlRnJhbWVQb2ludGVyLCBmcmFtZUluZGV4OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgY29uc3QgZnJhbWVUeXBlID0gcmVuZGVyVHJlZUZyYW1lLmZyYW1lVHlwZShmcmFtZSk7XHJcbiAgICBzd2l0Y2ggKGZyYW1lVHlwZSkge1xyXG4gICAgICBjYXNlIEZyYW1lVHlwZS5lbGVtZW50OlxyXG4gICAgICAgIHRoaXMuaW5zZXJ0RWxlbWVudChjb21wb25lbnRJZCwgcGFyZW50LCBjaGlsZEluZGV4LCBmcmFtZXMsIGZyYW1lLCBmcmFtZUluZGV4KTtcclxuICAgICAgICByZXR1cm4gMTtcclxuICAgICAgY2FzZSBGcmFtZVR5cGUudGV4dDpcclxuICAgICAgICB0aGlzLmluc2VydFRleHQocGFyZW50LCBjaGlsZEluZGV4LCBmcmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgIGNhc2UgRnJhbWVUeXBlLmF0dHJpYnV0ZTpcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F0dHJpYnV0ZSBmcmFtZXMgc2hvdWxkIG9ubHkgYmUgcHJlc2VudCBhcyBsZWFkaW5nIGNoaWxkcmVuIG9mIGVsZW1lbnQgZnJhbWVzLicpO1xyXG4gICAgICBjYXNlIEZyYW1lVHlwZS5jb21wb25lbnQ6XHJcbiAgICAgICAgdGhpcy5pbnNlcnRDb21wb25lbnQocGFyZW50LCBjaGlsZEluZGV4LCBmcmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgIGNhc2UgRnJhbWVUeXBlLnJlZ2lvbjpcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnNlcnRGcmFtZVJhbmdlKGNvbXBvbmVudElkLCBwYXJlbnQsIGNoaWxkSW5kZXgsIGZyYW1lcywgZnJhbWVJbmRleCArIDEsIGZyYW1lSW5kZXggKyByZW5kZXJUcmVlRnJhbWUuc3VidHJlZUxlbmd0aChmcmFtZSkpO1xyXG4gICAgICBjYXNlIEZyYW1lVHlwZS5lbGVtZW50UmVmZXJlbmNlQ2FwdHVyZTpcclxuICAgICAgICBpZiAocGFyZW50IGluc3RhbmNlb2YgRWxlbWVudCkge1xyXG4gICAgICAgICAgYXBwbHlDYXB0dXJlSWRUb0VsZW1lbnQocGFyZW50LCByZW5kZXJUcmVlRnJhbWUuZWxlbWVudFJlZmVyZW5jZUNhcHR1cmVJZChmcmFtZSkpO1xyXG4gICAgICAgICAgcmV0dXJuIDA7IC8vIEEgXCJjYXB0dXJlXCIgaXMgYSBjaGlsZCBpbiB0aGUgZGlmZiwgYnV0IGhhcyBubyBub2RlIGluIHRoZSBET01cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWZlcmVuY2UgY2FwdHVyZSBmcmFtZXMgY2FuIG9ubHkgYmUgY2hpbGRyZW4gb2YgZWxlbWVudCBmcmFtZXMuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGNvbnN0IHVua25vd25UeXBlOiBuZXZlciA9IGZyYW1lVHlwZTsgLy8gQ29tcGlsZS10aW1lIHZlcmlmaWNhdGlvbiB0aGF0IHRoZSBzd2l0Y2ggd2FzIGV4aGF1c3RpdmVcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gZnJhbWUgdHlwZTogJHt1bmtub3duVHlwZX1gKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5zZXJ0RWxlbWVudChjb21wb25lbnRJZDogbnVtYmVyLCBwYXJlbnQ6IExvZ2ljYWxFbGVtZW50LCBjaGlsZEluZGV4OiBudW1iZXIsIGZyYW1lczogU3lzdGVtX0FycmF5PFJlbmRlclRyZWVGcmFtZVBvaW50ZXI+LCBmcmFtZTogUmVuZGVyVHJlZUZyYW1lUG9pbnRlciwgZnJhbWVJbmRleDogbnVtYmVyKSB7XHJcbiAgICBjb25zdCB0YWdOYW1lID0gcmVuZGVyVHJlZUZyYW1lLmVsZW1lbnROYW1lKGZyYW1lKSE7XHJcbiAgICBjb25zdCBuZXdEb21FbGVtZW50UmF3ID0gdGFnTmFtZSA9PT0gJ3N2ZycgfHwgaXNTdmdFbGVtZW50KHBhcmVudCkgP1xyXG4gICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgdGFnTmFtZSkgOlxyXG4gICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xyXG4gICAgY29uc3QgbmV3RWxlbWVudCA9IHRvTG9naWNhbEVsZW1lbnQobmV3RG9tRWxlbWVudFJhdyk7XHJcbiAgICBpbnNlcnRMb2dpY2FsQ2hpbGQobmV3RG9tRWxlbWVudFJhdywgcGFyZW50LCBjaGlsZEluZGV4KTtcclxuXHJcbiAgICAvLyBBcHBseSBhdHRyaWJ1dGVzXHJcbiAgICBjb25zdCBkZXNjZW5kYW50c0VuZEluZGV4RXhjbCA9IGZyYW1lSW5kZXggKyByZW5kZXJUcmVlRnJhbWUuc3VidHJlZUxlbmd0aChmcmFtZSk7XHJcbiAgICBmb3IgKGxldCBkZXNjZW5kYW50SW5kZXggPSBmcmFtZUluZGV4ICsgMTsgZGVzY2VuZGFudEluZGV4IDwgZGVzY2VuZGFudHNFbmRJbmRleEV4Y2w7IGRlc2NlbmRhbnRJbmRleCsrKSB7XHJcbiAgICAgIGNvbnN0IGRlc2NlbmRhbnRGcmFtZSA9IGdldFRyZWVGcmFtZVB0cihmcmFtZXMsIGRlc2NlbmRhbnRJbmRleCk7XHJcbiAgICAgIGlmIChyZW5kZXJUcmVlRnJhbWUuZnJhbWVUeXBlKGRlc2NlbmRhbnRGcmFtZSkgPT09IEZyYW1lVHlwZS5hdHRyaWJ1dGUpIHtcclxuICAgICAgICB0aGlzLmFwcGx5QXR0cmlidXRlKGNvbXBvbmVudElkLCBuZXdEb21FbGVtZW50UmF3LCBkZXNjZW5kYW50RnJhbWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIEFzIHNvb24gYXMgd2Ugc2VlIGEgbm9uLWF0dHJpYnV0ZSBjaGlsZCwgYWxsIHRoZSBzdWJzZXF1ZW50IGNoaWxkIGZyYW1lcyBhcmVcclxuICAgICAgICAvLyBub3QgYXR0cmlidXRlcywgc28gYmFpbCBvdXQgYW5kIGluc2VydCB0aGUgcmVtbmFudHMgcmVjdXJzaXZlbHlcclxuICAgICAgICB0aGlzLmluc2VydEZyYW1lUmFuZ2UoY29tcG9uZW50SWQsIG5ld0VsZW1lbnQsIDAsIGZyYW1lcywgZGVzY2VuZGFudEluZGV4LCBkZXNjZW5kYW50c0VuZEluZGV4RXhjbCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5zZXJ0Q29tcG9uZW50KHBhcmVudDogTG9naWNhbEVsZW1lbnQsIGNoaWxkSW5kZXg6IG51bWJlciwgZnJhbWU6IFJlbmRlclRyZWVGcmFtZVBvaW50ZXIpIHtcclxuICAgIGNvbnN0IGNvbnRhaW5lckVsZW1lbnQgPSBjcmVhdGVBbmRJbnNlcnRMb2dpY2FsQ29udGFpbmVyKHBhcmVudCwgY2hpbGRJbmRleCk7XHJcblxyXG4gICAgLy8gQWxsIHdlIGhhdmUgdG8gZG8gaXMgYXNzb2NpYXRlIHRoZSBjaGlsZCBjb21wb25lbnQgSUQgd2l0aCBpdHMgbG9jYXRpb24uIFdlIGRvbid0IGFjdHVhbGx5XHJcbiAgICAvLyBkbyBhbnkgcmVuZGVyaW5nIGhlcmUsIGJlY2F1c2UgdGhlIGRpZmYgZm9yIHRoZSBjaGlsZCB3aWxsIGFwcGVhciBsYXRlciBpbiB0aGUgcmVuZGVyIGJhdGNoLlxyXG4gICAgY29uc3QgY2hpbGRDb21wb25lbnRJZCA9IHJlbmRlclRyZWVGcmFtZS5jb21wb25lbnRJZChmcmFtZSk7XHJcbiAgICB0aGlzLmF0dGFjaENvbXBvbmVudFRvRWxlbWVudChjaGlsZENvbXBvbmVudElkLCBjb250YWluZXJFbGVtZW50KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5zZXJ0VGV4dChwYXJlbnQ6IExvZ2ljYWxFbGVtZW50LCBjaGlsZEluZGV4OiBudW1iZXIsIHRleHRGcmFtZTogUmVuZGVyVHJlZUZyYW1lUG9pbnRlcikge1xyXG4gICAgY29uc3QgdGV4dENvbnRlbnQgPSByZW5kZXJUcmVlRnJhbWUudGV4dENvbnRlbnQodGV4dEZyYW1lKSE7XHJcbiAgICBjb25zdCBuZXdUZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHRDb250ZW50KTtcclxuICAgIGluc2VydExvZ2ljYWxDaGlsZChuZXdUZXh0Tm9kZSwgcGFyZW50LCBjaGlsZEluZGV4KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXBwbHlBdHRyaWJ1dGUoY29tcG9uZW50SWQ6IG51bWJlciwgdG9Eb21FbGVtZW50OiBFbGVtZW50LCBhdHRyaWJ1dGVGcmFtZTogUmVuZGVyVHJlZUZyYW1lUG9pbnRlcikge1xyXG4gICAgY29uc3QgYXR0cmlidXRlTmFtZSA9IHJlbmRlclRyZWVGcmFtZS5hdHRyaWJ1dGVOYW1lKGF0dHJpYnV0ZUZyYW1lKSE7XHJcbiAgICBjb25zdCBicm93c2VyUmVuZGVyZXJJZCA9IHRoaXMuYnJvd3NlclJlbmRlcmVySWQ7XHJcbiAgICBjb25zdCBldmVudEhhbmRsZXJJZCA9IHJlbmRlclRyZWVGcmFtZS5hdHRyaWJ1dGVFdmVudEhhbmRsZXJJZChhdHRyaWJ1dGVGcmFtZSk7XHJcblxyXG4gICAgaWYgKGV2ZW50SGFuZGxlcklkKSB7XHJcbiAgICAgIGNvbnN0IGZpcnN0VHdvQ2hhcnMgPSBhdHRyaWJ1dGVOYW1lLnN1YnN0cmluZygwLCAyKTtcclxuICAgICAgY29uc3QgZXZlbnROYW1lID0gYXR0cmlidXRlTmFtZS5zdWJzdHJpbmcoMik7XHJcbiAgICAgIGlmIChmaXJzdFR3b0NoYXJzICE9PSAnb24nIHx8ICFldmVudE5hbWUpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEF0dHJpYnV0ZSBoYXMgbm9uemVybyBldmVudCBoYW5kbGVyIElELCBidXQgYXR0cmlidXRlIG5hbWUgJyR7YXR0cmlidXRlTmFtZX0nIGRvZXMgbm90IHN0YXJ0IHdpdGggJ29uJy5gKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmV2ZW50RGVsZWdhdG9yLnNldExpc3RlbmVyKHRvRG9tRWxlbWVudCwgZXZlbnROYW1lLCBjb21wb25lbnRJZCwgZXZlbnRIYW5kbGVySWQpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRmlyc3Qgc2VlIGlmIHdlIGhhdmUgc3BlY2lhbCBoYW5kbGluZyBmb3IgdGhpcyBhdHRyaWJ1dGVcclxuICAgIGlmICghdGhpcy50cnlBcHBseVNwZWNpYWxQcm9wZXJ0eSh0b0RvbUVsZW1lbnQsIGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZUZyYW1lKSkge1xyXG4gICAgICAvLyBJZiBub3QsIHRyZWF0IGl0IGFzIGEgcmVndWxhciBzdHJpbmctdmFsdWVkIGF0dHJpYnV0ZVxyXG4gICAgICB0b0RvbUVsZW1lbnQuc2V0QXR0cmlidXRlKFxyXG4gICAgICAgIGF0dHJpYnV0ZU5hbWUsXHJcbiAgICAgICAgcmVuZGVyVHJlZUZyYW1lLmF0dHJpYnV0ZVZhbHVlKGF0dHJpYnV0ZUZyYW1lKSFcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdHJ5QXBwbHlTcGVjaWFsUHJvcGVydHkoZWxlbWVudDogRWxlbWVudCwgYXR0cmlidXRlTmFtZTogc3RyaW5nLCBhdHRyaWJ1dGVGcmFtZTogUmVuZGVyVHJlZUZyYW1lUG9pbnRlciB8IG51bGwpIHtcclxuICAgIHN3aXRjaCAoYXR0cmlidXRlTmFtZSkge1xyXG4gICAgICBjYXNlICd2YWx1ZSc6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJ5QXBwbHlWYWx1ZVByb3BlcnR5KGVsZW1lbnQsIGF0dHJpYnV0ZUZyYW1lKTtcclxuICAgICAgY2FzZSAnY2hlY2tlZCc6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJ5QXBwbHlDaGVja2VkUHJvcGVydHkoZWxlbWVudCwgYXR0cmlidXRlRnJhbWUpO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdHJ5QXBwbHlWYWx1ZVByb3BlcnR5KGVsZW1lbnQ6IEVsZW1lbnQsIGF0dHJpYnV0ZUZyYW1lOiBSZW5kZXJUcmVlRnJhbWVQb2ludGVyIHwgbnVsbCkge1xyXG4gICAgLy8gQ2VydGFpbiBlbGVtZW50cyBoYXZlIGJ1aWx0LWluIGJlaGF2aW91ciBmb3IgdGhlaXIgJ3ZhbHVlJyBwcm9wZXJ0eVxyXG4gICAgc3dpdGNoIChlbGVtZW50LnRhZ05hbWUpIHtcclxuICAgICAgY2FzZSAnSU5QVVQnOlxyXG4gICAgICBjYXNlICdTRUxFQ1QnOlxyXG4gICAgICBjYXNlICdURVhUQVJFQSc6IHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IGF0dHJpYnV0ZUZyYW1lID8gcmVuZGVyVHJlZUZyYW1lLmF0dHJpYnV0ZVZhbHVlKGF0dHJpYnV0ZUZyYW1lKSA6IG51bGw7XHJcbiAgICAgICAgKGVsZW1lbnQgYXMgYW55KS52YWx1ZSA9IHZhbHVlO1xyXG5cclxuICAgICAgICBpZiAoZWxlbWVudC50YWdOYW1lID09PSAnU0VMRUNUJykge1xyXG4gICAgICAgICAgLy8gPHNlbGVjdD4gaXMgc3BlY2lhbCwgaW4gdGhhdCBhbnl0aGluZyB3ZSB3cml0ZSB0byAudmFsdWUgd2lsbCBiZSBsb3N0IGlmIHRoZXJlXHJcbiAgICAgICAgICAvLyBpc24ndCB5ZXQgYSBtYXRjaGluZyA8b3B0aW9uPi4gVG8gbWFpbnRhaW4gdGhlIGV4cGVjdGVkIGJlaGF2aW9yIG5vIG1hdHRlciB0aGVcclxuICAgICAgICAgIC8vIGVsZW1lbnQgaW5zZXJ0aW9uL3VwZGF0ZSBvcmRlciwgcHJlc2VydmUgdGhlIGRlc2lyZWQgdmFsdWUgc2VwYXJhdGVseSBzb1xyXG4gICAgICAgICAgLy8gd2UgY2FuIHJlY292ZXIgaXQgd2hlbiBpbnNlcnRpbmcgYW55IG1hdGNoaW5nIDxvcHRpb24+LlxyXG4gICAgICAgICAgZWxlbWVudFtzZWxlY3RWYWx1ZVByb3BuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdPUFRJT04nOiB7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSBhdHRyaWJ1dGVGcmFtZSA/IHJlbmRlclRyZWVGcmFtZS5hdHRyaWJ1dGVWYWx1ZShhdHRyaWJ1dGVGcmFtZSkgOiBudWxsO1xyXG4gICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgdmFsdWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgndmFsdWUnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gU2VlIGFib3ZlIGZvciB3aHkgd2UgaGF2ZSB0aGlzIHNwZWNpYWwgaGFuZGxpbmcgZm9yIDxzZWxlY3Q+LzxvcHRpb24+XHJcbiAgICAgICAgY29uc3QgcGFyZW50RWxlbWVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICAgICAgICBpZiAocGFyZW50RWxlbWVudCAmJiAoc2VsZWN0VmFsdWVQcm9wbmFtZSBpbiBwYXJlbnRFbGVtZW50KSAmJiBwYXJlbnRFbGVtZW50W3NlbGVjdFZhbHVlUHJvcG5hbWVdID09PSB2YWx1ZSkge1xyXG4gICAgICAgICAgdGhpcy50cnlBcHBseVZhbHVlUHJvcGVydHkocGFyZW50RWxlbWVudCwgYXR0cmlidXRlRnJhbWUpO1xyXG4gICAgICAgICAgZGVsZXRlIHBhcmVudEVsZW1lbnRbc2VsZWN0VmFsdWVQcm9wbmFtZV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0cnlBcHBseUNoZWNrZWRQcm9wZXJ0eShlbGVtZW50OiBFbGVtZW50LCBhdHRyaWJ1dGVGcmFtZTogUmVuZGVyVHJlZUZyYW1lUG9pbnRlciB8IG51bGwpIHtcclxuICAgIC8vIENlcnRhaW4gZWxlbWVudHMgaGF2ZSBidWlsdC1pbiBiZWhhdmlvdXIgZm9yIHRoZWlyICdjaGVja2VkJyBwcm9wZXJ0eVxyXG4gICAgaWYgKGVsZW1lbnQudGFnTmFtZSA9PT0gJ0lOUFVUJykge1xyXG4gICAgICBjb25zdCB2YWx1ZSA9IGF0dHJpYnV0ZUZyYW1lID8gcmVuZGVyVHJlZUZyYW1lLmF0dHJpYnV0ZVZhbHVlKGF0dHJpYnV0ZUZyYW1lKSA6IG51bGw7XHJcbiAgICAgIChlbGVtZW50IGFzIGFueSkuY2hlY2tlZCA9IHZhbHVlICE9PSBudWxsO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5zZXJ0RnJhbWVSYW5nZShjb21wb25lbnRJZDogbnVtYmVyLCBwYXJlbnQ6IExvZ2ljYWxFbGVtZW50LCBjaGlsZEluZGV4OiBudW1iZXIsIGZyYW1lczogU3lzdGVtX0FycmF5PFJlbmRlclRyZWVGcmFtZVBvaW50ZXI+LCBzdGFydEluZGV4OiBudW1iZXIsIGVuZEluZGV4RXhjbDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIGNvbnN0IG9yaWdDaGlsZEluZGV4ID0gY2hpbGRJbmRleDtcclxuICAgIGZvciAobGV0IGluZGV4ID0gc3RhcnRJbmRleDsgaW5kZXggPCBlbmRJbmRleEV4Y2w7IGluZGV4KyspIHtcclxuICAgICAgY29uc3QgZnJhbWUgPSBnZXRUcmVlRnJhbWVQdHIoZnJhbWVzLCBpbmRleCk7XHJcbiAgICAgIGNvbnN0IG51bUNoaWxkcmVuSW5zZXJ0ZWQgPSB0aGlzLmluc2VydEZyYW1lKGNvbXBvbmVudElkLCBwYXJlbnQsIGNoaWxkSW5kZXgsIGZyYW1lcywgZnJhbWUsIGluZGV4KTtcclxuICAgICAgY2hpbGRJbmRleCArPSBudW1DaGlsZHJlbkluc2VydGVkO1xyXG5cclxuICAgICAgLy8gU2tpcCBvdmVyIGFueSBkZXNjZW5kYW50cywgc2luY2UgdGhleSBhcmUgYWxyZWFkeSBkZWFsdCB3aXRoIHJlY3Vyc2l2ZWx5XHJcbiAgICAgIGluZGV4ICs9IGNvdW50RGVzY2VuZGFudEZyYW1lcyhmcmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChjaGlsZEluZGV4IC0gb3JpZ0NoaWxkSW5kZXgpOyAvLyBUb3RhbCBudW1iZXIgb2YgY2hpbGRyZW4gaW5zZXJ0ZWRcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvdW50RGVzY2VuZGFudEZyYW1lcyhmcmFtZTogUmVuZGVyVHJlZUZyYW1lUG9pbnRlcik6IG51bWJlciB7XHJcbiAgc3dpdGNoIChyZW5kZXJUcmVlRnJhbWUuZnJhbWVUeXBlKGZyYW1lKSkge1xyXG4gICAgLy8gVGhlIGZvbGxvd2luZyBmcmFtZSB0eXBlcyBoYXZlIGEgc3VidHJlZSBsZW5ndGguIE90aGVyIGZyYW1lcyBtYXkgdXNlIHRoYXQgbWVtb3J5IHNsb3RcclxuICAgIC8vIHRvIG1lYW4gc29tZXRoaW5nIGVsc2UsIHNvIHdlIG11c3Qgbm90IHJlYWQgaXQuIFdlIHNob3VsZCBjb25zaWRlciBoYXZpbmcgbm9taW5hbCBzdWJ0eXBlc1xyXG4gICAgLy8gb2YgUmVuZGVyVHJlZUZyYW1lUG9pbnRlciB0aGF0IHByZXZlbnQgYWNjZXNzIHRvIG5vbi1hcHBsaWNhYmxlIGZpZWxkcy5cclxuICAgIGNhc2UgRnJhbWVUeXBlLmNvbXBvbmVudDpcclxuICAgIGNhc2UgRnJhbWVUeXBlLmVsZW1lbnQ6XHJcbiAgICBjYXNlIEZyYW1lVHlwZS5yZWdpb246XHJcbiAgICAgIHJldHVybiByZW5kZXJUcmVlRnJhbWUuc3VidHJlZUxlbmd0aChmcmFtZSkgLSAxO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByYWlzZUV2ZW50KGV2ZW50OiBFdmVudCwgYnJvd3NlclJlbmRlcmVySWQ6IG51bWJlciwgY29tcG9uZW50SWQ6IG51bWJlciwgZXZlbnRIYW5kbGVySWQ6IG51bWJlciwgZXZlbnRBcmdzOiBFdmVudEZvckRvdE5ldDxVSUV2ZW50QXJncz4pIHtcclxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICBpZiAoIXJhaXNlRXZlbnRNZXRob2QpIHtcclxuICAgIHJhaXNlRXZlbnRNZXRob2QgPSBwbGF0Zm9ybS5maW5kTWV0aG9kKFxyXG4gICAgICAnTWljcm9zb2Z0LkFzcE5ldENvcmUuQmxhem9yLkJyb3dzZXInLCAnTWljcm9zb2Z0LkFzcE5ldENvcmUuQmxhem9yLkJyb3dzZXIuUmVuZGVyaW5nJywgJ0Jyb3dzZXJSZW5kZXJlckV2ZW50RGlzcGF0Y2hlcicsICdEaXNwYXRjaEV2ZW50J1xyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGV2ZW50RGVzY3JpcHRvciA9IHtcclxuICAgIEJyb3dzZXJSZW5kZXJlcklkOiBicm93c2VyUmVuZGVyZXJJZCxcclxuICAgIENvbXBvbmVudElkOiBjb21wb25lbnRJZCxcclxuICAgIEV2ZW50SGFuZGxlcklkOiBldmVudEhhbmRsZXJJZCxcclxuICAgIEV2ZW50QXJnc1R5cGU6IGV2ZW50QXJncy50eXBlXHJcbiAgfTtcclxuXHJcbiAgcGxhdGZvcm0uY2FsbE1ldGhvZChyYWlzZUV2ZW50TWV0aG9kLCBudWxsLCBbXHJcbiAgICBwbGF0Zm9ybS50b0RvdE5ldFN0cmluZyhKU09OLnN0cmluZ2lmeShldmVudERlc2NyaXB0b3IpKSxcclxuICAgIHBsYXRmb3JtLnRvRG90TmV0U3RyaW5nKEpTT04uc3RyaW5naWZ5KGV2ZW50QXJncy5kYXRhKSlcclxuICBdKTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvUmVuZGVyaW5nL0Jyb3dzZXJSZW5kZXJlci50cyIsImltcG9ydCB7IFN5c3RlbV9BcnJheSwgUG9pbnRlciB9IGZyb20gJy4uL1BsYXRmb3JtL1BsYXRmb3JtJztcclxuaW1wb3J0IHsgcGxhdGZvcm0gfSBmcm9tICcuLi9FbnZpcm9ubWVudCc7XHJcbmNvbnN0IHJlbmRlclRyZWVFZGl0U3RydWN0TGVuZ3RoID0gMTY7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmVuZGVyVHJlZUVkaXRQdHIocmVuZGVyVHJlZUVkaXRzOiBTeXN0ZW1fQXJyYXk8UmVuZGVyVHJlZUVkaXRQb2ludGVyPiwgaW5kZXg6IG51bWJlcikge1xyXG4gIHJldHVybiBwbGF0Zm9ybS5nZXRBcnJheUVudHJ5UHRyKHJlbmRlclRyZWVFZGl0cywgaW5kZXgsIHJlbmRlclRyZWVFZGl0U3RydWN0TGVuZ3RoKTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlbmRlclRyZWVFZGl0ID0ge1xyXG4gIC8vIFRoZSBwcm9wZXJ0aWVzIGFuZCBtZW1vcnkgbGF5b3V0IG11c3QgYmUga2VwdCBpbiBzeW5jIHdpdGggdGhlIC5ORVQgZXF1aXZhbGVudCBpbiBSZW5kZXJUcmVlRWRpdC5jc1xyXG4gIHR5cGU6IChlZGl0OiBSZW5kZXJUcmVlRWRpdFBvaW50ZXIpID0+IHBsYXRmb3JtLnJlYWRJbnQzMkZpZWxkKGVkaXQsIDApIGFzIEVkaXRUeXBlLFxyXG4gIHNpYmxpbmdJbmRleDogKGVkaXQ6IFJlbmRlclRyZWVFZGl0UG9pbnRlcikgPT4gcGxhdGZvcm0ucmVhZEludDMyRmllbGQoZWRpdCwgNCksXHJcbiAgbmV3VHJlZUluZGV4OiAoZWRpdDogUmVuZGVyVHJlZUVkaXRQb2ludGVyKSA9PiBwbGF0Zm9ybS5yZWFkSW50MzJGaWVsZChlZGl0LCA4KSxcclxuICByZW1vdmVkQXR0cmlidXRlTmFtZTogKGVkaXQ6IFJlbmRlclRyZWVFZGl0UG9pbnRlcikgPT4gcGxhdGZvcm0ucmVhZFN0cmluZ0ZpZWxkKGVkaXQsIDEyKSxcclxufTtcclxuXHJcbmV4cG9ydCBlbnVtIEVkaXRUeXBlIHtcclxuICBwcmVwZW5kRnJhbWUgPSAxLFxyXG4gIHJlbW92ZUZyYW1lID0gMixcclxuICBzZXRBdHRyaWJ1dGUgPSAzLFxyXG4gIHJlbW92ZUF0dHJpYnV0ZSA9IDQsXHJcbiAgdXBkYXRlVGV4dCA9IDUsXHJcbiAgc3RlcEluID0gNixcclxuICBzdGVwT3V0ID0gNyxcclxufVxyXG5cclxuLy8gTm9taW5hbCB0eXBlIHRvIGVuc3VyZSBvbmx5IHZhbGlkIHBvaW50ZXJzIGFyZSBwYXNzZWQgdG8gdGhlIHJlbmRlclRyZWVFZGl0IGZ1bmN0aW9ucy5cclxuLy8gQXQgcnVudGltZSB0aGUgdmFsdWVzIGFyZSBqdXN0IG51bWJlcnMuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVuZGVyVHJlZUVkaXRQb2ludGVyIGV4dGVuZHMgUG9pbnRlciB7IFJlbmRlclRyZWVFZGl0UG9pbnRlcl9fRE9fTk9UX0lNUExFTUVOVDogYW55IH1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1JlbmRlcmluZy9SZW5kZXJUcmVlRWRpdC50cyIsImltcG9ydCB7IFN5c3RlbV9TdHJpbmcsIFN5c3RlbV9BcnJheSwgUG9pbnRlciB9IGZyb20gJy4uL1BsYXRmb3JtL1BsYXRmb3JtJztcclxuaW1wb3J0IHsgcGxhdGZvcm0gfSBmcm9tICcuLi9FbnZpcm9ubWVudCc7XHJcbmNvbnN0IHJlbmRlclRyZWVGcmFtZVN0cnVjdExlbmd0aCA9IDI4O1xyXG5cclxuLy8gVG8gbWluaW1pc2UgR0MgcHJlc3N1cmUsIGluc3RlYWQgb2YgaW5zdGFudGlhdGluZyBhIEpTIG9iamVjdCB0byByZXByZXNlbnQgZWFjaCB0cmVlIGZyYW1lLFxyXG4vLyB3ZSB3b3JrIGluIHRlcm1zIG9mIHBvaW50ZXJzIHRvIHRoZSBzdHJ1Y3RzIG9uIHRoZSAuTkVUIGhlYXAsIGFuZCB1c2Ugc3RhdGljIGZ1bmN0aW9ucyB0aGF0XHJcbi8vIGtub3cgaG93IHRvIHJlYWQgcHJvcGVydHkgdmFsdWVzIGZyb20gdGhvc2Ugc3RydWN0cy5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmVlRnJhbWVQdHIocmVuZGVyVHJlZUVudHJpZXM6IFN5c3RlbV9BcnJheTxSZW5kZXJUcmVlRnJhbWVQb2ludGVyPiwgaW5kZXg6IG51bWJlcikge1xyXG4gIHJldHVybiBwbGF0Zm9ybS5nZXRBcnJheUVudHJ5UHRyKHJlbmRlclRyZWVFbnRyaWVzLCBpbmRleCwgcmVuZGVyVHJlZUZyYW1lU3RydWN0TGVuZ3RoKTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlbmRlclRyZWVGcmFtZSA9IHtcclxuICAvLyBUaGUgcHJvcGVydGllcyBhbmQgbWVtb3J5IGxheW91dCBtdXN0IGJlIGtlcHQgaW4gc3luYyB3aXRoIHRoZSAuTkVUIGVxdWl2YWxlbnQgaW4gUmVuZGVyVHJlZUZyYW1lLmNzXHJcbiAgZnJhbWVUeXBlOiAoZnJhbWU6IFJlbmRlclRyZWVGcmFtZVBvaW50ZXIpID0+IHBsYXRmb3JtLnJlYWRJbnQzMkZpZWxkKGZyYW1lLCA0KSBhcyBGcmFtZVR5cGUsXHJcbiAgc3VidHJlZUxlbmd0aDogKGZyYW1lOiBSZW5kZXJUcmVlRnJhbWVQb2ludGVyKSA9PiBwbGF0Zm9ybS5yZWFkSW50MzJGaWVsZChmcmFtZSwgOCkgYXMgRnJhbWVUeXBlLFxyXG4gIGVsZW1lbnRSZWZlcmVuY2VDYXB0dXJlSWQ6IChmcmFtZTogUmVuZGVyVHJlZUZyYW1lUG9pbnRlcikgPT4gcGxhdGZvcm0ucmVhZEludDMyRmllbGQoZnJhbWUsIDgpLFxyXG4gIGNvbXBvbmVudElkOiAoZnJhbWU6IFJlbmRlclRyZWVGcmFtZVBvaW50ZXIpID0+IHBsYXRmb3JtLnJlYWRJbnQzMkZpZWxkKGZyYW1lLCAxMiksXHJcbiAgZWxlbWVudE5hbWU6IChmcmFtZTogUmVuZGVyVHJlZUZyYW1lUG9pbnRlcikgPT4gcGxhdGZvcm0ucmVhZFN0cmluZ0ZpZWxkKGZyYW1lLCAxNiksXHJcbiAgdGV4dENvbnRlbnQ6IChmcmFtZTogUmVuZGVyVHJlZUZyYW1lUG9pbnRlcikgPT4gcGxhdGZvcm0ucmVhZFN0cmluZ0ZpZWxkKGZyYW1lLCAxNiksXHJcbiAgYXR0cmlidXRlTmFtZTogKGZyYW1lOiBSZW5kZXJUcmVlRnJhbWVQb2ludGVyKSA9PiBwbGF0Zm9ybS5yZWFkU3RyaW5nRmllbGQoZnJhbWUsIDE2KSxcclxuICBhdHRyaWJ1dGVWYWx1ZTogKGZyYW1lOiBSZW5kZXJUcmVlRnJhbWVQb2ludGVyKSA9PiBwbGF0Zm9ybS5yZWFkU3RyaW5nRmllbGQoZnJhbWUsIDI0KSxcclxuICBhdHRyaWJ1dGVFdmVudEhhbmRsZXJJZDogKGZyYW1lOiBSZW5kZXJUcmVlRnJhbWVQb2ludGVyKSA9PiBwbGF0Zm9ybS5yZWFkSW50MzJGaWVsZChmcmFtZSwgOCksXHJcbn07XHJcblxyXG5leHBvcnQgZW51bSBGcmFtZVR5cGUge1xyXG4gIC8vIFRoZSB2YWx1ZXMgbXVzdCBiZSBrZXB0IGluIHN5bmMgd2l0aCB0aGUgLk5FVCBlcXVpdmFsZW50IGluIFJlbmRlclRyZWVGcmFtZVR5cGUuY3NcclxuICBlbGVtZW50ID0gMSxcclxuICB0ZXh0ID0gMixcclxuICBhdHRyaWJ1dGUgPSAzLFxyXG4gIGNvbXBvbmVudCA9IDQsXHJcbiAgcmVnaW9uID0gNSxcclxuICBlbGVtZW50UmVmZXJlbmNlQ2FwdHVyZSA9IDYsXHJcbn1cclxuXHJcbi8vIE5vbWluYWwgdHlwZSB0byBlbnN1cmUgb25seSB2YWxpZCBwb2ludGVycyBhcmUgcGFzc2VkIHRvIHRoZSByZW5kZXJUcmVlRnJhbWUgZnVuY3Rpb25zLlxyXG4vLyBBdCBydW50aW1lIHRoZSB2YWx1ZXMgYXJlIGp1c3QgbnVtYmVycy5cclxuZXhwb3J0IGludGVyZmFjZSBSZW5kZXJUcmVlRnJhbWVQb2ludGVyIGV4dGVuZHMgUG9pbnRlciB7IFJlbmRlclRyZWVGcmFtZVBvaW50ZXJfX0RPX05PVF9JTVBMRU1FTlQ6IGFueSB9XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9SZW5kZXJpbmcvUmVuZGVyVHJlZUZyYW1lLnRzIiwiaW1wb3J0IHsgRXZlbnRGb3JEb3ROZXQsIFVJRXZlbnRBcmdzIH0gZnJvbSAnLi9FdmVudEZvckRvdE5ldCc7XHJcblxyXG5jb25zdCBub25CdWJibGluZ0V2ZW50cyA9IHRvTG9va3VwKFtcclxuICAnYWJvcnQnLCAnYmx1cicsICdjaGFuZ2UnLCAnZXJyb3InLCAnZm9jdXMnLCAnbG9hZCcsICdsb2FkZW5kJywgJ2xvYWRzdGFydCcsICdtb3VzZWVudGVyJywgJ21vdXNlbGVhdmUnLFxyXG4gICdwcm9ncmVzcycsICdyZXNldCcsICdzY3JvbGwnLCAnc3VibWl0JywgJ3VubG9hZCcsICdET01Ob2RlSW5zZXJ0ZWRJbnRvRG9jdW1lbnQnLCAnRE9NTm9kZVJlbW92ZWRGcm9tRG9jdW1lbnQnXHJcbl0pO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBPbkV2ZW50Q2FsbGJhY2sge1xyXG4gIChldmVudDogRXZlbnQsIGNvbXBvbmVudElkOiBudW1iZXIsIGV2ZW50SGFuZGxlcklkOiBudW1iZXIsIGV2ZW50QXJnczogRXZlbnRGb3JEb3ROZXQ8VUlFdmVudEFyZ3M+KTogdm9pZDtcclxufVxyXG5cclxuLy8gUmVzcG9uc2libGUgZm9yIGFkZGluZy9yZW1vdmluZyB0aGUgZXZlbnRJbmZvIG9uIGFuIGV4cGFuZG8gcHJvcGVydHkgb24gRE9NIGVsZW1lbnRzLCBhbmRcclxuLy8gY2FsbGluZyBhbiBFdmVudEluZm9TdG9yZSB0aGF0IGRlYWxzIHdpdGggcmVnaXN0ZXJpbmcvdW5yZWdpc3RlcmluZyB0aGUgdW5kZXJseWluZyBkZWxlZ2F0ZWRcclxuLy8gZXZlbnQgbGlzdGVuZXJzIGFzIHJlcXVpcmVkIChhbmQgYWxzbyBtYXBzIGFjdHVhbCBldmVudHMgYmFjayB0byB0aGUgZ2l2ZW4gY2FsbGJhY2spLlxyXG5leHBvcnQgY2xhc3MgRXZlbnREZWxlZ2F0b3Ige1xyXG4gIHByaXZhdGUgc3RhdGljIG5leHRFdmVudERlbGVnYXRvcklkID0gMDtcclxuICBwcml2YXRlIGV2ZW50c0NvbGxlY3Rpb25LZXk6IHN0cmluZztcclxuICBwcml2YXRlIGV2ZW50SW5mb1N0b3JlOiBFdmVudEluZm9TdG9yZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBvbkV2ZW50OiBPbkV2ZW50Q2FsbGJhY2spIHtcclxuICAgIGNvbnN0IGV2ZW50RGVsZWdhdG9ySWQgPSArK0V2ZW50RGVsZWdhdG9yLm5leHRFdmVudERlbGVnYXRvcklkO1xyXG4gICAgdGhpcy5ldmVudHNDb2xsZWN0aW9uS2V5ID0gYF9ibGF6b3JFdmVudHNfJHtldmVudERlbGVnYXRvcklkfWA7XHJcbiAgICB0aGlzLmV2ZW50SW5mb1N0b3JlID0gbmV3IEV2ZW50SW5mb1N0b3JlKHRoaXMub25HbG9iYWxFdmVudC5iaW5kKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRMaXN0ZW5lcihlbGVtZW50OiBFbGVtZW50LCBldmVudE5hbWU6IHN0cmluZywgY29tcG9uZW50SWQ6IG51bWJlciwgZXZlbnRIYW5kbGVySWQ6IG51bWJlcikge1xyXG4gICAgLy8gRW5zdXJlIHdlIGhhdmUgYSBwbGFjZSB0byBzdG9yZSBldmVudCBpbmZvIGZvciB0aGlzIGVsZW1lbnRcclxuICAgIGxldCBpbmZvRm9yRWxlbWVudDogRXZlbnRIYW5kbGVySW5mb3NGb3JFbGVtZW50ID0gZWxlbWVudFt0aGlzLmV2ZW50c0NvbGxlY3Rpb25LZXldO1xyXG4gICAgaWYgKCFpbmZvRm9yRWxlbWVudCkge1xyXG4gICAgICBpbmZvRm9yRWxlbWVudCA9IGVsZW1lbnRbdGhpcy5ldmVudHNDb2xsZWN0aW9uS2V5XSA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpbmZvRm9yRWxlbWVudC5oYXNPd25Qcm9wZXJ0eShldmVudE5hbWUpKSB7XHJcbiAgICAgIC8vIFdlIGNhbiBjaGVhcGx5IHVwZGF0ZSB0aGUgaW5mbyBvbiB0aGUgZXhpc3Rpbmcgb2JqZWN0IGFuZCBkb24ndCBuZWVkIGFueSBvdGhlciBob3VzZWtlZXBpbmdcclxuICAgICAgY29uc3Qgb2xkSW5mbyA9IGluZm9Gb3JFbGVtZW50W2V2ZW50TmFtZV07XHJcbiAgICAgIHRoaXMuZXZlbnRJbmZvU3RvcmUudXBkYXRlKG9sZEluZm8uZXZlbnRIYW5kbGVySWQsIGV2ZW50SGFuZGxlcklkKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIEdvIHRocm91Z2ggdGhlIHdob2xlIGZsb3cgd2hpY2ggbWlnaHQgaW52b2x2ZSByZWdpc3RlcmluZyBhIG5ldyBnbG9iYWwgaGFuZGxlclxyXG4gICAgICBjb25zdCBuZXdJbmZvID0geyBlbGVtZW50LCBldmVudE5hbWUsIGNvbXBvbmVudElkLCBldmVudEhhbmRsZXJJZCB9O1xyXG4gICAgICB0aGlzLmV2ZW50SW5mb1N0b3JlLmFkZChuZXdJbmZvKTtcclxuICAgICAgaW5mb0ZvckVsZW1lbnRbZXZlbnROYW1lXSA9IG5ld0luZm87XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVtb3ZlTGlzdGVuZXIoZXZlbnRIYW5kbGVySWQ6IG51bWJlcikge1xyXG4gICAgLy8gVGhpcyBtZXRob2QgZ2V0cyBjYWxsZWQgd2hlbmV2ZXIgdGhlIC5ORVQtc2lkZSBjb2RlIHJlcG9ydHMgdGhhdCBhIGNlcnRhaW4gZXZlbnQgaGFuZGxlclxyXG4gICAgLy8gaGFzIGJlZW4gZGlzcG9zZWQuIEhvd2V2ZXIgd2Ugd2lsbCBhbHJlYWR5IGhhdmUgZGlzcG9zZWQgdGhlIGluZm8gYWJvdXQgdGhhdCBoYW5kbGVyIGlmXHJcbiAgICAvLyB0aGUgZXZlbnRIYW5kbGVySWQgZm9yIHRoZSAoZWxlbWVudCxldmVudE5hbWUpIHBhaXIgd2FzIHJlcGxhY2VkIGR1cmluZyBkaWZmIGFwcGxpY2F0aW9uLlxyXG4gICAgY29uc3QgaW5mbyA9IHRoaXMuZXZlbnRJbmZvU3RvcmUucmVtb3ZlKGV2ZW50SGFuZGxlcklkKTtcclxuICAgIGlmIChpbmZvKSB7XHJcbiAgICAgIC8vIExvb2tzIGxpa2UgdGhpcyBldmVudCBoYW5kbGVyIHdhc24ndCBhbHJlYWR5IGRpc3Bvc2VkXHJcbiAgICAgIC8vIFJlbW92ZSB0aGUgYXNzb2NpYXRlZCBkYXRhIGZyb20gdGhlIERPTSBlbGVtZW50XHJcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBpbmZvLmVsZW1lbnQ7XHJcbiAgICAgIGlmIChlbGVtZW50Lmhhc093blByb3BlcnR5KHRoaXMuZXZlbnRzQ29sbGVjdGlvbktleSkpIHtcclxuICAgICAgICBjb25zdCBlbGVtZW50RXZlbnRJbmZvczogRXZlbnRIYW5kbGVySW5mb3NGb3JFbGVtZW50ID0gZWxlbWVudFt0aGlzLmV2ZW50c0NvbGxlY3Rpb25LZXldO1xyXG4gICAgICAgIGRlbGV0ZSBlbGVtZW50RXZlbnRJbmZvc1tpbmZvLmV2ZW50TmFtZV07XHJcbiAgICAgICAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGVsZW1lbnRFdmVudEluZm9zKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgIGRlbGV0ZSBlbGVtZW50W3RoaXMuZXZlbnRzQ29sbGVjdGlvbktleV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uR2xvYmFsRXZlbnQoZXZ0OiBFdmVudCkge1xyXG4gICAgaWYgKCEoZXZ0LnRhcmdldCBpbnN0YW5jZW9mIEVsZW1lbnQpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTY2FuIHVwIHRoZSBlbGVtZW50IGhpZXJhcmNoeSwgbG9va2luZyBmb3IgYW55IG1hdGNoaW5nIHJlZ2lzdGVyZWQgZXZlbnQgaGFuZGxlcnNcclxuICAgIGxldCBjYW5kaWRhdGVFbGVtZW50ID0gZXZ0LnRhcmdldCBhcyBFbGVtZW50IHwgbnVsbDtcclxuICAgIGxldCBldmVudEFyZ3M6IEV2ZW50Rm9yRG90TmV0PFVJRXZlbnRBcmdzPiB8IG51bGwgPSBudWxsOyAvLyBQb3B1bGF0ZSBsYXppbHlcclxuICAgIGNvbnN0IGV2ZW50SXNOb25CdWJibGluZyA9IG5vbkJ1YmJsaW5nRXZlbnRzLmhhc093blByb3BlcnR5KGV2dC50eXBlKTtcclxuICAgIHdoaWxlIChjYW5kaWRhdGVFbGVtZW50KSB7XHJcbiAgICAgIGlmIChjYW5kaWRhdGVFbGVtZW50Lmhhc093blByb3BlcnR5KHRoaXMuZXZlbnRzQ29sbGVjdGlvbktleSkpIHtcclxuICAgICAgICBjb25zdCBoYW5kbGVySW5mb3MgPSBjYW5kaWRhdGVFbGVtZW50W3RoaXMuZXZlbnRzQ29sbGVjdGlvbktleV07XHJcbiAgICAgICAgaWYgKGhhbmRsZXJJbmZvcy5oYXNPd25Qcm9wZXJ0eShldnQudHlwZSkpIHtcclxuICAgICAgICAgIC8vIFdlIGFyZSBnb2luZyB0byByYWlzZSBhbiBldmVudCBmb3IgdGhpcyBlbGVtZW50LCBzbyBwcmVwYXJlIGluZm8gbmVlZGVkIGJ5IHRoZSAuTkVUIGNvZGVcclxuICAgICAgICAgIGlmICghZXZlbnRBcmdzKSB7XHJcbiAgICAgICAgICAgIGV2ZW50QXJncyA9IEV2ZW50Rm9yRG90TmV0LmZyb21ET01FdmVudChldnQpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNvbnN0IGhhbmRsZXJJbmZvID0gaGFuZGxlckluZm9zW2V2dC50eXBlXTtcclxuICAgICAgICAgIHRoaXMub25FdmVudChldnQsIGhhbmRsZXJJbmZvLmNvbXBvbmVudElkLCBoYW5kbGVySW5mby5ldmVudEhhbmRsZXJJZCwgZXZlbnRBcmdzKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNhbmRpZGF0ZUVsZW1lbnQgPSBldmVudElzTm9uQnViYmxpbmcgPyBudWxsIDogY2FuZGlkYXRlRWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8gUmVzcG9uc2libGUgZm9yIGFkZGluZyBhbmQgcmVtb3ZpbmcgdGhlIGdsb2JhbCBsaXN0ZW5lciB3aGVuIHRoZSBudW1iZXIgb2YgbGlzdGVuZXJzXHJcbi8vIGZvciBhIGdpdmVuIGV2ZW50IG5hbWUgY2hhbmdlcyBiZXR3ZWVuIHplcm8gYW5kIG5vbnplcm9cclxuY2xhc3MgRXZlbnRJbmZvU3RvcmUge1xyXG4gIHByaXZhdGUgaW5mb3NCeUV2ZW50SGFuZGxlcklkOiB7IFtldmVudEhhbmRsZXJJZDogbnVtYmVyXTogRXZlbnRIYW5kbGVySW5mbyB9ID0ge307XHJcbiAgcHJpdmF0ZSBjb3VudEJ5RXZlbnROYW1lOiB7IFtldmVudE5hbWU6IHN0cmluZ106IG51bWJlciB9ID0ge307XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZ2xvYmFsTGlzdGVuZXI6IEV2ZW50TGlzdGVuZXIpIHtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhZGQoaW5mbzogRXZlbnRIYW5kbGVySW5mbykge1xyXG4gICAgaWYgKHRoaXMuaW5mb3NCeUV2ZW50SGFuZGxlcklkW2luZm8uZXZlbnRIYW5kbGVySWRdKSB7XHJcbiAgICAgIC8vIFNob3VsZCBuZXZlciBoYXBwZW4sIGJ1dCB3ZSB3YW50IHRvIGtub3cgaWYgaXQgZG9lc1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEV2ZW50ICR7aW5mby5ldmVudEhhbmRsZXJJZH0gaXMgYWxyZWFkeSB0cmFja2VkYCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5pbmZvc0J5RXZlbnRIYW5kbGVySWRbaW5mby5ldmVudEhhbmRsZXJJZF0gPSBpbmZvO1xyXG5cclxuICAgIGNvbnN0IGV2ZW50TmFtZSA9IGluZm8uZXZlbnROYW1lO1xyXG4gICAgaWYgKHRoaXMuY291bnRCeUV2ZW50TmFtZS5oYXNPd25Qcm9wZXJ0eShldmVudE5hbWUpKSB7XHJcbiAgICAgIHRoaXMuY291bnRCeUV2ZW50TmFtZVtldmVudE5hbWVdKys7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNvdW50QnlFdmVudE5hbWVbZXZlbnROYW1lXSA9IDE7XHJcblxyXG4gICAgICAvLyBUbyBtYWtlIGRlbGVnYXRpb24gd29yayB3aXRoIG5vbi1idWJibGluZyBldmVudHMsIHJlZ2lzdGVyIGEgJ2NhcHR1cmUnIGxpc3RlbmVyLlxyXG4gICAgICAvLyBXZSBwcmVzZXJ2ZSB0aGUgbm9uLWJ1YmJsaW5nIGJlaGF2aW9yIGJ5IG9ubHkgZGlzcGF0Y2hpbmcgc3VjaCBldmVudHMgdG8gdGhlIHRhcmdldGVkIGVsZW1lbnQuXHJcbiAgICAgIGNvbnN0IHVzZUNhcHR1cmUgPSBub25CdWJibGluZ0V2ZW50cy5oYXNPd25Qcm9wZXJ0eShldmVudE5hbWUpO1xyXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgdGhpcy5nbG9iYWxMaXN0ZW5lciwgdXNlQ2FwdHVyZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdXBkYXRlKG9sZEV2ZW50SGFuZGxlcklkOiBudW1iZXIsIG5ld0V2ZW50SGFuZGxlcklkOiBudW1iZXIpIHtcclxuICAgIGlmICh0aGlzLmluZm9zQnlFdmVudEhhbmRsZXJJZC5oYXNPd25Qcm9wZXJ0eShuZXdFdmVudEhhbmRsZXJJZCkpIHtcclxuICAgICAgLy8gU2hvdWxkIG5ldmVyIGhhcHBlbiwgYnV0IHdlIHdhbnQgdG8ga25vdyBpZiBpdCBkb2VzXHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRXZlbnQgJHtuZXdFdmVudEhhbmRsZXJJZH0gaXMgYWxyZWFkeSB0cmFja2VkYCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2luY2Ugd2UncmUganVzdCB1cGRhdGluZyB0aGUgZXZlbnQgaGFuZGxlciBJRCwgdGhlcmUncyBubyBuZWVkIHRvIHVwZGF0ZSB0aGUgZ2xvYmFsIGNvdW50c1xyXG4gICAgY29uc3QgaW5mbyA9IHRoaXMuaW5mb3NCeUV2ZW50SGFuZGxlcklkW29sZEV2ZW50SGFuZGxlcklkXTtcclxuICAgIGRlbGV0ZSB0aGlzLmluZm9zQnlFdmVudEhhbmRsZXJJZFtvbGRFdmVudEhhbmRsZXJJZF07XHJcbiAgICBpbmZvLmV2ZW50SGFuZGxlcklkID0gbmV3RXZlbnRIYW5kbGVySWQ7XHJcbiAgICB0aGlzLmluZm9zQnlFdmVudEhhbmRsZXJJZFtuZXdFdmVudEhhbmRsZXJJZF0gPSBpbmZvO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZShldmVudEhhbmRsZXJJZDogbnVtYmVyKTogRXZlbnRIYW5kbGVySW5mbyB7XHJcbiAgICBjb25zdCBpbmZvID0gdGhpcy5pbmZvc0J5RXZlbnRIYW5kbGVySWRbZXZlbnRIYW5kbGVySWRdO1xyXG4gICAgaWYgKGluZm8pIHtcclxuICAgICAgZGVsZXRlIHRoaXMuaW5mb3NCeUV2ZW50SGFuZGxlcklkW2V2ZW50SGFuZGxlcklkXTtcclxuXHJcbiAgICAgIGNvbnN0IGV2ZW50TmFtZSA9IGluZm8uZXZlbnROYW1lO1xyXG4gICAgICBpZiAoLS10aGlzLmNvdW50QnlFdmVudE5hbWVbZXZlbnROYW1lXSA9PT0gMCkge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLmNvdW50QnlFdmVudE5hbWVbZXZlbnROYW1lXTtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgdGhpcy5nbG9iYWxMaXN0ZW5lcik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaW5mbztcclxuICB9XHJcbn1cclxuXHJcbmludGVyZmFjZSBFdmVudEhhbmRsZXJJbmZvc0ZvckVsZW1lbnQge1xyXG4gIC8vIEFsdGhvdWdoIHdlICpjb3VsZCogdHJhY2sgbXVsdGlwbGUgZXZlbnQgaGFuZGxlcnMgcGVyIChlbGVtZW50LCBldmVudE5hbWUpIHBhaXJcclxuICAvLyAoc2luY2UgdGhleSBoYXZlIGRpc3RpbmN0IGV2ZW50SGFuZGxlcklkIHZhbHVlcyksIHRoZXJlJ3Mgbm8gcG9pbnQgZG9pbmcgc28gYmVjYXVzZVxyXG4gIC8vIG91ciBwcm9ncmFtbWluZyBtb2RlbCBpcyB0aGF0IHlvdSBkZWNsYXJlIGV2ZW50IGhhbmRsZXJzIGFzIGF0dHJpYnV0ZXMuIEFuIGVsZW1lbnRcclxuICAvLyBjYW4gb25seSBoYXZlIG9uZSBhdHRyaWJ1dGUgd2l0aCBhIGdpdmVuIG5hbWUsIGhlbmNlIG9ubHkgb25lIGV2ZW50IGhhbmRsZXIgd2l0aFxyXG4gIC8vIHRoYXQgbmFtZSBhdCBhbnkgb25lIHRpbWUuXHJcbiAgLy8gU28gdG8ga2VlcCB0aGluZ3Mgc2ltcGxlLCBvbmx5IHRyYWNrIG9uZSBFdmVudEhhbmRsZXJJbmZvIHBlciAoZWxlbWVudCwgZXZlbnROYW1lKVxyXG4gIFtldmVudE5hbWU6IHN0cmluZ106IEV2ZW50SGFuZGxlckluZm9cclxufVxyXG5cclxuaW50ZXJmYWNlIEV2ZW50SGFuZGxlckluZm8ge1xyXG4gIGVsZW1lbnQ6IEVsZW1lbnQ7XHJcbiAgZXZlbnROYW1lOiBzdHJpbmc7XHJcbiAgY29tcG9uZW50SWQ6IG51bWJlcjtcclxuICBldmVudEhhbmRsZXJJZDogbnVtYmVyO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0b0xvb2t1cChpdGVtczogc3RyaW5nW10pOiB7IFtrZXk6IHN0cmluZ106IGJvb2xlYW4gfSB7XHJcbiAgY29uc3QgcmVzdWx0ID0ge307XHJcbiAgaXRlbXMuZm9yRWFjaCh2YWx1ZSA9PiB7IHJlc3VsdFt2YWx1ZV0gPSB0cnVlOyB9KTtcclxuICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9SZW5kZXJpbmcvRXZlbnREZWxlZ2F0b3IudHMiLCJleHBvcnQgY2xhc3MgRXZlbnRGb3JEb3ROZXQ8VERhdGEgZXh0ZW5kcyBVSUV2ZW50QXJncz4ge1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSB0eXBlOiBFdmVudEFyZ3NUeXBlLCBwdWJsaWMgcmVhZG9ubHkgZGF0YTogVERhdGEpIHtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmcm9tRE9NRXZlbnQoZXZlbnQ6IEV2ZW50KTogRXZlbnRGb3JEb3ROZXQ8VUlFdmVudEFyZ3M+IHtcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBldmVudC50YXJnZXQgYXMgRWxlbWVudDtcclxuICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xyXG5cclxuICAgICAgY2FzZSAnY2hhbmdlJzoge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldElzQ2hlY2tib3ggPSBpc0NoZWNrYm94KGVsZW1lbnQpO1xyXG4gICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gdGFyZ2V0SXNDaGVja2JveCA/ICEhZWxlbWVudFsnY2hlY2tlZCddIDogZWxlbWVudFsndmFsdWUnXTtcclxuICAgICAgICByZXR1cm4gbmV3IEV2ZW50Rm9yRG90TmV0PFVJQ2hhbmdlRXZlbnRBcmdzPignY2hhbmdlJywgeyBUeXBlOiBldmVudC50eXBlLCBWYWx1ZTogbmV3VmFsdWUgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNhc2UgJ2NvcHknOlxyXG4gICAgICBjYXNlICdjdXQnOlxyXG4gICAgICBjYXNlICdwYXN0ZSc6XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFdmVudEZvckRvdE5ldDxVSUNsaXBib2FyZEV2ZW50QXJncz4oJ2NsaXBib2FyZCcsIHsgVHlwZTogZXZlbnQudHlwZSB9KTtcclxuXHJcbiAgICAgIGNhc2UgJ2RyYWcnOlxyXG4gICAgICBjYXNlICdkcmFnZW5kJzpcclxuICAgICAgY2FzZSAnZHJhZ2VudGVyJzpcclxuICAgICAgY2FzZSAnZHJhZ2xlYXZlJzpcclxuICAgICAgY2FzZSAnZHJhZ292ZXInOlxyXG4gICAgICBjYXNlICdkcmFnc3RhcnQnOlxyXG4gICAgICBjYXNlICdkcm9wJzpcclxuICAgICAgICByZXR1cm4gbmV3IEV2ZW50Rm9yRG90TmV0PFVJRHJhZ0V2ZW50QXJncz4oJ2RyYWcnLCB7IFR5cGU6IGV2ZW50LnR5cGUgfSk7XHJcblxyXG4gICAgICBjYXNlICdlcnJvcic6XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFdmVudEZvckRvdE5ldDxVSVByb2dyZXNzRXZlbnRBcmdzPignZXJyb3InLCB7IFR5cGU6IGV2ZW50LnR5cGUgfSk7XHJcblxyXG4gICAgICBjYXNlICdmb2N1cyc6XHJcbiAgICAgIGNhc2UgJ2JsdXInOlxyXG4gICAgICBjYXNlICdmb2N1c2luJzpcclxuICAgICAgY2FzZSAnZm9jdXNvdXQnOlxyXG4gICAgICAgIHJldHVybiBuZXcgRXZlbnRGb3JEb3ROZXQ8VUlGb2N1c0V2ZW50QXJncz4oJ2ZvY3VzJywgeyBUeXBlOiBldmVudC50eXBlIH0pO1xyXG5cclxuICAgICAgY2FzZSAna2V5ZG93bic6XHJcbiAgICAgIGNhc2UgJ2tleXVwJzpcclxuICAgICAgY2FzZSAna2V5cHJlc3MnOlxyXG4gICAgICAgIHJldHVybiBuZXcgRXZlbnRGb3JEb3ROZXQ8VUlLZXlib2FyZEV2ZW50QXJncz4oJ2tleWJvYXJkJywgeyBUeXBlOiBldmVudC50eXBlLCBLZXk6IChldmVudCBhcyBhbnkpLmtleSB9KTtcclxuXHJcbiAgICAgIGNhc2UgJ2NvbnRleHRtZW51JzpcclxuICAgICAgY2FzZSAnY2xpY2snOlxyXG4gICAgICBjYXNlICdtb3VzZW92ZXInOlxyXG4gICAgICBjYXNlICdtb3VzZW91dCc6XHJcbiAgICAgIGNhc2UgJ21vdXNlbW92ZSc6XHJcbiAgICAgIGNhc2UgJ21vdXNlZG93bic6XHJcbiAgICAgIGNhc2UgJ21vdXNldXAnOlxyXG4gICAgICBjYXNlICdkYmxjbGljayc6XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFdmVudEZvckRvdE5ldDxVSU1vdXNlRXZlbnRBcmdzPignbW91c2UnLCB7IFR5cGU6IGV2ZW50LnR5cGUgfSk7XHJcblxyXG4gICAgICBjYXNlICdwcm9ncmVzcyc6XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFdmVudEZvckRvdE5ldDxVSVByb2dyZXNzRXZlbnRBcmdzPigncHJvZ3Jlc3MnLCB7IFR5cGU6IGV2ZW50LnR5cGUgfSk7XHJcblxyXG4gICAgICBjYXNlICd0b3VjaGNhbmNlbCc6XHJcbiAgICAgIGNhc2UgJ3RvdWNoZW5kJzpcclxuICAgICAgY2FzZSAndG91Y2htb3ZlJzpcclxuICAgICAgY2FzZSAndG91Y2hzdGFydCc6XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFdmVudEZvckRvdE5ldDxVSVRvdWNoRXZlbnRBcmdzPigndG91Y2gnLCB7IFR5cGU6IGV2ZW50LnR5cGUgfSk7XHJcblxyXG4gICAgICBjYXNlICdnb3Rwb2ludGVyY2FwdHVyZSc6XHJcbiAgICAgIGNhc2UgJ2xvc3Rwb2ludGVyY2FwdHVyZSc6XHJcbiAgICAgIGNhc2UgJ3BvaW50ZXJjYW5jZWwnOlxyXG4gICAgICBjYXNlICdwb2ludGVyZG93bic6XHJcbiAgICAgIGNhc2UgJ3BvaW50ZXJlbnRlcic6XHJcbiAgICAgIGNhc2UgJ3BvaW50ZXJsZWF2ZSc6XHJcbiAgICAgIGNhc2UgJ3BvaW50ZXJtb3ZlJzpcclxuICAgICAgY2FzZSAncG9pbnRlcm91dCc6XHJcbiAgICAgIGNhc2UgJ3BvaW50ZXJvdmVyJzpcclxuICAgICAgY2FzZSAncG9pbnRlcnVwJzpcclxuICAgICAgICByZXR1cm4gbmV3IEV2ZW50Rm9yRG90TmV0PFVJUG9pbnRlckV2ZW50QXJncz4oJ3BvaW50ZXInLCB7IFR5cGU6IGV2ZW50LnR5cGUgfSk7XHJcblxyXG4gICAgICBjYXNlICdtb3VzZXdoZWVsJzpcclxuICAgICAgICByZXR1cm4gbmV3IEV2ZW50Rm9yRG90TmV0PFVJV2hlZWxFdmVudEFyZ3M+KCd3aGVlbCcsIHsgVHlwZTogZXZlbnQudHlwZSB9KTtcclxuXHJcblxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiBuZXcgRXZlbnRGb3JEb3ROZXQ8VUlFdmVudEFyZ3M+KCd1bmtub3duJywgeyBUeXBlOiBldmVudC50eXBlIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaXNDaGVja2JveChlbGVtZW50OiBFbGVtZW50IHwgbnVsbCkge1xyXG4gIHJldHVybiBlbGVtZW50ICYmIGVsZW1lbnQudGFnTmFtZSA9PT0gJ0lOUFVUJyAmJiBlbGVtZW50LmdldEF0dHJpYnV0ZSgndHlwZScpID09PSAnY2hlY2tib3gnO1xyXG59XHJcblxyXG4vLyBUaGUgZm9sbG93aW5nIGludGVyZmFjZXMgbXVzdCBiZSBrZXB0IGluIHN5bmMgd2l0aCB0aGUgVUlFdmVudEFyZ3MgQyMgY2xhc3Nlc1xyXG5cclxudHlwZSBFdmVudEFyZ3NUeXBlID0gJ2NoYW5nZScgfCAnY2xpcGJvYXJkJyB8ICdkcmFnJyB8ICdlcnJvcicgfCAnZm9jdXMnIHwgJ2tleWJvYXJkJyB8ICdtb3VzZScgfCAncG9pbnRlcicgfCAncHJvZ3Jlc3MnIHwgJ3RvdWNoJyB8ICd1bmtub3duJyB8ICd3aGVlbCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFVJRXZlbnRBcmdzIHtcclxuICBUeXBlOiBzdHJpbmc7XHJcbn1cclxuXHJcbmludGVyZmFjZSBVSUNoYW5nZUV2ZW50QXJncyBleHRlbmRzIFVJRXZlbnRBcmdzIHtcclxuICBWYWx1ZTogc3RyaW5nIHwgYm9vbGVhbjtcclxufVxyXG5cclxuaW50ZXJmYWNlIFVJQ2xpcGJvYXJkRXZlbnRBcmdzIGV4dGVuZHMgVUlFdmVudEFyZ3Mge1xyXG59XHJcblxyXG5pbnRlcmZhY2UgVUlEcmFnRXZlbnRBcmdzIGV4dGVuZHMgVUlFdmVudEFyZ3Mge1xyXG59XHJcblxyXG5pbnRlcmZhY2UgVUlFcnJvckV2ZW50QXJncyBleHRlbmRzIFVJRXZlbnRBcmdzIHtcclxufVxyXG5cclxuaW50ZXJmYWNlIFVJRm9jdXNFdmVudEFyZ3MgZXh0ZW5kcyBVSUV2ZW50QXJncyB7XHJcbn1cclxuXHJcbmludGVyZmFjZSBVSUtleWJvYXJkRXZlbnRBcmdzIGV4dGVuZHMgVUlFdmVudEFyZ3Mge1xyXG4gIEtleTogc3RyaW5nO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgVUlNb3VzZUV2ZW50QXJncyBleHRlbmRzIFVJRXZlbnRBcmdzIHtcclxufVxyXG5cclxuaW50ZXJmYWNlIFVJUG9pbnRlckV2ZW50QXJncyBleHRlbmRzIFVJTW91c2VFdmVudEFyZ3Mge1xyXG59XHJcblxyXG5pbnRlcmZhY2UgVUlQcm9ncmVzc0V2ZW50QXJncyBleHRlbmRzIFVJRXZlbnRBcmdzIHtcclxufVxyXG5cclxuaW50ZXJmYWNlIFVJVG91Y2hFdmVudEFyZ3MgZXh0ZW5kcyBVSUV2ZW50QXJncyB7XHJcbn1cclxuXHJcbmludGVyZmFjZSBVSVdoZWVsRXZlbnRBcmdzIGV4dGVuZHMgVUlFdmVudEFyZ3Mge1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9SZW5kZXJpbmcvRXZlbnRGb3JEb3ROZXQudHMiLCIvKlxyXG4gIEEgTG9naWNhbEVsZW1lbnQgcGxheXMgdGhlIHNhbWUgcm9sZSBhcyBhbiBFbGVtZW50IGluc3RhbmNlIGZyb20gdGhlIHBvaW50IG9mIHZpZXcgb2YgdGhlXHJcbiAgQVBJIGNvbnN1bWVyLiBJbnNlcnRpbmcgYW5kIHJlbW92aW5nIGxvZ2ljYWwgZWxlbWVudHMgdXBkYXRlcyB0aGUgYnJvd3NlciBET00ganVzdCB0aGUgc2FtZS5cclxuXHJcbiAgVGhlIGRpZmZlcmVuY2UgaXMgdGhhdCwgdW5saWtlIHJlZ3VsYXIgRE9NIG11dGF0aW9uIEFQSXMsIHRoZSBMb2dpY2FsRWxlbWVudCBBUElzIGRvbid0IHVzZVxyXG4gIHRoZSB1bmRlcmx5aW5nIERPTSBzdHJ1Y3R1cmUgYXMgdGhlIGRhdGEgc3RvcmFnZSBmb3IgdGhlIGVsZW1lbnQgaGllcmFyY2h5LiBJbnN0ZWFkLCB0aGVcclxuICBMb2dpY2FsRWxlbWVudCBBUElzIHRha2UgY2FyZSBvZiB0cmFja2luZyBoaWVyYXJjaGljYWwgcmVsYXRpb25zaGlwcyBzZXBhcmF0ZWx5LiBUaGUgcG9pbnRcclxuICBvZiB0aGlzIGlzIHRvIHBlcm1pdCBhIGxvZ2ljYWwgdHJlZSBzdHJ1Y3R1cmUgaW4gd2hpY2ggcGFyZW50L2NoaWxkIHJlbGF0aW9uc2hpcHMgZG9uJ3RcclxuICBoYXZlIHRvIGJlIG1hdGVyaWFsaXplZCBpbiB0ZXJtcyBvZiBET00gZWxlbWVudCBwYXJlbnQvY2hpbGQgcmVsYXRpb25zaGlwcy4gQW5kIHRoZSByZWFzb25cclxuICB3aHkgd2Ugd2FudCB0aGF0IGlzIHNvIHRoYXQgaGllcmFyY2hpZXMgb2YgQmxhem9yIGNvbXBvbmVudHMgY2FuIGJlIHRyYWNrZWQgZXZlbiB3aGVuIHRob3NlXHJcbiAgY29tcG9uZW50cycgcmVuZGVyIG91dHB1dCBuZWVkIG5vdCBiZSBhIHNpbmdsZSBsaXRlcmFsIERPTSBlbGVtZW50LlxyXG5cclxuICBDb25zdW1lcnMgb2YgdGhlIEFQSSBkb24ndCBuZWVkIHRvIGtub3cgYWJvdXQgdGhlIGltcGxlbWVudGF0aW9uLCBidXQgaG93IGl0J3MgZG9uZSBpczpcclxuICAtIEVhY2ggTG9naWNhbEVsZW1lbnQgaXMgbWF0ZXJpYWxpemVkIGluIHRoZSBET00gYXMgZWl0aGVyOlxyXG4gICAgLSBBIE5vZGUgaW5zdGFuY2UsIGZvciBhY3R1YWwgTm9kZSBpbnN0YW5jZXMgaW5zZXJ0ZWQgdXNpbmcgJ2luc2VydExvZ2ljYWxDaGlsZCcgb3JcclxuICAgICAgZm9yIEVsZW1lbnQgaW5zdGFuY2VzIHByb21vdGVkIHRvIExvZ2ljYWxFbGVtZW50IHZpYSAndG9Mb2dpY2FsRWxlbWVudCdcclxuICAgIC0gQSBDb21tZW50IGluc3RhbmNlLCBmb3IgJ2xvZ2ljYWwgY29udGFpbmVyJyBpbnN0YW5jZXMgaW5zZXJ0ZWQgdXNpbmcgJ2NyZWF0ZUFuZEluc2VydExvZ2ljYWxDb250YWluZXInXHJcbiAgLSBUaGVuLCBvbiB0aGF0IGluc3RhbmNlIChpLmUuLCB0aGUgTm9kZSBvciBDb21tZW50KSwgd2Ugc3RvcmUgYW4gYXJyYXkgb2YgJ2xvZ2ljYWwgY2hpbGRyZW4nXHJcbiAgICBpbnN0YW5jZXMsIGUuZy4sXHJcbiAgICAgIFtmaXJzdENoaWxkLCBzZWNvbmRDaGlsZCwgdGhpcmRDaGlsZCwgLi4uXVxyXG4gICAgLi4uIHBsdXMgd2Ugc3RvcmUgYSByZWZlcmVuY2UgdG8gdGhlICdsb2dpY2FsIHBhcmVudCcgKGlmIGFueSlcclxuICAtIFRoZSAnbG9naWNhbCBjaGlsZHJlbicgYXJyYXkgbWVhbnMgd2UgY2FuIGxvb2sgdXAgaW4gTygxKTpcclxuICAgIC0gVGhlIG51bWJlciBvZiBsb2dpY2FsIGNoaWxkcmVuIChub3QgY3VycmVudGx5IGltcGxlbWVudGVkIGJlY2F1c2Ugbm90IHJlcXVpcmVkLCBidXQgdHJpdmlhbClcclxuICAgIC0gVGhlIGxvZ2ljYWwgY2hpbGQgYXQgYW55IGdpdmVuIGluZGV4XHJcbiAgLSBXaGVuZXZlciBhIGxvZ2ljYWwgY2hpbGQgaXMgYWRkZWQgb3IgcmVtb3ZlZCwgd2UgdXBkYXRlIHRoZSBwYXJlbnQncyBhcnJheSBvZiBsb2dpY2FsIGNoaWxkcmVuXHJcbiovXHJcblxyXG5jb25zdCBsb2dpY2FsQ2hpbGRyZW5Qcm9wbmFtZSA9IGNyZWF0ZVN5bWJvbE9yRmFsbGJhY2soJ19ibGF6b3JMb2dpY2FsQ2hpbGRyZW4nKTtcclxuY29uc3QgbG9naWNhbFBhcmVudFByb3BuYW1lID0gY3JlYXRlU3ltYm9sT3JGYWxsYmFjaygnX2JsYXpvckxvZ2ljYWxQYXJlbnQnKTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0b0xvZ2ljYWxFbGVtZW50KGVsZW1lbnQ6IEVsZW1lbnQpIHtcclxuICBpZiAoZWxlbWVudC5jaGlsZE5vZGVzLmxlbmd0aCA+IDApIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignTmV3IGxvZ2ljYWwgZWxlbWVudHMgbXVzdCBzdGFydCBlbXB0eScpO1xyXG4gIH1cclxuXHJcbiAgZWxlbWVudFtsb2dpY2FsQ2hpbGRyZW5Qcm9wbmFtZV0gPSBbXTtcclxuICByZXR1cm4gZWxlbWVudCBhcyBhbnkgYXMgTG9naWNhbEVsZW1lbnQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBbmRJbnNlcnRMb2dpY2FsQ29udGFpbmVyKHBhcmVudDogTG9naWNhbEVsZW1lbnQsIGNoaWxkSW5kZXg6IG51bWJlcik6IExvZ2ljYWxFbGVtZW50IHtcclxuICBjb25zdCBjb250YWluZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCgnIScpO1xyXG4gIGluc2VydExvZ2ljYWxDaGlsZChjb250YWluZXJFbGVtZW50LCBwYXJlbnQsIGNoaWxkSW5kZXgpO1xyXG4gIHJldHVybiBjb250YWluZXJFbGVtZW50IGFzIGFueSBhcyBMb2dpY2FsRWxlbWVudDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluc2VydExvZ2ljYWxDaGlsZChjaGlsZDogTm9kZSwgcGFyZW50OiBMb2dpY2FsRWxlbWVudCwgY2hpbGRJbmRleDogbnVtYmVyKSB7XHJcbiAgY29uc3QgY2hpbGRBc0xvZ2ljYWxFbGVtZW50ID0gY2hpbGQgYXMgYW55IGFzIExvZ2ljYWxFbGVtZW50O1xyXG4gIGlmIChjaGlsZCBpbnN0YW5jZW9mIENvbW1lbnQpIHtcclxuICAgIGNvbnN0IGV4aXN0aW5nR3JhbmRjaGlsZHJlbiA9IGdldExvZ2ljYWxDaGlsZHJlbkFycmF5KGNoaWxkQXNMb2dpY2FsRWxlbWVudCk7XHJcbiAgICBpZiAoZXhpc3RpbmdHcmFuZGNoaWxkcmVuICYmIGdldExvZ2ljYWxDaGlsZHJlbkFycmF5KGNoaWxkQXNMb2dpY2FsRWxlbWVudCkubGVuZ3RoID4gMCkge1xyXG4gICAgICAvLyBUaGVyZSdzIG5vdGhpbmcgdG8gc3RvcCB1cyBpbXBsZW1lbnRpbmcgc3VwcG9ydCBmb3IgdGhpcyBzY2VuYXJpbywgYW5kIGl0J3Mgbm90IGRpZmZpY3VsdFxyXG4gICAgICAvLyAoYWZ0ZXIgaW5zZXJ0aW5nICdjaGlsZCcgaXRzZWxmLCBhbHNvIGl0ZXJhdGUgdGhyb3VnaCBpdHMgbG9naWNhbCBjaGlsZHJlbiBhbmQgcGh5c2ljYWxseVxyXG4gICAgICAvLyBwdXQgdGhlbSBhcyBmb2xsb3dpbmctc2libGluZ3MgaW4gdGhlIERPTSkuIEhvd2V2ZXIgdGhlcmUncyBubyBzY2VuYXJpbyB0aGF0IHJlcXVpcmVzIGl0XHJcbiAgICAgIC8vIHByZXNlbnRseSwgc28gaWYgd2UgZGlkIGltcGxlbWVudCBpdCB0aGVyZSdkIGJlIG5vIGdvb2Qgd2F5IHRvIGhhdmUgdGVzdHMgZm9yIGl0LlxyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZDogaW5zZXJ0aW5nIG5vbi1lbXB0eSBsb2dpY2FsIGNvbnRhaW5lcicpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKGdldExvZ2ljYWxQYXJlbnQoY2hpbGRBc0xvZ2ljYWxFbGVtZW50KSkge1xyXG4gICAgLy8gTGlrZXdpc2UsIHdlIGNvdWxkIGVhc2lseSBzdXBwb3J0IHRoaXMgc2NlbmFyaW8gdG9vIChpbiB0aGlzICdpZicgYmxvY2ssIGp1c3Qgc3BsaWNlXHJcbiAgICAvLyBvdXQgJ2NoaWxkJyBmcm9tIHRoZSBsb2dpY2FsIGNoaWxkcmVuIGFycmF5IG9mIGl0cyBwcmV2aW91cyBsb2dpY2FsIHBhcmVudCBieSB1c2luZ1xyXG4gICAgLy8gQXJyYXkucHJvdG90eXBlLmluZGV4T2YgdG8gZGV0ZXJtaW5lIGl0cyBwcmV2aW91cyBzaWJsaW5nIGluZGV4KS5cclxuICAgIC8vIEJ1dCBhZ2Fpbiwgc2luY2UgdGhlcmUncyBub3QgY3VycmVudGx5IGFueSBzY2VuYXJpbyB0aGF0IHdvdWxkIHVzZSBpdCwgd2Ugd291bGQgbm90XHJcbiAgICAvLyBoYXZlIGFueSB0ZXN0IGNvdmVyYWdlIGZvciBzdWNoIGFuIGltcGxlbWVudGF0aW9uLlxyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQ6IG1vdmluZyBleGlzdGluZyBsb2dpY2FsIGNoaWxkcmVuJyk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBuZXdTaWJsaW5ncyA9IGdldExvZ2ljYWxDaGlsZHJlbkFycmF5KHBhcmVudCk7XHJcbiAgaWYgKGNoaWxkSW5kZXggPCBuZXdTaWJsaW5ncy5sZW5ndGgpIHtcclxuICAgIC8vIEluc2VydFxyXG4gICAgY29uc3QgbmV4dFNpYmxpbmcgPSBuZXdTaWJsaW5nc1tjaGlsZEluZGV4XSBhcyBhbnkgYXMgTm9kZTtcclxuICAgIG5leHRTaWJsaW5nLnBhcmVudE5vZGUhLmluc2VydEJlZm9yZShjaGlsZCwgbmV4dFNpYmxpbmcpO1xyXG4gICAgbmV3U2libGluZ3Muc3BsaWNlKGNoaWxkSW5kZXgsIDAsIGNoaWxkQXNMb2dpY2FsRWxlbWVudCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIEFwcGVuZFxyXG4gICAgYXBwZW5kRG9tTm9kZShjaGlsZCwgcGFyZW50KTtcclxuICAgIG5ld1NpYmxpbmdzLnB1c2goY2hpbGRBc0xvZ2ljYWxFbGVtZW50KTtcclxuICB9XHJcblxyXG4gIGNoaWxkQXNMb2dpY2FsRWxlbWVudFtsb2dpY2FsUGFyZW50UHJvcG5hbWVdID0gcGFyZW50O1xyXG4gIGlmICghKGxvZ2ljYWxDaGlsZHJlblByb3BuYW1lIGluIGNoaWxkQXNMb2dpY2FsRWxlbWVudCkpIHtcclxuICAgIGNoaWxkQXNMb2dpY2FsRWxlbWVudFtsb2dpY2FsQ2hpbGRyZW5Qcm9wbmFtZV0gPSBbXTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVMb2dpY2FsQ2hpbGQocGFyZW50OiBMb2dpY2FsRWxlbWVudCwgY2hpbGRJbmRleDogbnVtYmVyKSB7XHJcbiAgY29uc3QgY2hpbGRyZW5BcnJheSA9IGdldExvZ2ljYWxDaGlsZHJlbkFycmF5KHBhcmVudCk7XHJcbiAgY29uc3QgY2hpbGRUb1JlbW92ZSA9IGNoaWxkcmVuQXJyYXkuc3BsaWNlKGNoaWxkSW5kZXgsIDEpWzBdO1xyXG5cclxuICAvLyBJZiBpdCdzIGEgbG9naWNhbCBjb250YWluZXIsIGFsc28gcmVtb3ZlIGl0cyBkZXNjZW5kYW50c1xyXG4gIGlmIChjaGlsZFRvUmVtb3ZlIGluc3RhbmNlb2YgQ29tbWVudCkge1xyXG4gICAgY29uc3QgZ3JhbmRjaGlsZHJlbkFycmF5ID0gZ2V0TG9naWNhbENoaWxkcmVuQXJyYXkoY2hpbGRUb1JlbW92ZSk7XHJcbiAgICB3aGlsZSAoZ3JhbmRjaGlsZHJlbkFycmF5Lmxlbmd0aCA+IDApIHtcclxuICAgICAgcmVtb3ZlTG9naWNhbENoaWxkKGNoaWxkVG9SZW1vdmUsIDApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gRmluYWxseSwgcmVtb3ZlIHRoZSBub2RlIGl0c2VsZlxyXG4gIGNvbnN0IGRvbU5vZGVUb1JlbW92ZSA9IGNoaWxkVG9SZW1vdmUgYXMgYW55IGFzIE5vZGU7XHJcbiAgZG9tTm9kZVRvUmVtb3ZlLnBhcmVudE5vZGUhLnJlbW92ZUNoaWxkKGRvbU5vZGVUb1JlbW92ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2dpY2FsUGFyZW50KGVsZW1lbnQ6IExvZ2ljYWxFbGVtZW50KTogTG9naWNhbEVsZW1lbnQgfCBudWxsIHtcclxuICByZXR1cm4gKGVsZW1lbnRbbG9naWNhbFBhcmVudFByb3BuYW1lXSBhcyBMb2dpY2FsRWxlbWVudCkgfHwgbnVsbDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldExvZ2ljYWxDaGlsZChwYXJlbnQ6IExvZ2ljYWxFbGVtZW50LCBjaGlsZEluZGV4OiBudW1iZXIpOiBMb2dpY2FsRWxlbWVudCB7XHJcbiAgcmV0dXJuIGdldExvZ2ljYWxDaGlsZHJlbkFycmF5KHBhcmVudClbY2hpbGRJbmRleF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1N2Z0VsZW1lbnQoZWxlbWVudDogTG9naWNhbEVsZW1lbnQpIHtcclxuICByZXR1cm4gZ2V0Q2xvc2VzdERvbUVsZW1lbnQoZWxlbWVudCkubmFtZXNwYWNlVVJJID09PSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRMb2dpY2FsQ2hpbGRyZW5BcnJheShlbGVtZW50OiBMb2dpY2FsRWxlbWVudCkge1xyXG4gIHJldHVybiBlbGVtZW50W2xvZ2ljYWxDaGlsZHJlblByb3BuYW1lXSBhcyBMb2dpY2FsRWxlbWVudFtdO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRMb2dpY2FsTmV4dFNpYmxpbmcoZWxlbWVudDogTG9naWNhbEVsZW1lbnQpOiBMb2dpY2FsRWxlbWVudCB8IG51bGwge1xyXG4gIGNvbnN0IHNpYmxpbmdzID0gZ2V0TG9naWNhbENoaWxkcmVuQXJyYXkoZ2V0TG9naWNhbFBhcmVudChlbGVtZW50KSEpO1xyXG4gIGNvbnN0IHNpYmxpbmdJbmRleCA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoc2libGluZ3MsIGVsZW1lbnQpO1xyXG4gIHJldHVybiBzaWJsaW5nc1tzaWJsaW5nSW5kZXggKyAxXSB8fCBudWxsO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRDbG9zZXN0RG9tRWxlbWVudChsb2dpY2FsRWxlbWVudDogTG9naWNhbEVsZW1lbnQpIHtcclxuICBpZiAobG9naWNhbEVsZW1lbnQgaW5zdGFuY2VvZiBFbGVtZW50KSB7XHJcbiAgICByZXR1cm4gbG9naWNhbEVsZW1lbnQ7XHJcbiAgfSBlbHNlIGlmIChsb2dpY2FsRWxlbWVudCBpbnN0YW5jZW9mIENvbW1lbnQpIHtcclxuICAgIHJldHVybiBsb2dpY2FsRWxlbWVudC5wYXJlbnROb2RlISBhcyBFbGVtZW50O1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBhIHZhbGlkIGxvZ2ljYWwgZWxlbWVudCcpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXBwZW5kRG9tTm9kZShjaGlsZDogTm9kZSwgcGFyZW50OiBMb2dpY2FsRWxlbWVudCkge1xyXG4gIC8vIFRoaXMgZnVuY3Rpb24gb25seSBwdXRzICdjaGlsZCcgaW50byB0aGUgRE9NIGluIHRoZSByaWdodCBwbGFjZSByZWxhdGl2ZSB0byAncGFyZW50J1xyXG4gIC8vIEl0IGRvZXMgbm90IHVwZGF0ZSB0aGUgbG9naWNhbCBjaGlsZHJlbiBhcnJheSBvZiBhbnl0aGluZ1xyXG4gIGlmIChwYXJlbnQgaW5zdGFuY2VvZiBFbGVtZW50KSB7XHJcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoY2hpbGQpO1xyXG4gIH0gZWxzZSBpZiAocGFyZW50IGluc3RhbmNlb2YgQ29tbWVudCkge1xyXG4gICAgY29uc3QgcGFyZW50TG9naWNhbE5leHRTaWJsaW5nID0gZ2V0TG9naWNhbE5leHRTaWJsaW5nKHBhcmVudCkgYXMgYW55IGFzIE5vZGU7XHJcbiAgICBpZiAocGFyZW50TG9naWNhbE5leHRTaWJsaW5nKSB7XHJcbiAgICAgIC8vIFNpbmNlIHRoZSBwYXJlbnQgaGFzIGEgbG9naWNhbCBuZXh0LXNpYmxpbmcsIGl0cyBhcHBlbmRlZCBjaGlsZCBnb2VzIHJpZ2h0IGJlZm9yZSB0aGF0XHJcbiAgICAgIHBhcmVudExvZ2ljYWxOZXh0U2libGluZy5wYXJlbnROb2RlIS5pbnNlcnRCZWZvcmUoY2hpbGQsIHBhcmVudExvZ2ljYWxOZXh0U2libGluZyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBTaW5jZSB0aGUgcGFyZW50IGhhcyBubyBsb2dpY2FsIG5leHQtc2libGluZywga2VlcCByZWN1cnNpbmcgdXB3YXJkcyB1bnRpbCB3ZSBmaW5kXHJcbiAgICAgIC8vIGEgbG9naWNhbCBhbmNlc3RvciB0aGF0IGRvZXMgaGF2ZSBhIG5leHQtc2libGluZyBvciBpcyBhIHBoeXNpY2FsIGVsZW1lbnQuXHJcbiAgICAgIGFwcGVuZERvbU5vZGUoY2hpbGQsIGdldExvZ2ljYWxQYXJlbnQocGFyZW50KSEpO1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyBTaG91bGQgbmV2ZXIgaGFwcGVuXHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBhcHBlbmQgbm9kZSBiZWNhdXNlIHRoZSBwYXJlbnQgaXMgbm90IGEgdmFsaWQgbG9naWNhbCBlbGVtZW50LiBQYXJlbnQ6ICR7cGFyZW50fWApO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlU3ltYm9sT3JGYWxsYmFjayhmYWxsYmFjazogc3RyaW5nKTogc3ltYm9sIHwgc3RyaW5nIHtcclxuICByZXR1cm4gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyA/IFN5bWJvbCgpIDogZmFsbGJhY2s7XHJcbn1cclxuXHJcbi8vIE5vbWluYWwgdHlwZSB0byByZXByZXNlbnQgYSBsb2dpY2FsIGVsZW1lbnQgd2l0aG91dCBuZWVkaW5nIHRvIGFsbG9jYXRlIGFueSBvYmplY3QgZm9yIGluc3RhbmNlc1xyXG5leHBvcnQgaW50ZXJmYWNlIExvZ2ljYWxFbGVtZW50IHsgTG9naWNhbEVsZW1lbnRfX0RPX05PVF9JTVBMRU1FTlQ6IGFueSB9O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvUmVuZGVyaW5nL0xvZ2ljYWxFbGVtZW50cy50cyIsImltcG9ydCB7IHJlZ2lzdGVyRnVuY3Rpb24gfSBmcm9tICcuLi9JbnRlcm9wL1JlZ2lzdGVyZWRGdW5jdGlvbic7XHJcbmltcG9ydCB7IHBsYXRmb3JtIH0gZnJvbSAnLi4vRW52aXJvbm1lbnQnO1xyXG5pbXBvcnQgeyBNZXRob2RIYW5kbGUsIFN5c3RlbV9TdHJpbmcgfSBmcm9tICcuLi9QbGF0Zm9ybS9QbGF0Zm9ybSc7XHJcbmNvbnN0IGh0dHBDbGllbnRBc3NlbWJseSA9ICdNaWNyb3NvZnQuQXNwTmV0Q29yZS5CbGF6b3IuQnJvd3Nlcic7XHJcbmNvbnN0IGh0dHBDbGllbnROYW1lc3BhY2UgPSBgJHtodHRwQ2xpZW50QXNzZW1ibHl9Lkh0dHBgO1xyXG5jb25zdCBodHRwQ2xpZW50VHlwZU5hbWUgPSAnQnJvd3Nlckh0dHBNZXNzYWdlSGFuZGxlcic7XHJcbmNvbnN0IGh0dHBDbGllbnRGdWxsVHlwZU5hbWUgPSBgJHtodHRwQ2xpZW50TmFtZXNwYWNlfS4ke2h0dHBDbGllbnRUeXBlTmFtZX1gO1xyXG5sZXQgcmVjZWl2ZVJlc3BvbnNlTWV0aG9kOiBNZXRob2RIYW5kbGU7XHJcblxyXG5yZWdpc3RlckZ1bmN0aW9uKGAke2h0dHBDbGllbnRGdWxsVHlwZU5hbWV9LlNlbmRgLCAoaWQ6IG51bWJlciwgbWV0aG9kOiBzdHJpbmcsIHJlcXVlc3RVcmk6IHN0cmluZywgYm9keTogc3RyaW5nIHwgbnVsbCwgaGVhZGVyc0pzb246IHN0cmluZyB8IG51bGwsIGZldGNoQXJnczogUmVxdWVzdEluaXQgfCBudWxsKSA9PiB7XHJcbiAgc2VuZEFzeW5jKGlkLCBtZXRob2QsIHJlcXVlc3RVcmksIGJvZHksIGhlYWRlcnNKc29uLCBmZXRjaEFyZ3MpO1xyXG59KTtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHNlbmRBc3luYyhpZDogbnVtYmVyLCBtZXRob2Q6IHN0cmluZywgcmVxdWVzdFVyaTogc3RyaW5nLCBib2R5OiBzdHJpbmcgfCBudWxsLCBoZWFkZXJzSnNvbjogc3RyaW5nIHwgbnVsbCwgZmV0Y2hBcmdzOiBSZXF1ZXN0SW5pdCB8IG51bGwpIHtcclxuICBsZXQgcmVzcG9uc2U6IFJlc3BvbnNlO1xyXG4gIGxldCByZXNwb25zZVRleHQ6IHN0cmluZztcclxuXHJcbiAgY29uc3QgcmVxdWVzdEluaXQ6IFJlcXVlc3RJbml0ID0gZmV0Y2hBcmdzIHx8IHt9O1xyXG4gIHJlcXVlc3RJbml0Lm1ldGhvZCA9IG1ldGhvZDtcclxuICByZXF1ZXN0SW5pdC5ib2R5ID0gYm9keSB8fCB1bmRlZmluZWQ7XHJcblxyXG4gIHRyeSB7XHJcbiAgICByZXF1ZXN0SW5pdC5oZWFkZXJzID0gaGVhZGVyc0pzb24gPyAoSlNPTi5wYXJzZShoZWFkZXJzSnNvbikgYXMgc3RyaW5nW11bXSkgOiB1bmRlZmluZWQ7XHJcblxyXG4gICAgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChyZXF1ZXN0VXJpLCByZXF1ZXN0SW5pdCk7XHJcbiAgICByZXNwb25zZVRleHQgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XHJcbiAgfSBjYXRjaCAoZXgpIHtcclxuICAgIGRpc3BhdGNoRXJyb3JSZXNwb25zZShpZCwgZXgudG9TdHJpbmcoKSk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBkaXNwYXRjaFN1Y2Nlc3NSZXNwb25zZShpZCwgcmVzcG9uc2UsIHJlc3BvbnNlVGV4dCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc3BhdGNoU3VjY2Vzc1Jlc3BvbnNlKGlkOiBudW1iZXIsIHJlc3BvbnNlOiBSZXNwb25zZSwgcmVzcG9uc2VUZXh0OiBzdHJpbmcpIHtcclxuICBjb25zdCByZXNwb25zZURlc2NyaXB0b3I6IFJlc3BvbnNlRGVzY3JpcHRvciA9IHtcclxuICAgIFN0YXR1c0NvZGU6IHJlc3BvbnNlLnN0YXR1cyxcclxuICAgIEhlYWRlcnM6IFtdXHJcbiAgfTtcclxuICByZXNwb25zZS5oZWFkZXJzLmZvckVhY2goKHZhbHVlLCBuYW1lKSA9PiB7XHJcbiAgICByZXNwb25zZURlc2NyaXB0b3IuSGVhZGVycy5wdXNoKFtuYW1lLCB2YWx1ZV0pO1xyXG4gIH0pO1xyXG5cclxuICBkaXNwYXRjaFJlc3BvbnNlKFxyXG4gICAgaWQsXHJcbiAgICBwbGF0Zm9ybS50b0RvdE5ldFN0cmluZyhKU09OLnN0cmluZ2lmeShyZXNwb25zZURlc2NyaXB0b3IpKSxcclxuICAgIHBsYXRmb3JtLnRvRG90TmV0U3RyaW5nKHJlc3BvbnNlVGV4dCksIC8vIFRPRE86IENvbnNpZGVyIGhvdyB0byBoYW5kbGUgbm9uLXN0cmluZyByZXNwb25zZXNcclxuICAgIC8qIGVycm9yTWVzc2FnZSAqLyBudWxsXHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGlzcGF0Y2hFcnJvclJlc3BvbnNlKGlkOiBudW1iZXIsIGVycm9yTWVzc2FnZTogc3RyaW5nKSB7XHJcbiAgZGlzcGF0Y2hSZXNwb25zZShcclxuICAgIGlkLFxyXG4gICAgLyogcmVzcG9uc2VEZXNjcmlwdG9yICovIG51bGwsXHJcbiAgICAvKiByZXNwb25zZVRleHQgKi8gbnVsbCxcclxuICAgIHBsYXRmb3JtLnRvRG90TmV0U3RyaW5nKGVycm9yTWVzc2FnZSlcclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwYXRjaFJlc3BvbnNlKGlkOiBudW1iZXIsIHJlc3BvbnNlRGVzY3JpcHRvcjogU3lzdGVtX1N0cmluZyB8IG51bGwsIHJlc3BvbnNlVGV4dDogU3lzdGVtX1N0cmluZyB8IG51bGwsIGVycm9yTWVzc2FnZTogU3lzdGVtX1N0cmluZyB8IG51bGwpIHtcclxuICBpZiAoIXJlY2VpdmVSZXNwb25zZU1ldGhvZCkge1xyXG4gICAgcmVjZWl2ZVJlc3BvbnNlTWV0aG9kID0gcGxhdGZvcm0uZmluZE1ldGhvZChcclxuICAgICAgaHR0cENsaWVudEFzc2VtYmx5LFxyXG4gICAgICBodHRwQ2xpZW50TmFtZXNwYWNlLFxyXG4gICAgICBodHRwQ2xpZW50VHlwZU5hbWUsXHJcbiAgICAgICdSZWNlaXZlUmVzcG9uc2UnXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcGxhdGZvcm0uY2FsbE1ldGhvZChyZWNlaXZlUmVzcG9uc2VNZXRob2QsIG51bGwsIFtcclxuICAgIHBsYXRmb3JtLnRvRG90TmV0U3RyaW5nKGlkLnRvU3RyaW5nKCkpLFxyXG4gICAgcmVzcG9uc2VEZXNjcmlwdG9yLFxyXG4gICAgcmVzcG9uc2VUZXh0LFxyXG4gICAgZXJyb3JNZXNzYWdlLFxyXG4gIF0pO1xyXG59XHJcblxyXG4vLyBLZWVwIHRoaXMgaW4gc3luYyB3aXRoIHRoZSAuTkVUIGVxdWl2YWxlbnQgaW4gSHR0cENsaWVudC5jc1xyXG5pbnRlcmZhY2UgUmVzcG9uc2VEZXNjcmlwdG9yIHtcclxuICAvLyBXZSBkb24ndCBoYXZlIEJvZHlUZXh0IGluIGhlcmUgYmVjYXVzZSBpZiB3ZSBkaWQsIHRoZW4gaW4gdGhlIEpTT04tcmVzcG9uc2UgY2FzZSAod2hpY2hcclxuICAvLyBpcyB0aGUgbW9zdCBjb21tb24gY2FzZSksIHdlJ2QgYmUgZG91YmxlLWVuY29kaW5nIGl0LCBzaW5jZSB0aGUgZW50aXJlIFJlc3BvbnNlRGVzY3JpcHRvclxyXG4gIC8vIGFsc28gZ2V0cyBKU09OIGVuY29kZWQuIEl0IHdvdWxkIHdvcmsgYnV0IGlzIHR3aWNlIHRoZSBhbW91bnQgb2Ygc3RyaW5nIHByb2Nlc3NpbmcuXHJcbiAgU3RhdHVzQ29kZTogbnVtYmVyO1xyXG4gIEhlYWRlcnM6IHN0cmluZ1tdW107XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1NlcnZpY2VzL0h0dHAudHMiLCJpbXBvcnQgeyBwbGF0Zm9ybSB9IGZyb20gJy4vRW52aXJvbm1lbnQnXHJcbmltcG9ydCB7IHJlZ2lzdGVyRnVuY3Rpb24gfSBmcm9tICcuL0ludGVyb3AvUmVnaXN0ZXJlZEZ1bmN0aW9uJztcclxuaW1wb3J0IHsgbmF2aWdhdGVUbyB9IGZyb20gJy4vU2VydmljZXMvVXJpSGVscGVyJztcclxuXHJcbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xyXG4gIC8vIFdoZW4gdGhlIGxpYnJhcnkgaXMgbG9hZGVkIGluIGEgYnJvd3NlciB2aWEgYSA8c2NyaXB0PiBlbGVtZW50LCBtYWtlIHRoZVxyXG4gIC8vIGZvbGxvd2luZyBBUElzIGF2YWlsYWJsZSBpbiBnbG9iYWwgc2NvcGUgZm9yIGludm9jYXRpb24gZnJvbSBKU1xyXG4gIHdpbmRvd1snQmxhem9yJ10gPSB7XHJcbiAgICBwbGF0Zm9ybSxcclxuICAgIHJlZ2lzdGVyRnVuY3Rpb24sXHJcbiAgICBuYXZpZ2F0ZVRvLFxyXG4gIH07XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0dsb2JhbEV4cG9ydHMudHMiXSwic291cmNlUm9vdCI6IiJ9