const electron = require('electron');
const path = require('path');

document.querySelector('#submit').addEventListener('click', function() {

    let username = document.getElementById("search-input").value;

    const {ipcRenderer} = require('electron');

    // send username to main.js 
    ipcRenderer.send('asynchronous-message', username )

    // receive message from main.js
    ipcRenderer.on('asynchronous-reply', (event, arg) => {
      console.log(arg);

    });

    });
