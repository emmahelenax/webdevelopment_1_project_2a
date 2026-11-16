const result = document.querySelector("#result");
const dropdown = document.querySelector("#characterSelect");

let characters = [];

// Adding an event listener that loads the characters when page is opened
window.addEventListener("load", getCharacters);

// Show character info when user selects one
dropdown.addEventListener("change", showCharacter);

async function getCharacters() {
    // Reset dropdown
    dropdown.innerHTML =
        '<option value="">Select a character...</option>';

    // Fetching character data from the API
    const response = await fetch(
        "https://the-one-api.dev/v2/character",
        {
            headers: {
                Authorization: "Bearer NpPRY29pWMO1NIXoMZUs"
            }
        }
    );

    // Wait response before continuing
    const data = await response.json();

    console.log(data);

    // Save character information from API
    characters = data.docs;

    // Add character names to dropdown
    characters.forEach(character => {
        const option = document.createElement("option");

        option.value = character._id;
        option.textContent = character.name;

        dropdown.appendChild(option);
    });
}
// Get ID of character selected

function showCharacter() {
    const selectedId = dropdown.value;

    // Find the character whose ID matches the selected dropdown value
    const character = characters.find(
        character => character._id === selectedId
    );

    // Check if character was found
    if (!character) {
        return;
    }

    // Display selected character's information, show unknown if not found 
    result.innerHTML = `
        <h2>${character.name}</h2>
        <p><strong>Race:</strong> ${character.race || "Unknown"}</p>
        <p><strong>Gender:</strong> ${character.gender || "Unknown"}</p>
        <p><strong>Realm:</strong> ${character.realm || "Unknown"}</p>
        <p><strong>Birth:</strong> ${character.birth || "Unknown"}</p>
    `;
}