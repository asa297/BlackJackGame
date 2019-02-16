module.exports = (req, res, next) => {
  if (!req.params.username) {
    return res.status(400).send({ error: "Username is required" });
  }
  next();
};
