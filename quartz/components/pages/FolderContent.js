import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import path from "path";
import style from "../styles/listPage.scss";
import { PageList } from "../PageList";
import { _stripSlashes, simplifySlug } from "../../util/path";
import { pluralize } from "../../util/lang";
import { htmlToJsx } from "../../util/jsx";
function FolderContent(props) {
    const { tree, fileData, allFiles } = props;
    const folderSlug = _stripSlashes(simplifySlug(fileData.slug));
    const allPagesInFolder = allFiles.filter((file) => {
        const fileSlug = _stripSlashes(simplifySlug(file.slug));
        const prefixed = fileSlug.startsWith(folderSlug) && fileSlug !== folderSlug;
        const folderParts = folderSlug.split(path.posix.sep);
        const fileParts = fileSlug.split(path.posix.sep);
        const isDirectChild = fileParts.length === folderParts.length + 1;
        return prefixed && isDirectChild;
    });
    const listProps = {
        ...props,
        allFiles: allPagesInFolder,
    };
    const content = tree.children.length === 0
        ? fileData.description
        : htmlToJsx(fileData.filePath, tree);
    return (_jsxs("div", { class: "popover-hint", children: [_jsx("article", { children: _jsx("p", { children: content }, void 0) }, void 0), _jsxs("p", { children: [pluralize(allPagesInFolder.length, "item"), " under this folder."] }, void 0), _jsx("div", { children: _jsx(PageList, { ...listProps }, void 0) }, void 0)] }, void 0));
}
FolderContent.css = style + PageList.css;
export default (() => FolderContent);
satisfies;
QuartzComponentConstructor;
