const ratings = document.querySelectorAll('.rating')
const ratingsContainer = document.querySelector('.ratings-container')
const sendBtn = document.querySelector('#send')
const panel = document.querySelector('#panel')
let selectedRating = 'Satisfied'

ratingsContainer.addEventListener('click', (e) => {
    if (e.target.parentNode.classList.contains('rating')) {
        removeActive()
        e.target.parentNode.classList.add('active')
        selectedRating = e.target.nextElementSibling.innerHTML
    }
    if (e.target.classList.contains('rating')) {
        removeActive()
        e.target.classList.add('active')
        selectedRating = e.target.nextElementSibling.innerHTML
    }

})

sendBtn.addEventListener('click', (e) => {
    panel.innerHTML = `
        
        <div class="h-100 d-flex flex-column justify-content-center align-items-center">
            <i class="fas fa-check-circle fa-4x text-success mb-4 mt-4"></i>
            <h3 class="fw-bold mb-3" style="color: #2c3e50;">Thank You!</h3>
            <p class="mb-4" style="font-size: 1.1rem;">Feedback: <strong>${selectedRating}</strong></p>
            <p class="text-muted" style="font-size: 0.95rem;">We'll use your feedback to improve our customer support.</p>
            <a href="index.html" class="btn btn-brand py-2 px-4 mt-4"><i class="fas fa-home me-2"></i>Back to Home</a>
        </div>
    `
})

function removeActive() {
    for (let i = 0; i < ratings.length; i++) {
        ratings[i].classList.remove('active')
    }
}