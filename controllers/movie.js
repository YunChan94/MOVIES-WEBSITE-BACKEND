const movie = require("../models/Movies");

exports.getTrending = (req, res, next) => {
  const movieList = movie.all().sort(compareValues("popularity", "desc"));
  let perPage = 20; //số lượng movie xuất hiện trên 1 page
  let page;
  //🔴page (Optional): thứ tự của trang dữ liệu muốn lấy, nếu người dùng không có parram này thì mặc định page = 1.
  if (!req.params.page) {
    page = 1;
  } else {
    page = req.params.page;
  }
  const pagingList = movieList.skip(perPage * page - perPage).limit(perPage);
  const totalPage = Math.ceil(movieList.length / perPage); //tổng số phim / số movie/page

  // Gửi dữ liệu
  res
    .status(200)
    .send({ results: pagingList, page: page, total_pages: totalPage });
};

/////// Reusable Funtion ///////
// Hàm so sánh
const compareValues = (key, order = "asc") => {
  return function (a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // nếu không tồn tại
      return 0;
    }

    const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order == "desc" ? comparison * -1 : comparison;
  };
};

function limit(c) {
  return this.filter((x, i) => {
    if (i <= c - 1) {
      return true;
    }
  });
}

Array.prototype.limit = limit;

function skip(c) {
  return this.filter((x, i) => {
    if (i > c - 1) {
      return true;
    }
  });
}

Array.prototype.skip = skip;
