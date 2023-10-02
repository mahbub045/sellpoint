import User from "@/models/User";
import db from "@/utils/db";

export default async function handler(req, res) {
    const id = req.query.id;
    if (!id) {
        res.status(400).json({ message: "Invalid request. Missing ID." });
        return;
    }
    await db.connect();
    const user = await User.findById(
        id
    );
    await db.disconnect();
    if (user) {
        // Remove password from the user object
        const { password, ...userWithoutPassword } = user.toObject();

        res.status(200).json(userWithoutPassword);
    } else {
        res.status(404).json({ message: "User not found" });
    }
}
