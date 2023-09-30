const { default: CreateUser } = require("@/models/CreateUser");
const { default: data } = require("@/utils/data");
const { default: db } = require("@/utils/db");

const handler = async (req, res) => {
    await db.connect();
    await CreateUser.deleteMany();
    await CreateUser.insertMany(data.users);
    await db.disconnect();
    res.send({ message: "Seeded Successfully" });
}
export default handler;