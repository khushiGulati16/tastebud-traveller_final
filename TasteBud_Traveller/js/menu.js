let currentCategory = 'All';

document.addEventListener('DOMContentLoaded', () => {
  const categoryItems = document.querySelectorAll('.category-item');

  categoryItems.forEach(item => {
    item.addEventListener('click', () => {
      // Remove active class from all
      categoryItems.forEach(c => c.classList.remove('active'));
      // Add active class to clicked
      item.classList.add('active');

      // Set current category text
      currentCategory = item.querySelector('span').innerText;
      filterMenu();
    });
  });

  // We can also bind search info here instead of inline onkeyup
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', searchMenu);
  }
});

// the global function called either by inline onkeyup or the listener
function searchMenu() {
  filterMenu();
}

function filterMenu() {
  const searchInput = document.getElementById('searchInput');
  const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
  const menuItems = document.querySelectorAll('.menu-item-card');

  menuItems.forEach(item => {
    const itemName = item.querySelector('.menu-card-title').innerText.toLowerCase();

    let matchesCategory = false;
    if (currentCategory === 'All') {
      matchesCategory = true;
    } else if (currentCategory === 'Burgers' && itemName.includes('burger')) {
      matchesCategory = true;
    } else if (currentCategory === 'Pizza' && itemName.includes('pizza')) {
      matchesCategory = true;
    } else if (currentCategory === 'Pasta' && itemName.includes('pasta')) {
      matchesCategory = true;
    } else if (currentCategory === 'Noodles' && itemName.includes('noodle')) {
      matchesCategory = true;
    } else if (currentCategory === 'Momos' && itemName.includes('momo')) {
      matchesCategory = true;
    } else if (currentCategory === 'Desserts' && (itemName.includes('cake') || itemName.includes('pastry') || itemName.includes('lava') || itemName.includes('coffee'))) {
      matchesCategory = true;
    }

    const matchesSearch = itemName.includes(searchTerm);

    if (matchesCategory && matchesSearch) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
}