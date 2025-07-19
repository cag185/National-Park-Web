import axios from 'axios';
import { SignUp } from "../../models/SignUp";

// Define routes to the backend API.
const API_BASE_URL = 'http://localhost:3001/';

// Route for the users.
const usersRoute = `${API_BASE_URL}users`;

// Get Users.

// Post Users.
export const postUser = async (user: SignUp): Promise<SignUp> => {
    try {
        const response = await axios.post(usersRoute, user);
        return response.data;
    } catch (error) {
        console.error('Error posting user:', error);
        throw error;
    }
};

// Update Users.