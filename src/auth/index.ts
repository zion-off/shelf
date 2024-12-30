import NextAuth, { User as GoogleUser } from "next-auth";
import Google from "next-auth/providers/google";
import mongo from "@/lib/mongodb";
import User from "@/models/user.model";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user }: { user: GoogleUser }) {
      if (!user.email) {
        throw new Error("Unable to retrieve email");
      }
      await mongo();
      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        await User.create({
          name: user.name,
          email: user.email,
          username: user.email.split("@")[0],
        });
      }
      return true;
    },
  },
});
