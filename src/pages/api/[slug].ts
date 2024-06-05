import prisma from "../../prisma";

export default async function handler(req: any, res: any) { 
  const { slug } = req.query;

  try {
    const link = await prisma.link.findUnique({
      where: {
        slug: slug,
      },
    });

    if (link) {
      res.redirect(link.url);
    } else {
      res.status(404).json({ error: "Link not found" });
    }
  } catch (error) {
    console.error("Error finding the link:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
