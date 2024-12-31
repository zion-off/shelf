import NextAuth, { User as GoogleUser } from "next-auth";
import Google from "next-auth/providers/google";
import { createNewUser } from "@/utils/createNewUser";
import { User } from "@/models"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user }: { user: GoogleUser }) {
      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        return await createNewUser(user);
      }
      return true;
    },
  },
});
