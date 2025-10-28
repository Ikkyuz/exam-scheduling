# 🚀 Elysia + Bun + Prisma + Database (Docker Ready)

โปรเจกต์นี้ใช้ **Elysia Framework** ทำงานบน **Bun runtime** พร้อมกับ **Prisma ORM** สำหรับเชื่อมต่อกับฐานข้อมูลทั้ง **SQL & NoSQL Database**  
รองรับการใช้งาน **Docker** และ **Docker Compose** สำหรับการพัฒนาและ Deploy ได้ทันที

---

## 📦 Getting Started

### ติดตั้ง Bun

หากยังไม่มี Bun ให้ติดตั้งด้วยคำสั่ง:

```bash
curl -fsSL https://bun.sh/install | bash
```

จากนั้นให้ ปิดและเปิด Terminal ใหม่ หรือรันคำสั่ง:

```bash
source ~/.bun/bin/bun
```

ตรวจสอบการติดตั้ง:

```bash
bun --version
```

### Development

ติดตั้ง **Dependencies**:

```bash
bun install
```

เริ่มต้นเซิร์ฟเวอร์สำหรับการพัฒนา:

```bash
bun run dev
```

จากนั้นเปิดเบราว์เซอร์ไปที่ 👉 http://localhost:3000/docs

## 🗃️ Prisma + Database Integration

โปรเจกต์นี้ใช้ **Prisma ORM** สำหรับจัดการ **Schema, Migration** และการ **Generate Type** ของฐานข้อมูล รองรับทั้ง **MySQL, PostgreSQL, MongoDB**

---

### ⚙️ การตั้งค่า Database

สร้างไฟล์ `.env` ที่ root ของโปรเจกต์ และเพิ่มค่าเชื่อมต่อฐานข้อมูล **MySQL**:

```env
DATABASE_URL="mysql://root:mysecretpassword@localhost:3306/docs"
```

หากใช้ PostgreSQL สำหรับ Docker Compose ให้ใช้รูปแบบนี้:

```env
DATABASE_URL="postgresql://<user>:<password>@<postgres uri>:5432/docs"
```

## 🛠 Prisma Commands

### Initialize Prisma

```sh
bun x prisma@latest init --datasource-provider=mysql
# หรือ
bun x prisma@latest init --datasource-provider=postgresql
```

### Generate Prisma Client Types

```sh
bun x prisma generate
```

หรือระบุ Schema เฉพาะ:

```sh
bun x prisma generate --schema=prisma/schema.mysql.prisma
bun x prisma generate --schema=prisma/schema.mongo.prisma
bun x prisma generate --schema=prisma/schema.postgres.prisma
```

### Sync Schema กับ Database

```sh
bun x prisma db push
```

### Reset Database

```sh
bun x prisma migrate reset
```

### เปิด Prisma Studio

```sh
bun x prisma studio
```

## 🐳 Docker Workflow

### Build docker image

```sh
docker build -t exam-scheduling .
```

### build docker image via docker compose

```sh
docker compose build
```

### Start app container via docker compose

```sh
docker compose up -d
```

### Start Database service

```sh
docker compose -f compose.service.yaml up -d
```

### Start Caddy service

```sh
docker compose -f compose.caddy.yaml up -d
```