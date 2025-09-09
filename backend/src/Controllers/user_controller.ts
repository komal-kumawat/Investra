import { Request, Response } from "express";
import httpStatus from "http-status";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { User } from "../schema/UsersSchema";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

const login = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res
            .status(httpStatus.BAD_REQUEST)
            .json({ message: "Please provide username and password" });
    }
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res
                .status(httpStatus.NOT_FOUND)
                .json({ message: "User not found" });
        }
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            return res
                .status(httpStatus.UNAUTHORIZED)
                .json({ message: "Invalid credentials" });
        }
        const token = jwt.sign(
            {
                id: user._id,
                username: user.username
            }, JWT_SECRET, { expiresIn: "24h" }
        );
        return res.status(httpStatus.OK).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                username: user.username
            }
        });



    } catch (err) {
        console.error("error while logging in ");
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ err });
    }
}

const register = async (req: Request, res: Response): Promise<Response> => {
  const { name, username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(httpStatus.CONFLICT)
        .json({ message: "user already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      username,
      password: hashedPassword,
    });
    await newUser.save();

    // 🔑 Generate JWT immediately after registration
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(httpStatus.CREATED).json({
      message: "User created successfully",
      token, // send token back
      user:{
      name: newUser.name,

      }
    });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ err });
  }
};

export { login, register };