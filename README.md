# 🎥 Video Calling App - Language Learning Platform

A modern, full-stack video calling and chat application built for language learners to connect, communicate, and practice languages together. Features real-time chat, video calling, friend recommendations, and a beautiful 3D animated UI.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [API Documentation](#-api-documentation)
- [How It Works](#-how-it-works)
- [Postman Collection](#-postman-collection)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)

---

## ✨ Features

### 🔐 Authentication & User Management
- **Email/Password Authentication** with JWT tokens
- **Secure cookie-based sessions** (httpOnly, sameSite)
- **Profile Onboarding** with Cloudinary image uploads
- **Random Avatar Generation** as fallback
- **Protected Routes** with authentication middleware

### 👥 Social Features
- **Friend Recommendations** based on learning languages
- **Send/Accept/Reject Friend Requests**
- **Real-time Notifications** for friend requests
- **Friends List** with profile cards
- **Persistent Request States** (shows "Requested" status)

### 💬 Real-time Chat
- **Stream Chat Integration** for messaging
- **One-on-one Conversations** with friends
- **Channel Creation & Management**
- **Message History** and persistence
- **Typing Indicators** and read receipts
- **Modern glassmorphic UI** with 3D effects

### 📹 Video Calling
- **Stream Video SDK Integration** for HD calls
- **Direct Call Invitations** via chat
- **Incoming Call Popup Modals** with Accept/Decline
- **Outgoing Call Confirmation** dialogs
- **In-call Controls** (mute, camera, end call)
- **Automatic User Upsert** to Stream for seamless calling

### 🎨 Modern UI/UX
- **3D Animations** and hover effects
- **Glassmorphism Design** with backdrop blur
- **Gradient Backgrounds** and floating orbs
- **Dark/Light Theme Support** (DaisyUI)
- **Responsive Design** for all devices
- **Loading States** with animated spinners
- **Toast Notifications** for user feedback

---

## 🛠 Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router v7** - Client-side routing
- **Stream Chat React** - Real-time messaging UI
- **Stream Video React SDK** - Video calling components
- **Tailwind CSS v4** - Utility-first styling
- **DaisyUI** - Component library
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Zustand** - State management
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Token-based authentication
- **bcrypt** - Password hashing
- **Stream Chat** - Real-time messaging backend
- **Cloudinary** - Image hosting and optimization
- **Multer** - File upload middleware
- **dotenv** - Environment configuration
- **cookie-parser** - Cookie handling
- **cors** - Cross-origin resource sharing

---

## 🏗 Architecture

### System Design

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐   │
│  │  React   │  │  Router  │  │  Zustand │  │  Axios       │   │
│  │  Vite    │  │  v7      │  │  State   │  │  Instance    │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↕ HTTP/WSS
┌─────────────────────────────────────────────────────────────────┐
│                         SERVER LAYER                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐   │
│  │ Express  │  │   JWT    │  │  Multer  │  │  Middleware  │   │
│  │ Routes   │  │  Auth    │  │  Upload  │  │  Protection  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                      EXTERNAL SERVICES                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐   │
│  │ MongoDB  │  │  Stream  │  │  Stream  │  │  Cloudinary  │   │
│  │ Atlas    │  │  Chat    │  │  Video   │  │  CDN         │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **Authentication Flow:**
   ```
   User → Login/Signup → JWT Token → Cookie Storage → Protected Routes
   ```

2. **Onboarding Flow:**
   ```
   User → Upload Image/Random Avatar → Cloudinary → MongoDB → Stream Chat Upsert
   ```

3. **Friend Request Flow:**
   ```
   User A → Send Request → MongoDB → User B Notifications → Accept/Reject → Update Both Users
   ```

4. **Chat Flow:**
   ```
   User → Fetch Stream Token → Connect to Stream → Create/Join Channel → Real-time Messages
   ```

5. **Video Call Flow:**
   ```
   User A → Click Call → Modal Confirm → Send Invite Message → User B Popup → Accept → Join Stream Call
   ```

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Package manager
- **MongoDB** - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier available)
- **Git** - Version control

### Required Accounts

1. **MongoDB Atlas** - [Sign Up](https://www.mongodb.com/cloud/atlas/register)
2. **Stream** - [Sign Up](https://getstream.io/try-for-free/)
3. **Cloudinary** - [Sign Up](https://cloudinary.com/users/register/free)

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Ankush321-collab/video_calling_app.git
cd video_calling_app
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
touch .env
```

**Edit `.env` file with your credentials:**

```env
# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# MongoDB Configuration
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/video_app?retryWrites=true&w=majority

# JWT Configuration
JWT_PASSWORD=your_super_secret_jwt_key_minimum_32_characters_long

# Stream Configuration
video_key=your_stream_api_key
video_secret=your_stream_api_secret

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

**Start the backend server:**

```bash
npm start
# Server will run on http://localhost:5000
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Create .env file
touch .env
```

**Edit `.env` file:**

```env
VITE_API_URL=http://localhost:5000/api
VITE_VIDEO_KEY=your_stream_api_key
```

**Start the development server:**

```bash
npm run dev
# App will run on http://localhost:5173
```

### 4. Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

---

## 🔐 Environment Variables

### Backend Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `PORT` | Server port number | Yes | `5000` |
| `NODE_ENV` | Environment mode | Yes | `development` or `production` |
| `FRONTEND_URL` | Frontend origin for CORS | Yes | `http://localhost:5173` |
| `MONGODB_URI` | MongoDB connection string | Yes | `mongodb+srv://...` |
| `JWT_PASSWORD` | Secret key for JWT signing | Yes | Min 32 characters |
| `video_key` | Stream API key | Yes | From Stream dashboard |
| `video_secret` | Stream API secret | Yes | From Stream dashboard |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes | From Cloudinary dashboard |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Yes | From Cloudinary dashboard |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Yes | From Cloudinary dashboard |

### Frontend Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `VITE_API_URL` | Backend API base URL | Yes | `http://localhost:5000/api` |
| `VITE_VIDEO_KEY` | Stream API key (public) | Yes | Same as backend `video_key` |

---

## 🌐 Deployment

### Backend Deployment (Render/Railway/Heroku)

#### Using Render

1. **Create a new Web Service** on [Render](https://render.com/)
2. **Connect your GitHub repository**
3. **Configure the service:**
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm start`
   - **Environment:** Node
4. **Add Environment Variables** (all from `.env`)
5. **Deploy!**

#### Using Railway

1. **Create a new project** on [Railway](https://railway.app/)
2. **Deploy from GitHub**
3. **Add Environment Variables**
4. **Set start command:** `cd backend && npm start`
5. **Deploy!**

### Frontend Deployment (Vercel/Netlify)

#### Using Vercel

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   cd frontend
   vercel
   ```

3. **Set Environment Variables** in Vercel dashboard:
   - `VITE_API_URL` → Your backend URL
   - `VITE_VIDEO_KEY` → Stream API key

4. **Configure Build Settings:**
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

#### Using Netlify

1. **Connect your repository** to [Netlify](https://netlify.com/)
2. **Configure build settings:**
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/dist`
3. **Add Environment Variables** in Netlify dashboard
4. **Deploy!**

### Production Checklist

- [ ] Update `FRONTEND_URL` in backend `.env` to production URL
- [ ] Update `VITE_API_URL` in frontend `.env` to production backend URL
- [ ] Set `NODE_ENV=production` in backend
- [ ] Enable HTTPS for both frontend and backend
- [ ] Configure MongoDB Atlas IP whitelist for production
- [ ] Set secure cookie options in production
- [ ] Enable CORS only for production frontend domain
- [ ] Test all endpoints with production URLs
- [ ] Monitor logs and error tracking

---

## 📚 API Documentation

### Base URL

```
Development: http://localhost:5000/api
Production: https://your-backend-url.com/api
```

### Authentication

All protected routes require a JWT token stored in an httpOnly cookie named `jwt`.

---

### 🔑 Authentication Endpoints

#### 1. Sign Up

**POST** `/signup`

Create a new user account.

**Request Body:**
```json
{
  "fullname": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

**Response (200):**
```json
{
  "message": "New user created successfully",
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullname": "John Doe",
    "email": "john@example.com",
    "isonboarded": false,
    "friends": [],
    "createdAt": "2025-10-23T10:00:00.000Z"
  }
}
```

**Errors:**
- `400` - Missing required fields
- `409` - Email already exists

---

#### 2. Login

**POST** `/login`

Authenticate user and receive JWT token in cookie.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullname": "John Doe",
    "email": "john@example.com",
    "isonboarded": true,
    "profilepic": "https://res.cloudinary.com/..."
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Errors:**
- `400` - Missing fields or invalid password
- `404` - User not found

---

#### 3. Logout

**POST** `/logout`

Clear authentication cookie.

**Response (200):**
```json
{
  "message": "Logout successful",
  "success": true
}
```

---

#### 4. Onboard User

**POST** `/onboard` 🔒 Protected

Complete user profile with optional image upload.

**Headers:**
```
Content-Type: multipart/form-data
Cookie: jwt=<token>
```

**Form Data:**
```
fullname: "John Doe"
bio: "Language enthusiast from USA"
nativelanguage: "English"
learninglanguage: "Spanish"
location: "New York, USA"
profilepic: <file> (optional - JPG/PNG/WebP, max 5MB)
OR
profilepic: "https://randomuser.me/api/portraits/lego/5.jpg" (URL string)
```

**Response (200):**
```json
{
  "message": "User onboarded successfully",
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullname": "John Doe",
    "email": "john@example.com",
    "bio": "Language enthusiast from USA",
    "nativelanguage": "English",
    "learninglanguage": "Spanish",
    "location": "New York, USA",
    "profilepic": "https://res.cloudinary.com/video_app/profiles/abc123.jpg",
    "isonboarded": true
  }
}
```

**Errors:**
- `400` - Missing required fields
- `401` - Unauthorized (no token)
- `404` - User not found

---

### 👥 Friend Management Endpoints

#### 5. Get Friend Recommendations

**GET** `/recommendfriend` 🔒 Protected

Get users learning your native language or speaking your learning language.

**Response (200):**
```json
{
  "message": "Friend recommendations",
  "success": true,
  "recommendations": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "fullname": "Maria Garcia",
      "profilepic": "https://...",
      "bio": "Spanish teacher",
      "nativelanguage": "Spanish",
      "learninglanguage": "English",
      "location": "Madrid, Spain"
    }
  ]
}
```

---

#### 6. Send Friend Request

**POST** `/sendfriendrequest/:id` 🔒 Protected

Send a friend request to another user.

**URL Parameters:**
- `id` - Target user's MongoDB ObjectId

**Response (200):**
```json
{
  "message": "Friend request sent successfully",
  "success": true,
  "friendRequest": {
    "_id": "507f1f77bcf86cd799439013",
    "sender": "507f1f77bcf86cd799439011",
    "receiver": "507f1f77bcf86cd799439012",
    "status": "pending",
    "createdAt": "2025-10-23T10:15:00.000Z"
  }
}
```

**Errors:**
- `400` - Cannot send request to yourself / Request already exists
- `404` - User not found

---

#### 7. Accept Friend Request

**PUT** `/acceptrequest/:id` 🔒 Protected

Accept an incoming friend request.

**URL Parameters:**
- `id` - Friend request MongoDB ObjectId

**Response (200):**
```json
{
  "message": "Friend request accepted",
  "success": true,
  "friendRequest": {
    "_id": "507f1f77bcf86cd799439013",
    "status": "accepted"
  }
}
```

**Errors:**
- `403` - Not authorized to accept this request
- `404` - Friend request not found

---

#### 8. Reject Friend Request

**DELETE** `/rejectrequest/:id` 🔒 Protected

Reject or cancel a friend request.

**URL Parameters:**
- `id` - Friend request MongoDB ObjectId

**Response (200):**
```json
{
  "message": "Friend request rejected",
  "success": true
}
```

---

#### 9. Get Incoming Friend Requests

**GET** `/friendrequest` 🔒 Protected

Get all pending friend requests received.

**Response (200):**
```json
{
  "incomingReqs": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "sender": {
        "_id": "507f1f77bcf86cd799439014",
        "fullname": "Carlos Rodriguez",
        "profilepic": "https://...",
        "bio": "Love learning languages",
        "location": "Mexico City"
      },
      "status": "pending",
      "createdAt": "2025-10-23T09:00:00.000Z"
    }
  ],
  "acceptedReqs": []
}
```

---

#### 10. Get Outgoing Friend Requests

**GET** `/friendrequestout` 🔒 Protected

Get all friend requests sent by current user.

**Response (200):**
```json
{
  "outgoingRequests": [
    {
      "_id": "507f1f77bcf86cd799439015",
      "receiver": "507f1f77bcf86cd799439016",
      "status": "pending",
      "createdAt": "2025-10-23T10:30:00.000Z"
    }
  ]
}
```

---

#### 11. Get My Friends

**GET** `/myfriends` 🔒 Protected

Get list of all accepted friends.

**Response (200):**
```json
{
  "friends": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "fullname": "Maria Garcia",
      "profilepic": "https://...",
      "bio": "Spanish teacher",
      "location": "Madrid, Spain",
      "nativelanguage": "Spanish"
    }
  ]
}
```

---

#### 12. Get User by ID

**GET** `/user/:id` 🔒 Protected

Fetch details of a specific user.

**URL Parameters:**
- `id` - User's MongoDB ObjectId

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "fullname": "Maria Garcia",
  "email": "maria@example.com",
  "profilepic": "https://...",
  "bio": "Spanish teacher",
  "nativelanguage": "Spanish",
  "learninglanguage": "English",
  "location": "Madrid, Spain",
  "isonboarded": true
}
```

---

#### 13. Get Current User

**GET** `/me` 🔒 Protected

Get authenticated user's details.

**Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullname": "John Doe",
    "email": "john@example.com",
    "profilepic": "https://...",
    "isonboarded": true
  }
}
```

---

### 💬 Chat Endpoints

#### 14. Get Stream Chat Token

**GET** `/token` 🔒 Protected

Generate Stream Chat authentication token for current user.

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": "507f1f77bcf86cd799439011",
  "success": true
}
```

**Errors:**
- `401` - User not authenticated
- `500` - Token generation failed

---

### 📤 File Upload Endpoint

#### 15. Upload Profile Picture

**POST** `/upload`

Upload image to Cloudinary (used internally by onboard endpoint).

**Headers:**
```
Content-Type: multipart/form-data
```

**Form Data:**
```
profile: <file> (JPG/PNG/JPEG/MP4, stored in video_app folder)
```

**Response (200):**
```json
{
  "url": "https://res.cloudinary.com/your_cloud/video_app/abc123.jpg"
}
```

---

## 🔄 How It Works

### 1. User Registration & Authentication

```mermaid
sequenceDiagram
    User->>Frontend: Enter email/password
    Frontend->>Backend: POST /signup
    Backend->>MongoDB: Create user document
    MongoDB-->>Backend: User created
    Backend->>Frontend: Return user data
    Frontend->>User: Show onboarding screen
```

**Process:**
1. User submits signup form with email, password, and full name
2. Backend hashes password using bcrypt (10 salt rounds)
3. User document created in MongoDB with `isonboarded: false`
4. Frontend redirects to onboarding page

---

### 2. Onboarding & Profile Setup

```mermaid
sequenceDiagram
    User->>Frontend: Fill profile + upload image
    Frontend->>Backend: POST /onboard (multipart)
    Backend->>Cloudinary: Upload image
    Cloudinary-->>Backend: Return image URL
    Backend->>MongoDB: Update user profile
    Backend->>Stream: Upsert user to Stream Chat
    Stream-->>Backend: User created
    Backend-->>Frontend: Profile complete
    Frontend->>User: Redirect to home
```

**Process:**
1. User fills profile form (bio, languages, location)
2. User either uploads image OR clicks "Random Avatar"
3. **If uploaded:** Image sent to Cloudinary, returns CDN URL
4. **If random:** Frontend generates lego avatar URL
5. Backend updates user document with all fields
6. User automatically upserted to Stream Chat with:
   - `id`: MongoDB `_id`
   - `name`: Full name
   - `image`: Cloudinary URL or avatar
7. User marked as `isonboarded: true`

---

### 3. Friend Discovery & Recommendations

```mermaid
sequenceDiagram
    User->>Frontend: Navigate to Recommendations
    Frontend->>Backend: GET /recommendfriend
    Backend->>MongoDB: Query users by language match
    MongoDB-->>Backend: Return matching users
    Backend->>Frontend: Filter out friends & pending requests
    Frontend->>User: Display recommendation cards
```

**Matching Logic:**
```javascript
// Find users where:
1. User's native language === Their learning language
   OR
2. User's learning language === Their native language

// Exclude:
- Current user
- Already friends
- Pending/sent requests
```

**Example:**
- **Your Profile:** Native: English, Learning: Spanish
- **Recommendations:**
  - Native: Spanish, Learning: English ✅
  - Native: English, Learning: Spanish ✅
  - Native: French, Learning: German ❌

---

### 4. Friend Request Flow

```mermaid
sequenceDiagram
    User A->>Frontend: Click "Send Friend Request"
    Frontend->>Backend: POST /sendfriendrequest/:id
    Backend->>MongoDB: Create FriendRequest document
    MongoDB-->>Backend: Request saved
    Backend-->>Frontend: Success response
    Frontend->>User A: Show "✓ Requested" (disabled)
    
    User B->>Frontend: Navigate to Notifications
    Frontend->>Backend: GET /friendrequest
    Backend->>MongoDB: Find requests where receiver = User B
    MongoDB-->>Backend: Return pending requests
    Backend-->>Frontend: Populate sender details
    Frontend->>User B: Show notification with Accept/Reject
    
    User B->>Frontend: Click "Accept"
    Frontend->>Backend: PUT /acceptrequest/:requestId
    Backend->>MongoDB: Update request status = "accepted"
    Backend->>MongoDB: Add to both users' friends arrays
    MongoDB-->>Backend: Updated
    Backend-->>Frontend: Success
    Frontend->>User B: Show in Friends list
```

**Database Structure:**
```javascript
// FriendRequest Schema
{
  sender: ObjectId,      // User who sent request
  receiver: ObjectId,    // User who receives request
  status: "pending",     // "pending" | "accepted" | "rejected"
  createdAt: Date
}

// User Schema
{
  friends: [ObjectId],   // Array of accepted friend IDs
  // ... other fields
}
```

---

### 5. Real-time Chat

```mermaid
sequenceDiagram
    User A->>Frontend: Click "Message" on friend
    Frontend->>Backend: GET /token
    Backend->>Stream API: Generate user token
    Stream API-->>Backend: Return JWT token
    Backend-->>Frontend: Token
    Frontend->>Stream SDK: connectUser(user, token)
    Stream SDK-->>Frontend: Connected
    Frontend->>Stream SDK: Create/watch channel
    Stream SDK->>Stream API: Initialize channel
    Stream API-->>Stream SDK: Channel ready
    Frontend->>User A: Show chat interface
    
    User A->>Frontend: Type & send message
    Frontend->>Stream SDK: sendMessage(text)
    Stream SDK->>Stream API: Store & broadcast
    Stream API-->>User B Frontend: Real-time message
    User B Frontend->>User B: Display message
```

**Channel Naming Convention:**
```javascript
// Channel ID is sorted user IDs joined
const channelId = [userId1, userId2].sort().join("-")
// Example: "507f1f77bcf86cd799439011-507f1f77bcf86cd799439012"
```

**Stream Chat Features Used:**
- Channel types: `messaging`
- Member management
- Message history
- Typing indicators
- Read receipts
- User presence

---

### 6. Video Calling

```mermaid
sequenceDiagram
    User A->>Frontend: Click "Video Call" button
    Frontend->>User A: Show confirmation modal
    User A->>Frontend: Click "Call"
    Frontend->>Stream Channel: Send message with callInvite=true
    Frontend->>User A: Navigate to /call/:callId
    Frontend->>Backend: GET /token (reuses chat token)
    Frontend->>Stream Video SDK: Connect & join call
    
    User B Frontend->>Stream Channel: Receive message event
    User B Frontend->>User B: Show incoming call popup
    User B->>Frontend: Click "Accept"
    Frontend->>User B: Navigate to /call/:callId
    Frontend->>Stream Video SDK: Join same call
    
    Stream Video SDK->>Both Users: Establish WebRTC connection
    Both Users->>Stream Video SDK: Audio/Video streams
```

**Call Invite Message Structure:**
```javascript
{
  text: "Incoming video call",
  callInvite: true,
  callId: "channel-id",
  callUrl: "http://localhost:5173/call/channel-id",
  callerId: "507f1f77bcf86cd799439011",
  callerName: "John Doe"
}
```

**Call Flow:**
1. **Caller:** Clicks video button → Confirmation modal → Sends invite → Joins call
2. **Receiver:** Receives message → Popup appears → Accepts → Joins same call
3. **Stream Video SDK:** Handles WebRTC, media streams, and call controls
4. **Call ID:** Uses the same channel ID from chat for consistency

---

### 7. State Management

**Authentication State (Context):**
```javascript
// AuthContext provides:
- authuser: Current user object
- setAuthUser: Update user
- isLoading: Auth check in progress
```

**Theme State (Zustand):**
```javascript
// themestore manages:
- theme: "light" | "dark" | "cupcake" | etc.
- setTheme: Change theme
```

**Chat State (Stream SDK):**
- Managed internally by Stream Chat React SDK
- Channel state, messages, typing indicators

**Video State (Stream SDK):**
- Managed by Stream Video React SDK
- Call state, participants, media tracks

---

## 📮 Postman Collection

### Import Instructions

1. **Create Collection** named "Video Calling App"
2. **Set Collection Variables:**
   - `base_url`: `http://localhost:5000/api`
   - `prod_url`: `https://your-backend.com/api`

### Collection Structure

```
Video Calling App/
├── 📁 Auth
│   ├── Signup
│   ├── Login
│   └── Logout
├── 📁 User
│   ├── Onboard (with file upload)
│   ├── Get Me
│   └── Get User by ID
├── 📁 Friends
│   ├── Get Recommendations
│   ├── Send Friend Request
│   ├── Accept Friend Request
│   ├── Reject Friend Request
│   ├── Get Incoming Requests
│   ├── Get Outgoing Requests
│   └── Get My Friends
└── 📁 Chat
    └── Get Stream Token
```

### Example Requests

**1. Signup Request:**
```
POST {{base_url}}/signup
Content-Type: application/json

{
  "fullname": "Test User",
  "email": "test@example.com",
  "password": "Test123456"
}
```

**2. Login Request:**
```
POST {{base_url}}/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "Test123456"
}

// After success, cookie `jwt` is automatically stored
```

**3. Onboard Request (with file):**
```
POST {{base_url}}/onboard
Content-Type: multipart/form-data

fullname: John Doe
bio: Language enthusiast
nativelanguage: English
learninglanguage: Spanish
location: New York
profilepic: <file>
```

**4. Get Recommendations:**
```
GET {{base_url}}/recommendfriend
// Cookie automatically sent
```

**5. Send Friend Request:**
```
POST {{base_url}}/sendfriendrequest/507f1f77bcf86cd799439012
```

**6. Get Stream Token:**
```
GET {{base_url}}/token
// Returns Stream JWT for chat/video
```

### Testing Tips

1. **Sequential Testing:**
   - Signup → Login → Onboard → Get Recommendations → Send Request

2. **Cookie Management:**
   - Postman automatically stores cookies from login response
   - Verify cookie is sent in subsequent requests

3. **File Upload:**
   - Use form-data, not JSON
   - Select file from file system

4. **Multi-User Testing:**
   - Create separate users with different emails
   - Test friend requests between users

---

## 📂 Project Structure

```
video_calling_app/
├── backend/
│   ├── controller/
│   │   ├── chat.controller.js        # Stream token generation
│   │   ├── getpeople.controller.js   # Friend recommendations & requests
│   │   └── user.controller.js        # Auth & onboarding
│   ├── middleware/
│   │   └── uth.middleware.js         # JWT authentication
│   ├── model/
│   │   ├── getpeople.model.js        # FriendRequest schema
│   │   └── user.model.js             # User schema
│   ├── routes/
│   │   ├── Chat.route.js             # Stream token routes
│   │   └── user.route.js             # User & friend routes
│   ├── lib/
│   │   └── Stream.js                 # Stream client singleton
│   ├── index.js                      # Express app & server
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── componenets/
│   │   │   ├── CallButton.jsx        # Video call button
│   │   │   ├── CallPage.jsx          # Stream Video interface
│   │   │   ├── ChatPage.jsx          # Stream Chat interface
│   │   │   ├── Home.jsx              # Landing page
│   │   │   ├── IncomingCall.jsx      # Call popup modal
│   │   │   ├── Loader.jsx            # Loading spinner
│   │   │   ├── Login.jsx             # Login form
│   │   │   ├── Notification.jsx      # Friend requests UI
│   │   │   ├── Onboarding.jsx        # Profile setup
│   │   │   └── Signup.jsx            # Signup form
│   │   ├── context/
│   │   │   ├── AuthContext.jsx       # User authentication state
│   │   │   ├── Getfriendrequests.jsx # Friend requests hook
│   │   │   ├── Getrecommend.jsx      # Recommendations hook
│   │   │   ├── GetToken.jsx          # Stream token fetcher
│   │   │   └── useFriends.jsx        # Friends list hook
│   │   ├── lib/
│   │   │   └── AxiosInstances.jsx    # Axios config
│   │   ├── pages/
│   │   │   ├── FriendCard.jsx        # Friend list item
│   │   │   ├── Friends.jsx           # Friends list page
│   │   │   ├── Layout.jsx            # Page layout wrapper
│   │   │   ├── Navbar.jsx            # Navigation bar
│   │   │   ├── REcommendCard.jsx     # Recommendation card
│   │   │   ├── RecommendFriend.jsx   # Recommendations page
│   │   │   ├── Sidebar.jsx           # Side navigation
│   │   │   └── ThemeSelector.jsx     # Theme switcher
│   │   ├── store/
│   │   │   └── themestore.js         # Zustand theme state
│   │   ├── App.jsx                   # Route definitions
│   │   ├── App.css                   # Global styles
│   │   ├── index.css                 # Tailwind & animations
│   │   └── main.jsx                  # React root
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── .env
│
├── POSTMAN_TESTING.md                # API testing guide
└── README.md                         # This file
```

---

## 🎯 Key Features Explained

### 1. JWT Authentication with Cookies

**Why httpOnly cookies?**
- Prevents XSS attacks (JavaScript can't access)
- Automatically sent with requests
- More secure than localStorage

**Implementation:**
```javascript
// Backend - Set cookie
res.cookie("jwt", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Strict",
  maxAge: 24 * 60 * 60 * 1000 // 1 day
});

// Middleware - Verify
const token = req.cookies.jwt;
const decoded = jwt.verify(token, process.env.JWT_PASSWORD);
req.user = await User.findById(decoded.userId);
```

---

### 2. Cloudinary Image Upload

**Image Optimization:**
- Auto-resize to 500x500px
- Crop to fill aspect ratio
- Organized in `video_app/profiles/` folder
- Accepts JPG, PNG, JPEG, WebP

**Multer Configuration:**
```javascript
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "video_app/profiles",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [{ width: 500, height: 500, crop: "fill" }]
  }
});
```

---

### 3. Stream Chat Integration

**Server-side Token Generation:**
```javascript
// Only backend has the secret
const client = new StreamChat(apiKey, apiSecret);
const token = client.createToken(userId);
```

**Frontend Connection:**
```javascript
const client = StreamChat.getInstance(apiKey);
await client.connectUser({ id, name, image }, token);
```

**Channel Creation:**
```javascript
const channelId = [userId1, userId2].sort().join("-");
const channel = client.channel("messaging", channelId, {
  members: [userId1, userId2]
});
await channel.watch();
```

---

### 4. Stream Video Calls

**Call Initialization:**
```javascript
const videoClient = new StreamVideoClient({
  apiKey,
  user: { id, name, image },
  token
});

const call = videoClient.call("default", callId);
await call.join({ create: true });
```

**Call Invite System:**
- Sent as a special message in chat channel
- Contains `callInvite: true` flag
- Frontend listens for these messages
- Shows popup modal on receive
- Both users join same call ID

---

### 5. 3D Animations & Modern UI

**Glassmorphism:**
```css
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

**Hover Effects:**
```css
.btn-3d:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}
```

**Animations:**
```css
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
```

---

## 🐛 Troubleshooting

### Common Issues

**1. "Failed to generate token"**
- Verify `video_key` and `video_secret` in backend `.env`
- Ensure dotenv is loaded before Stream client
- Check Stream dashboard for valid credentials

**2. "MongoDB connection failed"**
- Verify `MONGODB_URI` format
- Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for testing)
- Ensure database user has read/write permissions

**3. "CORS error"**
- Update `FRONTEND_URL` in backend `.env`
- Ensure frontend URL matches exactly (no trailing slash)
- Check cookies are allowed in browser

**4. "Image upload failed"**
- Verify Cloudinary credentials
- Check file size (max 5MB)
- Ensure valid image format (JPG/PNG/WebP)

**5. "Call not connecting"**
- Both users must use same `callId`
- Verify Stream token is valid
- Check browser permissions for camera/microphone
- Ensure HTTPS in production

---

## 🔒 Security Best Practices

1. **Never commit `.env` files** - Add to `.gitignore`
2. **Use strong JWT secrets** - Min 32 characters
3. **Enable HTTPS in production** - Required for cookies
4. **Validate all inputs** - Prevent injection attacks
5. **Rate limit API endpoints** - Prevent abuse
6. **Sanitize user data** - Before storing in DB
7. **Use httpOnly cookies** - Prevent XSS
8. **Implement CSRF protection** - For production
9. **Keep dependencies updated** - Regular security patches
10. **Monitor logs** - Track suspicious activity

---

## 📈 Performance Optimization

1. **Image Optimization:**
   - Cloudinary auto-resize and compression
   - WebP format support for smaller sizes

2. **Database Indexing:**
   - Index on `email` for faster lookups
   - Index on `learninglanguage` and `nativelanguage`

3. **Frontend:**
   - Code splitting with React.lazy
   - Vite's fast HMR for development
   - Production build minification

4. **Caching:**
   - Browser caching for static assets
   - Stream SDK internal caching

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch:** `git checkout -b feature/amazing-feature`
3. **Commit changes:** `git commit -m 'Add amazing feature'`
4. **Push to branch:** `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Code Style

- Use ESLint and Prettier
- Follow React best practices
- Write meaningful commit messages
- Add comments for complex logic

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Ankush Kumar**
- GitHub: [@Ankush321-collab](https://github.com/Ankush321-collab)
- Repository: [video_calling_app](https://github.com/Ankush321-collab/video_calling_app)

---

## 🙏 Acknowledgments

- [Stream](https://getstream.io/) - Chat and Video APIs
- [Cloudinary](https://cloudinary.com/) - Image hosting
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Database hosting
- [DaisyUI](https://daisyui.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework

---

## 📞 Support

For issues and questions:
- **GitHub Issues:** [Create an issue](https://github.com/Ankush321-collab/video_calling_app/issues)
- **Documentation:** Read this README and POSTMAN_TESTING.md

---

**Happy Coding! 🚀**

Made with ❤️ for language learners worldwide.
