document.addEventListener("DOMContentLoaded", function () {
  const passwordInput = document.getElementById('password');
  const toggleButton = document.getElementById('toggle-password');

  toggleButton.addEventListener('click', function () {
      if (passwordInput.type === 'password') {
          passwordInput.type = 'text';
      } else {
          passwordInput.type = 'password';
      }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const websiteInput = document.getElementById("website");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const submitButton = document.querySelector(".submit");
  const table = document.querySelector(".table");

  const passwords = JSON.parse(localStorage.getItem("passwords")) || [];

  function renderPasswords() {
      // Clear the table except for the header row
      while (table.rows.length > 1) {
          table.deleteRow(1);
      }

      passwords.forEach((password, index) => {
          const row = table.insertRow();
          const websiteCell = row.insertCell(0);
          const usernameCell = row.insertCell(1);
          const passwordCell = row.insertCell(2);
          const deleteCell = row.insertCell(3);

          websiteCell.textContent = password.website;
          usernameCell.textContent = password.username;
          let passwordDisplay = document.createElement('span');
          passwordDisplay.textContent = '*'.repeat(password.password.length);
          let eyeButton = document.createElement('button');
            eyeButton.textContent = '👁️';
            eyeButton.classList.add('eye-icon');
            eyeButton.addEventListener('click', function () {
                // Toggle between dots and actual password
                if (passwordDisplay.textContent.includes('*')) {
                    passwordDisplay.textContent = password.password; // Show actual password
                } else {
                    passwordDisplay.textContent = '*'.repeat(password.password.length); // Display dots
                }
              });
              passwordCell.appendChild(passwordDisplay);
              passwordCell.appendChild(eyeButton);

          deleteCell.innerHTML = `<button class="delete" data-index="${index}">Delete</button>`;
      });

      document.querySelectorAll(".delete").forEach(button => {
          button.addEventListener("click", deletePassword);
      });
  }

  function deletePassword(event) {
      const index = event.target.dataset.index;
      passwords.splice(index, 1);
      localStorage.setItem("passwords", JSON.stringify(passwords));
      renderPasswords();
  }

  function addPassword() {
      const website = websiteInput.value.trim();
      const username = usernameInput.value.trim();
      const password = passwordInput.value.trim();

      if (website && username && password) {
          passwords.push({ website, username, password });
          localStorage.setItem("passwords", JSON.stringify(passwords));
          renderPasswords();
          websiteInput.value = '';
          usernameInput.value = '';
          passwordInput.value = '';
      } else {
          alert("Please fill in all fields.");
      }
  }

  submitButton.addEventListener("click", addPassword);

  renderPasswords();
});

