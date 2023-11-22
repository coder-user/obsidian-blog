import { Document } from "flexsearch";
import { registerEscapeHandler, removeAllChildren } from "./util";
import { resolveRelative } from "../../util/path";
let index = undefined;
// Current searchType
let searchType = "basic";
const contextWindowWords = 30;
const numSearchResults = 5;
const numTagResults = 3;
function highlight(searchTerm, text, trim) {
    // try to highlight longest tokens first
    const tokenizedTerms = searchTerm
        .split(/\s+/)
        .filter((t) => t !== "")
        .sort((a, b) => b.length - a.length);
    let tokenizedText = text.split(/\s+/).filter((t) => t !== "");
    let startIndex = 0;
    let endIndex = tokenizedText.length - 1;
    if (trim) {
        const includesCheck = (tok) => tokenizedTerms.some((term) => tok.toLowerCase().startsWith(term.toLowerCase()));
        const occurencesIndices = tokenizedText.map(includesCheck);
        let bestSum = 0;
        let bestIndex = 0;
        for (let i = 0; i < Math.max(tokenizedText.length - contextWindowWords, 0); i++) {
            const window = occurencesIndices.slice(i, i + contextWindowWords);
            const windowSum = window.reduce((total, cur) => total + (cur ? 1 : 0), 0);
            if (windowSum >= bestSum) {
                bestSum = windowSum;
                bestIndex = i;
            }
        }
        startIndex = Math.max(bestIndex - contextWindowWords, 0);
        endIndex = Math.min(startIndex + 2 * contextWindowWords, tokenizedText.length - 1);
        tokenizedText = tokenizedText.slice(startIndex, endIndex);
    }
    const slice = tokenizedText
        .map((tok) => {
        // see if this tok is prefixed by any search terms
        for (const searchTok of tokenizedTerms) {
            if (tok.toLowerCase().includes(searchTok.toLowerCase())) {
                const regex = new RegExp(searchTok.toLowerCase(), "gi");
                return tok.replace(regex, `<span class="highlight">$&</span>`);
            }
        }
        return tok;
    })
        .join(" ");
    return `${startIndex === 0 ? "" : "..."}${slice}${endIndex === tokenizedText.length - 1 ? "" : "..."}`;
}
const encoder = (str) => str.toLowerCase().split(/([^a-z]|[^\x00-\x7F])/);
let prevShortcutHandler = undefined;
document.addEventListener("nav", async (e) => {
    const currentSlug = e.detail.url;
    const data = await fetchData;
    const container = document.getElementById("search-container");
    const sidebar = container?.closest(".sidebar");
    const searchIcon = document.getElementById("search-icon");
    const searchBar = document.getElementById("search-bar");
    const results = document.getElementById("results-container");
    const resultCards = document.getElementsByClassName("result-card");
    const idDataMap = Object.keys(data);
    function hideSearch() {
        container?.classList.remove("active");
        if (searchBar) {
            searchBar.value = ""; // clear the input when we dismiss the search
        }
        if (sidebar) {
            sidebar.style.zIndex = "unset";
        }
        if (results) {
            removeAllChildren(results);
        }
        searchType = "basic"; // reset search type after closing
    }
    function showSearch(searchTypeNew) {
        searchType = searchTypeNew;
        if (sidebar) {
            sidebar.style.zIndex = "1";
        }
        container?.classList.add("active");
        searchBar?.focus();
    }
    function shortcutHandler(e) {
        if (e.key === "k" && (e.ctrlKey || e.metaKey) && !e.shiftKey) {
            e.preventDefault();
            const searchBarOpen = container?.classList.contains("active");
            searchBarOpen ? hideSearch() : showSearch("basic");
        }
        else if (e.shiftKey && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
            // Hotkey to open tag search
            e.preventDefault();
            const searchBarOpen = container?.classList.contains("active");
            searchBarOpen ? hideSearch() : showSearch("tags");
            // add "#" prefix for tag search
            if (searchBar)
                searchBar.value = "#";
        }
        else if (e.key === "Enter") {
            // If result has focus, navigate to that one, otherwise pick first result
            if (results?.contains(document.activeElement)) {
                const active = document.activeElement;
                active.click();
            }
            else {
                const anchor = document.getElementsByClassName("result-card")[0];
                anchor?.click();
            }
        }
        else if (e.key === "ArrowDown") {
            e.preventDefault();
            // When first pressing ArrowDown, results wont contain the active element, so focus first element
            if (!results?.contains(document.activeElement)) {
                const firstResult = resultCards[0];
                firstResult?.focus();
            }
            else {
                // If an element in results-container already has focus, focus next one
                const nextResult = document.activeElement?.nextElementSibling;
                nextResult?.focus();
            }
        }
        else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (results?.contains(document.activeElement)) {
                // If an element in results-container already has focus, focus previous one
                const prevResult = document.activeElement?.previousElementSibling;
                prevResult?.focus();
            }
        }
    }
    function trimContent(content) {
        // works without escaping html like in `description.ts`
        const sentences = content.replace(/\s+/g, " ").split(".");
        let finalDesc = "";
        let sentenceIdx = 0;
        // Roughly estimate characters by (words * 5). Matches description length in `description.ts`.
        const len = contextWindowWords * 5;
        while (finalDesc.length < len) {
            const sentence = sentences[sentenceIdx];
            if (!sentence)
                break;
            finalDesc += sentence + ".";
            sentenceIdx++;
        }
        // If more content would be available, indicate it by finishing with "..."
        if (finalDesc.length < content.length) {
            finalDesc += "..";
        }
        return finalDesc;
    }
    const formatForDisplay = (term, id) => {
        const slug = idDataMap[id];
        return {
            id,
            slug,
            title: searchType === "tags" ? data[slug].title : highlight(term, data[slug].title ?? ""),
            // if searchType is tag, display context from start of file and trim, otherwise use regular highlight
            content: searchType === "tags"
                ? trimContent(data[slug].content)
                : highlight(term, data[slug].content ?? "", true),
            tags: highlightTags(term, data[slug].tags),
        };
    };
    function highlightTags(term, tags) {
        if (tags && searchType === "tags") {
            // Find matching tags
            const termLower = term.toLowerCase();
            let matching = tags.filter((str) => str.includes(termLower));
            // Substract matching from original tags, then push difference
            if (matching.length > 0) {
                let difference = tags.filter((x) => !matching.includes(x));
                // Convert to html (cant be done later as matches/term dont get passed to `resultToHTML`)
                matching = matching.map((tag) => `<li><p class="match-tag">#${tag}</p></li>`);
                difference = difference.map((tag) => `<li><p>#${tag}</p></li>`);
                matching.push(...difference);
            }
            // Only allow max of `numTagResults` in preview
            if (tags.length > numTagResults) {
                matching.splice(numTagResults);
            }
            return matching;
        }
        else {
            return [];
        }
    }
    const resultToHTML = ({ slug, title, content, tags }) => {
        const htmlTags = tags.length > 0 ? `<ul>${tags.join("")}</ul>` : ``;
        const button = document.createElement("button");
        button.classList.add("result-card");
        button.id = slug;
        button.innerHTML = `<h3>${title}</h3>${htmlTags}<p>${content}</p>`;
        button.addEventListener("click", () => {
            const targ = resolveRelative(currentSlug, slug);
            window.spaNavigate(new URL(targ, window.location.toString()));
            hideSearch();
        });
        return button;
    };
    function displayResults(finalResults) {
        if (!results)
            return;
        removeAllChildren(results);
        if (finalResults.length === 0) {
            results.innerHTML = `<button class="result-card">
                    <h3>No results.</h3>
                    <p>Try another search term?</p>
                </button>`;
        }
        else {
            results.append(...finalResults.map(resultToHTML));
        }
    }
    async function onType(e) {
        let term = e.target.value;
        let searchResults;
        if (term.toLowerCase().startsWith("#")) {
            searchType = "tags";
        }
        else {
            searchType = "basic";
        }
        switch (searchType) {
            case "tags": {
                term = term.substring(1);
                searchResults =
                    (await index?.searchAsync({ query: term, limit: numSearchResults, index: ["tags"] })) ??
                        [];
                break;
            }
            case "basic":
            default: {
                searchResults =
                    (await index?.searchAsync({
                        query: term,
                        limit: numSearchResults,
                        index: ["title", "content"],
                    })) ?? [];
            }
        }
        const getByField = (field) => {
            const results = searchResults.filter((x) => x.field === field);
            return results.length === 0 ? [] : [...results[0].result];
        };
        // order titles ahead of content
        const allIds = new Set([
            ...getByField("title"),
            ...getByField("content"),
            ...getByField("tags"),
        ]);
        const finalResults = [...allIds].map((id) => formatForDisplay(term, id));
        displayResults(finalResults);
    }
    if (prevShortcutHandler) {
        document.removeEventListener("keydown", prevShortcutHandler);
    }
    document.addEventListener("keydown", shortcutHandler);
    prevShortcutHandler = shortcutHandler;
    searchIcon?.removeEventListener("click", () => showSearch("basic"));
    searchIcon?.addEventListener("click", () => showSearch("basic"));
    searchBar?.removeEventListener("input", onType);
    searchBar?.addEventListener("input", onType);
    // setup index if it hasn't been already
    if (!index) {
        index = new Document({
            charset: "latin:extra",
            optimize: true,
            encode: encoder,
            document: {
                id: "id",
                index: [
                    {
                        field: "title",
                        tokenize: "reverse",
                    },
                    {
                        field: "content",
                        tokenize: "reverse",
                    },
                    {
                        field: "tags",
                        tokenize: "reverse",
                    },
                ],
            },
        });
        fillDocument(index, data);
    }
    // register handlers
    registerEscapeHandler(container, hideSearch);
});
/**
 * Fills flexsearch document with data
 * @param index index to fill
 * @param data data to fill index with
 */
async function fillDocument(index, data) {
    let id = 0;
    for (const [slug, fileData] of Object.entries(data)) {
        await index.addAsync(id, {
            id,
            slug: slug,
            title: fileData.title,
            content: fileData.content,
            tags: fileData.tags,
        });
        id++;
    }
}
