const express = require('express');
const router = express.Router();
const {conexion} = require('../../bd/conexion');
router.get("/buscar", function (req, res, next) {
    const { idEstudiante, idCurso} = req.query;
    
    let Filtro = "WHERE ";

    if (idEstudiante){
        Filtro += "idEstudiante = " + idEstudiante;
    } else{
        
        if (idCurso) {
                Filtro += "idCurso = " + idCurso;
        }
    }
    
    const sql = "SELECT * FROM Estudiantes ";
    console.log(sql+Filtro);
    conexion.query(sql + Filtro, function (error, result) {
        if (error){
            console.log(error)
            return res.status(500).send("Ocurrió un error");
        }
        res.json({
            status: "ok",
            Estudiantes: result
        });
    })
});
router.get("/", function(req, res, next){
    
    const sql = "SELECT * FROM Estudiantes";
    conexion.query(sql, function(error, result){
        if (error) {
            console.error(error);
            return res.send("Ocurrio un error");
        }
        res.json ({
            status: "ok",
            estudiantes: result
        })
    });
    })


router.post("/", function (req, res, next){
    const { idPersona, idCurso } = req.body;
        
    const sql = `INSERT INTO Estudiantes (idPersona, idCurso) VALUES (?, ?)`
        
        conexion.query(sql, [idPersona, idCurso], function(error, result){
                if (error) {
                    console.error(error);
                    return res.send("Ocurrio un error");
                }
                res.json({status:"ok"})
        })
})

router.put("/", function(req, res, next){
    const { idEstudiante } = req.query;
    const { idPersona } = req.body;

    const sql = `UPDATE Estudiantes SET idPersona = ?, idCurso = ? WHERE idEstudiantes = ?`;
    conexion.query(
        sql,
        [idPersona, idCurso, idEstudiantes],
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
    const { idEstudiante } = req.query;

    const sql = "DELETE FROM Estudiantes WHERE idEstudiante = ?";

    conexion.query(sql, [idEstudiante], function(error, result){
        if(error) {
            console.error(error);
            return res.status(500).send("Ocurrio un error");
        }
        res.json({status:"ok"})
    })
})

module.exports = router;