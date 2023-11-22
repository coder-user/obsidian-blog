import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { joinSegments, pathToRoot } from "../util/path";
import { JSResourceToScriptElement } from "../util/resources";
export default (() => {
    function Head({ cfg, fileData, externalResources }) {
        const title = fileData.frontmatter?.title ?? "Untitled";
        const description = fileData.description?.trim() ?? "No description provided";
        const { css, js } = externalResources;
        const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`);
        const path = url.pathname;
        const baseDir = fileData.slug === "404" ? path : pathToRoot(fileData.slug);
        const iconPath = joinSegments(baseDir, "static/icon.png");
        const ogImagePath = `https://${cfg.baseUrl}/static/og-image.png`;
        return (_jsxs("head", { children: [_jsx("title", { children: title }, void 0), _jsx("meta", { charSet: "utf-8" }, void 0), _jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" }, void 0), _jsx("meta", { property: "og:title", content: title }, void 0), _jsx("meta", { property: "og:description", content: description }, void 0), cfg.baseUrl && _jsx("meta", { property: "og:image", content: ogImagePath }, void 0), _jsx("meta", { property: "og:width", content: "1200" }, void 0), _jsx("meta", { property: "og:height", content: "675" }, void 0), _jsx("link", { rel: "icon", href: iconPath }, void 0), _jsx("meta", { name: "description", content: description }, void 0), _jsx("meta", { name: "generator", content: "Quartz" }, void 0), _jsx("link", { rel: "preconnect", href: "https://fonts.googleapis.com" }, void 0), _jsx("link", { rel: "preconnect", href: "https://fonts.gstatic.com" }, void 0), css.map((href) => (_jsx("link", { href: href, rel: "stylesheet", type: "text/css", "spa-preserve": true }, href))), js
                    .filter((resource) => resource.loadTime === "beforeDOMReady")
                    .map((res) => JSResourceToScriptElement(res, true))] }, void 0));
    }
    return Head;
});
satisfies;
QuartzComponentConstructor;
