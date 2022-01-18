import { getFromDB, postDB } from "./extCommMod.js";

/**
 * Authenticate a user.
 * 
 * @param {object} login Login information
 * @returns {boolean} True if authentication is successful, false otherwise
 */
export const authenticateUser = async (username, password) => {
    const credentials = await getFromDB("accounts", username).data();
    return (username === credentials && password === credentials.password);
}

/**
 * Register a new user.
 * 
 * @param {string} username Username - acts as user's unique identifier
 * @param {string} email User's email
 * @param {string} password User's password
 */
export const registerUser = async (username, email, password) => {
    const params = {
        username, email, password
    };
    await postDB("accounts", username, params);
}
