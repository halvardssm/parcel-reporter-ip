var $cGDf0$parcelplugin = require("@parcel/plugin");
var $cGDf0$os = require("os");
var $cGDf0$publicip = require("public-ip");
var $cGDf0$parceldiagnostic = require("@parcel/diagnostic");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $c7f14c6d86c2358f$export$2e2bcd8739ae039);




const $c7f14c6d86c2358f$var$getPrivateIp = (logger)=>{
    try {
        const networkInterfaces = ($parcel$interopDefault($cGDf0$os)).networkInterfaces();
        const privateIpArray = (networkInterfaces.eth0 ?? networkInterfaces.en0) ?? [];
        const privateIpObject = privateIpArray.find((it)=>it.family === "IPv4" && it.internal === false
        ) ?? {
        };
        return privateIpObject.address;
    } catch (e) {
        logger.warn(e);
        return "";
    }
};
const $c7f14c6d86c2358f$var$getPublicIp = async (logger)=>{
    try {
        return await ($parcel$interopDefault($cGDf0$publicip)).v4();
    } catch (e) {
        logger.warn(e);
        return "";
    }
};
var $c7f14c6d86c2358f$export$2e2bcd8739ae039 = new $cGDf0$parcelplugin.Reporter({
    async report ({ event: event , options: options , logger: logger  }) {
        if (event.type === "buildStart") {
            const opt = options.serveOptions;
            if (!opt) {
                logger.warn({
                    message: `serveOptions not valid`
                });
                return;
            }
            const privateIp = $c7f14c6d86c2358f$var$getPrivateIp(logger);
            const publicIp = await $c7f14c6d86c2358f$var$getPublicIp(logger);
            const createUrl = (address)=>{
                const conn = `http${opt.https === false ? "" : "s"}`;
                return address ? `${conn}://${address}:${opt.port}` : "Not found";
            };
            logger.info({
                message: $cGDf0$parceldiagnostic.md`
**Private URL: ${createUrl(privateIp)}**
**Public URL: ${createUrl(publicIp)}**
`
            });
        }
    }
});


