import { joinSegments } from "../../util/path";
import fs from "fs";
import chalk from "chalk";
export function extractDomainFromBaseUrl(baseUrl) {
    const url = new URL(`https://${baseUrl}`);
    return url.hostname;
}
export const CNAME = () => ({
    name: "CNAME",
    getQuartzComponents() {
        return [];
    },
    async emit({ argv, cfg }, _content, _resources, _emit) {
        if (!cfg.configuration.baseUrl) {
            console.warn(chalk.yellow("CNAME emitter requires `baseUrl` to be set in your configuration"));
            return [];
        }
        const path = joinSegments(argv.output, "CNAME");
        const content = extractDomainFromBaseUrl(cfg.configuration.baseUrl);
        if (!content) {
            return [];
        }
        fs.writeFileSync(path, content);
        return [path];
    },
});
