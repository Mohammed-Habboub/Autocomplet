const input = document.getElementById('autocomplete-input');
const suggestionsList = document.getElementById('suggestions');

input.addEventListener('input', () => {
    const userInput = input.value.trim().toLowerCase();
    
    // Clear previous suggestions
    suggestionsList.innerHTML = '';

    if (userInput === '') {
        // If the input is empty, hide the dropdown
        hideDropdown();
    } else {
        // Make a request to the Express.js server for suggestions
        fetch(`/autocomplete?input=${userInput}`)
          .then(response => response.json())
          .then(data => {
            data.forEach(word => {
              const listItem = document.createElement('li');
              listItem.textContent = word;
              suggestionsList.appendChild(listItem);

              // Handle click on suggestion
              listItem.addEventListener('click', () => {
                  input.value = word;
                  hideDropdown();
              });
            });

            // Display suggestions list if there are suggestions
            if (data.length > 0) {
                suggestionsList.style.display = 'block';
            } else {
                suggestionsList.style.display = 'none';
            }
          })
          .catch(error => console.error('Error loading suggestions:', error));
    }
});

function hideDropdown() {
    suggestionsList.style.display = 'none';
}
