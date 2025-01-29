import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { connectToDatabase } from '../../../lib/db';

export default NextAuth({
    providers: [
        Providers.Credentials({
            async authorize(credentials) {
                const client = connectToDatabase();

                const usersCollection = client.db().collection('users');
                const user = await usersCollection.findOne({ email: credentials.email });

                if (!user) {
                    client.close();
                    throw new Error('No user found!');
                }

                client.close();
            }
        })
    ]
});

