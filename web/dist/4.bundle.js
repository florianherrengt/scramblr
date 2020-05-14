(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./src/containers/SelectTagContainer.tsx":
/*!***********************************************!*\
  !*** ./src/containers/SelectTagContainer.tsx ***!
  \***********************************************/
/*! exports provided: SelectTagContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectTagContainer", function() { return SelectTagContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components */ "./src/components/index.tsx");
/* harmony import */ var _redux_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../redux/actions */ "./src/redux/actions.ts");




var SelectTagContainer = function (props) {
    var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
    var _a = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]), selectedTags = _a[0], setSelectedTags = _a[1];
    Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
        dispatch(Object(_redux_actions__WEBPACK_IMPORTED_MODULE_3__["fetchCurrentUserTags"])());
    }, [dispatch]);
    var currentUserTags = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(function (state) { return state.currentUserTags; });
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_2__["SelectTag"], { value: selectedTags, tags: currentUserTags.tags, isLoading: currentUserTags.isFetching, onSubmit: props.onSubmit, onChange: function (tags) {
            setSelectedTags(tags);
            props.onChange(tags);
        } }));
};


/***/ }),

/***/ "./src/pages/Search/SearchPage.tsx":
/*!*****************************************!*\
  !*** ./src/pages/Search/SearchPage.tsx ***!
  \*****************************************/
/*! exports provided: SearchPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchPage", function() { return SearchPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components */ "./src/components/index.tsx");
/* harmony import */ var _containers_NoteListContainer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../containers/NoteListContainer */ "./src/containers/NoteListContainer.tsx");
/* harmony import */ var _containers_SelectTagContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../containers/SelectTagContainer */ "./src/containers/SelectTagContainer.tsx");
/* harmony import */ var _redux_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../redux/actions */ "./src/redux/actions.ts");






var SearchPage = function () {
    var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
    var displayedNotes = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(function (state) { return state.searchNotes; });
    var _a = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]), tagsId = _a[0], setTagsId = _a[1];
    Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
        if (tagsId.length) {
            dispatch(Object(_redux_actions__WEBPACK_IMPORTED_MODULE_5__["searchNotes"])({
                tagsId: tagsId,
            }));
        }
        return function () {
            dispatch(Object(_redux_actions__WEBPACK_IMPORTED_MODULE_5__["resetSearchNotes"])());
        };
    }, [dispatch, setTagsId, tagsId]);
    var loadMore = function () {
        if (!displayedNotes.isFetching && displayedNotes.hasMore) {
            dispatch(Object(_redux_actions__WEBPACK_IMPORTED_MODULE_5__["fetchCurrentUserNotes"])({
                forceReload: true,
                variables: {
                    tagsId: tagsId,
                    limit: 100,
                    skip: displayedNotes.notes.length,
                },
            }));
        }
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_2__["LineSpacer"], null),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_containers_SelectTagContainer__WEBPACK_IMPORTED_MODULE_4__["SelectTagContainer"], { onChange: function (tags) { return setTagsId(tags.map(function (tag) { return tag.id; })); } }),
        displayedNotes.fetched && displayedNotes.total ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", { className: 'text-center' }, displayedNotes.total + " note" + (displayedNotes.total !== 1 ? 's' : '') + " found",
            ' ')) : null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_2__["LineSpacer"], null),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_containers_NoteListContainer__WEBPACK_IMPORTED_MODULE_3__["NoteListContainer"], { displayedNotes: displayedNotes, loadMore: loadMore }),
        displayedNotes.fetched && !displayedNotes.total && (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_2__["LineSpacer"], null),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", { className: 'text-center' }, "No results")))));
};


/***/ }),

/***/ "./src/pages/Search/index.tsx":
/*!************************************!*\
  !*** ./src/pages/Search/index.tsx ***!
  \************************************/
/*! exports provided: SearchPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SearchPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SearchPage */ "./src/pages/Search/SearchPage.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SearchPage", function() { return _SearchPage__WEBPACK_IMPORTED_MODULE_0__["SearchPage"]; });



/* harmony default export */ __webpack_exports__["default"] = (_SearchPage__WEBPACK_IMPORTED_MODULE_0__["SearchPage"]);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29udGFpbmVycy9TZWxlY3RUYWdDb250YWluZXIudHN4Iiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9TZWFyY2gvU2VhcmNoUGFnZS50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL1NlYXJjaC9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQW1EO0FBQ0k7QUFDYjtBQUNjO0FBQ2pEO0FBQ1AsbUJBQW1CLCtEQUFXO0FBQzlCLGFBQWEsc0RBQVE7QUFDckIsSUFBSSx1REFBUztBQUNiLGlCQUFpQiwyRUFBb0I7QUFDckMsS0FBSztBQUNMLDBCQUEwQiwrREFBVyxtQkFBbUIsOEJBQThCLEVBQUU7QUFDeEYsWUFBWSw0Q0FBSyxlQUFlLHFEQUFTLEdBQUc7QUFDNUM7QUFDQTtBQUNBLFNBQVMsRUFBRTtBQUNYOzs7Ozs7Ozs7Ozs7O0FDZkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQTZEO0FBQ047QUFDVDtBQUN5QjtBQUNFO0FBQ21CO0FBQ3JGO0FBQ1AsbUJBQW1CLCtEQUFXO0FBQzlCLHlCQUF5QiwrREFBVyxtQkFBbUIsMEJBQTBCLEVBQUU7QUFDbkYsYUFBYSxzREFBUTtBQUNyQixJQUFJLHVEQUFTO0FBQ2I7QUFDQSxxQkFBcUIsa0VBQVc7QUFDaEM7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLHFCQUFxQix1RUFBZ0I7QUFDckM7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLHFCQUFxQiw0RUFBcUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBLFlBQVksNENBQUssZUFBZSw4Q0FBUTtBQUN4QyxRQUFRLDRDQUFLLGVBQWUsc0RBQVU7QUFDdEMsUUFBUSw0Q0FBSyxlQUFlLGlGQUFrQixHQUFHLDRCQUE0QiwyQ0FBMkMsZUFBZSxFQUFFLEdBQUcsRUFBRSxFQUFFO0FBQ2hKLDBEQUEwRCw0Q0FBSyxxQkFBcUIsMkJBQTJCO0FBQy9HO0FBQ0EsUUFBUSw0Q0FBSyxlQUFlLHNEQUFVO0FBQ3RDLFFBQVEsNENBQUssZUFBZSwrRUFBaUIsR0FBRyxxREFBcUQ7QUFDckcsNERBQTRELDRDQUFLLGVBQWUsOENBQVE7QUFDeEYsWUFBWSw0Q0FBSyxlQUFlLHNEQUFVO0FBQzFDLFlBQVksNENBQUsscUJBQXFCLDJCQUEyQjtBQUNqRTs7Ozs7Ozs7Ozs7OztBQzFDQTtBQUFBO0FBQUE7QUFBQTtBQUEwQztBQUNiO0FBQ2QscUhBQVUsRUFBQyIsImZpbGUiOiI0LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlRGlzcGF0Y2gsIHVzZVNlbGVjdG9yIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgU2VsZWN0VGFnIH0gZnJvbSAnLi4vY29tcG9uZW50cyc7XG5pbXBvcnQgeyBmZXRjaEN1cnJlbnRVc2VyVGFncyB9IGZyb20gJy4uL3JlZHV4L2FjdGlvbnMnO1xuZXhwb3J0IHZhciBTZWxlY3RUYWdDb250YWluZXIgPSBmdW5jdGlvbiAocHJvcHMpIHtcbiAgICB2YXIgZGlzcGF0Y2ggPSB1c2VEaXNwYXRjaCgpO1xuICAgIHZhciBfYSA9IHVzZVN0YXRlKFtdKSwgc2VsZWN0ZWRUYWdzID0gX2FbMF0sIHNldFNlbGVjdGVkVGFncyA9IF9hWzFdO1xuICAgIHVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRpc3BhdGNoKGZldGNoQ3VycmVudFVzZXJUYWdzKCkpO1xuICAgIH0sIFtkaXNwYXRjaF0pO1xuICAgIHZhciBjdXJyZW50VXNlclRhZ3MgPSB1c2VTZWxlY3RvcihmdW5jdGlvbiAoc3RhdGUpIHsgcmV0dXJuIHN0YXRlLmN1cnJlbnRVc2VyVGFnczsgfSk7XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFNlbGVjdFRhZywgeyB2YWx1ZTogc2VsZWN0ZWRUYWdzLCB0YWdzOiBjdXJyZW50VXNlclRhZ3MudGFncywgaXNMb2FkaW5nOiBjdXJyZW50VXNlclRhZ3MuaXNGZXRjaGluZywgb25TdWJtaXQ6IHByb3BzLm9uU3VibWl0LCBvbkNoYW5nZTogZnVuY3Rpb24gKHRhZ3MpIHtcbiAgICAgICAgICAgIHNldFNlbGVjdGVkVGFncyh0YWdzKTtcbiAgICAgICAgICAgIHByb3BzLm9uQ2hhbmdlKHRhZ3MpO1xuICAgICAgICB9IH0pKTtcbn07XG4iLCJpbXBvcnQgUmVhY3QsIHsgRnJhZ21lbnQsIHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VEaXNwYXRjaCwgdXNlU2VsZWN0b3IgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBMaW5lU3BhY2VyIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cyc7XG5pbXBvcnQgeyBOb3RlTGlzdENvbnRhaW5lciB9IGZyb20gJy4uLy4uL2NvbnRhaW5lcnMvTm90ZUxpc3RDb250YWluZXInO1xuaW1wb3J0IHsgU2VsZWN0VGFnQ29udGFpbmVyIH0gZnJvbSAnLi4vLi4vY29udGFpbmVycy9TZWxlY3RUYWdDb250YWluZXInO1xuaW1wb3J0IHsgZmV0Y2hDdXJyZW50VXNlck5vdGVzLCByZXNldFNlYXJjaE5vdGVzLCBzZWFyY2hOb3RlcywgfSBmcm9tICcuLi8uLi9yZWR1eC9hY3Rpb25zJztcbmV4cG9ydCB2YXIgU2VhcmNoUGFnZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZGlzcGF0Y2ggPSB1c2VEaXNwYXRjaCgpO1xuICAgIHZhciBkaXNwbGF5ZWROb3RlcyA9IHVzZVNlbGVjdG9yKGZ1bmN0aW9uIChzdGF0ZSkgeyByZXR1cm4gc3RhdGUuc2VhcmNoTm90ZXM7IH0pO1xuICAgIHZhciBfYSA9IHVzZVN0YXRlKFtdKSwgdGFnc0lkID0gX2FbMF0sIHNldFRhZ3NJZCA9IF9hWzFdO1xuICAgIHVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0YWdzSWQubGVuZ3RoKSB7XG4gICAgICAgICAgICBkaXNwYXRjaChzZWFyY2hOb3Rlcyh7XG4gICAgICAgICAgICAgICAgdGFnc0lkOiB0YWdzSWQsXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGRpc3BhdGNoKHJlc2V0U2VhcmNoTm90ZXMoKSk7XG4gICAgICAgIH07XG4gICAgfSwgW2Rpc3BhdGNoLCBzZXRUYWdzSWQsIHRhZ3NJZF0pO1xuICAgIHZhciBsb2FkTW9yZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFkaXNwbGF5ZWROb3Rlcy5pc0ZldGNoaW5nICYmIGRpc3BsYXllZE5vdGVzLmhhc01vcmUpIHtcbiAgICAgICAgICAgIGRpc3BhdGNoKGZldGNoQ3VycmVudFVzZXJOb3Rlcyh7XG4gICAgICAgICAgICAgICAgZm9yY2VSZWxvYWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgdmFyaWFibGVzOiB7XG4gICAgICAgICAgICAgICAgICAgIHRhZ3NJZDogdGFnc0lkLFxuICAgICAgICAgICAgICAgICAgICBsaW1pdDogMTAwLFxuICAgICAgICAgICAgICAgICAgICBza2lwOiBkaXNwbGF5ZWROb3Rlcy5ub3Rlcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEZyYWdtZW50LCBudWxsLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KExpbmVTcGFjZXIsIG51bGwpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFNlbGVjdFRhZ0NvbnRhaW5lciwgeyBvbkNoYW5nZTogZnVuY3Rpb24gKHRhZ3MpIHsgcmV0dXJuIHNldFRhZ3NJZCh0YWdzLm1hcChmdW5jdGlvbiAodGFnKSB7IHJldHVybiB0YWcuaWQ7IH0pKTsgfSB9KSxcbiAgICAgICAgZGlzcGxheWVkTm90ZXMuZmV0Y2hlZCAmJiBkaXNwbGF5ZWROb3Rlcy50b3RhbCA/IChSZWFjdC5jcmVhdGVFbGVtZW50KFwicFwiLCB7IGNsYXNzTmFtZTogJ3RleHQtY2VudGVyJyB9LCBkaXNwbGF5ZWROb3Rlcy50b3RhbCArIFwiIG5vdGVcIiArIChkaXNwbGF5ZWROb3Rlcy50b3RhbCAhPT0gMSA/ICdzJyA6ICcnKSArIFwiIGZvdW5kXCIsXG4gICAgICAgICAgICAnICcpKSA6IG51bGwsXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTGluZVNwYWNlciwgbnVsbCksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTm90ZUxpc3RDb250YWluZXIsIHsgZGlzcGxheWVkTm90ZXM6IGRpc3BsYXllZE5vdGVzLCBsb2FkTW9yZTogbG9hZE1vcmUgfSksXG4gICAgICAgIGRpc3BsYXllZE5vdGVzLmZldGNoZWQgJiYgIWRpc3BsYXllZE5vdGVzLnRvdGFsICYmIChSZWFjdC5jcmVhdGVFbGVtZW50KEZyYWdtZW50LCBudWxsLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChMaW5lU3BhY2VyLCBudWxsKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwXCIsIHsgY2xhc3NOYW1lOiAndGV4dC1jZW50ZXInIH0sIFwiTm8gcmVzdWx0c1wiKSkpKSk7XG59O1xuIiwiaW1wb3J0IHsgU2VhcmNoUGFnZSB9IGZyb20gJy4vU2VhcmNoUGFnZSc7XG5leHBvcnQgKiBmcm9tICcuL1NlYXJjaFBhZ2UnO1xuZXhwb3J0IGRlZmF1bHQgU2VhcmNoUGFnZTtcbiJdLCJzb3VyY2VSb290IjoiIn0=