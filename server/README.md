# 🥗 Record Website Backend (Express + MongoDB)

This is the backend server for the **Record Website**, built using **Express.js** and **MongoDB**. It handles user authentication, daily calorie tracking, and poll voting functionality.

---

## 📁 Folder Structure

```
/server
│
├── index.js                  # Entry point
├── .env                      # Environment variables
├── models/                  # MongoDB schemas
│   ├── Signup.js
│   ├── Everyday.js
│
├── routes/                  # Express route files
│   ├── userRoutes.js
│   ├── caloriesRoutes.js
│
├── controllers/             # Route logic
│   ├── userController.js
│   ├── caloriesController.js
│
├── utils/
│   └── formatDate.js        # Helper to format dates
└── README.md
```

---

## 🚀 Setup Instructions

### 1. 📦 Install Dependencies
```bash
npm install
```

### 2. 🌱 Create `.env` File
```
PORT=8000
MONGO_URI_CLIENT=mongodb://localhost:27017/client
MONGO_URI_ADMIN=mongodb://localhost:27017/adminDB
```

### 3. ▶️ Run the Server
```bash
npm start
```

---

## 🧠 API Overview

### 👤 User Routes (`/api/user`)

| Method | Endpoint     | Description             |
|--------|--------------|-------------------------|
| POST   | `/signup`    | Register new user       |
| POST   | `/login`     | Authenticate user       |

#### 📝 Signup Body
```json
{
  "name": "Vraj",
  "age": 21,
  "weight": 70,
  "email": "vraj@example.com",
  "phoneNo": "9876543210",
  "countryCode": "+91",
  "password": "secret123"
}
```

---

### 🍽️ Calories Routes (`/api/calories`)

| Method | Endpoint     | Description                 |
|--------|--------------|-----------------------------|
| POST   | `/update`    | Add or update calorie data  |
| POST   | `/read`      | Read calorie data           |

#### 📦 Sample Request Body
```json
{
  "email": "vraj@example.com",
  "date": "2025-07-07",
  "breakfast": [{ "Dish": "Oats", "Quantity": 1, "PlateType": "Bowl", "calories": 150 }],
  "lunch": [],
  "snacks": [],
  "dinner": []
}
```

---

## 🧠 Models

### User Schema (`models/Signup.js`)
```js
{
  name: String,
  age: Number,
  weight: Number,
  email: String,
  phoneNo: String,
  countryCode: String,
  password: String
}
```

### Calorie Schema (`models/Everyday.js`)
```js
{
  date: String,
  user: String,
  breakfast: [meal],
  lunch: [meal],
  snacks: [meal],
  dinner: [meal]
}

meal = {
  Dish: String,
  Quantity: Number,
  PlateType: String,
  calories: Number
}
```

---

## 🔐 Notes

- All data is stored in local MongoDB (`client` DB for users and calorie data, `adminDB` for polls).
- Make sure MongoDB is running locally.
- ⚠️ **Replace any hardcoded credentials** or secrets before pushing to public repositories.
- ✅ If you're using this project, **don't forget to change the API key / credentials in input files.**

---

## 🛠️ Tech Stack

- **Express.js** – Node.js Web Framework
- **MongoDB + Mongoose** – Database + ODM
- **dotenv** – Environment Variables
- **CORS** – Cross-Origin Support
- **ES Modules** – `import`/`export` used throughout

---

## ✨ Author

Made with ❤️ by Vraj Patel
