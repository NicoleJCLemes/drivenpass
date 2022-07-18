import { Credential, getByIdAndTitle, insert } from "../repositories/credentialsRepository.js";
import jwt from "jsonwebtoken";
import Cryptr from "cryptr";
import "../config/setup.js"

export async function createCredentialService(body: Credential, authorization: string) {
    
    const token = authorization.replace("Bearer", "").trim();
    const userId = jwt.verify(token, process.env.SECRET_KEY);
    const titleExists = await getByIdAndTitle(userId, body.title);
    
    if(titleExists) {
        throw {
            type: "Conflict",
            message: "You already has a credential with this title"
        }
    }
    
    const cryptr = new Cryptr(process.env.SECRET_KEY);
    const credential = {
        title: body.title,
        url: body.url,
        nickName: body.nickName,
        password: cryptr.encrypt(body.password)
    }

    await insert(credential, userId); // erro com o jwt, não encontra o id que está dentro
}