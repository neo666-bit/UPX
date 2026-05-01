const links = document.querySelectorAll('#sidebar-items a[data-page]');
const pages = document.querySelectorAll('.page');

links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        pages.forEach(p => p.classList.remove('active'));
        links.forEach(l => l.classList.remove('active'));

        const target = link.getAttribute('data-page');
        document.getElementById(`page-${target}`).classList.add('active');
        link.classList.add('active');
    });
});