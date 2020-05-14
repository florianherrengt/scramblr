(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./src/pages/Insights/InsightsPage.tsx":
/*!*********************************************!*\
  !*** ./src/pages/Insights/InsightsPage.tsx ***!
  \*********************************************/
/*! exports provided: InsightsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InsightsPage", function() { return InsightsPage; });
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _components___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/ */ "./src/components/index.tsx");
/* harmony import */ var _redux_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../redux/actions */ "./src/redux/actions.ts");





var InsightsPage = function () {
    var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useDispatch"])();
    var insights = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"])(function (state) { return state.insights; });
    Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
        dispatch(Object(_redux_actions__WEBPACK_IMPORTED_MODULE_4__["fetchInsights"])());
    }, [dispatch]);
    if (insights.isFetching) {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__["CircularProgress"], null);
    }
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components___WEBPACK_IMPORTED_MODULE_3__["EmotionsCharts"], { data: insights.insights });
};


/***/ }),

/***/ "./src/pages/Insights/index.tsx":
/*!**************************************!*\
  !*** ./src/pages/Insights/index.tsx ***!
  \**************************************/
/*! exports provided: InsightsPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _InsightsPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./InsightsPage */ "./src/pages/Insights/InsightsPage.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InsightsPage", function() { return _InsightsPage__WEBPACK_IMPORTED_MODULE_0__["InsightsPage"]; });



/* harmony default export */ __webpack_exports__["default"] = (_InsightsPage__WEBPACK_IMPORTED_MODULE_0__["InsightsPage"]);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvSW5zaWdodHMvSW5zaWdodHNQYWdlLnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvSW5zaWdodHMvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXFEO0FBQ1o7QUFDYztBQUNKO0FBQ0M7QUFDN0M7QUFDUCxtQkFBbUIsK0RBQVc7QUFDOUIsbUJBQW1CLCtEQUFXLG1CQUFtQix1QkFBdUIsRUFBRTtBQUMxRSxJQUFJLHVEQUFTO0FBQ2IsaUJBQWlCLG9FQUFhO0FBQzlCLEtBQUs7QUFDTDtBQUNBLGVBQWUsNENBQUssZUFBZSxrRUFBZ0I7QUFDbkQ7QUFDQSxXQUFXLDRDQUFLLGVBQWUsMkRBQWMsR0FBRywwQkFBMEI7QUFDMUU7Ozs7Ozs7Ozs7Ozs7QUNmQTtBQUFBO0FBQUE7QUFBQTtBQUE4QztBQUNmO0FBQ2hCLHlIQUFZLEVBQUMiLCJmaWxlIjoiNS5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaXJjdWxhclByb2dyZXNzIH0gZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUnO1xuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZURpc3BhdGNoLCB1c2VTZWxlY3RvciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IEVtb3Rpb25zQ2hhcnRzIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy8nO1xuaW1wb3J0IHsgZmV0Y2hJbnNpZ2h0cyB9IGZyb20gJy4uLy4uL3JlZHV4L2FjdGlvbnMnO1xuZXhwb3J0IHZhciBJbnNpZ2h0c1BhZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGRpc3BhdGNoID0gdXNlRGlzcGF0Y2goKTtcbiAgICB2YXIgaW5zaWdodHMgPSB1c2VTZWxlY3RvcihmdW5jdGlvbiAoc3RhdGUpIHsgcmV0dXJuIHN0YXRlLmluc2lnaHRzOyB9KTtcbiAgICB1c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgICBkaXNwYXRjaChmZXRjaEluc2lnaHRzKCkpO1xuICAgIH0sIFtkaXNwYXRjaF0pO1xuICAgIGlmIChpbnNpZ2h0cy5pc0ZldGNoaW5nKSB7XG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KENpcmN1bGFyUHJvZ3Jlc3MsIG51bGwpO1xuICAgIH1cbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChFbW90aW9uc0NoYXJ0cywgeyBkYXRhOiBpbnNpZ2h0cy5pbnNpZ2h0cyB9KTtcbn07XG4iLCJpbXBvcnQgeyBJbnNpZ2h0c1BhZ2UgfSBmcm9tICcuL0luc2lnaHRzUGFnZSc7XG5leHBvcnQgKiBmcm9tICcuL0luc2lnaHRzUGFnZSc7XG5leHBvcnQgZGVmYXVsdCBJbnNpZ2h0c1BhZ2U7XG4iXSwic291cmNlUm9vdCI6IiJ9