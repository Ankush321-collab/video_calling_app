import { StreamChat } from "stream-chat";
import dotenv from 'dotenv';

dotenv.config();

const apikey = process.env.video_key;
const apisecret = process.env.video_secret;

if (!apikey || !apisecret) {
    throw new Error("Stream API credentials are missing in environment variables");
}

const client = new StreamChat(apikey, apisecret);

export const upsertStreamUser = async (userData) => {
    try {
        await client.upsertUser(userData);
        return userData;
    } catch (error) {
        console.error("Error upserting Stream user:", error.message);
        throw error;
    }
}

export const generateStreamToken = (userId) => {
    try {
        if (!userId) {
            throw new Error("User ID is required");
        }
        
        const userIdStr = userId.toString();
        const token = client.createToken(userIdStr);
        
        if (!token) {
            throw new Error("Failed to create token");
        }
        
        return token;
    } catch (error) {
        console.error("Error generating Stream token:", error.message);
        throw error;
    }
};

export default client;
