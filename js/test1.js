
const modal = document.getElementById('modal');
const openbtn = document.getElementById('openbtn');
const closebtn = document.getElementById('closeModalBtn');

openbtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

closebtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});


const formTitle = document.getElementById('formTitle');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordGroup = document.getElementById('confirmPasswordGroup');
const confirmPasswordInput = document.getElementById('confirmPassword');
const actionBtn = document.getElementById('actionBtn');
const switchBtn = document.getElementById('switchBtn');
const message = document.getElementById('message');

let isLogin = true; 

window.onload = () => {
    if (isLogin) {
        formTitle.innerText = 'Login';
        actionBtn.innerText = 'Login';
        confirmPasswordGroup.style.display = 'none'; 
        switchBtn.innerText = 'Switch to Sign Up';
        
    }
};

switchBtn.addEventListener('click', () => {
    isLogin = !isLogin;
    if (isLogin) {
        formTitle.innerText = 'Login';
        actionBtn.innerText = 'Login';
        confirmPasswordGroup.style.display = 'none';
        switchBtn.innerText = 'Switch to Sign Up';
    } else {
        formTitle.innerText = 'Sign Up';
        actionBtn.innerText = 'Sign Up';
        confirmPasswordGroup.style.display = 'block';
        switchBtn.innerText = 'Switch to Login';
    }
    message.innerText = ''; 
});

actionBtn.addEventListener('click', () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    if (!email || !password) {
        message.innerText = 'Please fill out all fields';
        return;
    }

    if (isLogin) {
       
        const storedUser = JSON.parse(localStorage.getItem(email));

        if (!storedUser) {
            message.innerText = 'User not found!';
        } else if (storedUser.password !== password) {
            message.innerText = 'Incorrect password!';
        } else {
            message.innerText = 'Login successful!';
            message.classList.remove('error');
            message.classList.add('success');
        }
    } else {
        
        if (password !== confirmPassword) {
            message.innerText = 'Passwords do not match!';
            return;
        }

        const existingUser = localStorage.getItem(email);
        if (existingUser) {
            message.innerText = 'User already exists!';
        } else {
            
            localStorage.setItem(email, JSON.stringify({ email, password }));
            message.innerText = 'Signup successful!';
            message.classList.remove('error');
            message.classList.add('success');
        }
    }
});

    document.getElementById('button-13').addEventListener('click', function () {
      const bottomSection = document.getElementById('get-start');
      bottomSection.scrollIntoView({ behavior: 'smooth' });
    });