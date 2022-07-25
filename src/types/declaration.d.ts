declare module '*.jpg';
declare module '*.png';

declare let io : {
  connect(url: string): Socket;
};
export interface Socket {
  on(event: string, callback: (data: any) => void);
  emit(event: string, data: any);
}
