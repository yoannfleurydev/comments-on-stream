import { Request, Response } from "express";
import { messagesRepository } from "../Database";
import { Message } from "./Message";

export const getMessages = (_: Request, res: Response) => {
  const data = messagesRepository.datastore.getAllData();

  res.json(data);
};

export const getMessage = (req: Request, res: Response) => {
  const { id } = req.params;

  messagesRepository.datastore.findOne(
    { _id: id },
    (err: Error | null, message: Message) => {
      if (err) {
        console.log(err, message);
        res.status(500).json({ message: "Internal Server Error" });
      }

      if (message) {
        res.json(message);
      } else {
        res.status(404).json({ message: `Message ${id} not found` });
      }
    }
  );
};
