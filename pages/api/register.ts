import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prismabd from "@/lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).end();
    }

    const { username, email, password } = req.body;

    const exsistingUser = await prismabd.user.findUnique({
      where: {
        email
      },
    });

    if (exsistingUser) {
      return res.status(422).json({ error: 'Email taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismabd.user.create({
      data: {
        name: username,
        email: email,
        hashedPassword: hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: `Something went wrong: ${error}` });
  }
}