const express = require('express');
const { userAuthentication, getUsers, postUserData } = require('./Controllers/users');
const dotenv = require('dotenv');
const { userAuthValidators, authPlugin, updateUserValidators, checkUpdateUser, validateUser } = require('./Validators/validator');
const app = express();
const PORT = 3000;

dotenv.config();

app.use(express.json());

app.get('/details', (req, res) => {
  // Extract BiteID and UserID from headers
  const BiteID = req.get('BiteID');
  const UserID = req.get('UserID');

  // Check if BiteID and UserID are present in headers
  if (!BiteID || !UserID) {
    return res.status(400).json({ error: 'BiteID and UserID are required in headers' });
  }

  // Create and send the response object
  const responseObject = {
    BiteID: BiteID,
    UserID: UserID,
  };

  res.json(responseObject);
});

// User Auth Route
app.post('/user/auth', userAuthValidators, validateUser, userAuthentication);

// Protected Route to get user
app.get('/user/:userId', authPlugin, getUsers)

// Protected Route to PUt user data
app.put('/user/:userId', authPlugin, checkUpdateUser, updateUserValidators, postUserData)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});