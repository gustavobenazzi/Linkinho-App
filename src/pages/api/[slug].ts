import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) { 
  const { slug } = req.query;

  if (typeof slug !== "string") {
    return res.status(400).json({ error: "Invalid slug" });
  }

  try {
    const link = await prisma.link.findFirst({
      where: {
        slug: slug,
      },
    });

    if (link) {
      return res.redirect(link.url);
    } else {
      return res.status(404).json({ error: "Link not found" });
    }
  } catch (error) {
    console.error("Error finding the link:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
