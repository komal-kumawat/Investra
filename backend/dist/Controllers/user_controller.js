"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const UsersSchema_1 = require("../schema/UsersSchema");
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        return res
            .status(http_status_1.default.BAD_REQUEST)
            .json({ message: "Please provide username and password" });
    }
    try {
        const user = yield UsersSchema_1.User.findOne({ username });
        if (!user) {
            return res
                .status(http_status_1.default.NOT_FOUND)
                .json({ message: "User not found" });
        }
        const isPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!isPassword) {
            return res
                .status(http_status_1.default.UNAUTHORIZED)
                .json({ message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({
            id: user._id,
            username: user.username
        }, JWT_SECRET, { expiresIn: "24h" });
        return res.status(http_status_1.default.OK).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                username: user.username
            }
        });
    }
    catch (err) {
        console.error("error while logging in ");
        return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({ err });
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, username, password } = req.body;
    try {
        const existingUser = yield UsersSchema_1.User.findOne({ username });
        if (existingUser) {
            return res
                .status(http_status_1.default.CONFLICT)
                .json({ message: "user already exist" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = new UsersSchema_1.User({
            name,
            username,
            password: hashedPassword,
        });
        yield newUser.save();
        // 🔑 Generate JWT immediately after registration
        const token = jsonwebtoken_1.default.sign({ id: newUser._id, username: newUser.username }, JWT_SECRET, { expiresIn: "24h" });
        return res.status(http_status_1.default.CREATED).json({
            message: "User created successfully",
            token, // send token back
            user: {
                name: newUser.name,
            }
        });
    }
    catch (err) {
        return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({ err });
    }
});
exports.register = register;
