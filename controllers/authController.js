const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const config = require("../config");
const { SuccessResponse, ErrResponse } = require("../utils/response");

const createToken = (payload) => {
  const token = jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: 864000,
  });
  return token;
};

module.exports.signUp = async (req, res) => {
  try {
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    };
    const user = await User.create(userData);
    const token = createToken({id: user.id, email: user.email});
    const response = {
        token: token,
        name: user.name,
        email: user.email,
    }
    return SuccessResponse(res, 200, response);
  } catch (err) {
    return ErrResponse(res, 500, err);
  }
};
