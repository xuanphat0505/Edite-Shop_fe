# Edite Shop - Frontend Client

Frontend application cho ứng dụng thương mại điện tử Edite Shop, được xây dựng với React.js và các công nghệ hiện đại.

## 🚀 Công nghệ sử dụng

- **React.js** (v18.3.1) - UI Library
- **Redux Toolkit** - State management
- **React Router DOM** (v6) - Routing
- **Axios** - HTTP client
- **Material-UI (MUI)** - UI Components
- **Bootstrap & Reactstrap** - Responsive design
- **SASS/SCSS** - CSS preprocessor
- **React Icons & Lucide React** - Icon libraries
- **Swiper** - Carousel/Slider
- **AOS** - Animate On Scroll
- **React Toastify** - Notifications
- **JWT Decode** - Token handling
- **Google OAuth** - Đăng nhập với Google
- **React Image Magnify** - Product image zoom
- **React Loading Skeleton** - Loading states
- **Yet Another React Lightbox** - Image gallery

## 📋 Yêu cầu hệ thống

- Node.js >= 14.x
- npm hoặc yarn

## 🔧 Cài đặt

1. Clone repository:
```bash
git clone <repository-url>
cd client
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Tạo file `.env` trong thư mục gốc và cấu hình:
```env
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_GOOGLE_CLIENT_SECRET=your_google_client_secret
```

4. Khởi chạy development server:
```bash
npm start
```

Ứng dụng sẽ chạy tại `http://localhost:3000`

## 📁 Cấu trúc thư mục

```
client/
├── public/                   # Static files
├── src/
│   ├── assets/              # Images, data files
│   │   ├── data/           # Static data
│   │   └── images/         # Image assets
│   ├── components/          # React components
│   │   ├── Banner/         # Banner component
│   │   ├── Brands/         # Brands showcase
│   │   ├── Cart/           # Shopping cart
│   │   ├── ChangePassword/ # Change password form
│   │   ├── Collection/     # Product collections
│   │   ├── CompareBox/     # Product comparison
│   │   ├── Footer/         # Footer component
│   │   ├── Header/         # Header component
│   │   ├── LightBox/       # Image lightbox
│   │   ├── Login/          # Login form
│   │   ├── Menu/           # Navigation menu
│   │   ├── NavBar/         # Navigation bar
│   │   ├── Navigation/     # Main navigation
│   │   ├── NewProduct/     # New products section
│   │   ├── News/           # News/Blog section
│   │   ├── Products/       # Product listings
│   │   ├── QuestionForm/   # Q&A form
│   │   ├── QuickShop/      # Quick view modal
│   │   ├── Register/       # Registration form
│   │   ├── ResetPassword/  # Password reset
│   │   ├── Search/         # Search component
│   │   ├── SideBar/        # Sidebar component
│   │   └── ToolBar/        # Toolbar component
│   ├── config/              # Configuration files
│   │   ├── axiosConfig.js  # Axios setup
│   │   └── utils.js        # Utility functions
│   ├── contexts/            # React contexts
│   │   ├── AxiosContext/   # Axios context provider
│   │   └── OpenContext/    # UI state context
│   ├── GlobalStyles/        # Global styles
│   │   ├── GlobalStyles.js
│   │   └── GlobalStyles.scss
│   ├── hooks/               # Custom React hooks
│   │   └── useAxios.js     # Axios hook
│   ├── pages/               # Page components
│   │   ├── About/          # About page
│   │   ├── Blog/           # Blog listing
│   │   ├── BlogDetail/     # Blog detail page
│   │   ├── CheckOut/       # Checkout page
│   │   ├── Compare/        # Product comparison page
│   │   ├── Contact/        # Contact page
│   │   ├── ErrorPage/      # 404 page
│   │   ├── Home/           # Homepage
│   │   ├── ListOrders/     # Order history
│   │   ├── PaymentMethod/  # Payment selection
│   │   ├── PaymentStatus/  # Payment result
│   │   ├── ProductDetail/  # Product detail page
│   │   ├── Question/       # Q&A page
│   │   ├── SearchBlogResult/      # Blog search results
│   │   ├── SearchProductResult/   # Product search results
│   │   ├── Shop/           # Shop/Products page
│   │   ├── ViewCart/       # Cart page
│   │   └── WishList/       # Wishlist page
│   ├── redux/               # Redux store
│   │   ├── authSlice.js    # Authentication state
│   │   └── store.js        # Redux store config
│   ├── shared/              # Shared/Reusable components
│   │   ├── BlogBox/        # Blog card component
│   │   ├── Design/         # Design elements
│   │   ├── Form/           # Form components
│   │   ├── HeadingBox/     # Heading component
│   │   ├── Loader/         # Loading spinner
│   │   ├── Map/            # Map component
│   │   ├── ProductBox/     # Product card
│   │   ├── SkeletonCard/   # Skeleton loader
│   │   └── Toastify/       # Toast notifications
│   ├── App.js               # Main App component
│   └── index.js             # Entry point
├── .env                     # Environment variables
├── .gitignore
├── package.json
└── README.md
```

## 🎯 Tính năng chính

### 🏠 Trang chủ
- Banner slider với Swiper
- Sản phẩm mới nhất
- Sản phẩm nổi bật
- Bộ sưu tập sản phẩm
- Tin tức/Blog
- Thương hiệu đối tác

### 🛍️ Shop & Sản phẩm
- Danh sách sản phẩm với phân trang
- Lọc theo danh mục, giá, thương hiệu
- Sắp xếp sản phẩm
- Tìm kiếm sản phẩm
- Chi tiết sản phẩm với zoom ảnh
- Quick view modal
- Đánh giá & nhận xét
- Hỏi đáp về sản phẩm

### 🛒 Giỏ hàng & Thanh toán
- Thêm/xóa/cập nhật giỏ hàng
- Xem giỏ hàng
- Checkout với thông tin giao hàng
- Chọn phương thức thanh toán (VNPay, MoMo)
- Xác nhận đơn hàng
- Theo dõi trạng thái thanh toán

### 👤 Tài khoản người dùng
- Đăng ký/Đăng nhập
- Đăng nhập với Google OAuth
- Quên mật khẩu & reset
- Đổi mật khẩu
- Xem lịch sử đơn hàng
- Quản lý thông tin cá nhân

### ❤️ Wishlist & So sánh
- Thêm sản phẩm yêu thích
- So sánh sản phẩm
- Lưu trữ local với Redux Persist

### 📝 Blog & Tin tức
- Danh sách bài viết
- Chi tiết bài viết
- Tìm kiếm bài viết
- Bình luận

### 📞 Liên hệ
- Form liên hệ
- Thông tin công ty
- Bản đồ Google Maps

## 🎨 UI/UX Features

- **Responsive Design**: Tương thích mọi thiết bị
- **Animations**: AOS (Animate On Scroll)
- **Loading States**: Skeleton screens
- **Toast Notifications**: Thông báo người dùng
- **Image Zoom**: Phóng to ảnh sản phẩm
- **Lightbox Gallery**: Xem ảnh toàn màn hình
- **Smooth Scrolling**: Cuộn mượt mà
- **Modern UI**: Material-UI components

## 🔐 Authentication & Authorization

- JWT token-based authentication
- Access token & Refresh token
- Protected routes
- Google OAuth integration
- Redux Persist cho session management

## 🌐 API Integration

Client kết nối với backend API thông qua Axios:
- Base URL configuration
- Request/Response interceptors
- Token refresh mechanism
- Error handling

## 📦 State Management

Sử dụng Redux Toolkit với các slices:
- **authSlice**: Quản lý authentication state
- Redux Persist: Lưu trữ state vào localStorage

## 🎭 Context API

- **AxiosContext**: Cung cấp axios instance
- **OpenContext**: Quản lý UI state (modals, sidebars)

## 📱 Responsive Breakpoints

- Mobile: < 576px
- Tablet: 576px - 992px
- Desktop: > 992px

## 🚀 Scripts

```bash
# Development server
npm start

# Build production
npm run build

# Run tests
npm test

# Eject (không khuyến khích)
npm run eject
```

## 🌍 Deployment

Ứng dụng đang được deploy tại: `https://edite-shop-0505.netlify.app/`

### Deploy lên Netlify:
1. Build project: `npm run build`
2. Kết nối repository với Netlify
3. Cấu hình build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
4. Thêm environment variables
5. Deploy

### Environment Variables trên Netlify:
```
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## 🔧 Configuration

### Axios Config (`src/config/axiosConfig.js`)
- Base URL setup
- Request interceptors
- Response interceptors
- Token management

### Utils (`src/config/utils.js`)
- Helper functions
- Format utilities
- Validation functions

## 🎨 Styling

- **SASS/SCSS**: CSS preprocessor
- **Bootstrap**: Grid system & utilities
- **Material-UI**: Component library
- **Global Styles**: Shared styles
- **Component-scoped styles**: Module CSS

## 📚 Libraries & Packages

### UI Components
- Material-UI (@mui/material)
- Bootstrap & Reactstrap
- React Icons & Lucide React

### Functionality
- React Router DOM (routing)
- Redux Toolkit (state management)
- Axios (HTTP requests)
- JWT Decode (token handling)

### Enhancements
- Swiper (carousels)
- AOS (scroll animations)
- React Toastify (notifications)
- React Image Magnify (zoom)
- React Loading Skeleton (loading states)
- Yet Another React Lightbox (galleries)

## 🐛 Troubleshooting

### Port đã được sử dụng
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Hoặc thay đổi port
set PORT=3001 && npm start
```

### Clear cache
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 🤝 Contributing

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📄 License

Private

## 👥 Author

Phát Trần - phattran052004@gmail.com

## 🔗 Links

- Frontend: https://edite-shop-0505.netlify.app/
- Backend API: https://edite-shop-be.onrender.com
- Repository: [GitHub URL]

## 📝 Notes

- Đảm bảo backend server đang chạy khi develop
- Cấu hình CORS trên backend cho frontend URL
- Sử dụng environment variables cho sensitive data
- Không commit file `.env` lên repository
