export const ExplicitPublish = () => ({
    name: "ExplicitPublish",
    shouldPublish(_ctx, [_tree, vfile]) {
        const publishFlag = vfile.data?.frontmatter?.publish ?? false;
        return publishFlag;
    },
});
