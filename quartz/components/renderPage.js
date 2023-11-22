import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { render } from "preact-render-to-string";
import HeaderConstructor from "./Header";
import BodyConstructor from "./Body";
import { JSResourceToScriptElement } from "../util/resources";
import { joinSegments } from "../util/path";
import { visit } from "unist-util-visit";
export function pageResources(baseDir, staticResources) {
    const contentIndexPath = joinSegments(baseDir, "static/contentIndex.json");
    const contentIndexScript = `const fetchData = fetch(\`${contentIndexPath}\`).then(data => data.json())`;
    return {
        css: [joinSegments(baseDir, "index.css"), ...staticResources.css],
        js: [
            {
                src: joinSegments(baseDir, "prescript.js"),
                loadTime: "beforeDOMReady",
                contentType: "external",
            },
            {
                loadTime: "beforeDOMReady",
                contentType: "inline",
                spaPreserve: true,
                script: contentIndexScript,
            },
            ...staticResources.js,
            {
                src: joinSegments(baseDir, "postscript.js"),
                loadTime: "afterDOMReady",
                moduleType: "module",
                contentType: "external",
            },
        ],
    };
}
export function renderPage(slug, componentData, components, pageResources) {
    // process transcludes in componentData
    visit(componentData.tree, "element", (node, _index, _parent) => {
        if (node.tagName === "blockquote") {
            const classNames = (node.properties?.className ?? []);
            if (classNames.includes("transclude")) {
                const inner = node.children[0];
                const transcludeTarget = inner.properties?.["data-slug"];
                // TODO: avoid this expensive find operation and construct an index ahead of time
                const page = componentData.allFiles.find((f) => f.slug === transcludeTarget);
                if (!page) {
                    return;
                }
                let blockRef = node.properties?.dataBlock;
                if (blockRef?.startsWith("^")) {
                    // block transclude
                    blockRef = blockRef.slice(1);
                    let blockNode = page.blocks?.[blockRef];
                    if (blockNode) {
                        if (blockNode.tagName === "li") {
                            blockNode = {
                                type: "element",
                                tagName: "ul",
                                children: [blockNode],
                            };
                        }
                        node.children = [
                            blockNode,
                            {
                                type: "element",
                                tagName: "a",
                                properties: { href: inner.properties?.href, class: ["internal"] },
                                children: [{ type: "text", value: `Link to original` }],
                            },
                        ];
                    }
                }
                else if (blockRef?.startsWith("#") && page.htmlAst) {
                    // header transclude
                    blockRef = blockRef.slice(1);
                    let startIdx = undefined;
                    let endIdx = undefined;
                    for (const [i, el] of page.htmlAst.children.entries()) {
                        if (el.type === "element" && el.tagName.match(/h[1-6]/)) {
                            if (endIdx) {
                                break;
                            }
                            if (startIdx !== undefined) {
                                endIdx = i;
                            }
                            else if (el.properties?.id === blockRef) {
                                startIdx = i;
                            }
                        }
                    }
                    if (startIdx === undefined) {
                        return;
                    }
                    node.children = [
                        ...page.htmlAst.children.slice(startIdx, endIdx),
                        {
                            type: "element",
                            tagName: "a",
                            properties: { href: inner.properties?.href, class: ["internal"] },
                            children: [{ type: "text", value: `Link to original` }],
                        },
                    ];
                }
                else if (page.htmlAst) {
                    // page transclude
                    node.children = [
                        {
                            type: "element",
                            tagName: "h1",
                            children: [
                                { type: "text", value: page.frontmatter?.title ?? `Transclude of ${page.slug}` },
                            ],
                        },
                        ...page.htmlAst.children,
                        {
                            type: "element",
                            tagName: "a",
                            properties: { href: inner.properties?.href, class: ["internal"] },
                            children: [{ type: "text", value: `Link to original` }],
                        },
                    ];
                }
            }
        }
    });
    const { head: Head, header, beforeBody, pageBody: Content, left, right, footer: Footer, } = components;
    const Header = HeaderConstructor();
    const Body = BodyConstructor();
    const LeftComponent = (_jsx("div", { class: "left sidebar", children: left.map((BodyComponent) => (_jsx(BodyComponent, { ...componentData }, void 0))) }, void 0));
    const RightComponent = (_jsx("div", { class: "right sidebar", children: right.map((BodyComponent) => (_jsx(BodyComponent, { ...componentData }, void 0))) }, void 0));
    const doc = (_jsxs("html", { children: [_jsx(Head, { ...componentData }, void 0), _jsx("body", { "data-slug": slug, children: _jsxs("div", { id: "quartz-root", class: "page", children: [_jsxs(Body, { ...componentData, children: [LeftComponent, _jsxs("div", { class: "center", children: [_jsxs("div", { class: "page-header", children: [_jsx(Header, { ...componentData, children: header.map((HeaderComponent) => (_jsx(HeaderComponent, { ...componentData }, void 0))) }, void 0), _jsx("div", { class: "popover-hint", children: beforeBody.map((BodyComponent) => (_jsx(BodyComponent, { ...componentData }, void 0))) }, void 0)] }, void 0), _jsx(Content, { ...componentData }, void 0)] }, void 0), RightComponent] }, void 0), _jsx(Footer, { ...componentData }, void 0)] }, void 0) }, void 0), pageResources.js
                .filter((resource) => resource.loadTime === "afterDOMReady")
                .map((res) => JSResourceToScriptElement(res))] }, void 0));
    return "<!DOCTYPE html>\n" + render(doc);
}
