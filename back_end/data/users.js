import bcrypt from "bcryptjs";

const users = [
    {
        name: "Admin User",
        email: "admin@example.com",
        password: bcrypt.hashSync("123456",10),
        isAdmin: true
    }, 
    {
        name: "Girish",
        email: "Girish@example.com",
        password: bcrypt.hashSync("123456",10)
    },
    {
        name: "NoOne",
        email: "NoOne@example.com",
        password: bcrypt.hashSync("123456",10) 
    }
]

export default users;