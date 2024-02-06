const formContainer = document.getElementById('form');
const createUserButton = document.getElementById('create-user-button');
const appNav = document.getElementById('app-nav');
const appContent = document.getElementById('app-content');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const userOrder = {
    user: localStorage.getItem('user'),
    token: '1234key1234',
  };

function init() {
    if (localStorage.getItem('user')) {
        console.log('is logged in');
        renderAppNav();
    } else {
        console.log('is not logged in');
        renderLogInForm();
    }
}

function renderAppNav() {
    const logOutButton = document.createElement('button');
    const productsButton = document.createElement('button');
    const ordersButton = document.createElement('button');
    const shoppingCartButton = document.createElement('button');

    logOutButton.classList.add('nav');
    productsButton.classList.add('nav');
    shoppingCartButton.classList.add('nav');
    ordersButton.classList.add('nav');

    ordersButton.innerHTML = 'dina ordrar';
    productsButton.innerHTML = 'våra produkter';
    shoppingCartButton.innerHTML = 'din varukorg';
    logOutButton.innerHTML = 'logga ut';

    appNav.append(productsButton, shoppingCartButton, ordersButton, logOutButton);

    productsButton.addEventListener('click', () => {
        fetchProducts();
    });

    shoppingCartButton.addEventListener('click', () => {
        // user orders
    });

    logOutButton.addEventListener('click', () => {
        localStorage.removeItem('user');
        appContent.innerHTML = "";
        init();
    });
}

createUserButton.addEventListener('click', () => {
    const nameInput = document.getElementById('input-name');
    const emailInput = document.getElementById('input-email');
    const passwordInput = document.getElementById('input-password');

    if (
        nameInput.value === '' ||
        emailInput.value === '' ||
        passwordInput.value === '' ||
        !emailInput.value.match('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$')
      ) {
        console.log('You must fill in the fields correctly');
        return;
      }

    const newUser = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
    };

    createUser(newUser);
    nameInput.innerHTML = '';
    emailInput.innerHTML = '';
    passwordInput.innerHTML = '';
});

async function createUser(newUser) {
    await fetch('http://localhost:3000/api/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
    })
    .then((res) => res.json());
    console.log('User created');
}

function renderLogInForm() {
    const emailInput = document.createElement('input');
    const passwordInput = document.createElement('input');
    const logInUserButton = document.createElement('button');

    emailInput.placeholder = 'e-post';
    passwordInput.placeholder = 'lösenord';

    passwordInput.type = 'password';
    emailInput.type = 'email';

    appNav.innerHTML = '<h2>Logga in</h2>';
    logInUserButton.innerHTML = 'Skicka';

    appNav.append(emailInput, passwordInput, logInUserButton);

    logInUserButton.addEventListener('click', () => {
        if (
            emailInput.value === '' ||
            passwordInput.value === '' ||
            !emailInput.value.match('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$')
        ) {
            console.log('You must fill in the fields correctly');
            return;
        }

        let user = {
            email: emailInput.value,
            password: passwordInput.value,
        };

        logInUser(user);
        appNav.innerHTML = '';
    });
}

async function logInUser(user) {
    await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    })
    .then((res) => res.json())
    .then((loggedUser) => {
        if (loggedUser) {
            localStorage.setItem('user', loggedUser);
            init();
        } else {
            console.log('Failed logged in');
        }
    });
}

async function fetchProducts() {
    await fetch('http://localhost:3000/api/products')
    .then((res) => res.json().then((data) => {
        renderProducts(data);
    })
    );
}

function renderProducts(data) {
    appContent.innerHTML = '';

    appContent.innerHTML = '<h2>produkter</h2>';
    for (let i = 0; i < data.length; i++) {
        const productContainer = document.createElement('div');
        productContainer.classList.add('product-card');
        const addToCartButton = document.createElement('button');
        addToCartButton.classList.add('add-to-cart-button');

        addToCartButton.innerHTML = 'lägg till i varukogen';
        appContent.appendChild(productContainer);

        productContainer.innerHTML += `<h3>${data[i].name}</h3>${data[i].description}<br/>
        <img src="./img/robot.webp" loading="lazy" width="100" height="100" alt="robot"><br/>
        pris: ${data[i].price} kr <br/> 
        lagerstatus: ${data[i].lager} st <br/>`;

        productContainer.appendChild(addToCartButton);

        addToCartButton.addEventListener('click', () => {
            const product = data[i]._id;

            addProductToCart(product);
        });
    }
}

async function addProductToCart() {

}



init();