import tmi from "tmi.js";
import { messagesRepository } from "./Database";
import type { Message } from "./messages/Message";
import { run } from "./server";

const client = new tmi.Client({
  connection: { reconnect: true },
  channels: ["yoannfleurydev"],
});

client.connect().then(() => console.log("tmi connected"));

client.on("message", (channel, tags, content, self) => {
  console.log(`${tags["display-name"]}: ${content}`);

  const message: Message = {
    content,
    displayName: tags["display-name"],
  };

  messagesRepository.datastore.insert(message);
});

// Launch Server
run();
