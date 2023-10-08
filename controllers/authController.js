const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {promisify} = require('util');
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
    const token = createToken({ id: user.id, email: user.email });
    const response = {
      token: token,
      name: user.name,
      email: user.email,
    };
    return SuccessResponse(res, response, 201);
  } catch (err) {
    return ErrResponse(res, err);
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return ErrResponse(res, "User not found", 404);
    }
    const isPasswordvalid = bcrypt.compareSync(password, user.password);
    if (!isPasswordvalid) {
      return ErrResponse(res, "Password not valid", 401);
    }

    const token = createToken({ id: user.id, email: user.email });
    const response = {
      token: token,
      name: user.name,
      email: user.email,
    };
    return SuccessResponse(res, response, 200);
  } catch (err) {
    return ErrResponse(res, err);
  }
};

module.exports.authMiddleware = async (req, res, next) => {
  try{
      if(req.headers && req.headers.authorization){
          const decoded = await promisify(jwt.verify)(req.headers.authorization, config.JWT_SECRET);
          const user = await User.findById(decoded.id);

          if(!user){
            return ErrResponse(res, 'The user belonging to this token does no longer exist', 404);
          }
          req.user = user;
          next();
      }else{
        return ErrResponse(res, 'You are not logged in! Please log in to get access', 403);
      }
  }catch(err){
    return ErrResponse(res, err);
  }
}
