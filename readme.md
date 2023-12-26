Things to Do

1 . Authentication Endpoint

   => Create POST Endpoint /user/auth == done
   => Accept and validate payload userName and password == done
   => response with proper jwt token if credentials are correct == done
   => respond with error message and response


2. Authentication Plugin

  => Create a middleware to verify jwt and add it to the user response ==done
  => respond with invalid token if jwt token is invalid == done
  => add the middleware to protected routes == done

3. Protected Routes

  => Create 2 routed protected by Auth Plugin GET /user/{userId} PUT /user/{userId} == done
  => PUT route
     => check and validate payload of firstName, lastName, planet, and designation == done
     => protect using auth plugin == done
     => respond with error message and response == done
     => validate proper user to update else respond with error message and response == done
  => GET
     => Protect with auth plugin == done
     => send user data if JWT Token is valid == done


Addition Requirement:

  Implement proper error handling and validation for all endpoints == done
  Use appropriate status codes for different scenarios (e.g., 200 for success, 401 for unauthorized, 404 for not found) == done
  Ensure that the JWT tokens have an expiration time and use a secure secret for signing == done

  <!-- Not done -->
  Create a database and manipulate DB == not done




Packages Used :

  Express, Express Validator , dotenv, jsonwebtoken

Documentation on Routes

Route info

1  http://localhost:3000/user/auth

  Payload :

  {
      "userName" : "knowApp3",
      "password":  "knowApp3Password"
  }

  No auth header Needed

  response :

  {
    "message": "Auth Success",
    "jwtToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoia25vd0FwcDMiLCJpZCI6MywicGFzc3dvcmQiOiJrbm93QXBwM1Bhc3N3b3JkIiwieWVhciI6IjIwMTciLCJpc1ZlcmlmaWVkIjp0cnVlLCJpYXQiOjE3MDM1ODA5NzEsImV4cCI6MTcwMzU4ODE3MX0.JhYF7FNZlTK-PKv6ExIfiggPGQiaPYT0AQwgrwoOzuc"
  }

2. http://localhost:3000/user/3

header : {
  Authorization : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoia25vd0FwcDMiLCJpZCI6MywicGFzc3dvcmQiOiJrbm93QXBwM1Bhc3N3b3JkIiwieWVhciI6IjIwMTciLCJpc1ZlcmlmaWVkIjp0cnVlLCJpYXQiOjE3MDM1ODA5NzEsImV4cCI6MTcwMzU4ODE3MX0.JhYF7FNZlTK-PKv6ExIfiggPGQiaPYT0AQwgrwoOzuc
}


response :
  {
    "data": {
        "name": "knowApp3",
        "id": 3,
        "password": "knowApp3Password",
        "year": "2017",
        "isVerified": true
    }
}

3. http://localhost:3000/user/3

header : {
  Authorization : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoia25vd0FwcDMiLCJpZCI6MywicGFzc3dvcmQiOiJrbm93QXBwM1Bhc3N3b3JkIiwieWVhciI6IjIwMTciLCJpc1ZlcmlmaWVkIjp0cnVlLCJpYXQiOjE3MDM1ODA5NzEsImV4cCI6MTcwMzU4ODE3MX0.JhYF7FNZlTK-PKv6ExIfiggPGQiaPYT0AQwgrwoOzuc
}

response :

{
    "message": "Modified Successfully",
    "data": {
        "firstName": "Balaji",
        "lastName": "Kamalesan",
        "planet": "Earth",
        "designation": "SDE"
    }
}

{
    "errors": [
        {
            "type": "field",
            "value": "2",
            "msg": "Not Authorized to Update User",
            "path": "userId",
            "location": "params"
        }
    ]
}