const express = require('express')
const app = express()
const port = 4000;
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
const config =  require('./config/key');
const multer = require('multer');

const { auth } = require("./middleware/auth");
const { User } = require("./models/User");
const { Board } = require("./models/Board"); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/uploads', express.static('uploads'));

//mongoDB연결
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log("MongoDB Connected..."))
   .catch(err => console.log(err));

app.get('/', function (req, res) {
    res.send('fucking hell Just DO It! nodemon 성공')
})

// for test proxy
// app.get('/api/hello', (req,res) => {
//     res.send("안녕하세요~");
// })

app.post('/api/user/register', function (req, res) {
    const user = new User(req.body);
    user.save((err, userInfo) => {
         if(err) return res.json({ success: false, err })
         return res.status(200).json({
             success: true,
             userInfo
         })
    })
})

app.post('/api/user/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: 'Auth failed, email not found'
            });


        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong Password" })

            user.generateToken((err, user) => {
                if (err) res.status(400).send(err);
                res
                    //w_auth: user.token저장
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true,
                        userId: user._id,
                    })
            });
        })
    })
})

//인증 
// role 0 일반유저 1관리자
//미들웨어를 통과한것은 인증을 받았다는것
app.get('/api/user/auth', auth ,(req,res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.name,
        name: req.user.name,
        lastName: req.user.lastName,
        role: req.user.role,
        image: req.user.image
    })
})

app.get('/api/user/logout', auth, (req,res) => {
    User.findOneAndUpdate({_id: req.user._id},
    {token:""},
    (err,user) => {
        if(err) return res.json({success: false, err})
        return res.status(200).send({
            success: true,
            user
        })
    })
})

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

var upload = multer({ storage: storage }).single("file");

app.post('/api/profile/image',(req,res) => {
    upload(req,res,err => {
        if(err) {
            return res.json({
                success:false,
                err
            })
        }
        return res.json({
            success:true,
            filePath: res.req.file.path,
            fileName: res.req.file.fileName,
        })
    })
})

app.post("/api/board", (req, res) => {
    const board = new Board(req.body);

    board.save((err) => {
        if(err) return res.status(400).json({success: false, err})
        return res.status(200).json({success: true })
    });
})

app.post("/api/getBoards", (req,res) => {
    Board.find()
        .populate("writer")
        .exec((err, boardInfo) => {
            if(err) return res.status(400).json({ success, err })
            return res.status(200).json({
                success: true,
                boardInfo,
            })
        })
})

app.post("/")

app.listen(port, () => console.log(`listening on Port ${port}`))