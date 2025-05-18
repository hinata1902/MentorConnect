const API_BASE_URL = 'http://localhost:8080'; //  Replace with your actual backend URL

// Function to handle common request logic (DRY principle)
async function makeRequest(url, options = {}) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            // Handle HTTP errors (e.g., 404, 500)
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json(); // Parse JSON response
        return data;
    } catch (error) {
        // Handle network errors or errors thrown above
        console.error('Fetch error:', error);
        throw error; // Re-throw to be caught by the caller
    }
}

const api = {
    // Example: Fetch all users
    async getAllUsers() {
        const url = `${API_BASE_URL}/api/users`; //  Adjust the endpoint
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                //  Add authorization headers if needed (e.g., for JWT)
            },
        };
        return makeRequest(url, options);
    },

    // Example: Create a new user
    async createUser(userData) {
        const url = `${API_BASE_URL}/api/users`; // Adjust the endpoint
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        };
        return makeRequest(url, options);
    },

      // Example: User Login
    async login(email, password) {
        const url = `${API_BASE_URL}/api/auth/login`; //  Endpoint for login
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        };
        return makeRequest(url, options);
    },

    //  Add other API functions as needed (e.g., for getting messages, profiles, etc.)
};

export default api;
