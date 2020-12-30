const express = require('express');
const { Admin } = require('./models');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json())

app.post('/api/register', async (req, res) => {
    const user = await Admin.create({
        username: req.body.username,
        password: req.body.password,
    })
    res.send(user)
})

app.post('/api/login', async (req, res) => {
    const user = await Admin.findOne({
        username:req.body.username
    })
    if (!user) {
        return res.status(422).send({
            message: '用户不存在'
        })
    }

    const isPasswordVaild = require('bcryptjs').compareSync(
        req.body.password,
        user.password
    )
    if (!isPasswordVaild) {
        return res.status(422).send({
            message: '密码不正确'
        })
    };
    const token = jwt.sign({
        id: String(user._id)
    },'abc')
    res.send({
        user,
        token
    })
})

//中间键写法
//这里主要是在其他接口复用，这里缺少错误抛出
const auth = async(req,res,next)=>{
    const raw = String(req.headers.authorization.split(' ').pop());
    const {id} = jwt.verify(raw,'abc');
    req.user = await User.findById(id);
    next()
}

//根据token获取用户信息
app.get('/profile',auth,async function(req,res){
   res.send(req.user)
})

app.get("/api/userlist", async (req, res) => {
    res.send(await Admin.find())
})

app.listen('4000', () => {
    console.log('服务器端口4000启动成功');
})