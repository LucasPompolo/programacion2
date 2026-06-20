const Turno = require('../models/Turno');
const crearTurno = async (req, res) => {
    try {
        const {profesional, especialidad, fecha, hora, obraSocial } = req.body;
        const pacienteId = req.user.id; 
        const turnoExistente = await Turno.findOne({ profesional, fecha, hora });
        if (turnoExistente) {
            return res.status(400).json({ msg:'El profesional ya tiene un turno reservado para ese horario'});
        }

        const nuevoTurno = new Turno({
            paciente: pacienteId,
            profesional,
            especialidad,
            fecha,
            hora,
            obraSocial
        });
        await nuevoTurno.save();
        res.status(201).json({ msg:'Turno creado con exitosament', turno: nuevoTurno });
    } catch (error) {
        res.status(500).json({ msg:'Error al crear el turno', error: error.message });
    }
};

const eliminarTurno = async (req,res)=>{
 const { id } = req.params;

 const turno = await Turno.findByIdAndDelete(id);

 if(!turno){
   return res.status(404).json({msg:'Turno no encontrado'});
 }

 res.json({msg:'Turno eliminado'});
};

const obtenerMisTurnos = async (req, res) => {
    try {
        const turnos = await Turno.find({ paciente: req.user.id }).sort({ fecha: 1, hora: 1 });
        res.json(turnos);
    } catch (error) {
        res.status(500).json({ msg:'Error al obtener turnos', error: error.message });
    }
};

const obtenerTodosLosTurnos = async (req, res) => {
    try {
        const {especialidad, profesional} = req.query;
        let filtros = {};

        if (especialidad) filtros.especialidad = especialidad;
        if (profesional) filtros.profesional = profesional;
        const turnos = await Turno.find(filtros).populate('paciente','nombre email');
        res.json(turnos);
    } catch (error) {
        res.status(500).json({ msg:'Error al obtener todos los turnos', error: error.message });
    }
};

const actualizarEstadoTurno = async (req, res) => {
    try {
        const {id} = req.params;
        const {estado} = req.body;
        const turnoActualizado = await Turno.findByIdAndUpdate(
            id,
            { estado },
            { new: true, runValidators: true }
        );

        if (!turnoActualizado) {
            return res.status(404).json({ msg:'No se encontro el turno' });
        }

        res.json({ msg:'Estado del turno actualizado', turno: turnoActualizado });
    } catch (error) {
        res.status(500).json({ msg:'Error al actualizar el turno', error: error.message });
    }
};

module.exports = {
    crearTurno,
    eliminarTurno,
    obtenerMisTurnos,
    obtenerTodosLosTurnos,
    actualizarEstadoTurno
};