import NextAuth, { User as GoogleUser } from 'next-auth';
import Google from 'next-auth/providers/google';
import mongo from '@/lib/mongodb';
import mongoose from 'mongoose';
import User from '@/models/user.model';
import Config from '@/models/config.model';
import { IUser } from '@/interfaces/models';

async function createNewUser(user: GoogleUser): Promise<boolean> {
  if (!user.email) {
    throw new Error('Unable to retrieve email');
  }

  await mongo();
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const newUser: IUser = await new User({
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.email.split('@')[0]
    }).save({ session });

    await new Config({
      user: newUser._id,
      default_folder: null
    }).save({ session });

    await session.commitTransaction();
    return true;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}

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
