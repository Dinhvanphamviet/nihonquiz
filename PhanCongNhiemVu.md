# Phân công nhiệm vụ bài tập lớn – Nhóm 3

**Đề tài:** Xây dựng ứng dụng thi trắc nghiệm tiếng Nhật trực tuyến (NihonQuiz).

## Thành viên

| Họ và tên | MSSV |
| --- | --- |
| Nguyễn Minh Quân | 20235815 |
| Đinh Văn Phạm Việt | 20235870 |

## Các tính năng chính

| STT | Tên tính năng | Điểm | Người thực hiện | Mô tả tính năng |
| --- | --- | --- | --- | --- |
| 1 | Xử lý truyền dòng | 1 | Đinh Văn Phạm Việt | Truyền dữ liệu qua TCP giữa server C và các client trong cùng mạng LAN (qua Wi-Fi), dự kiến hỗ trợ tối đa 50 người dùng đồng thời, mỗi client duy trì một kết nối TCP đến server. Việt xây dựng bộ đóng gói/tách thông điệp bằng C phía server và Node.js phía client: dùng tiền tố độ dài để xác định ranh giới thông điệp, bộ đệm xử lý dữ liệu nhận thiếu hoặc nhiều thông điệp dính nhau và kiểm tra kích thước. Quân tích hợp codec vào vòng I/O server. |
| 2 | Cài đặt cơ chế vào/ra socket trên server | 2 | Nguyễn Minh Quân | Quân xây dựng server C xử lý đồng thời nhiều kết nối bằng socket không chặn và select() trên một luồng, dự kiến phục vụ tối đa 50 client: accept/recv/send, quản lý kết nối, hàng đợi gửi, xử lý gửi thiếu, EOF và ngắt kết nối. Phối hợp với Việt thiết kế giao thức Client–Server: thông điệp JSON có tiền tố độ dài, quy định cấu trúc request/response/sự kiện, mã yêu cầu để ghép phản hồi và mã lỗi. Tích hợp bộ đóng gói/tách thông điệp của Việt và phân phối request đến các hàm xử lý. |
| 3 | Đăng ký và quản lý tài khoản | 2 | Đinh Văn Phạm Việt | Đăng ký, kiểm tra dữ liệu và tên tài khoản trùng; lưu mật khẩu đã băm kèm salt; xem/cập nhật thông tin tài khoản. Làm giao diện, request TCP và nghiệp vụ server C. |
| 4 | Đăng nhập và quản lý phiên | 2 | Đinh Văn Phạm Việt | Xác thực tài khoản, đăng nhập/đăng xuất; gắn phiên với kết nối, quản lý trạng thái và thu hồi phiên khi đăng xuất hoặc mất kết nối. |
| 5 | Kiểm soát quyền truy cập | 1 | Đinh Văn Phạm Việt | Việt xây dựng kiểm tra phiên và quyền dùng chung: tài khoản, chủ phòng/thành viên, bài làm cá nhân; từ chối yêu cầu trái quyền. Quân gọi hàm kiểm tra tại các thao tác phòng thi. |
| 6 | Tham gia chế độ luyện tập | 1 | Đinh Văn Phạm Việt | Việt triển khai START_PRACTICE trên server C: cấu hình số câu/thời gian, tạo lượt cá nhân và chọn đề. Tích hợp hàm cập nhật đáp án, hoàn tất/chấm của Quân; trả kết quả và lưu lượt luyện tập. |
| 7 | Tạo phòng thi | 2 | Nguyễn Minh Quân | Quân xử lý CREATE_ROOM trên server C: cấp mã phòng, gán chủ phòng, thiết lập số câu/thời gian/chủ đề/độ khó. Gọi hàm kiểm tra cấu hình và chọn đề của Việt; trả thông tin phòng cho giao diện. |
| 8 | Xem danh sách phòng thi | 1 | Nguyễn Minh Quân | Quân xây dựng LIST_ROOMS: trả danh sách phòng và trạng thái chưa bắt đầu/đang diễn ra/đã kết thúc, chủ phòng, số câu, thời gian và số thành viên. Việt hiển thị dữ liệu qua phần UI được giao. |
| 9 | Tham gia vào phòng thi | 2 | Nguyễn Minh Quân | Nhận yêu cầu vào phòng, kiểm tra đăng nhập và trạng thái chưa bắt đầu; thêm thành viên, chống tham gia trùng và cập nhật danh sách thành viên phòng chờ. |
| 10 | Bắt đầu bài thi | 1 | Nguyễn Minh Quân | Quân xử lý bắt đầu/kết thúc phòng: kiểm tra quyền chủ phòng, gọi hàm chọn đề của Việt, xác định hạn nộp và phát câu hỏi đến thành viên. Xử lý kết thúc theo yêu cầu hoặc khi hết giờ. |
| 11 | Thay đổi phương án trả lời trước đó | 1 | Nguyễn Minh Quân | Quân xây dựng xử lý cập nhật/đổi đáp án dùng chung cho thi phòng và luyện tập. Kiểm tra mã câu, lựa chọn, quyền sở hữu, thời gian và bài chưa nộp; lưu lựa chọn mới và xác nhận về client. |
| 12 | Nộp bài và chấm điểm | 2 | Nguyễn Minh Quân | Quân xây dựng nộp/chấm dùng chung: nộp sớm hoặc tự hoàn tất khi hết giờ/kết thúc; khóa và chấm mỗi bài một lần, thông báo số câu đúng. Việt tích hợp vào luyện tập và nhận dữ liệu để lưu lịch sử. |
| 13 | Xem kết quả thi của các phòng thi | 1 | Nguyễn Minh Quân | Quân xây dựng truy vấn kết quả phòng đã kết thúc, kiểm tra quyền và trả người thi, số câu đúng/tổng số câu, kết quả. Việt hiển thị dữ liệu bằng màn hình kết quả trong phần UI được giao. |
| 14 | Ghi log hoạt động | 1 | Nguyễn Minh Quân | Quân xây dựng bộ ghi log dùng chung: thời gian, tài khoản/kết nối, loại thao tác, phòng/lượt thi, kết quả và lỗi. Hai người gọi bộ log trong chức năng riêng; không ghi mật khẩu hoặc dữ liệu xác thực nhạy cảm. |
| 15 | Phân loại câu hỏi theo độ khó, chủ đề | 1 | Đinh Văn Phạm Việt | Quản lý câu hỏi tiếng Nhật, gắn chủ đề và mức dễ/trung bình/khó; chọn đề theo cấu hình, kiểm tra đủ câu, chọn ngẫu nhiên không trùng. Tính mức tối thiểu 1 điểm trong thang 1–3. |
| 16 | Lưu trữ thông tin bài thi + đồ thị | 2 | Đinh Văn Phạm Việt | Lưu đề, đáp án, thời gian và kết quả của cả hai chế độ; tra cứu lịch sử theo người dùng, hiển thị đồ thị. Quân cung cấp dữ liệu bài thi phòng sau khi chấm. |
| 17 | Giao diện đồ họa | 3 | Đinh Văn Phạm Việt | Việt phụ trách toàn bộ UI Electron + TypeScript, HTML, Tailwind CSS: tài khoản, câu hỏi, danh sách/phòng chờ, thi, luyện tập, kết quả, lịch sử và Chart.js. Viết TCP client/IPC và kết nối UI với các API server. |
| | **Tổng điểm phân công dự kiến** | **26** | | Quân: 13 điểm; Việt: 13 điểm. Mục câu hỏi tính 1 điểm; chưa phân công chức năng nâng cao. |


