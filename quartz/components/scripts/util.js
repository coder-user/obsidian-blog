export function registerEscapeHandler(outsideContainer, cb) {
    if (!outsideContainer)
        return;
    function click(e) {
        if (e.target !== this)
            return;
        e.preventDefault();
        cb();
    }
    function esc(e) {
        if (!e.key.startsWith("Esc"))
            return;
        e.preventDefault();
        cb();
    }
    outsideContainer?.removeEventListener("click", click);
    outsideContainer?.addEventListener("click", click);
    document.removeEventListener("keydown", esc);
    document.addEventListener("keydown", esc);
}
export function removeAllChildren(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}
