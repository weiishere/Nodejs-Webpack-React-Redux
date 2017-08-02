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
    const { name, birthday,height,weight,club,position } = req.body;
    service.create({
        //name, birthday,height,weight,club,position
        name: "大卫路易斯",
        birthday: (new Date(1986, 2, 27, 12, 59, 59, 999)),
        height: 190,
        weight: 88,
        club: "切尔西",
        position: "CB",
    }, function (player) {
        res.json("player添加成功!");
    }, function (error) {
        res.json(error);
    });
});
router.post('/update', (req, res, next) => {
  const {id, name, birthday,height,weight,club,position } = req.body;
  service.update({id, name, birthday,height,weight,club,position },function(){
      
  },function(){

  })
});


router.get('/getOne', (req, res, next) => {
    const { playerId } = req.query;
    service.get(playerId, function (player) {
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