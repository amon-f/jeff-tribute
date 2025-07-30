// 🛠️ Replace this with your actual Firebase config
    const firebaseConfig = {
        apiKey: "AIzaSyCOiSviIOwZ3KJohirUtWM_QSdTh_-gKAc",
        authDomain: "jefftributes.firebaseapp.com",
        projectId: "jefftributes",
        storageBucket: "jefftributes.appspot.com", // <-- fixed typo
        messagingSenderId: "312715553870",
        appId: "1:312715553870:web:322b5fe77dfbefdb28671f"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Reference to tributes in Firebase
    const db = firebase.database();
    const tributesRef = db.ref('tributes');

    const form = document.getElementById('tributeForm');
    const tributeList = document.getElementById('tributeList');

    // Listen for new tributes and update the list
    tributesRef.on('value', (snapshot) => {
      const tributes = snapshot.val();
      tributeList.innerHTML = '';
      if (tributes) {
        Object.values(tributes).forEach(t => {
          const div = document.createElement('div');
          div.innerHTML = `<strong>${t.name}</strong>: ${t.message}`;
          tributeList.appendChild(div);
        });
      } else {
        tributeList.innerHTML = 'No tributes yet.';
      }
    });

    // Handle form submission
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const message = document.getElementById('message').value.trim();
      if (name && message) {
        tributesRef.push({ name, message });
        form.reset();
      }
    });