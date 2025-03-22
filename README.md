คู่มือการ setup project

## การติดตั้งและการรันแอปพลิเคชัน

ขั้นตอนที่ 1: โคลน Repository

```bash
git clone https://github.com/PHANAGUS/safety-zone.git
```

ขั้นตอนที่ 2: ติดตั้ง Dependencies

```bash
npm install
```

ขั้นตอนที่ 3: รัน Development Server

```bash
npm run dev
```

ขั้นตอนที่ 4: เปิดโปรเจกต์ในเว็บบราวเซอร์

เมื่อเซิร์ฟเวอร์รันเสร็จแล้ว, จะเห็นข้อความใน terminal เช่น

```bash
Local: http://localhost:3000
```

เปิดเว็บบราวเซอร์แล้วไปที่ URL นี้เพื่อดูโปรเจกต์

## การปิดเซิฟเวอร์

เมื่อเสร็จสิ้นการทำงานแล้ว หากต้องการปิดเซิร์ฟเวอร์ 
    สามารถกด \texttt{Ctrl + C} จากนั้นพิมพ์ \texttt{Y} 
    แล้วกด \texttt{Enter} เพื่อยืนยันการปิดเซิร์ฟเวอร์ 
    ใน terminal ที่กำลังรันโปรเจกต์
