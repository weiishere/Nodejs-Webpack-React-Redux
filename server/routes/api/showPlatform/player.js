const express = require('express');
const service = require('../../../model/player');
const router = express.Router();

router.get('/list', (req, res, next) => {
    const { name, position, club } = req.query;
    service.list({
        name, position, club
    }, function (result) {
        res.json(result);
    }, function () { });
});


router.post('/add', (req, res, next) => {
    const { name, birthday, height, weight, club, position, price } = req.body;
    service.create({
        name, birthday, height, weight, club, position, price
    }, function (player) {
        res.json({ code: '0000', newPlayer: player });
    }, function (error) {
        res.json({ code: '0001', error: error });
    });
});
router.post('/update', (req, res, next) => {
    // const { _id } = req.body;
    // service.delete(_id, function () {
    //     res.json({ code: '0000' });
    // }, function (error) {
    //     res.json({ code: '0000', newPlayer: error });
    // })
    const { _id, name, birthday, height, weight, club, position, price } = req.body;
    service.update({ 
        _id, name, birthday, height, weight, club, position, price 
    }, function (player) {
        res.json({ code: '0000', newPlayer: player });
    }, function (error) {
        res.json({ code: '0000', error: error });
    })
});
router.post('/remove', (req, res, next) => {
    const { id } = req.body;
    service.delete(id, function () {
        res.json({ code: '0000' });
    }, function (error) {
        res.json({ code: '0000', newPlayer: error });
    })
});

router.get('/getOne', (req, res, next) => {
    const { _id } = req.query;
    service.get(_id, function (player) {
        res.json(player);
    }, function () {
        res.json("error");
    });
});


// router.post('/add', (req, res, next) => {
//   const {fundContent, merchantId} = req.body;
//   service.addFund(req, {
//     fundContent, merchantId
//   }).then((body) => {
//     res.json(body);
//   }).catch((err) => {
//     next(err);
//   });
// });

// router.post('/update', (req, res, next) => {
//   const {fundId,fundContent} = req.body;
//   service.updateFund(req, {
//     fundId,fundContent
//   }).then((body) => {
//     res.json(body);
//   }).catch((err) => {
//     next(err);
//   });
// });
// router.get('/hotFundList',(req,res,next)=>{
//   const {merchantId} = req.query;
//   service.getHotFundList(req,{merchantId}).then((body)=>{
//     res.json(body);
//   }).catch((err)=>{
//     next(err);
//   })
// })
module.exports = router;