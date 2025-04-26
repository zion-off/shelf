/* eslint-disable */
import type { NextApiRequest, NextApiResponse } from "next";
import mongo from "@/lib/mongodb";
import { Item } from "@/models";

type ResponseData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { title, author, link, notes } = req.body;
  if (!title || !author || !link || !notes) {
    res.status(400).json({ message: "Invalid input" });
  }

  const newItem = new Item({
    
  })

  res.status(200).json({ message: "Hello from Next.js!" });
}
