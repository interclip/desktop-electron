const electron = require('electron');
const path = require('path');
const axios = require('axios');


function getCode(url) {
    console.log(url);
    axios.get(`http://uni.hys.cz/includes/api?url=${url}`)
        .then(res => {
            const code = res.data;
            console.log(code);
        });
}
//getCode('https://coursetro.com/courses/22/Creating-Desktop-Apps-with-Electron-Tutorial')