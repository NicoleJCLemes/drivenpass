var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { getByIdAndTitle, insert, getByCardId, getByUserId, deleteById } from "../repositories/cardsRepository.js";
import jwt from "jsonwebtoken";
import Cryptr from "cryptr";
import dayjs from "dayjs";
import "../config/setup.js";
export function createCardService(body, authorization) {
    return __awaiter(this, void 0, void 0, function () {
        var token, userId, titleExists, cryptr, todayTimestamp, cardYear, cardMonth, cardDate, card;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = authorization.replace("Bearer", "").trim();
                    userId = jwt.verify(token, process.env.SECRET_KEY);
                    return [4 /*yield*/, getByIdAndTitle(userId, body.title)];
                case 1:
                    titleExists = _a.sent();
                    if (titleExists) {
                        throw {
                            type: "Conflict",
                            message: "You already has a card with this title"
                        };
                    }
                    cryptr = new Cryptr(process.env.SECRET_KEY);
                    todayTimestamp = Date.parse(dayjs().toString());
                    cardYear = body.expirationDate.toString().slice(3);
                    cardMonth = body.expirationDate.toString().slice(0, 2);
                    cardDate = Date.parse(cardYear + "-" + cardMonth + "-" + "01");
                    if (cardDate < todayTimestamp) {
                        throw {
                            type: "Unprocessable Entity",
                            message: "This card is expired"
                        };
                    }
                    card = {
                        title: body.title,
                        cardNumber: body.cardNumber,
                        cardName: body.cardName,
                        securityCode: cryptr.encrypt(body.securityCode),
                        expirationDate: cardDate,
                        password: cryptr.encrypt(body.password),
                        isVirtual: body.isVirtual,
                        type: body.type
                    };
                    return [4 /*yield*/, insert(card, userId)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function showCardService(id, authorization) {
    return __awaiter(this, void 0, void 0, function () {
        var token, userId, cardsByUserId, cryptr, userCardsArray, card, decryptedPassword, decryptedSecurityCode, date;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = authorization.replace("Bearer", "").trim();
                    userId = jwt.verify(token, process.env.SECRET_KEY);
                    return [4 /*yield*/, getByUserId(userId)];
                case 1:
                    cardsByUserId = _a.sent();
                    cryptr = new Cryptr(process.env.SECRET_KEY);
                    userCardsArray = [];
                    cardsByUserId.forEach(function (card) {
                        var date = (new Date(card.expirationDate)).toString();
                        var userCards = __assign(__assign({}, card), { password: cryptr.decrypt(card.password), securityCode: cryptr.decrypt(card.securityCode), expirationDate: date });
                        userCardsArray = __spreadArray(__spreadArray([], userCardsArray, true), [userCards], false);
                    });
                    if (!id) return [3 /*break*/, 3];
                    return [4 /*yield*/, getByCardId(userId, id)];
                case 2:
                    card = _a.sent();
                    if (!card) {
                        throw {
                            type: "Not Found",
                            message: "This card is inexistent or invalid"
                        };
                    }
                    decryptedPassword = cryptr.decrypt(card.password);
                    decryptedSecurityCode = cryptr.decrypt(card.securityCode);
                    date = (new Date(card.expirationDate)).toString();
                    return [2 /*return*/, __assign(__assign({}, card), { password: decryptedPassword, securityCode: decryptedSecurityCode, expirationDate: date })];
                case 3: return [2 /*return*/, userCardsArray];
            }
        });
    });
}
export function deleteCardService(id, authorization) {
    return __awaiter(this, void 0, void 0, function () {
        var token, userId, cardById;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = authorization.replace("Bearer", "").trim();
                    userId = jwt.verify(token, process.env.SECRET_KEY);
                    return [4 /*yield*/, getByCardId(userId, id)];
                case 1:
                    cardById = _a.sent();
                    if (!cardById) return [3 /*break*/, 3];
                    return [4 /*yield*/, deleteById(id)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3: throw {
                    type: "Not Found",
                    message: "This card is inexistent or invalid"
                };
                case 4: return [2 /*return*/];
            }
        });
    });
}
