import React, { useRef, useEffect } from "react";

export default function VideoPlayer({ user }) {
  const ref = useRef();
  useEffect(() => {
    user.videoTrack.play(ref.current);
  }, []);

  return (
    <div>
      Uid:{user.uid}
      <div ref={ref} style={{ width: "200px", height: "200px" }}></div>
    </div>
  );
}
