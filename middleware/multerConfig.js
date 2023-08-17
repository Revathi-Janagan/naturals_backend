const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}--${file.originalname}`;
    cb(null, uniqueName);
  },
});

const fileFilter = function (req, file, cb) {
  const allowedFileTypes = /jpeg|jpg|png|gif|svg/;
  const extName = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeType = allowedFileTypes.test(file.mimetype);

  if (mimeType && extName) {
    cb(null, true);
  } else {
    cb("Error: You can only upload images!");
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: fileFilter,
});

module.exports = upload;
