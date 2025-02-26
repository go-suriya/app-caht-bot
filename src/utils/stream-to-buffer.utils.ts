import { Readable } from 'node:stream';

export const streamToBuffer = async (
  readableStream: Readable,
): Promise<Buffer> => {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    readableStream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    readableStream.on('end', () => resolve(Buffer.concat(chunks)));
    readableStream.on('error', (error) => {
      console.error('Stream error:', error);
      reject(error);
    });
  });
};
