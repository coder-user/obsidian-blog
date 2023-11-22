import { jsx as _jsx } from "preact/jsx-runtime";
import { pathToRoot } from "../util/path";
function PageTitle({ fileData, cfg, displayClass }) {
    const title = cfg?.pageTitle ?? "Untitled Quartz";
    const baseDir = pathToRoot(fileData.slug);
    return (_jsx("h1", { class: `page-title ${displayClass ?? ""}`, children: _jsx("a", { href: baseDir, children: title }, void 0) }, void 0));
}
PageTitle.css = `
.page-title {
  margin: 0;
}
`;
export default (() => PageTitle);
satisfies;
QuartzComponentConstructor;
