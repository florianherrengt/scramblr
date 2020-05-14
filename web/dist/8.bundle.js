(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "./src/pages/Notifier.ts":
/*!*******************************!*\
  !*** ./src/pages/Notifier.ts ***!
  \*******************************/
/*! exports provided: Notifier, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Notifier", function() { return Notifier; });
/* harmony import */ var notistack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! notistack */ "./node_modules/notistack/build/index.js");
/* harmony import */ var notistack__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(notistack__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _redux_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../redux/actions */ "./src/redux/actions.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};




var displayed = [];
var Notifier = function () {
    var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useDispatch"])();
    var notifications = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"])(function (state) { return state.notifier.notifications || []; });
    var _a = Object(notistack__WEBPACK_IMPORTED_MODULE_0__["useSnackbar"])(), enqueueSnackbar = _a.enqueueSnackbar, closeSnackbar = _a.closeSnackbar;
    var storeDisplayed = function (id) {
        displayed = __spreadArrays(displayed, [id]);
    };
    var removeDisplayed = function (id) {
        displayed = __spreadArrays(displayed.filter(function (key) { return id !== key; }));
    };
    react__WEBPACK_IMPORTED_MODULE_1___default.a.useEffect(function () {
        notifications.forEach(function (_a) {
            var key = _a.key, message = _a.message, _b = _a.options, options = _b === void 0 ? {} : _b, _c = _a.dismissed, dismissed = _c === void 0 ? false : _c;
            if (dismissed) {
                // dismiss snackbar using notistack
                closeSnackbar(key);
                return;
            }
            // do nothing if snackbar is already displayed
            if (displayed.includes(key))
                return;
            // display snackbar using notistack
            enqueueSnackbar(message, __assign(__assign({ key: key }, options), { onClose: function (event, reason, myKey) {
                    if (options.onClose) {
                        options.onClose(event, reason, myKey);
                    }
                }, onExited: function (event, myKey) {
                    // removen this snackbar from redux store
                    dispatch(Object(_redux_actions__WEBPACK_IMPORTED_MODULE_3__["removeSnackbar"])(myKey));
                    removeDisplayed(myKey);
                } }));
            // keep track of snackbars that we've displayed
            storeDisplayed(key);
        });
    }, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);
    return null;
};
/* harmony default export */ __webpack_exports__["default"] = (Notifier);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvTm90aWZpZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxnQkFBZ0IsU0FBSSxJQUFJLFNBQUk7QUFDNUI7QUFDQSxnREFBZ0QsT0FBTztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLFNBQUksSUFBSSxTQUFJO0FBQ2xDLGlEQUFpRCxRQUFRO0FBQ3pELHdDQUF3QyxRQUFRO0FBQ2hELHdEQUF3RCxRQUFRO0FBQ2hFO0FBQ0E7QUFDQTtBQUN3QztBQUNkO0FBQzZCO0FBQ0w7QUFDbEQ7QUFDTztBQUNQLG1CQUFtQiwrREFBVztBQUM5Qix3QkFBd0IsK0RBQVcsbUJBQW1CLDJDQUEyQyxFQUFFO0FBQ25HLGFBQWEsNkRBQVc7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvRUFBb0UsbUJBQW1CLEVBQUU7QUFDekY7QUFDQSxJQUFJLDRDQUFLO0FBQ1Q7QUFDQSxpR0FBaUc7QUFDakc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXdELFdBQVcsYUFBYTtBQUNoRjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSw2QkFBNkIscUVBQWM7QUFDM0M7QUFDQSxpQkFBaUIsRUFBRTtBQUNuQjtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ2UsdUVBQVEsRUFBQyIsImZpbGUiOiI4LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG52YXIgX19zcHJlYWRBcnJheXMgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkQXJyYXlzKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xuICAgIHJldHVybiByO1xufTtcbmltcG9ydCB7IHVzZVNuYWNrYmFyIH0gZnJvbSAnbm90aXN0YWNrJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VEaXNwYXRjaCwgdXNlU2VsZWN0b3IgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyByZW1vdmVTbmFja2JhciB9IGZyb20gJy4uL3JlZHV4L2FjdGlvbnMnO1xudmFyIGRpc3BsYXllZCA9IFtdO1xuZXhwb3J0IHZhciBOb3RpZmllciA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZGlzcGF0Y2ggPSB1c2VEaXNwYXRjaCgpO1xuICAgIHZhciBub3RpZmljYXRpb25zID0gdXNlU2VsZWN0b3IoZnVuY3Rpb24gKHN0YXRlKSB7IHJldHVybiBzdGF0ZS5ub3RpZmllci5ub3RpZmljYXRpb25zIHx8IFtdOyB9KTtcbiAgICB2YXIgX2EgPSB1c2VTbmFja2JhcigpLCBlbnF1ZXVlU25hY2tiYXIgPSBfYS5lbnF1ZXVlU25hY2tiYXIsIGNsb3NlU25hY2tiYXIgPSBfYS5jbG9zZVNuYWNrYmFyO1xuICAgIHZhciBzdG9yZURpc3BsYXllZCA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICBkaXNwbGF5ZWQgPSBfX3NwcmVhZEFycmF5cyhkaXNwbGF5ZWQsIFtpZF0pO1xuICAgIH07XG4gICAgdmFyIHJlbW92ZURpc3BsYXllZCA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICBkaXNwbGF5ZWQgPSBfX3NwcmVhZEFycmF5cyhkaXNwbGF5ZWQuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIGlkICE9PSBrZXk7IH0pKTtcbiAgICB9O1xuICAgIFJlYWN0LnVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICAgIG5vdGlmaWNhdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBfYS5rZXksIG1lc3NhZ2UgPSBfYS5tZXNzYWdlLCBfYiA9IF9hLm9wdGlvbnMsIG9wdGlvbnMgPSBfYiA9PT0gdm9pZCAwID8ge30gOiBfYiwgX2MgPSBfYS5kaXNtaXNzZWQsIGRpc21pc3NlZCA9IF9jID09PSB2b2lkIDAgPyBmYWxzZSA6IF9jO1xuICAgICAgICAgICAgaWYgKGRpc21pc3NlZCkge1xuICAgICAgICAgICAgICAgIC8vIGRpc21pc3Mgc25hY2tiYXIgdXNpbmcgbm90aXN0YWNrXG4gICAgICAgICAgICAgICAgY2xvc2VTbmFja2JhcihrZXkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGRvIG5vdGhpbmcgaWYgc25hY2tiYXIgaXMgYWxyZWFkeSBkaXNwbGF5ZWRcbiAgICAgICAgICAgIGlmIChkaXNwbGF5ZWQuaW5jbHVkZXMoa2V5KSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAvLyBkaXNwbGF5IHNuYWNrYmFyIHVzaW5nIG5vdGlzdGFja1xuICAgICAgICAgICAgZW5xdWV1ZVNuYWNrYmFyKG1lc3NhZ2UsIF9fYXNzaWduKF9fYXNzaWduKHsga2V5OiBrZXkgfSwgb3B0aW9ucyksIHsgb25DbG9zZTogZnVuY3Rpb24gKGV2ZW50LCByZWFzb24sIG15S2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLm9uQ2xvc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMub25DbG9zZShldmVudCwgcmVhc29uLCBteUtleSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBvbkV4aXRlZDogZnVuY3Rpb24gKGV2ZW50LCBteUtleSkge1xuICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmVuIHRoaXMgc25hY2tiYXIgZnJvbSByZWR1eCBzdG9yZVxuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChyZW1vdmVTbmFja2JhcihteUtleSkpO1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVEaXNwbGF5ZWQobXlLZXkpO1xuICAgICAgICAgICAgICAgIH0gfSkpO1xuICAgICAgICAgICAgLy8ga2VlcCB0cmFjayBvZiBzbmFja2JhcnMgdGhhdCB3ZSd2ZSBkaXNwbGF5ZWRcbiAgICAgICAgICAgIHN0b3JlRGlzcGxheWVkKGtleSk7XG4gICAgICAgIH0pO1xuICAgIH0sIFtub3RpZmljYXRpb25zLCBjbG9zZVNuYWNrYmFyLCBlbnF1ZXVlU25hY2tiYXIsIGRpc3BhdGNoXSk7XG4gICAgcmV0dXJuIG51bGw7XG59O1xuZXhwb3J0IGRlZmF1bHQgTm90aWZpZXI7XG4iXSwic291cmNlUm9vdCI6IiJ9