# Kiểm thử 50 client đồng thời

Mục tiêu: kiểm chứng server phục vụ 50 client cùng kết nối và làm bài qua TCP.

## Kịch bản

1. Tạo 50 kết nối client đến server.
2. Đăng nhập bằng 50 tài khoản và tham gia phòng thi.
3. Bắt đầu thi, kiểm tra cả 50 client nhận được đề.
4. Cho các client gửi cập nhật đáp án trong cùng khoảng thời gian.
5. Nộp bài và kiểm tra cả 50 client nhận được kết quả.

## Kết quả cần ghi nhận

- Số client kết nối, tham gia thi và nhận kết quả thành công.
- Số yêu cầu lỗi hoặc không nhận được phản hồi.
- Thời gian phản hồi khi 50 client cùng hoạt động.
- Server tiếp tục hoạt động ổn định trong suốt lượt thi.
