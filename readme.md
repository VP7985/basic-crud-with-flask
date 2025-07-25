# Flask User Management Mini-Project

This project is a simple but complete **mini-project** that demonstrates how to build a REST API with Flask and interact with it using a dynamic frontend. The application allows you to perform all CRUD (Create, Read, Update, Delete) operations on a list of users.

---

## Preview 🎥

Here is a quick demonstration of the application in action:

![Application Preview](assets/videos/crud.gif)

---

## Features ✨

* **Create Users**: Add new users to the list via a simple form.
* **Read Users**: View all current users in a clean, organized table.
* **Update Users**: Edit the name and email of any existing user.
* **Delete Users**: Remove users from the list with a single click.
* **In-Memory Data**: User data is stored and managed in a simple in-memory list on the backend.
* **Dynamic UI**: The user interface updates in real-time without needing to refresh the page.

---

## Technologies Used 💻

* **Backend**: Python, Flask, Flask-CORS
* **Frontend**: HTML, JavaScript, Tailwind CSS
* **Development Tools**: Postman or Curl (for API testing)

---

## Installation ⚙️

To get this project up and running on your local machine, follow these steps.

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <your-project-directory>
    ```

2.  **Create and activate a virtual environment (recommended):**
    ```bash
    # For macOS/Linux
    python3 -m venv venv
    source venv/bin/activate

    # For Windows
    python -m venv venv
    .\venv\Scripts\activate
    ```

3.  **Install the required Python packages:**
    ```bash
    pip install Flask Flask-Cors
    ```

---

## Usage 🚀

1.  **Run the Flask backend server:**
    ```bash
    python app.py
    ```
    The backend API will now be running at `http://127.0.0.1:5000`.

2.  **Open the application in your browser:**
    Navigate to `http://127.0.0.1:5000`. The `index.html` page will be served, and you can start managing users immediately.

---

## API Endpoints 📋

The backend provides the following REST API endpoints:

| Method   | Endpoint          | Description                  |
| :------- | :---------------- | :--------------------------- |
| `GET`    | `/users`          | Retrieve all users.          |
| `POST`   | `/users`          | Add a new user.              |
| `PUT`    | `/users/<user_id>` | Update an existing user.     |
| `DELETE` | `/users/<user_id>` | Delete a specific user.      |