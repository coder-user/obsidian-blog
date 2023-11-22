import HeaderConstructor from "../../components/Header";
import BodyConstructor from "../../components/Body";
import { pageResources, renderPage } from "../../components/renderPage";
import { pathToRoot } from "../../util/path";
import { defaultContentPageLayout, sharedPageComponents } from "../../../quartz.layout";
import { Content } from "../../components";
import chalk from "chalk";
export const ContentPage = (userOpts) => {
    const opts = {
        ...sharedPageComponents,
        ...defaultContentPageLayout,
        pageBody: Content(),
        ...userOpts,
    };
    const { head: Head, header, beforeBody, pageBody, left, right, footer: Footer } = opts;
    const Header = HeaderConstructor();
    const Body = BodyConstructor();
    return {
        name: "ContentPage",
        getQuartzComponents() {
            return [Head, Header, Body, ...header, ...beforeBody, pageBody, ...left, ...right, Footer];
        },
        async emit(ctx, content, resources, emit) {
            const cfg = ctx.cfg.configuration;
            const fps = [];
            const allFiles = content.map((c) => c[1].data);
            let containsIndex = false;
            for (const [tree, file] of content) {
                const slug = file.data.slug;
                if (slug === "index") {
                    containsIndex = true;
                }
                const externalResources = pageResources(pathToRoot(slug), resources);
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
                    slug,
                    ext: ".html",
                });
                fps.push(fp);
            }
            if (!containsIndex) {
                console.log(chalk.yellow(`\nWarning: you seem to be missing an \`index.md\` home page file at the root of your \`${ctx.argv.directory}\` folder. This may cause errors when deploying.`));
            }
            return fps;
        },
    };
};
