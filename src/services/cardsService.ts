import { Card } from "../repositories/cardsRepository.js";
import { getByIdAndTitle, insert, getByCardId, getByUserId, deleteById } from "../repositories/cardsRepository.js";
import jwt from "jsonwebtoken";
import Cryptr from "cryptr";
import dayjs from "dayjs";

export async function createCardService(body: Card, authorization: string) {
    
    const token = authorization.replace("Bearer", "").trim();
    const userId = jwt.verify(token, process.env.SECRET_KEY);
    const titleExists = await getByIdAndTitle(userId, body.title);

    if(titleExists) {
        throw {
            type: "Conflict",
            message: "You already has a card with this title"
        }
    }

    const cryptr = new Cryptr(process.env.SECRET_KEY);
    const todayTimestamp = Date.parse(dayjs().toString());
    const cardYear = body.expirationDate.toString().slice(3);
    const cardMonth = body.expirationDate.toString().slice(0,2);
    const cardDate = Date.parse(cardYear + "-" + cardMonth + "-" + "01");

    if(cardDate < todayTimestamp) {
        throw {
            type: "Unprocessable Entity",
            message: "This card is expired"
        }
    }

    const card = {
        title: body.title,
        cardNumber: body.cardNumber,
        cardName: body.cardName,
        securityCode: cryptr.encrypt(body.securityCode),
        expirationDate: cardDate,
        password: cryptr.encrypt(body.password),
        isVirtual: body.isVirtual,
        type: body.type
    }
     
    await insert(card, userId);
}

export async function showCardService(id: number, authorization: string) {
    const token = authorization.replace("Bearer", "").trim();
    const userId = jwt.verify(token, process.env.SECRET_KEY);
    
    const cardsByUserId = await getByUserId(userId);
    const cryptr = new Cryptr(process.env.SECRET_KEY);
    let userCardsArray = [];
    cardsByUserId.forEach((card) => {
        const date = (new Date(card.expirationDate)).toString();
        let userCards = {...card, password: cryptr.decrypt(card.password), 
            securityCode: cryptr.decrypt(card.securityCode), expirationDate: date}
        userCardsArray = [...userCardsArray, userCards]
    });
    
    if(id) {
        let card = await getByCardId(userId, id);
        if(!card) {
            throw {
                type: "Not Found",
                message: "This card is inexistent or invalid"
            }
        }
        const decryptedPassword = cryptr.decrypt(card.password);
        const decryptedSecurityCode = cryptr.decrypt(card.securityCode);
        const date = (new Date(card.expirationDate)).toString();
        return {...card, password: decryptedPassword, securityCode: decryptedSecurityCode, expirationDate: date}
    }

    return userCardsArray;
}

export async function deleteCardService(id: number, authorization: string) {
    const token = authorization.replace("Bearer", "").trim();
    const userId = jwt.verify(token, process.env.SECRET_KEY);

    const cardById = await getByCardId(userId, id);
    if(cardById) {
        await deleteById(id);
    } else {
        throw {
            type: "Not Found",
            message: "This card is inexistent or invalid"
        }
    }
}