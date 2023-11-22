import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import style from "../styles/listPage.scss";
import { PageList } from "../PageList";
import { getAllSegmentPrefixes, simplifySlug } from "../../util/path";
import { pluralize } from "../../util/lang";
import { htmlToJsx } from "../../util/jsx";
const numPages = 10;
function TagContent(props) {
    const { tree, fileData, allFiles } = props;
    const slug = fileData.slug;
    if (!(slug?.startsWith("tags/") || slug === "tags")) {
        throw new Error(`Component "TagContent" tried to render a non-tag page: ${slug}`);
    }
    const tag = simplifySlug(slug.slice("tags/".length));
    const allPagesWithTag = (tag) => allFiles.filter((file) => (file.frontmatter?.tags ?? []).flatMap(getAllSegmentPrefixes).includes(tag));
    const content = tree.children.length === 0
        ? fileData.description
        : htmlToJsx(fileData.filePath, tree);
    if (tag === "") {
        const tags = [...new Set(allFiles.flatMap((data) => data.frontmatter?.tags ?? []))];
        const tagItemMap = new Map();
        for (const tag of tags) {
            tagItemMap.set(tag, allPagesWithTag(tag));
        }
        return (_jsxs("div", { class: "popover-hint", children: [_jsx("article", { children: _jsx("p", { children: content }, void 0) }, void 0), _jsxs("p", { children: ["Found ", tags.length, " total tags."] }, void 0), _jsx("div", { children: tags.map((tag) => {
                        const pages = tagItemMap.get(tag);
                        const listProps = {
                            ...props,
                            allFiles: pages,
                        };
                        const contentPage = allFiles.filter((file) => file.slug === `tags/${tag}`)[0];
                        const content = contentPage?.description;
                        return (_jsxs("div", { children: [_jsx("h2", { children: _jsxs("a", { class: "internal tag-link", href: `../tags/${tag}`, children: ["#", tag] }, void 0) }, void 0), content && _jsx("p", { children: content }, void 0), _jsxs("p", { children: [pluralize(pages.length, "item"), " with this tag.", " ", pages.length > numPages && `Showing first ${numPages}.`] }, void 0), _jsx(PageList, { limit: numPages, ...listProps }, void 0)] }, void 0));
                    }) }, void 0)] }, void 0));
    }
    else {
        const pages = allPagesWithTag(tag);
        const listProps = {
            ...props,
            allFiles: pages,
        };
        return (_jsxs("div", { class: "popover-hint", children: [_jsx("article", { children: content }, void 0), _jsxs("p", { children: [pluralize(pages.length, "item"), " with this tag."] }, void 0), _jsx("div", { children: _jsx(PageList, { ...listProps }, void 0) }, void 0)] }, void 0));
    }
}
TagContent.css = style + PageList.css;
export default (() => TagContent);
satisfies;
QuartzComponentConstructor;
