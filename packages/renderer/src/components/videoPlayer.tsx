import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { getStream } from '../../../preload/src/api/electron';



export const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const socket = io('');

  const rtcPeerConnection = useRef(new RTCPeerConnection({
    'iceServers': [
      { 'urls': 'stun:stun.services.mozilla.com' },
      { 'urls': 'stun:stun.l,google.com:19302' },
    ],
  }));

  useEffect(() => {

    getStream() ? handleStream(getStream()!) : undefined;

    socket.on('offer', offerSDP => {
      rtcPeerConnection.current.setRemoteDescription(
        new RTCSessionDescription(offerSDP),
      ).then(() => {
        rtcPeerConnection.current.createAnswer().then(sdp => {
          rtcPeerConnection.current.setLocalDescription(sdp);
        });
      });
    });

    socket.on('answer', answerSDP => {
      rtcPeerConnection.current.setRemoteDescription(
        new RTCSessionDescription(answerSDP),
      );
    });

    socket.on('icecandidate', icecandidate => {
      rtcPeerConnection.current.addIceCandidate(
        new RTCIceCandidate(icecandidate),
      );
    });

    rtcPeerConnection.current.onicecandidate = (event) => {
      if (event.candidate)
        socket.emit('icecandidate', event.candidate);
    };

    rtcPeerConnection.current.oniceconnectionstatechange = (event) => {
      console.log(event);
    };

    rtcPeerConnection.current.ontrack = (event) => {
      videoRef.current!.srcObject = event.streams[0];
      videoRef.current!.onloadedmetadata = () => videoRef.current!.play();
    };

  }, []);

  const handleStream = (stream: MediaStream) => {
    console.log(stream.id);

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () => videoRef.current!.play();
    }

    rtcPeerConnection.current.addTrack(stream.getTracks()[0]);
  };

  // const getUserMedia = async (constraints: MediaStreamConstraints) => {
  //   try {
  //     await navigator.mediaDevices.getUserMedia(constraints)
  //     rtcPeerConnection.current.createOffer({
  //       offerToReceiveVideo: true
  //     }).then(sdp => {
  //       rtcPeerConnection.current.setLocalDescription(sdp)
  //       socket.emit('offer', sdp);
  //     })
  //   } catch (error) {
  //     console.log(error);

  //   }
  // }

  return (
    <div className="App">
      <div className=''>Hello World</div>
      <video ref={videoRef}>Nada</video>
    </div>
  );

};

export default VideoPlayer;