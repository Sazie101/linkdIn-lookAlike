'use strict';

import { onEvent, select, print, selectAll } from "./utility.js";

const loginBtn = select('.login');
const userName = select('.username');
const password = select('.password');
const incorrectMessage = select('.incorrect');

localStorage.setItem("userName", "samuelwassie123@gmail.com");
localStorage.setItem("userPassword", "0912555310");

onEvent('click', loginBtn, (event) => {
    const email = localStorage.getItem("userName");
    const userPassword = localStorage.getItem("userPassword");
    if (userName.value === email && password.value === userPassword) {
        loginBtn.href = "main.html";
    } else {
        event.preventDefault();
        incorrectMessage.style.display = 'block';
    }
});