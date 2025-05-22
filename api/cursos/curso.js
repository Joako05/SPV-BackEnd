const express = require('express');
const router = express.Router();
const { conexion } = require('../../bd/conexion');

router.get("/buscar", function (req, res) {
    const { idCurso, idAnio, idDivision } = req.query;
    
    let Filtro = "WHERE ";
     
    if (idCurso){
        Filtro += "idCurso = " + idCurso;
    } else{
        
        if (idAnio) {
                Filtro += "idAnio = " + idAnio;
        }
        if (idDivision){
            if(idAnio){
                Filtro += " AND idDivision = " + idDivision;
            }
            else {
                Filtro += "idDivision = " + idDivision;
            }
        }
    }
    
    const sql = "SELECT * FROM Cursos ";
    conexion.query(sql + Filtro, function (error, result) {
        if (error){
            console.log(error)
            return res.status(500).send("Ocurrió un error");
        }
        res.json({
            status: "ok",
            cursos: result
        });
    })
});

router.get("/", function (req, res) {
    const sql = "SELECT * FROM Cursos";
    conexion.query(sql, function (error, result) {
        if (error){
            console.error(error);
            return res.send("Ocurrio un error");
        }
        res.json({
            status: "ok",
            Cursos: result
        })
    });
})

router.post("/", function (req, res) {
    const { idAnio, idDivision } = req.body;

    const sql = `INSERT INTO Cursos (idAnio, idDivision) VALUES (?, ?)`

    conexion.query(sql, [idAnio, idDivision], function (error, result) {
        if (error) {
            console.error(error);
            return res.send("Ocurrio un error");
        }
        res.json({ status: "ok" })
    })
})
router.put("/", function (req, res) {
    const { idCurso } = req.query;
    const { idAnio, idDivision } = req.body;

    const sql = `UPDATE Cursos SET idAnio = ?, idDivision = ? WHERE idCurso = ?`;
    conexion.query(
        sql,
        [idAnio, idDivision, idCurso],
        function (error, result) {
            if (error) {
                console.error(error);
                res.status(500).send("ocurrio un error")
            }
            res.json({ status: "ok" })
        }
    )
})

router.delete("/", function (req, res) {
    const { idCurso } = req.query;

    const sql = "DELETE FROM Cursos WHERE idCurso = ?";

    conexion.query(sql, [idCurso], function (error, result) {
        if (error) {
            console.error(error);
            return res.status(500).send("Ocurrio un error");
        }
        res.json({ status: "ok" })
    })
})

module.exports = router;