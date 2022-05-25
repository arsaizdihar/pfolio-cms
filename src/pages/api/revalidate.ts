import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    if (req.headers.secret !== process.env.WEBHOOK_SECRET) {
      return res.status(401).json({ error: "Invalid secret" });
    }
    try {
      await res.unstable_revalidate("/");
      return res.json({ success: true });
    } catch (error) {
      console.log(error);
      return res.json({ secret: req.headers.secret, error });
    }
  }
  return res.status(404).json({ message: "Not found" });
}
