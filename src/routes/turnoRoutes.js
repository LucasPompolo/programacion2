const express = require('express');
const router = express.Router();
const { protegerRuta, permitirRoles } = require('../middlewares/authMiddleware');
const { crearTurno, eliminarTurno, obtenerMisTurnos, obtenerTodosLosTurnos, actualizarEstadoTurno 
} = require('../controllers/turnoController');

router.use(protegerRuta);
router.post('/', permitirRoles('cliente', 'admin'), crearTurno);
router.delete(
 '/admin/:id',
 permitirRoles('admin'),
 eliminarTurno
);
router.get('/mis-turnos', permitirRoles('cliente', 'admin'), obtenerMisTurnos);
router.get('/admin/todos', permitirRoles('admin'), obtenerTodosLosTurnos);
router.put('/admin/:id', permitirRoles('admin'), actualizarEstadoTurno);

module.exports = router;