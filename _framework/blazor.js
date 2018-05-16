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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MonoPlatform_1 = __webpack_require__(6);
exports.platform = MonoPlatform_1.monoPlatform;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var InternalRegisteredFunction_1 = __webpack_require__(7);
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
var Environment_1 = __webpack_require__(0);
var RenderBatch_1 = __webpack_require__(9);
var BrowserRenderer_1 = __webpack_require__(10);
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
/* 4 */
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
/* 5 */
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
__webpack_require__(3);
__webpack_require__(16);
__webpack_require__(4);
__webpack_require__(17);
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
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var InvokeWithJsonMarshalling_1 = __webpack_require__(8);
var Renderer_1 = __webpack_require__(3);
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Environment_1 = __webpack_require__(0);
var RegisteredFunction_1 = __webpack_require__(1);
function invokeWithJsonMarshalling(identifier) {
    var argsJson = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        argsJson[_i - 1] = arguments[_i];
    }
    var identifierJsString = Environment_1.platform.toJavaScriptString(identifier);
    var funcInstance = RegisteredFunction_1.getRegisteredFunction(identifierJsString);
    var args = argsJson.map(function (json) { return JSON.parse(Environment_1.platform.toJavaScriptString(json)); });
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


/***/ }),
/* 9 */
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var RenderTreeEdit_1 = __webpack_require__(11);
var RenderTreeFrame_1 = __webpack_require__(12);
var Environment_1 = __webpack_require__(0);
var EventDelegator_1 = __webpack_require__(13);
var LogicalElements_1 = __webpack_require__(15);
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
                        element.removeAttribute(attributeName);
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
        if (attributeName === 'value') {
            if (this.tryApplyValueProperty(toDomElement, RenderTreeFrame_1.renderTreeFrame.attributeValue(attributeFrame))) {
                return; // If this DOM element type has special 'value' handling, don't also write it as an attribute
            }
        }
        // Treat as a regular string-valued attribute
        toDomElement.setAttribute(attributeName, RenderTreeFrame_1.renderTreeFrame.attributeValue(attributeFrame));
    };
    BrowserRenderer.prototype.tryApplyValueProperty = function (element, value) {
        // Certain elements have built-in behaviour for their 'value' property
        switch (element.tagName) {
            case 'INPUT':
            case 'SELECT':
            case 'TEXTAREA':
                if (isCheckbox(element)) {
                    element.checked = value === '';
                }
                else {
                    element.value = value;
                    if (element.tagName === 'SELECT') {
                        // <select> is special, in that anything we write to .value will be lost if there
                        // isn't yet a matching <option>. To maintain the expected behavior no matter the
                        // element insertion/update order, preserve the desired value separately so
                        // we can recover it when inserting any matching <option>.
                        element[selectValuePropname] = value;
                    }
                }
                return true;
            case 'OPTION':
                element.setAttribute('value', value);
                // See above for why we have this special handling for <select>/<option>
                var parentElement = element.parentElement;
                if (parentElement && (selectValuePropname in parentElement) && parentElement[selectValuePropname] === value) {
                    this.tryApplyValueProperty(parentElement, value);
                    delete parentElement[selectValuePropname];
                }
                return true;
            default:
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
            var subtreeLength = RenderTreeFrame_1.renderTreeFrame.subtreeLength(frame);
            if (subtreeLength > 1) {
                index += subtreeLength - 1;
            }
        }
        return (childIndex - origChildIndex); // Total number of children inserted
    };
    return BrowserRenderer;
}());
exports.BrowserRenderer = BrowserRenderer;
function isCheckbox(element) {
    return element.tagName === 'INPUT' && element.getAttribute('type') === 'checkbox';
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
/* 11 */
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
/* 12 */
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
})(FrameType = exports.FrameType || (exports.FrameType = {}));


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EventForDotNet_1 = __webpack_require__(14);
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
            candidateElement = candidateElement.parentElement;
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
            document.addEventListener(eventName, this.globalListener);
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


/***/ }),
/* 14 */
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
            case 'click':
            case 'mousedown':
            case 'mouseup':
                return new EventForDotNet('mouse', { Type: event.type });
            case 'change': {
                var targetIsCheckbox = isCheckbox(element);
                var newValue = targetIsCheckbox ? !!element['checked'] : element['value'];
                return new EventForDotNet('change', { Type: event.type, Value: newValue });
            }
            case 'keypress':
                return new EventForDotNet('keyboard', { Type: event.type, Key: event.key });
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
/* 15 */
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
    var newPhysicalParent = getClosestDomElement(parent);
    if (childIndex < newSiblings.length) {
        newPhysicalParent.insertBefore(child, newSiblings[childIndex]);
        newSiblings.splice(childIndex, 0, childAsLogicalElement);
    }
    else {
        if (parent instanceof Comment) {
            var parentLogicalNextSibling = getLogicalNextSibling(parent);
            if (parentLogicalNextSibling) {
                newPhysicalParent.insertBefore(child, parentLogicalNextSibling);
            }
            else {
                newPhysicalParent.appendChild(child);
            }
        }
        else {
            newPhysicalParent.appendChild(child);
        }
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
function createSymbolOrFallback(fallback) {
    return typeof Symbol === 'function' ? Symbol() : fallback;
}
;


/***/ }),
/* 16 */
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Environment_1 = __webpack_require__(0);
var RegisteredFunction_1 = __webpack_require__(1);
var UriHelper_1 = __webpack_require__(4);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzdjYjk2Y2FmZGRiNWJlY2NiODQiLCJ3ZWJwYWNrOi8vLy4vc3JjL0Vudmlyb25tZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9JbnRlcm9wL1JlZ2lzdGVyZWRGdW5jdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUGxhdGZvcm0vRG90TmV0LnRzIiwid2VicGFjazovLy8uL3NyYy9SZW5kZXJpbmcvUmVuZGVyZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NlcnZpY2VzL1VyaUhlbHBlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvQm9vdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUGxhdGZvcm0vTW9uby9Nb25vUGxhdGZvcm0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0ludGVyb3AvSW50ZXJuYWxSZWdpc3RlcmVkRnVuY3Rpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0ludGVyb3AvSW52b2tlV2l0aEpzb25NYXJzaGFsbGluZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyaW5nL1JlbmRlckJhdGNoLnRzIiwid2VicGFjazovLy8uL3NyYy9SZW5kZXJpbmcvQnJvd3NlclJlbmRlcmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9SZW5kZXJpbmcvUmVuZGVyVHJlZUVkaXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlbmRlcmluZy9SZW5kZXJUcmVlRnJhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlbmRlcmluZy9FdmVudERlbGVnYXRvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyaW5nL0V2ZW50Rm9yRG90TmV0LnRzIiwid2VicGFjazovLy8uL3NyYy9SZW5kZXJpbmcvTG9naWNhbEVsZW1lbnRzLnRzIiwid2VicGFjazovLy8uL3NyYy9TZXJ2aWNlcy9IdHRwLnRzIiwid2VicGFjazovLy8uL3NyYy9HbG9iYWxFeHBvcnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtB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QUFnQixDQUNkLEVBQUU7SUFDRix3QkFBd0IsQ0FBQyxJQUFJO0lBQzdCLGtCQUFrQixDQUFDLElBQUksRUFDdkIsc0JBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQ3RDLENBQUM7QUFDSixDQUFDO0FBRUQsMEJBQTBCLEVBQVUsRUFBRSxrQkFBd0MsRUFBRSxZQUFrQyxFQUFFLFlBQWtDO0lBQ3BKLEVBQUUsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO1FBQzNCLHFCQUFxQixHQUFHLHNCQUFRLENBQUMsVUFBVSxDQUN6QyxrQkFBa0IsRUFDbEIsbUJBQW1CLEVBQ25CLGtCQUFrQixFQUNsQixpQkFBaUIsQ0FDbEIsQ0FBQztJQUNKLENBQUM7SUFFRCxzQkFBUSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLEVBQUU7UUFDL0Msc0JBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3RDLGtCQUFrQjtRQUNsQixZQUFZO1FBQ1osWUFBWTtLQUNiLENBQUMsQ0FBQztBQUNMLENBQUM7Ozs7Ozs7Ozs7QUM1RUQsMkNBQXdDO0FBQ3hDLGtEQUFnRTtBQUNoRSx5Q0FBa0Q7QUFFbEQsRUFBRSxDQUFDLENBQUMsT0FBTyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztJQUNsQywyRUFBMkU7SUFDM0Usa0VBQWtFO0lBQ2xFLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRztRQUNqQixRQUFRO1FBQ1IsZ0JBQWdCO1FBQ2hCLFVBQVU7S0FDWCxDQUFDO0FBQ0osQ0FBQyIsImZpbGUiOiJibGF6b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA1KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAzN2NiOTZjYWZkZGI1YmVjY2I4NCIsIi8vIEV4cG9zZSBhbiBleHBvcnQgY2FsbGVkICdwbGF0Zm9ybScgb2YgdGhlIGludGVyZmFjZSB0eXBlICdQbGF0Zm9ybScsXHJcbi8vIHNvIHRoYXQgY29uc3VtZXJzIGNhbiBiZSBhZ25vc3RpYyBhYm91dCB3aGljaCBpbXBsZW1lbnRhdGlvbiB0aGV5IHVzZS5cclxuLy8gQmFzaWMgYWx0ZXJuYXRpdmUgdG8gaGF2aW5nIGFuIGFjdHVhbCBESSBjb250YWluZXIuXHJcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnLi9QbGF0Zm9ybS9QbGF0Zm9ybSc7XHJcbmltcG9ydCB7IG1vbm9QbGF0Zm9ybSB9IGZyb20gJy4vUGxhdGZvcm0vTW9uby9Nb25vUGxhdGZvcm0nO1xyXG5leHBvcnQgY29uc3QgcGxhdGZvcm06IFBsYXRmb3JtID0gbW9ub1BsYXRmb3JtO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvRW52aXJvbm1lbnQudHMiLCJpbXBvcnQgeyBpbnRlcm5hbFJlZ2lzdGVyZWRGdW5jdGlvbnMgfSBmcm9tICcuL0ludGVybmFsUmVnaXN0ZXJlZEZ1bmN0aW9uJztcclxuXHJcbmNvbnN0IHJlZ2lzdGVyZWRGdW5jdGlvbnM6IHsgW2lkZW50aWZpZXI6IHN0cmluZ106IEZ1bmN0aW9uIHwgdW5kZWZpbmVkIH0gPSB7fTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckZ1bmN0aW9uKGlkZW50aWZpZXI6IHN0cmluZywgaW1wbGVtZW50YXRpb246IEZ1bmN0aW9uKSB7XHJcbiAgaWYgKGludGVybmFsUmVnaXN0ZXJlZEZ1bmN0aW9ucy5oYXNPd25Qcm9wZXJ0eShpZGVudGlmaWVyKSkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgZnVuY3Rpb24gaWRlbnRpZmllciAnJHtpZGVudGlmaWVyfScgaXMgcmVzZXJ2ZWQgYW5kIGNhbm5vdCBiZSByZWdpc3RlcmVkLmApO1xyXG4gIH1cclxuXHJcbiAgaWYgKHJlZ2lzdGVyZWRGdW5jdGlvbnMuaGFzT3duUHJvcGVydHkoaWRlbnRpZmllcikpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihgQSBmdW5jdGlvbiB3aXRoIHRoZSBpZGVudGlmaWVyICcke2lkZW50aWZpZXJ9JyBoYXMgYWxyZWFkeSBiZWVuIHJlZ2lzdGVyZWQuYCk7XHJcbiAgfVxyXG5cclxuICByZWdpc3RlcmVkRnVuY3Rpb25zW2lkZW50aWZpZXJdID0gaW1wbGVtZW50YXRpb247XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRSZWdpc3RlcmVkRnVuY3Rpb24oaWRlbnRpZmllcjogc3RyaW5nKTogRnVuY3Rpb24ge1xyXG4gIC8vIEJ5IHByaW9yaXRpc2luZyB0aGUgaW50ZXJuYWwgb25lcywgd2UgZW5zdXJlIHlvdSBjYW4ndCBvdmVycmlkZSB0aGVtXHJcbiAgY29uc3QgcmVzdWx0ID0gaW50ZXJuYWxSZWdpc3RlcmVkRnVuY3Rpb25zW2lkZW50aWZpZXJdIHx8IHJlZ2lzdGVyZWRGdW5jdGlvbnNbaWRlbnRpZmllcl07XHJcbiAgaWYgKHJlc3VsdCkge1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9IGVsc2Uge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZmluZCByZWdpc3RlcmVkIGZ1bmN0aW9uIHdpdGggbmFtZSAnJHtpZGVudGlmaWVyfScuYCk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9JbnRlcm9wL1JlZ2lzdGVyZWRGdW5jdGlvbi50cyIsImV4cG9ydCBmdW5jdGlvbiBnZXRBc3NlbWJseU5hbWVGcm9tVXJsKHVybDogc3RyaW5nKSB7XHJcbiAgY29uc3QgbGFzdFNlZ21lbnQgPSB1cmwuc3Vic3RyaW5nKHVybC5sYXN0SW5kZXhPZignLycpICsgMSk7XHJcbiAgY29uc3QgcXVlcnlTdHJpbmdTdGFydFBvcyA9IGxhc3RTZWdtZW50LmluZGV4T2YoJz8nKTtcclxuICBjb25zdCBmaWxlbmFtZSA9IHF1ZXJ5U3RyaW5nU3RhcnRQb3MgPCAwID8gbGFzdFNlZ21lbnQgOiBsYXN0U2VnbWVudC5zdWJzdHJpbmcoMCwgcXVlcnlTdHJpbmdTdGFydFBvcyk7XHJcbiAgcmV0dXJuIGZpbGVuYW1lLnJlcGxhY2UoL1xcLmRsbCQvLCAnJyk7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1BsYXRmb3JtL0RvdE5ldC50cyIsImltcG9ydCB7IFN5c3RlbV9PYmplY3QsIFN5c3RlbV9TdHJpbmcsIFN5c3RlbV9BcnJheSwgTWV0aG9kSGFuZGxlLCBQb2ludGVyIH0gZnJvbSAnLi4vUGxhdGZvcm0vUGxhdGZvcm0nO1xyXG5pbXBvcnQgeyBwbGF0Zm9ybSB9IGZyb20gJy4uL0Vudmlyb25tZW50JztcclxuaW1wb3J0IHsgcmVuZGVyQmF0Y2ggYXMgcmVuZGVyQmF0Y2hTdHJ1Y3QsIGFycmF5UmFuZ2UsIGFycmF5U2VnbWVudCwgcmVuZGVyVHJlZURpZmZTdHJ1Y3RMZW5ndGgsIHJlbmRlclRyZWVEaWZmLCBSZW5kZXJCYXRjaFBvaW50ZXIsIFJlbmRlclRyZWVEaWZmUG9pbnRlciB9IGZyb20gJy4vUmVuZGVyQmF0Y2gnO1xyXG5pbXBvcnQgeyBCcm93c2VyUmVuZGVyZXIgfSBmcm9tICcuL0Jyb3dzZXJSZW5kZXJlcic7XHJcblxyXG50eXBlIEJyb3dzZXJSZW5kZXJlclJlZ2lzdHJ5ID0geyBbYnJvd3NlclJlbmRlcmVySWQ6IG51bWJlcl06IEJyb3dzZXJSZW5kZXJlciB9O1xyXG5jb25zdCBicm93c2VyUmVuZGVyZXJzOiBCcm93c2VyUmVuZGVyZXJSZWdpc3RyeSA9IHt9O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGF0dGFjaFJvb3RDb21wb25lbnRUb0VsZW1lbnQoYnJvd3NlclJlbmRlcmVySWQ6IG51bWJlciwgZWxlbWVudFNlbGVjdG9yOiBTeXN0ZW1fU3RyaW5nLCBjb21wb25lbnRJZDogbnVtYmVyKSB7XHJcbiAgY29uc3QgZWxlbWVudFNlbGVjdG9ySnMgPSBwbGF0Zm9ybS50b0phdmFTY3JpcHRTdHJpbmcoZWxlbWVudFNlbGVjdG9yKTtcclxuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbGVtZW50U2VsZWN0b3JKcyk7XHJcbiAgaWYgKCFlbGVtZW50KSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBmaW5kIGFueSBlbGVtZW50IG1hdGNoaW5nIHNlbGVjdG9yICcke2VsZW1lbnRTZWxlY3RvckpzfScuYCk7XHJcbiAgfVxyXG5cclxuICBsZXQgYnJvd3NlclJlbmRlcmVyID0gYnJvd3NlclJlbmRlcmVyc1ticm93c2VyUmVuZGVyZXJJZF07XHJcbiAgaWYgKCFicm93c2VyUmVuZGVyZXIpIHtcclxuICAgIGJyb3dzZXJSZW5kZXJlciA9IGJyb3dzZXJSZW5kZXJlcnNbYnJvd3NlclJlbmRlcmVySWRdID0gbmV3IEJyb3dzZXJSZW5kZXJlcihicm93c2VyUmVuZGVyZXJJZCk7XHJcbiAgfVxyXG4gIGNsZWFyRWxlbWVudChlbGVtZW50KTtcclxuICBicm93c2VyUmVuZGVyZXIuYXR0YWNoUm9vdENvbXBvbmVudFRvRWxlbWVudChjb21wb25lbnRJZCwgZWxlbWVudCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJCYXRjaChicm93c2VyUmVuZGVyZXJJZDogbnVtYmVyLCBiYXRjaDogUmVuZGVyQmF0Y2hQb2ludGVyKSB7XHJcbiAgY29uc3QgYnJvd3NlclJlbmRlcmVyID0gYnJvd3NlclJlbmRlcmVyc1ticm93c2VyUmVuZGVyZXJJZF07XHJcbiAgaWYgKCFicm93c2VyUmVuZGVyZXIpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihgVGhlcmUgaXMgbm8gYnJvd3NlciByZW5kZXJlciB3aXRoIElEICR7YnJvd3NlclJlbmRlcmVySWR9LmApO1xyXG4gIH1cclxuICBcclxuICBjb25zdCB1cGRhdGVkQ29tcG9uZW50cyA9IHJlbmRlckJhdGNoU3RydWN0LnVwZGF0ZWRDb21wb25lbnRzKGJhdGNoKTtcclxuICBjb25zdCB1cGRhdGVkQ29tcG9uZW50c0xlbmd0aCA9IGFycmF5UmFuZ2UuY291bnQodXBkYXRlZENvbXBvbmVudHMpO1xyXG4gIGNvbnN0IHVwZGF0ZWRDb21wb25lbnRzQXJyYXkgPSBhcnJheVJhbmdlLmFycmF5KHVwZGF0ZWRDb21wb25lbnRzKTtcclxuICBjb25zdCByZWZlcmVuY2VGcmFtZXNTdHJ1Y3QgPSByZW5kZXJCYXRjaFN0cnVjdC5yZWZlcmVuY2VGcmFtZXMoYmF0Y2gpO1xyXG4gIGNvbnN0IHJlZmVyZW5jZUZyYW1lcyA9IGFycmF5UmFuZ2UuYXJyYXkocmVmZXJlbmNlRnJhbWVzU3RydWN0KTtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB1cGRhdGVkQ29tcG9uZW50c0xlbmd0aDsgaSsrKSB7XHJcbiAgICBjb25zdCBkaWZmID0gcGxhdGZvcm0uZ2V0QXJyYXlFbnRyeVB0cih1cGRhdGVkQ29tcG9uZW50c0FycmF5LCBpLCByZW5kZXJUcmVlRGlmZlN0cnVjdExlbmd0aCk7XHJcbiAgICBjb25zdCBjb21wb25lbnRJZCA9IHJlbmRlclRyZWVEaWZmLmNvbXBvbmVudElkKGRpZmYpO1xyXG5cclxuICAgIGNvbnN0IGVkaXRzQXJyYXlTZWdtZW50ID0gcmVuZGVyVHJlZURpZmYuZWRpdHMoZGlmZik7XHJcbiAgICBjb25zdCBlZGl0cyA9IGFycmF5U2VnbWVudC5hcnJheShlZGl0c0FycmF5U2VnbWVudCk7XHJcbiAgICBjb25zdCBlZGl0c09mZnNldCA9IGFycmF5U2VnbWVudC5vZmZzZXQoZWRpdHNBcnJheVNlZ21lbnQpO1xyXG4gICAgY29uc3QgZWRpdHNMZW5ndGggPSBhcnJheVNlZ21lbnQuY291bnQoZWRpdHNBcnJheVNlZ21lbnQpO1xyXG5cclxuICAgIGJyb3dzZXJSZW5kZXJlci51cGRhdGVDb21wb25lbnQoY29tcG9uZW50SWQsIGVkaXRzLCBlZGl0c09mZnNldCwgZWRpdHNMZW5ndGgsIHJlZmVyZW5jZUZyYW1lcyk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBkaXNwb3NlZENvbXBvbmVudElkcyA9IHJlbmRlckJhdGNoU3RydWN0LmRpc3Bvc2VkQ29tcG9uZW50SWRzKGJhdGNoKTtcclxuICBjb25zdCBkaXNwb3NlZENvbXBvbmVudElkc0xlbmd0aCA9IGFycmF5UmFuZ2UuY291bnQoZGlzcG9zZWRDb21wb25lbnRJZHMpO1xyXG4gIGNvbnN0IGRpc3Bvc2VkQ29tcG9uZW50SWRzQXJyYXkgPSBhcnJheVJhbmdlLmFycmF5KGRpc3Bvc2VkQ29tcG9uZW50SWRzKTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGRpc3Bvc2VkQ29tcG9uZW50SWRzTGVuZ3RoOyBpKyspIHtcclxuICAgIGNvbnN0IGNvbXBvbmVudElkUHRyID0gcGxhdGZvcm0uZ2V0QXJyYXlFbnRyeVB0cihkaXNwb3NlZENvbXBvbmVudElkc0FycmF5LCBpLCA0KTtcclxuICAgIGNvbnN0IGNvbXBvbmVudElkID0gcGxhdGZvcm0ucmVhZEludDMyRmllbGQoY29tcG9uZW50SWRQdHIpO1xyXG4gICAgYnJvd3NlclJlbmRlcmVyLmRpc3Bvc2VDb21wb25lbnQoY29tcG9uZW50SWQpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgZGlzcG9zZWRFdmVudEhhbmRsZXJJZHMgPSByZW5kZXJCYXRjaFN0cnVjdC5kaXNwb3NlZEV2ZW50SGFuZGxlcklkcyhiYXRjaCk7XHJcbiAgY29uc3QgZGlzcG9zZWRFdmVudEhhbmRsZXJJZHNMZW5ndGggPSBhcnJheVJhbmdlLmNvdW50KGRpc3Bvc2VkRXZlbnRIYW5kbGVySWRzKTtcclxuICBjb25zdCBkaXNwb3NlZEV2ZW50SGFuZGxlcklkc0FycmF5ID0gYXJyYXlSYW5nZS5hcnJheShkaXNwb3NlZEV2ZW50SGFuZGxlcklkcyk7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaXNwb3NlZEV2ZW50SGFuZGxlcklkc0xlbmd0aDsgaSsrKSB7XHJcbiAgICBjb25zdCBldmVudEhhbmRsZXJJZFB0ciA9IHBsYXRmb3JtLmdldEFycmF5RW50cnlQdHIoZGlzcG9zZWRFdmVudEhhbmRsZXJJZHNBcnJheSwgaSwgNCk7XHJcbiAgICBjb25zdCBldmVudEhhbmRsZXJJZCA9IHBsYXRmb3JtLnJlYWRJbnQzMkZpZWxkKGV2ZW50SGFuZGxlcklkUHRyKTtcclxuICAgIGJyb3dzZXJSZW5kZXJlci5kaXNwb3NlRXZlbnRIYW5kbGVyKGV2ZW50SGFuZGxlcklkKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFyRWxlbWVudChlbGVtZW50OiBFbGVtZW50KSB7XHJcbiAgbGV0IGNoaWxkTm9kZTogTm9kZSB8IG51bGw7XHJcbiAgd2hpbGUgKGNoaWxkTm9kZSA9IGVsZW1lbnQuZmlyc3RDaGlsZCkge1xyXG4gICAgZWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZE5vZGUpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvUmVuZGVyaW5nL1JlbmRlcmVyLnRzIiwiaW1wb3J0IHsgcmVnaXN0ZXJGdW5jdGlvbiB9IGZyb20gJy4uL0ludGVyb3AvUmVnaXN0ZXJlZEZ1bmN0aW9uJztcclxuaW1wb3J0IHsgcGxhdGZvcm0gfSBmcm9tICcuLi9FbnZpcm9ubWVudCc7XHJcbmltcG9ydCB7IE1ldGhvZEhhbmRsZSwgU3lzdGVtX1N0cmluZyB9IGZyb20gJy4uL1BsYXRmb3JtL1BsYXRmb3JtJztcclxuY29uc3QgcmVnaXN0ZXJlZEZ1bmN0aW9uUHJlZml4ID0gJ01pY3Jvc29mdC5Bc3BOZXRDb3JlLkJsYXpvci5Ccm93c2VyLlNlcnZpY2VzLkJyb3dzZXJVcmlIZWxwZXInO1xyXG5sZXQgbm90aWZ5TG9jYXRpb25DaGFuZ2VkTWV0aG9kOiBNZXRob2RIYW5kbGU7XHJcbmxldCBoYXNSZWdpc3RlcmVkRXZlbnRMaXN0ZW5lcnMgPSBmYWxzZTtcclxuXHJcbnJlZ2lzdGVyRnVuY3Rpb24oYCR7cmVnaXN0ZXJlZEZ1bmN0aW9uUHJlZml4fS5nZXRMb2NhdGlvbkhyZWZgLFxyXG4gICgpID0+IHBsYXRmb3JtLnRvRG90TmV0U3RyaW5nKGxvY2F0aW9uLmhyZWYpKTtcclxuXHJcbnJlZ2lzdGVyRnVuY3Rpb24oYCR7cmVnaXN0ZXJlZEZ1bmN0aW9uUHJlZml4fS5nZXRCYXNlVVJJYCxcclxuICAoKSA9PiBkb2N1bWVudC5iYXNlVVJJID8gcGxhdGZvcm0udG9Eb3ROZXRTdHJpbmcoZG9jdW1lbnQuYmFzZVVSSSkgOiBudWxsKTtcclxuXHJcbnJlZ2lzdGVyRnVuY3Rpb24oYCR7cmVnaXN0ZXJlZEZ1bmN0aW9uUHJlZml4fS5lbmFibGVOYXZpZ2F0aW9uSW50ZXJjZXB0aW9uYCwgKCkgPT4ge1xyXG4gIGlmIChoYXNSZWdpc3RlcmVkRXZlbnRMaXN0ZW5lcnMpIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgaGFzUmVnaXN0ZXJlZEV2ZW50TGlzdGVuZXJzID0gdHJ1ZTtcclxuXHJcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XHJcbiAgICAvLyBJbnRlcmNlcHQgY2xpY2tzIG9uIGFsbCA8YT4gZWxlbWVudHMgd2hlcmUgdGhlIGhyZWYgaXMgd2l0aGluIHRoZSA8YmFzZSBocmVmPiBVUkkgc3BhY2VcclxuICAgIGNvbnN0IGFuY2hvclRhcmdldCA9IGZpbmRDbG9zZXN0QW5jZXN0b3IoZXZlbnQudGFyZ2V0IGFzIEVsZW1lbnQgfCBudWxsLCAnQScpO1xyXG4gICAgaWYgKGFuY2hvclRhcmdldCkge1xyXG4gICAgICBjb25zdCBocmVmID0gYW5jaG9yVGFyZ2V0LmdldEF0dHJpYnV0ZSgnaHJlZicpO1xyXG4gICAgICBpZiAoaXNXaXRoaW5CYXNlVXJpU3BhY2UodG9BYnNvbHV0ZVVyaShocmVmKSkpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHBlcmZvcm1JbnRlcm5hbE5hdmlnYXRpb24oaHJlZik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgaGFuZGxlSW50ZXJuYWxOYXZpZ2F0aW9uKTtcclxufSk7XHJcblxyXG5yZWdpc3RlckZ1bmN0aW9uKGAke3JlZ2lzdGVyZWRGdW5jdGlvblByZWZpeH0ubmF2aWdhdGVUb2AsICh1cmlEb3ROZXRTdHJpbmc6IFN5c3RlbV9TdHJpbmcpID0+IHtcclxuICBuYXZpZ2F0ZVRvKHBsYXRmb3JtLnRvSmF2YVNjcmlwdFN0cmluZyh1cmlEb3ROZXRTdHJpbmcpKTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbmF2aWdhdGVUbyh1cmk6IHN0cmluZykge1xyXG4gIGlmIChpc1dpdGhpbkJhc2VVcmlTcGFjZSh0b0Fic29sdXRlVXJpKHVyaSkpKSB7XHJcbiAgICBwZXJmb3JtSW50ZXJuYWxOYXZpZ2F0aW9uKHVyaSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGxvY2F0aW9uLmhyZWYgPSB1cmk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBwZXJmb3JtSW50ZXJuYWxOYXZpZ2F0aW9uKGhyZWY6IHN0cmluZykge1xyXG4gIGhpc3RvcnkucHVzaFN0YXRlKG51bGwsIC8qIGlnbm9yZWQgdGl0bGUgKi8gJycsIGhyZWYpO1xyXG4gIGhhbmRsZUludGVybmFsTmF2aWdhdGlvbigpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVJbnRlcm5hbE5hdmlnYXRpb24oKSB7XHJcbiAgaWYgKCFub3RpZnlMb2NhdGlvbkNoYW5nZWRNZXRob2QpIHtcclxuICAgIG5vdGlmeUxvY2F0aW9uQ2hhbmdlZE1ldGhvZCA9IHBsYXRmb3JtLmZpbmRNZXRob2QoXHJcbiAgICAgICdNaWNyb3NvZnQuQXNwTmV0Q29yZS5CbGF6b3IuQnJvd3NlcicsXHJcbiAgICAgICdNaWNyb3NvZnQuQXNwTmV0Q29yZS5CbGF6b3IuQnJvd3Nlci5TZXJ2aWNlcycsXHJcbiAgICAgICdCcm93c2VyVXJpSGVscGVyJyxcclxuICAgICAgJ05vdGlmeUxvY2F0aW9uQ2hhbmdlZCdcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwbGF0Zm9ybS5jYWxsTWV0aG9kKG5vdGlmeUxvY2F0aW9uQ2hhbmdlZE1ldGhvZCwgbnVsbCwgW1xyXG4gICAgcGxhdGZvcm0udG9Eb3ROZXRTdHJpbmcobG9jYXRpb24uaHJlZilcclxuICBdKTtcclxufVxyXG5cclxubGV0IHRlc3RBbmNob3I6IEhUTUxBbmNob3JFbGVtZW50O1xyXG5mdW5jdGlvbiB0b0Fic29sdXRlVXJpKHJlbGF0aXZlVXJpOiBzdHJpbmcpIHtcclxuICB0ZXN0QW5jaG9yID0gdGVzdEFuY2hvciB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgdGVzdEFuY2hvci5ocmVmID0gcmVsYXRpdmVVcmk7XHJcbiAgcmV0dXJuIHRlc3RBbmNob3IuaHJlZjtcclxufVxyXG5cclxuZnVuY3Rpb24gZmluZENsb3Nlc3RBbmNlc3RvcihlbGVtZW50OiBFbGVtZW50IHwgbnVsbCwgdGFnTmFtZTogc3RyaW5nKSB7XHJcbiAgcmV0dXJuICFlbGVtZW50XHJcbiAgICA/IG51bGxcclxuICAgIDogZWxlbWVudC50YWdOYW1lID09PSB0YWdOYW1lXHJcbiAgICAgID8gZWxlbWVudFxyXG4gICAgICA6IGZpbmRDbG9zZXN0QW5jZXN0b3IoZWxlbWVudC5wYXJlbnRFbGVtZW50LCB0YWdOYW1lKVxyXG59XHJcblxyXG5mdW5jdGlvbiBpc1dpdGhpbkJhc2VVcmlTcGFjZShocmVmOiBzdHJpbmcpIHtcclxuICBjb25zdCBiYXNlVXJpUHJlZml4V2l0aFRyYWlsaW5nU2xhc2ggPSB0b0Jhc2VVcmlQcmVmaXhXaXRoVHJhaWxpbmdTbGFzaChkb2N1bWVudC5iYXNlVVJJISk7IC8vIFRPRE86IE1pZ2h0IGJhc2VVUkkgcmVhbGx5IGJlIG51bGw/XHJcbiAgcmV0dXJuIGhyZWYuc3RhcnRzV2l0aChiYXNlVXJpUHJlZml4V2l0aFRyYWlsaW5nU2xhc2gpO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0b0Jhc2VVcmlQcmVmaXhXaXRoVHJhaWxpbmdTbGFzaChiYXNlVXJpOiBzdHJpbmcpIHtcclxuICByZXR1cm4gYmFzZVVyaS5zdWJzdHIoMCwgYmFzZVVyaS5sYXN0SW5kZXhPZignLycpICsgMSk7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1NlcnZpY2VzL1VyaUhlbHBlci50cyIsImltcG9ydCB7IHBsYXRmb3JtIH0gZnJvbSAnLi9FbnZpcm9ubWVudCc7XHJcbmltcG9ydCB7IGdldEFzc2VtYmx5TmFtZUZyb21VcmwgfSBmcm9tICcuL1BsYXRmb3JtL0RvdE5ldCc7XHJcbmltcG9ydCAnLi9SZW5kZXJpbmcvUmVuZGVyZXInO1xyXG5pbXBvcnQgJy4vU2VydmljZXMvSHR0cCc7XHJcbmltcG9ydCAnLi9TZXJ2aWNlcy9VcmlIZWxwZXInO1xyXG5pbXBvcnQgJy4vR2xvYmFsRXhwb3J0cyc7XHJcblxyXG5hc3luYyBmdW5jdGlvbiBib290KCkge1xyXG4gIC8vIFJlYWQgc3RhcnR1cCBjb25maWcgZnJvbSB0aGUgPHNjcmlwdD4gZWxlbWVudCB0aGF0J3MgaW1wb3J0aW5nIHRoaXMgZmlsZVxyXG4gIGNvbnN0IGFsbFNjcmlwdEVsZW1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpO1xyXG4gIGNvbnN0IHRoaXNTY3JpcHRFbGVtID0gKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQgfHwgYWxsU2NyaXB0RWxlbXNbYWxsU2NyaXB0RWxlbXMubGVuZ3RoIC0gMV0pIGFzIEhUTUxTY3JpcHRFbGVtZW50O1xyXG4gIGNvbnN0IGlzTGlua2VyRW5hYmxlZCA9IHRoaXNTY3JpcHRFbGVtLmdldEF0dHJpYnV0ZSgnbGlua2VyLWVuYWJsZWQnKSA9PT0gJ3RydWUnO1xyXG4gIGNvbnN0IGVudHJ5UG9pbnREbGwgPSBnZXRSZXF1aXJlZEJvb3RTY3JpcHRBdHRyaWJ1dGUodGhpc1NjcmlwdEVsZW0sICdtYWluJyk7XHJcbiAgY29uc3QgZW50cnlQb2ludE1ldGhvZCA9IGdldFJlcXVpcmVkQm9vdFNjcmlwdEF0dHJpYnV0ZSh0aGlzU2NyaXB0RWxlbSwgJ2VudHJ5cG9pbnQnKTtcclxuICBjb25zdCBlbnRyeVBvaW50QXNzZW1ibHlOYW1lID0gZ2V0QXNzZW1ibHlOYW1lRnJvbVVybChlbnRyeVBvaW50RGxsKTtcclxuICBjb25zdCByZWZlcmVuY2VBc3NlbWJsaWVzQ29tbWFTZXBhcmF0ZWQgPSB0aGlzU2NyaXB0RWxlbS5nZXRBdHRyaWJ1dGUoJ3JlZmVyZW5jZXMnKSB8fCAnJztcclxuICBjb25zdCByZWZlcmVuY2VBc3NlbWJsaWVzID0gcmVmZXJlbmNlQXNzZW1ibGllc0NvbW1hU2VwYXJhdGVkXHJcbiAgICAuc3BsaXQoJywnKVxyXG4gICAgLm1hcChzID0+IHMudHJpbSgpKVxyXG4gICAgLmZpbHRlcihzID0+ICEhcyk7XHJcblxyXG4gIGlmICghaXNMaW5rZXJFbmFibGVkKSB7XHJcbiAgICBjb25zb2xlLmluZm8oJ0JsYXpvciBpcyBydW5uaW5nIGluIGRldiBtb2RlIHdpdGhvdXQgSUwgc3RyaXBwaW5nLiBUbyBtYWtlIHRoZSBidW5kbGUgc2l6ZSBzaWduaWZpY2FudGx5IHNtYWxsZXIsIHB1Ymxpc2ggdGhlIGFwcGxpY2F0aW9uIG9yIHNlZSBodHRwczovL2dvLm1pY3Jvc29mdC5jb20vZndsaW5rLz9saW5raWQ9ODcwNDE0Jyk7XHJcbiAgfVxyXG5cclxuICAvLyBEZXRlcm1pbmUgdGhlIFVSTHMgb2YgdGhlIGFzc2VtYmxpZXMgd2Ugd2FudCB0byBsb2FkXHJcbiAgY29uc3QgbG9hZEFzc2VtYmx5VXJscyA9IFtlbnRyeVBvaW50RGxsXVxyXG4gICAgLmNvbmNhdChyZWZlcmVuY2VBc3NlbWJsaWVzKVxyXG4gICAgLm1hcChmaWxlbmFtZSA9PiBgX2ZyYW1ld29yay9fYmluLyR7ZmlsZW5hbWV9YCk7XHJcblxyXG4gIHRyeSB7XHJcbiAgICBhd2FpdCBwbGF0Zm9ybS5zdGFydChsb2FkQXNzZW1ibHlVcmxzKTtcclxuICB9IGNhdGNoIChleCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gc3RhcnQgcGxhdGZvcm0uIFJlYXNvbjogJHtleH1gKTtcclxuICB9XHJcblxyXG4gIC8vIFN0YXJ0IHVwIHRoZSBhcHBsaWNhdGlvblxyXG4gIHBsYXRmb3JtLmNhbGxFbnRyeVBvaW50KGVudHJ5UG9pbnRBc3NlbWJseU5hbWUsIGVudHJ5UG9pbnRNZXRob2QsIFtdKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0UmVxdWlyZWRCb290U2NyaXB0QXR0cmlidXRlKGVsZW06IEhUTUxTY3JpcHRFbGVtZW50LCBhdHRyaWJ1dGVOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIGNvbnN0IHJlc3VsdCA9IGVsZW0uZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpO1xyXG4gIGlmICghcmVzdWx0KSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYE1pc3NpbmcgXCIke2F0dHJpYnV0ZU5hbWV9XCIgYXR0cmlidXRlIG9uIEJsYXpvciBzY3JpcHQgdGFnLmApO1xyXG4gIH1cclxuICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5ib290KCk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9Cb290LnRzIiwiaW1wb3J0IHsgTWV0aG9kSGFuZGxlLCBTeXN0ZW1fT2JqZWN0LCBTeXN0ZW1fU3RyaW5nLCBTeXN0ZW1fQXJyYXksIFBvaW50ZXIsIFBsYXRmb3JtIH0gZnJvbSAnLi4vUGxhdGZvcm0nO1xyXG5pbXBvcnQgeyBnZXRBc3NlbWJseU5hbWVGcm9tVXJsIH0gZnJvbSAnLi4vRG90TmV0JztcclxuaW1wb3J0IHsgZ2V0UmVnaXN0ZXJlZEZ1bmN0aW9uIH0gZnJvbSAnLi4vLi4vSW50ZXJvcC9SZWdpc3RlcmVkRnVuY3Rpb24nO1xyXG5cclxuY29uc3QgYXNzZW1ibHlIYW5kbGVDYWNoZTogeyBbYXNzZW1ibHlOYW1lOiBzdHJpbmddOiBudW1iZXIgfSA9IHt9O1xyXG5jb25zdCB0eXBlSGFuZGxlQ2FjaGU6IHsgW2Z1bGx5UXVhbGlmaWVkVHlwZU5hbWU6IHN0cmluZ106IG51bWJlciB9ID0ge307XHJcbmNvbnN0IG1ldGhvZEhhbmRsZUNhY2hlOiB7IFtmdWxseVF1YWxpZmllZE1ldGhvZE5hbWU6IHN0cmluZ106IE1ldGhvZEhhbmRsZSB9ID0ge307XHJcblxyXG5sZXQgYXNzZW1ibHlfbG9hZDogKGFzc2VtYmx5TmFtZTogc3RyaW5nKSA9PiBudW1iZXI7XHJcbmxldCBmaW5kX2NsYXNzOiAoYXNzZW1ibHlIYW5kbGU6IG51bWJlciwgbmFtZXNwYWNlOiBzdHJpbmcsIGNsYXNzTmFtZTogc3RyaW5nKSA9PiBudW1iZXI7XHJcbmxldCBmaW5kX21ldGhvZDogKHR5cGVIYW5kbGU6IG51bWJlciwgbWV0aG9kTmFtZTogc3RyaW5nLCB1bmtub3duQXJnOiBudW1iZXIpID0+IE1ldGhvZEhhbmRsZTtcclxubGV0IGludm9rZV9tZXRob2Q6IChtZXRob2Q6IE1ldGhvZEhhbmRsZSwgdGFyZ2V0OiBTeXN0ZW1fT2JqZWN0LCBhcmdzQXJyYXlQdHI6IG51bWJlciwgZXhjZXB0aW9uRmxhZ0ludFB0cjogbnVtYmVyKSA9PiBTeXN0ZW1fT2JqZWN0O1xyXG5sZXQgbW9ub19zdHJpbmdfZ2V0X3V0Zjg6IChtYW5hZ2VkU3RyaW5nOiBTeXN0ZW1fU3RyaW5nKSA9PiBNb25vLlV0ZjhQdHI7XHJcbmxldCBtb25vX3N0cmluZzogKGpzU3RyaW5nOiBzdHJpbmcpID0+IFN5c3RlbV9TdHJpbmc7XHJcblxyXG5leHBvcnQgY29uc3QgbW9ub1BsYXRmb3JtOiBQbGF0Zm9ybSA9IHtcclxuICBzdGFydDogZnVuY3Rpb24gc3RhcnQobG9hZEFzc2VtYmx5VXJsczogc3RyaW5nW10pIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIC8vIG1vbm8uanMgYXNzdW1lcyB0aGUgZXhpc3RlbmNlIG9mIHRoaXNcclxuICAgICAgd2luZG93WydCcm93c2VyJ10gPSB7XHJcbiAgICAgICAgaW5pdDogKCkgPT4geyB9LFxyXG4gICAgICAgIGFzeW5jTG9hZDogYXN5bmNMb2FkXHJcbiAgICAgIH07XHJcbiAgICAgIC8vIEVtc2NyaXB0ZW4gd29ya3MgYnkgZXhwZWN0aW5nIHRoZSBtb2R1bGUgY29uZmlnIHRvIGJlIGEgZ2xvYmFsXHJcbiAgICAgIHdpbmRvd1snTW9kdWxlJ10gPSBjcmVhdGVFbXNjcmlwdGVuTW9kdWxlSW5zdGFuY2UobG9hZEFzc2VtYmx5VXJscywgcmVzb2x2ZSwgcmVqZWN0KTtcclxuXHJcbiAgICAgIGFkZFNjcmlwdFRhZ3NUb0RvY3VtZW50KCk7XHJcbiAgICB9KTtcclxuICB9LFxyXG5cclxuICBmaW5kTWV0aG9kOiBmaW5kTWV0aG9kLFxyXG5cclxuICBjYWxsRW50cnlQb2ludDogZnVuY3Rpb24gY2FsbEVudHJ5UG9pbnQoYXNzZW1ibHlOYW1lOiBzdHJpbmcsIGVudHJ5cG9pbnRNZXRob2Q6IHN0cmluZywgYXJnczogU3lzdGVtX09iamVjdFtdKTogdm9pZCB7XHJcbiAgICAvLyBQYXJzZSB0aGUgZW50cnlwb2ludE1ldGhvZCwgd2hpY2ggaXMgb2YgdGhlIGZvcm0gTXlBcHAuTXlOYW1lc3BhY2UuTXlUeXBlTmFtZTo6TXlNZXRob2ROYW1lXHJcbiAgICAvLyBOb3RlIHRoYXQgd2UgZG9uJ3Qgc3VwcG9ydCBzcGVjaWZ5aW5nIGEgbWV0aG9kIG92ZXJsb2FkLCBzbyBpdCBoYXMgdG8gYmUgdW5pcXVlXHJcbiAgICBjb25zdCBlbnRyeXBvaW50U2VnbWVudHMgPSBlbnRyeXBvaW50TWV0aG9kLnNwbGl0KCc6OicpO1xyXG4gICAgaWYgKGVudHJ5cG9pbnRTZWdtZW50cy5sZW5ndGggIT0gMikge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hbGZvcm1lZCBlbnRyeSBwb2ludCBtZXRob2QgbmFtZTsgY291bGQgbm90IHJlc29sdmUgY2xhc3MgbmFtZSBhbmQgbWV0aG9kIG5hbWUuJyk7XHJcbiAgICB9XHJcbiAgICBjb25zdCB0eXBlRnVsbE5hbWUgPSBlbnRyeXBvaW50U2VnbWVudHNbMF07XHJcbiAgICBjb25zdCBtZXRob2ROYW1lID0gZW50cnlwb2ludFNlZ21lbnRzWzFdO1xyXG4gICAgY29uc3QgbGFzdERvdCA9IHR5cGVGdWxsTmFtZS5sYXN0SW5kZXhPZignLicpO1xyXG4gICAgY29uc3QgbmFtZXNwYWNlID0gbGFzdERvdCA+IC0xID8gdHlwZUZ1bGxOYW1lLnN1YnN0cmluZygwLCBsYXN0RG90KSA6ICcnO1xyXG4gICAgY29uc3QgdHlwZVNob3J0TmFtZSA9IGxhc3REb3QgPiAtMSA/IHR5cGVGdWxsTmFtZS5zdWJzdHJpbmcobGFzdERvdCArIDEpIDogdHlwZUZ1bGxOYW1lO1xyXG5cclxuICAgIGNvbnN0IGVudHJ5UG9pbnRNZXRob2RIYW5kbGUgPSBtb25vUGxhdGZvcm0uZmluZE1ldGhvZChhc3NlbWJseU5hbWUsIG5hbWVzcGFjZSwgdHlwZVNob3J0TmFtZSwgbWV0aG9kTmFtZSk7XHJcbiAgICBtb25vUGxhdGZvcm0uY2FsbE1ldGhvZChlbnRyeVBvaW50TWV0aG9kSGFuZGxlLCBudWxsLCBhcmdzKTtcclxuICB9LFxyXG5cclxuICBjYWxsTWV0aG9kOiBmdW5jdGlvbiBjYWxsTWV0aG9kKG1ldGhvZDogTWV0aG9kSGFuZGxlLCB0YXJnZXQ6IFN5c3RlbV9PYmplY3QsIGFyZ3M6IFN5c3RlbV9PYmplY3RbXSk6IFN5c3RlbV9PYmplY3Qge1xyXG4gICAgaWYgKGFyZ3MubGVuZ3RoID4gNCkge1xyXG4gICAgICAvLyBIb3BlZnVsbHkgdGhpcyByZXN0cmljdGlvbiBjYW4gYmUgZWFzZWQgc29vbiwgYnV0IGZvciBub3cgbWFrZSBpdCBjbGVhciB3aGF0J3MgZ29pbmcgb25cclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDdXJyZW50bHksIE1vbm9QbGF0Zm9ybSBzdXBwb3J0cyBwYXNzaW5nIGEgbWF4aW11bSBvZiA0IGFyZ3VtZW50cyBmcm9tIEpTIHRvIC5ORVQuIFlvdSB0cmllZCB0byBwYXNzICR7YXJncy5sZW5ndGh9LmApO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHN0YWNrID0gTW9kdWxlLnN0YWNrU2F2ZSgpO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGFyZ3NCdWZmZXIgPSBNb2R1bGUuc3RhY2tBbGxvYyhhcmdzLmxlbmd0aCk7XHJcbiAgICAgIGNvbnN0IGV4Y2VwdGlvbkZsYWdNYW5hZ2VkSW50ID0gTW9kdWxlLnN0YWNrQWxsb2MoNCk7XHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIE1vZHVsZS5zZXRWYWx1ZShhcmdzQnVmZmVyICsgaSAqIDQsIGFyZ3NbaV0sICdpMzInKTtcclxuICAgICAgfVxyXG4gICAgICBNb2R1bGUuc2V0VmFsdWUoZXhjZXB0aW9uRmxhZ01hbmFnZWRJbnQsIDAsICdpMzInKTtcclxuXHJcbiAgICAgIGNvbnN0IHJlcyA9IGludm9rZV9tZXRob2QobWV0aG9kLCB0YXJnZXQsIGFyZ3NCdWZmZXIsIGV4Y2VwdGlvbkZsYWdNYW5hZ2VkSW50KTtcclxuXHJcbiAgICAgIGlmIChNb2R1bGUuZ2V0VmFsdWUoZXhjZXB0aW9uRmxhZ01hbmFnZWRJbnQsICdpMzInKSAhPT0gMCkge1xyXG4gICAgICAgIC8vIElmIHRoZSBleGNlcHRpb24gZmxhZyBpcyBzZXQsIHRoZSByZXR1cm5lZCB2YWx1ZSBpcyBleGNlcHRpb24uVG9TdHJpbmcoKVxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtb25vUGxhdGZvcm0udG9KYXZhU2NyaXB0U3RyaW5nKDxTeXN0ZW1fU3RyaW5nPnJlcykpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gcmVzO1xyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgTW9kdWxlLnN0YWNrUmVzdG9yZShzdGFjayk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgdG9KYXZhU2NyaXB0U3RyaW5nOiBmdW5jdGlvbiB0b0phdmFTY3JpcHRTdHJpbmcobWFuYWdlZFN0cmluZzogU3lzdGVtX1N0cmluZykge1xyXG4gICAgLy8gQ29tbWVudHMgZnJvbSBvcmlnaW5hbCBNb25vIHNhbXBsZTpcclxuICAgIC8vRklYTUUgdGhpcyBpcyB3YXN0ZWZ1bGwsIHdlIGNvdWxkIHJlbW92ZSB0aGUgdGVtcCBtYWxsb2MgYnkgZ29pbmcgdGhlIFVURjE2IHJvdXRlXHJcbiAgICAvL0ZJWE1FIHRoaXMgaXMgdW5zYWZlLCBjdXogcmF3IG9iamVjdHMgY291bGQgYmUgR0MnZC5cclxuXHJcbiAgICBjb25zdCB1dGY4ID0gbW9ub19zdHJpbmdfZ2V0X3V0ZjgobWFuYWdlZFN0cmluZyk7XHJcbiAgICBjb25zdCByZXMgPSBNb2R1bGUuVVRGOFRvU3RyaW5nKHV0ZjgpO1xyXG4gICAgTW9kdWxlLl9mcmVlKHV0ZjggYXMgYW55KTtcclxuICAgIHJldHVybiByZXM7XHJcbiAgfSxcclxuXHJcbiAgdG9Eb3ROZXRTdHJpbmc6IGZ1bmN0aW9uIHRvRG90TmV0U3RyaW5nKGpzU3RyaW5nOiBzdHJpbmcpOiBTeXN0ZW1fU3RyaW5nIHtcclxuICAgIHJldHVybiBtb25vX3N0cmluZyhqc1N0cmluZyk7XHJcbiAgfSxcclxuXHJcbiAgZ2V0QXJyYXlMZW5ndGg6IGZ1bmN0aW9uIGdldEFycmF5TGVuZ3RoKGFycmF5OiBTeXN0ZW1fQXJyYXk8YW55Pik6IG51bWJlciB7XHJcbiAgICByZXR1cm4gTW9kdWxlLmdldFZhbHVlKGdldEFycmF5RGF0YVBvaW50ZXIoYXJyYXkpLCAnaTMyJyk7XHJcbiAgfSxcclxuXHJcbiAgZ2V0QXJyYXlFbnRyeVB0cjogZnVuY3Rpb24gZ2V0QXJyYXlFbnRyeVB0cjxUUHRyIGV4dGVuZHMgUG9pbnRlcj4oYXJyYXk6IFN5c3RlbV9BcnJheTxUUHRyPiwgaW5kZXg6IG51bWJlciwgaXRlbVNpemU6IG51bWJlcik6IFRQdHIge1xyXG4gICAgLy8gRmlyc3QgYnl0ZSBpcyBhcnJheSBsZW5ndGgsIGZvbGxvd2VkIGJ5IGVudHJpZXNcclxuICAgIGNvbnN0IGFkZHJlc3MgPSBnZXRBcnJheURhdGFQb2ludGVyKGFycmF5KSArIDQgKyBpbmRleCAqIGl0ZW1TaXplO1xyXG4gICAgcmV0dXJuIGFkZHJlc3MgYXMgYW55IGFzIFRQdHI7XHJcbiAgfSxcclxuXHJcbiAgZ2V0T2JqZWN0RmllbGRzQmFzZUFkZHJlc3M6IGZ1bmN0aW9uIGdldE9iamVjdEZpZWxkc0Jhc2VBZGRyZXNzKHJlZmVyZW5jZVR5cGVkT2JqZWN0OiBTeXN0ZW1fT2JqZWN0KTogUG9pbnRlciB7XHJcbiAgICAvLyBUaGUgZmlyc3QgdHdvIGludDMyIHZhbHVlcyBhcmUgaW50ZXJuYWwgTW9ubyBkYXRhXHJcbiAgICByZXR1cm4gKHJlZmVyZW5jZVR5cGVkT2JqZWN0IGFzIGFueSBhcyBudW1iZXIgKyA4KSBhcyBhbnkgYXMgUG9pbnRlcjtcclxuICB9LFxyXG5cclxuICByZWFkSW50MzJGaWVsZDogZnVuY3Rpb24gcmVhZEhlYXBJbnQzMihiYXNlQWRkcmVzczogUG9pbnRlciwgZmllbGRPZmZzZXQ/OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIE1vZHVsZS5nZXRWYWx1ZSgoYmFzZUFkZHJlc3MgYXMgYW55IGFzIG51bWJlcikgKyAoZmllbGRPZmZzZXQgfHwgMCksICdpMzInKTtcclxuICB9LFxyXG5cclxuICByZWFkT2JqZWN0RmllbGQ6IGZ1bmN0aW9uIHJlYWRIZWFwT2JqZWN0PFQgZXh0ZW5kcyBTeXN0ZW1fT2JqZWN0PihiYXNlQWRkcmVzczogUG9pbnRlciwgZmllbGRPZmZzZXQ/OiBudW1iZXIpOiBUIHtcclxuICAgIHJldHVybiBNb2R1bGUuZ2V0VmFsdWUoKGJhc2VBZGRyZXNzIGFzIGFueSBhcyBudW1iZXIpICsgKGZpZWxkT2Zmc2V0IHx8IDApLCAnaTMyJykgYXMgYW55IGFzIFQ7XHJcbiAgfSxcclxuXHJcbiAgcmVhZFN0cmluZ0ZpZWxkOiBmdW5jdGlvbiByZWFkSGVhcE9iamVjdChiYXNlQWRkcmVzczogUG9pbnRlciwgZmllbGRPZmZzZXQ/OiBudW1iZXIpOiBzdHJpbmcgfCBudWxsIHtcclxuICAgIGNvbnN0IGZpZWxkVmFsdWUgPSBNb2R1bGUuZ2V0VmFsdWUoKGJhc2VBZGRyZXNzIGFzIGFueSBhcyBudW1iZXIpICsgKGZpZWxkT2Zmc2V0IHx8IDApLCAnaTMyJyk7XHJcbiAgICByZXR1cm4gZmllbGRWYWx1ZSA9PT0gMCA/IG51bGwgOiBtb25vUGxhdGZvcm0udG9KYXZhU2NyaXB0U3RyaW5nKGZpZWxkVmFsdWUgYXMgYW55IGFzIFN5c3RlbV9TdHJpbmcpO1xyXG4gIH0sXHJcblxyXG4gIHJlYWRTdHJ1Y3RGaWVsZDogZnVuY3Rpb24gcmVhZFN0cnVjdEZpZWxkPFQgZXh0ZW5kcyBQb2ludGVyPihiYXNlQWRkcmVzczogUG9pbnRlciwgZmllbGRPZmZzZXQ/OiBudW1iZXIpOiBUIHtcclxuICAgIHJldHVybiAoKGJhc2VBZGRyZXNzIGFzIGFueSBhcyBudW1iZXIpICsgKGZpZWxkT2Zmc2V0IHx8IDApKSBhcyBhbnkgYXMgVDtcclxuICB9LFxyXG59O1xyXG5cclxuLy8gQnlwYXNzIG5vcm1hbCB0eXBlIGNoZWNraW5nIHRvIGFkZCB0aGlzIGV4dHJhIGZ1bmN0aW9uLiBJdCdzIG9ubHkgaW50ZW5kZWQgdG8gYmUgY2FsbGVkIGZyb21cclxuLy8gdGhlIEpTIGNvZGUgaW4gTW9ubydzIGRyaXZlci5jLiBJdCdzIG5ldmVyIGludGVuZGVkIHRvIGJlIGNhbGxlZCBmcm9tIFR5cGVTY3JpcHQuXHJcbihtb25vUGxhdGZvcm0gYXMgYW55KS5tb25vR2V0UmVnaXN0ZXJlZEZ1bmN0aW9uID0gZ2V0UmVnaXN0ZXJlZEZ1bmN0aW9uO1xyXG5cclxuZnVuY3Rpb24gZmluZEFzc2VtYmx5KGFzc2VtYmx5TmFtZTogc3RyaW5nKTogbnVtYmVyIHtcclxuICBsZXQgYXNzZW1ibHlIYW5kbGUgPSBhc3NlbWJseUhhbmRsZUNhY2hlW2Fzc2VtYmx5TmFtZV07XHJcbiAgaWYgKCFhc3NlbWJseUhhbmRsZSkge1xyXG4gICAgYXNzZW1ibHlIYW5kbGUgPSBhc3NlbWJseV9sb2FkKGFzc2VtYmx5TmFtZSk7XHJcbiAgICBpZiAoIWFzc2VtYmx5SGFuZGxlKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZpbmQgYXNzZW1ibHkgXCIke2Fzc2VtYmx5TmFtZX1cImApO1xyXG4gICAgfVxyXG4gICAgYXNzZW1ibHlIYW5kbGVDYWNoZVthc3NlbWJseU5hbWVdID0gYXNzZW1ibHlIYW5kbGU7XHJcbiAgfVxyXG4gIHJldHVybiBhc3NlbWJseUhhbmRsZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZmluZFR5cGUoYXNzZW1ibHlOYW1lOiBzdHJpbmcsIG5hbWVzcGFjZTogc3RyaW5nLCBjbGFzc05hbWU6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgY29uc3QgZnVsbHlRdWFsaWZpZWRUeXBlTmFtZSA9IGBbJHthc3NlbWJseU5hbWV9XSR7bmFtZXNwYWNlfS4ke2NsYXNzTmFtZX1gO1xyXG4gIGxldCB0eXBlSGFuZGxlID0gdHlwZUhhbmRsZUNhY2hlW2Z1bGx5UXVhbGlmaWVkVHlwZU5hbWVdO1xyXG4gIGlmICghdHlwZUhhbmRsZSkge1xyXG4gICAgdHlwZUhhbmRsZSA9IGZpbmRfY2xhc3MoZmluZEFzc2VtYmx5KGFzc2VtYmx5TmFtZSksIG5hbWVzcGFjZSwgY2xhc3NOYW1lKTtcclxuICAgIGlmICghdHlwZUhhbmRsZSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBmaW5kIHR5cGUgXCIke2NsYXNzTmFtZX1cIiBpbiBuYW1lc3BhY2UgXCIke25hbWVzcGFjZX1cIiBpbiBhc3NlbWJseSBcIiR7YXNzZW1ibHlOYW1lfVwiYCk7XHJcbiAgICB9XHJcbiAgICB0eXBlSGFuZGxlQ2FjaGVbZnVsbHlRdWFsaWZpZWRUeXBlTmFtZV0gPSB0eXBlSGFuZGxlO1xyXG4gIH1cclxuICByZXR1cm4gdHlwZUhhbmRsZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZmluZE1ldGhvZChhc3NlbWJseU5hbWU6IHN0cmluZywgbmFtZXNwYWNlOiBzdHJpbmcsIGNsYXNzTmFtZTogc3RyaW5nLCBtZXRob2ROYW1lOiBzdHJpbmcpOiBNZXRob2RIYW5kbGUge1xyXG4gIGNvbnN0IGZ1bGx5UXVhbGlmaWVkTWV0aG9kTmFtZSA9IGBbJHthc3NlbWJseU5hbWV9XSR7bmFtZXNwYWNlfS4ke2NsYXNzTmFtZX06OiR7bWV0aG9kTmFtZX1gO1xyXG4gIGxldCBtZXRob2RIYW5kbGUgPSBtZXRob2RIYW5kbGVDYWNoZVtmdWxseVF1YWxpZmllZE1ldGhvZE5hbWVdO1xyXG4gIGlmICghbWV0aG9kSGFuZGxlKSB7XHJcbiAgICBtZXRob2RIYW5kbGUgPSBmaW5kX21ldGhvZChmaW5kVHlwZShhc3NlbWJseU5hbWUsIG5hbWVzcGFjZSwgY2xhc3NOYW1lKSwgbWV0aG9kTmFtZSwgLTEpO1xyXG4gICAgaWYgKCFtZXRob2RIYW5kbGUpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZmluZCBtZXRob2QgXCIke21ldGhvZE5hbWV9XCIgb24gdHlwZSBcIiR7bmFtZXNwYWNlfS4ke2NsYXNzTmFtZX1cImApO1xyXG4gICAgfVxyXG4gICAgbWV0aG9kSGFuZGxlQ2FjaGVbZnVsbHlRdWFsaWZpZWRNZXRob2ROYW1lXSA9IG1ldGhvZEhhbmRsZTtcclxuICB9XHJcbiAgcmV0dXJuIG1ldGhvZEhhbmRsZTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU2NyaXB0VGFnc1RvRG9jdW1lbnQoKSB7XHJcbiAgLy8gTG9hZCBlaXRoZXIgdGhlIHdhc20gb3IgYXNtLmpzIHZlcnNpb24gb2YgdGhlIE1vbm8gcnVudGltZVxyXG4gIGNvbnN0IGJyb3dzZXJTdXBwb3J0c05hdGl2ZVdlYkFzc2VtYmx5ID0gdHlwZW9mIFdlYkFzc2VtYmx5ICE9PSAndW5kZWZpbmVkJyAmJiBXZWJBc3NlbWJseS52YWxpZGF0ZTtcclxuICBjb25zdCBtb25vUnVudGltZVVybEJhc2UgPSAnX2ZyYW1ld29yay8nICsgKGJyb3dzZXJTdXBwb3J0c05hdGl2ZVdlYkFzc2VtYmx5ID8gJ3dhc20nIDogJ2FzbWpzJyk7XHJcbiAgY29uc3QgbW9ub1J1bnRpbWVTY3JpcHRVcmwgPSBgJHttb25vUnVudGltZVVybEJhc2V9L21vbm8uanNgO1xyXG5cclxuICBpZiAoIWJyb3dzZXJTdXBwb3J0c05hdGl2ZVdlYkFzc2VtYmx5KSB7XHJcbiAgICAvLyBJbiB0aGUgYXNtanMgY2FzZSwgdGhlIGluaXRpYWwgbWVtb3J5IHN0cnVjdHVyZSBpcyBpbiBhIHNlcGFyYXRlIGZpbGUgd2UgbmVlZCB0byBkb3dubG9hZFxyXG4gICAgY29uc3QgbWVtaW5pdFhIUiA9IE1vZHVsZVsnbWVtb3J5SW5pdGlhbGl6ZXJSZXF1ZXN0J10gPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgIG1lbWluaXRYSFIub3BlbignR0VUJywgYCR7bW9ub1J1bnRpbWVVcmxCYXNlfS9tb25vLmpzLm1lbWApO1xyXG4gICAgbWVtaW5pdFhIUi5yZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInO1xyXG4gICAgbWVtaW5pdFhIUi5zZW5kKG51bGwpO1xyXG4gIH1cclxuXHJcbiAgZG9jdW1lbnQud3JpdGUoYDxzY3JpcHQgZGVmZXIgc3JjPVwiJHttb25vUnVudGltZVNjcmlwdFVybH1cIj48L3NjcmlwdD5gKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlRW1zY3JpcHRlbk1vZHVsZUluc3RhbmNlKGxvYWRBc3NlbWJseVVybHM6IHN0cmluZ1tdLCBvblJlYWR5OiAoKSA9PiB2b2lkLCBvbkVycm9yOiAocmVhc29uPzogYW55KSA9PiB2b2lkKSB7XHJcbiAgY29uc3QgbW9kdWxlID0ge30gYXMgdHlwZW9mIE1vZHVsZTtcclxuICBjb25zdCB3YXNtQmluYXJ5RmlsZSA9ICdfZnJhbWV3b3JrL3dhc20vbW9uby53YXNtJztcclxuICBjb25zdCBhc21qc0NvZGVGaWxlID0gJ19mcmFtZXdvcmsvYXNtanMvbW9uby5hc20uanMnO1xyXG5cclxuICBtb2R1bGUucHJpbnQgPSBsaW5lID0+IGNvbnNvbGUubG9nKGBXQVNNOiAke2xpbmV9YCk7XHJcbiAgbW9kdWxlLnByaW50RXJyID0gbGluZSA9PiBjb25zb2xlLmVycm9yKGBXQVNNOiAke2xpbmV9YCk7XHJcbiAgbW9kdWxlLnByZVJ1biA9IFtdO1xyXG4gIG1vZHVsZS5wb3N0UnVuID0gW107XHJcbiAgbW9kdWxlLnByZWxvYWRQbHVnaW5zID0gW107XHJcblxyXG4gIG1vZHVsZS5sb2NhdGVGaWxlID0gZmlsZU5hbWUgPT4ge1xyXG4gICAgc3dpdGNoIChmaWxlTmFtZSkge1xyXG4gICAgICBjYXNlICdtb25vLndhc20nOiByZXR1cm4gd2FzbUJpbmFyeUZpbGU7XHJcbiAgICAgIGNhc2UgJ21vbm8uYXNtLmpzJzogcmV0dXJuIGFzbWpzQ29kZUZpbGU7XHJcbiAgICAgIGRlZmF1bHQ6IHJldHVybiBmaWxlTmFtZTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBtb2R1bGUucHJlUnVuLnB1c2goKCkgPT4ge1xyXG4gICAgLy8gQnkgbm93LCBlbXNjcmlwdGVuIHNob3VsZCBiZSBpbml0aWFsaXNlZCBlbm91Z2ggdGhhdCB3ZSBjYW4gY2FwdHVyZSB0aGVzZSBtZXRob2RzIGZvciBsYXRlciB1c2VcclxuICAgIGFzc2VtYmx5X2xvYWQgPSBNb2R1bGUuY3dyYXAoJ21vbm9fd2FzbV9hc3NlbWJseV9sb2FkJywgJ251bWJlcicsIFsnc3RyaW5nJ10pO1xyXG4gICAgZmluZF9jbGFzcyA9IE1vZHVsZS5jd3JhcCgnbW9ub193YXNtX2Fzc2VtYmx5X2ZpbmRfY2xhc3MnLCAnbnVtYmVyJywgWydudW1iZXInLCAnc3RyaW5nJywgJ3N0cmluZyddKTtcclxuICAgIGZpbmRfbWV0aG9kID0gTW9kdWxlLmN3cmFwKCdtb25vX3dhc21fYXNzZW1ibHlfZmluZF9tZXRob2QnLCAnbnVtYmVyJywgWydudW1iZXInLCAnc3RyaW5nJywgJ251bWJlciddKTtcclxuICAgIGludm9rZV9tZXRob2QgPSBNb2R1bGUuY3dyYXAoJ21vbm9fd2FzbV9pbnZva2VfbWV0aG9kJywgJ251bWJlcicsIFsnbnVtYmVyJywgJ251bWJlcicsICdudW1iZXInXSk7XHJcbiAgICBtb25vX3N0cmluZ19nZXRfdXRmOCA9IE1vZHVsZS5jd3JhcCgnbW9ub193YXNtX3N0cmluZ19nZXRfdXRmOCcsICdudW1iZXInLCBbJ251bWJlciddKTtcclxuICAgIG1vbm9fc3RyaW5nID0gTW9kdWxlLmN3cmFwKCdtb25vX3dhc21fc3RyaW5nX2Zyb21fanMnLCAnbnVtYmVyJywgWydzdHJpbmcnXSk7XHJcblxyXG4gICAgTW9kdWxlLkZTX2NyZWF0ZVBhdGgoJy8nLCAnYXBwQmluRGlyJywgdHJ1ZSwgdHJ1ZSk7XHJcbiAgICBsb2FkQXNzZW1ibHlVcmxzLmZvckVhY2godXJsID0+XHJcbiAgICAgIEZTLmNyZWF0ZVByZWxvYWRlZEZpbGUoJ2FwcEJpbkRpcicsIGAke2dldEFzc2VtYmx5TmFtZUZyb21VcmwodXJsKX0uZGxsYCwgdXJsLCB0cnVlLCBmYWxzZSwgdW5kZWZpbmVkLCBvbkVycm9yKSk7XHJcbiAgfSk7XHJcblxyXG4gIG1vZHVsZS5wb3N0UnVuLnB1c2goKCkgPT4ge1xyXG4gICAgY29uc3QgbG9hZF9ydW50aW1lID0gTW9kdWxlLmN3cmFwKCdtb25vX3dhc21fbG9hZF9ydW50aW1lJywgbnVsbCwgWydzdHJpbmcnXSk7XHJcbiAgICBsb2FkX3J1bnRpbWUoJ2FwcEJpbkRpcicpO1xyXG4gICAgb25SZWFkeSgpO1xyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gbW9kdWxlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhc3luY0xvYWQodXJsLCBvbmxvYWQsIG9uZXJyb3IpIHtcclxuICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0O1xyXG4gIHhoci5vcGVuKCdHRVQnLCB1cmwsIC8qIGFzeW5jOiAqLyB0cnVlKTtcclxuICB4aHIucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJztcclxuICB4aHIub25sb2FkID0gZnVuY3Rpb24geGhyX29ubG9hZCgpIHtcclxuICAgIGlmICh4aHIuc3RhdHVzID09IDIwMCB8fCB4aHIuc3RhdHVzID09IDAgJiYgeGhyLnJlc3BvbnNlKSB7XHJcbiAgICAgIHZhciBhc20gPSBuZXcgVWludDhBcnJheSh4aHIucmVzcG9uc2UpO1xyXG4gICAgICBvbmxvYWQoYXNtKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG9uZXJyb3IoeGhyKTtcclxuICAgIH1cclxuICB9O1xyXG4gIHhoci5vbmVycm9yID0gb25lcnJvcjtcclxuICB4aHIuc2VuZChudWxsKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0QXJyYXlEYXRhUG9pbnRlcjxUPihhcnJheTogU3lzdGVtX0FycmF5PFQ+KTogbnVtYmVyIHtcclxuICByZXR1cm4gPG51bWJlcj48YW55PmFycmF5ICsgMTI7IC8vIEZpcnN0IGJ5dGUgZnJvbSBoZXJlIGlzIGxlbmd0aCwgdGhlbiBmb2xsb3dpbmcgYnl0ZXMgYXJlIGVudHJpZXNcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvUGxhdGZvcm0vTW9uby9Nb25vUGxhdGZvcm0udHMiLCJpbXBvcnQgeyBpbnZva2VXaXRoSnNvbk1hcnNoYWxsaW5nIH0gZnJvbSAnLi9JbnZva2VXaXRoSnNvbk1hcnNoYWxsaW5nJztcclxuaW1wb3J0IHsgYXR0YWNoUm9vdENvbXBvbmVudFRvRWxlbWVudCwgcmVuZGVyQmF0Y2ggfSBmcm9tICcuLi9SZW5kZXJpbmcvUmVuZGVyZXInO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBkZWZpbml0aXZlIGxpc3Qgb2YgaW50ZXJuYWwgZnVuY3Rpb25zIGludm9rYWJsZSBmcm9tIC5ORVQgY29kZS5cclxuICogVGhlc2UgZnVuY3Rpb24gbmFtZXMgYXJlIHRyZWF0ZWQgYXMgJ3Jlc2VydmVkJyBhbmQgY2Fubm90IGJlIHBhc3NlZCB0byByZWdpc3RlckZ1bmN0aW9uLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGludGVybmFsUmVnaXN0ZXJlZEZ1bmN0aW9ucyA9IHtcclxuICBhdHRhY2hSb290Q29tcG9uZW50VG9FbGVtZW50LFxyXG4gIGludm9rZVdpdGhKc29uTWFyc2hhbGxpbmcsXHJcbiAgcmVuZGVyQmF0Y2gsXHJcbn07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9JbnRlcm9wL0ludGVybmFsUmVnaXN0ZXJlZEZ1bmN0aW9uLnRzIiwiaW1wb3J0IHsgcGxhdGZvcm0gfSBmcm9tICcuLi9FbnZpcm9ubWVudCc7XHJcbmltcG9ydCB7IFN5c3RlbV9TdHJpbmcgfSBmcm9tICcuLi9QbGF0Zm9ybS9QbGF0Zm9ybSc7XHJcbmltcG9ydCB7IGdldFJlZ2lzdGVyZWRGdW5jdGlvbiB9IGZyb20gJy4vUmVnaXN0ZXJlZEZ1bmN0aW9uJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbnZva2VXaXRoSnNvbk1hcnNoYWxsaW5nKGlkZW50aWZpZXI6IFN5c3RlbV9TdHJpbmcsIC4uLmFyZ3NKc29uOiBTeXN0ZW1fU3RyaW5nW10pIHtcclxuICBjb25zdCBpZGVudGlmaWVySnNTdHJpbmcgPSBwbGF0Zm9ybS50b0phdmFTY3JpcHRTdHJpbmcoaWRlbnRpZmllcik7XHJcbiAgY29uc3QgZnVuY0luc3RhbmNlID0gZ2V0UmVnaXN0ZXJlZEZ1bmN0aW9uKGlkZW50aWZpZXJKc1N0cmluZyk7XHJcbiAgY29uc3QgYXJncyA9IGFyZ3NKc29uLm1hcChqc29uID0+IEpTT04ucGFyc2UocGxhdGZvcm0udG9KYXZhU2NyaXB0U3RyaW5nKGpzb24pKSk7XHJcbiAgY29uc3QgcmVzdWx0ID0gZnVuY0luc3RhbmNlLmFwcGx5KG51bGwsIGFyZ3MpO1xyXG4gIGlmIChyZXN1bHQgIT09IG51bGwgJiYgcmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgIGNvbnN0IHJlc3VsdEpzb24gPSBKU09OLnN0cmluZ2lmeShyZXN1bHQpO1xyXG4gICAgcmV0dXJuIHBsYXRmb3JtLnRvRG90TmV0U3RyaW5nKHJlc3VsdEpzb24pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0ludGVyb3AvSW52b2tlV2l0aEpzb25NYXJzaGFsbGluZy50cyIsImltcG9ydCB7IFBvaW50ZXIsIFN5c3RlbV9BcnJheSB9IGZyb20gJy4uL1BsYXRmb3JtL1BsYXRmb3JtJztcclxuaW1wb3J0IHsgcGxhdGZvcm0gfSBmcm9tICcuLi9FbnZpcm9ubWVudCc7XHJcbmltcG9ydCB7IFJlbmRlclRyZWVGcmFtZVBvaW50ZXIgfSBmcm9tICcuL1JlbmRlclRyZWVGcmFtZSc7XHJcbmltcG9ydCB7IFJlbmRlclRyZWVFZGl0UG9pbnRlciB9IGZyb20gJy4vUmVuZGVyVHJlZUVkaXQnO1xyXG5cclxuLy8gS2VlcCBpbiBzeW5jIHdpdGggdGhlIHN0cnVjdHMgaW4gLk5FVCBjb2RlXHJcblxyXG5leHBvcnQgY29uc3QgcmVuZGVyQmF0Y2ggPSB7XHJcbiAgdXBkYXRlZENvbXBvbmVudHM6IChvYmo6IFJlbmRlckJhdGNoUG9pbnRlcikgPT4gcGxhdGZvcm0ucmVhZFN0cnVjdEZpZWxkPEFycmF5UmFuZ2VQb2ludGVyPFJlbmRlclRyZWVEaWZmUG9pbnRlcj4+KG9iaiwgMCksXHJcbiAgcmVmZXJlbmNlRnJhbWVzOiAob2JqOiBSZW5kZXJCYXRjaFBvaW50ZXIpID0+IHBsYXRmb3JtLnJlYWRTdHJ1Y3RGaWVsZDxBcnJheVJhbmdlUG9pbnRlcjxSZW5kZXJUcmVlRnJhbWVQb2ludGVyPj4ob2JqLCBhcnJheVJhbmdlU3RydWN0TGVuZ3RoKSxcclxuICBkaXNwb3NlZENvbXBvbmVudElkczogKG9iajogUmVuZGVyQmF0Y2hQb2ludGVyKSA9PiBwbGF0Zm9ybS5yZWFkU3RydWN0RmllbGQ8QXJyYXlSYW5nZVBvaW50ZXI8bnVtYmVyPj4ob2JqLCBhcnJheVJhbmdlU3RydWN0TGVuZ3RoICsgYXJyYXlSYW5nZVN0cnVjdExlbmd0aCksXHJcbiAgZGlzcG9zZWRFdmVudEhhbmRsZXJJZHM6IChvYmo6IFJlbmRlckJhdGNoUG9pbnRlcikgPT4gcGxhdGZvcm0ucmVhZFN0cnVjdEZpZWxkPEFycmF5UmFuZ2VQb2ludGVyPG51bWJlcj4+KG9iaiwgYXJyYXlSYW5nZVN0cnVjdExlbmd0aCArIGFycmF5UmFuZ2VTdHJ1Y3RMZW5ndGggKyBhcnJheVJhbmdlU3RydWN0TGVuZ3RoKSxcclxufTtcclxuXHJcbmNvbnN0IGFycmF5UmFuZ2VTdHJ1Y3RMZW5ndGggPSA4O1xyXG5leHBvcnQgY29uc3QgYXJyYXlSYW5nZSA9IHtcclxuICBhcnJheTogPFQ+KG9iajogQXJyYXlSYW5nZVBvaW50ZXI8VD4pID0+IHBsYXRmb3JtLnJlYWRPYmplY3RGaWVsZDxTeXN0ZW1fQXJyYXk8VD4+KG9iaiwgMCksXHJcbiAgY291bnQ6IDxUPihvYmo6IEFycmF5UmFuZ2VQb2ludGVyPFQ+KSA9PiBwbGF0Zm9ybS5yZWFkSW50MzJGaWVsZChvYmosIDQpLFxyXG59O1xyXG5cclxuY29uc3QgYXJyYXlTZWdtZW50U3RydWN0TGVuZ3RoID0gMTI7XHJcbmV4cG9ydCBjb25zdCBhcnJheVNlZ21lbnQgPSB7XHJcbiAgYXJyYXk6IDxUPihvYmo6IEFycmF5U2VnbWVudFBvaW50ZXI8VD4pID0+IHBsYXRmb3JtLnJlYWRPYmplY3RGaWVsZDxTeXN0ZW1fQXJyYXk8VD4+KG9iaiwgMCksXHJcbiAgb2Zmc2V0OiA8VD4ob2JqOiBBcnJheVNlZ21lbnRQb2ludGVyPFQ+KSA9PiBwbGF0Zm9ybS5yZWFkSW50MzJGaWVsZChvYmosIDQpLFxyXG4gIGNvdW50OiA8VD4ob2JqOiBBcnJheVNlZ21lbnRQb2ludGVyPFQ+KSA9PiBwbGF0Zm9ybS5yZWFkSW50MzJGaWVsZChvYmosIDgpLFxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlbmRlclRyZWVEaWZmU3RydWN0TGVuZ3RoID0gNCArIGFycmF5U2VnbWVudFN0cnVjdExlbmd0aDtcclxuZXhwb3J0IGNvbnN0IHJlbmRlclRyZWVEaWZmID0ge1xyXG4gIGNvbXBvbmVudElkOiAob2JqOiBSZW5kZXJUcmVlRGlmZlBvaW50ZXIpID0+IHBsYXRmb3JtLnJlYWRJbnQzMkZpZWxkKG9iaiwgMCksXHJcbiAgZWRpdHM6IChvYmo6IFJlbmRlclRyZWVEaWZmUG9pbnRlcikgPT4gcGxhdGZvcm0ucmVhZFN0cnVjdEZpZWxkPEFycmF5U2VnbWVudFBvaW50ZXI8UmVuZGVyVHJlZUVkaXRQb2ludGVyPj4ob2JqLCA0KSwgIFxyXG59O1xyXG5cclxuLy8gTm9taW5hbCB0eXBlcyB0byBlbnN1cmUgb25seSB2YWxpZCBwb2ludGVycyBhcmUgcGFzc2VkIHRvIHRoZSBmdW5jdGlvbnMgYWJvdmUuXHJcbi8vIEF0IHJ1bnRpbWUgdGhlIHZhbHVlcyBhcmUganVzdCBudW1iZXJzLlxyXG5leHBvcnQgaW50ZXJmYWNlIFJlbmRlckJhdGNoUG9pbnRlciBleHRlbmRzIFBvaW50ZXIgeyBSZW5kZXJCYXRjaFBvaW50ZXJfX0RPX05PVF9JTVBMRU1FTlQ6IGFueSB9XHJcbmV4cG9ydCBpbnRlcmZhY2UgQXJyYXlSYW5nZVBvaW50ZXI8VD4gZXh0ZW5kcyBQb2ludGVyIHsgQXJyYXlSYW5nZVBvaW50ZXJfX0RPX05PVF9JTVBMRU1FTlQ6IGFueSB9XHJcbmV4cG9ydCBpbnRlcmZhY2UgQXJyYXlTZWdtZW50UG9pbnRlcjxUPiBleHRlbmRzIFBvaW50ZXIgeyBBcnJheVNlZ21lbnRQb2ludGVyX19ET19OT1RfSU1QTEVNRU5UOiBhbnkgfVxyXG5leHBvcnQgaW50ZXJmYWNlIFJlbmRlclRyZWVEaWZmUG9pbnRlciBleHRlbmRzIFBvaW50ZXIgeyBSZW5kZXJUcmVlRGlmZlBvaW50ZXJfX0RPX05PVF9JTVBMRU1FTlQ6IGFueSB9XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9SZW5kZXJpbmcvUmVuZGVyQmF0Y2gudHMiLCJpbXBvcnQgeyBTeXN0ZW1fQXJyYXksIE1ldGhvZEhhbmRsZSB9IGZyb20gJy4uL1BsYXRmb3JtL1BsYXRmb3JtJztcclxuaW1wb3J0IHsgZ2V0UmVuZGVyVHJlZUVkaXRQdHIsIHJlbmRlclRyZWVFZGl0LCBSZW5kZXJUcmVlRWRpdFBvaW50ZXIsIEVkaXRUeXBlIH0gZnJvbSAnLi9SZW5kZXJUcmVlRWRpdCc7XHJcbmltcG9ydCB7IGdldFRyZWVGcmFtZVB0ciwgcmVuZGVyVHJlZUZyYW1lLCBGcmFtZVR5cGUsIFJlbmRlclRyZWVGcmFtZVBvaW50ZXIgfSBmcm9tICcuL1JlbmRlclRyZWVGcmFtZSc7XHJcbmltcG9ydCB7IHBsYXRmb3JtIH0gZnJvbSAnLi4vRW52aXJvbm1lbnQnO1xyXG5pbXBvcnQgeyBFdmVudERlbGVnYXRvciB9IGZyb20gJy4vRXZlbnREZWxlZ2F0b3InO1xyXG5pbXBvcnQgeyBFdmVudEZvckRvdE5ldCwgVUlFdmVudEFyZ3MgfSBmcm9tICcuL0V2ZW50Rm9yRG90TmV0JztcclxuaW1wb3J0IHsgTG9naWNhbEVsZW1lbnQsIHRvTG9naWNhbEVsZW1lbnQsIGluc2VydExvZ2ljYWxDaGlsZCwgcmVtb3ZlTG9naWNhbENoaWxkLCBnZXRMb2dpY2FsUGFyZW50LCBnZXRMb2dpY2FsQ2hpbGQsIGNyZWF0ZUFuZEluc2VydExvZ2ljYWxDb250YWluZXIsIGlzU3ZnRWxlbWVudCB9IGZyb20gJy4vTG9naWNhbEVsZW1lbnRzJztcclxuY29uc3Qgc2VsZWN0VmFsdWVQcm9wbmFtZSA9ICdfYmxhem9yU2VsZWN0VmFsdWUnO1xyXG5sZXQgcmFpc2VFdmVudE1ldGhvZDogTWV0aG9kSGFuZGxlO1xyXG5sZXQgcmVuZGVyQ29tcG9uZW50TWV0aG9kOiBNZXRob2RIYW5kbGU7XHJcblxyXG5leHBvcnQgY2xhc3MgQnJvd3NlclJlbmRlcmVyIHtcclxuICBwcml2YXRlIGV2ZW50RGVsZWdhdG9yOiBFdmVudERlbGVnYXRvcjtcclxuICBwcml2YXRlIGNoaWxkQ29tcG9uZW50TG9jYXRpb25zOiB7IFtjb21wb25lbnRJZDogbnVtYmVyXTogTG9naWNhbEVsZW1lbnQgfSA9IHt9O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJyb3dzZXJSZW5kZXJlcklkOiBudW1iZXIpIHtcclxuICAgIHRoaXMuZXZlbnREZWxlZ2F0b3IgPSBuZXcgRXZlbnREZWxlZ2F0b3IoKGV2ZW50LCBjb21wb25lbnRJZCwgZXZlbnRIYW5kbGVySWQsIGV2ZW50QXJncykgPT4ge1xyXG4gICAgICByYWlzZUV2ZW50KGV2ZW50LCB0aGlzLmJyb3dzZXJSZW5kZXJlcklkLCBjb21wb25lbnRJZCwgZXZlbnRIYW5kbGVySWQsIGV2ZW50QXJncyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhdHRhY2hSb290Q29tcG9uZW50VG9FbGVtZW50KGNvbXBvbmVudElkOiBudW1iZXIsIGVsZW1lbnQ6IEVsZW1lbnQpIHtcclxuICAgIHRoaXMuYXR0YWNoQ29tcG9uZW50VG9FbGVtZW50KGNvbXBvbmVudElkLCB0b0xvZ2ljYWxFbGVtZW50KGVsZW1lbnQpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB1cGRhdGVDb21wb25lbnQoY29tcG9uZW50SWQ6IG51bWJlciwgZWRpdHM6IFN5c3RlbV9BcnJheTxSZW5kZXJUcmVlRWRpdFBvaW50ZXI+LCBlZGl0c09mZnNldDogbnVtYmVyLCBlZGl0c0xlbmd0aDogbnVtYmVyLCByZWZlcmVuY2VGcmFtZXM6IFN5c3RlbV9BcnJheTxSZW5kZXJUcmVlRnJhbWVQb2ludGVyPikge1xyXG4gICAgY29uc3QgZWxlbWVudCA9IHRoaXMuY2hpbGRDb21wb25lbnRMb2NhdGlvbnNbY29tcG9uZW50SWRdO1xyXG4gICAgaWYgKCFlbGVtZW50KSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gZWxlbWVudCBpcyBjdXJyZW50bHkgYXNzb2NpYXRlZCB3aXRoIGNvbXBvbmVudCAke2NvbXBvbmVudElkfWApO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYXBwbHlFZGl0cyhjb21wb25lbnRJZCwgZWxlbWVudCwgMCwgZWRpdHMsIGVkaXRzT2Zmc2V0LCBlZGl0c0xlbmd0aCwgcmVmZXJlbmNlRnJhbWVzKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkaXNwb3NlQ29tcG9uZW50KGNvbXBvbmVudElkOiBudW1iZXIpIHtcclxuICAgIGRlbGV0ZSB0aGlzLmNoaWxkQ29tcG9uZW50TG9jYXRpb25zW2NvbXBvbmVudElkXTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkaXNwb3NlRXZlbnRIYW5kbGVyKGV2ZW50SGFuZGxlcklkOiBudW1iZXIpIHtcclxuICAgIHRoaXMuZXZlbnREZWxlZ2F0b3IucmVtb3ZlTGlzdGVuZXIoZXZlbnRIYW5kbGVySWQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhdHRhY2hDb21wb25lbnRUb0VsZW1lbnQoY29tcG9uZW50SWQ6IG51bWJlciwgZWxlbWVudDogTG9naWNhbEVsZW1lbnQpIHtcclxuICAgIHRoaXMuY2hpbGRDb21wb25lbnRMb2NhdGlvbnNbY29tcG9uZW50SWRdID0gZWxlbWVudDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXBwbHlFZGl0cyhjb21wb25lbnRJZDogbnVtYmVyLCBwYXJlbnQ6IExvZ2ljYWxFbGVtZW50LCBjaGlsZEluZGV4OiBudW1iZXIsIGVkaXRzOiBTeXN0ZW1fQXJyYXk8UmVuZGVyVHJlZUVkaXRQb2ludGVyPiwgZWRpdHNPZmZzZXQ6IG51bWJlciwgZWRpdHNMZW5ndGg6IG51bWJlciwgcmVmZXJlbmNlRnJhbWVzOiBTeXN0ZW1fQXJyYXk8UmVuZGVyVHJlZUZyYW1lUG9pbnRlcj4pIHtcclxuICAgIGxldCBjdXJyZW50RGVwdGggPSAwO1xyXG4gICAgbGV0IGNoaWxkSW5kZXhBdEN1cnJlbnREZXB0aCA9IGNoaWxkSW5kZXg7XHJcbiAgICBjb25zdCBtYXhFZGl0SW5kZXhFeGNsID0gZWRpdHNPZmZzZXQgKyBlZGl0c0xlbmd0aDtcclxuICAgIGZvciAobGV0IGVkaXRJbmRleCA9IGVkaXRzT2Zmc2V0OyBlZGl0SW5kZXggPCBtYXhFZGl0SW5kZXhFeGNsOyBlZGl0SW5kZXgrKykge1xyXG4gICAgICBjb25zdCBlZGl0ID0gZ2V0UmVuZGVyVHJlZUVkaXRQdHIoZWRpdHMsIGVkaXRJbmRleCk7XHJcbiAgICAgIGNvbnN0IGVkaXRUeXBlID0gcmVuZGVyVHJlZUVkaXQudHlwZShlZGl0KTtcclxuICAgICAgc3dpdGNoIChlZGl0VHlwZSkge1xyXG4gICAgICAgIGNhc2UgRWRpdFR5cGUucHJlcGVuZEZyYW1lOiB7XHJcbiAgICAgICAgICBjb25zdCBmcmFtZUluZGV4ID0gcmVuZGVyVHJlZUVkaXQubmV3VHJlZUluZGV4KGVkaXQpO1xyXG4gICAgICAgICAgY29uc3QgZnJhbWUgPSBnZXRUcmVlRnJhbWVQdHIocmVmZXJlbmNlRnJhbWVzLCBmcmFtZUluZGV4KTtcclxuICAgICAgICAgIGNvbnN0IHNpYmxpbmdJbmRleCA9IHJlbmRlclRyZWVFZGl0LnNpYmxpbmdJbmRleChlZGl0KTtcclxuICAgICAgICAgIHRoaXMuaW5zZXJ0RnJhbWUoY29tcG9uZW50SWQsIHBhcmVudCwgY2hpbGRJbmRleEF0Q3VycmVudERlcHRoICsgc2libGluZ0luZGV4LCByZWZlcmVuY2VGcmFtZXMsIGZyYW1lLCBmcmFtZUluZGV4KTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXNlIEVkaXRUeXBlLnJlbW92ZUZyYW1lOiB7XHJcbiAgICAgICAgICBjb25zdCBzaWJsaW5nSW5kZXggPSByZW5kZXJUcmVlRWRpdC5zaWJsaW5nSW5kZXgoZWRpdCk7XHJcbiAgICAgICAgICByZW1vdmVMb2dpY2FsQ2hpbGQocGFyZW50LCBjaGlsZEluZGV4QXRDdXJyZW50RGVwdGggKyBzaWJsaW5nSW5kZXgpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhc2UgRWRpdFR5cGUuc2V0QXR0cmlidXRlOiB7XHJcbiAgICAgICAgICBjb25zdCBmcmFtZUluZGV4ID0gcmVuZGVyVHJlZUVkaXQubmV3VHJlZUluZGV4KGVkaXQpO1xyXG4gICAgICAgICAgY29uc3QgZnJhbWUgPSBnZXRUcmVlRnJhbWVQdHIocmVmZXJlbmNlRnJhbWVzLCBmcmFtZUluZGV4KTtcclxuICAgICAgICAgIGNvbnN0IHNpYmxpbmdJbmRleCA9IHJlbmRlclRyZWVFZGl0LnNpYmxpbmdJbmRleChlZGl0KTtcclxuICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBnZXRMb2dpY2FsQ2hpbGQocGFyZW50LCBjaGlsZEluZGV4QXRDdXJyZW50RGVwdGggKyBzaWJsaW5nSW5kZXgpO1xyXG4gICAgICAgICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLmFwcGx5QXR0cmlidXRlKGNvbXBvbmVudElkLCBlbGVtZW50LCBmcmFtZSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBzZXQgYXR0cmlidXRlIG9uIG5vbi1lbGVtZW50IGNoaWxkYCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSBFZGl0VHlwZS5yZW1vdmVBdHRyaWJ1dGU6IHtcclxuICAgICAgICAgIC8vIE5vdGUgdGhhdCB3ZSBkb24ndCBoYXZlIHRvIGRpc3Bvc2UgdGhlIGluZm8gd2UgdHJhY2sgYWJvdXQgZXZlbnQgaGFuZGxlcnMgaGVyZSwgYmVjYXVzZSB0aGVcclxuICAgICAgICAgIC8vIGRpc3Bvc2VkIGV2ZW50IGhhbmRsZXIgSURzIGFyZSBkZWxpdmVyZWQgc2VwYXJhdGVseSAoaW4gdGhlICdkaXNwb3NlZEV2ZW50SGFuZGxlcklkcycgYXJyYXkpXHJcbiAgICAgICAgICBjb25zdCBzaWJsaW5nSW5kZXggPSByZW5kZXJUcmVlRWRpdC5zaWJsaW5nSW5kZXgoZWRpdCk7XHJcbiAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZ2V0TG9naWNhbENoaWxkKHBhcmVudCwgY2hpbGRJbmRleEF0Q3VycmVudERlcHRoICsgc2libGluZ0luZGV4KTtcclxuICAgICAgICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgY29uc3QgYXR0cmlidXRlTmFtZSA9IHJlbmRlclRyZWVFZGl0LnJlbW92ZWRBdHRyaWJ1dGVOYW1lKGVkaXQpITtcclxuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCByZW1vdmUgYXR0cmlidXRlIGZyb20gbm9uLWVsZW1lbnQgY2hpbGRgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXNlIEVkaXRUeXBlLnVwZGF0ZVRleHQ6IHtcclxuICAgICAgICAgIGNvbnN0IGZyYW1lSW5kZXggPSByZW5kZXJUcmVlRWRpdC5uZXdUcmVlSW5kZXgoZWRpdCk7XHJcbiAgICAgICAgICBjb25zdCBmcmFtZSA9IGdldFRyZWVGcmFtZVB0cihyZWZlcmVuY2VGcmFtZXMsIGZyYW1lSW5kZXgpO1xyXG4gICAgICAgICAgY29uc3Qgc2libGluZ0luZGV4ID0gcmVuZGVyVHJlZUVkaXQuc2libGluZ0luZGV4KGVkaXQpO1xyXG4gICAgICAgICAgY29uc3QgdGV4dE5vZGUgPSBnZXRMb2dpY2FsQ2hpbGQocGFyZW50LCBjaGlsZEluZGV4QXRDdXJyZW50RGVwdGggKyBzaWJsaW5nSW5kZXgpO1xyXG4gICAgICAgICAgaWYgKHRleHROb2RlIGluc3RhbmNlb2YgVGV4dCkge1xyXG4gICAgICAgICAgICB0ZXh0Tm9kZS50ZXh0Q29udGVudCA9IHJlbmRlclRyZWVGcmFtZS50ZXh0Q29udGVudChmcmFtZSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBzZXQgdGV4dCBjb250ZW50IG9uIG5vbi10ZXh0IGNoaWxkYCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSBFZGl0VHlwZS5zdGVwSW46IHtcclxuICAgICAgICAgIGNvbnN0IHNpYmxpbmdJbmRleCA9IHJlbmRlclRyZWVFZGl0LnNpYmxpbmdJbmRleChlZGl0KTtcclxuICAgICAgICAgIHBhcmVudCA9IGdldExvZ2ljYWxDaGlsZChwYXJlbnQsIGNoaWxkSW5kZXhBdEN1cnJlbnREZXB0aCArIHNpYmxpbmdJbmRleCk7XHJcbiAgICAgICAgICBjdXJyZW50RGVwdGgrKztcclxuICAgICAgICAgIGNoaWxkSW5kZXhBdEN1cnJlbnREZXB0aCA9IDA7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSBFZGl0VHlwZS5zdGVwT3V0OiB7XHJcbiAgICAgICAgICBwYXJlbnQgPSBnZXRMb2dpY2FsUGFyZW50KHBhcmVudCkhO1xyXG4gICAgICAgICAgY3VycmVudERlcHRoLS07XHJcbiAgICAgICAgICBjaGlsZEluZGV4QXRDdXJyZW50RGVwdGggPSBjdXJyZW50RGVwdGggPT09IDAgPyBjaGlsZEluZGV4IDogMDsgLy8gVGhlIGNoaWxkSW5kZXggaXMgb25seSBldmVyIG5vbnplcm8gYXQgemVybyBkZXB0aFxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICAgIGNvbnN0IHVua25vd25UeXBlOiBuZXZlciA9IGVkaXRUeXBlOyAvLyBDb21waWxlLXRpbWUgdmVyaWZpY2F0aW9uIHRoYXQgdGhlIHN3aXRjaCB3YXMgZXhoYXVzdGl2ZVxyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIGVkaXQgdHlwZTogJHt1bmtub3duVHlwZX1gKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5zZXJ0RnJhbWUoY29tcG9uZW50SWQ6IG51bWJlciwgcGFyZW50OiBMb2dpY2FsRWxlbWVudCwgY2hpbGRJbmRleDogbnVtYmVyLCBmcmFtZXM6IFN5c3RlbV9BcnJheTxSZW5kZXJUcmVlRnJhbWVQb2ludGVyPiwgZnJhbWU6IFJlbmRlclRyZWVGcmFtZVBvaW50ZXIsIGZyYW1lSW5kZXg6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICBjb25zdCBmcmFtZVR5cGUgPSByZW5kZXJUcmVlRnJhbWUuZnJhbWVUeXBlKGZyYW1lKTtcclxuICAgIHN3aXRjaCAoZnJhbWVUeXBlKSB7XHJcbiAgICAgIGNhc2UgRnJhbWVUeXBlLmVsZW1lbnQ6XHJcbiAgICAgICAgdGhpcy5pbnNlcnRFbGVtZW50KGNvbXBvbmVudElkLCBwYXJlbnQsIGNoaWxkSW5kZXgsIGZyYW1lcywgZnJhbWUsIGZyYW1lSW5kZXgpO1xyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgICBjYXNlIEZyYW1lVHlwZS50ZXh0OlxyXG4gICAgICAgIHRoaXMuaW5zZXJ0VGV4dChwYXJlbnQsIGNoaWxkSW5kZXgsIGZyYW1lKTtcclxuICAgICAgICByZXR1cm4gMTtcclxuICAgICAgY2FzZSBGcmFtZVR5cGUuYXR0cmlidXRlOlxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQXR0cmlidXRlIGZyYW1lcyBzaG91bGQgb25seSBiZSBwcmVzZW50IGFzIGxlYWRpbmcgY2hpbGRyZW4gb2YgZWxlbWVudCBmcmFtZXMuJyk7XHJcbiAgICAgIGNhc2UgRnJhbWVUeXBlLmNvbXBvbmVudDpcclxuICAgICAgICB0aGlzLmluc2VydENvbXBvbmVudChwYXJlbnQsIGNoaWxkSW5kZXgsIGZyYW1lKTtcclxuICAgICAgICByZXR1cm4gMTtcclxuICAgICAgY2FzZSBGcmFtZVR5cGUucmVnaW9uOlxyXG4gICAgICAgIHJldHVybiB0aGlzLmluc2VydEZyYW1lUmFuZ2UoY29tcG9uZW50SWQsIHBhcmVudCwgY2hpbGRJbmRleCwgZnJhbWVzLCBmcmFtZUluZGV4ICsgMSwgZnJhbWVJbmRleCArIHJlbmRlclRyZWVGcmFtZS5zdWJ0cmVlTGVuZ3RoKGZyYW1lKSk7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgY29uc3QgdW5rbm93blR5cGU6IG5ldmVyID0gZnJhbWVUeXBlOyAvLyBDb21waWxlLXRpbWUgdmVyaWZpY2F0aW9uIHRoYXQgdGhlIHN3aXRjaCB3YXMgZXhoYXVzdGl2ZVxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBmcmFtZSB0eXBlOiAke3Vua25vd25UeXBlfWApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbnNlcnRFbGVtZW50KGNvbXBvbmVudElkOiBudW1iZXIsIHBhcmVudDogTG9naWNhbEVsZW1lbnQsIGNoaWxkSW5kZXg6IG51bWJlciwgZnJhbWVzOiBTeXN0ZW1fQXJyYXk8UmVuZGVyVHJlZUZyYW1lUG9pbnRlcj4sIGZyYW1lOiBSZW5kZXJUcmVlRnJhbWVQb2ludGVyLCBmcmFtZUluZGV4OiBudW1iZXIpIHtcclxuICAgIGNvbnN0IHRhZ05hbWUgPSByZW5kZXJUcmVlRnJhbWUuZWxlbWVudE5hbWUoZnJhbWUpITtcclxuICAgIGNvbnN0IG5ld0RvbUVsZW1lbnRSYXcgPSB0YWdOYW1lID09PSAnc3ZnJyB8fCBpc1N2Z0VsZW1lbnQocGFyZW50KSA/XHJcbiAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCB0YWdOYW1lKSA6XHJcbiAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XHJcbiAgICBjb25zdCBuZXdFbGVtZW50ID0gdG9Mb2dpY2FsRWxlbWVudChuZXdEb21FbGVtZW50UmF3KTtcclxuICAgIGluc2VydExvZ2ljYWxDaGlsZChuZXdEb21FbGVtZW50UmF3LCBwYXJlbnQsIGNoaWxkSW5kZXgpO1xyXG5cclxuICAgIC8vIEFwcGx5IGF0dHJpYnV0ZXNcclxuICAgIGNvbnN0IGRlc2NlbmRhbnRzRW5kSW5kZXhFeGNsID0gZnJhbWVJbmRleCArIHJlbmRlclRyZWVGcmFtZS5zdWJ0cmVlTGVuZ3RoKGZyYW1lKTtcclxuICAgIGZvciAobGV0IGRlc2NlbmRhbnRJbmRleCA9IGZyYW1lSW5kZXggKyAxOyBkZXNjZW5kYW50SW5kZXggPCBkZXNjZW5kYW50c0VuZEluZGV4RXhjbDsgZGVzY2VuZGFudEluZGV4KyspIHtcclxuICAgICAgY29uc3QgZGVzY2VuZGFudEZyYW1lID0gZ2V0VHJlZUZyYW1lUHRyKGZyYW1lcywgZGVzY2VuZGFudEluZGV4KTtcclxuICAgICAgaWYgKHJlbmRlclRyZWVGcmFtZS5mcmFtZVR5cGUoZGVzY2VuZGFudEZyYW1lKSA9PT0gRnJhbWVUeXBlLmF0dHJpYnV0ZSkge1xyXG4gICAgICAgIHRoaXMuYXBwbHlBdHRyaWJ1dGUoY29tcG9uZW50SWQsIG5ld0RvbUVsZW1lbnRSYXcsIGRlc2NlbmRhbnRGcmFtZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gQXMgc29vbiBhcyB3ZSBzZWUgYSBub24tYXR0cmlidXRlIGNoaWxkLCBhbGwgdGhlIHN1YnNlcXVlbnQgY2hpbGQgZnJhbWVzIGFyZVxyXG4gICAgICAgIC8vIG5vdCBhdHRyaWJ1dGVzLCBzbyBiYWlsIG91dCBhbmQgaW5zZXJ0IHRoZSByZW1uYW50cyByZWN1cnNpdmVseVxyXG4gICAgICAgIHRoaXMuaW5zZXJ0RnJhbWVSYW5nZShjb21wb25lbnRJZCwgbmV3RWxlbWVudCwgMCwgZnJhbWVzLCBkZXNjZW5kYW50SW5kZXgsIGRlc2NlbmRhbnRzRW5kSW5kZXhFeGNsKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbnNlcnRDb21wb25lbnQocGFyZW50OiBMb2dpY2FsRWxlbWVudCwgY2hpbGRJbmRleDogbnVtYmVyLCBmcmFtZTogUmVuZGVyVHJlZUZyYW1lUG9pbnRlcikge1xyXG4gICAgY29uc3QgY29udGFpbmVyRWxlbWVudCA9IGNyZWF0ZUFuZEluc2VydExvZ2ljYWxDb250YWluZXIocGFyZW50LCBjaGlsZEluZGV4KTtcclxuXHJcbiAgICAvLyBBbGwgd2UgaGF2ZSB0byBkbyBpcyBhc3NvY2lhdGUgdGhlIGNoaWxkIGNvbXBvbmVudCBJRCB3aXRoIGl0cyBsb2NhdGlvbi4gV2UgZG9uJ3QgYWN0dWFsbHlcclxuICAgIC8vIGRvIGFueSByZW5kZXJpbmcgaGVyZSwgYmVjYXVzZSB0aGUgZGlmZiBmb3IgdGhlIGNoaWxkIHdpbGwgYXBwZWFyIGxhdGVyIGluIHRoZSByZW5kZXIgYmF0Y2guXHJcbiAgICBjb25zdCBjaGlsZENvbXBvbmVudElkID0gcmVuZGVyVHJlZUZyYW1lLmNvbXBvbmVudElkKGZyYW1lKTtcclxuICAgIHRoaXMuYXR0YWNoQ29tcG9uZW50VG9FbGVtZW50KGNoaWxkQ29tcG9uZW50SWQsIGNvbnRhaW5lckVsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbnNlcnRUZXh0KHBhcmVudDogTG9naWNhbEVsZW1lbnQsIGNoaWxkSW5kZXg6IG51bWJlciwgdGV4dEZyYW1lOiBSZW5kZXJUcmVlRnJhbWVQb2ludGVyKSB7XHJcbiAgICBjb25zdCB0ZXh0Q29udGVudCA9IHJlbmRlclRyZWVGcmFtZS50ZXh0Q29udGVudCh0ZXh0RnJhbWUpITtcclxuICAgIGNvbnN0IG5ld1RleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dENvbnRlbnQpO1xyXG4gICAgaW5zZXJ0TG9naWNhbENoaWxkKG5ld1RleHROb2RlLCBwYXJlbnQsIGNoaWxkSW5kZXgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhcHBseUF0dHJpYnV0ZShjb21wb25lbnRJZDogbnVtYmVyLCB0b0RvbUVsZW1lbnQ6IEVsZW1lbnQsIGF0dHJpYnV0ZUZyYW1lOiBSZW5kZXJUcmVlRnJhbWVQb2ludGVyKSB7XHJcbiAgICBjb25zdCBhdHRyaWJ1dGVOYW1lID0gcmVuZGVyVHJlZUZyYW1lLmF0dHJpYnV0ZU5hbWUoYXR0cmlidXRlRnJhbWUpITtcclxuICAgIGNvbnN0IGJyb3dzZXJSZW5kZXJlcklkID0gdGhpcy5icm93c2VyUmVuZGVyZXJJZDtcclxuICAgIGNvbnN0IGV2ZW50SGFuZGxlcklkID0gcmVuZGVyVHJlZUZyYW1lLmF0dHJpYnV0ZUV2ZW50SGFuZGxlcklkKGF0dHJpYnV0ZUZyYW1lKTtcclxuXHJcbiAgICBpZiAoZXZlbnRIYW5kbGVySWQpIHtcclxuICAgICAgY29uc3QgZmlyc3RUd29DaGFycyA9IGF0dHJpYnV0ZU5hbWUuc3Vic3RyaW5nKDAsIDIpO1xyXG4gICAgICBjb25zdCBldmVudE5hbWUgPSBhdHRyaWJ1dGVOYW1lLnN1YnN0cmluZygyKTtcclxuICAgICAgaWYgKGZpcnN0VHdvQ2hhcnMgIT09ICdvbicgfHwgIWV2ZW50TmFtZSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQXR0cmlidXRlIGhhcyBub256ZXJvIGV2ZW50IGhhbmRsZXIgSUQsIGJ1dCBhdHRyaWJ1dGUgbmFtZSAnJHthdHRyaWJ1dGVOYW1lfScgZG9lcyBub3Qgc3RhcnQgd2l0aCAnb24nLmApO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuZXZlbnREZWxlZ2F0b3Iuc2V0TGlzdGVuZXIodG9Eb21FbGVtZW50LCBldmVudE5hbWUsIGNvbXBvbmVudElkLCBldmVudEhhbmRsZXJJZCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYXR0cmlidXRlTmFtZSA9PT0gJ3ZhbHVlJykge1xyXG4gICAgICBpZiAodGhpcy50cnlBcHBseVZhbHVlUHJvcGVydHkodG9Eb21FbGVtZW50LCByZW5kZXJUcmVlRnJhbWUuYXR0cmlidXRlVmFsdWUoYXR0cmlidXRlRnJhbWUpKSkge1xyXG4gICAgICAgIHJldHVybjsgLy8gSWYgdGhpcyBET00gZWxlbWVudCB0eXBlIGhhcyBzcGVjaWFsICd2YWx1ZScgaGFuZGxpbmcsIGRvbid0IGFsc28gd3JpdGUgaXQgYXMgYW4gYXR0cmlidXRlXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBUcmVhdCBhcyBhIHJlZ3VsYXIgc3RyaW5nLXZhbHVlZCBhdHRyaWJ1dGVcclxuICAgIHRvRG9tRWxlbWVudC5zZXRBdHRyaWJ1dGUoXHJcbiAgICAgIGF0dHJpYnV0ZU5hbWUsXHJcbiAgICAgIHJlbmRlclRyZWVGcmFtZS5hdHRyaWJ1dGVWYWx1ZShhdHRyaWJ1dGVGcmFtZSkhXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0cnlBcHBseVZhbHVlUHJvcGVydHkoZWxlbWVudDogRWxlbWVudCwgdmFsdWU6IHN0cmluZyB8IG51bGwpIHtcclxuICAgIC8vIENlcnRhaW4gZWxlbWVudHMgaGF2ZSBidWlsdC1pbiBiZWhhdmlvdXIgZm9yIHRoZWlyICd2YWx1ZScgcHJvcGVydHlcclxuICAgIHN3aXRjaCAoZWxlbWVudC50YWdOYW1lKSB7XHJcbiAgICAgIGNhc2UgJ0lOUFVUJzpcclxuICAgICAgY2FzZSAnU0VMRUNUJzpcclxuICAgICAgY2FzZSAnVEVYVEFSRUEnOlxyXG4gICAgICAgIGlmIChpc0NoZWNrYm94KGVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAoZWxlbWVudCBhcyBIVE1MSW5wdXRFbGVtZW50KS5jaGVja2VkID0gdmFsdWUgPT09ICcnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAoZWxlbWVudCBhcyBhbnkpLnZhbHVlID0gdmFsdWU7XHJcblxyXG4gICAgICAgICAgaWYgKGVsZW1lbnQudGFnTmFtZSA9PT0gJ1NFTEVDVCcpIHtcclxuICAgICAgICAgICAgLy8gPHNlbGVjdD4gaXMgc3BlY2lhbCwgaW4gdGhhdCBhbnl0aGluZyB3ZSB3cml0ZSB0byAudmFsdWUgd2lsbCBiZSBsb3N0IGlmIHRoZXJlXHJcbiAgICAgICAgICAgIC8vIGlzbid0IHlldCBhIG1hdGNoaW5nIDxvcHRpb24+LiBUbyBtYWludGFpbiB0aGUgZXhwZWN0ZWQgYmVoYXZpb3Igbm8gbWF0dGVyIHRoZVxyXG4gICAgICAgICAgICAvLyBlbGVtZW50IGluc2VydGlvbi91cGRhdGUgb3JkZXIsIHByZXNlcnZlIHRoZSBkZXNpcmVkIHZhbHVlIHNlcGFyYXRlbHkgc29cclxuICAgICAgICAgICAgLy8gd2UgY2FuIHJlY292ZXIgaXQgd2hlbiBpbnNlcnRpbmcgYW55IG1hdGNoaW5nIDxvcHRpb24+LlxyXG4gICAgICAgICAgICBlbGVtZW50W3NlbGVjdFZhbHVlUHJvcG5hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICBjYXNlICdPUFRJT04nOlxyXG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCd2YWx1ZScsIHZhbHVlISk7XHJcbiAgICAgICAgLy8gU2VlIGFib3ZlIGZvciB3aHkgd2UgaGF2ZSB0aGlzIHNwZWNpYWwgaGFuZGxpbmcgZm9yIDxzZWxlY3Q+LzxvcHRpb24+XHJcbiAgICAgICAgY29uc3QgcGFyZW50RWxlbWVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICAgICAgICBpZiAocGFyZW50RWxlbWVudCAmJiAoc2VsZWN0VmFsdWVQcm9wbmFtZSBpbiBwYXJlbnRFbGVtZW50KSAmJiBwYXJlbnRFbGVtZW50W3NlbGVjdFZhbHVlUHJvcG5hbWVdID09PSB2YWx1ZSkge1xyXG4gICAgICAgICAgdGhpcy50cnlBcHBseVZhbHVlUHJvcGVydHkocGFyZW50RWxlbWVudCwgdmFsdWUpO1xyXG4gICAgICAgICAgZGVsZXRlIHBhcmVudEVsZW1lbnRbc2VsZWN0VmFsdWVQcm9wbmFtZV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5zZXJ0RnJhbWVSYW5nZShjb21wb25lbnRJZDogbnVtYmVyLCBwYXJlbnQ6IExvZ2ljYWxFbGVtZW50LCBjaGlsZEluZGV4OiBudW1iZXIsIGZyYW1lczogU3lzdGVtX0FycmF5PFJlbmRlclRyZWVGcmFtZVBvaW50ZXI+LCBzdGFydEluZGV4OiBudW1iZXIsIGVuZEluZGV4RXhjbDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIGNvbnN0IG9yaWdDaGlsZEluZGV4ID0gY2hpbGRJbmRleDtcclxuICAgIGZvciAobGV0IGluZGV4ID0gc3RhcnRJbmRleDsgaW5kZXggPCBlbmRJbmRleEV4Y2w7IGluZGV4KyspIHtcclxuICAgICAgY29uc3QgZnJhbWUgPSBnZXRUcmVlRnJhbWVQdHIoZnJhbWVzLCBpbmRleCk7XHJcbiAgICAgIGNvbnN0IG51bUNoaWxkcmVuSW5zZXJ0ZWQgPSB0aGlzLmluc2VydEZyYW1lKGNvbXBvbmVudElkLCBwYXJlbnQsIGNoaWxkSW5kZXgsIGZyYW1lcywgZnJhbWUsIGluZGV4KTtcclxuICAgICAgY2hpbGRJbmRleCArPSBudW1DaGlsZHJlbkluc2VydGVkO1xyXG5cclxuICAgICAgLy8gU2tpcCBvdmVyIGFueSBkZXNjZW5kYW50cywgc2luY2UgdGhleSBhcmUgYWxyZWFkeSBkZWFsdCB3aXRoIHJlY3Vyc2l2ZWx5XHJcbiAgICAgIGNvbnN0IHN1YnRyZWVMZW5ndGggPSByZW5kZXJUcmVlRnJhbWUuc3VidHJlZUxlbmd0aChmcmFtZSk7XHJcbiAgICAgIGlmIChzdWJ0cmVlTGVuZ3RoID4gMSkge1xyXG4gICAgICAgIGluZGV4ICs9IHN1YnRyZWVMZW5ndGggLSAxO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChjaGlsZEluZGV4IC0gb3JpZ0NoaWxkSW5kZXgpOyAvLyBUb3RhbCBudW1iZXIgb2YgY2hpbGRyZW4gaW5zZXJ0ZWRcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzQ2hlY2tib3goZWxlbWVudDogRWxlbWVudCkge1xyXG4gIHJldHVybiBlbGVtZW50LnRhZ05hbWUgPT09ICdJTlBVVCcgJiYgZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3R5cGUnKSA9PT0gJ2NoZWNrYm94JztcclxufVxyXG5cclxuZnVuY3Rpb24gcmFpc2VFdmVudChldmVudDogRXZlbnQsIGJyb3dzZXJSZW5kZXJlcklkOiBudW1iZXIsIGNvbXBvbmVudElkOiBudW1iZXIsIGV2ZW50SGFuZGxlcklkOiBudW1iZXIsIGV2ZW50QXJnczogRXZlbnRGb3JEb3ROZXQ8VUlFdmVudEFyZ3M+KSB7XHJcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgaWYgKCFyYWlzZUV2ZW50TWV0aG9kKSB7XHJcbiAgICByYWlzZUV2ZW50TWV0aG9kID0gcGxhdGZvcm0uZmluZE1ldGhvZChcclxuICAgICAgJ01pY3Jvc29mdC5Bc3BOZXRDb3JlLkJsYXpvci5Ccm93c2VyJywgJ01pY3Jvc29mdC5Bc3BOZXRDb3JlLkJsYXpvci5Ccm93c2VyLlJlbmRlcmluZycsICdCcm93c2VyUmVuZGVyZXJFdmVudERpc3BhdGNoZXInLCAnRGlzcGF0Y2hFdmVudCdcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBldmVudERlc2NyaXB0b3IgPSB7XHJcbiAgICBCcm93c2VyUmVuZGVyZXJJZDogYnJvd3NlclJlbmRlcmVySWQsXHJcbiAgICBDb21wb25lbnRJZDogY29tcG9uZW50SWQsXHJcbiAgICBFdmVudEhhbmRsZXJJZDogZXZlbnRIYW5kbGVySWQsXHJcbiAgICBFdmVudEFyZ3NUeXBlOiBldmVudEFyZ3MudHlwZVxyXG4gIH07XHJcblxyXG4gIHBsYXRmb3JtLmNhbGxNZXRob2QocmFpc2VFdmVudE1ldGhvZCwgbnVsbCwgW1xyXG4gICAgcGxhdGZvcm0udG9Eb3ROZXRTdHJpbmcoSlNPTi5zdHJpbmdpZnkoZXZlbnREZXNjcmlwdG9yKSksXHJcbiAgICBwbGF0Zm9ybS50b0RvdE5ldFN0cmluZyhKU09OLnN0cmluZ2lmeShldmVudEFyZ3MuZGF0YSkpXHJcbiAgXSk7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1JlbmRlcmluZy9Ccm93c2VyUmVuZGVyZXIudHMiLCJpbXBvcnQgeyBTeXN0ZW1fQXJyYXksIFBvaW50ZXIgfSBmcm9tICcuLi9QbGF0Zm9ybS9QbGF0Zm9ybSc7XHJcbmltcG9ydCB7IHBsYXRmb3JtIH0gZnJvbSAnLi4vRW52aXJvbm1lbnQnO1xyXG5jb25zdCByZW5kZXJUcmVlRWRpdFN0cnVjdExlbmd0aCA9IDE2O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFJlbmRlclRyZWVFZGl0UHRyKHJlbmRlclRyZWVFZGl0czogU3lzdGVtX0FycmF5PFJlbmRlclRyZWVFZGl0UG9pbnRlcj4sIGluZGV4OiBudW1iZXIpIHtcclxuICByZXR1cm4gcGxhdGZvcm0uZ2V0QXJyYXlFbnRyeVB0cihyZW5kZXJUcmVlRWRpdHMsIGluZGV4LCByZW5kZXJUcmVlRWRpdFN0cnVjdExlbmd0aCk7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZW5kZXJUcmVlRWRpdCA9IHtcclxuICAvLyBUaGUgcHJvcGVydGllcyBhbmQgbWVtb3J5IGxheW91dCBtdXN0IGJlIGtlcHQgaW4gc3luYyB3aXRoIHRoZSAuTkVUIGVxdWl2YWxlbnQgaW4gUmVuZGVyVHJlZUVkaXQuY3NcclxuICB0eXBlOiAoZWRpdDogUmVuZGVyVHJlZUVkaXRQb2ludGVyKSA9PiBwbGF0Zm9ybS5yZWFkSW50MzJGaWVsZChlZGl0LCAwKSBhcyBFZGl0VHlwZSxcclxuICBzaWJsaW5nSW5kZXg6IChlZGl0OiBSZW5kZXJUcmVlRWRpdFBvaW50ZXIpID0+IHBsYXRmb3JtLnJlYWRJbnQzMkZpZWxkKGVkaXQsIDQpLFxyXG4gIG5ld1RyZWVJbmRleDogKGVkaXQ6IFJlbmRlclRyZWVFZGl0UG9pbnRlcikgPT4gcGxhdGZvcm0ucmVhZEludDMyRmllbGQoZWRpdCwgOCksXHJcbiAgcmVtb3ZlZEF0dHJpYnV0ZU5hbWU6IChlZGl0OiBSZW5kZXJUcmVlRWRpdFBvaW50ZXIpID0+IHBsYXRmb3JtLnJlYWRTdHJpbmdGaWVsZChlZGl0LCAxMiksXHJcbn07XHJcblxyXG5leHBvcnQgZW51bSBFZGl0VHlwZSB7XHJcbiAgcHJlcGVuZEZyYW1lID0gMSxcclxuICByZW1vdmVGcmFtZSA9IDIsXHJcbiAgc2V0QXR0cmlidXRlID0gMyxcclxuICByZW1vdmVBdHRyaWJ1dGUgPSA0LFxyXG4gIHVwZGF0ZVRleHQgPSA1LFxyXG4gIHN0ZXBJbiA9IDYsXHJcbiAgc3RlcE91dCA9IDcsXHJcbn1cclxuXHJcbi8vIE5vbWluYWwgdHlwZSB0byBlbnN1cmUgb25seSB2YWxpZCBwb2ludGVycyBhcmUgcGFzc2VkIHRvIHRoZSByZW5kZXJUcmVlRWRpdCBmdW5jdGlvbnMuXHJcbi8vIEF0IHJ1bnRpbWUgdGhlIHZhbHVlcyBhcmUganVzdCBudW1iZXJzLlxyXG5leHBvcnQgaW50ZXJmYWNlIFJlbmRlclRyZWVFZGl0UG9pbnRlciBleHRlbmRzIFBvaW50ZXIgeyBSZW5kZXJUcmVlRWRpdFBvaW50ZXJfX0RPX05PVF9JTVBMRU1FTlQ6IGFueSB9XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9SZW5kZXJpbmcvUmVuZGVyVHJlZUVkaXQudHMiLCJpbXBvcnQgeyBTeXN0ZW1fU3RyaW5nLCBTeXN0ZW1fQXJyYXksIFBvaW50ZXIgfSBmcm9tICcuLi9QbGF0Zm9ybS9QbGF0Zm9ybSc7XHJcbmltcG9ydCB7IHBsYXRmb3JtIH0gZnJvbSAnLi4vRW52aXJvbm1lbnQnO1xyXG5jb25zdCByZW5kZXJUcmVlRnJhbWVTdHJ1Y3RMZW5ndGggPSAyODtcclxuXHJcbi8vIFRvIG1pbmltaXNlIEdDIHByZXNzdXJlLCBpbnN0ZWFkIG9mIGluc3RhbnRpYXRpbmcgYSBKUyBvYmplY3QgdG8gcmVwcmVzZW50IGVhY2ggdHJlZSBmcmFtZSxcclxuLy8gd2Ugd29yayBpbiB0ZXJtcyBvZiBwb2ludGVycyB0byB0aGUgc3RydWN0cyBvbiB0aGUgLk5FVCBoZWFwLCBhbmQgdXNlIHN0YXRpYyBmdW5jdGlvbnMgdGhhdFxyXG4vLyBrbm93IGhvdyB0byByZWFkIHByb3BlcnR5IHZhbHVlcyBmcm9tIHRob3NlIHN0cnVjdHMuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VHJlZUZyYW1lUHRyKHJlbmRlclRyZWVFbnRyaWVzOiBTeXN0ZW1fQXJyYXk8UmVuZGVyVHJlZUZyYW1lUG9pbnRlcj4sIGluZGV4OiBudW1iZXIpIHtcclxuICByZXR1cm4gcGxhdGZvcm0uZ2V0QXJyYXlFbnRyeVB0cihyZW5kZXJUcmVlRW50cmllcywgaW5kZXgsIHJlbmRlclRyZWVGcmFtZVN0cnVjdExlbmd0aCk7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZW5kZXJUcmVlRnJhbWUgPSB7XHJcbiAgLy8gVGhlIHByb3BlcnRpZXMgYW5kIG1lbW9yeSBsYXlvdXQgbXVzdCBiZSBrZXB0IGluIHN5bmMgd2l0aCB0aGUgLk5FVCBlcXVpdmFsZW50IGluIFJlbmRlclRyZWVGcmFtZS5jc1xyXG4gIGZyYW1lVHlwZTogKGZyYW1lOiBSZW5kZXJUcmVlRnJhbWVQb2ludGVyKSA9PiBwbGF0Zm9ybS5yZWFkSW50MzJGaWVsZChmcmFtZSwgNCkgYXMgRnJhbWVUeXBlLFxyXG4gIHN1YnRyZWVMZW5ndGg6IChmcmFtZTogUmVuZGVyVHJlZUZyYW1lUG9pbnRlcikgPT4gcGxhdGZvcm0ucmVhZEludDMyRmllbGQoZnJhbWUsIDgpIGFzIEZyYW1lVHlwZSxcclxuICBjb21wb25lbnRJZDogKGZyYW1lOiBSZW5kZXJUcmVlRnJhbWVQb2ludGVyKSA9PiBwbGF0Zm9ybS5yZWFkSW50MzJGaWVsZChmcmFtZSwgMTIpLFxyXG4gIGVsZW1lbnROYW1lOiAoZnJhbWU6IFJlbmRlclRyZWVGcmFtZVBvaW50ZXIpID0+IHBsYXRmb3JtLnJlYWRTdHJpbmdGaWVsZChmcmFtZSwgMTYpLFxyXG4gIHRleHRDb250ZW50OiAoZnJhbWU6IFJlbmRlclRyZWVGcmFtZVBvaW50ZXIpID0+IHBsYXRmb3JtLnJlYWRTdHJpbmdGaWVsZChmcmFtZSwgMTYpLFxyXG4gIGF0dHJpYnV0ZU5hbWU6IChmcmFtZTogUmVuZGVyVHJlZUZyYW1lUG9pbnRlcikgPT4gcGxhdGZvcm0ucmVhZFN0cmluZ0ZpZWxkKGZyYW1lLCAxNiksXHJcbiAgYXR0cmlidXRlVmFsdWU6IChmcmFtZTogUmVuZGVyVHJlZUZyYW1lUG9pbnRlcikgPT4gcGxhdGZvcm0ucmVhZFN0cmluZ0ZpZWxkKGZyYW1lLCAyNCksXHJcbiAgYXR0cmlidXRlRXZlbnRIYW5kbGVySWQ6IChmcmFtZTogUmVuZGVyVHJlZUZyYW1lUG9pbnRlcikgPT4gcGxhdGZvcm0ucmVhZEludDMyRmllbGQoZnJhbWUsIDgpLFxyXG59O1xyXG5cclxuZXhwb3J0IGVudW0gRnJhbWVUeXBlIHtcclxuICAvLyBUaGUgdmFsdWVzIG11c3QgYmUga2VwdCBpbiBzeW5jIHdpdGggdGhlIC5ORVQgZXF1aXZhbGVudCBpbiBSZW5kZXJUcmVlRnJhbWVUeXBlLmNzXHJcbiAgZWxlbWVudCA9IDEsXHJcbiAgdGV4dCA9IDIsXHJcbiAgYXR0cmlidXRlID0gMyxcclxuICBjb21wb25lbnQgPSA0LFxyXG4gIHJlZ2lvbiA9IDUsXHJcbn1cclxuXHJcbi8vIE5vbWluYWwgdHlwZSB0byBlbnN1cmUgb25seSB2YWxpZCBwb2ludGVycyBhcmUgcGFzc2VkIHRvIHRoZSByZW5kZXJUcmVlRnJhbWUgZnVuY3Rpb25zLlxyXG4vLyBBdCBydW50aW1lIHRoZSB2YWx1ZXMgYXJlIGp1c3QgbnVtYmVycy5cclxuZXhwb3J0IGludGVyZmFjZSBSZW5kZXJUcmVlRnJhbWVQb2ludGVyIGV4dGVuZHMgUG9pbnRlciB7IFJlbmRlclRyZWVGcmFtZVBvaW50ZXJfX0RPX05PVF9JTVBMRU1FTlQ6IGFueSB9XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9SZW5kZXJpbmcvUmVuZGVyVHJlZUZyYW1lLnRzIiwiaW1wb3J0IHsgRXZlbnRGb3JEb3ROZXQsIFVJRXZlbnRBcmdzIH0gZnJvbSAnLi9FdmVudEZvckRvdE5ldCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE9uRXZlbnRDYWxsYmFjayB7XHJcbiAgKGV2ZW50OiBFdmVudCwgY29tcG9uZW50SWQ6IG51bWJlciwgZXZlbnRIYW5kbGVySWQ6IG51bWJlciwgZXZlbnRBcmdzOiBFdmVudEZvckRvdE5ldDxVSUV2ZW50QXJncz4pOiB2b2lkO1xyXG59XHJcblxyXG4vLyBSZXNwb25zaWJsZSBmb3IgYWRkaW5nL3JlbW92aW5nIHRoZSBldmVudEluZm8gb24gYW4gZXhwYW5kbyBwcm9wZXJ0eSBvbiBET00gZWxlbWVudHMsIGFuZFxyXG4vLyBjYWxsaW5nIGFuIEV2ZW50SW5mb1N0b3JlIHRoYXQgZGVhbHMgd2l0aCByZWdpc3RlcmluZy91bnJlZ2lzdGVyaW5nIHRoZSB1bmRlcmx5aW5nIGRlbGVnYXRlZFxyXG4vLyBldmVudCBsaXN0ZW5lcnMgYXMgcmVxdWlyZWQgKGFuZCBhbHNvIG1hcHMgYWN0dWFsIGV2ZW50cyBiYWNrIHRvIHRoZSBnaXZlbiBjYWxsYmFjaykuXHJcbmV4cG9ydCBjbGFzcyBFdmVudERlbGVnYXRvciB7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgbmV4dEV2ZW50RGVsZWdhdG9ySWQgPSAwO1xyXG4gIHByaXZhdGUgZXZlbnRzQ29sbGVjdGlvbktleTogc3RyaW5nO1xyXG4gIHByaXZhdGUgZXZlbnRJbmZvU3RvcmU6IEV2ZW50SW5mb1N0b3JlO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG9uRXZlbnQ6IE9uRXZlbnRDYWxsYmFjaykge1xyXG4gICAgY29uc3QgZXZlbnREZWxlZ2F0b3JJZCA9ICsrRXZlbnREZWxlZ2F0b3IubmV4dEV2ZW50RGVsZWdhdG9ySWQ7XHJcbiAgICB0aGlzLmV2ZW50c0NvbGxlY3Rpb25LZXkgPSBgX2JsYXpvckV2ZW50c18ke2V2ZW50RGVsZWdhdG9ySWR9YDtcclxuICAgIHRoaXMuZXZlbnRJbmZvU3RvcmUgPSBuZXcgRXZlbnRJbmZvU3RvcmUodGhpcy5vbkdsb2JhbEV2ZW50LmJpbmQodGhpcykpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldExpc3RlbmVyKGVsZW1lbnQ6IEVsZW1lbnQsIGV2ZW50TmFtZTogc3RyaW5nLCBjb21wb25lbnRJZDogbnVtYmVyLCBldmVudEhhbmRsZXJJZDogbnVtYmVyKSB7XHJcbiAgICAvLyBFbnN1cmUgd2UgaGF2ZSBhIHBsYWNlIHRvIHN0b3JlIGV2ZW50IGluZm8gZm9yIHRoaXMgZWxlbWVudFxyXG4gICAgbGV0IGluZm9Gb3JFbGVtZW50OiBFdmVudEhhbmRsZXJJbmZvc0ZvckVsZW1lbnQgPSBlbGVtZW50W3RoaXMuZXZlbnRzQ29sbGVjdGlvbktleV07XHJcbiAgICBpZiAoIWluZm9Gb3JFbGVtZW50KSB7XHJcbiAgICAgIGluZm9Gb3JFbGVtZW50ID0gZWxlbWVudFt0aGlzLmV2ZW50c0NvbGxlY3Rpb25LZXldID0ge307XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGluZm9Gb3JFbGVtZW50Lmhhc093blByb3BlcnR5KGV2ZW50TmFtZSkpIHtcclxuICAgICAgLy8gV2UgY2FuIGNoZWFwbHkgdXBkYXRlIHRoZSBpbmZvIG9uIHRoZSBleGlzdGluZyBvYmplY3QgYW5kIGRvbid0IG5lZWQgYW55IG90aGVyIGhvdXNla2VlcGluZ1xyXG4gICAgICBjb25zdCBvbGRJbmZvID0gaW5mb0ZvckVsZW1lbnRbZXZlbnROYW1lXTtcclxuICAgICAgdGhpcy5ldmVudEluZm9TdG9yZS51cGRhdGUob2xkSW5mby5ldmVudEhhbmRsZXJJZCwgZXZlbnRIYW5kbGVySWQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gR28gdGhyb3VnaCB0aGUgd2hvbGUgZmxvdyB3aGljaCBtaWdodCBpbnZvbHZlIHJlZ2lzdGVyaW5nIGEgbmV3IGdsb2JhbCBoYW5kbGVyXHJcbiAgICAgIGNvbnN0IG5ld0luZm8gPSB7IGVsZW1lbnQsIGV2ZW50TmFtZSwgY29tcG9uZW50SWQsIGV2ZW50SGFuZGxlcklkIH07XHJcbiAgICAgIHRoaXMuZXZlbnRJbmZvU3RvcmUuYWRkKG5ld0luZm8pO1xyXG4gICAgICBpbmZvRm9yRWxlbWVudFtldmVudE5hbWVdID0gbmV3SW5mbztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyByZW1vdmVMaXN0ZW5lcihldmVudEhhbmRsZXJJZDogbnVtYmVyKSB7XHJcbiAgICAvLyBUaGlzIG1ldGhvZCBnZXRzIGNhbGxlZCB3aGVuZXZlciB0aGUgLk5FVC1zaWRlIGNvZGUgcmVwb3J0cyB0aGF0IGEgY2VydGFpbiBldmVudCBoYW5kbGVyXHJcbiAgICAvLyBoYXMgYmVlbiBkaXNwb3NlZC4gSG93ZXZlciB3ZSB3aWxsIGFscmVhZHkgaGF2ZSBkaXNwb3NlZCB0aGUgaW5mbyBhYm91dCB0aGF0IGhhbmRsZXIgaWZcclxuICAgIC8vIHRoZSBldmVudEhhbmRsZXJJZCBmb3IgdGhlIChlbGVtZW50LGV2ZW50TmFtZSkgcGFpciB3YXMgcmVwbGFjZWQgZHVyaW5nIGRpZmYgYXBwbGljYXRpb24uXHJcbiAgICBjb25zdCBpbmZvID0gdGhpcy5ldmVudEluZm9TdG9yZS5yZW1vdmUoZXZlbnRIYW5kbGVySWQpO1xyXG4gICAgaWYgKGluZm8pIHtcclxuICAgICAgLy8gTG9va3MgbGlrZSB0aGlzIGV2ZW50IGhhbmRsZXIgd2Fzbid0IGFscmVhZHkgZGlzcG9zZWRcclxuICAgICAgLy8gUmVtb3ZlIHRoZSBhc3NvY2lhdGVkIGRhdGEgZnJvbSB0aGUgRE9NIGVsZW1lbnRcclxuICAgICAgY29uc3QgZWxlbWVudCA9IGluZm8uZWxlbWVudDtcclxuICAgICAgaWYgKGVsZW1lbnQuaGFzT3duUHJvcGVydHkodGhpcy5ldmVudHNDb2xsZWN0aW9uS2V5KSkge1xyXG4gICAgICAgIGNvbnN0IGVsZW1lbnRFdmVudEluZm9zOiBFdmVudEhhbmRsZXJJbmZvc0ZvckVsZW1lbnQgPSBlbGVtZW50W3RoaXMuZXZlbnRzQ29sbGVjdGlvbktleV07XHJcbiAgICAgICAgZGVsZXRlIGVsZW1lbnRFdmVudEluZm9zW2luZm8uZXZlbnROYW1lXTtcclxuICAgICAgICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZWxlbWVudEV2ZW50SW5mb3MpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgZGVsZXRlIGVsZW1lbnRbdGhpcy5ldmVudHNDb2xsZWN0aW9uS2V5XTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25HbG9iYWxFdmVudChldnQ6IEV2ZW50KSB7XHJcbiAgICBpZiAoIShldnQudGFyZ2V0IGluc3RhbmNlb2YgRWxlbWVudCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNjYW4gdXAgdGhlIGVsZW1lbnQgaGllcmFyY2h5LCBsb29raW5nIGZvciBhbnkgbWF0Y2hpbmcgcmVnaXN0ZXJlZCBldmVudCBoYW5kbGVyc1xyXG4gICAgbGV0IGNhbmRpZGF0ZUVsZW1lbnQgPSBldnQudGFyZ2V0IGFzIEVsZW1lbnQgfCBudWxsO1xyXG4gICAgbGV0IGV2ZW50QXJnczogRXZlbnRGb3JEb3ROZXQ8VUlFdmVudEFyZ3M+IHwgbnVsbCA9IG51bGw7IC8vIFBvcHVsYXRlIGxhemlseVxyXG4gICAgd2hpbGUgKGNhbmRpZGF0ZUVsZW1lbnQpIHtcclxuICAgICAgaWYgKGNhbmRpZGF0ZUVsZW1lbnQuaGFzT3duUHJvcGVydHkodGhpcy5ldmVudHNDb2xsZWN0aW9uS2V5KSkge1xyXG4gICAgICAgIGNvbnN0IGhhbmRsZXJJbmZvcyA9IGNhbmRpZGF0ZUVsZW1lbnRbdGhpcy5ldmVudHNDb2xsZWN0aW9uS2V5XTtcclxuICAgICAgICBpZiAoaGFuZGxlckluZm9zLmhhc093blByb3BlcnR5KGV2dC50eXBlKSkge1xyXG4gICAgICAgICAgLy8gV2UgYXJlIGdvaW5nIHRvIHJhaXNlIGFuIGV2ZW50IGZvciB0aGlzIGVsZW1lbnQsIHNvIHByZXBhcmUgaW5mbyBuZWVkZWQgYnkgdGhlIC5ORVQgY29kZVxyXG4gICAgICAgICAgaWYgKCFldmVudEFyZ3MpIHtcclxuICAgICAgICAgICAgZXZlbnRBcmdzID0gRXZlbnRGb3JEb3ROZXQuZnJvbURPTUV2ZW50KGV2dCk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc3QgaGFuZGxlckluZm8gPSBoYW5kbGVySW5mb3NbZXZ0LnR5cGVdO1xyXG4gICAgICAgICAgdGhpcy5vbkV2ZW50KGV2dCwgaGFuZGxlckluZm8uY29tcG9uZW50SWQsIGhhbmRsZXJJbmZvLmV2ZW50SGFuZGxlcklkLCBldmVudEFyZ3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgY2FuZGlkYXRlRWxlbWVudCA9IGNhbmRpZGF0ZUVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vIFJlc3BvbnNpYmxlIGZvciBhZGRpbmcgYW5kIHJlbW92aW5nIHRoZSBnbG9iYWwgbGlzdGVuZXIgd2hlbiB0aGUgbnVtYmVyIG9mIGxpc3RlbmVyc1xyXG4vLyBmb3IgYSBnaXZlbiBldmVudCBuYW1lIGNoYW5nZXMgYmV0d2VlbiB6ZXJvIGFuZCBub256ZXJvXHJcbmNsYXNzIEV2ZW50SW5mb1N0b3JlIHtcclxuICBwcml2YXRlIGluZm9zQnlFdmVudEhhbmRsZXJJZDogeyBbZXZlbnRIYW5kbGVySWQ6IG51bWJlcl06IEV2ZW50SGFuZGxlckluZm8gfSA9IHt9O1xyXG4gIHByaXZhdGUgY291bnRCeUV2ZW50TmFtZTogeyBbZXZlbnROYW1lOiBzdHJpbmddOiBudW1iZXIgfSA9IHt9O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdsb2JhbExpc3RlbmVyOiBFdmVudExpc3RlbmVyKSB7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkKGluZm86IEV2ZW50SGFuZGxlckluZm8pIHtcclxuICAgIGlmICh0aGlzLmluZm9zQnlFdmVudEhhbmRsZXJJZFtpbmZvLmV2ZW50SGFuZGxlcklkXSkge1xyXG4gICAgICAvLyBTaG91bGQgbmV2ZXIgaGFwcGVuLCBidXQgd2Ugd2FudCB0byBrbm93IGlmIGl0IGRvZXNcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBFdmVudCAke2luZm8uZXZlbnRIYW5kbGVySWR9IGlzIGFscmVhZHkgdHJhY2tlZGApO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaW5mb3NCeUV2ZW50SGFuZGxlcklkW2luZm8uZXZlbnRIYW5kbGVySWRdID0gaW5mbztcclxuXHJcbiAgICBjb25zdCBldmVudE5hbWUgPSBpbmZvLmV2ZW50TmFtZTtcclxuICAgIGlmICh0aGlzLmNvdW50QnlFdmVudE5hbWUuaGFzT3duUHJvcGVydHkoZXZlbnROYW1lKSkge1xyXG4gICAgICB0aGlzLmNvdW50QnlFdmVudE5hbWVbZXZlbnROYW1lXSsrO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jb3VudEJ5RXZlbnROYW1lW2V2ZW50TmFtZV0gPSAxO1xyXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgdGhpcy5nbG9iYWxMaXN0ZW5lcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdXBkYXRlKG9sZEV2ZW50SGFuZGxlcklkOiBudW1iZXIsIG5ld0V2ZW50SGFuZGxlcklkOiBudW1iZXIpIHtcclxuICAgIGlmICh0aGlzLmluZm9zQnlFdmVudEhhbmRsZXJJZC5oYXNPd25Qcm9wZXJ0eShuZXdFdmVudEhhbmRsZXJJZCkpIHtcclxuICAgICAgLy8gU2hvdWxkIG5ldmVyIGhhcHBlbiwgYnV0IHdlIHdhbnQgdG8ga25vdyBpZiBpdCBkb2VzXHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRXZlbnQgJHtuZXdFdmVudEhhbmRsZXJJZH0gaXMgYWxyZWFkeSB0cmFja2VkYCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2luY2Ugd2UncmUganVzdCB1cGRhdGluZyB0aGUgZXZlbnQgaGFuZGxlciBJRCwgdGhlcmUncyBubyBuZWVkIHRvIHVwZGF0ZSB0aGUgZ2xvYmFsIGNvdW50c1xyXG4gICAgY29uc3QgaW5mbyA9IHRoaXMuaW5mb3NCeUV2ZW50SGFuZGxlcklkW29sZEV2ZW50SGFuZGxlcklkXTtcclxuICAgIGRlbGV0ZSB0aGlzLmluZm9zQnlFdmVudEhhbmRsZXJJZFtvbGRFdmVudEhhbmRsZXJJZF07XHJcbiAgICBpbmZvLmV2ZW50SGFuZGxlcklkID0gbmV3RXZlbnRIYW5kbGVySWQ7XHJcbiAgICB0aGlzLmluZm9zQnlFdmVudEhhbmRsZXJJZFtuZXdFdmVudEhhbmRsZXJJZF0gPSBpbmZvO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZShldmVudEhhbmRsZXJJZDogbnVtYmVyKTogRXZlbnRIYW5kbGVySW5mbyB7XHJcbiAgICBjb25zdCBpbmZvID0gdGhpcy5pbmZvc0J5RXZlbnRIYW5kbGVySWRbZXZlbnRIYW5kbGVySWRdO1xyXG4gICAgaWYgKGluZm8pIHtcclxuICAgICAgZGVsZXRlIHRoaXMuaW5mb3NCeUV2ZW50SGFuZGxlcklkW2V2ZW50SGFuZGxlcklkXTtcclxuXHJcbiAgICAgIGNvbnN0IGV2ZW50TmFtZSA9IGluZm8uZXZlbnROYW1lO1xyXG4gICAgICBpZiAoLS10aGlzLmNvdW50QnlFdmVudE5hbWVbZXZlbnROYW1lXSA9PT0gMCkge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLmNvdW50QnlFdmVudE5hbWVbZXZlbnROYW1lXTtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgdGhpcy5nbG9iYWxMaXN0ZW5lcik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaW5mbztcclxuICB9XHJcbn1cclxuXHJcbmludGVyZmFjZSBFdmVudEhhbmRsZXJJbmZvc0ZvckVsZW1lbnQge1xyXG4gIC8vIEFsdGhvdWdoIHdlICpjb3VsZCogdHJhY2sgbXVsdGlwbGUgZXZlbnQgaGFuZGxlcnMgcGVyIChlbGVtZW50LCBldmVudE5hbWUpIHBhaXJcclxuICAvLyAoc2luY2UgdGhleSBoYXZlIGRpc3RpbmN0IGV2ZW50SGFuZGxlcklkIHZhbHVlcyksIHRoZXJlJ3Mgbm8gcG9pbnQgZG9pbmcgc28gYmVjYXVzZVxyXG4gIC8vIG91ciBwcm9ncmFtbWluZyBtb2RlbCBpcyB0aGF0IHlvdSBkZWNsYXJlIGV2ZW50IGhhbmRsZXJzIGFzIGF0dHJpYnV0ZXMuIEFuIGVsZW1lbnRcclxuICAvLyBjYW4gb25seSBoYXZlIG9uZSBhdHRyaWJ1dGUgd2l0aCBhIGdpdmVuIG5hbWUsIGhlbmNlIG9ubHkgb25lIGV2ZW50IGhhbmRsZXIgd2l0aFxyXG4gIC8vIHRoYXQgbmFtZSBhdCBhbnkgb25lIHRpbWUuXHJcbiAgLy8gU28gdG8ga2VlcCB0aGluZ3Mgc2ltcGxlLCBvbmx5IHRyYWNrIG9uZSBFdmVudEhhbmRsZXJJbmZvIHBlciAoZWxlbWVudCwgZXZlbnROYW1lKVxyXG4gIFtldmVudE5hbWU6IHN0cmluZ106IEV2ZW50SGFuZGxlckluZm9cclxufVxyXG5cclxuaW50ZXJmYWNlIEV2ZW50SGFuZGxlckluZm8ge1xyXG4gIGVsZW1lbnQ6IEVsZW1lbnQ7XHJcbiAgZXZlbnROYW1lOiBzdHJpbmc7XHJcbiAgY29tcG9uZW50SWQ6IG51bWJlcjtcclxuICBldmVudEhhbmRsZXJJZDogbnVtYmVyO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9SZW5kZXJpbmcvRXZlbnREZWxlZ2F0b3IudHMiLCJleHBvcnQgY2xhc3MgRXZlbnRGb3JEb3ROZXQ8VERhdGEgZXh0ZW5kcyBVSUV2ZW50QXJncz4ge1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSB0eXBlOiBFdmVudEFyZ3NUeXBlLCBwdWJsaWMgcmVhZG9ubHkgZGF0YTogVERhdGEpIHtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmcm9tRE9NRXZlbnQoZXZlbnQ6IEV2ZW50KTogRXZlbnRGb3JEb3ROZXQ8VUlFdmVudEFyZ3M+IHtcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBldmVudC50YXJnZXQgYXMgRWxlbWVudDtcclxuICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xyXG4gICAgICBjYXNlICdjbGljayc6XHJcbiAgICAgIGNhc2UgJ21vdXNlZG93bic6XHJcbiAgICAgIGNhc2UgJ21vdXNldXAnOlxyXG4gICAgICAgIHJldHVybiBuZXcgRXZlbnRGb3JEb3ROZXQ8VUlNb3VzZUV2ZW50QXJncz4oJ21vdXNlJywgeyBUeXBlOiBldmVudC50eXBlIH0pO1xyXG4gICAgICBjYXNlICdjaGFuZ2UnOiB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0SXNDaGVja2JveCA9IGlzQ2hlY2tib3goZWxlbWVudCk7XHJcbiAgICAgICAgY29uc3QgbmV3VmFsdWUgPSB0YXJnZXRJc0NoZWNrYm94ID8gISFlbGVtZW50WydjaGVja2VkJ10gOiBlbGVtZW50Wyd2YWx1ZSddO1xyXG4gICAgICAgIHJldHVybiBuZXcgRXZlbnRGb3JEb3ROZXQ8VUlDaGFuZ2VFdmVudEFyZ3M+KCdjaGFuZ2UnLCB7IFR5cGU6IGV2ZW50LnR5cGUsIFZhbHVlOiBuZXdWYWx1ZSB9KTtcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdrZXlwcmVzcyc6XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFdmVudEZvckRvdE5ldDxVSUtleWJvYXJkRXZlbnRBcmdzPigna2V5Ym9hcmQnLCB7IFR5cGU6IGV2ZW50LnR5cGUsIEtleTogKGV2ZW50IGFzIGFueSkua2V5IH0pO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiBuZXcgRXZlbnRGb3JEb3ROZXQ8VUlFdmVudEFyZ3M+KCd1bmtub3duJywgeyBUeXBlOiBldmVudC50eXBlIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaXNDaGVja2JveChlbGVtZW50OiBFbGVtZW50IHwgbnVsbCkge1xyXG4gIHJldHVybiBlbGVtZW50ICYmIGVsZW1lbnQudGFnTmFtZSA9PT0gJ0lOUFVUJyAmJiBlbGVtZW50LmdldEF0dHJpYnV0ZSgndHlwZScpID09PSAnY2hlY2tib3gnO1xyXG59XHJcblxyXG4vLyBUaGUgZm9sbG93aW5nIGludGVyZmFjZXMgbXVzdCBiZSBrZXB0IGluIHN5bmMgd2l0aCB0aGUgVUlFdmVudEFyZ3MgQyMgY2xhc3Nlc1xyXG5cclxudHlwZSBFdmVudEFyZ3NUeXBlID0gJ21vdXNlJyB8ICdrZXlib2FyZCcgfCAnY2hhbmdlJyB8ICd1bmtub3duJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVUlFdmVudEFyZ3Mge1xyXG4gIFR5cGU6IHN0cmluZztcclxufVxyXG5cclxuaW50ZXJmYWNlIFVJTW91c2VFdmVudEFyZ3MgZXh0ZW5kcyBVSUV2ZW50QXJncyB7XHJcbn1cclxuXHJcbmludGVyZmFjZSBVSUtleWJvYXJkRXZlbnRBcmdzIGV4dGVuZHMgVUlFdmVudEFyZ3Mge1xyXG4gIEtleTogc3RyaW5nO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgVUlDaGFuZ2VFdmVudEFyZ3MgZXh0ZW5kcyBVSUV2ZW50QXJncyB7XHJcbiAgVmFsdWU6IHN0cmluZyB8IGJvb2xlYW47XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1JlbmRlcmluZy9FdmVudEZvckRvdE5ldC50cyIsIi8qXHJcbiAgQSBMb2dpY2FsRWxlbWVudCBwbGF5cyB0aGUgc2FtZSByb2xlIGFzIGFuIEVsZW1lbnQgaW5zdGFuY2UgZnJvbSB0aGUgcG9pbnQgb2YgdmlldyBvZiB0aGVcclxuICBBUEkgY29uc3VtZXIuIEluc2VydGluZyBhbmQgcmVtb3ZpbmcgbG9naWNhbCBlbGVtZW50cyB1cGRhdGVzIHRoZSBicm93c2VyIERPTSBqdXN0IHRoZSBzYW1lLlxyXG5cclxuICBUaGUgZGlmZmVyZW5jZSBpcyB0aGF0LCB1bmxpa2UgcmVndWxhciBET00gbXV0YXRpb24gQVBJcywgdGhlIExvZ2ljYWxFbGVtZW50IEFQSXMgZG9uJ3QgdXNlXHJcbiAgdGhlIHVuZGVybHlpbmcgRE9NIHN0cnVjdHVyZSBhcyB0aGUgZGF0YSBzdG9yYWdlIGZvciB0aGUgZWxlbWVudCBoaWVyYXJjaHkuIEluc3RlYWQsIHRoZVxyXG4gIExvZ2ljYWxFbGVtZW50IEFQSXMgdGFrZSBjYXJlIG9mIHRyYWNraW5nIGhpZXJhcmNoaWNhbCByZWxhdGlvbnNoaXBzIHNlcGFyYXRlbHkuIFRoZSBwb2ludFxyXG4gIG9mIHRoaXMgaXMgdG8gcGVybWl0IGEgbG9naWNhbCB0cmVlIHN0cnVjdHVyZSBpbiB3aGljaCBwYXJlbnQvY2hpbGQgcmVsYXRpb25zaGlwcyBkb24ndFxyXG4gIGhhdmUgdG8gYmUgbWF0ZXJpYWxpemVkIGluIHRlcm1zIG9mIERPTSBlbGVtZW50IHBhcmVudC9jaGlsZCByZWxhdGlvbnNoaXBzLiBBbmQgdGhlIHJlYXNvblxyXG4gIHdoeSB3ZSB3YW50IHRoYXQgaXMgc28gdGhhdCBoaWVyYXJjaGllcyBvZiBCbGF6b3IgY29tcG9uZW50cyBjYW4gYmUgdHJhY2tlZCBldmVuIHdoZW4gdGhvc2VcclxuICBjb21wb25lbnRzJyByZW5kZXIgb3V0cHV0IG5lZWQgbm90IGJlIGEgc2luZ2xlIGxpdGVyYWwgRE9NIGVsZW1lbnQuXHJcblxyXG4gIENvbnN1bWVycyBvZiB0aGUgQVBJIGRvbid0IG5lZWQgdG8ga25vdyBhYm91dCB0aGUgaW1wbGVtZW50YXRpb24sIGJ1dCBob3cgaXQncyBkb25lIGlzOlxyXG4gIC0gRWFjaCBMb2dpY2FsRWxlbWVudCBpcyBtYXRlcmlhbGl6ZWQgaW4gdGhlIERPTSBhcyBlaXRoZXI6XHJcbiAgICAtIEEgTm9kZSBpbnN0YW5jZSwgZm9yIGFjdHVhbCBOb2RlIGluc3RhbmNlcyBpbnNlcnRlZCB1c2luZyAnaW5zZXJ0TG9naWNhbENoaWxkJyBvclxyXG4gICAgICBmb3IgRWxlbWVudCBpbnN0YW5jZXMgcHJvbW90ZWQgdG8gTG9naWNhbEVsZW1lbnQgdmlhICd0b0xvZ2ljYWxFbGVtZW50J1xyXG4gICAgLSBBIENvbW1lbnQgaW5zdGFuY2UsIGZvciAnbG9naWNhbCBjb250YWluZXInIGluc3RhbmNlcyBpbnNlcnRlZCB1c2luZyAnY3JlYXRlQW5kSW5zZXJ0TG9naWNhbENvbnRhaW5lcidcclxuICAtIFRoZW4sIG9uIHRoYXQgaW5zdGFuY2UgKGkuZS4sIHRoZSBOb2RlIG9yIENvbW1lbnQpLCB3ZSBzdG9yZSBhbiBhcnJheSBvZiAnbG9naWNhbCBjaGlsZHJlbidcclxuICAgIGluc3RhbmNlcywgZS5nLixcclxuICAgICAgW2ZpcnN0Q2hpbGQsIHNlY29uZENoaWxkLCB0aGlyZENoaWxkLCAuLi5dXHJcbiAgICAuLi4gcGx1cyB3ZSBzdG9yZSBhIHJlZmVyZW5jZSB0byB0aGUgJ2xvZ2ljYWwgcGFyZW50JyAoaWYgYW55KVxyXG4gIC0gVGhlICdsb2dpY2FsIGNoaWxkcmVuJyBhcnJheSBtZWFucyB3ZSBjYW4gbG9vayB1cCBpbiBPKDEpOlxyXG4gICAgLSBUaGUgbnVtYmVyIG9mIGxvZ2ljYWwgY2hpbGRyZW4gKG5vdCBjdXJyZW50bHkgaW1wbGVtZW50ZWQgYmVjYXVzZSBub3QgcmVxdWlyZWQsIGJ1dCB0cml2aWFsKVxyXG4gICAgLSBUaGUgbG9naWNhbCBjaGlsZCBhdCBhbnkgZ2l2ZW4gaW5kZXhcclxuICAtIFdoZW5ldmVyIGEgbG9naWNhbCBjaGlsZCBpcyBhZGRlZCBvciByZW1vdmVkLCB3ZSB1cGRhdGUgdGhlIHBhcmVudCdzIGFycmF5IG9mIGxvZ2ljYWwgY2hpbGRyZW5cclxuKi9cclxuXHJcbmNvbnN0IGxvZ2ljYWxDaGlsZHJlblByb3BuYW1lID0gY3JlYXRlU3ltYm9sT3JGYWxsYmFjaygnX2JsYXpvckxvZ2ljYWxDaGlsZHJlbicpO1xyXG5jb25zdCBsb2dpY2FsUGFyZW50UHJvcG5hbWUgPSBjcmVhdGVTeW1ib2xPckZhbGxiYWNrKCdfYmxhem9yTG9naWNhbFBhcmVudCcpO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRvTG9naWNhbEVsZW1lbnQoZWxlbWVudDogRWxlbWVudCkge1xyXG4gIGlmIChlbGVtZW50LmNoaWxkTm9kZXMubGVuZ3RoID4gMCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdOZXcgbG9naWNhbCBlbGVtZW50cyBtdXN0IHN0YXJ0IGVtcHR5Jyk7XHJcbiAgfVxyXG5cclxuICBlbGVtZW50W2xvZ2ljYWxDaGlsZHJlblByb3BuYW1lXSA9IFtdO1xyXG4gIHJldHVybiBlbGVtZW50IGFzIGFueSBhcyBMb2dpY2FsRWxlbWVudDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFuZEluc2VydExvZ2ljYWxDb250YWluZXIocGFyZW50OiBMb2dpY2FsRWxlbWVudCwgY2hpbGRJbmRleDogbnVtYmVyKTogTG9naWNhbEVsZW1lbnQge1xyXG4gIGNvbnN0IGNvbnRhaW5lckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVDb21tZW50KCchJyk7XHJcbiAgaW5zZXJ0TG9naWNhbENoaWxkKGNvbnRhaW5lckVsZW1lbnQsIHBhcmVudCwgY2hpbGRJbmRleCk7XHJcbiAgcmV0dXJuIGNvbnRhaW5lckVsZW1lbnQgYXMgYW55IGFzIExvZ2ljYWxFbGVtZW50O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0TG9naWNhbENoaWxkKGNoaWxkOiBOb2RlLCBwYXJlbnQ6IExvZ2ljYWxFbGVtZW50LCBjaGlsZEluZGV4OiBudW1iZXIpIHtcclxuICBjb25zdCBjaGlsZEFzTG9naWNhbEVsZW1lbnQgPSBjaGlsZCBhcyBhbnkgYXMgTG9naWNhbEVsZW1lbnQ7XHJcbiAgaWYgKGNoaWxkIGluc3RhbmNlb2YgQ29tbWVudCkge1xyXG4gICAgY29uc3QgZXhpc3RpbmdHcmFuZGNoaWxkcmVuID0gZ2V0TG9naWNhbENoaWxkcmVuQXJyYXkoY2hpbGRBc0xvZ2ljYWxFbGVtZW50KTtcclxuICAgIGlmIChleGlzdGluZ0dyYW5kY2hpbGRyZW4gJiYgZ2V0TG9naWNhbENoaWxkcmVuQXJyYXkoY2hpbGRBc0xvZ2ljYWxFbGVtZW50KS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIC8vIFRoZXJlJ3Mgbm90aGluZyB0byBzdG9wIHVzIGltcGxlbWVudGluZyBzdXBwb3J0IGZvciB0aGlzIHNjZW5hcmlvLCBhbmQgaXQncyBub3QgZGlmZmljdWx0XHJcbiAgICAgIC8vIChhZnRlciBpbnNlcnRpbmcgJ2NoaWxkJyBpdHNlbGYsIGFsc28gaXRlcmF0ZSB0aHJvdWdoIGl0cyBsb2dpY2FsIGNoaWxkcmVuIGFuZCBwaHlzaWNhbGx5XHJcbiAgICAgIC8vIHB1dCB0aGVtIGFzIGZvbGxvd2luZy1zaWJsaW5ncyBpbiB0aGUgRE9NKS4gSG93ZXZlciB0aGVyZSdzIG5vIHNjZW5hcmlvIHRoYXQgcmVxdWlyZXMgaXRcclxuICAgICAgLy8gcHJlc2VudGx5LCBzbyBpZiB3ZSBkaWQgaW1wbGVtZW50IGl0IHRoZXJlJ2QgYmUgbm8gZ29vZCB3YXkgdG8gaGF2ZSB0ZXN0cyBmb3IgaXQuXHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkOiBpbnNlcnRpbmcgbm9uLWVtcHR5IGxvZ2ljYWwgY29udGFpbmVyJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpZiAoZ2V0TG9naWNhbFBhcmVudChjaGlsZEFzTG9naWNhbEVsZW1lbnQpKSB7XHJcbiAgICAvLyBMaWtld2lzZSwgd2UgY291bGQgZWFzaWx5IHN1cHBvcnQgdGhpcyBzY2VuYXJpbyB0b28gKGluIHRoaXMgJ2lmJyBibG9jaywganVzdCBzcGxpY2VcclxuICAgIC8vIG91dCAnY2hpbGQnIGZyb20gdGhlIGxvZ2ljYWwgY2hpbGRyZW4gYXJyYXkgb2YgaXRzIHByZXZpb3VzIGxvZ2ljYWwgcGFyZW50IGJ5IHVzaW5nXHJcbiAgICAvLyBBcnJheS5wcm90b3R5cGUuaW5kZXhPZiB0byBkZXRlcm1pbmUgaXRzIHByZXZpb3VzIHNpYmxpbmcgaW5kZXgpLlxyXG4gICAgLy8gQnV0IGFnYWluLCBzaW5jZSB0aGVyZSdzIG5vdCBjdXJyZW50bHkgYW55IHNjZW5hcmlvIHRoYXQgd291bGQgdXNlIGl0LCB3ZSB3b3VsZCBub3RcclxuICAgIC8vIGhhdmUgYW55IHRlc3QgY292ZXJhZ2UgZm9yIHN1Y2ggYW4gaW1wbGVtZW50YXRpb24uXHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZDogbW92aW5nIGV4aXN0aW5nIGxvZ2ljYWwgY2hpbGRyZW4nKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IG5ld1NpYmxpbmdzID0gZ2V0TG9naWNhbENoaWxkcmVuQXJyYXkocGFyZW50KTtcclxuICBjb25zdCBuZXdQaHlzaWNhbFBhcmVudCA9IGdldENsb3Nlc3REb21FbGVtZW50KHBhcmVudCk7XHJcbiAgaWYgKGNoaWxkSW5kZXggPCBuZXdTaWJsaW5ncy5sZW5ndGgpIHtcclxuICAgIG5ld1BoeXNpY2FsUGFyZW50Lmluc2VydEJlZm9yZShjaGlsZCwgbmV3U2libGluZ3NbY2hpbGRJbmRleF0gYXMgYW55IGFzIE5vZGUpO1xyXG4gICAgbmV3U2libGluZ3Muc3BsaWNlKGNoaWxkSW5kZXgsIDAsIGNoaWxkQXNMb2dpY2FsRWxlbWVudCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGlmIChwYXJlbnQgaW5zdGFuY2VvZiBDb21tZW50KSB7XHJcbiAgICAgIGNvbnN0IHBhcmVudExvZ2ljYWxOZXh0U2libGluZyA9IGdldExvZ2ljYWxOZXh0U2libGluZyhwYXJlbnQpO1xyXG4gICAgICBpZiAocGFyZW50TG9naWNhbE5leHRTaWJsaW5nKSB7XHJcbiAgICAgICAgbmV3UGh5c2ljYWxQYXJlbnQuaW5zZXJ0QmVmb3JlKGNoaWxkLCBwYXJlbnRMb2dpY2FsTmV4dFNpYmxpbmcgYXMgYW55IGFzIE5vZGUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5ld1BoeXNpY2FsUGFyZW50LmFwcGVuZENoaWxkKGNoaWxkKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbmV3UGh5c2ljYWxQYXJlbnQuYXBwZW5kQ2hpbGQoY2hpbGQpO1xyXG4gICAgfVxyXG5cclxuICAgIG5ld1NpYmxpbmdzLnB1c2goY2hpbGRBc0xvZ2ljYWxFbGVtZW50KTtcclxuICB9XHJcblxyXG4gIGNoaWxkQXNMb2dpY2FsRWxlbWVudFtsb2dpY2FsUGFyZW50UHJvcG5hbWVdID0gcGFyZW50O1xyXG4gIGlmICghKGxvZ2ljYWxDaGlsZHJlblByb3BuYW1lIGluIGNoaWxkQXNMb2dpY2FsRWxlbWVudCkpIHtcclxuICAgIGNoaWxkQXNMb2dpY2FsRWxlbWVudFtsb2dpY2FsQ2hpbGRyZW5Qcm9wbmFtZV0gPSBbXTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVMb2dpY2FsQ2hpbGQocGFyZW50OiBMb2dpY2FsRWxlbWVudCwgY2hpbGRJbmRleDogbnVtYmVyKSB7XHJcbiAgY29uc3QgY2hpbGRyZW5BcnJheSA9IGdldExvZ2ljYWxDaGlsZHJlbkFycmF5KHBhcmVudCk7XHJcbiAgY29uc3QgY2hpbGRUb1JlbW92ZSA9IGNoaWxkcmVuQXJyYXkuc3BsaWNlKGNoaWxkSW5kZXgsIDEpWzBdO1xyXG5cclxuICAvLyBJZiBpdCdzIGEgbG9naWNhbCBjb250YWluZXIsIGFsc28gcmVtb3ZlIGl0cyBkZXNjZW5kYW50c1xyXG4gIGlmIChjaGlsZFRvUmVtb3ZlIGluc3RhbmNlb2YgQ29tbWVudCkge1xyXG4gICAgY29uc3QgZ3JhbmRjaGlsZHJlbkFycmF5ID0gZ2V0TG9naWNhbENoaWxkcmVuQXJyYXkoY2hpbGRUb1JlbW92ZSk7XHJcbiAgICB3aGlsZSAoZ3JhbmRjaGlsZHJlbkFycmF5Lmxlbmd0aCA+IDApIHtcclxuICAgICAgcmVtb3ZlTG9naWNhbENoaWxkKGNoaWxkVG9SZW1vdmUsIDApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gRmluYWxseSwgcmVtb3ZlIHRoZSBub2RlIGl0c2VsZlxyXG4gIGNvbnN0IGRvbU5vZGVUb1JlbW92ZSA9IGNoaWxkVG9SZW1vdmUgYXMgYW55IGFzIE5vZGU7XHJcbiAgZG9tTm9kZVRvUmVtb3ZlLnBhcmVudE5vZGUhLnJlbW92ZUNoaWxkKGRvbU5vZGVUb1JlbW92ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2dpY2FsUGFyZW50KGVsZW1lbnQ6IExvZ2ljYWxFbGVtZW50KTogTG9naWNhbEVsZW1lbnQgfCBudWxsIHtcclxuICByZXR1cm4gKGVsZW1lbnRbbG9naWNhbFBhcmVudFByb3BuYW1lXSBhcyBMb2dpY2FsRWxlbWVudCkgfHwgbnVsbDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldExvZ2ljYWxDaGlsZChwYXJlbnQ6IExvZ2ljYWxFbGVtZW50LCBjaGlsZEluZGV4OiBudW1iZXIpOiBMb2dpY2FsRWxlbWVudCB7XHJcbiAgcmV0dXJuIGdldExvZ2ljYWxDaGlsZHJlbkFycmF5KHBhcmVudClbY2hpbGRJbmRleF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1N2Z0VsZW1lbnQoZWxlbWVudDogTG9naWNhbEVsZW1lbnQpIHtcclxuICByZXR1cm4gZ2V0Q2xvc2VzdERvbUVsZW1lbnQoZWxlbWVudCkubmFtZXNwYWNlVVJJID09PSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRMb2dpY2FsQ2hpbGRyZW5BcnJheShlbGVtZW50OiBMb2dpY2FsRWxlbWVudCkge1xyXG4gIHJldHVybiBlbGVtZW50W2xvZ2ljYWxDaGlsZHJlblByb3BuYW1lXSBhcyBMb2dpY2FsRWxlbWVudFtdO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRMb2dpY2FsTmV4dFNpYmxpbmcoZWxlbWVudDogTG9naWNhbEVsZW1lbnQpOiBMb2dpY2FsRWxlbWVudCB8IG51bGwge1xyXG4gIGNvbnN0IHNpYmxpbmdzID0gZ2V0TG9naWNhbENoaWxkcmVuQXJyYXkoZ2V0TG9naWNhbFBhcmVudChlbGVtZW50KSEpO1xyXG4gIGNvbnN0IHNpYmxpbmdJbmRleCA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoc2libGluZ3MsIGVsZW1lbnQpO1xyXG4gIHJldHVybiBzaWJsaW5nc1tzaWJsaW5nSW5kZXggKyAxXSB8fCBudWxsO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRDbG9zZXN0RG9tRWxlbWVudChsb2dpY2FsRWxlbWVudDogTG9naWNhbEVsZW1lbnQpIHtcclxuICBpZiAobG9naWNhbEVsZW1lbnQgaW5zdGFuY2VvZiBFbGVtZW50KSB7XHJcbiAgICByZXR1cm4gbG9naWNhbEVsZW1lbnQ7XHJcbiAgfSBlbHNlIGlmIChsb2dpY2FsRWxlbWVudCBpbnN0YW5jZW9mIENvbW1lbnQpIHtcclxuICAgIHJldHVybiBsb2dpY2FsRWxlbWVudC5wYXJlbnROb2RlISBhcyBFbGVtZW50O1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBhIHZhbGlkIGxvZ2ljYWwgZWxlbWVudCcpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlU3ltYm9sT3JGYWxsYmFjayhmYWxsYmFjazogc3RyaW5nKTogc3ltYm9sIHwgc3RyaW5nIHtcclxuICByZXR1cm4gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyA/IFN5bWJvbCgpIDogZmFsbGJhY2s7XHJcbn1cclxuXHJcbi8vIE5vbWluYWwgdHlwZSB0byByZXByZXNlbnQgYSBsb2dpY2FsIGVsZW1lbnQgd2l0aG91dCBuZWVkaW5nIHRvIGFsbG9jYXRlIGFueSBvYmplY3QgZm9yIGluc3RhbmNlc1xyXG5leHBvcnQgaW50ZXJmYWNlIExvZ2ljYWxFbGVtZW50IHsgTG9naWNhbEVsZW1lbnRfX0RPX05PVF9JTVBMRU1FTlQ6IGFueSB9O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvUmVuZGVyaW5nL0xvZ2ljYWxFbGVtZW50cy50cyIsImltcG9ydCB7IHJlZ2lzdGVyRnVuY3Rpb24gfSBmcm9tICcuLi9JbnRlcm9wL1JlZ2lzdGVyZWRGdW5jdGlvbic7XHJcbmltcG9ydCB7IHBsYXRmb3JtIH0gZnJvbSAnLi4vRW52aXJvbm1lbnQnO1xyXG5pbXBvcnQgeyBNZXRob2RIYW5kbGUsIFN5c3RlbV9TdHJpbmcgfSBmcm9tICcuLi9QbGF0Zm9ybS9QbGF0Zm9ybSc7XHJcbmNvbnN0IGh0dHBDbGllbnRBc3NlbWJseSA9ICdNaWNyb3NvZnQuQXNwTmV0Q29yZS5CbGF6b3IuQnJvd3Nlcic7XHJcbmNvbnN0IGh0dHBDbGllbnROYW1lc3BhY2UgPSBgJHtodHRwQ2xpZW50QXNzZW1ibHl9Lkh0dHBgO1xyXG5jb25zdCBodHRwQ2xpZW50VHlwZU5hbWUgPSAnQnJvd3Nlckh0dHBNZXNzYWdlSGFuZGxlcic7XHJcbmNvbnN0IGh0dHBDbGllbnRGdWxsVHlwZU5hbWUgPSBgJHtodHRwQ2xpZW50TmFtZXNwYWNlfS4ke2h0dHBDbGllbnRUeXBlTmFtZX1gO1xyXG5sZXQgcmVjZWl2ZVJlc3BvbnNlTWV0aG9kOiBNZXRob2RIYW5kbGU7XHJcblxyXG5yZWdpc3RlckZ1bmN0aW9uKGAke2h0dHBDbGllbnRGdWxsVHlwZU5hbWV9LlNlbmRgLCAoaWQ6IG51bWJlciwgbWV0aG9kOiBzdHJpbmcsIHJlcXVlc3RVcmk6IHN0cmluZywgYm9keTogc3RyaW5nIHwgbnVsbCwgaGVhZGVyc0pzb246IHN0cmluZyB8IG51bGwsIGZldGNoQXJnczogUmVxdWVzdEluaXQgfCBudWxsKSA9PiB7XHJcbiAgc2VuZEFzeW5jKGlkLCBtZXRob2QsIHJlcXVlc3RVcmksIGJvZHksIGhlYWRlcnNKc29uLCBmZXRjaEFyZ3MpO1xyXG59KTtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHNlbmRBc3luYyhpZDogbnVtYmVyLCBtZXRob2Q6IHN0cmluZywgcmVxdWVzdFVyaTogc3RyaW5nLCBib2R5OiBzdHJpbmcgfCBudWxsLCBoZWFkZXJzSnNvbjogc3RyaW5nIHwgbnVsbCwgZmV0Y2hBcmdzOiBSZXF1ZXN0SW5pdCB8IG51bGwpIHtcclxuICBsZXQgcmVzcG9uc2U6IFJlc3BvbnNlO1xyXG4gIGxldCByZXNwb25zZVRleHQ6IHN0cmluZztcclxuXHJcbiAgY29uc3QgcmVxdWVzdEluaXQ6IFJlcXVlc3RJbml0ID0gZmV0Y2hBcmdzIHx8IHt9O1xyXG4gIHJlcXVlc3RJbml0Lm1ldGhvZCA9IG1ldGhvZDtcclxuICByZXF1ZXN0SW5pdC5ib2R5ID0gYm9keSB8fCB1bmRlZmluZWQ7XHJcblxyXG4gIHRyeSB7XHJcbiAgICByZXF1ZXN0SW5pdC5oZWFkZXJzID0gaGVhZGVyc0pzb24gPyAoSlNPTi5wYXJzZShoZWFkZXJzSnNvbikgYXMgc3RyaW5nW11bXSkgOiB1bmRlZmluZWQ7XHJcblxyXG4gICAgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChyZXF1ZXN0VXJpLCByZXF1ZXN0SW5pdCk7XHJcbiAgICByZXNwb25zZVRleHQgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XHJcbiAgfSBjYXRjaCAoZXgpIHtcclxuICAgIGRpc3BhdGNoRXJyb3JSZXNwb25zZShpZCwgZXgudG9TdHJpbmcoKSk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBkaXNwYXRjaFN1Y2Nlc3NSZXNwb25zZShpZCwgcmVzcG9uc2UsIHJlc3BvbnNlVGV4dCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc3BhdGNoU3VjY2Vzc1Jlc3BvbnNlKGlkOiBudW1iZXIsIHJlc3BvbnNlOiBSZXNwb25zZSwgcmVzcG9uc2VUZXh0OiBzdHJpbmcpIHtcclxuICBjb25zdCByZXNwb25zZURlc2NyaXB0b3I6IFJlc3BvbnNlRGVzY3JpcHRvciA9IHtcclxuICAgIFN0YXR1c0NvZGU6IHJlc3BvbnNlLnN0YXR1cyxcclxuICAgIEhlYWRlcnM6IFtdXHJcbiAgfTtcclxuICByZXNwb25zZS5oZWFkZXJzLmZvckVhY2goKHZhbHVlLCBuYW1lKSA9PiB7XHJcbiAgICByZXNwb25zZURlc2NyaXB0b3IuSGVhZGVycy5wdXNoKFtuYW1lLCB2YWx1ZV0pO1xyXG4gIH0pO1xyXG5cclxuICBkaXNwYXRjaFJlc3BvbnNlKFxyXG4gICAgaWQsXHJcbiAgICBwbGF0Zm9ybS50b0RvdE5ldFN0cmluZyhKU09OLnN0cmluZ2lmeShyZXNwb25zZURlc2NyaXB0b3IpKSxcclxuICAgIHBsYXRmb3JtLnRvRG90TmV0U3RyaW5nKHJlc3BvbnNlVGV4dCksIC8vIFRPRE86IENvbnNpZGVyIGhvdyB0byBoYW5kbGUgbm9uLXN0cmluZyByZXNwb25zZXNcclxuICAgIC8qIGVycm9yTWVzc2FnZSAqLyBudWxsXHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGlzcGF0Y2hFcnJvclJlc3BvbnNlKGlkOiBudW1iZXIsIGVycm9yTWVzc2FnZTogc3RyaW5nKSB7XHJcbiAgZGlzcGF0Y2hSZXNwb25zZShcclxuICAgIGlkLFxyXG4gICAgLyogcmVzcG9uc2VEZXNjcmlwdG9yICovIG51bGwsXHJcbiAgICAvKiByZXNwb25zZVRleHQgKi8gbnVsbCxcclxuICAgIHBsYXRmb3JtLnRvRG90TmV0U3RyaW5nKGVycm9yTWVzc2FnZSlcclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwYXRjaFJlc3BvbnNlKGlkOiBudW1iZXIsIHJlc3BvbnNlRGVzY3JpcHRvcjogU3lzdGVtX1N0cmluZyB8IG51bGwsIHJlc3BvbnNlVGV4dDogU3lzdGVtX1N0cmluZyB8IG51bGwsIGVycm9yTWVzc2FnZTogU3lzdGVtX1N0cmluZyB8IG51bGwpIHtcclxuICBpZiAoIXJlY2VpdmVSZXNwb25zZU1ldGhvZCkge1xyXG4gICAgcmVjZWl2ZVJlc3BvbnNlTWV0aG9kID0gcGxhdGZvcm0uZmluZE1ldGhvZChcclxuICAgICAgaHR0cENsaWVudEFzc2VtYmx5LFxyXG4gICAgICBodHRwQ2xpZW50TmFtZXNwYWNlLFxyXG4gICAgICBodHRwQ2xpZW50VHlwZU5hbWUsXHJcbiAgICAgICdSZWNlaXZlUmVzcG9uc2UnXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcGxhdGZvcm0uY2FsbE1ldGhvZChyZWNlaXZlUmVzcG9uc2VNZXRob2QsIG51bGwsIFtcclxuICAgIHBsYXRmb3JtLnRvRG90TmV0U3RyaW5nKGlkLnRvU3RyaW5nKCkpLFxyXG4gICAgcmVzcG9uc2VEZXNjcmlwdG9yLFxyXG4gICAgcmVzcG9uc2VUZXh0LFxyXG4gICAgZXJyb3JNZXNzYWdlLFxyXG4gIF0pO1xyXG59XHJcblxyXG4vLyBLZWVwIHRoaXMgaW4gc3luYyB3aXRoIHRoZSAuTkVUIGVxdWl2YWxlbnQgaW4gSHR0cENsaWVudC5jc1xyXG5pbnRlcmZhY2UgUmVzcG9uc2VEZXNjcmlwdG9yIHtcclxuICAvLyBXZSBkb24ndCBoYXZlIEJvZHlUZXh0IGluIGhlcmUgYmVjYXVzZSBpZiB3ZSBkaWQsIHRoZW4gaW4gdGhlIEpTT04tcmVzcG9uc2UgY2FzZSAod2hpY2hcclxuICAvLyBpcyB0aGUgbW9zdCBjb21tb24gY2FzZSksIHdlJ2QgYmUgZG91YmxlLWVuY29kaW5nIGl0LCBzaW5jZSB0aGUgZW50aXJlIFJlc3BvbnNlRGVzY3JpcHRvclxyXG4gIC8vIGFsc28gZ2V0cyBKU09OIGVuY29kZWQuIEl0IHdvdWxkIHdvcmsgYnV0IGlzIHR3aWNlIHRoZSBhbW91bnQgb2Ygc3RyaW5nIHByb2Nlc3NpbmcuXHJcbiAgU3RhdHVzQ29kZTogbnVtYmVyO1xyXG4gIEhlYWRlcnM6IHN0cmluZ1tdW107XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1NlcnZpY2VzL0h0dHAudHMiLCJpbXBvcnQgeyBwbGF0Zm9ybSB9IGZyb20gJy4vRW52aXJvbm1lbnQnXHJcbmltcG9ydCB7IHJlZ2lzdGVyRnVuY3Rpb24gfSBmcm9tICcuL0ludGVyb3AvUmVnaXN0ZXJlZEZ1bmN0aW9uJztcclxuaW1wb3J0IHsgbmF2aWdhdGVUbyB9IGZyb20gJy4vU2VydmljZXMvVXJpSGVscGVyJztcclxuXHJcbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xyXG4gIC8vIFdoZW4gdGhlIGxpYnJhcnkgaXMgbG9hZGVkIGluIGEgYnJvd3NlciB2aWEgYSA8c2NyaXB0PiBlbGVtZW50LCBtYWtlIHRoZVxyXG4gIC8vIGZvbGxvd2luZyBBUElzIGF2YWlsYWJsZSBpbiBnbG9iYWwgc2NvcGUgZm9yIGludm9jYXRpb24gZnJvbSBKU1xyXG4gIHdpbmRvd1snQmxhem9yJ10gPSB7XHJcbiAgICBwbGF0Zm9ybSxcclxuICAgIHJlZ2lzdGVyRnVuY3Rpb24sXHJcbiAgICBuYXZpZ2F0ZVRvLFxyXG4gIH07XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0dsb2JhbEV4cG9ydHMudHMiXSwic291cmNlUm9vdCI6IiJ9
