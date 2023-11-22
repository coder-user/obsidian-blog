import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { resolveRelative } from "../util/path";
// Structure to add all files into a tree
export class FileNode {
    children;
    name;
    displayName;
    file;
    depth;
    constructor(name, file, depth) {
        this.children = [];
        this.name = name;
        this.displayName = name;
        this.file = file ? structuredClone(file) : null;
        this.depth = depth ?? 0;
    }
    insert(file) {
        if (file.path.length === 1) {
            if (file.path[0] !== "index.md") {
                this.children.push(new FileNode(file.file.frontmatter.title, file.file, this.depth + 1));
            }
            else {
                const title = file.file.frontmatter?.title;
                if (title && title !== "index" && file.path[0] === "index.md") {
                    this.displayName = title;
                }
            }
        }
        else {
            const next = file.path[0];
            file.path = file.path.splice(1);
            for (const child of this.children) {
                if (child.name === next) {
                    child.insert(file);
                    return;
                }
            }
            const newChild = new FileNode(next, undefined, this.depth + 1);
            newChild.insert(file);
            this.children.push(newChild);
        }
    }
    // Add new file to tree
    add(file, splice = 0) {
        this.insert({ file, path: file.filePath.split("/").splice(splice) });
    }
    // Print tree structure (for debugging)
    print(depth = 0) {
        let folderChar = "";
        if (!this.file)
            folderChar = "|";
        console.log("-".repeat(depth), folderChar, this.name, this.depth);
        this.children.forEach((e) => e.print(depth + 1));
    }
    /**
     * Filter FileNode tree. Behaves similar to `Array.prototype.filter()`, but modifies tree in place
     * @param filterFn function to filter tree with
     */
    filter(filterFn) {
        this.children = this.children.filter(filterFn);
        this.children.forEach((child) => child.filter(filterFn));
    }
    /**
     * Filter FileNode tree. Behaves similar to `Array.prototype.map()`, but modifies tree in place
     * @param mapFn function to use for mapping over tree
     */
    map(mapFn) {
        mapFn(this);
        this.children.forEach((child) => child.map(mapFn));
    }
    /**
     * Get folder representation with state of tree.
     * Intended to only be called on root node before changes to the tree are made
     * @param collapsed default state of folders (collapsed by default or not)
     * @returns array containing folder state for tree
     */
    getFolderPaths(collapsed) {
        const folderPaths = [];
        const traverse = (node, currentPath) => {
            if (!node.file) {
                const folderPath = currentPath + (currentPath ? "/" : "") + node.name;
                if (folderPath !== "") {
                    folderPaths.push({ path: folderPath, collapsed });
                }
                node.children.forEach((child) => traverse(child, folderPath));
            }
        };
        traverse(this, "");
        return folderPaths;
    }
    // Sort order: folders first, then files. Sort folders and files alphabetically
    /**
     * Sorts tree according to sort/compare function
     * @param sortFn compare function used for `.sort()`, also used recursively for children
     */
    sort(sortFn) {
        this.children = this.children.sort(sortFn);
        this.children.forEach((e) => e.sort(sortFn));
    }
}
export function ExplorerNode({ node, opts, fullPath, fileData }) {
    // Get options
    const folderBehavior = opts.folderClickBehavior;
    const isDefaultOpen = opts.folderDefaultState === "open";
    // Calculate current folderPath
    let pathOld = fullPath ? fullPath : "";
    let folderPath = "";
    if (node.name !== "") {
        folderPath = `${pathOld}/${node.name}`;
    }
    return (_jsx("li", { children: node.file ? (
        // Single file node
        _jsx("li", { children: _jsx("a", { href: resolveRelative(fileData.slug, node.file.slug), "data-for": node.file.slug, children: node.displayName }, void 0) }, node.file.slug)) : (_jsxs("div", { children: [node.name !== "" && (
                // Node with entire folder
                // Render svg button + folder name, then children
                _jsxs("div", { class: "folder-container", children: [_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "12", height: "12", viewBox: "5 8 14 8", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", class: "folder-icon", children: _jsx("polyline", { points: "6 9 12 15 18 9" }, void 0) }, void 0), _jsx("div", { "data-folderpath": folderPath, children: folderBehavior === "link" ? (_jsx("a", { href: `${folderPath}`, "data-for": node.name, class: "folder-title", children: node.displayName }, void 0)) : (_jsx("button", { class: "folder-button", children: _jsx("p", { class: "folder-title", children: node.displayName }, void 0) }, void 0)) }, node.name)] }, void 0)), _jsx("div", { class: `folder-outer ${node.depth === 0 || isDefaultOpen ? "open" : ""}`, children: _jsx("ul", { 
                        // Inline style for left folder paddings
                        style: {
                            paddingLeft: node.name !== "" ? "1.4rem" : "0",
                        }, class: "content", "data-folderul": folderPath, children: node.children.map((childNode, i) => (_jsx(ExplorerNode, { node: childNode, opts: opts, fullPath: folderPath, fileData: fileData }, i))) }, void 0) }, void 0)] }, void 0)) }, void 0));
}
