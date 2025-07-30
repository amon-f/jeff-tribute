
    // 🛠️ Replace this with your actual Firebase config
    const firebaseConfig = {
        apiKey: "AIzaSyCOiSviIOwZ3KJohirUtWM_QSdTh_-gKAc",
        authDomain: "jefftributes.firebaseapp.com",
        projectId: "jefftributes",
        storageBucket: "jefftributes.firebasestorage.app",
        messagingSenderId: "312715553870",
        appId: "1:312715553870:web:322b5fe77dfbefdb28671f"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const db = firebase.database();

    const form = document.getElementById('tributeForm');
    const tributeList = document.getElementById('tributeList');

    // Handle form submission
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const message = document.getElementById('message').value.trim();
      if (name && message) {
        db.ref('tributes').push({ name, message });
        form.reset();
      }
    });

    // Listen for new tributes
    db.ref('tributes').on('child_added', function(snapshot) {
      const tribute = snapshot.val();
      const div = document.createElement('div');
      div.className = 'tribute';
      div.innerHTML = `<h4>${tribute.name}</h4><p>${tribute.message}</p>`;
      tributeList.prepend(div);
    });