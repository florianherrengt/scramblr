(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./src/pages/Tags/CreateTagContainer.tsx":
/*!***********************************************!*\
  !*** ./src/pages/Tags/CreateTagContainer.tsx ***!
  \***********************************************/
/*! exports provided: CreateTagContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateTagContainer", function() { return CreateTagContainer; });
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components */ "./src/components/index.tsx");
/* harmony import */ var _redux_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../redux/actions */ "./src/redux/actions.ts");





var CreateTagContainer = function (props) {
    var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useDispatch"])();
    var aesPassphrase = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"])(function (state) { return state.currentUser.aesPassphrase; });
    if (!aesPassphrase) {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__["Typography"], null, "No aes passphrase found...");
    }
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_3__["CreateTagForm"], { onSubmit: function (input) { return dispatch(Object(_redux_actions__WEBPACK_IMPORTED_MODULE_4__["createTag"])({ input: input })); } });
};


/***/ }),

/***/ "./src/pages/Tags/TagsListContainer.tsx":
/*!**********************************************!*\
  !*** ./src/pages/Tags/TagsListContainer.tsx ***!
  \**********************************************/
/*! exports provided: TagsListContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TagsListContainer", function() { return TagsListContainer; });
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components */ "./src/components/index.tsx");
/* harmony import */ var _redux_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../redux/actions */ "./src/redux/actions.ts");





var TagsListContainer = function (props) {
    console.debug('TagsListContainer');
    var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useDispatch"])();
    var aesPassphrase = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"])(function (state) { return state.currentUser.aesPassphrase; });
    var currentUserTags = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"])(function (state) { return state.currentUserTags; });
    if (!aesPassphrase) {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__["Typography"], null, "No aes passphrase found...");
    }
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_3__["ListTags"], { onUpdate: function (tag) {
                Reflect.deleteProperty(tag, 'createdAt');
                dispatch(Object(_redux_actions__WEBPACK_IMPORTED_MODULE_4__["updateTag"])({ input: tag }));
            }, onDelete: function (id) { return dispatch(Object(_redux_actions__WEBPACK_IMPORTED_MODULE_4__["deleteTag"])({ id: id })); }, tags: currentUserTags.tags }),
        currentUserTags.isFetching && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__["CircularProgress"], null)));
};


/***/ }),

/***/ "./src/pages/Tags/TagsPage.tsx":
/*!*************************************!*\
  !*** ./src/pages/Tags/TagsPage.tsx ***!
  \*************************************/
/*! exports provided: TagsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TagsPage", function() { return TagsPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components */ "./src/components/index.tsx");
/* harmony import */ var _redux_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../redux/actions */ "./src/redux/actions.ts");
/* harmony import */ var _CreateTagContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CreateTagContainer */ "./src/pages/Tags/CreateTagContainer.tsx");
/* harmony import */ var _TagsListContainer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TagsListContainer */ "./src/pages/Tags/TagsListContainer.tsx");






var TagsPage = function (props) {
    console.debug('TagsPage');
    var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
    Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
        dispatch(Object(_redux_actions__WEBPACK_IMPORTED_MODULE_3__["fetchCurrentUserTags"])());
    }, [dispatch]);
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_2__["LineSpacer"], null),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_CreateTagContainer__WEBPACK_IMPORTED_MODULE_4__["CreateTagContainer"], null),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_2__["LineSpacer"], null),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TagsListContainer__WEBPACK_IMPORTED_MODULE_5__["TagsListContainer"], null)));
};


/***/ }),

/***/ "./src/pages/Tags/index.ts":
/*!*********************************!*\
  !*** ./src/pages/Tags/index.ts ***!
  \*********************************/
/*! exports provided: TagsPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TagsPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TagsPage */ "./src/pages/Tags/TagsPage.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TagsPage", function() { return _TagsPage__WEBPACK_IMPORTED_MODULE_0__["TagsPage"]; });



/* harmony default export */ __webpack_exports__["default"] = (_TagsPage__WEBPACK_IMPORTED_MODULE_0__["TagsPage"]);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvVGFncy9DcmVhdGVUYWdDb250YWluZXIudHN4Iiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9UYWdzL1RhZ3NMaXN0Q29udGFpbmVyLnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvVGFncy9UYWdzUGFnZS50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL1RhZ3MvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBK0M7QUFDckI7QUFDNkI7QUFDTjtBQUNEO0FBQ3pDO0FBQ1AsbUJBQW1CLCtEQUFXO0FBQzlCLHdCQUF3QiwrREFBVyxtQkFBbUIsd0NBQXdDLEVBQUU7QUFDaEc7QUFDQSxlQUFlLDRDQUFLLGVBQWUsNERBQVU7QUFDN0M7QUFDQSxXQUFXLDRDQUFLLGVBQWUseURBQWEsR0FBRyw2QkFBNkIsaUJBQWlCLGdFQUFTLEVBQUUsZUFBZSxHQUFHLEVBQUUsRUFBRTtBQUM5SDs7Ozs7Ozs7Ozs7OztBQ1pBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBaUU7QUFDdkM7QUFDNkI7QUFDWDtBQUNlO0FBQ3BEO0FBQ1A7QUFDQSxtQkFBbUIsK0RBQVc7QUFDOUIsd0JBQXdCLCtEQUFXLG1CQUFtQix3Q0FBd0MsRUFBRTtBQUNoRywwQkFBMEIsK0RBQVcsbUJBQW1CLDhCQUE4QixFQUFFO0FBQ3hGO0FBQ0EsZUFBZSw0Q0FBSyxlQUFlLDREQUFVO0FBQzdDO0FBQ0EsWUFBWSw0Q0FBSztBQUNqQixRQUFRLDRDQUFLLGVBQWUsb0RBQVEsR0FBRztBQUN2QztBQUNBLHlCQUF5QixnRUFBUyxFQUFFLGFBQWE7QUFDakQsYUFBYSwyQkFBMkIsaUJBQWlCLGdFQUFTLEVBQUUsU0FBUyxHQUFHLEVBQUUsOEJBQThCO0FBQ2hILHNDQUFzQyw0Q0FBSyxlQUFlLGtFQUFnQjtBQUMxRTs7Ozs7Ozs7Ozs7OztBQ25CQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBeUM7QUFDQztBQUNJO0FBQ2E7QUFDRDtBQUNGO0FBQ2pEO0FBQ1A7QUFDQSxtQkFBbUIsK0RBQVc7QUFDOUIsSUFBSSx1REFBUztBQUNiLGlCQUFpQiwyRUFBb0I7QUFDckMsS0FBSztBQUNMLFlBQVksNENBQUs7QUFDakIsUUFBUSw0Q0FBSyxlQUFlLHNEQUFVO0FBQ3RDLFFBQVEsNENBQUssZUFBZSxzRUFBa0I7QUFDOUMsUUFBUSw0Q0FBSyxlQUFlLHNEQUFVO0FBQ3RDLFFBQVEsNENBQUssZUFBZSxvRUFBaUI7QUFDN0M7Ozs7Ozs7Ozs7Ozs7QUNqQkE7QUFBQTtBQUFBO0FBQUE7QUFBc0M7QUFDWDtBQUNaLGlIQUFRLEVBQUMiLCJmaWxlIjoiMi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUeXBvZ3JhcGh5IH0gZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZURpc3BhdGNoLCB1c2VTZWxlY3RvciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IENyZWF0ZVRhZ0Zvcm0gfSBmcm9tICcuLi8uLi9jb21wb25lbnRzJztcbmltcG9ydCB7IGNyZWF0ZVRhZyB9IGZyb20gJy4uLy4uL3JlZHV4L2FjdGlvbnMnO1xuZXhwb3J0IHZhciBDcmVhdGVUYWdDb250YWluZXIgPSBmdW5jdGlvbiAocHJvcHMpIHtcbiAgICB2YXIgZGlzcGF0Y2ggPSB1c2VEaXNwYXRjaCgpO1xuICAgIHZhciBhZXNQYXNzcGhyYXNlID0gdXNlU2VsZWN0b3IoZnVuY3Rpb24gKHN0YXRlKSB7IHJldHVybiBzdGF0ZS5jdXJyZW50VXNlci5hZXNQYXNzcGhyYXNlOyB9KTtcbiAgICBpZiAoIWFlc1Bhc3NwaHJhc2UpIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVHlwb2dyYXBoeSwgbnVsbCwgXCJObyBhZXMgcGFzc3BocmFzZSBmb3VuZC4uLlwiKTtcbiAgICB9XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ3JlYXRlVGFnRm9ybSwgeyBvblN1Ym1pdDogZnVuY3Rpb24gKGlucHV0KSB7IHJldHVybiBkaXNwYXRjaChjcmVhdGVUYWcoeyBpbnB1dDogaW5wdXQgfSkpOyB9IH0pO1xufTtcbiIsImltcG9ydCB7IENpcmN1bGFyUHJvZ3Jlc3MsIFR5cG9ncmFwaHkgfSBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZSc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlRGlzcGF0Y2gsIHVzZVNlbGVjdG9yIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgTGlzdFRhZ3MgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzJztcbmltcG9ydCB7IGRlbGV0ZVRhZywgdXBkYXRlVGFnIH0gZnJvbSAnLi4vLi4vcmVkdXgvYWN0aW9ucyc7XG5leHBvcnQgdmFyIFRhZ3NMaXN0Q29udGFpbmVyID0gZnVuY3Rpb24gKHByb3BzKSB7XG4gICAgY29uc29sZS5kZWJ1ZygnVGFnc0xpc3RDb250YWluZXInKTtcbiAgICB2YXIgZGlzcGF0Y2ggPSB1c2VEaXNwYXRjaCgpO1xuICAgIHZhciBhZXNQYXNzcGhyYXNlID0gdXNlU2VsZWN0b3IoZnVuY3Rpb24gKHN0YXRlKSB7IHJldHVybiBzdGF0ZS5jdXJyZW50VXNlci5hZXNQYXNzcGhyYXNlOyB9KTtcbiAgICB2YXIgY3VycmVudFVzZXJUYWdzID0gdXNlU2VsZWN0b3IoZnVuY3Rpb24gKHN0YXRlKSB7IHJldHVybiBzdGF0ZS5jdXJyZW50VXNlclRhZ3M7IH0pO1xuICAgIGlmICghYWVzUGFzc3BocmFzZSkge1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChUeXBvZ3JhcGh5LCBudWxsLCBcIk5vIGFlcyBwYXNzcGhyYXNlIGZvdW5kLi4uXCIpO1xuICAgIH1cbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChMaXN0VGFncywgeyBvblVwZGF0ZTogZnVuY3Rpb24gKHRhZykge1xuICAgICAgICAgICAgICAgIFJlZmxlY3QuZGVsZXRlUHJvcGVydHkodGFnLCAnY3JlYXRlZEF0Jyk7XG4gICAgICAgICAgICAgICAgZGlzcGF0Y2godXBkYXRlVGFnKHsgaW5wdXQ6IHRhZyB9KSk7XG4gICAgICAgICAgICB9LCBvbkRlbGV0ZTogZnVuY3Rpb24gKGlkKSB7IHJldHVybiBkaXNwYXRjaChkZWxldGVUYWcoeyBpZDogaWQgfSkpOyB9LCB0YWdzOiBjdXJyZW50VXNlclRhZ3MudGFncyB9KSxcbiAgICAgICAgY3VycmVudFVzZXJUYWdzLmlzRmV0Y2hpbmcgJiYgUmVhY3QuY3JlYXRlRWxlbWVudChDaXJjdWxhclByb2dyZXNzLCBudWxsKSkpO1xufTtcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VEaXNwYXRjaCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IExpbmVTcGFjZXIgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzJztcbmltcG9ydCB7IGZldGNoQ3VycmVudFVzZXJUYWdzIH0gZnJvbSAnLi4vLi4vcmVkdXgvYWN0aW9ucyc7XG5pbXBvcnQgeyBDcmVhdGVUYWdDb250YWluZXIgfSBmcm9tICcuL0NyZWF0ZVRhZ0NvbnRhaW5lcic7XG5pbXBvcnQgeyBUYWdzTGlzdENvbnRhaW5lciB9IGZyb20gJy4vVGFnc0xpc3RDb250YWluZXInO1xuZXhwb3J0IHZhciBUYWdzUGFnZSA9IGZ1bmN0aW9uIChwcm9wcykge1xuICAgIGNvbnNvbGUuZGVidWcoJ1RhZ3NQYWdlJyk7XG4gICAgdmFyIGRpc3BhdGNoID0gdXNlRGlzcGF0Y2goKTtcbiAgICB1c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgICBkaXNwYXRjaChmZXRjaEN1cnJlbnRVc2VyVGFncygpKTtcbiAgICB9LCBbZGlzcGF0Y2hdKTtcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChMaW5lU3BhY2VyLCBudWxsKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChDcmVhdGVUYWdDb250YWluZXIsIG51bGwpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KExpbmVTcGFjZXIsIG51bGwpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhZ3NMaXN0Q29udGFpbmVyLCBudWxsKSkpO1xufTtcbiIsImltcG9ydCB7IFRhZ3NQYWdlIH0gZnJvbSAnLi9UYWdzUGFnZSc7XG5leHBvcnQgKiBmcm9tICcuL1RhZ3NQYWdlJztcbmV4cG9ydCBkZWZhdWx0IFRhZ3NQYWdlO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==