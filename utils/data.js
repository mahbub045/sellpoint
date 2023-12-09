import bcrypt from "bcryptjs";
const data = {
    users: [
        {
            name: "Md Mahbub Rahman",
            phone: "01511111111",
            email: "mahbub@gmail.com",
            password: bcrypt.hashSync("123456"),
            address: "12/36 Main Street, Dhaka-1212, Bangladesh",
            isAdmin: true,
        },
        {
            name: "Mishad",
            phone: "01866936531",
            email: "mishad@gmail.com",
            password: bcrypt.hashSync("123456"),
            address: "123 Main Street, Dhaka-1212, Bangladesh",
            isAdmin: false,
        },
        {
            name: "Jhon Wick",
            phone: "01411111111",
            email: "jhon@gmail.com",
            password: bcrypt.hashSync("123456"),
            address: "3/5 Main Street, Dhaka-1212, Bangladesh",
            isAdmin: false,
        },
    ]
}
export default data;