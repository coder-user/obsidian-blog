import * as Component from "./quartz/components";
// components shared across all pages
export const sharedPageComponents = {
    head: Component.Head(),
    header: [],
    footer: Component.Footer({
        links: {},
    }),
};
// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout = {
    beforeBody: [
        Component.Breadcrumbs(),
        Component.ArticleTitle(),
        Component.ContentMeta(),
        Component.TagList(),
    ],
    left: [
        Component.PageTitle(),
        Component.MobileOnly(Component.Spacer()),
        Component.Search(),
        Component.Darkmode(),
        Component.DesktopOnly(Component.Explorer()),
    ],
    right: [
        Component.Graph(),
        Component.DesktopOnly(Component.TableOfContents()),
        Component.Backlinks(),
    ],
};
// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout = {
    beforeBody: [Component.ArticleTitle()],
    left: [
        Component.PageTitle(),
        Component.MobileOnly(Component.Spacer()),
        Component.Search(),
        Component.Darkmode(),
    ],
    right: [],
};
