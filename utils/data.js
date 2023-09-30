import bcrypt from "bcryptjs";
const data = {
    users: [
        {
            name: "Md Mahbub Rahman",
            phone: "01511111111",
            password: bcrypt.hashSync("123456"),
            isAdmin: true,
        },
        {
            name: "Rahim Mandal",
            phone: "01311111111",
            password: bcrypt.hashSync("123456"),
            isAdmin: false,
        },
        {
            name: "Jhon Wick",
            phone: "01411111111",
            password: bcrypt.hashSync("123456"),
            isAdmin: false,
        },
    ]
}
export default data;