import { Reporter } from "@parcel/plugin";
import { PluginLogger, ServerOptions } from "@parcel/types";
import os from "os";
import publicIpFinder from "public-ip";
import { md } from "@parcel/diagnostic";

const getPrivateIp = (logger: PluginLogger): string => {
  try {
    const networkInterfaces = os.networkInterfaces();
    const privateIpArray =
      networkInterfaces.eth0 ?? networkInterfaces.en0 ?? [];
    const privateIpObject =
      privateIpArray.find(
        (it) => it.family === "IPv4" && it.internal === false
      ) ?? {};
    return privateIpObject.address;
  } catch (e) {
    logger.warn(e);
    return "";
  }
};

const getPublicIp = async (logger: PluginLogger): Promise<string> => {
  try {
    return await publicIpFinder.v4();
  } catch (e) {
    logger.warn(e);
    return "";
  }
};

export default new Reporter({
  async report({ event, options, logger }) {
    if (event.type === "buildStart") {
      const opt = options.serveOptions as ServerOptions;

      if (!opt) {
        logger.warn({ message: `serveOptions not valid` });
        return;
      }

      const privateIp = getPrivateIp(logger);
      const publicIp = await getPublicIp(logger);

      const createUrl = (address: string) => {
        const conn = `http${opt.https === false ? "" : "s"}`;
        return address ? `${conn}://${address}:${opt.port}` : "Not found";
      };

      logger.info({
        message: md`
**Private URL: ${createUrl(privateIp)}**
**Public URL: ${createUrl(publicIp)}**
`,
      });
    }
  },
});
