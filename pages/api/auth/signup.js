import { hashPassword } from "../../../lib/auth";
import { connectDatabase } from "../../../lib/db";

export default async function handler(req,res) {
    const data = req.body;

    const { email, password } = data;

    if (
        !email ||
        !email.includes('@') ||
        !password ||
        password.trim().length < 7
    ) {
        res.status(422).json({ message: 'Invalid input - password should also be at least 7 characters long' });
        return;
    }

    const client = await connectDatabase();

    const db = client.db();

    const hashPassword = await hashPassword(password);

    const result = db.collection('users').insertOne({
       email: email,
       password: hashPassword
    });

    res.status(201).json({ message: 'Created user!' });
}