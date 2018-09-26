const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer')
var app = express();


app.use(cors());
app.use(cors({ optionSuccessStatus: 200 }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(process.cwd() + '/public'));


app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/fileanalyse/', function (req, res) {
  const upload = multer({
    dest: 'uploads/',
    limits: {
      fileSize: 5242880 //5 MBs
    }
  }).single('upfile');

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) return res.status(422).json({ 'error': 'file size is too large' })
    return res.json({ 'name': req.file.originalname, 'type': req.file.mimetype, 'size': req.file.size })
  })
});


app.listen(process.env.PORT, function () {
  console.log(`Node.js listening on port ${process.env.PORT}`);
});

module.exports = app;
