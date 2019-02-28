const fs = require("fs");

module.exports = function(name, content) {
  fs.writeFileSync(`public/${name}`, content);
  // fs.writeFileSync(`upload/tst.txt`, content);
};
