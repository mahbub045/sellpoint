const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: { type: String, require: true },
        phone: { type: String, require: true, unique: true },
        password: { type: String, require: true },
        isAdmin: { type: Boolean, require: true, default: false },
    },
    {
        timestamps: true,
    }
);
const CreateUser = mongoose.models.User || mongoose.model('User', userSchema);
export default CreateUser;