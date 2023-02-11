const token = require("../models/Token");

exports.authorize = (req, res, next) => {
  const userToken = req.query.token;
  //Nếu req không có token
  if (!userToken) {
    return res.status(401).send("Unauthorized");
  }
  //Nếu có token
  const checkedToken = token.all().find((t) => t.token === userToken);

  //Nếu sai token (không tìm thấy trong data)
  if (!checkedToken) {
    return res.status(401).send("Unauthorized");
  }
  //Nếu đúng token
  next();
};
