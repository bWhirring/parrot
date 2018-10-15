const oss = require("ali-oss");
const co = require("co");

const { OSS_KEY_ID, OSS_KEY_SECRET } = process.env;

const store = oss({
  accessKeyId: OSS_KEY_ID,
  accessKeySecret: OSS_KEY_SECRET,
  bucket: "assetsfordwd",
  region: "oss-cn-hangzhou",
});

const js = require("./dist/mainfest.json").main;

const { name, config } = require("./package.json");

const file = js.split(config.publicPath).pop();

co(function* () {
  return yield store.put(`${name}/${file}`, `./dist/${file}`);
}).then((val) => {
  console.log(`${val} has been uploaded to oss :${val.name}`);
});
