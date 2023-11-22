import remarkGfm from "remark-gfm";
import smartypants from "remark-smartypants";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
const defaultOptions = {
    enableSmartyPants: true,
    linkHeadings: true,
};
export const GitHubFlavoredMarkdown = (userOpts) => {
    const opts = { ...defaultOptions, ...userOpts };
    return {
        name: "GitHubFlavoredMarkdown",
        markdownPlugins() {
            return opts.enableSmartyPants ? [remarkGfm, smartypants] : [remarkGfm];
        },
        htmlPlugins() {
            if (opts.linkHeadings) {
                return [
                    rehypeSlug,
                    [
                        rehypeAutolinkHeadings,
                        {
                            behavior: "append",
                            content: {
                                type: "text",
                                value: " §",
                            },
                        },
                    ],
                ];
            }
            else {
                return [];
            }
        },
    };
};
