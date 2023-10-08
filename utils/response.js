const SuccessResponse = (res, data, status = 200) => {
  return res.status(status).json({ data, success: true });
};

const ErrResponse = (res, err, status = 500) => {
  if(typeof err == 'object' && typeof err.message != 'undefined'){
    err = err.message;
    console.log(err)
}

  return res.status(status).json({
    success: false,
    message: err,
  });
};

module.exports = {
  SuccessResponse,
  ErrResponse,
};
