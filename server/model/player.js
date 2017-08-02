const playerEntity = require('../db/entity/player');


module.exports = {
    //  通过实例化model，创建一个model实例
    create: function (player, callback, error) {
        const _play = new playerEntity(player);
        _play.save(function (err, player) {
            if (err) error(err); else callback(player);
        });
    },

    delete: function (id, callback, error) {
        playerEntity.remove({ _id: id }, function (err) {
            if (err) error(err); else callback();
        });
    },
    update: function (player, callback, error) {
        const id = player.id;
        const playerParams = player;
        playerEntity.findById(id, function (err, player) {
            if (err) {
                error(err);
            } else {
                const _player = _.extend(player, playerParams);
                _player.save(function (err, player) {
                    if (err) error(err); else callback();
                })
            }
        })
    },
    get: function (id, callback, error) {
        playerEntity.findById(id, function (err, player) {
            if (err) error(err); else callback(player);
        });
    },
    list: function (query, callback, error) {
        for (var item in query) {
            if (!query[item]) { delete query[item]; }
        }
        playerEntity.find(query, function (err, players) {
            if (err) error(err); else callback(players);
            // var resultPlayers = _.map(players, function (player) {

            // });
        })
    }
}