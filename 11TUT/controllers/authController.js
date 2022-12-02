const usersDB = {
  users: require("../model/users.json"),
  setUser: function (user) {
    this.users = user;
  },
};

const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const foundUser = usersDB.users.find((person) => person.username === user);

  if (!foundUser) return res.sendStatus(401);

  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    // TODO: Create JWTs here
    res.json({ success: `User ${user} is logged in!` });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
