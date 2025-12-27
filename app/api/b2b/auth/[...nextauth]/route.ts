import NextAuth from "next-auth";
import { b2bAuthOptions } from "@/lib/b2b-auth";

const handler = NextAuth(b2bAuthOptions);

export { handler as GET, handler as POST };
