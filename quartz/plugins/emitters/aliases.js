import { joinSegments, resolveRelative, simplifySlug } from "../../util/path";
import path from "path";
export const AliasRedirects = () => ({
    name: "AliasRedirects",
    getQuartzComponents() {
        return [];
    },
    async emit({ argv }, content, _resources, emit) {
        const fps = [];
        for (const [_tree, file] of content) {
            const ogSlug = simplifySlug(file.data.slug);
            const dir = path.posix.relative(argv.directory, path.dirname(file.data.filePath));
            let aliases = file.data.frontmatter?.aliases ?? file.data.frontmatter?.alias ?? [];
            if (typeof aliases === "string") {
                aliases = [aliases];
            }
            const slugs = aliases.map((alias) => path.posix.join(dir, alias));
            const permalink = file.data.frontmatter?.permalink;
            if (typeof permalink === "string") {
                slugs.push(permalink);
            }
            for (let slug of slugs) {
                // fix any slugs that have trailing slash
                if (slug.endsWith("/")) {
                    slug = joinSegments(slug, "index");
                }
                const redirUrl = resolveRelative(slug, file.data.slug);
                const fp = await emit({
                    content: `
            <!DOCTYPE html>
            <html lang="en-us">
            <head>
            <title>${ogSlug}</title>
            <link rel="canonical" href="${redirUrl}">
            <meta name="robots" content="noindex">
            <meta charset="utf-8">
            <meta http-equiv="refresh" content="0; url=${redirUrl}">
            </head>
            </html>
            `,
                    slug,
                    ext: ".html",
                });
                fps.push(fp);
            }
        }
        return fps;
    },
});
