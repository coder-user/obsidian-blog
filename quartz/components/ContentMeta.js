import { jsx as _jsx } from "preact/jsx-runtime";
import { formatDate, getDate } from "./Date";
import readingTime from "reading-time";
export default (() => {
    function ContentMetadata({ cfg, fileData, displayClass }) {
        const text = fileData.text;
        if (text) {
            const segments = [];
            const { text: timeTaken, words: _words } = readingTime(text);
            if (fileData.dates) {
                segments.push(formatDate(getDate(cfg, fileData)));
            }
            segments.push(timeTaken);
            return _jsx("p", { class: `content-meta ${displayClass ?? ""}`, children: segments.join(", ") }, void 0);
        }
        else {
            return null;
        }
    }
    ContentMetadata.css = `
  .content-meta {
    margin-top: 0;
    color: var(--gray);
  }
  `;
    return ContentMetadata;
});
satisfies;
QuartzComponentConstructor;
