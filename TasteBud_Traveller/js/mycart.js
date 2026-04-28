const modal = document.getElementById('deliveryModal');
const openModalButton = document.getElementById('deliverHere');
const closeButton = document.querySelector('.close-button');
openModalButton.onclick = function() {
  modal.style.display = 'flex';
};
closeButton.onclick = function() {
  modal.style.display = 'none';
};
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};