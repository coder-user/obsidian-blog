import { jsx as _jsx, Fragment as _Fragment } from "preact/jsx-runtime";
export default ((component) => {
    if (component) {
        const Component = component;
        function DesktopOnly(props) {
            return _jsx(Component, { displayClass: "desktop-only", ...props }, void 0);
        }
        DesktopOnly.displayName = component.displayName;
        DesktopOnly.afterDOMLoaded = component?.afterDOMLoaded;
        DesktopOnly.beforeDOMLoaded = component?.beforeDOMLoaded;
        DesktopOnly.css = component?.css;
        return DesktopOnly;
    }
    else {
        return () => _jsx(_Fragment, {}, void 0);
    }
});
satisfies;
QuartzComponentConstructor;
