import { insertUser, User, getByEmail } from "../repositories/userRepository.js";
import bcrypt from "bcrypt";

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

// erro de conflito quebra o backend