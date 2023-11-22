import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import legacyStyle from "./styles/legacyToc.scss";
import modernStyle from "./styles/toc.scss";
// @ts-ignore
import script from "./scripts/toc.inline";
const defaultOptions = {
    layout: "modern",
};
function TableOfContents({ fileData, displayClass }) {
    if (!fileData.toc) {
        return null;
    }
    return (_jsxs("div", { class: `toc ${displayClass ?? ""}`, children: [_jsxs("button", { type: "button", id: "toc", class: fileData.collapseToc ? "collapsed" : "", children: [_jsx("h3", { children: "Table of Contents" }, void 0), _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", class: "fold", children: _jsx("polyline", { points: "6 9 12 15 18 9" }, void 0) }, void 0)] }, void 0), _jsx("div", { id: "toc-content", children: _jsx("ul", { class: "overflow", children: fileData.toc.map((tocEntry) => (_jsx("li", { class: `depth-${tocEntry.depth}`, children: _jsx("a", { href: `#${tocEntry.slug}`, "data-for": tocEntry.slug, children: tocEntry.text }, void 0) }, tocEntry.slug))) }, void 0) }, void 0)] }, void 0));
}
TableOfContents.css = modernStyle;
TableOfContents.afterDOMLoaded = script;
function LegacyTableOfContents({ fileData }) {
    if (!fileData.toc) {
        return null;
    }
    return (_jsxs("details", { id: "toc", open: !fileData.collapseToc, children: [_jsx("summary", { children: _jsx("h3", { children: "Table of Contents" }, void 0) }, void 0), _jsx("ul", { children: fileData.toc.map((tocEntry) => (_jsx("li", { class: `depth-${tocEntry.depth}`, children: _jsx("a", { href: `#${tocEntry.slug}`, "data-for": tocEntry.slug, children: tocEntry.text }, void 0) }, tocEntry.slug))) }, void 0)] }, void 0));
}
LegacyTableOfContents.css = legacyStyle;
export default ((opts) => {
    const layout = opts?.layout ?? defaultOptions.layout;
    return layout === "modern" ? TableOfContents : LegacyTableOfContents;
});
satisfies;
QuartzComponentConstructor;
