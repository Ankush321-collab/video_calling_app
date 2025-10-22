# Postman API Testing Guide

## Base URL
```
http://localhost:5000/api
```

---

## 1. Authentication Endpoints

### 1.1 Sign Up
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/signup`
- **Headers:** 
  ```
  Content-Type: application/json
  ```
- **Body (raw JSON):**
  ```json
  {
    "fullname": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }
  ```

### 1.2 Login
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/login`
- **Headers:** 
  ```
  Content-Type: application/json
  ```
- **Body (raw JSON):**
  ```json
  {
    "email": "test@example.com",
    "password": "password123"
  }
  ```
- **Response:** Will set a JWT cookie (automatically saved by Postman)

### 1.3 Logout
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/logout`
- **Headers:** 
  ```
  Content-Type: application/json
  ```
- **Credentials:** Include cookies

---

## 2. User Profile Endpoints

### 2.1 Get Current User (Me)
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/me`
- **Auth:** Requires JWT cookie from login

### 2.2 Onboarding
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/onboard`
- **Headers:** 
  ```
  Content-Type: application/json
  ```
- **Auth:** Requires JWT cookie
- **Body (raw JSON):**
  ```json
  {
    "fullname": "Test User Updated",
    "bio": "Language enthusiast and developer",
    "nativelanguage": "English",
    "learninglanguage": "Spanish",
    "location": "New York, USA",
    "profilepic": "https://example.com/pic.jpg"
  }
  ```

---

## 3. Friend Management Endpoints

### 3.1 Get Recommended Friends
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/recommendfriend`
- **Auth:** Requires JWT cookie

### 3.2 Send Friend Request
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/sendfriendrequest/:id`
- **Example:** `http://localhost:5000/api/sendfriendrequest/68cc4bc9c4d7df947f4bbc42`
- **Auth:** Requires JWT cookie
- **Body:** Empty `{}`
- **Replace `:id` with actual user ID**

### 3.3 Get Incoming Friend Requests & Accepted Requests
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/friendrequest`
- **Auth:** Requires JWT cookie
- **Response:**
  ```json
  {
    "incomingReqs": [...],
    "acceptedReqs": [...]
  }
  ```

### 3.4 Get Outgoing Friend Requests (Pending)
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/friendrequestout`
- **Auth:** Requires JWT cookie

### 3.5 Accept Friend Request
- **Method:** `PUT`
- **URL:** `http://localhost:5000/api/acceptrequest/:id`
- **Example:** `http://localhost:5000/api/acceptrequest/68cc4bc9c4d7df947f4bbc42`
- **Auth:** Requires JWT cookie
- **Body:** Empty `{}`
- **Replace `:id` with friend request ID (not user ID)**

### 3.6 Reject Friend Request
- **Method:** `DELETE`
- **URL:** `http://localhost:5000/api/rejectrequest/:id`
- **Example:** `http://localhost:5000/api/rejectrequest/68cc4bc9c4d7df947f4bbc42`
- **Auth:** Requires JWT cookie
- **Replace `:id` with friend request ID**

### 3.7 Get My Friends
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/myfriends`
- **Auth:** Requires JWT cookie

---

## 4. Chat/Stream Endpoints

### 4.1 Get Stream Chat Token
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/token`
- **Auth:** Requires JWT cookie
- **Response:**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userId": "68cc4bc9c4d7df947f4bbc42",
    "success": true
  }
  ```

---

## 5. File Upload Endpoint

### 5.1 Upload Profile Picture
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/upload`
- **Headers:** 
  ```
  Content-Type: multipart/form-data
  ```
- **Body (form-data):**
  - Key: `profile` (Type: File)
  - Value: Select an image file
- **Response:**
  ```json
  {
    "url": "https://res.cloudinary.com/..."
  }
  ```

---

## Important Notes for Postman Testing

### Setting up Cookies
1. After login, Postman will automatically save the JWT cookie
2. Make sure "Save cookies" is enabled in Postman settings
3. For protected routes, cookies will be sent automatically

### Testing Flow
1. **Sign up** → Create a new user
2. **Login** → Get JWT token (cookie)
3. **Onboard** → Complete user profile
4. **Get Recommended Friends** → See potential connections
5. **Send Friend Request** → Send request to a user
6. **Get Friend Requests** → Check incoming requests (on another user)
7. **Accept/Reject Request** → Respond to requests
8. **Get Stream Token** → Get token for chat functionality

### Common Issues
- **401 Unauthorized:** Make sure you're logged in and cookies are enabled
- **400 Bad Request:** Check if request body matches the expected format
- **404 Not Found:** Verify the user/request ID exists

### Environment Variables (Optional)
Create a Postman environment with:
- `base_url`: `http://localhost:5000/api`
- `user_id`: Store after login/signup
- `friend_request_id`: Store after getting friend requests

Then use: `{{base_url}}/login` instead of full URLs
