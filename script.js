function updateChart() {
    const percentageInput = document.getElementById('percentageInput');
    const chartContainer = document.getElementById('chartContainer');
    const errorMessage = document.getElementById('errorMessage');
    const percentage = parseInt(percentageInput.value);

    // Clear error message on new input
    errorMessage.textContent = '';

    // Validate input percentage
    if (isNaN(percentage) || percentage < 0 || percentage > 100) {
        errorMessage.textContent = 'Please enter a valid percentage between 0 and 100.';
        return;
    }

    // Create a new bar for each valid input
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.width = `${percentage}%`;

    // Set the bar color based on percentage
    if (percentage >= 80) {
        bar.style.backgroundColor = 'green';
    } else if (percentage >= 50) {
        bar.style.backgroundColor = 'lightgreen';
    } else if (percentage >= 20) {
        bar.style.backgroundColor = 'yellow';
    } else {
        bar.style.backgroundColor = 'red';
    }

    // Create Edit button
    const editButton = document.createElement('button');
    editButton.classList.add('edit');
    editButton.innerText = 'Edit';
    editButton.onclick = () => editBar(bar);

    // Create Delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.onclick = () => deleteBar(bar);

    // Append buttons to bar
    bar.appendChild(editButton);
    bar.appendChild(deleteButton);

    // Add the bar to the chart container
    chartContainer.appendChild(bar);

    // Clear the input field after adding the bar
    percentageInput.value = '';
}

function deleteBar(bar) {
    bar.remove();
}

function editBar(bar) {
    const percentage = parseInt(prompt("Edit Percentage (0-100):"));
    
    // Validate the new percentage
    if (isNaN(percentage) || percentage < 0 || percentage > 100) {
        alert("Invalid percentage!");
        return;
    }

    bar.style.width = `${percentage}%`;

    // Set the bar color based on percentage
    if (percentage >= 80) {
        bar.style.backgroundColor = 'green';
    } else if (percentage >= 50) {
        bar.style.backgroundColor = 'lightgreen';
    } else if (percentage >= 20) {
        bar.style.backgroundColor = 'yellow';
    } else {
        bar.style.backgroundColor = 'red';
    }
}
