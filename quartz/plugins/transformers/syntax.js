import rehypePrettyCode, { Options as CodeOptions } from "rehype-pretty-code";
export const SyntaxHighlighting = () => ({
    name: "SyntaxHighlighting",
    htmlPlugins() {
        return [
            [
                rehypePrettyCode,
                {
                    theme: "css-variables",
                }, satisfies, Partial < CodeOptions > ,
            ],
        ];
    },
});
