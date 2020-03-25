
const generateMsg = (username, text) => {
  return {
    text,
    username,
    createdAt: new Date().getTime()
  };
};

const generateLocationMsg = (username, url) => {
  return {
    url,
    username,
    createdAt: new Date().getTime()
  }
};

module.exports = {
  generateMsg,
  generateLocationMsg
};