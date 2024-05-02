# Login_Register

Login_Register is a simple authentication API project built with Node.js and Express. It provides endpoints for user registration, login, password reset, and more.

## Features

- User registration with username, email, and password.
- User login with email and password.
- Forgot password functionality to reset the user's password.
- Reset password functionality using a reset link sent via email.


## Table of Contents

- Installation
- Usage
- Endpoints
- Contributing
- License

## Installation

1. Clone the repository:

```bash
git clone https://github.com/AakashSuresh2003/Login_Register.git
```

2. Install dependencies:

```bash
cd Login_Register
npm install
```

3. Set up environment variables:

Create a `.env` file in the root directory and add the following environment variables:

```
PORT=<port-number>
RESET_PASSWORD_KEY=<reset-password-secret>
MONGO_URI = <Mongo-URI>
JWT_SECURITY = <Your-JWT-SECURITY>
JWT_EXPIRES_IN = <Your-Desired-Time>
GMAIL_PASS = <App-Specified-Password>
GMAIL_ID = <Your-GmailID>
RESET_PASSWORD_KEY = <Resert-Password-key>
RESET_EXPIRES_IN = <Your-Desired-Time>
```

## Usage

Start the server:

```bash
npm start
```

## Endpoints

### 1. Register User

- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Description**: Register a new user.
- **Request Body**:
  - `username`: User's username (required)
  - `email`: User's email address (required)
  - `password`: User's password (required)
- **Response**: Returns the newly registered user's data.

### 2. Login User

- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Description**: Login with existing user credentials.
- **Request Body**:
  - `email`: User's email address (required)
  - `password`: User's password (required)
- **Response**: Returns a JWT token upon successful login.

### 3. Forgot Password

- **URL**: `/api/auth/forget-password`
- **Method**: `PUT`
- **Description**: Request to reset password for a user.
- **Request Body**:
  - `email`: User's email address (required)
- **Response**: Sends a reset password email to the user's email address.

### 4. Reset Password

- **URL**: `/api/auth/reset-password`
- **Method**: `PUT`
- **Description**: Reset user's password using the reset link.
- **Request Body**:
  - `resetLink`: Reset link received via email (required)
  - `newPassword`: New password to set (required)
- **Response**: Returns a success message upon password reset.
