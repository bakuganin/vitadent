import { useState } from "react";

const IMPLANT_WIDTH = 760;
const IMPLANT_HEIGHT = 898;

export default function ScrollVideoPlayer() {
  const [ready, setReady] = useState(false);

  return (
    <div className="implant-video-wrap" aria-hidden="true">
      {!ready && <div className="implant-loader" />}
      <video
        className={`implant-canvas ${ready ? "is-ready" : ""}`}
        width={IMPLANT_WIDTH}
        height={IMPLANT_HEIGHT}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setReady(true)}
        style={{ aspectRatio: `${IMPLANT_WIDTH} / ${IMPLANT_HEIGHT}` }}
      >
        <source src="/implant-anim.webm" type="video/webm" />
      </video>
      <div className="implant-shadow" />
    </div>
  );
}
