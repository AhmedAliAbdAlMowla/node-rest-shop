module.exports = (req, res, next) => {
  res.setHeader("Access-Conreol-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Orgin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GIT, POST, PUT, PATCH, DELETE "
    );
    return res.status(200).json({});
  }

  next();
};
