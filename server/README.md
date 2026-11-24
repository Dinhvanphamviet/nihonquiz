# Server C

Server C sử dụng TCP socket không chặn và `select()` để xử lý đồng thời nhiều kết nối.

| Đường dẫn | Trách nhiệm | Phụ trách |
| --- | --- | --- |
| `src/main.c` | Khởi tạo, chạy và dừng server | Quân |
| `src/net/` | Socket, vòng select, kết nối, hàng đợi gửi | Quân |
| `src/protocol/` | Codec TCP có tiền tố độ dài | Việt |
| `src/router.c` | Phân phối request | Quân phối hợp Việt |
| `src/auth/` | Tài khoản, phiên, kiểm tra quyền | Việt |
| `src/questions/` | Ngân hàng câu hỏi và chọn đề | Việt |
| `src/rooms/` | Quản lý phòng và vòng đời phòng | Quân |
| `src/exam/` | Đáp án, hạn nộp, hoàn tất và chấm bài dùng chung | Quân |
| `src/practice/` | Luyện tập, gọi lại module exam | Việt |
| `src/history/` | Lưu và truy vấn lịch sử | Việt |
| `src/database/` | Kết nối SQLite, khởi tạo database và tiện ích dùng chung | Hai người phối hợp |
| `src/logger/` | Bộ log dùng chung | Quân |
| `include/` | Khai báo API giữa các module | Theo module |
| `sql/` | Schema và dữ liệu mẫu | Hai người phối hợp |

Không thực hiện thao tác chờ kéo dài trong vòng I/O. Chế độ thi phòng và luyện tập cùng sử dụng module `exam/`.

## Quy tắc tổ chức mã nguồn

- `net/` xử lý truyền nhận và chuyển thông điệp đến router để gọi các hàm nghiệp vụ.
- `exam/` dùng chung cho thi phòng và luyện tập, tránh viết trùng phần chấm bài.
- Mỗi module có header riêng trong `include/`, chẳng hạn `rooms.h`, `exam.h`, `auth.h`; tránh dồn mọi khai báo vào một file.

## Phân chia trách nhiệm trong module

Các module được chia theo chức năng như `auth/`, `rooms/`, `questions/`. Bên trong mỗi module, tách phần giao tiếp, nghiệp vụ và truy vấn dữ liệu khi cần:

| Thành phần | Trách nhiệm |
| --- | --- |
| `*_handler.c` | Đọc và kiểm tra kiểu tham số request, gọi service, chuyển kết quả thành response |
| `*_service.c` | Xử lý nghiệp vụ, kiểm tra phiên/quyền và điều kiện thực hiện; gọi repository khi cần lưu hoặc lấy dữ liệu |
| `*_repository.c` | Thực hiện truy vấn SQLite bằng tham số, đọc kết quả và trả dữ liệu hoặc lỗi cho service |

Ví dụ tổ chức module tài khoản:

```text
src/auth/
├── auth_handler.c       # Nhận yêu cầu đăng ký, đăng nhập, đăng xuất
├── auth_service.c       # Xử lý nghiệp vụ tài khoản
├── auth_repository.c    # Truy vấn dữ liệu tài khoản
└── session.c            # Quản lý phiên gắn với kết nối TCP
```

Các header tương ứng đặt trong `include/`. Đây là quy ước khi triển khai; module nhỏ có thể bắt đầu với ít file và tách thêm khi cần.

Luồng xử lý thông thường:

```text
net → protocol → router → handler → service → repository → SQLite
```

Kết quả được trả ngược về handler để tạo response, sau đó đi qua protocol và hàng đợi gửi của net. Thao tác chỉ dùng trạng thái trong bộ nhớ không cần đi qua repository.

- Router chỉ chọn handler theo loại request; không chứa nghiệp vụ hoặc câu SQL.
- Handler không truy vấn SQLite trực tiếp; service không trực tiếp đọc/ghi socket hay phụ thuộc vào JSON.
- Repository trả dữ liệu hoặc mã lỗi, không tự gửi response và không quyết định quyền truy cập.
- `database/` cung cấp kết nối, khởi tạo và tiện ích SQLite dùng chung; truy vấn theo chức năng đặt trong repository của module đó.
- Module luyện tập gọi lại service làm bài trong `exam/`, không viết lại phần cập nhật đáp án và chấm điểm.

## Build và chạy

Sử dụng GCC, GNU Make và shell POSIX (Linux, WSL hoặc MSYS2):

```sh
cd server
make
make run
```

`make clean` xóa thư mục `build/`. Khi thêm module C, bổ sung đường dẫn vào `SOURCES` trong `Makefile`; các file header được theo dõi tự động.
