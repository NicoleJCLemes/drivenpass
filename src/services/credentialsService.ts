import { 
    Credential, 
    getByCredencialId,
    getByUserId,
    getByIdAndTitle, 
    insert,
    deleteById } from "../repositories/credentialsRepository.js";
import jwt from "jsonwebtoken";
import Cryptr from "cryptr";
import "../config/setup.js";

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

    await insert(credential, userId);
}

export async function showCredentialService(id: number, authorization: string) {
    const token = authorization.replace("Bearer", "").trim();
    const userId = jwt.verify(token, process.env.SECRET_KEY);
    
    const credentialsByUserId = await getByUserId(userId);
    const cryptr = new Cryptr(process.env.SECRET_KEY);
    let userCredentialsArray = []
    credentialsByUserId.forEach((credential) => {
        let userCredentials = {...credential, password: cryptr.decrypt(credential.password)}
        userCredentialsArray = [...userCredentialsArray, userCredentials]
    })
    
    if(id) {
        let credential = await getByCredencialId(userId, id);
        if(!credential) {
            throw {
                type: "Not Found",
                message: "This credencial is inexistent or invalid"
            }
        }
        const decryptedPassword = cryptr.decrypt(credential.password);
        return {...credential, password: decryptedPassword}
    }

    return userCredentialsArray;
}

export async function deleteCredentialService(id: number, authorization: string) {
    const token = authorization.replace("Bearer", "").trim();
    const userId = jwt.verify(token, process.env.SECRET_KEY);

    const credentialById = await getByCredencialId(userId, id);
    if(credentialById) {
        await deleteById(id);
    } else {
        throw {
            type: "Not Found",
            message: "This credencial is inexistent or invalid"
        }
    }
}