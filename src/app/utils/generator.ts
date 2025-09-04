
export const generateReservationNumber = (prefix: string = 'R') => {
  const now = new Date();
  
  // 날짜/시간코드 9자리
  const year = now.getFullYear().toString().slice(-2);
  const month = now.getMonth() + 1;
  const monthCode = month <= 10 ? (month - 1).toString() : String.fromCharCode(65 + month - 11);
  const day = now.getDate();
  const dayCode = day <= 10 ? (day - 1).toString() : String.fromCharCode(65 + day - 11);
  const hour = now.getHours();
  const hourCode = hour <= 9 ? hour.toString() : String.fromCharCode(65 + hour - 10);
  const minute = now.getMinutes().toString().padStart(2, '0');
  const second = now.getSeconds().toString().padStart(2, '0');
  
  // 랜덤 2자리 (0~9, A~Z)
  const randomChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const random1 = randomChars[Math.floor(Math.random() * randomChars.length)];
  const random2 = randomChars[Math.floor(Math.random() * randomChars.length)];
  const randomCode = random1 + random2;
  
  return `${prefix}${year}${monthCode}${dayCode}${hourCode}${minute}${second}${randomCode}`;
}