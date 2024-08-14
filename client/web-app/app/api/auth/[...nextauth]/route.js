import NextAuth from "next-auth";
import DuendeIdentityServer6 from "next-auth/providers/duende-identity-server6";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    DuendeIdentityServer6({
      id: "id-server",
      clientId: "nextApp",
      clientSecret: "secret",
      issuer: "http://localhost:5000",
      authorization: { params: { scope: "openid profile email auctionApp" } },
      idToken: true,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.username = profile.name[0];
        token.email = profile.email;
        token.access_token = account.access_token
      }

      
      return token;
    },
    async session({ session, token }) {
      session.user.username = token.username;
      session.user.email = token.email;
      session.access_token = token.access_token
      return session;
    },
  },
  debug: true,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
