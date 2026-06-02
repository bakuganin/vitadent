import { useEffect, useRef, useState } from "react";

const IMPLANT_WIDTH = 1520;
const IMPLANT_HEIGHT = 1796;

type ScrollVideoPlayerProps = {
  className?: string;
};

export default function ScrollVideoPlayer({ className = "" }: ScrollVideoPlayerProps) {
  const [ready, setReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play();
          return;
        }

        video.pause();
      },
      { rootMargin: "220px 0px" },
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`implant-video-wrap ${className}`.trim()} aria-hidden="true">
      {!ready && <div className="implant-loader" />}
      <img className="implant-mobile-fallback" src="/implant-fallback.png" alt="" loading="eager" />
      <video
        ref={videoRef}
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
        <source src="/implant-anim.webm?v=clean-20260601" type="video/webm" />
      </video>
      <div className="implant-shadow" />
    </div>
  );
}
