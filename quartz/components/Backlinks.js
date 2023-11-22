import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import style from "./styles/backlinks.scss";
import { resolveRelative, simplifySlug } from "../util/path";
function Backlinks({ fileData, allFiles, displayClass }) {
    const slug = simplifySlug(fileData.slug);
    const backlinkFiles = allFiles.filter((file) => file.links?.includes(slug));
    return (_jsxs("div", { class: `backlinks ${displayClass ?? ""}`, children: [_jsx("h3", { children: "Backlinks" }, void 0), _jsx("ul", { class: "overflow", children: backlinkFiles.length > 0 ? (backlinkFiles.map((f) => (_jsx("li", { children: _jsx("a", { href: resolveRelative(fileData.slug, f.slug), class: "internal", children: f.frontmatter?.title }, void 0) }, void 0)))) : (_jsx("li", { children: "No backlinks found" }, void 0)) }, void 0)] }, void 0));
}
Backlinks.css = style;
export default (() => Backlinks);
satisfies;
QuartzComponentConstructor;
