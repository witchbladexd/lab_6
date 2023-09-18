const Router = require('express');
const router = new Router();
const controller = require('./controller');

router.post('/test', controller.createTest);
router.get('/test', controller.getTests);
router.put('/test', controller.updateTest);
router.delete('/test/:id', controller.deleteTest);

router.post('/vopros', controller.createVopros);
router.get('/vopros', controller.getVopros);
router.put('/vopros', controller.updateVopros);
router.delete('/vopros/:id', controller.deleteVopros);

router.post('/otvet', controller.createOtvet);
router.get('/otvet', controller.getOtvet);
router.put('/otvet', controller.updateOtvet);
router.delete('/otvet/:id', controller.deleteOtvet);

module.exports = router;