import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { connectToDatabase } from '../../../lib/db';
import { verifyPassword } from '../../../lib/auth';
import { session } from 'next-auth/client';

export default NextAuth({
    session: {
        jwt: true
    },
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

                const inValid = verifyPassword(credentials.password, user.password);

                if (!inValid) {
                    client.close();
                    throw new Error('Could not log you in!');
                }

                client.close();
                return { email: user.email };

                
            }
        })
    ]
});

