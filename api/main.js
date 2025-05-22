const router = require('express').Router();


//---------declarar variables---------

//datos generales
const personasRouter = require('./personas');
const usuariosRouter = require('./usuario');

//roles
const adminRouter = require('./roles/admin');
const estudiantesRouter = require('./roles/estudiantes');
const preceptoresRouter = require('./roles/preceptores');
const profesoresRouter = require('./roles/profesores');
const responsablesRouter = require('./roles/responsable');
//educacion
const materiasRouter = require('./educacion/materias');
//horarios
const c_m_hRouter = require('./horarios/c_m_h');
const diasSemanaRouter = require('./horarios/diasSemana');
const mesesRouter = require('./horarios/Mes');
//cursos
const aniosRouter = require('./cursos/anio');
const divisionesRouter = require('./cursos/divisiones');
const cursosRouter = require('./cursos/curso');
//asistencia 
const diasAsRouter = require('./asistencia/diasAs');
const tipoAsRouter = require('./asistencia/tipoAs');
//info
const localidadesRouter = require('./info/localidades');
const nacionalidadesRouter = require('./info/nacionalidades');
const profesionesRouter = require('./info/profesiones');

//---------Routers---------

//datos generales
router.use('/personas', personasRouter);
router.use('/usuarios', usuariosRouter);
//asistencia
router.use('/diasAs', diasAsRouter);
router.use('/tipoAs', tipoAsRouter);
//roles
router.use('/administradores', adminRouter);
router.use('/estudiantes', estudiantesRouter);
router.use('/preceptores', preceptoresRouter);
router.use('/profesores', profesoresRouter);
router.use('/responsables', responsablesRouter);
//info
router.use('/localidades', localidadesRouter);
router.use('/nacionalidades', nacionalidadesRouter);
router.use('/profesiones', profesionesRouter);
//horarios
router.use('/c_m_h', c_m_hRouter);
router.use('/diasSemana', diasSemanaRouter);
router.use('/meses', mesesRouter);
//cursos
router.use('/anios', aniosRouter);
router.use('/divisiones', divisionesRouter);
router.use('/cursos', cursosRouter);
//educacion
router.use('/materias', materiasRouter);

module.exports = router;