// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxenI8kt5sfN6M44odjQtbZzztVlns__s",
  authDomain: "guesthegame.firebaseapp.com",
  projectId: "guesthegame",
  storageBucket: "guesthegame.appspot.com",
  messagingSenderId: "879070449307",
  appId: "1:879070449307:web:0647e57eb9aaca6047803e",
  measurementId: "G-F1CYXYNVB1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let targetNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

function makeGuess() {
  let userGuess = parseInt(document.getElementById('guessInput').value);
  attempts++;
  let feedback = '';

  if (userGuess < targetNumber) {
    feedback = 'Too low! Try again.';
  } else if (userGuess > targetNumber) {
    feedback = 'Too high! Try again.';
  } else if (userGuess === targetNumber) {
    feedback = `Congratulations! You guessed the number ${targetNumber} in ${attempts} attempts.`;
    targetNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
  } else {
    feedback = 'Please enter a valid number.';
  }

  document.getElementById('feedback').textContent = feedback;
}

function showSignup() {
  document.getElementById('loginContainer').style.display = 'none';
  document.getElementById('signupContainer').style.display = 'block';
  document.getElementById('forgotPasswordContainer').style.display = 'none';
}

function showLogin() {
  document.getElementById('signupContainer').style.display = 'none';
  document.getElementById('loginContainer').style.display = 'block';
  document.getElementById('forgotPasswordContainer').style.display = 'none';
}

function showForgotPassword() {
  document.getElementById('loginContainer').style.display = 'none';
  document.getElementById('signupContainer').style.display = 'none';
  document.getElementById('forgotPasswordContainer').style.display = 'block';
}

function loginUser() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert('Login successful!');
      document.getElementById('loginContainer').style.display = 'none';
      document.getElementById('gameContainer').style.display = 'block';
    })
    .catch((error) => {
      alert('Invalid email or password.');
    });

  return false;
}

function signupUser() {
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert('Sign up successful!');
      showLogin();
    })
    .catch((error) => {
      console.error('Error during sign up:', error);
      alert('Error signing up: ' + error.message);
    });

  return false;
}

function sendPasswordReset() {
  const email = document.getElementById('forgotPasswordEmail').value;

  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      alert('Password reset email sent!');
      showLogin();
    })
    .catch((error) => {
      console.error('Error during password reset:', error);
      alert('Error sending password reset email: ' + error.message);
    });

  return false;
}

function logoutUser() {
  firebase.auth().signOut().then(() => {
    document.getElementById('gameContainer').style.display = 'none';
    document.getElementById('loginContainer').style.display = 'block';
    document.getElementById('loginForm').reset();
  });
}
