import { jsx as _jsx } from "preact/jsx-runtime";
// @ts-ignore
import clipboardScript from "./scripts/clipboard.inline";
import clipboardStyle from "./styles/clipboard.scss";
function Body({ children }) {
    return _jsx("div", { id: "quartz-body", children: children }, void 0);
}
Body.afterDOMLoaded = clipboardScript;
Body.css = clipboardStyle;
export default (() => Body);
satisfies;
QuartzComponentConstructor;
