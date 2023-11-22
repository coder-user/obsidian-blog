import matter from "gray-matter";
import remarkFrontmatter from "remark-frontmatter";
import yaml from "js-yaml";
import toml from "toml";
import { slugTag } from "../../util/path";
const defaultOptions = {
    delims: "---",
    language: "yaml",
};
export const FrontMatter = (userOpts) => {
    const opts = { ...defaultOptions, ...userOpts };
    return {
        name: "FrontMatter",
        markdownPlugins() {
            return [
                [remarkFrontmatter, ["yaml", "toml"]],
                () => {
                    return (_, file) => {
                        const { data } = matter(file.value, {
                            ...opts,
                            engines: {
                                yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }),
                                toml: (s) => toml.parse(s),
                            },
                        });
                        // tag is an alias for tags
                        if (data.tag) {
                            data.tags = data.tag;
                        }
                        // coerce title to string
                        if (data.title) {
                            data.title = data.title.toString();
                        }
                        if (data.tags && !Array.isArray(data.tags)) {
                            data.tags = data.tags
                                .toString()
                                .split(",")
                                .map((tag) => tag.trim());
                        }
                        // slug them all!!
                        data.tags = [...new Set(data.tags?.map((tag) => slugTag(tag)))] ?? [];
                        // fill in frontmatter
                        file.data.frontmatter = {
                            title: file.stem ?? "Untitled",
                            tags: [],
                            ...data,
                        };
                    };
                },
            ];
        },
    };
};
