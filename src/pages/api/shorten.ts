import { NextApiRequest, NextApiResponse } from "next";
import { nanoid } from "nanoid";
import prisma from "../../prisma";
import {z} from 'zod'

const shortenSchema = z.object({
  url: z.string().url(),
  slug: z.string().optional()
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const response = shortenSchema.safeParse(req.body)

    if (!response.success) {
      res.status(400).json({ error: response.error.errors });
      return;
    }

    const { url, slug } = response.data;

    const generatedSlug = slug || nanoid(6);

    const [link] = await prisma.$transaction([
      prisma.link.create({
        data: {
          url,
          slug: generatedSlug,
        },
      }),
    ])

    res.status(201).json(link);
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
