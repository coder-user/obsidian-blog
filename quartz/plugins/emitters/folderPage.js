import HeaderConstructor from "../../components/Header";
import BodyConstructor from "../../components/Body";
import { pageResources, renderPage } from "../../components/renderPage";
import { defaultProcessedContent } from "../vfile";
import path from "path";
import { _stripSlashes, joinSegments, pathToRoot, simplifySlug, } from "../../util/path";
import { defaultListPageLayout, sharedPageComponents } from "../../../quartz.layout";
import { FolderContent } from "../../components";
export const FolderPage = (userOpts) => {
    const opts = {
        ...sharedPageComponents,
        ...defaultListPageLayout,
        pageBody: FolderContent(),
        ...userOpts,
    };
    const { head: Head, header, beforeBody, pageBody, left, right, footer: Footer } = opts;
    const Header = HeaderConstructor();
    const Body = BodyConstructor();
    return {
        name: "FolderPage",
        getQuartzComponents() {
            return [Head, Header, Body, ...header, ...beforeBody, pageBody, ...left, ...right, Footer];
        },
        async emit(ctx, content, resources, emit) {
            const fps = [];
            const allFiles = content.map((c) => c[1].data);
            const cfg = ctx.cfg.configuration;
            const folders = new Set(allFiles.flatMap((data) => {
                const slug = data.slug;
                const folderName = path.dirname(slug ?? "");
                if (slug && folderName !== "." && folderName !== "tags") {
                    return [folderName];
                }
                return [];
            }));
            const folderDescriptions = Object.fromEntries([...folders].map((folder) => [
                folder,
                defaultProcessedContent({
                    slug: joinSegments(folder, "index"),
                    frontmatter: { title: `Folder: ${folder}`, tags: [] },
                }),
            ]));
            for (const [tree, file] of content) {
                const slug = _stripSlashes(simplifySlug(file.data.slug));
                if (folders.has(slug)) {
                    folderDescriptions[slug] = [tree, file];
                }
            }
            for (const folder of folders) {
                const slug = joinSegments(folder, "index");
                const externalResources = pageResources(pathToRoot(slug), resources);
                const [tree, file] = folderDescriptions[folder];
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
            return fps;
        },
    };
};
