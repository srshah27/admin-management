import NextAuth from "next-auth"
import executeQuery from '../../../lib/db'
import { compare } from 'bcryptjs';
import CredentialProvider from "next-auth/providers/credentials"
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'Enter your email'
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      authorize: async (credentials) => {
        let dbUser = await executeQuery({
          query: `SELECT * FROM user where email=? LIMIT 1`,
          values: [credentials.email]
        })

        if (dbUser.length < 0) return null; // User not fount

        console.log(dbUser[0].hash);
        if (!await compare(credentials.password, dbUser[0].hash)) return null;  // Passwords do not match
        let user = {
          ...dbUser[0],
        }
        return user

      },
    })
  ],

  pages: {
    signIn: '/auth/login',
    error: '/auth/error', // Error code passed in query string as ?error=
  },

  callbacks: {

    async signIn({ }) {
      return true;
    },

    jwt: ({ token, user }) => {
      if (user) {
        token = {
          ...user
        }
      }
      return token
    },
    session: ({ token, session }) => {
      session.user = {
        ...token
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    encryption: true
  }
})