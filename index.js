function openMenu() {
     document.body.classList += " menu--open"
}

function closeMenu() {
     document.body.classList.remove('menu--open')
}

// Landing page to product page redirect loading

document.getElementById('search-icon').addEventListener('click', function () {
     const icon = document.getElementById('icon');
     const spinner = document.getElementById('spinner');

     icon.style.display = 'none';
     spinner.style.display = 'block';

     setTimeout(() => {
          window.location.href = "products.html";
     }, 2000);
});
