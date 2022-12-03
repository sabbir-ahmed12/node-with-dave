const User = require("../model/User");

const handleLogout = async (req, res) => {
  // On Client, also delete the accessToken

  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(204); //No content

  const refreshToken = cookies.jwt;

  // Is refreshToken in db?
  const foundUser = await User.findOne({ refreshToken }).exec();

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    return res.status(204);
  }

  // Delete the refreshToken in db
  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log(result);

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.status(204);
};

module.exports = { handleLogout };
