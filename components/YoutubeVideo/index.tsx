import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { io, Socket } from "socket.io-client";
import VideoIdInput from "../VideoIdInput";

const YoutubeVideo: React.FC = () => {
  const [domLoaded, setDomLoaded] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [videoId, setVideoId] = useState<string>("2x4aEnaVG_4");
  const playerRef = useRef<ReactPlayer | null>(null);
  const socketRef = useRef<Socket | null>(null);

  const onPlay = () => {
    const interval = setInterval(() => {
      setCurrentTime(playerRef.current?.getCurrentTime() || 0);
    }, 1000);
    setIntervalId(interval);
  };

  const onPause = () => {
    if (intervalId) clearInterval(intervalId);
  };

  useEffect(() => {
    setDomLoaded(true);
    socketRef.current = io("http://localhost:3333");
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (socketRef.current?.connected) {
      socketRef.current.emit("createWatchtime", {
        watchtime: 1,
        videoId,
      });
    }
  }, [currentTime]);

  return (
    <>
      {domLoaded && (
        <div>
          <VideoIdInput setVideoId={setVideoId} />
          <ReactPlayer
            ref={playerRef}
            url={`https://www.youtube.com/watch?v=${videoId}`}
            playing={true}
            controls={true}
            onPlay={onPlay}
            onPause={onPause}
            width="640px"
            height="360px"
          />
        </div>
      )}
    </>
  );
};

export default YoutubeVideo;
