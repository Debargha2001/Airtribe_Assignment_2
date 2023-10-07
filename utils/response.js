const SuccessResponse = (res, status = 200, data) => {
  return res.status(status).json({ data, success: true });
};

const ErrResponse = (res, status = 500, err) => {
  return res.status(status).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

module.exports = {
  SuccessResponse,
  ErrResponse,
};
