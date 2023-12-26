
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { userData } = require('../Data/staticData');


// User Validation and respond with JWT
exports.userAuthentication = function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const user = userData.filter(userItem => userItem.name === req.body.userName)
  const jwtToken = createJWTToken(user[0])
  return res.status(200).json({ message: "Auth Success", jwtToken });
}

//  Create JWT
function createJWTToken(data) {
  try {
    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "2h" });
  }
  catch (err) {
    throw new Error({ message: "JWT Error" })
  }
}

// Get USerr Data
function getUserData(id) {
  return userData.filter(user => {
    return user.id === Number(id)
  });
}
// Route to Protect GET User
exports.getUsers = (req, res) => {
  const userData = getUserData(req.params.userId);
  res.status(200).json({ data: userData[0] });
}

// Controller to update the user
exports.postUserData = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  else {
    const { firstName, lastName, planet, designation } = req.body;
    const data = await updateUserData({ firstName, lastName, planet, designation })
    res.status(200).json({ message: "Modified Successfully", data })
  }
}

function updateUserData(data) {
  return new Promise((resolve, reject) => {
    try {
      const userDataIndex = userData.findIndex(user => user.id === data.id);
      userData[userDataIndex] = data;
      resolve(userData[userDataIndex])
    }
    catch (err) {
      reject(err)
    }
  })

}