/**
 * @description: This will deal with the logic of clicking the filter button and 
 * either showing or hiding the filter form.
 * 
 * * It will toggle between a display: flex and display: none
 */

let filterFormContainer = document.getElementById("filter-form-container");

// Toggle button which user clicks to toggle the filter on and off
let filterToggleButton = document.getElementById("filter-toggle-button");

filterToggleButton.addEventListener('click',()=>{
    filterFormContainer.classList.toggle("filter-form-container-hidden");
    filterToggleButton.classList.toggle("filter-button-pressed");
    // filterFormContainer.classList.toggle('filter-form-container-flex');
    console.log("press");

})