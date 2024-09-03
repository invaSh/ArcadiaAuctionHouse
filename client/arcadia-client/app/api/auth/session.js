import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  res.status(200).json(session);
}