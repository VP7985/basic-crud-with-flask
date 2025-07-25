document.addEventListener('DOMContentLoaded', function() {
    const userForm = document.getElementById('user-form');
    const nameInput = document.getElementById('name-input');
    const emailInput = document.getElementById('email-input');
    const userIdInput = document.getElementById('user-id');
    const userTableBody = document.getElementById('user-table-body');
    const submitButton = document.getElementById('submit-button');
    const cancelButton = document.getElementById('cancel-button');

    const API_URL = 'http://127.0.0.1:5000/users';

    // Function to fetch and display all users
    const fetchUsers = async () => {
        try {
            const response = await fetch(API_URL);
            const users = await response.json();
            userTableBody.innerHTML = ''; // Clear existing table rows
            users.forEach(user => {
                const row = document.createElement('tr');
                row.className = 'border-t border-t-[#cedbe8]';
                row.innerHTML = `
                    <td class="p-3 text-sm text-[#0d141c]">${user.name}</td>
                    <td class="p-3 text-sm text-[#49739c]">${user.email}</td>
                    <td class="p-3 text-sm font-bold">
                        <button class="edit-btn text-[#0c7ff2]" data-id="${user.id}" data-name="${user.name}" data-email="${user.email}">Edit</button> |
                        <button class="delete-btn text-red-500" data-id="${user.id}">Delete</button>
                    </td>
                `;
                userTableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    // Function to reset the form to its initial state
    const resetForm = () => {
        userForm.reset();
        userIdInput.value = '';
        submitButton.textContent = 'Submit';
        cancelButton.style.display = 'none';
    };

    // Event listener for form submission (handles both creating and updating)
    userForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const userData = {
            name: nameInput.value,
            email: emailInput.value
        };
        const userId = userIdInput.value;
        const method = userId ? 'PUT' : 'POST';
        const url = userId ? `${API_URL}/${userId}` : API_URL;

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            if (response.ok) {
                resetForm();
                fetchUsers(); // Refresh the user table
            } else {
                console.error('Failed to save user');
            }
        } catch (error) {
            console.error('Error saving user:', error);
        }
    });

    // Event listener for the table (to handle clicks on Edit and Delete buttons)
    userTableBody.addEventListener('click', async function(event) {
        const target = event.target;
        const userId = target.dataset.id;

        // If the Edit button is clicked
        if (target.classList.contains('edit-btn')) {
            nameInput.value = target.dataset.name;
            emailInput.value = target.dataset.email;
            userIdInput.value = userId;
            submitButton.textContent = 'Update';
            cancelButton.style.display = 'inline-flex'; // Show cancel button
        } 
        // If the Delete button is clicked
        else if (target.classList.contains('delete-btn')) {
            if (confirm('Are you sure you want to delete this user?')) {
                try {
                    const response = await fetch(`${API_URL}/${userId}`, { method: 'DELETE' });
                    if (response.ok) {
                        fetchUsers(); // Refresh the user table
                    } else {
                        console.error('Failed to delete user');
                    }
                } catch (error) {
                    console.error('Error deleting user:', error);
                }
            }
        }
    });

    // Event listener for the cancel button
    cancelButton.addEventListener('click', resetForm);

    // Initial fetch of users when the page loads
    fetchUsers();
});