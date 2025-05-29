
declare global {
  interface Window {
    credlyEmbed?: {
      init: () => void;
    };
  }
}

export {};
