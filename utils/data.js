import bcrypt from "bcryptjs";
const data = {
    users: [
        {
            name: "Md Mahbub Rahman",
            phone: "01511111111",
            password: bcrypt.hashSync("123456"),
            address: "12/36 Main Street, Dhaka-1212, Bangladesh",
            isAdmin: true,
        },
        {
            name: "Rahim Mandal",
            phone: "01311111111",
            password: bcrypt.hashSync("123456"),
            address: "123 Main Street, Dhaka-1212, Bangladesh",
            isAdmin: false,
        },
        {
            name: "Jhon Wick",
            phone: "01411111111",
            password: bcrypt.hashSync("123456"),
            address: "3/5 Main Street, Dhaka-1212, Bangladesh",
            isAdmin: false,
        },
        {
            name: "Rejaul Karim",
            phone: "01700000000",
            password: bcrypt.hashSync("123456"),
            address: "3/5 Main Street, Dhaka-1212, Bangladesh",
            isAdmin: true,
        },
    ]
}
export default data;