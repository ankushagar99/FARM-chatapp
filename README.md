# FastAPI React MongoDB Chat App

This is a personal project created for learning and to pass the time. The app is a chat application built using FastAPI, React, and MongoDB. It allows users to engage in real-time chat conversations.

## Technologies Used
- FastAPI: Python web framework for building the backend API
- React: JavaScript library for building the frontend user interface
- MongoDB: NoSQL database for storing chat messages
- MongoDB Atlas: Cloud-hosted MongoDB database service used in this project
- Vite: Build tool for fast development and performance in the React frontend

## Prerequisites
- MongoDB Cluster: You will need a MongoDB cluster to run this app. You can use MongoDB Atlas, which provides a free tier for certain usage (not for production).
- Clone the App: Clone this repository to your local machine.
- Create Virtual Environment: Create a virtual environment for the Python backend and activate it.
- Install Dependencies: Install the required dependencies using the provided requirements files.
- Run the FastAPI Backend: Start the FastAPI backend server by running `python main.py` in the backend folder.
- Run the React Frontend: Start the React frontend development server by running `yarn dev` in the frontend folder.

## Running the App
1. Set up a MongoDB cluster using MongoDB Atlas or any other MongoDB hosting service.
2. Clone this repository: `git clone https://github.com/your-username/fastapi-react-mongodb-chat-app.git`
3. Navigate to the project folder: `cd fastapi-react-mongodb-chat-app`
4. Create and activate a virtual environment (optional but recommended):
   - Create: `python -m venv env`
   - Activate:
     - For Windows: `env\Scripts\activate`
     - For Unix/Linux: `source env/bin/activate`
5. Install backend dependencies: `pip install -r backend/requirements.txt`
6. Install frontend dependencies: `cd frontend && yarn install`
7. Configure the MongoDB connection:
   - Open the `backend/main.py` file.
   - Replace the MongoDB connection string with your own MongoDB cluster connection string.
8. Run the FastAPI backend server:
   - Navigate to the backend folder: `cd backend`
   - Start the server: `python main.py`
9. Run the React frontend development server:
   - Navigate to the frontend folder: `cd frontend`
   - Start the server: `yarn dev`
10. Access the app in your browser: Open `http://localhost:3000` to access the chat application.
11. Explore and enjoy the chat app! Feel free to leave a star if you find it useful.

Please note that this app is not meant for production use and is solely created for personal learning purposes.

If you have any questions or suggestions, feel free to reach out. Thank you!
