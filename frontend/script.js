const formContainer = document.getElementById('form');
const createUserButton = document.getElementById('create-user-button');
const appNav = document.getElementById('app-nav');
const appContent = document.getElementById('app-content');




function init() {
    if (localStorage.getItem('user')) {
        console.log('is logged in');
    } else {
        console.log('is not logged in');
        renderLogInForm();
    }
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

    logInUserButton.textContent = 'logga in';

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

init();