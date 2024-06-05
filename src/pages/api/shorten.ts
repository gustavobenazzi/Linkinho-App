import { NextApiRequest, NextApiResponse } from "next";
import { nanoid } from "nanoid";
import prisma from "../../prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { url, slug } = req.body;

    if (!url) {
      res.status(400).json({ error: "Missing url" });
      return;
    }

    const generatedSlug = slug || nanoid(6);

    try {
      const newLink = await prisma.link.create({
        data: {
          url,
          slug: generatedSlug,
        },
      });

      res.status(201).json(newLink);
    } catch (error) {
      console.error("Error creating the link:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
