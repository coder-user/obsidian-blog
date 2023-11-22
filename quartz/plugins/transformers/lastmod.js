import fs from "fs";
import path from "path";
import { Repository } from "@napi-rs/simple-git";
import chalk from "chalk";
const defaultOptions = {
    priority: ["frontmatter", "git", "filesystem"],
};
function coerceDate(fp, d) {
    const dt = new Date(d);
    const invalidDate = isNaN(dt.getTime()) || dt.getTime() === 0;
    if (invalidDate && d !== undefined) {
        console.log(chalk.yellow(`\nWarning: found invalid date "${d}" in \`${fp}\`. Supported formats: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format`));
    }
    return invalidDate ? new Date() : dt;
}
export const CreatedModifiedDate = (userOpts) => {
    const opts = { ...defaultOptions, ...userOpts };
    return {
        name: "CreatedModifiedDate",
        markdownPlugins() {
            return [
                () => {
                    let repo = undefined;
                    return async (_tree, file) => {
                        let created = undefined;
                        let modified = undefined;
                        let published = undefined;
                        const fp = file.data.filePath;
                        const fullFp = path.posix.join(file.cwd, fp);
                        for (const source of opts.priority) {
                            if (source === "filesystem") {
                                const st = await fs.promises.stat(fullFp);
                                created ||= st.birthtimeMs;
                                modified ||= st.mtimeMs;
                            }
                            else if (source === "frontmatter" && file.data.frontmatter) {
                                created ||= file.data.frontmatter.date;
                                modified ||= file.data.frontmatter.lastmod;
                                modified ||= file.data.frontmatter.updated;
                                modified ||= file.data.frontmatter["last-modified"];
                                published ||= file.data.frontmatter.publishDate;
                            }
                            else if (source === "git") {
                                if (!repo) {
                                    repo = new Repository(file.cwd);
                                }
                                modified ||= await repo.getFileLatestModifiedDateAsync(file.data.filePath);
                            }
                        }
                        file.data.dates = {
                            created: coerceDate(fp, created),
                            modified: coerceDate(fp, modified),
                            published: coerceDate(fp, published),
                        };
                    };
                },
            ];
        },
    };
};
