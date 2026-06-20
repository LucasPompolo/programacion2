const User = require('../models/User');
const jwt = require('jsonwebtoken');
const register = async (req, res) => {
    try {
        const {nombre,email,password,role} = req.body;
        let userExists = await User.findOne({email});
        if (userExists) {
            return res.status(400).json({ msg:'Este usuario ya existe'});
        }

        const newUser = new User({nombre, email, password, role});
        await newUser.save();

        res.status(201).json({msg:'Usuario registrado exitosamente'});
    } catch (error) {
        res.status(500).json({msg: 'Error en el servidor',error:error.message});
    }
};

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({msg:'Credenciales invalidas'});
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({msg: 'Credenciales invalidas'});
        }
        const token = jwt.sign(
            {id: user._id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        );
        res.json({
            token,
            user:{id: user._id, ombre:user.nombre,role:user.role}
        });
    } catch (error) {
        res.status(500).json({msg:'Error en el servidor',error:error.message});
    }
};

module.exports = {register, login};