from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

# Initialize the Flask app and enable CORS
app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)

# In-memory list to store user data (this is our "database")
# It starts with some sample data.
users = [
    {"id": 1, "name": "Tony Stark", "email": "tony.stark@gmail.com"},
    {"id": 2, "name": "Steve rogers", "email": "steve.rogers@gmail.com"},
    {"id": 3, "name": "Captain Carter", "email": "peggy.carter@gmail.com"},
]
user_id_counter = 4  # New user IDs will start from 4

@app.route('/')
def index():
    """Serves the main index.html page."""
    return render_template('index.html')

@app.route('/users', methods=['GET'])
def get_users():
    """Handles GET requests to retrieve all users."""
    return jsonify(users)

@app.route('/users', methods=['POST'])
def add_user():
    """Handles POST requests to add a new user to the list."""
    global user_id_counter
    data = request.get_json()
    new_user = {
        'id': user_id_counter,
        'name': data['name'],
        'email': data['email']
    }
    users.append(new_user)
    user_id_counter += 1
    return jsonify(new_user), 201

@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    """Handles PUT requests to update an existing user's details."""
    user = next((user for user in users if user['id'] == user_id), None)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    data = request.get_json()
    user.update({
        'name': data.get('name', user['name']),
        'email': data.get('email', user['email'])
    })
    return jsonify(user)

@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    """Handles DELETE requests to remove a user from the list."""
    global users
    user = next((user for user in users if user['id'] == user_id), None)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    users = [u for u in users if u['id'] != user_id]
    return jsonify({'message': 'User deleted successfully'})

if __name__ == '__main__':
    app.run(debug=True)