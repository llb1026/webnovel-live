const crypto = require("crypto");

exports.hashSha = (input) => {
  const hasher = crypto.createHash("sha1");
  const inputString = JSON.stringify(input);
  hasher.update(inputString);
  return hasher.digest("hex");
}

exports.hashShaOfParaMap = (input) => {
  const mapAsc = new Map([...input.entries()].sort((a,b) => a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0));
  const tempArray = [];
  mapAsc.forEach((value, key, map) => {
    tempArray.push(value);
  });
  const hasher = crypto.createHash("sha1");
  const inputString = JSON.stringify(tempArray);
  hasher.update(inputString);
  return hasher.digest("hex");
}
