document.getElementById('submitBtn').addEventListener('click', function () {
  const password = document.getElementById('password').value;
  const message = document.getElementById('message');

  if (password === 'VIP LOGIN') {
    // Redirect to Game.html
    window.location.href = 'select.html';
  } else {
    // Display error message
    message.textContent = 'Wrong password, genius! 🤦‍♂️🔐 Try again! 😂';
  }
});