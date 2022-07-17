import { insertUser, User, getByEmail } from "../repositories/userRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "../config/setup.js";

export async function userService(body: User) {

    const emailExists = await getByEmail(body.email);

    if(emailExists) {
        throw {
            type: "Conflict",
            message: "This email already exists!"
        }
    }
    
    const cryptedPassword = bcrypt.hashSync(body.password, 10);
    await insertUser({
        email: body.email,
        password: cryptedPassword
    });
}

export async function userLoginService(body: User) {
    const emailExists = await getByEmail(body.email);

    if(!emailExists) {
        throw {
            type: "Not Found",
            message: "No email was found"
        }
    }
    
    const passwordMatches = bcrypt.compareSync(body.password, emailExists.password);
    if(!passwordMatches) {
        throw {
            type: "Unauthorized",
            message: "The password doesn't match"
        }
    }

    const payload = {
        id: emailExists.id.toString()
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY);

    return token;
}
