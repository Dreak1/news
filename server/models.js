const mongoose = require('mongoose');
//连接数据库 mongodb://ip地址和端口号/数据库的名称（自己会创建）后面是固定写法
mongoose.connect('mongodb://localhost:27017/news-test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
});

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: {
        type: String,
        select: false,
        set(val) {
            //使用bcrypt加密密码
            return require('bcryptjs').hashSync(val, 10)
        }
    }
})

const Admin = mongoose.model('Admin', userSchema);

module.exports = {
    Admin
}