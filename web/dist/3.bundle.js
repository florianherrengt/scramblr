(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./node_modules/@stripe/stripe-js/dist/stripe.esm.js":
/*!***********************************************************!*\
  !*** ./node_modules/@stripe/stripe-js/dist/stripe.esm.js ***!
  \***********************************************************/
/*! exports provided: loadStripe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadStripe", function() { return loadStripe; });
var V3_URL = 'https://js.stripe.com/v3';

var injectScript = function injectScript() {
  var script = document.createElement('script');
  script.src = V3_URL;
  var headOrBody = document.head || document.body;

  if (!headOrBody) {
    throw new Error('Expected document.body not to be null. Stripe.js requires a <body> element.');
  }

  headOrBody.appendChild(script);
  return script;
};

var registerWrapper = function registerWrapper(stripe) {
  if (!stripe || !stripe._registerWrapper) {
    return;
  }

  stripe._registerWrapper({
    name: 'stripe-js',
    version: "1.3.1"
  });
}; // Execute our own script injection after a tick to give users time to
// do their own script injection.


var stripePromise = Promise.resolve().then(function () {
  if (typeof window === 'undefined') {
    // Resolve to null when imported server side. This makes the module
    // safe to import in an isomorphic code base.
    return null;
  }

  if (window.Stripe) {
    return window.Stripe;
  }

  var script = document.querySelector("script[src=\"".concat(V3_URL, "\"], script[src=\"").concat(V3_URL, "/\"]")) || injectScript();
  return new Promise(function (resolve, reject) {
    script.addEventListener('load', function () {
      if (window.Stripe) {
        resolve(window.Stripe);
      } else {
        reject(new Error('Stripe.js not available'));
      }
    });
    script.addEventListener('error', function () {
      reject(new Error('Failed to load Stripe.js'));
    });
  });
});
var loadCalled = false;
stripePromise["catch"](function (err) {
  if (!loadCalled) console.warn(err);
});
var loadStripe = function loadStripe() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  loadCalled = true;
  return stripePromise.then(function (maybeStripe) {
    if (maybeStripe === null) {
      return null;
    }

    var stripe = maybeStripe.apply(void 0, args);
    registerWrapper(stripe);
    return stripe;
  });
};




/***/ }),

/***/ "./src/pages/Settings/SettingsPage.tsx":
/*!*********************************************!*\
  !*** ./src/pages/Settings/SettingsPage.tsx ***!
  \*********************************************/
/*! exports provided: SettingsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsPage", function() { return SettingsPage; });
/* harmony import */ var _stripe_stripe_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @stripe/stripe-js */ "./node_modules/@stripe/stripe-js/dist/stripe.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components */ "./src/components/index.tsx");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../helpers */ "./src/helpers/index.ts");
/* harmony import */ var _redux_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../redux/actions */ "./src/redux/actions.ts");
/* harmony import */ var _Notes_AesPassphraseContainer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Notes/AesPassphraseContainer */ "./src/pages/Notes/AesPassphraseContainer.tsx");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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







var SettingsPage = function (props) {
    var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useDispatch"])();
    var currentUser = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"])(function (state) { return state.currentUser; });
    var subscription = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"])(function (state) { return state.subscription; });
    var _a = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false), checkoutLoading = _a[0], setCheckoutLoading = _a[1];
    Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
        dispatch(Object(_redux_actions__WEBPACK_IMPORTED_MODULE_5__["fetchCurrentUser"])());
        dispatch(Object(_redux_actions__WEBPACK_IMPORTED_MODULE_5__["fetchPaymentMethods"])());
    }, [dispatch]);
    var onSubscribeClick = function () { return __awaiter(void 0, void 0, void 0, function () {
        var api, stripeSessionId, stripe;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setCheckoutLoading(true);
                    api = Object(_helpers__WEBPACK_IMPORTED_MODULE_4__["getApi"])();
                    return [4 /*yield*/, api.getStripeSessionId({})];
                case 1:
                    stripeSessionId = (_b.sent()).stripeSessionId;
                    return [4 /*yield*/, Object(_stripe_stripe_js__WEBPACK_IMPORTED_MODULE_0__["loadStripe"])('pk_test_nNJ1yhjyNrssOiEOf9NPxJ4w00mtI6Cxha')];
                case 2:
                    stripe = _b.sent();
                    return [4 /*yield*/, ((_a = stripe) === null || _a === void 0 ? void 0 : _a.redirectToCheckout({
                            sessionId: stripeSessionId,
                        }))];
                case 3:
                    _b.sent();
                    setCheckoutLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var onUpdateDefaultPaymentMethod = function (paymentMethodId) {
        dispatch(Object(_redux_actions__WEBPACK_IMPORTED_MODULE_5__["updateDefaultPaymentMethod"])(paymentMethodId));
    };
    var onDeletePaymentMethod = function (paymentMethodId) {
        dispatch(Object(_redux_actions__WEBPACK_IMPORTED_MODULE_5__["deletePaymentMethod"])(paymentMethodId));
    };
    var onCancelSubscription = function () {
        dispatch(Object(_redux_actions__WEBPACK_IMPORTED_MODULE_5__["cancelSubscription"])());
    };
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: 'SettingsPage' },
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_3__["LineSpacer"], null),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Notes_AesPassphraseContainer__WEBPACK_IMPORTED_MODULE_6__["AesPassphraseContainer"], { submitLabel: 'Save' }),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_3__["LineSpacer"], null),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_3__["Settings"], { subscription: subscription, checkoutLoading: checkoutLoading, onCancelSubscription: onCancelSubscription, onDeletePaymentMethod: onDeletePaymentMethod, onUpdateDefaultPaymentMethod: onUpdateDefaultPaymentMethod, onSubscribeClick: function () { return onSubscribeClick(); }, onResendEmailClick: function () { return dispatch(Object(_redux_actions__WEBPACK_IMPORTED_MODULE_5__["resendConfirmEmail"])({})); }, onUpdateEmail: function (input) { return dispatch(Object(_redux_actions__WEBPACK_IMPORTED_MODULE_5__["updateEmail"])(input)); }, currentUser: currentUser, onLogoutClick: function () { return dispatch(Object(_redux_actions__WEBPACK_IMPORTED_MODULE_5__["signOut"])()); }, onExportClick: function (entity) {
                return window.open("/api/export/" + entity, '_blank');
            } })));
};


/***/ }),

/***/ "./src/pages/Settings/index.tsx":
/*!**************************************!*\
  !*** ./src/pages/Settings/index.tsx ***!
  \**************************************/
/*! exports provided: SettingsPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SettingsPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SettingsPage */ "./src/pages/Settings/SettingsPage.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SettingsPage", function() { return _SettingsPage__WEBPACK_IMPORTED_MODULE_0__["SettingsPage"]; });



/* harmony default export */ __webpack_exports__["default"] = (_SettingsPage__WEBPACK_IMPORTED_MODULE_0__["SettingsPage"]);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHN0cmlwZS9zdHJpcGUtanMvZGlzdC9zdHJpcGUuZXNtLmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9TZXR0aW5ncy9TZXR0aW5nc1BhZ2UudHN4Iiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9TZXR0aW5ncy9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxxRUFBcUUsYUFBYTtBQUNsRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVzQjs7Ozs7Ozs7Ozs7OztBQzFFdEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBaUIsU0FBSSxJQUFJLFNBQUk7QUFDN0IsMkJBQTJCLCtEQUErRCxnQkFBZ0IsRUFBRSxFQUFFO0FBQzlHO0FBQ0EsbUNBQW1DLE1BQU0sNkJBQTZCLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDakcsa0NBQWtDLE1BQU0saUNBQWlDLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDcEcsK0JBQStCLHFGQUFxRjtBQUNwSDtBQUNBLEtBQUs7QUFDTDtBQUNBLG1CQUFtQixTQUFJLElBQUksU0FBSTtBQUMvQixhQUFhLDZCQUE2QiwwQkFBMEIsYUFBYSxFQUFFLHFCQUFxQjtBQUN4RyxnQkFBZ0IscURBQXFELG9FQUFvRSxhQUFhLEVBQUU7QUFDeEosc0JBQXNCLHNCQUFzQixxQkFBcUIsR0FBRztBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkMsa0NBQWtDLFNBQVM7QUFDM0Msa0NBQWtDLFdBQVcsVUFBVTtBQUN2RCx5Q0FBeUMsY0FBYztBQUN2RDtBQUNBLDZHQUE2RyxPQUFPLFVBQVU7QUFDOUgsZ0ZBQWdGLGlCQUFpQixPQUFPO0FBQ3hHLHdEQUF3RCxnQkFBZ0IsUUFBUSxPQUFPO0FBQ3ZGLDhDQUE4QyxnQkFBZ0IsZ0JBQWdCLE9BQU87QUFDckY7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBLFNBQVMsWUFBWSxhQUFhLE9BQU8sRUFBRSxVQUFVLFdBQVc7QUFDaEUsbUNBQW1DLFNBQVM7QUFDNUM7QUFDQTtBQUMrQztBQUNJO0FBQ0k7QUFDQztBQUNqQjtBQUNxSjtBQUNuSDtBQUNsRTtBQUNQLG1CQUFtQiwrREFBVztBQUM5QixzQkFBc0IsK0RBQVcsbUJBQW1CLDBCQUEwQixFQUFFO0FBQ2hGLHVCQUF1QiwrREFBVyxtQkFBbUIsMkJBQTJCLEVBQUU7QUFDbEYsYUFBYSxzREFBUTtBQUNyQixJQUFJLHVEQUFTO0FBQ2IsaUJBQWlCLHVFQUFnQjtBQUNqQyxpQkFBaUIsMEVBQW1CO0FBQ3BDLEtBQUs7QUFDTCx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLHVEQUFNO0FBQ2hDLGtFQUFrRTtBQUNsRTtBQUNBO0FBQ0EseUNBQXlDLG9FQUFVO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSyxFQUFFO0FBQ1A7QUFDQSxpQkFBaUIsaUZBQTBCO0FBQzNDO0FBQ0E7QUFDQSxpQkFBaUIsMEVBQW1CO0FBQ3BDO0FBQ0E7QUFDQSxpQkFBaUIseUVBQWtCO0FBQ25DO0FBQ0EsWUFBWSw0Q0FBSyx1QkFBdUIsNEJBQTRCO0FBQ3BFLFFBQVEsNENBQUssZUFBZSxzREFBVTtBQUN0QyxRQUFRLDRDQUFLLGVBQWUsb0ZBQXNCLEdBQUcsc0JBQXNCO0FBQzNFLFFBQVEsNENBQUssZUFBZSxzREFBVTtBQUN0QyxRQUFRLDRDQUFLLGVBQWUsb0RBQVEsR0FBRyxvUEFBb1AsMkJBQTJCLEVBQUUsbUNBQW1DLGlCQUFpQix5RUFBa0IsR0FBRyxHQUFHLEVBQUUsbUNBQW1DLGlCQUFpQixrRUFBVyxTQUFTLEVBQUUsd0RBQXdELGlCQUFpQiw4REFBTyxJQUFJLEVBQUU7QUFDdGlCO0FBQ0EsYUFBYSxFQUFFO0FBQ2Y7Ozs7Ozs7Ozs7Ozs7QUM1RkE7QUFBQTtBQUFBO0FBQUE7QUFBOEM7QUFDZjtBQUNoQix5SEFBWSxFQUFDIiwiZmlsZSI6IjMuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFYzX1VSTCA9ICdodHRwczovL2pzLnN0cmlwZS5jb20vdjMnO1xuXG52YXIgaW5qZWN0U2NyaXB0ID0gZnVuY3Rpb24gaW5qZWN0U2NyaXB0KCkge1xuICB2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gIHNjcmlwdC5zcmMgPSBWM19VUkw7XG4gIHZhciBoZWFkT3JCb2R5ID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5ib2R5O1xuXG4gIGlmICghaGVhZE9yQm9keSkge1xuICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgZG9jdW1lbnQuYm9keSBub3QgdG8gYmUgbnVsbC4gU3RyaXBlLmpzIHJlcXVpcmVzIGEgPGJvZHk+IGVsZW1lbnQuJyk7XG4gIH1cblxuICBoZWFkT3JCb2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gIHJldHVybiBzY3JpcHQ7XG59O1xuXG52YXIgcmVnaXN0ZXJXcmFwcGVyID0gZnVuY3Rpb24gcmVnaXN0ZXJXcmFwcGVyKHN0cmlwZSkge1xuICBpZiAoIXN0cmlwZSB8fCAhc3RyaXBlLl9yZWdpc3RlcldyYXBwZXIpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBzdHJpcGUuX3JlZ2lzdGVyV3JhcHBlcih7XG4gICAgbmFtZTogJ3N0cmlwZS1qcycsXG4gICAgdmVyc2lvbjogXCIxLjMuMVwiXG4gIH0pO1xufTsgLy8gRXhlY3V0ZSBvdXIgb3duIHNjcmlwdCBpbmplY3Rpb24gYWZ0ZXIgYSB0aWNrIHRvIGdpdmUgdXNlcnMgdGltZSB0b1xuLy8gZG8gdGhlaXIgb3duIHNjcmlwdCBpbmplY3Rpb24uXG5cblxudmFyIHN0cmlwZVByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gUmVzb2x2ZSB0byBudWxsIHdoZW4gaW1wb3J0ZWQgc2VydmVyIHNpZGUuIFRoaXMgbWFrZXMgdGhlIG1vZHVsZVxuICAgIC8vIHNhZmUgdG8gaW1wb3J0IGluIGFuIGlzb21vcnBoaWMgY29kZSBiYXNlLlxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgaWYgKHdpbmRvdy5TdHJpcGUpIHtcbiAgICByZXR1cm4gd2luZG93LlN0cmlwZTtcbiAgfVxuXG4gIHZhciBzY3JpcHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwic2NyaXB0W3NyYz1cXFwiXCIuY29uY2F0KFYzX1VSTCwgXCJcXFwiXSwgc2NyaXB0W3NyYz1cXFwiXCIpLmNvbmNhdChWM19VUkwsIFwiL1xcXCJdXCIpKSB8fCBpbmplY3RTY3JpcHQoKTtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICBzY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh3aW5kb3cuU3RyaXBlKSB7XG4gICAgICAgIHJlc29sdmUod2luZG93LlN0cmlwZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWplY3QobmV3IEVycm9yKCdTdHJpcGUuanMgbm90IGF2YWlsYWJsZScpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBzY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZWplY3QobmV3IEVycm9yKCdGYWlsZWQgdG8gbG9hZCBTdHJpcGUuanMnKSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG52YXIgbG9hZENhbGxlZCA9IGZhbHNlO1xuc3RyaXBlUHJvbWlzZVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgaWYgKCFsb2FkQ2FsbGVkKSBjb25zb2xlLndhcm4oZXJyKTtcbn0pO1xudmFyIGxvYWRTdHJpcGUgPSBmdW5jdGlvbiBsb2FkU3RyaXBlKCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgbG9hZENhbGxlZCA9IHRydWU7XG4gIHJldHVybiBzdHJpcGVQcm9taXNlLnRoZW4oZnVuY3Rpb24gKG1heWJlU3RyaXBlKSB7XG4gICAgaWYgKG1heWJlU3RyaXBlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgc3RyaXBlID0gbWF5YmVTdHJpcGUuYXBwbHkodm9pZCAwLCBhcmdzKTtcbiAgICByZWdpc3RlcldyYXBwZXIoc3RyaXBlKTtcbiAgICByZXR1cm4gc3RyaXBlO1xuICB9KTtcbn07XG5cbmV4cG9ydCB7IGxvYWRTdHJpcGUgfTtcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG5pbXBvcnQgeyBsb2FkU3RyaXBlIH0gZnJvbSAnQHN0cmlwZS9zdHJpcGUtanMnO1xuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VEaXNwYXRjaCwgdXNlU2VsZWN0b3IgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBMaW5lU3BhY2VyLCBTZXR0aW5ncyB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMnO1xuaW1wb3J0IHsgZ2V0QXBpIH0gZnJvbSAnLi4vLi4vaGVscGVycyc7XG5pbXBvcnQgeyBjYW5jZWxTdWJzY3JpcHRpb24sIGRlbGV0ZVBheW1lbnRNZXRob2QsIGZldGNoQ3VycmVudFVzZXIsIGZldGNoUGF5bWVudE1ldGhvZHMsIHJlc2VuZENvbmZpcm1FbWFpbCwgc2lnbk91dCwgdXBkYXRlRGVmYXVsdFBheW1lbnRNZXRob2QsIHVwZGF0ZUVtYWlsLCB9IGZyb20gJy4uLy4uL3JlZHV4L2FjdGlvbnMnO1xuaW1wb3J0IHsgQWVzUGFzc3BocmFzZUNvbnRhaW5lciB9IGZyb20gJy4uL05vdGVzL0Flc1Bhc3NwaHJhc2VDb250YWluZXInO1xuZXhwb3J0IHZhciBTZXR0aW5nc1BhZ2UgPSBmdW5jdGlvbiAocHJvcHMpIHtcbiAgICB2YXIgZGlzcGF0Y2ggPSB1c2VEaXNwYXRjaCgpO1xuICAgIHZhciBjdXJyZW50VXNlciA9IHVzZVNlbGVjdG9yKGZ1bmN0aW9uIChzdGF0ZSkgeyByZXR1cm4gc3RhdGUuY3VycmVudFVzZXI7IH0pO1xuICAgIHZhciBzdWJzY3JpcHRpb24gPSB1c2VTZWxlY3RvcihmdW5jdGlvbiAoc3RhdGUpIHsgcmV0dXJuIHN0YXRlLnN1YnNjcmlwdGlvbjsgfSk7XG4gICAgdmFyIF9hID0gdXNlU3RhdGUoZmFsc2UpLCBjaGVja291dExvYWRpbmcgPSBfYVswXSwgc2V0Q2hlY2tvdXRMb2FkaW5nID0gX2FbMV07XG4gICAgdXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZGlzcGF0Y2goZmV0Y2hDdXJyZW50VXNlcigpKTtcbiAgICAgICAgZGlzcGF0Y2goZmV0Y2hQYXltZW50TWV0aG9kcygpKTtcbiAgICB9LCBbZGlzcGF0Y2hdKTtcbiAgICB2YXIgb25TdWJzY3JpYmVDbGljayA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhcGksIHN0cmlwZVNlc3Npb25JZCwgc3RyaXBlO1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIHNldENoZWNrb3V0TG9hZGluZyh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgYXBpID0gZ2V0QXBpKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGFwaS5nZXRTdHJpcGVTZXNzaW9uSWQoe30pXTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIHN0cmlwZVNlc3Npb25JZCA9IChfYi5zZW50KCkpLnN0cmlwZVNlc3Npb25JZDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgbG9hZFN0cmlwZSgncGtfdGVzdF9uTkoxeWhqeU5yc3NPaUVPZjlOUHhKNHcwMG10STZDeGhhJyldO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgc3RyaXBlID0gX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCAoKF9hID0gc3RyaXBlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVkaXJlY3RUb0NoZWNrb3V0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXNzaW9uSWQ6IHN0cmlwZVNlc3Npb25JZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKV07XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHNldENoZWNrb3V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7IH07XG4gICAgdmFyIG9uVXBkYXRlRGVmYXVsdFBheW1lbnRNZXRob2QgPSBmdW5jdGlvbiAocGF5bWVudE1ldGhvZElkKSB7XG4gICAgICAgIGRpc3BhdGNoKHVwZGF0ZURlZmF1bHRQYXltZW50TWV0aG9kKHBheW1lbnRNZXRob2RJZCkpO1xuICAgIH07XG4gICAgdmFyIG9uRGVsZXRlUGF5bWVudE1ldGhvZCA9IGZ1bmN0aW9uIChwYXltZW50TWV0aG9kSWQpIHtcbiAgICAgICAgZGlzcGF0Y2goZGVsZXRlUGF5bWVudE1ldGhvZChwYXltZW50TWV0aG9kSWQpKTtcbiAgICB9O1xuICAgIHZhciBvbkNhbmNlbFN1YnNjcmlwdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZGlzcGF0Y2goY2FuY2VsU3Vic2NyaXB0aW9uKCkpO1xuICAgIH07XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiAnU2V0dGluZ3NQYWdlJyB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KExpbmVTcGFjZXIsIG51bGwpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEFlc1Bhc3NwaHJhc2VDb250YWluZXIsIHsgc3VibWl0TGFiZWw6ICdTYXZlJyB9KSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChMaW5lU3BhY2VyLCBudWxsKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTZXR0aW5ncywgeyBzdWJzY3JpcHRpb246IHN1YnNjcmlwdGlvbiwgY2hlY2tvdXRMb2FkaW5nOiBjaGVja291dExvYWRpbmcsIG9uQ2FuY2VsU3Vic2NyaXB0aW9uOiBvbkNhbmNlbFN1YnNjcmlwdGlvbiwgb25EZWxldGVQYXltZW50TWV0aG9kOiBvbkRlbGV0ZVBheW1lbnRNZXRob2QsIG9uVXBkYXRlRGVmYXVsdFBheW1lbnRNZXRob2Q6IG9uVXBkYXRlRGVmYXVsdFBheW1lbnRNZXRob2QsIG9uU3Vic2NyaWJlQ2xpY2s6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG9uU3Vic2NyaWJlQ2xpY2soKTsgfSwgb25SZXNlbmRFbWFpbENsaWNrOiBmdW5jdGlvbiAoKSB7IHJldHVybiBkaXNwYXRjaChyZXNlbmRDb25maXJtRW1haWwoe30pKTsgfSwgb25VcGRhdGVFbWFpbDogZnVuY3Rpb24gKGlucHV0KSB7IHJldHVybiBkaXNwYXRjaCh1cGRhdGVFbWFpbChpbnB1dCkpOyB9LCBjdXJyZW50VXNlcjogY3VycmVudFVzZXIsIG9uTG9nb3V0Q2xpY2s6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRpc3BhdGNoKHNpZ25PdXQoKSk7IH0sIG9uRXhwb3J0Q2xpY2s6IGZ1bmN0aW9uIChlbnRpdHkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93Lm9wZW4oXCIvYXBpL2V4cG9ydC9cIiArIGVudGl0eSwgJ19ibGFuaycpO1xuICAgICAgICAgICAgfSB9KSkpO1xufTtcbiIsImltcG9ydCB7IFNldHRpbmdzUGFnZSB9IGZyb20gJy4vU2V0dGluZ3NQYWdlJztcbmV4cG9ydCAqIGZyb20gJy4vU2V0dGluZ3NQYWdlJztcbmV4cG9ydCBkZWZhdWx0IFNldHRpbmdzUGFnZTtcbiJdLCJzb3VyY2VSb290IjoiIn0=