const db = require('./db');

class Controller {
    async createTest (req, res) {
        const {name} = req.body;
        const test = await db.query('insert into test (name) values ($1) RETURNING *', [name]);
        res.json(test.rows[0]);
    }
    async getTests (req, res) {
        const tests = await db.query('select * from test');
        res.json(tests.rows);
    }
    async updateTest (req, res) {
        const {id, name} = req.body
        const test = await db.query('update test set name = $2 where id = $1 RETURNING *', [id, name]);
        res.json(test.rows[0]);
    }
    async deleteTest (req, res) {
        const id = req.params.id;
        const test = await db.query('delete from test where id = $1', [id])
        res.json(test.rows[0]);
    }

    async createVopros (req, res) {
        const {zagolovok, test_id} = req.body;
        const vopros = await db.query('insert into vopros (zagolovok, test_id) values ($1, $2) RETURNING *', [zagolovok, test_id]);
        res.json(vopros.rows[0]);
    }
    async getVopros (req, res) {
        const vopros = await db.query('select * from vopros');
        res.json(vopros.rows);
    }
    async updateVopros (req, res) {
        const {id, zagolovok, test_id} = req.body;
        const vopros = await db.query('update vopros set zagolovok = $2, test_id = $3 where id = $1 RETURNING *', [id, zagolovok, test_id]);
        res.json(vopros.rows[0]);
    }
    async deleteVopros (req, res) {
        const id = req.params.id;
        const vopros = await db.query('delete from vopros where id = $1', [id])
        res.json(vopros.rows[0]);
    }

    async createOtvet (req, res) {
        const {opisanie, isTrue, vopros_id} = req.body;
        const otvet = await db.query('insert into otvet (opisanie, isTrue, vopros_id) values ($1, $2, $3) RETURNING *', [opisanie, isTrue, vopros_id]);
        res.json(otvet.rows[0]);
    }
    async getOtvet (req, res) {
        const otvet = await db.query('select * from otvet');
        res.json(otvet.rows);
    }
    async updateOtvet (req, res) {
        const {id, opisanie, isTrue, vopros_id} = req.body;
        const otvet = await db.query('update otvet set opisanie = $2, isTrue = $3, vopros_id = $4 where id = $1 RETURNING *', [id, opisanie, isTrue, vopros_id]);
        res.json(otvet.rows[0]);
    }
    async deleteOtvet (req, res) {
        const id = req.params.id;
        const otvet = await db.query('delete from otvet where id = $1', [id])
        res.json(otvet.rows[0]);
    }
}

module.exports = new Controller();