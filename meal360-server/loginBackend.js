import { getFromDB, postDB } from "./extCommMod.js";

/**
 * Authenticate a user.
 * 
 * @param {string} email Email by user
 * @param {string} password Password entered by user
 * @returns {boolean} True if authentication is successful, false otherwise
 */
export const authenticateUser = async (email, password) => {
    const response = await getFromDB("accounts", ['email'], ['=='], [email]);
    const docs = response.docs;
    const credentials = docs[0].data();
    return (email === credentials.email && password === credentials.password);
}

/**
 * Register a new user.
 * 
 * @param {string} email User's email
 * @param {string} password User's password
 * @param {string} name User's name
 */
export const registerUser = async (email, password, name) => {
    const params = {
        email, password, name
    };
    await postDB("accounts", email, params);
}
