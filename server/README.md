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
| `src/database/` | Kết nối SQLite và truy cập dữ liệu | Hai người phối hợp |
| `src/logger/` | Bộ log dùng chung | Quân |
| `include/` | Khai báo API giữa các module | Theo module |
| `sql/` | Schema và dữ liệu mẫu | Hai người phối hợp |

Không thực hiện thao tác chờ kéo dài trong vòng I/O. Chế độ thi phòng và luyện tập cùng sử dụng module `exam/`.

## Quy tắc tổ chức mã nguồn

- `net/` xử lý truyền nhận và chuyển thông điệp đến router để gọi các hàm nghiệp vụ.
- `exam/` dùng chung cho thi phòng và luyện tập, tránh viết trùng phần chấm bài.
- Mỗi module có header riêng trong `include/`, chẳng hạn `rooms.h`, `exam.h`, `auth.h`; tránh dồn mọi khai báo vào một file.

## Build và chạy

Sử dụng GCC, GNU Make và shell POSIX (Linux, WSL hoặc MSYS2):

```sh
cd server
make
make run
```

`make clean` xóa thư mục `build/`. Khi thêm module C, bổ sung đường dẫn vào `SOURCES` trong `Makefile`; các file header được theo dõi tự động.
