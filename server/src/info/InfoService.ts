import { Request, Response } from "express";

export function getChannel(req: Request, res: Response) {
  return res.json({ channel: process.env.CHANNEL });
}
