declare module "ffmpeg.js/ffmpeg-mp4.js" {
  const ffmpeg: (options: {
    MEMFS: Array<{ name: string; data: Uint8Array }>;
    arguments: string[];
    print?: (data: any) => void;
    printErr?: (data: any) => void;
  }) => {
    MEMFS: Array<{ name: string; data: Uint8Array }>;
  };
  export default ffmpeg;
}
