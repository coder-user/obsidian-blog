export function getStaticResourcesFromPlugins(ctx) {
    const staticResources = {
        css: [],
        js: [],
    };
    for (const transformer of ctx.cfg.plugins.transformers) {
        const res = transformer.externalResources ? transformer.externalResources(ctx) : {};
        if (res?.js) {
            staticResources.js.push(...res.js);
        }
        if (res?.css) {
            staticResources.css.push(...res.css);
        }
    }
    return staticResources;
}
export * from "./transformers";
export * from "./filters";
export * from "./emitters";
