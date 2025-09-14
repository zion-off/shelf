import NextAuth, { User as GoogleUser } from 'next-auth';
import Google from 'next-auth/providers/google';
import { createNewUser } from '@/actions/user';
import { User } from '@/models';
import mongo from '@/lib/mongodb';

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: `/`,
    signOut: `/`
  },
  providers: [Google],
  callbacks: {
    async signIn({ user }: { user: GoogleUser }) {
      await mongo();
      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        return await createNewUser(user);
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        await mongo();
        const email = user.email;
        const dbUser = await User.findOne({ email }).select('_id');
        token.id = dbUser._id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    }
  }
});
