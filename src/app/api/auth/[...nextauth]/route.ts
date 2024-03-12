import nextAuth from "next-auth";
import { authOptions } from "./authOptions";

const handler = nextAuth(authOptions);

export { handler as GET, handler as POST}