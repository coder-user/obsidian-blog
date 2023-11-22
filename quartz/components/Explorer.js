import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import explorerStyle from "./styles/explorer.scss";
// @ts-ignore
import script from "./scripts/explorer.inline";
import { ExplorerNode, FileNode } from "./ExplorerNode";
// Options interface defined in `ExplorerNode` to avoid circular dependency
const defaultOptions = {
    title: "Explorer",
    folderClickBehavior: "collapse",
    folderDefaultState: "collapsed",
    useSavedState: true,
    sortFn: (a, b) => {
        // Sort order: folders first, then files. Sort folders and files alphabetically
        if ((!a.file && !b.file) || (a.file && b.file)) {
            // numeric: true: Whether numeric collation should be used, such that "1" < "2" < "10"
            // sensitivity: "base": Only strings that differ in base letters compare as unequal. Examples: a ≠ b, a = á, a = A
            return a.displayName.localeCompare(b.displayName, undefined, {
                numeric: true,
                sensitivity: "base",
            });
        }
        if (a.file && !b.file) {
            return 1;
        }
        else {
            return -1;
        }
    },
    filterFn: (node) => node.name !== "tags",
    order: ["filter", "map", "sort"],
}, satisfies, Options;
export default ((userOpts) => {
    // Parse config
    const opts = { ...defaultOptions, ...userOpts };
    // memoized
    let fileTree;
    let jsonTree;
    function constructFileTree(allFiles) {
        if (!fileTree) {
            // Construct tree from allFiles
            fileTree = new FileNode("");
            allFiles.forEach((file) => fileTree.add(file, 1));
            /**
             * Keys of this object must match corresponding function name of `FileNode`,
             * while values must be the argument that will be passed to the function.
             *
             * e.g. entry for FileNode.sort: `sort: opts.sortFn` (value is sort function from options)
             */
            const functions = {
                map: opts.mapFn,
                sort: opts.sortFn,
                filter: opts.filterFn,
            };
            // Execute all functions (sort, filter, map) that were provided (if none were provided, only default "sort" is applied)
            if (opts.order) {
                // Order is important, use loop with index instead of order.map()
                for (let i = 0; i < opts.order.length; i++) {
                    const functionName = opts.order[i];
                    if (functions[functionName]) {
                        // for every entry in order, call matching function in FileNode and pass matching argument
                        // e.g. i = 0; functionName = "filter"
                        // converted to: (if opts.filterFn) => fileTree.filter(opts.filterFn)
                        // @ts-ignore
                        // typescript cant statically check these dynamic references, so manually make sure reference is valid and ignore warning
                        fileTree[functionName].call(fileTree, functions[functionName]);
                    }
                }
            }
            // Get all folders of tree. Initialize with collapsed state
            const folders = fileTree.getFolderPaths(opts.folderDefaultState === "collapsed");
            // Stringify to pass json tree as data attribute ([data-tree])
            jsonTree = JSON.stringify(folders);
        }
    }
    function Explorer({ allFiles, displayClass, fileData }) {
        constructFileTree(allFiles);
        return (_jsxs("div", { class: `explorer ${displayClass ?? ""}`, children: [_jsxs("button", { type: "button", id: "explorer", "data-behavior": opts.folderClickBehavior, "data-collapsed": opts.folderDefaultState, "data-savestate": opts.useSavedState, "data-tree": jsonTree, children: [_jsx("h1", { children: opts.title }, void 0), _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "14", height: "14", viewBox: "5 8 14 8", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", class: "fold", children: _jsx("polyline", { points: "6 9 12 15 18 9" }, void 0) }, void 0)] }, void 0), _jsx("div", { id: "explorer-content", children: _jsxs("ul", { class: "overflow", id: "explorer-ul", children: [_jsx(ExplorerNode, { node: fileTree, opts: opts, fileData: fileData }, void 0), _jsx("li", { id: "explorer-end" }, void 0)] }, void 0) }, void 0)] }, void 0));
    }
    Explorer.css = explorerStyle;
    Explorer.afterDOMLoaded = script;
    return Explorer;
});
satisfies;
QuartzComponentConstructor;
