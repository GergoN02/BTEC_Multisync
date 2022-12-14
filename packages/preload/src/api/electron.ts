import type { IpcRendererEvent } from 'electron';
import { ipcRenderer } from 'electron';

export function getScreenId(callback: (event: IpcRendererEvent, ...args: any[]) => void) {
  ipcRenderer.on('SET_SOURCE_ID', callback);
}

export async function getStream(): Promise<MediaStream | undefined> {
  try {
    const stream = navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true,
    });
    return stream;
  } catch (error) {
    console.log(error);

  }
  return undefined;
}

function handleStream(stream: MediaStream): void {
  const video = document.querySelector('video');
  video!.srcObject = stream;
  video!.onloadedmetadata = () => video!.play();
}

ipcRenderer.on('SET_SOURCE', async () => {
  try {
    const stream: MediaStream = await (navigator.mediaDevices as any).getUserMedia({
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: 'screen:0:0',
        },
      },
    });
    handleStream(stream);
  } catch (e) {
    console.log(e);

  }
});