import React from "react";
import { useQuery } from "react-query";
import { getChannel } from "../services/Info";

export const TwicthIFrame = () => {
  const { data } = useQuery("channel", getChannel);

  return (
    <iframe
      src={`https://player.twitch.tv/?channel=${data?.channel}&parent=localhost`}
      height="100%"
      width="100%"
      allowFullScreen
    ></iframe>
  );
};
