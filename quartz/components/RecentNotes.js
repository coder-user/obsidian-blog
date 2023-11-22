import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { resolveRelative } from "../util/path";
import { byDateAndAlphabetical } from "./PageList";
import style from "./styles/recentNotes.scss";
import { Date, getDate } from "./Date";
const defaultOptions = (cfg) => ({
    title: "Recent Notes",
    limit: 3,
    linkToMore: false,
    filter: () => true,
    sort: byDateAndAlphabetical(cfg),
});
export default ((userOpts) => {
    function RecentNotes({ allFiles, fileData, displayClass, cfg }) {
        const opts = { ...defaultOptions(cfg), ...userOpts };
        const pages = allFiles.filter(opts.filter).sort(opts.sort);
        const remaining = Math.max(0, pages.length - opts.limit);
        return (_jsxs("div", { class: `recent-notes ${displayClass ?? ""}`, children: [_jsx("h3", { children: opts.title }, void 0), _jsx("ul", { class: "recent-ul", children: pages.slice(0, opts.limit).map((page) => {
                        const title = page.frontmatter?.title;
                        const tags = page.frontmatter?.tags ?? [];
                        return (_jsx("li", { class: "recent-li", children: _jsxs("div", { class: "section", children: [_jsx("div", { class: "desc", children: _jsx("h3", { children: _jsx("a", { href: resolveRelative(fileData.slug, page.slug), class: "internal", children: title }, void 0) }, void 0) }, void 0), page.dates && (_jsx("p", { class: "meta", children: _jsx(Date, { date: getDate(cfg, page) }, void 0) }, void 0)), _jsx("ul", { class: "tags", children: tags.map((tag) => (_jsx("li", { children: _jsxs("a", { class: "internal tag-link", href: resolveRelative(fileData.slug, `tags/${tag}`), children: ["#", tag] }, void 0) }, void 0))) }, void 0)] }, void 0) }, void 0));
                    }) }, void 0), opts.linkToMore && remaining > 0 && (_jsx("p", { children: _jsxs("a", { href: resolveRelative(fileData.slug, opts.linkToMore), children: ["See ", remaining, " more \u2192"] }, void 0) }, void 0))] }, void 0));
    }
    RecentNotes.css = style;
    return RecentNotes;
});
satisfies;
QuartzComponentConstructor;
