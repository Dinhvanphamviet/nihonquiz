# NihonQuiz

Ứng dụng thi trắc nghiệm tiếng Nhật trực tuyến theo mô hình Client–Server, được thực hiện trong môn **Thực hành lập trình mạng**.

## Chức năng chính

- Đăng ký, đăng nhập và quản lý tài khoản.
- Tạo phòng thi, xem danh sách phòng và tham gia phòng chờ.
- Bắt đầu và kết thúc bài thi theo quyền chủ phòng.
- Làm bài, thay đổi đáp án và nộp bài trước khi hết giờ.
- Tự động kết thúc và chấm bài khi hết thời gian.
- Luyện tập cá nhân theo số câu hỏi và thời gian được thiết lập.
- Chọn câu hỏi theo chủ đề và độ khó.
- Xem kết quả, lịch sử làm bài và biểu đồ thống kê.

## Công nghệ

| Thành phần | Công nghệ |
| --- | --- |
| Server | C, TCP socket không chặn, `select()` |
| Client desktop | Electron, TypeScript, Vite |
| Giao diện | React, Tailwind CSS, shadcn/ui |
| Biểu đồ | Chart.js |
| Cơ sở dữ liệu | SQLite |
| Giao tiếp | TCP, thông điệp JSON có tiền tố độ dài |

Server sử dụng `select()` trên một luồng để xử lý đồng thời nhiều kết nối. Phía client, Electron Main quản lý kết nối TCP bằng Node.js và trao đổi với giao diện thông qua Preload và IPC.

## Cấu trúc dự án

```text
nihonquiz/
├── client/             # Ứng dụng Electron và giao diện
│   └── src/
│       ├── main/       # Kết nối TCP, codec và IPC
│       ├── preload/    # Cầu nối giữa Main và giao diện
│       ├── renderer/   # Giao diện React chia theo chức năng
│       └── shared/     # Kiểu dữ liệu dùng chung
├── server/             # Server C
│   ├── include/        # Khai báo API giữa các module
│   ├── src/            # Mã nguồn xử lý mạng và nghiệp vụ
│   └── sql/            # Schema và dữ liệu mẫu
├── docs/               # Tài liệu thiết kế, phân công và báo cáo
└── tools/
    └── load-test/      # Công cụ kiểm thử nhiều client đồng thời
```

## Cài đặt và chạy

### Yêu cầu môi trường

- Server: GCC, GNU Make và shell POSIX (Linux, WSL hoặc MSYS2).
- Client: Node.js 22.12 trở lên (khuyến nghị bản LTS) và npm.
- Khi chạy trên nhiều máy, các máy cần cùng mạng LAN và kết nối được đến máy server.

### Lấy mã nguồn

```sh
git clone https://github.com/Dinhvanphamviet/nihonquiz.git
cd nihonquiz
```

### Chạy server

Từ thư mục gốc, mở terminal và chạy:

```sh
cd server
make
make run
```

`make` biên dịch chương trình vào `server/build/`; `make run` chạy chương trình. Dùng `make clean` để xóa các file build.

Entry point hiện tại in `NihonQuiz server scaffold` rồi thoát; vòng lặp TCP sẽ được nối vào entry point khi triển khai phần mạng.

### Chạy client desktop

Mở terminal thứ hai tại thư mục gốc của repo và chạy:

```sh
cd client
npm install
npm run dev
```

`npm run dev` mở cửa sổ desktop Electron và chạy giao diện React qua Vite. Dùng `npm run build` để kiểm tra TypeScript và build client; `npm start` để mở bản đã build. Các lệnh này chạy trong thư mục `client/`. Build tạo mã chạy trong `client/out/`, không tạo bộ cài đặt.

### Kết nối qua mạng LAN

Khi triển khai kết nối TCP, chạy server trước, sau đó mở client trên các máy trong lớp. Cấu hình client dùng IP LAN và cổng của máy server; nếu chạy cùng máy có thể dùng `127.0.0.1`. Cho phép cổng TCP của server qua firewall và bảo đảm Wi-Fi cho phép các thiết bị liên lạc với nhau.

## CI

GitHub Actions tự động kiểm tra khi push lên mọi nhánh hoặc mở/cập nhật Pull Request vào `main`:

- **Client (Windows):** cài dependency bằng `npm ci`, chạy ESLint, kiểm tra TypeScript và build Electron.
- **Server (Ubuntu):** biên dịch bằng GCC với `-Wall -Wextra -Werror`; cảnh báo biên dịch cũng làm CI thất bại.

Kiểm tra client trước khi push, từ thư mục `client/`:

```sh
npm run lint
npm run build
```

Dùng `npm run lint:fix` để sửa các lỗi ESLint có thể tự động xử lý. Prettier chỉ dùng thủ công cho từng file, ví dụ `npm run format -- src/renderer/app/App.tsx`; không format hàng loạt hoặc bắt buộc định dạng lại code cũ trong CI.

Workflow nằm tại [`.github/workflows/ci.yml`](.github/workflows/ci.yml). Xem kết quả trong tab **Actions** hoặc phần checks của PR. CI chỉ kiểm tra, không phát hành ứng dụng.

## Tài liệu

- [Phân công nhiệm vụ](docs/PhanCongNhiemVu.md)
- [Đặc tả giao thức Client–Server](docs/protocol.md)
- [Thiết kế cơ sở dữ liệu](docs/database.md)
- [Cấu trúc server](server/README.md)
- [Cấu trúc client](client/README.md)

## Thành viên

| Họ và tên | MSSV |
| --- | --- |
| Nguyễn Minh Quân | 20235815 |
| Đinh Văn Phạm Việt | 20235870 |

