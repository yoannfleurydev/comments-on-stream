import tmi from "tmi.js";
import { messagesRepository } from "./Database";
import type { Message } from "./messages/Message";
import { run } from "./server";
import dotenv from "dotenv";

// Load configuration from .env file.
dotenv.config();

const CHANNEL = process.env.CHANNEL || "codeursenseine";

const client = new tmi.Client({
  connection: { reconnect: true },
  channels: [CHANNEL],
});

client.connect().then(() => console.log("Message listener connected"));

client.on("message", (channel, tags, content, self) => {
  console.log(`${tags["display-name"]}: ${content}`);

  const message: Message = {
    content,
    displayName: tags["display-name"],
    datetime: tags["tmi-sent-ts"],
  };

  messagesRepository.datastore.insert(message);
});

// Launch Server
run();
