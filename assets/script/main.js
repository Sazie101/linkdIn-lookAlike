'use strict';

import { onEvent, select, print, selectAll } from "./utility.js";

const search = select('.search');
const searchIcon = select('.searchIcon');
const links = selectAll('nav ul li');
const homeIcon = select('.homeIcon');
const networkIcon = select('.networkIcon');
const jobIcon = select('.jobIcon');
const messageIcon = select('.messageIcon');
const postings = selectAll('.btns button');
const imgs = select('.images img');
const vids = select('.videos img');

onEvent('focus', search, () => {
    searchIcon.src = "./assets/img/magnifying-glass-solid-selected.svg";
});

onEvent('blur', search, () => {
    searchIcon.src = "./assets/img/magnifying-glass-solid-unselected.svg";
});

links.forEach(link => {
    onEvent('mouseenter', link, () => {
        if (link.classList.contains('home')) homeIcon.src = "./assets/img/house-solid-selected.svg"; 
        if (link.classList.contains('networks')) networkIcon.src = "./assets/img/network-wired-solid-selected.svg";
        if (link.classList.contains('jobs')) jobIcon.src = "./assets/img/briefcase-solid-selected.svg";
        if (link.classList.contains('messages')) messageIcon.src = "./assets/img/message-solid-selected.svg";
    });

    onEvent('mouseleave', link, () => {
        if (link.classList.contains('home')) homeIcon.src = "./assets/img/house-solid-unselected.svg"; 
        if (link.classList.contains('networks')) networkIcon.src = "./assets/img/network-wired-solid-unselected.svg";
        if (link.classList.contains('jobs')) jobIcon.src = "./assets/img/briefcase-solid-unselected.svg";
        if (link.classList.contains('messages')) messageIcon.src = "./assets/img/message-solid-unselected.svg";
    });
});
postings.forEach(posting => {
    onEvent('mouseenter', posting, () => {
        if (posting.classList.contains('images')) imgs.src = "./assets/img/image-solid-selected.svg";
        if (posting.classList.contains('videos')) vids.src = "./assets/img/video-solid-selected.svg";
    });

    onEvent('mouseleave', posting, () => {
        if (posting.classList.contains('images')) imgs.src = "./assets/img/image-solid-unselected.svg";
        if (posting.classList.contains('videos')) vids.src = "./assets/img/video-solid-unselected.svg";
    });
});
const options = {
    method: "GET",
    mode: 'cors'
};

async function getUsers() {
    const URL = `https://randomuser.me/api/?nat=CAZ&results=10&seed=same`;

    try {
        const result = await fetch(URL, options);

        if (!result.ok) {
            throw new Error(`${result.status} (${result.statusText})`);
        }

        const users = await result.json();
        console.log(users.results);

        // Call the function to set/show the users in the friends section
        listUsers(users.results);
        pageUsers(users.results)
    } catch(error) {
        console.log(error.message);
    }
}

function pageUsers(users) {
    const frontPage = select('.frontPage');

    // Loop through each user and create an element for each
    for (let i = 5; i < users.length; i++) {
        const userElement = document.createElement('div');
        userElement.classList.add('post');

        // Create a div to contain userImg, userInfo, and more
        const userContent = document.createElement('div');
        userContent.classList.add('userContent');

        const userImg = document.createElement('img');
        userImg.classList.add('userImg');
        userImg.src = `${users[i].picture.medium}`;
        userImg.alt = `${users[i].name.first} ${users[i].name.last}`;
        userContent.appendChild(userImg);

        const userInfo = document.createElement('div');
        userInfo.classList.add('postInfo');

        const userText = document.createElement('p');
        userText.classList.add('userName');
        userText.innerText = `${users[i].name.first} ${users[i].name.last}`;
        userInfo.appendChild(userText);

        // Append userInfo to userContent
        userContent.appendChild(userInfo);

        const more = document.createElement('img');
        more.classList.add('seeMore');
        more.src = './assets/img/ellipsis-solid-unselected.svg';
        more.alt = 'Add friend button';
        userContent.appendChild(more);

        // Append userContent to userElement
        userElement.appendChild(userContent);

        // Add unique post content for each user
        const postContent = document.createElement('p');
        postContent.classList.add('postContent');
        postContent.innerText = `Hello, my name is ${users[i].name.first} ${users[i].name.last}
        I am ${users[i].dob.age} years old and I am from ${users[i].location.city}, ${users[i].location.country}.`;
        userElement.appendChild(postContent);

        // Create a div for like, share, and comment
        const actions = document.createElement('div');
        actions.classList.add('actions');

        // Like
        const likeImg = document.createElement('img');
        likeImg.src = './assets/img/heart-solid.svg';
        likeImg.alt = 'Like';
        actions.appendChild(likeImg);

        // Share
        const shareImg = document.createElement('img');
        shareImg.src = './assets/img/comment-regular.svg';
        shareImg.alt = 'Share';
        actions.appendChild(shareImg);

        // Comment
        const commentImg = document.createElement('img');
        commentImg.src = './assets/img/share-from-square-regular.svg';
        commentImg.alt = 'Comment';
        actions.appendChild(commentImg);

        // Append actionsDiv to userElement
        userElement.appendChild(actions);

        // Append the user element to the frontPage section
        frontPage.appendChild(userElement);
    }
}




function listUsers(users) {
    const friendsSection = select('.friendsList');

    // Loop through each user and create an element for each
    for (let i = 0; i < users.length/2; i++) {
        const userElement = document.createElement('div');
        userElement.classList.add('friend');
        const userInfo = document.createElement('div');
        userInfo.classList.add('info');

        const userImg = document.createElement('img');
        userImg.classList.add('userImg');
        userImg.src = `${users[i].picture.medium}`;
        userImg.alt = `${users[i].name.first} ${users[i].name.last}`;
        userElement.appendChild(userImg);

        const userText = document.createElement('p');
        userText.classList.add('userName');
        userText.innerText = `${users[i].name.first} ${users[i].name.last}`;
        userInfo.appendChild(userText);

        const userLocation = document.createElement('p');
        userLocation.innerText = `${users[i].location.city}, ${users[i].location.country}`;
        userLocation.classList.add('userLocation');
        userInfo.appendChild(userLocation);
        userElement.appendChild(userInfo);

        const plus = document.createElement('img');
        plus.classList.add('addFriend');
        plus.src = './assets/img/plus-solid.svg';
        plus.alt = 'Add friend button';
        userElement.appendChild(plus);

        // Append the user element to the friends section
        friendsSection.appendChild(userElement);
    };
}

getUsers();