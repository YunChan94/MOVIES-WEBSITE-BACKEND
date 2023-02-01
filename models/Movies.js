const fs = require("fs");
const path = require("path");

const Movies = {
  all: function () {
    const DATA_PATH = path.join(
      path.dirname(require.main.filename),
      "data",
      "movieList.json"
    );
    return JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
  },
};

module.exports = Movies;
