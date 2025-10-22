import { generateStreamToken } from "../lib/Stream.js"

export const getstreamtoken = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            });
        }

        const userId = req.user._id;
        const token = generateStreamToken(userId);
        console.log("[Stream] Token generated for user:", userId.toString());
        
        res.status(200).json({
            token,
            userId: userId.toString(),
            success: true
        });

    } catch (error) {
        console.error("Error in getstreamtoken:", error.message);
        res.status(500).json({
            message: "Failed to generate token",
            success: false
        });
    }
}