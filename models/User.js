const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        phone: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        address: { type: String, required: true }, // Fix the typo here
        isAdmin: { type: Boolean, required: true, default: false },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;