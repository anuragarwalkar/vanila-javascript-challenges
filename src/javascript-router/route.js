const routes = {
    "/src/javascript-router": "/src/javascript-router/index.html",
    "/src/javascript-router/home": "/src/javascript-router/home.html",
    "/src/javascript-router/about": "/src/javascript-router/about.html",
    404: "/src/javascript-router/not-found.html"
}

async function handleLocation() {
    const path = window.location.pathname;
    console.log('path:', path);
    const validPath = routes[path] || routes[404];
    const html = await fetch(validPath).then(data => data.text());
    document.getElementById('main-page').innerHTML = html;
}

function route(event) {
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
}

const allElements = document.getElementsByClassName('nav-link');

for(let i = 0; i < allElements.length; i++) {   
    allElements[i].addEventListener('click', route);
}

window.onpopstate = handleLocation;