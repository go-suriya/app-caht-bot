export enum ApiPath {
  //  Line
  LineVerify = '/oauth2/v2.1/verify',
  LineToken = '/oauth2/v2.1/token',
  ChatLoadingStart = '/chat/loading/start',
  MessageContent = '/message/${messageId}/content',

  // Slip2Go
  Slip2GoQrCode = '/qr-code',
  Slip2GoQrImage = '/qr-image',
}
