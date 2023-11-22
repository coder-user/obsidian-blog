import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { resolveRelative } from "../util/path";
import { Date, getDate } from "./Date";
export function byDateAndAlphabetical(cfg) {
    return (f1, f2) => {
        if (f1.dates && f2.dates) {
            // sort descending
            return getDate(cfg, f2).getTime() - getDate(cfg, f1).getTime();
        }
        else if (f1.dates && !f2.dates) {
            // prioritize files with dates
            return -1;
        }
        else if (!f1.dates && f2.dates) {
            return 1;
        }
        // otherwise, sort lexographically by title
        const f1Title = f1.frontmatter?.title.toLowerCase() ?? "";
        const f2Title = f2.frontmatter?.title.toLowerCase() ?? "";
        return f1Title.localeCompare(f2Title);
    };
}
export function PageList({ cfg, fileData, allFiles, limit }) {
    let list = allFiles.sort(byDateAndAlphabetical(cfg));
    if (limit) {
        list = list.slice(0, limit);
    }
    return (_jsx("ul", { class: "section-ul", children: list.map((page) => {
            const title = page.frontmatter?.title;
            const tags = page.frontmatter?.tags ?? [];
            return (_jsx("li", { class: "section-li", children: _jsxs("div", { class: "section", children: [page.dates && (_jsx("p", { class: "meta", children: _jsx(Date, { date: getDate(cfg, page) }, void 0) }, void 0)), _jsx("div", { class: "desc", children: _jsx("h3", { children: _jsx("a", { href: resolveRelative(fileData.slug, page.slug), class: "internal", children: title }, void 0) }, void 0) }, void 0), _jsx("ul", { class: "tags", children: tags.map((tag) => (_jsx("li", { children: _jsxs("a", { class: "internal tag-link", href: resolveRelative(fileData.slug, `tags/${tag}`), children: ["#", tag] }, void 0) }, void 0))) }, void 0)] }, void 0) }, void 0));
        }) }, void 0));
}
PageList.css = `
.section h3 {
  margin: 0;
}

.section > .tags {
  margin: 0;
}
`;
