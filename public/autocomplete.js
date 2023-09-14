const input = document.getElementById('autocomplete-input');
const suggestionsList = document.getElementById('suggestions');
let dictionaryData = [];

// Load the dictionary data
fetch('/dictionary.json')
  .then(response => response.json())
  .then(data => {
    dictionaryData = data;
  })
  .catch(error => console.error('Error loading dictionary data:', error));

  input.addEventListener('input', () => {
    const userInput = input.value.trim().toLowerCase();
    
    // Clear previous suggestions
    suggestionsList.innerHTML = '';

    if (userInput === '') {
        // If the input is empty, hide the dropdown
        hideDropdown();
    } else {
        // Show suggestions that start with user input
        const suggestions = dictionaryData.filter(word =>
            word.toLowerCase().startsWith(userInput)
        );

        suggestions.forEach(word => {
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
        if (suggestions.length > 0) {
            suggestionsList.style.display = 'block';
        } else {
            suggestionsList.style.display = 'none';
        }
    }
});