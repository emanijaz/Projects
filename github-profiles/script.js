const API_KEY = "https://api.github.com/users/";

const main = document.getElementById('main');
const search = document.getElementById('search');
const form = document.getElementById('form');

async function getUser(username){
    const resp = await fetch(API_KEY + username);
    const userData = await resp.json();

    
    createUserCard(userData);
    getUserRepos(username);

}


async function getUserRepos(username){
    const resp = await fetch(API_KEY + username+'/repos');
    const userRepos = await resp.json();    
    addUserReposToCard(userRepos);
}

function addUserReposToCard(repos){
    const allReposElement = document.getElementById('userRepos');

    repos.sort((a,b) => {b.startstargazers_count - a.stargazers_count}).slice(0,10).forEach((repo) => {
        const repoElement = document.createElement('a');
        repoElement.classList.add('repo');
        repoElement.href = repo.html_url;
        repoElement.target = '_blank';
        repoElement.innerText = repo.name;
        allReposElement.appendChild(repoElement);
    })

}



function createUserCard(user){

    const cardHtml = `
        <div class="userCard">
            <div id="avatarDiv">
                <img src = "${user.avatar_url}" alt="${user.name}" id="userAvatar"/>
            </div>

            <div id= "userInfo">
                <h2>${user.name}</h2>
                <h3>${user.bio}</h3>

                <ul>
                    <li >${user.followers}<strong><a href="https://github.com/${user.login}/?tab=followers" target="_blank">Followers</a></strong></li>
                    <li >${user.following}<strong><a href="https://github.com/${user.login}/?tab=following" target="_blank">Followings</a></strong></li>
                    <li>${user.public_repos}<strong><a href="https://github.com/${user.login}/?tab=repositories" target="_blank">Repos</a></strong></li>

                </ul>
                <div id="userRepos"></div>

            </div>

        </div>
    `;
    main.innerHTML = cardHtml;
}

form.addEventListener('submit', e=> {

    e.preventDefault();
    const username = search.value;

    if(username){
        getUser(username);
        search.value = '';
    }

})