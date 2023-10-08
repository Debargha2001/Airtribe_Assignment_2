const User = require("../models/user");
const { ErrResponse, SuccessResponse } = require("../utils/response");

module.exports.updatePreferences = async (req, res) => {
  try {
    if (!req.user) {
      return ErrResponse(res, "User not logged in", 401);
    }
    const { action, category } = req.body;
    if (!["add", "remove"].includes(action)) {
      return ErrResponse(res, "Invalid action", 422);
    }
    let updatedUser;
    switch (action) {
      case "add":
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
