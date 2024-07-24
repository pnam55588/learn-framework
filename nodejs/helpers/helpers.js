const base64url = (str) => {
  return btoa(str)
    .toString("base64")
    .replace(/\+/, "-")
    .replace(/\//, "-")
    .replace(/\=/, "");
};

module.exports = { base64url };
