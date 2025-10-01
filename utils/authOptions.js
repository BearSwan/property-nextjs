import connectDB from '@/config/database';
import User from '@/models/User';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline', 
                    response_type: 'code'
                }
            }
		})
	],
    callbacks: {
        // Invoked on successful sign in
        async signIn({ profile }) {
            // Connect to database
            await connectDB();
            // Check if user exists
            const userExists = await User.findOne({ email: profile.email  });
            // if not, create user
            if (!userExists) {
                // Truncate username if too long
                const username = profile.name.slice(0, 20);

                await User.create({ 
                    email: profile.email,
                    username,
                    image: profile.picture
                })
            }
            // return true to allow sign in
            return true;
        },
        // Session callback function that modifies the session object
        async session({ session }) {
            // Get user from database
            const user = await User.findOne({ email: session.user.email });
            // Assign user ID from the session
            session.user.id = user._id.toString();
            // return the session
            return session;
        }
    }
};

export default NextAuth(authOptions);
