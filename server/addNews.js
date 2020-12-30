const express = require('express')

const app = express()
app.use(express.json({limit: '50mb'}))
app.use(require('cors')())
const jwt = require('jsonwebtoken');
const { Admin } = require('./models');
app.use(express.json())
app.use('/img', express.static(__dirname + '/img'))
const mongoose = require('mongoose');
//连接数据库 mongodb://ip地址和端口号/数据库的名称（自己会创建）后面是固定写法
mongoose.connect('mongodb://localhost:27017/news-test', { useNewUrlParser: true });

//创建一个表
const SchoolNews = mongoose.model('SchoolNews', new mongoose.Schema({
  title: { type: String },
  content: { type: String },
  body: { type: String },
  imgUrl: { type: String },
  time : {type : String},
  type : {type:Array},
  count : {type:Number}
}));

//token中间件
const auth = async (req,res,next)=>{
  const token = String(req.headers.authorization || '').split(' ').pop();
  if (!token) {
    return res.status(401).send({
      message: '请先登录'
    })
  }
  const { id } = jwt.verify(token, 'abc');
  if (!token) {
    return res.status(401).send({
      message: '无效token'
    })
  }
  req.user = await Admin.findById(id);
  if (!req.user) {
    return res.status(401).send({
      message: '请先登陆'
    })
  }
  await next();
}

//新增文章
app.post('/api/schoolnews',auth, async (req, res) => {
  const article = await SchoolNews.create(req.body);
  res.send(article)
})

//文章列表
app.get('/api/newlist', async (req, res, next) => {
  const token = String(req.headers.authorization || '').split(' ').pop();
  if (!token) {
    return res.status(401).send({
      message: '请先登录'
    })
  }
  const { id } = jwt.verify(token, 'abc');
  if (!token) {
    return res.status(401).send({
      message: '无效token'
    })
  }
  req.user = await Admin.findById(id);
  if (!req.user) {
    return res.status(401).send({
      message: '用户不存在'
    })
  }
  await next();
}, async (req, res) => {
  const articel = await SchoolNews.find();
  res.send(articel)
})

//微信文章列表
app.get('/api/wx/newsList',async (req, res) => {
  const articel = await SchoolNews.find();
  res.send(articel)
})


//删除文章
app.delete('/api/schoolnews/:id',auth, async (req, res) => {
  await SchoolNews.findByIdAndDelete(req.params.id);
  res.send({
    success: true
  })
})

//更改文章
app.put('/api/schoolnews/:id',auth, async (req, res) => {
  const article = await SchoolNews.findByIdAndUpdate(req.params.id, req.body);
  res.send(article);
})

//获取文章详情页
app.get('/api/schoolnews/:id',auth, async (req, res) => {
  const article = await SchoolNews.findById(req.params.id);
  res.send(article)
})

//图片文件
const multer = require('multer');
const upload = multer({ dest: __dirname + '/img' });
app.post('/api/upload', upload.single('file'),async (req, res) => {
  const file = req.file;
  file.url = `http://localhost:4000/img/${file.filename}`
  res.send(file)
});


//注册管理员
app.post('/api/register', async (req, res) => {
  const user = await Admin.create({
    username: req.body.username,
    password: req.body.password,
  })
  res.send(user)
})

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await Admin.findOne({
    username
  }).select('+password');
  if (!user) {
    return res.status(422).send({
      message: '用户不存在'
    })
  }
  const isPasswordVaild = require('bcryptjs').compareSync(
    password,
    user.password
  )
  if (!isPasswordVaild) {
    return res.status(422).send({
      message: '密码不正确'
    })
  };
  const token = jwt.sign({
    id: String(user._id)
  }, 'abc')
  res.send({
    user,
    token
  })
})

app.get("/api/userlist", async (req, res) => {
  res.send(await Admin.find())
})

app.delete('/api/deleteUser/:id',auth, async (req, res) => {
  await Admin.findByIdAndDelete(req.params.id);
  res.send({
    success: true
  })
})

app.get("/api/userdetail/:id", async (req, res) => {
  res.send(await Admin.findById(req.params.id))
})

app.put('/api/edituser/:id',auth, async (req, res) => {
  const user = await Admin.findByIdAndUpdate(req.params.id, req.body);
  res.send(user);
})


app.listen(4000, () => {
  console.log('服务器端口4000启动成功');
})