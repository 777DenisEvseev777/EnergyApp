const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = "SECRET";

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Немає авторизації" });
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.userId = decoded.userId;
      next();
    } catch (error) {
      res.status(403).json({ message: "Невірний токен" });
    }
};

const createUser = async(req, res) => {
    try {
        const { login, phone, password, passwordConfirm, role } = req.body;

        if (login === '' || phone ==='' || password==='' || passwordConfirm === ''){
            return res.status(400).json({ message: 'Усі поля повинні бути заповнені' });
        }

        const user = await User.findOne({login});
        
        if (user){
            return res.status(400).json({message: 'Користувач уже існує'});
        }

        if (password.length < 8){
            return res.status(400).json({message: 'Довжина пароля повина бути не менше 8 символів'});
        }

        if (!/[A-Z]/.test(password)) {
            return res.status(400).json({ message: 'Пароль має містити хоча б одну велику літеру' });
        }
        
        if (!/[a-z]/.test(password)) {
            return res.status(400).json({ message: 'Пароль має містити хоча б одну маленьку літеру' });
        }

        if (password != passwordConfirm){
            return res.status(400).json({message: 'Паролі не підтвердженні'})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({login, phone, password: hashedPassword, role});

        await newUser.save();

        res.status(201).json({message: "Користувач зареєстрований"});
    }
    catch (error){ 
        res.status(500).json({message: "Усі поля повинні бути заповнені"});
    }
}

const authenticationUser = async(req, res) =>{
    try{
        const {login, password} = req.body;

        if (login === '' || password === ''){
            return res.status(400).json({ message: 'Усі поля повинні бути заповнені' });
        }

        const user = await User.findOne({login});

        if (!user){
            return res.status(404).json({message: 'Користувача не знайдено'});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch){
            return res.status(400).json({message: 'Не вірний пароль'});
        }

        const token = jwt.sign({userId:user._id}, JWT_SECRET, {expiresIn: "12h"});

        res.status(200).json({ token, userId: user._id});
    }
    catch{
        res.status(500).json({message: "Усі поля повинні бути заповнені"});
    }
}

const profileUser = async(req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        res.status(200).json({user, message: "Get user data"});
    } catch (error) {
        res.status(500).json({ message: "Помилка сервера" });
    }
}

const getUsers = async(req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json({users, message: "Get user data"});
    } catch (error) {
        res.status(500).json({ message: "Помилка сервера" });
    }
}

const getUser = async(req, res) => {
    try {
        const {userId} = req.query;
        console.log(userId);
        const user = await User.findById(userId).select("-password");
        res.status(200).json({user, message: "Get user data"});
    } catch (error) {
        res.status(500).json({ message: "Помилка сервера" });
    }
}

const updateUser = async(req, res) => {
    try{
        const {userId, role} = req.body;
        const user = await User.findById(userId);
        user.role = role;
        await user.save()
        res.status(200).json({ message: "Права доступу користувача успішно оновлені"});
    }catch (error){
        res.status(500).json({ message: "Помилка сервера" });
    }
}

module.exports = {createUser, authenticationUser, authMiddleware, profileUser, getUsers, getUser, updateUser};