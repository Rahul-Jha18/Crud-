document.getElementById('loginForm').onsubmit = function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    let allRegData = JSON.parse(localStorage.getItem('allRegData')) || [];

    let user = allRegData.find(user => user.email === email && user.password === password);

    if (user) {
        Swal.fire({
            title: 'Success!',
            text: 'You have logged in successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#3085d6'
        }).then(() => {
            localStorage.setItem('loggedIn', JSON.stringify({ email: user.email }));
            window.location.href = 'dashboard.html'; // Redirect to a dashboard or main page after successful login
        });
    } else {
        Swal.fire({
            title: 'Login Failed!',
            text: 'Invalid email or password.',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#d33'
        });
    }
};
