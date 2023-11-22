import { toString } from "hast-util-to-string";
import { escapeHTML } from "../../util/escape";
const defaultOptions = {
    descriptionLength: 150,
};
export const Description = (userOpts) => {
    const opts = { ...defaultOptions, ...userOpts };
    return {
        name: "Description",
        htmlPlugins() {
            return [
                () => {
                    return async (tree, file) => {
                        const frontMatterDescription = file.data.frontmatter?.description;
                        const text = escapeHTML(toString(tree));
                        const desc = frontMatterDescription ?? text;
                        const sentences = desc.replace(/\s+/g, " ").split(".");
                        let finalDesc = "";
                        let sentenceIdx = 0;
                        const len = opts.descriptionLength;
                        while (finalDesc.length < len) {
                            const sentence = sentences[sentenceIdx];
                            if (!sentence)
                                break;
                            finalDesc += sentence + ".";
                            sentenceIdx++;
                        }
                        file.data.description = finalDesc;
                        file.data.text = text;
                    };
                },
            ];
        },
    };
};
