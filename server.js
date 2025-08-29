const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Kết nối với MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Kết nối tới MongoDB thành công!'))
  .catch(err => {
    console.error('Lỗi kết nối với MongoDB:', err);
    process.exit(1); // Dừng ứng dụng nếu không thể kết nối
  });

// Middleware xử lý lỗi
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Đã xảy ra lỗi');
});

app.listen(port, () => {
  console.log(`Server đang chạy trên cổng: ${port}`);
});