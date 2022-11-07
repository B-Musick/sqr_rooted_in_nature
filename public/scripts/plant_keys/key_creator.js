/********************** FILE LOADING *************************/
const inputElement = document.getElementById("fileItem"); // File input
let plotDropdown = document.getElementById('dropdown-list'); // Dropdown list

inputElement.addEventListener("change", (e) => {
    var file = document.getElementById('fileItem').files[0]; // Get the file input

    var reader = new FileReader(); // Read the file
    reader.readAsText(file); // Read the file as text
    reader.addEventListener('loadend', function () {
        console.log(reader.result);
        
        // Set this string to the input value which will be sent to the form
        let keyString = reader.result;
        // JSON.parse(keyString);

        // Parse string into JSON (maybe save it to object as string then do it?)
        // Save the form input as the string value
        let plantKeyInput = document.getElementById("plant-key-input");
        plantKeyInput.value = keyString;

        let plantKeyOutput = document.getElementById("show-json-file-output");

        // Try and format this into JSON object form
        plantKeyOutput.textContent = JSON.parse(keyString)["name"];

        // Can you save an input as JSON and store it as JSON?

        // let split = reader.result.split('\n'); // Split into array

    })
});