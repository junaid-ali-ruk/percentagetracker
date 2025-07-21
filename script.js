
let bars = JSON.parse(localStorage.getItem('bars')) || [];
let editingIndex = -1;

function loadBars() {
    renderBars();
}

function saveBarsToLocalStorage() {
    localStorage.setItem('bars', JSON.stringify(bars));
}

function getColorForPercentage(percentage) {
    if (percentage >= 80) {
        return 'linear-gradient(135deg, #51cf66 0%, #40c057 100%)';
    } else if (percentage >= 60) {
        return 'linear-gradient(135deg, #8ce99a 0%, #69db7c 100%)';
    } else if (percentage >= 40) {
        return 'linear-gradient(135deg, #a9e34b 0%, #94d82d 100%)';
    } else if (percentage >= 20) {
        return 'linear-gradient(135deg, #d0f4de 0%, #a3e635 100%)';
    } else {
        return 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)';
    }
}

function showMessage(message, type = 'error') {
    const container = document.getElementById('messageContainer');
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'error' ? 'error-message' : 'success-message';
    messageDiv.textContent = message;

    container.innerHTML = '';
    container.appendChild(messageDiv);

    setTimeout(() => {
        container.innerHTML = '';
    }, 4000);
}

function addBar() {
    const input = document.getElementById('percentageInput');
    const percentage = parseFloat(input.value);

    if (isNaN(percentage) || percentage < 0) {
        showMessage('Please enter a valid percentage between 0 and 100!');
        return;
    }

    if (percentage > 100) {
        showMessage('Invalid input! Percentage cannot be greater than 100%.');
        return;
    }

    const now = new Date();
    const bar = {
        id: Date.now(),
        percentage: percentage,
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString(),
        color: getColorForPercentage(percentage)
    };

    bars.push(bar);
    input.value = '';
    renderBars();
    saveBarsToLocalStorage();
    showMessage(`Bar with ${percentage}% added successfully!`, 'success');
}

function renderBars() {
    const container = document.getElementById('barsContainer');

    if (bars.length === 0) {
        container.innerHTML =
            `<div class="empty-state">
                <h3>Please craete a bar</h3>
                <p>Add your first percentage bar</p>
            </div>`;
        return;
    }

    container.innerHTML = bars.reverse().map((bar, index) =>
        `<div class="bar-item" style="animation: slideIn 0.5s ease-out ${index * 0.1}s both;">
            <div class="bar-header">
                <div class="bar-info">
                    <div class="percentage-display">${bar.percentage}%</div>
                    <div class="date-time">
                        📅 ${bar.date}<br>
                        🕐 ${bar.time}
                    </div>
                </div>
                <div class="bar-actions">
                    <button class="btn btn-warning btn-small" onclick="editBar(${index})">
                         Edit
                    </button>
                    <button class="btn btn-danger btn-small" onclick="deleteBar(${index})">
                         Delete
                    </button>
                </div>
            </div>
            <div class="bar-container">
                <div class="bar-fill" style="width: ${bar.percentage}%; background: ${bar.color};"></div>
            </div>
        </div>`
    ).join('');
}

function editBar(index) {
    editingIndex = index;
    const bar = bars[index];
    document.getElementById('editPercentageInput').value = bar.percentage;
    document.getElementById('editModal').style.display = 'block';
}

function saveEdit() {
    const input = document.getElementById('editPercentageInput');
    const percentage = parseFloat(input.value);

    if (isNaN(percentage) || percentage < 0) {
        showMessage('Please enter a valid percentage between 0 and 100!');
        return;
    }

    if (percentage > 100) {
        showMessage('Invalid input! Percentage cannot be greater than 100%.');
        return;
    }

    bars[editingIndex].percentage = percentage;
    bars[editingIndex].color = getColorForPercentage(percentage);

    closeModal();
    renderBars();
    saveBarsToLocalStorage();
    showMessage('Bar updated successfully!', 'success');
}

function closeModal() {
    document.getElementById('editModal').style.display = 'none';
    editingIndex = -1;
}

function deleteBar(index) {
    if (confirm('Are you sure you want to delete this bar?')) {
        bars.splice(index, 1);
        renderBars();
        saveBarsToLocalStorage();
        showMessage('Bar deleted successfully!', 'success');
    }
}


document.getElementById('percentageInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addBar();
    }
});

document.getElementById('editPercentageInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        saveEdit();
    }
});


document.getElementById('editModal').addEventListener('click', function (e) {
    if (e.target === this) {
        closeModal();
    }
});


loadBars();
