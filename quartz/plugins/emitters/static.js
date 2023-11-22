import { QUARTZ, joinSegments } from "../../util/path";
import fs from "fs";
import { glob } from "../../util/glob";
export const Static = () => ({
    name: "Static",
    getQuartzComponents() {
        return [];
    },
    async emit({ argv, cfg }, _content, _resources, _emit) {
        const staticPath = joinSegments(QUARTZ, "static");
        const fps = await glob("**", staticPath, cfg.configuration.ignorePatterns);
        await fs.promises.cp(staticPath, joinSegments(argv.output, "static"), {
            recursive: true,
            dereference: true,
        });
        return fps.map((fp) => joinSegments(argv.output, "static", fp));
    },
});
