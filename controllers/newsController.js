const axios = require("axios");
const User = require("../models/user");
const { ErrResponse, SuccessResponse } = require("../utils/response");
const config = require("../config");

module.exports.fetchNewsbyCategory = async (req, res) => {
  try {
    if (!req.user) {
      return ErrResponse(res, "User not logged in", 401);
    }
    const categories = req.user.preferences.join(",");
    let reqConfig = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://newsdata.io/api/1/news?apikey=${config.NEWS_API_KEY}&category=${categories}&language=en`,
      headers: {},
    };

    const response = await axios.request(reqConfig);
    return SuccessResponse(res, { newsResponse: response.data }, 200);
  } catch (err) {
    return ErrResponse(res, err);
  }
};

module.exports.searchNews = async (req, res) => {
    try {
      if (!req.user) {
        return ErrResponse(res, "User not logged in", 401);
      }
      const {keyword} = req.params;
      const categories = req.user.preferences.join(",");
      let reqConfig = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://newsdata.io/api/1/news?apikey=${config.NEWS_API_KEY}&language=en&qInMeta=${keyword}`,
        headers: {},
      };
  
      const response = await axios.request(reqConfig);
      return SuccessResponse(res, { newsResponse: response.data }, 200);
    } catch (err) {
      return ErrResponse(res, err);
    }
  };

module.exports.fetchReadNews = async (req, res) => {
  try {
    if (!req.user) {
      return ErrResponse(res, "User not logged in", 401);
    }
    return SuccessResponse(res, { news: req.user.readNews }, 200);
  } catch (err) {
    return ErrResponse(res, err);
  }
};

module.exports.fetchFavoriteNews = async (req, res) => {
  try {
    if (!req.user) {
      return ErrResponse(res, "User not logged in", 401);
    }
    return SuccessResponse(res, { news: req.user.favoriteNews }, 200);
  } catch (err) {
    return ErrResponse(res, err);
  }
};

module.exports.setReadNews = async (req, res) => {
  try {
    if (!req.user) {
      return ErrResponse(res, "User not logged in", 401);
    }
    const newsDetails = req.body;
    await User.findOneAndUpdate(
      { _id: req.user.id },
      { $push: { readNews: newsDetails } }
    );
    return SuccessResponse(res, { message: "Marked as read" }, 200);
  } catch (err) {
    console.log(err)
    return ErrResponse(res, err);
  }
};

module.exports.setFavoriteNews = async (req, res) => {
  try {
    if (!req.user) {
      return ErrResponse(res, "User not logged in", 401);
    }
    const newsDetails = req.body;
    await User.findOneAndUpdate(
      { _id: req.user.id },
      { $push: { favoriteNews: newsDetails } }
    );
    return SuccessResponse(res, { message: "Added to favorites" }, 200);
  } catch (err) {
    return ErrResponse(res, err);
  }
};
