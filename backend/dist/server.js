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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_controller_1 = require("./Controllers/user_controller");
const AuthMiddleware_1 = require("./Controllers/AuthMiddleware");
const HoldingSchema_1 = __importDefault(require("./schema/HoldingSchema"));
const PositionsSchema_1 = __importDefault(require("./schema/PositionsSchema"));
const OrdersSchema_1 = __importDefault(require("./schema/OrdersSchema"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
mongoose_1.default.connect(process.env.MONGO_URL)
    .then(() => console.log("mongoDB successfully connected"))
    .catch((err) => {
    console.log("error while connecting mongoDb", err);
});
const port = process.env.PORT;
app.use("/api/v1/auth/login", user_controller_1.login);
app.use("/api/v1/auth/register", user_controller_1.register);
app.get("/allHoldings", AuthMiddleware_1.AuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allHoldings = yield HoldingSchema_1.default.find({});
        res.json(allHoldings);
    }
    catch (err) {
        console.error("Error fetching holdings:", err);
        res.status(500).json({ error: "Failed to fetch holdings" });
    }
}));
app.get("/allPositions", AuthMiddleware_1.AuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allPositions = yield PositionsSchema_1.default.find({});
        res.json(allPositions);
    }
    catch (err) {
        console.error("Error fetching positions:", err);
        res.status(500).json({ error: "Failed to fetch positions" });
    }
}));
app.get("/allOrders", AuthMiddleware_1.AuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allOrders = yield OrdersSchema_1.default.find({});
        res.json(allOrders);
    }
    catch (err) {
        console.error("Error fetching orders:", err);
        res.status(500).json({ error: "Failed to fetch orders" });
    }
}));
app.post("/newOrder", AuthMiddleware_1.AuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, quantity, price, mode } = req.body;
        const newOrder = new OrdersSchema_1.default({
            name, quantity, price, mode
        });
        yield newOrder.save();
        console.log("New order received:", newOrder);
        res.json({ message: "Order received" });
    }
    catch (err) {
        console.error("Error receiving order:", err);
        res.status(500).json({ error: "Failed to receive order", err });
    }
}));
app.listen(port, () => {
    console.log("app listening to port ", port);
});
