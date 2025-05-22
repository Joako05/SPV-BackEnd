const router = require('express').Router();
const {hashPass, verificarPass, generarToken} = require('@damianegreco/hashpass');
const {conexion} = require('../bd/conexion');
const TOKEN_SECRET = "educacion";

const checkUsuario = (nombreUsu) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT id_usuario FROM usuarios WHERE nombreUsu = ?";
        conexion.query(sql, [nombreUsu], (error, result) => {
            if (error) return reject(error);
            if (result.length > 0) return reject("Usuario ya registrado");
            resolve();
        });
    });
};

const guardarUsuario = (nombreUsu, passHasheada) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO usuarios (nombreUsu, contraseña) VALUE (?, ?)";
        conexion.query(sql, [nombreUsu, passHasheada], (error, result) => {
            if (error) return reject(error);
            resolve(result.insertId);
        });
    });
};

router.post('/', (req, res) => {
    const {nombreUsu, contraseña} = req.body;

    checkUsuario(nombreUsu)
        .then(() => {
            const passHasheada = hashPass(contraseña);
            return guardarUsuario(nombreUsu, passHasheada);
        })
        .then((usuario_id) => res.json({status: 'ok', usuario_id}))
        .catch((error) => {
            console.error(error);
            res.json({status: 'error', error});
        });
});

router.post('/login', (req, res) => {
    const {nombreUsu, contraseña} = req.body;

    const sql = 'SELECT id_usuario, contraseña FROM usuarios WHERE nombreUsu = ?';
    conexion.query(sql, [nombreUsu], (error, result) => {
        if (error) {
            console.error(error);
            return res.json({status: 'error', error});
        }
        if (result.length === 0) {
            return res.json({status: 'error', error: "Usuario no existe"});
        }
        const usuario = result[0];
        if (verificarPass(contraseña, usuario.contraseña)) {
            const token = generarToken(TOKEN_SECRET, 6, {usuario_id: usuario.id_usuario, usuario: nombreUsu});
            res.json({status: 'ok', token});
        } else {
            res.json({status: 'error', error: "Usuario/contraseña incorrecta"});
        }
    });
});

module.exports = router;
