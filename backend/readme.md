# Nav Rasa – Backend Assignment

## Overview
This is a basic backend system built using Node.js, Express, and MongoDB.
It supports user authentication using JWT and simple order management.

## Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt for password hashing

## Features
- User registration with hashed passwords
- User login with JWT (15-minute expiry)
- Protected profile API
- Create order (authenticated users only)
- List orders for logged-in user
- Input validation & proper error handling

## API Endpoints

### Auth
- `POST /api/register`
- `POST /api/login`
- `GET /api/profile` (Protected)

### Orders
- `POST /api/order` (Protected)
- `GET /api/orders` (Protected)

## JWT Authentication
- Tokens are issued on login
- Token expiry is set to **15 minutes**
- Protected routes require `Authorization: Bearer <token>`

## Setup Instructions

postman Checks:https://www.postman.com/loli88/workspace/backend-test/collection/38310239-c89205e7-1490-422a-b49a-37a06a51f5bb?action=share&creator=38310239