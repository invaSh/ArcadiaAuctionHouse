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
      authorization: { params: { scope: "openid profile email roles auctionApp" } },
      idToken: true,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.username = profile.name[0];
        token.email = profile.email;
        token.access_token = account.access_token
        token.roles = profile.role || [];
      }

      
      return token;
    },
    async session({ session, token }) {
      session.user.username = token.username;
      session.user.email = token.email;
      session.access_token = token.access_token
      session.user.roles = token.roles;
      return session;
    },
  },
  async signIn({ account, profile, error }) {
    if (error) {
      console.error('OAuth error:', error);
    }
    return true; 
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
