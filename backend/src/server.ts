import express, { Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { login, register } from "./Controllers/user_controller";
import AuthRequest, { AuthMiddleware } from "./Controllers/AuthMiddleware";
import HoldingsModel from "./schema/HoldingSchema";
import PositionsModel from "./schema/PositionsSchema";
import OrdersModel from "./schema/OrdersSchema";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL as string)
    .then(() => console.log("mongoDB successfully connected"))
    .catch((err) => {
        console.log("error while connecting mongoDb", err);
    })

const port = process.env.PORT;

app.use("/api/v1/auth/login", login);
app.use("/api/v1/auth/register", register);

app.get("/allHoldings", AuthMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const allHoldings = await HoldingsModel.find({});
        res.json(allHoldings);

    } catch (err) {
        console.error("Error fetching holdings:", err);
        res.status(500).json({ error: "Failed to fetch holdings" });
    }
})

app.get("/allPositions", AuthMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const allPositions = await PositionsModel.find({});
        res.json(allPositions);
    } catch (err) {
        console.error("Error fetching positions:", err);
        res.status(500).json({ error: "Failed to fetch positions" });
    }
})

app.post("/newOrder", AuthMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const [name, quantity, price, mode] = req.body;
        const newOrder = new OrdersModel({
            name, quantity, price, mode
        });
        await newOrder.save();
        console.log("New order received:", newOrder);
        res.json({ message: "Order received" });

    } catch (err) {
        console.error("Error receiving order:", err);
        res.status(500).json({ error: "Failed to receive order" });
    }

})

app.listen(port, () => {
    console.log("app listening to port ", port);
})