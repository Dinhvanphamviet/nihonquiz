# NihonQuiz Desktop

Ứng dụng desktop sử dụng Electron, React, TypeScript, Vite, Tailwind CSS và shadcn/ui. Việt phụ trách phần client.

## Cài đặt và chạy

Yêu cầu Node.js 22.12 trở lên và npm. Chạy từ thư mục `client/`:

```sh
npm install
npm run dev
```

| Lệnh                | Chức năng                                         |
| ------------------- | ------------------------------------------------- |
| `npm run dev`       | Mở ứng dụng Electron với Vite và hot reload       |
| `npm run typecheck` | Kiểm tra TypeScript của Main, Preload và Renderer |
| `npm run build`     | Kiểm tra kiểu và build vào `out/`                 |
| `npm start`         | Mở bản đã build                                   |

## Kiểm tra code

```sh
npm run lint
npm run format:check
npm run build
```

- `npm run lint`: kiểm tra TypeScript/React bằng ESLint; cảnh báo cũng làm lệnh thất bại.
- `npm run lint:fix`: tự sửa các lỗi ESLint có thể xử lý.
- `npm run format:check`: kiểm tra định dạng bằng Prettier.
- `npm run format`: định dạng mã nguồn, cấu hình và README của client.

CI chạy các bước kiểm tra trên khi push hoặc tạo PR vào `main`. Dùng LF cho xuống dòng để thống nhất giữa Windows và Linux. Component shadcn/ui vẫn được lint; riêng quy tắc Fast Refresh cho phép chúng xuất thêm variants và hooks.

## Cấu trúc thư mục

```text
src/
├── main/
│   ├── network/            # TCP client, codec, ghép request/response
│   └── ipc/                # Xử lý yêu cầu từ giao diện
├── preload/                # Cung cấp API cho Renderer
├── renderer/
│   ├── app/                # Khởi tạo React, router và providers
│   ├── features/
│   │   ├── auth/           # Đăng ký, đăng nhập
│   │   ├── account/        # Thông tin tài khoản
│   │   ├── rooms/          # Danh sách, tạo phòng, phòng chờ
│   │   ├── exam/           # Làm bài dùng chung cho hai chế độ
│   │   ├── practice/       # Thiết lập luyện tập
│   │   ├── results/        # Kết quả cá nhân và phòng thi
│   │   ├── history/        # Lịch sử và biểu đồ Chart.js
│   │   └── questions/      # Ngân hàng câu hỏi
│   ├── components/
│   │   ├── ui/             # Component shadcn/ui
│   │   └── layout/         # Sidebar, header, bố cục
│   ├── hooks/              # React hooks dùng chung
│   ├── lib/                # Hàm tiện ích
│   ├── styles/             # CSS toàn cục và Tailwind
│   └── assets/             # Ảnh, biểu tượng, tài nguyên
└── shared/                 # Kiểu dữ liệu và tên kênh IPC
```

## Phân chia trách nhiệm

| Phần     | Trách nhiệm                                                                     |
| -------- | ------------------------------------------------------------------------------- |
| Main     | Quản lý cửa sổ Electron, kết nối TCP, gửi request, nhận phản hồi và sự kiện     |
| Preload  | Cung cấp API cụ thể cho giao diện qua `contextBridge`                           |
| Renderer | Hiển thị giao diện, nhận thao tác và cập nhật trạng thái màn hình               |
| Shared   | Kiểu dữ liệu giao thức, mô hình dữ liệu và tên kênh IPC dùng chung trong client |

Luồng giao tiếp:

```text
React → Preload API → IPC → Electron Main → TCP → Server C
```

Renderer gọi các API như `login()`, `createRoom()` và `submitExam()`. TCP được quản lý tại Main. Preload chỉ cung cấp các thao tác cần thiết; giữ `contextIsolation` bật và `nodeIntegration` tắt cho Renderer.

Server C quản lý phiên, kiểm tra quyền, thời hạn làm bài và chấm điểm. Trạng thái đăng nhập phía giao diện chỉ phục vụ hiển thị.

## Quy ước tổ chức mã nguồn

Các file được đặt theo trách nhiệm:

| Vị trí          | File                                                                                     |
| --------------- | ---------------------------------------------------------------------------------------- |
| `main/`         | `index.ts`, `config.ts`                                                                  |
| `main/network/` | `tcp-client.ts`, `codec.ts`, `request.ts`                                                |
| `main/ipc/`     | `handlers.ts`                                                                            |
| `preload/`      | `index.ts`                                                                               |
| `renderer/`     | `main.tsx`                                                                               |
| `renderer/app/` | `App.tsx`, `router.tsx`, `providers.tsx`                                                 |
| `shared/`       | `channels.ts`, `desktop.ts`; bổ sung `protocol.ts`, `models.ts` khi triển khai nghiệp vụ |

Mỗi chức năng gom các trang, component, API và hooks liên quan vào cùng thư mục. Ví dụ:

```text
features/rooms/
├── pages/
├── components/
├── rooms.api.ts
└── rooms.hooks.ts
```

- `pages/` chứa các màn hình của chức năng.
- `components/` chứa các thành phần chỉ phục vụ chức năng đó.
- `*.api.ts` gọi API qua Preload.
- `*.hooks.ts` xử lý trạng thái và đăng ký sự kiện; hủy đăng ký khi rời màn hình.
- Component dùng chung giữa nhiều chức năng đặt trong `renderer/components/`.
- Thi phòng và luyện tập cùng sử dụng giao diện làm bài trong `features/exam/`.
- Chỉ đưa kiểu dữ liệu cần dùng ở nhiều phần client vào `shared/`.
