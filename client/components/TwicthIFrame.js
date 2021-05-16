import { AspectRatio } from "@chakra-ui/react";
import React from "react";
import { useQuery } from "react-query";
import { getChannel } from "../services/Info";

export const TwicthIFrame = () => {
  const { data } = useQuery("channel", getChannel);

  return (
    <AspectRatio ratio={16 / 9}>
      <iframe
        src={`https://player.twitch.tv/?channel=${data?.channel}&parent=localhost`}
        height="100%"
        width="100%"
        allowFullScreen
      />
    </AspectRatio>
  );
};
