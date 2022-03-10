const path = require('path');
const express = require('express');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'upload',
  filename: (req, file, cb) => {
    cb(
      null,
      path.basename(file.originalname, path.extname(file.originalname)) +
        '_' +
        file.fieldname +
        '_' +
        Date.now() +
        path.extname(file.originalname)
    );
  }
});

const upload = multer({ storage: storage });

var app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const fileName = req.file.originalname;
  const type = req.file.mimetype;
  const size = req.file.size;

  res.json({ name: fileName, type: type, size: size });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
