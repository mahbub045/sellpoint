import CreateUser from '@/models/CreateUser';
import db from '@/utils/db';
import bcryptjs from "bcryptjs";
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user?._id) token._id = user._id;
            if (user?.isAdmin) token.isAdmin = user.isAdmin;
            return token;
        },
        async session({ session, token }) {
            if (token?._id) session.user._id = token._id;
            if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
            return session;
        }
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                // Check if phone number and password are valid
                await db.connect();
                const user = await CreateUser.findOne({
                    phone: credentials.phone,
                });
                await db.disconnect();
                if (user && bcryptjs.compareSync(credentials.password, user.password)) {
                    return {
                        _id: user._id,
                        name: user.name,
                        phone: user.phone,
                        isAdmin: user.isAdmin,
                    };
                }
                throw new Error("Invalid Email or Password");
            },
        }),
    ],
});