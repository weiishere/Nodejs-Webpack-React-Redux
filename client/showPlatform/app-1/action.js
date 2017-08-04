import { parseJSONtoUrlPamater } from '../../utils/perfect'
import $ from 'jquery';

const getPalyerList = ((query) => {
    return (dispatch, getState) => {
        fetch("/api/showPlatform/player/list" + parseJSONtoUrlPamater(query), {
            method: "get",
            credentials: 'include'
        }).then(function (res) {
            return res.json();
        }).then(function (json) {
            dispatch({
                type: "GETLIST",
                payload: json
            });
        }).catch(function (error) {
            console.log('Request failed', error);
        });
    }

})
const addPlayer = ((palyer, callback) => {
    return (dispatch, getState) => {
        fetch("/api/showPlatform/player/add", {
            method: "post",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(palyer)
        }).then(function (res) {
            return res.json();
        }).then(function (json) {
            // if (json.code === "0000") {
            //     dispatch(getPalyerList());
            // }
            if (callback) callback(json);
        }).catch(function (error) {
            console.log('Request failed', error);
        });
    }
})

const removePlayer = (_id, callback) => {
    return (dispatch, getState) => {
        fetch("/api/showPlatform/player/remove", {
            method: "post",
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({ id: _id })
        }).then(function (res) {
            return res.json();
        }).then(function (json) {
            if (json.code === "0000") {
                dispatch(getPalyerList());
            }
            if (callback) callback(json);
        }).catch(function (error) {
            console.log('Request failed', error);
        });
    }
}

export default {
    getPalyerList, addPlayer, removePlayer
}