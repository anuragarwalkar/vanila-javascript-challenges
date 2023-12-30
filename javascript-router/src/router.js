const routes = {
    "/": {
        source: "/index.html",
        path: "/",
        name: "Home"
    },
    "/about": {
        source: "components/about.html",
        path: "/about",
        name: "about"
    },
    "/contact-us": {
        source: "components/contact-us.html",
        path: "/contact-us",
        name: "contact us"
    }
    ,
    404: {
        source: "components/not-found.html",
        path: "404",
        name: "Not found"
    }
}

async function handleLocation() {
    const path = window.location.pathname;
    const validPath = routes[path] || routes[404];
    if(path === "/") {
        return;
    }
    const html = await fetch(validPath.source).then(data => data.text());
    document.getElementById('main-page').innerHTML = html;
}

function route(event) {
    event.preventDefault();
    window.history.pushState({}, "", event.target.getAttribute('router-link'));
    handleLocation();
}

const allElements = document.querySelectorAll('[router-link]');

for (let i = 0; i < allElements.length; i++) {
    allElements[i].addEventListener('click', route);
}

window.onpopstate = handleLocation;
window.onload = handleLocation;
