import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import style from "./styles/footer.scss";
export default ((opts) => {
    function Footer({ displayClass }) {
        const year = new Date().getFullYear();
        const links = opts?.links ?? [];
        return (_jsxs("footer", { class: `${displayClass ?? ""}`, children: [_jsx("hr", {}, void 0), _jsxs("p", { children: ["Created with coolliuzw by obsidian, \u00A9 ", year] }, void 0), _jsx("ul", { children: Object.entries(links).map(([text, link]) => (_jsx("li", { children: _jsx("a", { href: link, children: text }, void 0) }, void 0))) }, void 0)] }, void 0));
    }
    Footer.css = style;
    return Footer;
});
satisfies;
QuartzComponentConstructor;
