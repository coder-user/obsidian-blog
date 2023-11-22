import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import style from "./styles/search.scss";
// @ts-ignore
import script from "./scripts/search.inline";
export default (() => {
    function Search({ displayClass }) {
        return (_jsxs("div", { class: `search ${displayClass ?? ""}`, children: [_jsxs("div", { id: "search-icon", children: [_jsx("p", { children: "Search" }, void 0), _jsx("div", {}, void 0), _jsxs("svg", { tabIndex: 0, "aria-labelledby": "title desc", role: "img", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 19.9 19.7", children: [_jsx("title", { id: "title", children: "Search" }, void 0), _jsx("desc", { id: "desc", children: "Search" }, void 0), _jsxs("g", { class: "search-path", fill: "none", children: [_jsx("path", { "stroke-linecap": "square", d: "M18.5 18.3l-5.4-5.4" }, void 0), _jsx("circle", { cx: "8", cy: "8", r: "7" }, void 0)] }, void 0)] }, void 0)] }, void 0), _jsx("div", { id: "search-container", children: _jsxs("div", { id: "search-space", children: [_jsx("input", { autocomplete: "off", id: "search-bar", name: "search", type: "text", "aria-label": "Search for something", placeholder: "Search for something" }, void 0), _jsx("div", { id: "results-container" }, void 0)] }, void 0) }, void 0)] }, void 0));
    }
    Search.afterDOMLoaded = script;
    Search.css = style;
    return Search;
});
satisfies;
QuartzComponentConstructor;
