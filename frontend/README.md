# 📚 ระบบจัดตารางสอบ Frontend

ระบบจัดการตารางสอบอัตโนมัติด้วย AI - Frontend Application พัฒนาด้วย Vite + React + TypeScript + Bun

## 🚀 Features

- ✅ **Authentication**: ระบบ Login/Logout พร้อม Token-based authentication
- ✅ **Protected Routes**: ป้องกันการเข้าถึงหน้าที่ต้อง login
- ✅ **Role-based Access Control**: แยกสิทธิ์การใช้งานระหว่าง Admin และ User
- ✅ **File Upload**: รองรับการอัพโหลดไฟล์ CSV, XLSX, JSON
- ✅ **AI Scheduling**: สร้างตารางสอบอัตโนมัติด้วย AI
- ✅ **Real-time Notifications**: แจ้งเตือนผลการทำงาน
- ✅ **Responsive Design**: รองรับทุกขนาดหน้าจอ
- ✅ **Dashboard & Statistics**: แสดงสถิติและภาพรวมของระบบ

## 🛠️ Tech Stack

- **Runtime**: Bun
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **State Management**: Zustand
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **Icons**: Heroicons (via SVG)

## 📁 โครงสร้างโปรเจกต์

```
src/
├── components/          # React Components
│   ├── auth/           # Authentication components
│   ├── common/         # Reusable components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── FileUpload.tsx
│   ├── dashboard/      # Dashboard specific components
│   └── layout/         # Layout components
│       ├── MainLayout.tsx
│       ├── Sidebar.tsx
│       ├── Header.tsx
│       └── Notification.tsx
├── pages/              # Page components
│   ├── WelcomePage.tsx
│   ├── LoginPage.tsx
│   ├── HomePage.tsx
│   ├── DashboardPage.tsx
│   └── SchedulesPage.tsx
├── services/           # API services
│   └── api.ts
├── store/              # Zustand stores
│   ├── authStore.ts
│   └── appStore.ts
├── types/              # TypeScript types
│   └── index.ts
├── routes/             # Route configuration
│   └── index.tsx
├── App.tsx
├── main.tsx
└── index.css
```

## 📦 การติดตั้ง

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd exam-scheduling-frontend
```

### 2. ติดตั้ง Dependencies

```bash
bun install
```

### 3. ตั้งค่า Environment Variables

สร้างไฟล์ `.env` ที่ root ของโปรเจกต์:

```env
VITE_API_URL=http://localhost:3000/api
```

### 4. ติดตั้ง Tailwind CSS

```bash
bun add -D tailwindcss postcss autoprefixer
bunx tailwindcss init -p
```

### 5. รันโปรเจกต์

```bash
bun run dev
```

เปิดเบราว์เซอร์ที่ `http://localhost:5173`

## 🏗️ การ Build

```bash
bun run build
```

ไฟล์ที่ build จะอยู่ในโฟลเดอร์ `dist/`

## 📝 คำแนะนำการใช้งาน

### 1. การ Login

- เปิดหน้า `/login`
- กรอก username และ password
- ระบบจะตรวจสอบ token และ redirect ไป `/home`

### 2. การสร้างตารางสอบ

1. ไปที่หน้า **Dashboard** (`/dashboard`)
2. กรอกข้อมูลสถานศึกษา (ชื่อ, ปีการศึกษา, ภาคเรียน, วันที่สอบ)
3. อัพโหลดไฟล์ข้อมูล:
   - **รายวิชา**: รหัสวิชา, ชื่อวิชา, Section, อาจารย์, จำนวนนักศึกษา
   - **ห้องเรียน**: รหัสห้อง, ชื่อห้อง, ความจุ, อาคาร, ชั้น
   - **อาจารย์**: รหัสอาจารย์, ชื่อ-นามสกุล, แผนก
4. กดปุ่ม "สร้างตารางสอบด้วย AI"
5. รอระบบประมวลผลและสร้างตารางสอบ

### 3. การจัดการตารางสอบ

- ไปที่หน้า **ตารางสอบทั้งหมด** (`/schedules`)
- ดูรายละเอียดตารางสอบ
- อัพเดทสถานะ (แบบร่าง → ยืนยัน → เผยแพร่)
- ลบตารางสอบ (เฉพาะแบบร่าง)
- Export ตารางสอบ

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `GET /api/auth/verify` - Verify token
- `GET /api/auth/me` - Get current user

### School Info
- `POST /api/school/info` - บันทึกข้อมูลสถานศึกษา
- `GET /api/school/info` - ดึงข้อมูลสถานศึกษา

### File Upload
- `POST /api/courses/import` - Import รายวิชา
- `POST /api/rooms/import` - Import ห้องเรียน
- `POST /api/instructors/import` - Import อาจารย์

### Schedule
- `POST /api/schedule/generate` - สร้างตารางสอบ
- `GET /api/schedule` - ดึงตารางสอบทั้งหมด
- `GET /api/schedule/:id` - ดึงตารางสอบตาม ID
- `PATCH /api/schedule/:id/status` - อัพเดทสถานะ
- `DELETE /api/schedule/:id` - ลบตารางสอบ

### Dashboard
- `GET /api/dashboard/stats` - ดึงสถิติต่างๆ

## 🎨 Components หลัก

### Common Components

#### Button
```tsx
<Button variant="primary" size="lg" isLoading={false} fullWidth={false}>
  Click Me
</Button>
```

#### Input
```tsx
<Input
  label="Username"
  name="username"
  value={value}
  onChange={handleChange}
  error="Error message"
  icon={<Icon />}
/>
```

#### Card
```tsx
<Card title="Title" subtitle="Subtitle" headerAction={<Button>Action</Button>}>
  Content
</Card>
```

#### FileUpload
```tsx
<FileUpload
  onFileSelect={handleFileSelect}
  accept=".csv,.xlsx,.json"
  maxSize={5}
/>
```

### Layout Components

- **MainLayout**: Layout หลักสำหรับหน้าที่ต้อง login
- **Sidebar**: เมนูด้านข้าง
- **Header**: Header บาร์ด้านบน
- **Notification**: Toast notification

## 🔒 Security Features

- **Token-based Authentication**: ใช้ JWT token
- **Automatic Token Verification**: ตรวจสอบ token ทุกครั้งที่เริ่มแอพ
- **Protected Routes**: ป้องกันการเข้าถึงหน้าที่ต้อง login
- **Auto Logout**: Logout อัตโนมัติเมื่อ token หมดอายุ
- **Role-based Access**: จำกัดการเข้าถึงตาม role ของ user

## 📊 State Management

### Auth Store (authStore.ts)
```typescript
const { user, token, isAuthenticated, login, logout, verifyToken } = useAuthStore();
```

### App Store (appStore.ts)
```typescript
const { 
  schoolInfo, 
  schedules, 
  showNotification, 
  hideNotification 
} = useAppStore();
```

## 🎯 Pages

### 1. WelcomePage (`/`)
- หน้า landing page
- แสดง features และ benefits
- ปุ่ม login/register

### 2. LoginPage (`/login`)
- ฟอร์ม login
- แสดง error message
- Remember me option

### 3. HomePage (`/home`)
- Dashboard overview
- สถิติต่างๆ
- Quick actions
- Recent activity

### 4. DashboardPage (`/dashboard`)
- ฟอร์มกรอกข้อมูลสถานศึกษา
- Upload ไฟล์ข้อมูล
- สร้างตารางสอบ

### 5. SchedulesPage (`/schedules`)
- แสดงตารางสอบทั้งหมด
- Filter by status
- CRUD operations
- Export

## 🐛 การแก้ไข Error ที่พบบ่อย

### 1. CORS Error
```javascript
// vite.config.ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    },
  },
}
```

### 2. Token Expired
- ระบบจะ logout อัตโนมัติ
- Redirect ไป `/login`
- แสดง notification

### 3. File Upload Failed
- ตรวจสอบขนาดไฟล์ (max 5MB)
- ตรวจสอบประเภทไฟล์ (.csv, .xlsx, .json)
- ตรวจสอบ format ของข้อมูลในไฟล์

## 🚧 Features ที่กำลังพัฒนา

- [ ] Export ตารางสอบเป็น PDF
- [ ] Print ตารางสอบ
- [ ] Email notification
- [ ] Real-time collaboration
- [ ] Schedule conflict detection
- [ ] Drag & drop schedule editor
- [ ] Mobile app version
- [ ] Multiple language support

## 📚 เอกสารเพิ่มเติม

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Zustand Documentation](https://zustand-demo.pmnd.rs)
- [React Router Documentation](https://reactrouter.com)

## 👥 Contributors

- [Your Name]

## 📄 License

MIT License

## 🙏 Acknowledgments

- Backend API: [exam-scheduling-backend](https://github.com/Ikkyuz/exam-scheduling-backend.git)
- Frontend Reference: [keycake2-frontend](https://github.com/latency113/frontend_keycake2.git)

---

**Note**: โปรเจกต์นี้พัฒนาเพื่อการศึกษาและใช้งานจริงในสถานศึกษา