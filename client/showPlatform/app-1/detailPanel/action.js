import { parseJSONtoUrlPamater } from '../../../utils/perfect'
import $ from 'jquery';
import listAction from '../action' 

const getPalyer = ((query) => {
    return (dispatch, getState) => {
        fetch("/api/showPlatform/player/getOne" + parseJSONtoUrlPamater(query), {
            method: "get",
            credentials: 'include'
        }).then(function (res) {
            return res.json();
        }).then(function (json) {
            dispatch({
                type: "GETONE",
                payload: json
            });
        }).catch(function (error) {
            console.log('Request failed', error);
        });
    }

})

const updatePlayer = (player, callback) => {
    return (dispatch, getState) => {
        fetch("/api/showPlatform/player/update", {
            method: "post",
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(player)
        }).then(function (res) {
            return res.json();
        }).then(function (json) {
            if (json.code === "0000") {
                dispatch(listAction.getPalyerList());
            }
            if (callback) callback(json);
        }).catch(function (error) {
            console.log('Request failed', error);
        });
    }
}

export default {
    getPalyer, updatePlayer
}