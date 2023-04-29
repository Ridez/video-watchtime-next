import React from "react";
import styles from "./VideoIdInput.module.scss";

type VideoIdInputProps = {
  setVideoId: (videoId: string) => void;
};

const VideoIdInput: React.FC<VideoIdInputProps> = (props) => {
  const { setVideoId } = props;

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVideoId(event.target.value);
  };

  return (
    <input
      onChange={handleOnChange}
      className={styles.input}
      placeholder="Paste YouTube video ID..."
    />
  );
};

export default VideoIdInput;
