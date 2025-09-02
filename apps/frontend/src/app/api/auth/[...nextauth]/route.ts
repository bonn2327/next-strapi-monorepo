import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      return session
    },
    async jwt({ token, account }) {
      return token
    },
    async signIn({ user, account, profile }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      // Redirect to home with success parameter after Google login
      if (url.startsWith(baseUrl)) {
        return `${baseUrl}/?auth=success`
      }
      return baseUrl
    }
  },
  events: {
    async signOut(message) {
      // Additional cleanup if needed
    }
  }
})

export { handler as GET, handler as POST }