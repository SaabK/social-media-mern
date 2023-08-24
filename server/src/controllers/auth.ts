import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user';

export const signin = async (req: Request, res: Response) => {

  const { email, password } = req.body;

  try {

    const thatOneUser = await User.findOne({ email });

    if (!thatOneUser) return res.status(404).json({ success: false, data: 'No such user exists' });

    const isPasswordCorrect = await bcrypt.compare(password, thatOneUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ success: false, data: "Invalid Credentials" });

    const token = jwt.sign({ email: thatOneUser.email, id: thatOneUser._id }, process.env.AUTH_SECRET as string, { expiresIn: '1h' });

    res.status(200).json({ success: true, data: thatOneUser, token });

  } catch (error: any) {
    console.log(error);
    res.status(500).json({ success: false, data: error })
  }
}

export const signup = async (req: Request, res: Response) => {

  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {

    const thatOneUser = await User.findOne({ email });

    if (thatOneUser) return res.status(404).json({ success: false, data: 'A user with that Email already exists' });

    if (password !== confirmPassword) return res.status(400).json({ success: false, data: "Passwords don't match" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

    const token = jwt.sign({ email: user.email, id: user._id }, process.env.AUTH_SECRET as string, { expiresIn: '1h' });

    res.status(201).json({ success: true, data: user, token });

  } catch (error: any) {
    console.log(error);
    res.status(500).json({ success: false, data: error })
  }
}