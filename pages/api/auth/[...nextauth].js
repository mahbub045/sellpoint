import axios from 'axios';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user?.id) token.id = user.id;
            if (user?.isAdmin) token.isAdmin = user.isAdmin;
            return token;
        },
        async session({ session, token }) {
            if (token?.id) session.user.id = token.id;
            if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
            return session;
        }
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                // Check if phone number and password are valid
                try {
                    const response = await axios.get('https://raw.githubusercontent.com/mahbub045/sellPointApi/main/users.json');
                    const usersData = response.data;
                    const user = usersData?.find(
                        (userData) => credentials.phone === userData.phone && credentials.password === userData.password
                    );
                    console.log(user.isAdmin)
                    if (user) {
                        // Return the user object if authentication succeeds
                        return {
                            id: user.id,
                            name: user.fullname,
                            phone: user.phone,
                            isAdmin: user.isAdmin,
                        };
                    } else {
                        // Return null if authentication fails
                        setError('Invalid Phone number or Password');
                        return null;
                    }

                } catch (error) {
                    console.error('Error fetching user data:', error);
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: '/login'
    }
});