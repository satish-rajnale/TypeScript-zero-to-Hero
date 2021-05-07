// const beforeLoad = "beforeLoad";
// const loading = "loading";
// const loaded = "loaded";
var LoadingState;
(function (LoadingState) {
    LoadingState["beforeLoad"] = "beforeLoad";
    LoadingState["loading"] = "loading";
    LoadingState["loaded"] = "loaded";
})(LoadingState || (LoadingState = {}));
var isLoading = function (state) { return state === LoadingState.loading; };
console.log(isLoading(LoadingState.beforeLoad));
