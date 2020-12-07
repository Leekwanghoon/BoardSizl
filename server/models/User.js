const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlenghth: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastName: {
        type: String,
        maxlenghth: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokeExp: {
        //토큰유효기간
        type: Number
    }
})

userSchema.pre('save', function (next) {
    var user = this; 
    // console.log(this,"pre save this user"); //userInfo 객체 정보가 담겨서옴
    if(user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err);
                // console.log(hash,"this is a hashswan");
                user.password = hash; // hash암호화된것 암호화된거 들어감
                next();
            });
        }) 
    } else {
        next();
    }
})

//비밀번호 비교 메서드
userSchema.methods.comparePassword = function (plainPassword, cb) {
    console.log(plainPassword,"plainPassword");
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        console.log(isMatch,"isMatch");
        if (err) return cb(err)
        cb(null, isMatch)
    })
}

// 토큰 생성
userSchema.methods.generateToken = function (cb) {
    var user = this;
    //sign의 payload는 문자열이여야하는데 user.id의 객체를 16진수 문자열로 변환
    // user._id.toHexstring()안됨 << 아래로 대체함 user._id는 객체로 넘어옴 sign은 payload: string을 요구 !!
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    user.token = token
    user.save(function (err, user) {
        if (err) return cb(err)
        cb(null, user);
    })
}


userSchema.statics.findByToken = function(token, cb) {
    var user = this;

    jwt.verify(token,'secretToken', function(err,decoded) {
        user.findOne({"_id": decoded, "token": token}, function(err, user) {
            if(err) return cb(err);
            cb(null, user)
        })
    });
}

//schema를 model로 감싸준다
const User = mongoose.model('User',userSchema);

module.exports =  { User };