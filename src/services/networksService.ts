import { 
    Network, 
    getByIdAndTitle, 
    insert, 
    getByUserId, 
    getByNetworkId, 
    deleteById } from "../repositories/networksRepository.js";
import jwt from "jsonwebtoken";
import "../config/setup.js";
import Cryptr from "cryptr";

export async function createNetworkService(body: Network, authorization: string) {
    const token = authorization.replace("Bearer", "").trim();
    const userId = jwt.verify(token, process.env.SECRET_KEY);
    const titleExists = await getByIdAndTitle(userId, body.title);

    if(titleExists) {
        throw {
            type: "Conflict",
            message: "You already has a network with this title"
        }
    }
    
    const cryptr = new Cryptr(process.env.SECRET_KEY);
    const network = {
        title: body.title,
        networkName: body.networkName,
        password: cryptr.encrypt(body.password)
    }

    await insert(network, userId);
}

export async function showNetworkService(id: number, authorization: string) {
    const token = authorization.replace("Bearer", "").trim();
    const userId = jwt.verify(token, process.env.SECRET_KEY);
    
    const networksByUserId = await getByUserId(userId);
    const cryptr = new Cryptr(process.env.SECRET_KEY);
    let userNetworksArray = []
    networksByUserId.forEach((network) => {
        let userNetworks = {...network, password: cryptr.decrypt(network.password)}
        userNetworksArray = [...userNetworksArray, userNetworks]
    })
    
    if(id) {
        let network = await getByNetworkId(userId, id);
        if(!network) {
            throw {
                type: "Not Found",
                message: "This network is inexistent or invalid"
            }
        }
        const decryptedPassword = cryptr.decrypt(network.password);
        return {...network, password: decryptedPassword}
    }

    return userNetworksArray;
}

export async function deleteNetworkService(id: number, authorization: string) {
    const token = authorization.replace("Bearer", "").trim();
    const userId = jwt.verify(token, process.env.SECRET_KEY);

    const networkById = await getByNetworkId(userId, id);
    if(networkById) {
        await deleteById(id);
    } else {
        throw {
            type: "Not Found",
            message: "This network is inexistent or invalid"
        }
    }
}