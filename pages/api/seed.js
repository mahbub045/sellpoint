import User from "@/models/User";
const { default: data } = require("@/utils/data");
const { default: db } = require("@/utils/db");

const handler = async (req, res) => {
    await db.connect();
    await User.deleteMany();
    await User.insertMany(data.users);
    await db.disconnect();
    res.send({ message: "Data Seeded Successfully" });
}
export default handler;