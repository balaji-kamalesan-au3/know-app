const { check, param } = require('express-validator');
const jwt = require('jsonwebtoken');
const { userData } = require('../Data/staticData');

//  Validate userName and password
exports.userAuthValidators = [
  check('userName').exists().withMessage('User Name is Required').isLength({ min: 1 }).withMessage('User Name cannot be empy'),
  check('password').exists().withMessage('Password is Required').isLength({ min: 1 }).withMessage('Password cannot be empy'),
]

// Custom Validator to ensure the provided data is valid
exports.validateUser = [
  check('userName').custom((value, { req }) => {
    const user = userData.filter(userItem => userItem.name === value);
    if (user.length === 0) return false;
    return user[0].password === req.body.password;
  }).withMessage("Bad Credentials")
]

// Validator to ensure the first, lsat name and planet designation is available
exports.updateUserValidators = [
  check('firstName').exists().withMessage('First Name is Required').isLength({ min: 1 }).withMessage('First Name cannot be empy'),
  check('lastName').exists().withMessage('Last Name is Required').isLength({ min: 1 }).withMessage('Last Name cannot be empy'),
  check('planet').exists().withMessage('planet is Required').isLength({ min: 1 }).withMessage('planet cannot be empty'),
  check('designation').exists().withMessage('designation is Required').isLength({ min: 1 }).withMessage('designation cannot be empty'),
]

// Check if the user can update the user
exports.checkUpdateUser = [
  param('userId').custom((value, { req }) => {
    return Number(value) === req.userData.id
  }).withMessage('Not Authorized to Update User'),
]

// Middle ware to to check the JWT is valid
exports.authPlugin = function (req, res, next) {
  const authToken = exportauthToken(req);
  if (!authToken) res.status(401).json({ error: "Not Auth Token Recieved" });
  jwt.verify(authToken, process.env.JWT_SECRET, (err, data) => {
    if (err) res.status(403).json({ message: "Invaild Token" });
    else {
      req.userData = data;
      next();
    }

  })
}

function exportauthToken(req) {
  const authHeader = req.get('Authorization');
  const token = authHeader ? authHeader.split(' ')[1] : null;
  return token
}
