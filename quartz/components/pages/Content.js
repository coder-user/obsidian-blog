import { jsx as _jsx } from "preact/jsx-runtime";
import { htmlToJsx } from "../../util/jsx";
function Content({ fileData, tree }) {
    const content = htmlToJsx(fileData.filePath, tree);
    return _jsx("article", { class: "popover-hint", children: content }, void 0);
}
export default (() => Content);
satisfies;
QuartzComponentConstructor;
