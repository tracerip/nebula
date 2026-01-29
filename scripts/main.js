document.addEventListener('DOMContentLoaded', () => {
    // Navigation Handling
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Prevent default behavior for demo links
            const href = item.getAttribute('href');
            if (href === '#' || href === '') e.preventDefault();

            // Remove active class from all
            navItems.forEach(nav => nav.classList.remove('active'));

            // Add active class to clicked
            item.classList.add('active');

            // Optional: In a real app, this would filter the feed or change views
            console.log(`Navigated to: ${item.querySelector('span')?.textContent}`);
        });
    });

    // Mobile Sidebar Toggle (Optional future enhancement, placeholder for now)
    // const menuBtn = document.querySelector('.menu-btn');
});
