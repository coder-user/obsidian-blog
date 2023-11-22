import { joinSegments, slugifyFilePath } from "../../util/path";
import path from "path";
import fs from "fs";
import { glob } from "../../util/glob";
export const Assets = () => {
    return {
        name: "Assets",
        getQuartzComponents() {
            return [];
        },
        async emit({ argv, cfg }, _content, _resources, _emit) {
            // glob all non MD/MDX/HTML files in content folder and copy it over
            const assetsPath = argv.output;
            const fps = await glob("**", argv.directory, ["**/*.md", ...cfg.configuration.ignorePatterns]);
            const res = [];
            for (const fp of fps) {
                const ext = path.extname(fp);
                const src = joinSegments(argv.directory, fp);
                const name = (slugifyFilePath(fp, true) + ext);
                const dest = joinSegments(assetsPath, name);
                const dir = path.dirname(dest);
                await fs.promises.mkdir(dir, { recursive: true }); // ensure dir exists
                await fs.promises.copyFile(src, dest);
                res.push(dest);
            }
            return res;
        },
    };
};
