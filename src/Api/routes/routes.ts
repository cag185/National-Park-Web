import axios from 'axios';
import { SignUp } from "../../models/SignUp";
import { Login } from "../../models/Login";

// Define routes to the backend API.
// const API_BASE_URL = 'http://localhost:3001/';
const API_BASE_URL = 'https://national-park-api-7gte.onrender.com/';

// Route for the users.
const usersRoute = `${API_BASE_URL}users`;

// Get User.
export const getUserById = async (id: string): Promise<SignUp> => {
    try {
        const userResponse = await axios.get(`${usersRoute}/${id}`);
        return userResponse.data;
    } catch (error) {
        // Attach the error to a custom object and throw it
        throw {
            message: 'Error getting user with ID: ' + id,
            originalError: error,
        };
    }
};

export const getUserByEmail = async (email: string): Promise<SignUp> => {
    try {
        const userResponse = await axios.get(`${usersRoute}/email/${email}`);
        return userResponse.data;
    } catch (error) {
        // Attach the error to a custom object and throw it
        throw {
            message: 'Error getting user with email: ' + email,
            originalError: error,
        };
    }
};

// Post Users.
export const postUser = async (user: SignUp): Promise<SignUp> => {
    try {
        const response = await axios.post(usersRoute, user);
        return response.data;
    } catch (error) {
        // Attach the error to a custom object and throw it
        throw {
            message: 'Error posting user',
            originalError: error,
        };
    }
};

// Login User.
export const loginUser = async (user: Login): Promise<Login> => {
    try {
        const response = await axios.get(usersRoute + "/login", {
            params: user,
        });
        return response.data;
    } catch (error) {
        // Attach the error to a custom object and throw it
        throw {
            message: 'Error posting user',
            originalError: error,
        };
    }
};

// Update Users.