import BodyConstructor from "../../components/Body";
import { pageResources, renderPage } from "../../components/renderPage";
import { sharedPageComponents } from "../../../quartz.layout";
import { NotFound } from "../../components";
import { defaultProcessedContent } from "../vfile";
export const NotFoundPage = () => {
    const opts = {
        ...sharedPageComponents,
        pageBody: NotFound(),
        beforeBody: [],
        left: [],
        right: [],
    };
    const { head: Head, pageBody, footer: Footer } = opts;
    const Body = BodyConstructor();
    return {
        name: "404Page",
        getQuartzComponents() {
            return [Head, Body, pageBody, Footer];
        },
        async emit(ctx, _content, resources, emit) {
            const cfg = ctx.cfg.configuration;
            const slug = "404";
            const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`);
            const path = url.pathname;
            const externalResources = pageResources(path, resources);
            const [tree, vfile] = defaultProcessedContent({
                slug,
                text: "Not Found",
                description: "Not Found",
                frontmatter: { title: "Not Found", tags: [] },
            });
            const componentData = {
                fileData: vfile.data,
                externalResources,
                cfg,
                children: [],
                tree,
                allFiles: [],
            };
            return [
                await emit({
                    content: renderPage(slug, componentData, opts, externalResources),
                    slug,
                    ext: ".html",
                }),
            ];
        },
    };
};
