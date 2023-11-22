import { jsx as _jsx } from "preact/jsx-runtime";
function ArticleTitle({ fileData, displayClass }) {
    const title = fileData.frontmatter?.title;
    if (title) {
        return _jsx("h1", { class: `article-title ${displayClass ?? ""}`, children: title }, void 0);
    }
    else {
        return null;
    }
}
ArticleTitle.css = `
.article-title {
  margin: 2rem 0 0 0;
}
`;
export default (() => ArticleTitle);
satisfies;
QuartzComponentConstructor;
