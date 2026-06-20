const mongoose = require('mongoose');
const TurnoSchema = new mongoose.Schema({
    paciente: {type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true},

    profesional: {type:String,required:true},
    especialidad: {type:String,required:true},
    fecha: {type:String,required:true},
    hora: {type:String,required:true}, 
    obraSocial: {type:String,required:true},
    estado: {type:String, 
        enum: ['pendiente','enviado','cancelado'], 
       default:'pendiente'}
}, {timestamps:true});

module.exports = mongoose.model('Turno',TurnoSchema);