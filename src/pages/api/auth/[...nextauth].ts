import CredentialsProvider from "next-auth/providers/credentials";

import type { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"
import UserService from "@/services/user";
import UserRepository from "@/persistence/repositories/user";
import AppAuthenticationError from "@/errors/app-authentication-error";

const PROVIDERS =  [
  CredentialsProvider({
    // The name to display on the sign in form (e.g. "Sign in with...")
    name: "Credentials",
    // `credentials` is used to generate a form on the sign in page.
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      email: { label: "Email", type: "email",},
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
      // Add logic here to look up the user from the credentials supplied
      if(!credentials) {
        throw new AppAuthenticationError("Invalid credentials supplied", 401);
      }
      const userService = new UserService(new UserRepository());
      const user = await userService.getUserByUsernameAndPassword(credentials.email,credentials.password);
      if (user) {
        // Any object returned will be saved in `user` property of the JWT
        return {
          email: user.email,
          id: user._id
        }
      } else {
        // If you return null then an error will be displayed advising the user to check their details.
        throw new AppAuthenticationError("Invalid credentials supplied", 401);
        //return null

        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      }
    }
  })
]

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // Do whatever you want here, before the request is passed down to `NextAuth`
  return await NextAuth(req, res, {
    providers: PROVIDERS,
    session: {
      strategy: "jwt",
      maxAge: 60 * 60,
    }
  })
}
