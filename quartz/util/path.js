import { slug } from "github-slugger";
// this file must be isomorphic so it can't use node libs (e.g. path)
export const QUARTZ = "quartz";
export function isFilePath(s) {
    const validStart = !s.startsWith(".");
    return validStart && _hasFileExtension(s);
}
export function isFullSlug(s) {
    const validStart = !(s.startsWith(".") || s.startsWith("/"));
    const validEnding = !s.endsWith("/");
    return validStart && validEnding && !_containsForbiddenCharacters(s);
}
export function isSimpleSlug(s) {
    const validStart = !(s.startsWith(".") || s.startsWith("/"));
    const validEnding = !(s.endsWith("/index") || s === "index");
    return validStart && !_containsForbiddenCharacters(s) && validEnding && !_hasFileExtension(s);
}
export function isRelativeURL(s) {
    const validStart = /^\.{1,2}/.test(s);
    const validEnding = !(s.endsWith("/index") || s === "index");
    return validStart && validEnding && ![".md", ".html"].includes(_getFileExtension(s) ?? "");
}
export function getFullSlug(window) {
    const res = window.document.body.dataset.slug;
    return res;
}
export function slugifyFilePath(fp, excludeExt) {
    fp = _stripSlashes(fp);
    let ext = _getFileExtension(fp);
    const withoutFileExt = fp.replace(new RegExp(ext + "$"), "");
    if (excludeExt || [".md", ".html", undefined].includes(ext)) {
        ext = "";
    }
    let slug = withoutFileExt
        .split("/")
        .map((segment) => segment.replace(/\s/g, "-").replace(/%/g, "-percent").replace(/\?/g, "-q")) // slugify all segments
        .join("/") // always use / as sep
        .replace(/\/$/, ""); // remove trailing slash
    // treat _index as index
    if (_endsWith(slug, "_index")) {
        slug = slug.replace(/_index$/, "index");
    }
    return (slug + ext);
}
export function simplifySlug(fp) {
    return _stripSlashes(_trimSuffix(fp, "index"), true);
}
export function transformInternalLink(link) {
    let [fplike, anchor] = splitAnchor(decodeURI(link));
    const folderPath = _isFolderPath(fplike);
    let segments = fplike.split("/").filter((x) => x.length > 0);
    let prefix = segments.filter(_isRelativeSegment).join("/");
    let fp = segments.filter((seg) => !_isRelativeSegment(seg) && seg !== "").join("/");
    // manually add ext here as we want to not strip 'index' if it has an extension
    const simpleSlug = simplifySlug(slugifyFilePath(fp));
    const joined = joinSegments(_stripSlashes(prefix), _stripSlashes(simpleSlug));
    const trail = folderPath ? "/" : "";
    const res = (_addRelativeToStart(joined) + trail + anchor);
    return res;
}
// from micromorph/src/utils.ts
// https://github.com/natemoo-re/micromorph/blob/main/src/utils.ts#L5
export function normalizeRelativeURLs(el, destination) {
    const rebase = (el, attr, newBase) => {
        const rebased = new URL(el.getAttribute(attr), newBase);
        el.setAttribute(attr, rebased.pathname + rebased.hash);
    };
    el.querySelectorAll('[href^="./"], [href^="../"]').forEach((item) => rebase(item, "href", destination));
    el.querySelectorAll('[src^="./"], [src^="../"]').forEach((item) => rebase(item, "src", destination));
}
// resolve /a/b/c to ../..
export function pathToRoot(slug) {
    let rootPath = slug
        .split("/")
        .filter((x) => x !== "")
        .slice(0, -1)
        .map((_) => "..")
        .join("/");
    if (rootPath.length === 0) {
        rootPath = ".";
    }
    return rootPath;
}
export function resolveRelative(current, target) {
    const res = joinSegments(pathToRoot(current), simplifySlug(target));
    return res;
}
export function splitAnchor(link) {
    let [fp, anchor] = link.split("#", 2);
    anchor = anchor === undefined ? "" : "#" + slugAnchor(anchor);
    return [fp, anchor];
}
export function slugAnchor(anchor) {
    return slug(anchor);
}
export function slugTag(tag) {
    return tag
        .split("/")
        .map((tagSegment) => slug(tagSegment))
        .join("/");
}
export function joinSegments(...args) {
    return args
        .filter((segment) => segment !== "")
        .join("/")
        .replace(/\/\/+/g, "/");
}
export function getAllSegmentPrefixes(tags) {
    const segments = tags.split("/");
    const results = [];
    for (let i = 0; i < segments.length; i++) {
        results.push(segments.slice(0, i + 1).join("/"));
    }
    return results;
}
export function transformLink(src, target, opts) {
    let targetSlug = transformInternalLink(target);
    if (opts.strategy === "relative") {
        return targetSlug;
    }
    else {
        const folderTail = _isFolderPath(targetSlug) ? "/" : "";
        const canonicalSlug = _stripSlashes(targetSlug.slice(".".length));
        let [targetCanonical, targetAnchor] = splitAnchor(canonicalSlug);
        if (opts.strategy === "shortest") {
            // if the file name is unique, then it's just the filename
            const matchingFileNames = opts.allSlugs.filter((slug) => {
                const parts = slug.split("/");
                const fileName = parts.at(-1);
                return targetCanonical === fileName;
            });
            // only match, just use it
            if (matchingFileNames.length === 1) {
                const targetSlug = matchingFileNames[0];
                return (resolveRelative(src, targetSlug) + targetAnchor);
            }
        }
        // if it's not unique, then it's the absolute path from the vault root
        return (joinSegments(pathToRoot(src), canonicalSlug) + folderTail);
    }
}
function _isFolderPath(fplike) {
    return (fplike.endsWith("/") ||
        _endsWith(fplike, "index") ||
        _endsWith(fplike, "index.md") ||
        _endsWith(fplike, "index.html"));
}
function _endsWith(s, suffix) {
    return s === suffix || s.endsWith("/" + suffix);
}
function _trimSuffix(s, suffix) {
    if (_endsWith(s, suffix)) {
        s = s.slice(0, -suffix.length);
    }
    return s;
}
function _containsForbiddenCharacters(s) {
    return s.includes(" ") || s.includes("#") || s.includes("?");
}
function _hasFileExtension(s) {
    return _getFileExtension(s) !== undefined;
}
function _getFileExtension(s) {
    return s.match(/\.[A-Za-z0-9]+$/)?.[0];
}
function _isRelativeSegment(s) {
    return /^\.{0,2}$/.test(s);
}
export function _stripSlashes(s, onlyStripPrefix) {
    if (s.startsWith("/")) {
        s = s.substring(1);
    }
    if (!onlyStripPrefix && s.endsWith("/")) {
        s = s.slice(0, -1);
    }
    return s;
}
function _addRelativeToStart(s) {
    if (s === "") {
        s = ".";
    }
    if (!s.startsWith(".")) {
        s = joinSegments(".", s);
    }
    return s;
}
