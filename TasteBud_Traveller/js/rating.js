// Animate rating numbers on page load
document.addEventListener('DOMContentLoaded', function() {
    const ratingNumbers = document.querySelectorAll('.rating-number');
    ratingNumbers.forEach((number) => {
        let targetNumber = parseInt(number.innerText);
        let currentNumber = 0;
        const increment = Math.ceil(targetNumber / 100); // Increment value

        const timer = setInterval(() => {
            if (currentNumber < targetNumber) {
                currentNumber += increment;
                if (currentNumber > targetNumber) {
                    currentNumber = targetNumber; // Cap to target
                }
                number.innerText = currentNumber; // Update number
            } else {
                clearInterval(timer); // Stop timer when complete
            }
        }, 20); // Update every 20 milliseconds
    });

    // Add click events to rating items
    const ratingItems = document.querySelectorAll('.rating-item');
    ratingItems.forEach(item => {
        item.addEventListener('click', () => {
            const ratingInfo = item.getAttribute('data-rating');
            alert(`You selected: ${ratingInfo}`);
        });
    });
});