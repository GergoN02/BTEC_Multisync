declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NGROK_ADDRESS: string;
    }
  }
}

export {};
