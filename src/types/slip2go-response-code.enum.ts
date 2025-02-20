export enum Slip2GoResponseSuccessCode {
  SUCCESS = '020000', // สำเร็จ
  CANNOT_VERIFY_RECEIPT = '020401', // ไม่สามารถตรวจสอบสลิปได้
  RECEIPT_NOT_FOUND = '020402', // ไม่พบสลิป
  INVALID_QR_CODE = '020404', // QR Code ไม่ถูกต้อง
  INVALID_RECIPIENT_ACCOUNT = '020405', // บัญชีผู้รับไม่ตรงในระบบ
  DUPLICATE_RECEIPT = '020406', // สลิปซ้ำ
  INCORRECT_RECEIPT_INFO = '009901', // ข้อมูลสลิปไม่ถูกต้อง
}

export enum Slip2GoResponseErrorCode {
  INVALID_FILE_TYPE = '000100', // ชนิดไฟล์ไม่ถูกต้อง
  MISSING_IMAGE_FILE = '000101', // ไม่มีไฟล์ภาพ
  FILE_TOO_LARGE = '000102', // ไฟล์มีขนาดใหญ่เกินไป
  MISSING_TOKEN = '000001', // ไม่มี Token
  INVALID_TOKEN = '000003', // Token ไม่ถูกต้อง
  INCORRECT_DATA = '000005', // ข้อมูลไม่ถูกต้อง
  ACCOUNT_SUSPENDED = '000010', // บัญชีของคุณถูกระงับ
  PACKAGE_EXPIRED = '000300', // แพ็กเกจหมดอายุ
  RECEIPT_CODE_USED = '000301', // โค้ดสำหรับสลิปถูกใช้หมดแล้ว
  INSUFFICIENT_CREDIT = '004001', // เครดิตไม่เพียงพอ
  INVALID_IP_ADDRESS = '000801', // IP Address ไม่ถูกต้อง
  BANK_SERVER_ISSUE = '020403', // เซิร์ฟเวอร์ธนาคารมีปัญหา
  SERVER_ERROR = '029999', // เซิร์ฟเวอร์มีปัญหา
}
