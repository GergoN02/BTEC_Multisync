import type { IpcRendererEvent } from 'electron';
import { ipcRenderer } from 'electron';

export function getScreenId(callback: (event: IpcRendererEvent, ...args: any[]) => void) {
  ipcRenderer.on('SET_SOURCE_ID', callback);
}

export const getStream = () => {
  let videoStream: MediaStream | undefined;
  ipcRenderer.on('SET_SOURCE_ID', (event: Electron.Event, sourceId: string) => {
    try {
      const stream = (navigator.mediaDevices as any).getUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: sourceId,
            minWidth: 1280,
            maxWidth: 1280,
            minHeight: 720,
            maxHeight: 720,
          },
        },
      });
      videoStream = stream;
    } catch (e) {
      console.log(e);
    }
  });
  return videoStream;
};
