const movie = require("../models/Movies");
const genre = require("../models/Genre");

exports.searchMovie = (req, res, next) => {
  const keyword = req.body.keyword;
  const genreName = req.body.genre;
  const mediaType = req.body.mediaType;
  const language = req.body.lang;
  const year = req.body.year;
  //Nếu không có keyword
  if (!keyword) {
    return res.status(400).send("Not found keyword parram");
  }

  //Tìm những film phù hợp với đièu kiện
  const movieList = movie.all().filter((m) => {
    if (m.title) {
      return m.title.toUpperCase().includes(keyword.toUpperCase());
    }
    if (m.overview) {
      return m.overview.toUpperCase().includes(keyword.toUpperCase());
    }
  });

  //Trả err Nếu không tìm được kết quả phù hợp
  if (!movieList || movieList.length === 0) {
    return res.status(400).send("Not found movie");
  }

  //Paging
  let perPage = 20; //số lượng movie xuất hiện trên 1 page
  let page;
  if (!req.params.page) {
    page = 1;
  } else {
    page = req.params.page;
  }

  //Nếu tìm kiếm theo tham số khác
  if (genreName !== "" || mediaType !== "" || language !== "" || year !== "") {
    //Tìm theo genre
    //Tìm trong genreList.json

    const movieByGenre = movieList.filter((m) => {
      if (genreName !== "") {
        return m.genre_ids.includes(
          genre
            .all()
            .find((g) => g.name.toUpperCase() === genreName.toUpperCase()).id
        );
      } else {
        return m;
      }
    });

    //Tìm theo mediaType
    const movieByMediaType = movieByGenre.filter((m) => {
      if (mediaType !== "") {
        return m.media_type === mediaType;
      } else {
        return m;
      }
    });

    //Tìm theo language
    const movieByLang = movieByMediaType.filter((m) => {
      if (language !== "") {
        if (m.original_language) {
          return m.original_language === language;
        }
      } else {
        return m;
      }
    });

    //Tìm theo năm phát hành year
    const movieByYear = movieByLang.filter((m) => {
      if (year !== "") {
        if (m.release_date) {
          return m.release_date.includes(year);
        }
      } else {
        return m;
      }
    });

    //Nếu không có kết quả
    if (movieByYear.length === 0) {
      return res.status(400).send("Not found movie matching");
    }

    const pagingList = movieByYear
      .skip(perPage * page - perPage)
      .limit(perPage);
    const totalPage = Math.ceil(movieByYear.length / perPage); //tổng số phim / số movie/page

    // Gửi dữ liệu
    res.status(200).json({
      results: pagingList,
      page: page,
      total_pages: totalPage,
    });
  } else {
    const pagingList = movieList.skip(perPage * page - perPage).limit(perPage);
    const totalPage = Math.ceil(movieList.length / perPage); //tổng số phim / số movie/page

    // Gửi dữ liệu
    res.status(200).json({
      results: pagingList,
      page: page,
      total_pages: totalPage,
    });
  }
};
