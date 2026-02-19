# 🍰 Cake Store - Quick Start Guide

## ✅ Bước 1: Cài đặt Dependencies

Chạy file setup:
```bash
setup.bat
```

Hoặc cài đặt thủ công:

**Backend:**
```bash
npm install cors dotenv bcryptjs jsonwebtoken
```

**Frontend:**
```bash
cd client
npm install
```

## ✅ Bước 2: Khởi động MongoDB

Đảm bảo MongoDB đang chạy trên `localhost:27017` với database tên `cakestore`

Bạn có thể kiểm tra trong MongoDB Compass.

## ✅ Bước 3: Khởi động Backend Server

**Cách 1: Dùng script**
```bash
start-backend.bat
```

**Cách 2: Dùng npm**
```bash
npm start
```

Server sẽ chạy tại: `http://localhost:3001`

## ✅ Bước 4: Tạo tài khoản Admin

**Cách 1: Dùng script Node.js**
```bash
node create-admin.js
```

**Cách 2: Dùng Postman/Thunder Client**
- Method: POST
- URL: `http://localhost:3001/users/setup-admin`
- Không cần body

**Thông tin Admin mặc định:**
- Username: `admin`
- Password: `admin123`

## ✅ Bước 5: Khởi động Frontend

Mở terminal mới:

**Cách 1: Dùng script**
```bash
start-frontend.bat
```

**Cách 2: Dùng npm**
```bash
cd client
npm run dev
```

Frontend sẽ chạy tại: `http://localhost:3000`

## 🎉 Hoàn tất!

Mở trình duyệt và truy cập: `http://localhost:3000`

## 📋 Tính năng chính

### Người dùng thường (User)
1. Đăng ký tài khoản mới
2. Đăng nhập
3. Xem danh sách sản phẩm
4. Thêm sản phẩm vào giỏ hàng
5. Xem giỏ hàng và tổng tiền

### Quản trị viên (Admin)
1. Đăng nhập với tài khoản admin
2. Truy cập Admin Dashboard
3. Thêm sản phẩm mới (CRUD - Create)
4. Sửa thông tin sản phẩm (CRUD - Update)
5. Xóa sản phẩm (CRUD - Delete)
6. Xem danh sách sản phẩm (CRUD - Read)
7. Quản lý kho hàng (stock)

## 🔐 Phân quyền

- **Admin**: Không thể thêm sản phẩm vào giỏ hàng, chỉ quản lý sản phẩm
- **User**: Không thể truy cập Admin Dashboard, chỉ mua hàng

## 🛠️ Công nghệ sử dụng

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs (mã hóa mật khẩu)

**Frontend:**
- React 18 + Vite
- React Router (điều hướng)
- Axios (gọi API)
- CSS3 (thiết kế premium)

## 📁 Cấu trúc dự án

```
Doan/
├── routes/           # API endpoints
│   ├── products.js   # CRUD sản phẩm
│   └── users.js      # Đăng ký, đăng nhập, giỏ hàng
├── schemas/          # MongoDB models
│   ├── Product.js    # Schema sản phẩm
│   └── User.js       # Schema user + cart
├── utils/
│   └── db.js         # Kết nối MongoDB
├── client/           # React frontend
│   └── src/
│       ├── components/  # Navbar, etc.
│       ├── pages/       # Home, Login, Products, Cart, Admin
│       ├── api.js       # API service
│       └── index.css    # Styles
└── app.js            # Express app
```

## ⚠️ Lưu ý

1. Backend chạy port **3001**
2. Frontend chạy port **3000**
3. MongoDB phải chạy trước khi start backend
4. Database name: **cakestore**
5. Tạo admin account trước khi sử dụng chức năng admin

## 🐛 Troubleshooting

**Lỗi: Cannot connect to MongoDB**
- Kiểm tra MongoDB đã chạy chưa
- Kiểm tra database name là `cakestore`

**Lỗi: Port already in use**
- Đóng các process đang dùng port 3000 hoặc 3001
- Hoặc đổi port trong file `.env` và `vite.config.js`

**Lỗi: Admin already exists**
- Admin đã được tạo rồi, có thể login luôn

## 📞 Hỗ trợ

Nếu gặp vấn đề, kiểm tra:
1. MongoDB đang chạy
2. Backend server đang chạy (port 3001)
3. Frontend server đang chạy (port 3000)
4. Đã cài đặt đầy đủ dependencies
