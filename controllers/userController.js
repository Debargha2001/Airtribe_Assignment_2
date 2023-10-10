const User = require("../models/user");
const { ErrResponse, SuccessResponse } = require("../utils/response");
const categories = require('../category.json');

module.exports.updatePreferences = async (req, res) => {
  try {
    if (!req.user) {
      return ErrResponse(res, "User not logged in", 401);
    }
    const { action, category } = req.body;
    if(!categories.includes(category)){
      return ErrResponse(res, `Category must be in the list [${categories}]`, 400);
    }
    if (!["add", "remove"].includes(action)) {
      return ErrResponse(res, "Invalid action", 422);
    }
    let updatedUser;
    switch (action) {
      case "add":
        if(req.user.preferences.length > 5){
          return ErrResponse(res, `You can add upto 5 catefories together`, 422);
        }
        updatedUser = await User.findOneAndUpdate(
          { _id: req.user.id },
          { $push: { preferences: category } },
          {
            new: true,
          }
        );
        break;
      case "remove":
        updatedUser = await User.findOneAndUpdate(
          { _id: req.user.id },
          { $pull: { preferences: category } },
          {
            new: true,
          }
        );
        break;
    }
    return SuccessResponse(res, { message: "Preference updated", user: updatedUser }, 200);
  } catch (err) {
    return ErrResponse(res, err);
  }
};

module.exports.getPreferences = async (req, res) => {
  try {
    if (!req.user) {
      return ErrResponse(res, "User not logged in", 401);
    }
    return SuccessResponse(res, { preferences: req.user.preferences }, 200);
  } catch (err) {
    return ErrResponse(res, err);
  }
};
