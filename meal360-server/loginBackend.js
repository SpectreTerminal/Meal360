import { getFromDB, postDB, updateDB } from "./extCommMod.js";

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
 * @param {Promise<Boolean>} status True if registration was successful, false if not
 */
export const registerUser = async (email, password) => {
    const results = await getFromDB("accounts", ["email"], ["=="], [email])
    const docs = results.docs;
    if(docs.length > 0){
        // account already exists with email provided
        return false;
    }
    // otherwise, continue with registration
    const params = {
        email, password
    };
    await postDB("accounts", email, params);
    return true; 
}

/**
 * Update a user's password.
 * 
 * @param {string} email User's email
 * @param {string} name User's name
 */
export const updateUser = async (email, name) => {
    const params = { name };
    await updateDB("accounts", ['email'], ['=='], [email], params);
    return true; 
}

export const getName = async (email) => {
    const response = await getFromDB("accounts", ["email"], ["=="], [email]);
    const docs = response.docs;
    if (docs.length === 0) {
        console.log("No preferences found for user: " + email);
        return null;
    }
    const data = docs[0].data().name;
    return data;
}