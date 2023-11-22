import HeaderConstructor from "../../components/Header";
import BodyConstructor from "../../components/Body";
import { pageResources, renderPage } from "../../components/renderPage";
import { defaultProcessedContent } from "../vfile";
import { getAllSegmentPrefixes, joinSegments, pathToRoot, } from "../../util/path";
import { defaultListPageLayout, sharedPageComponents } from "../../../quartz.layout";
import { TagContent } from "../../components";
export const TagPage = (userOpts) => {
    const opts = {
        ...sharedPageComponents,
        ...defaultListPageLayout,
        pageBody: TagContent(),
        ...userOpts,
    };
    const { head: Head, header, beforeBody, pageBody, left, right, footer: Footer } = opts;
    const Header = HeaderConstructor();
    const Body = BodyConstructor();
    return {
        name: "TagPage",
        getQuartzComponents() {
            return [Head, Header, Body, ...header, ...beforeBody, pageBody, ...left, ...right, Footer];
        },
        async emit(ctx, content, resources, emit) {
            const fps = [];
            const allFiles = content.map((c) => c[1].data);
            const cfg = ctx.cfg.configuration;
            const tags = new Set(allFiles.flatMap((data) => data.frontmatter?.tags ?? []).flatMap(getAllSegmentPrefixes));
            // add base tag
            tags.add("index");
            const tagDescriptions = Object.fromEntries([...tags].map((tag) => {
                const title = tag === "" ? "Tag Index" : `Tag: #${tag}`;
                return [
                    tag,
                    defaultProcessedContent({
                        slug: joinSegments("tags", tag),
                        frontmatter: { title, tags: [] },
                    }),
                ];
            }));
            for (const [tree, file] of content) {
                const slug = file.data.slug;
                if (slug.startsWith("tags/")) {
                    const tag = slug.slice("tags/".length);
                    if (tags.has(tag)) {
                        tagDescriptions[tag] = [tree, file];
                    }
                }
            }
            for (const tag of tags) {
                const slug = joinSegments("tags", tag);
                const externalResources = pageResources(pathToRoot(slug), resources);
                const [tree, file] = tagDescriptions[tag];
                const componentData = {
                    fileData: file.data,
                    externalResources,
                    cfg,
                    children: [],
                    tree,
                    allFiles,
                };
                const content = renderPage(slug, componentData, opts, externalResources);
                const fp = await emit({
                    content,
                    slug: file.data.slug,
                    ext: ".html",
                });
                fps.push(fp);
            }
            return fps;
        },
    };
};
