import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import Slugger from "github-slugger";
import { wikilinkRegex } from "./ofm";
const defaultOptions = {
    maxDepth: 3,
    minEntries: 1,
    showByDefault: true,
    collapseByDefault: false,
};
const regexMdLinks = new RegExp(/\[([^\[]+)\](\(.*\))/, "g");
export const TableOfContents = (userOpts) => {
    const opts = { ...defaultOptions, ...userOpts };
    return {
        name: "TableOfContents",
        markdownPlugins() {
            return [
                () => {
                    return async (tree, file) => {
                        const display = file.data.frontmatter?.enableToc ?? opts.showByDefault;
                        if (display) {
                            const slugAnchor = new Slugger();
                            const toc = [];
                            let highestDepth = opts.maxDepth;
                            visit(tree, "heading", (node) => {
                                if (node.depth <= opts.maxDepth) {
                                    let text = toString(node);
                                    // strip link formatting from toc entries
                                    text = text.replace(wikilinkRegex, (_, rawFp, __, rawAlias) => {
                                        const fp = rawFp?.trim() ?? "";
                                        const alias = rawAlias?.slice(1).trim();
                                        return alias ?? fp;
                                    });
                                    text = text.replace(regexMdLinks, "$1");
                                    highestDepth = Math.min(highestDepth, node.depth);
                                    toc.push({
                                        depth: node.depth,
                                        text,
                                        slug: slugAnchor.slug(text),
                                    });
                                }
                            });
                            if (toc.length > opts.minEntries) {
                                file.data.toc = toc.map((entry) => ({
                                    ...entry,
                                    depth: entry.depth - highestDepth,
                                }));
                                file.data.collapseToc = opts.collapseByDefault;
                            }
                        }
                    };
                },
            ];
        },
    };
};
