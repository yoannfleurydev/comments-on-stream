import { Request, Response } from "express";
import { messagesRepository } from "../Database";
import { Message } from "./Message";

export const getMessages = (_: Request, res: Response) => {
  messagesRepository.datastore
    .find({})
    .sort({ datetime: 1 })
    .exec((err, messages) => {
      if (err) {
        console.log(err, messages);
        res.status(500).json({ message: "Internal Server Error" });
        return;
      }

      res.json(messages);
    });
};

export const getMessage = (req: Request, res: Response) => {
  const { id } = req.params;

  messagesRepository.datastore.findOne(
    { _id: id },
    (err: Error | null, message: Message) => {
      if (err) {
        console.log(err, message);
        res.status(500).json({ message: "Internal Server Error" });
        return;
      }

      if (message) {
        res.json(message);
      } else {
        res.status(404).json({ message: `Message ${id} not found` });
      }
    }
  );
};

export const deleteMessages = (_: Request, res: Response) => {
  messagesRepository.datastore.remove(
    {},
    { multi: true },
    (err, numberRemoved) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
        return;
      }

      console.log(`${numberRemoved} messages removed`);
      res.status(204).send();
    }
  );
};

export const updateMessage = (req: Request, res: Response) => {
  const id = req.params.id;
  const body = req.body;

  console.log(`Updating message ${id} with body ${JSON.stringify(body)}`);

  messagesRepository.datastore.update(
    { _id: id },
    body,
    {},
    (err, numReplaced) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
        return;
      }

      console.log(`${numReplaced} messages replaced`);
      res.status(200).json(body);
    }
  );
};

export const getQuestions = (_: Request, res: Response) => {
  messagesRepository.datastore
    .find({ isQuestion: true })
    .sort({ datetime: 1 })
    .exec((err, messages) => {
      if (err) {
        console.log(err, messages);
        res.status(500).json({ message: "Internal Server Error" });
        return;
      }

      res.json(messages);
    });
};
