# MERN Stack Agent Task Distributor

This is a full-stack web application built with the MERN (MongoDB, Express.js, React.js, Node.js) stack. The application allows an administrator to manage a team of agents and distribute tasks to them by uploading a CSV or Excel file.

## ✨ Features

  * **Admin Authentication**: Secure login for the administrator using JSON Web Tokens (JWT).
  * **Agent Management**: Admins can create new agents (name, email, mobile).
  * **File Upload**: Upload customer/task lists in `.csv`, `.xlsx`, or `.xls` format.
  * **Automatic Task Distribution**: The system automatically and equally distributes the uploaded tasks among a set of 5 agents.
  * **Dynamic Dashboard**: A single-page dashboard to manage all features and view the distributed task lists for each agent.

-----

## 🛠️ Tech Stack

  * **Frontend**: React.js
  * **Backend**: Node.js, Express.js
  * **Database**: MongoDB (with Mongoose)
  * **Authentication**: JSON Web Tokens (JWT)
  * **File Handling**: Multer, XLSX

-----

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

  * [Node.js](https://nodejs.org/en/) (which includes npm)
  * [MongoDB](https://www.mongodb.com/try/download/community) (or a MongoDB Atlas account)

-----

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### 1\. Clone the Repository

```bash
git clone https://github.com/your-username/mern-agent-app.git
cd mern-agent-app
```

### 2\. Backend Setup

Navigate to the backend directory and install the required dependencies.

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory and add the following environment variables.

**`backend/.env`**

```env
# Your MongoDB connection string
MONGO_URI=mongodb://localhost:27017/agent-app

# A strong, random secret for signing JWTs
JWT_SECRET=your_jwt_secret_key

# The port for the backend server
PORT=5000
```

### 3\. Frontend Setup

In a new terminal, navigate to the frontend directory and install its dependencies.

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory to specify the backend API's URL.

**`frontend/.env`**

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4\. Create the Admin User 🔑

This application does not have a public registration page. You must create the first admin user manually in your database.

1.  Start your backend server (`npm start` in the `backend` folder). This allows Mongoose to create the database and collections.

2.  Connect to your MongoDB instance using a tool like MongoDB Compass.

3.  Navigate to the `agent-app` database and find the `admins` collection.

4.  Insert a new document with your desired admin credentials. The password will be automatically hashed upon saving.

    ```json
    {
      "email": "admin@example.com",
      "password": "your-secure-password"
    }
    ```

### 5\. Run the Application

You need two terminals running concurrently.

  * **In the `backend` terminal**:

    ```bash
    npm start
    ```

    The backend server will start on `http://localhost:5000`.

  * **In the `frontend` terminal**:

    ```bash
    npm start
    ```

    The React development server will open your browser to `http://localhost:3000`.

You can now log in using the admin credentials you created.

-----

## 📁 Project Structure

The project is organized into two main folders: `backend` and `frontend`.

```
mern-agent-app/
├── backend/
│   ├── config/       # Database connection
│   ├── controllers/  # Core application logic
│   ├── middleware/   # Custom middleware (auth, file uploads)
│   ├── models/       # Mongoose data schemas
│   ├── routes/       # API route definitions
│   └── server.js     # Main server entry point
│
└── frontend/
    ├── src/
    │   ├── api/          # Centralized Axios instance
    │   ├── components/   # Reusable React components
    │   ├── pages/        # Page-level components (Login, Dashboard)
    │   └── App.js        # Main app component with routing
    └── ...
```

-----

## ⚙️ API Endpoints

The following are the main API routes available:

| Method | Endpoint                    | Description                           | Access   |
| :----- | :-------------------------- | :------------------------------------ | :------- |
| `POST` | `/api/auth/login`           | Authenticate an admin and get a token | Public   |
| `POST` | `/api/agents`               | Create a new agent                    | Private  |
| `GET`  | `/api/agents`               | Get a list of all agents              | Private  |
| `POST` | `/api/lists/upload`         | Upload a file and distribute tasks    | Private  |
| `GET`  | `/api/lists/distributed`    | Get all tasks grouped by agent        | Private  |