const jwt = require('jsonwebtoken');
const protegerRuta = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({msg:'Autorizacion denegada porquue no hay ningun token'});
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({msg:'El token no es valido'});
    }
};

const permitirRoles = (...rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.user || !rolesPermitidos.includes(req.user.role)) {
            return res.status(403).json({msg:'No tenes los permisos para acceder a este recurso'});
        }
        next();
    };
};
module.exports = { protegerRuta, permitirRoles };