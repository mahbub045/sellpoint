// This utility helps get the session token from cookies for NextAuth.js
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function getSessionToken(request) {
  return await getToken({ req: request, secret });
}
