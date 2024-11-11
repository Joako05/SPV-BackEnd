const express = require('express');
const router = express.Router();
const {conexion} = require('../bd/conexion');

router.get("/", function(req, res, next){
    const {nombre, apellido, fecha_nacimiento, lugar_nac, domicilio, telefono, idLocalidad, DNI} = req.query;
    
    const sql = "SELECT * FROM personas";
    conexion.query(sql, function(error, result){
        if (error) {
            console.error(error);
            return res.send("Ocurrio un error");
        }
        res.json ({
            status: "ok",
            personas: result
        })
    });
    })

    router.get("/:id", function(req, res, next){
        res.send(`Ruta de personas id ${req.params.id}`);
        })

router.post("/", function (req, res, next){
    const { nombre, apellido, fecha_nacimiento, lugar_nac, domicilio, telefono, idLocalidad, DNI, telefono_trabajo, idNac, idProfesion } = req.body;
        
    const sql = `INSERT INTO personas (nombre, apellido, fecha_nacimiento, lugar_nac, domicilio, telefono, idLocalidad, DNI, telefono_trabajo, idNac, idProfesion ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        
        conexion.query(sql, [nombre, apellido, fecha_nacimiento, lugar_nac, domicilio, telefono, idLocalidad, DNI, telefono_trabajo, idNac, idProfesion], function(error, result){
                if (error) {
                    console.error(error);
                    return res.send("Ocurrio un error");
                }
                res.json({status:"ok"})
        })
})

router.put("/", function(req, res, next){
    const { idPersona } = req.query;
    const { nombre, apellido, fecha_nacimiento, lugar_nac, domicilio, telefono, idLocalidad, DNI, telefono_trabajo, idNac } = req.body;

    const sql = `UPDATE personas SET nombre = ?, apellido = ?, fecha_nacimiento = ?, lugar_nac = ?, domicilio = ?, telefono = ?, idLocalidad = ?, DNI = ?, telefono_trabajo = ?, idNac = ?, idProfesion = ?  WHERE idPersona = ?`;
    conexion.query(
        sql,
        [nombre, apellido, fecha_nacimiento, lugar_nac, domicilio, telefono, idLocalidad, DNI, telefono_trabajo, idNac, idProfesion, idPersona],
        function(error,result){
            if (error) {
                console.error(error);
                res.status(500).send("ocurrio un error")
            } 
            res.json({status:"ok"})
        }
    )
})

router.delete("/", function(req, res, next){
    const { id } = req.query;

    const sql = "DELETE FROM personas WHERE idpersonas = ?";

    conexion.query(sql, [idPersona], function(error, result){
        if(error) {
            console.error(error);
            return res.status(500).send("Ocurrio un error");
        }
        res.json({status:"ok"})
    })
})

module.exports = router;