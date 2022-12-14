import { useRef } from 'react';
import { getScreenId, getStream } from '#preload';



export const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleStream = (stream: MediaStream) => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () => videoRef.current?.play();
    }
  };

  getScreenId(async (event: Event, screenId: string) => {
    console.log(screenId);
    const stream = await getStream();
    if (stream) {
      handleStream(stream);
    }
  });

  return (
    <div className="App">
      <div className='bg-blue-300'>Hello World</div>
      <video ref={videoRef}>Nada</video>
    </div>
  );

};

export default VideoPlayer;