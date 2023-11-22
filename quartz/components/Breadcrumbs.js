import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import breadcrumbsStyle from "./styles/breadcrumbs.scss";
import { resolveRelative } from "../util/path";
const defaultOptions = {
    spacerSymbol: "❯",
    rootName: "Home",
    resolveFrontmatterTitle: true,
    hideOnRoot: true,
    showCurrentPage: true,
};
function formatCrumb(displayName, baseSlug, currentSlug) {
    return {
        displayName: displayName.replaceAll("-", " "),
        path: resolveRelative(baseSlug, currentSlug),
    };
}
export default ((opts) => {
    // Merge options with defaults
    const options = { ...defaultOptions, ...opts };
    // computed index of folder name to its associated file data
    let folderIndex;
    function Breadcrumbs({ fileData, allFiles, displayClass }) {
        // Hide crumbs on root if enabled
        if (options.hideOnRoot && fileData.slug === "index") {
            return _jsx(_Fragment, {}, void 0);
        }
        // Format entry for root element
        const firstEntry = formatCrumb(options.rootName, fileData.slug, "/");
        const crumbs = [firstEntry];
        if (!folderIndex && options.resolveFrontmatterTitle) {
            folderIndex = new Map();
            // construct the index for the first time
            for (const file of allFiles) {
                if (file.slug?.endsWith("index")) {
                    const folderParts = file.filePath?.split("/");
                    if (folderParts) {
                        const folderName = folderParts[folderParts?.length - 2];
                        folderIndex.set(folderName, file);
                    }
                }
            }
        }
        // Split slug into hierarchy/parts
        const slugParts = fileData.slug?.split("/");
        if (slugParts) {
            // full path until current part
            let currentPath = "";
            for (let i = 0; i < slugParts.length - 1; i++) {
                let curPathSegment = slugParts[i];
                // Try to resolve frontmatter folder title
                const currentFile = folderIndex?.get(curPathSegment);
                if (currentFile) {
                    curPathSegment = currentFile.frontmatter.title;
                }
                // Add current slug to full path
                currentPath += slugParts[i] + "/";
                // Format and add current crumb
                const crumb = formatCrumb(curPathSegment, fileData.slug, currentPath);
                crumbs.push(crumb);
            }
            // Add current file to crumb (can directly use frontmatter title)
            if (options.showCurrentPage) {
                crumbs.push({
                    displayName: fileData.frontmatter.title,
                    path: "",
                });
            }
        }
        return (_jsx("nav", { class: `breadcrumb-container ${displayClass ?? ""}`, "aria-label": "breadcrumbs", children: crumbs.map((crumb, index) => (_jsxs("div", { class: "breadcrumb-element", children: [_jsx("a", { href: crumb.path, children: crumb.displayName }, void 0), index !== crumbs.length - 1 && _jsx("p", { children: ` ${options.spacerSymbol} ` }, void 0)] }, void 0))) }, void 0));
    }
    Breadcrumbs.css = breadcrumbsStyle;
    return Breadcrumbs;
});
satisfies;
QuartzComponentConstructor;
