document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');

    // Transición suave al hacer clic en los enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            if (link.href.split('/').pop() === window.location.pathname.split('/').pop()) {
                e.preventDefault();
                return;
            }
            document.body.style.transition = 'opacity 0.5s ease-in-out';
            document.body.style.opacity = '0';
            setTimeout(() => {
                window.location.href = link.href;
            }, 500);
        });
    });

    // Efecto de aparición en las tarjetas y otros elementos
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `fadeInUp 1s ease-out forwards`;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card, .movie-poster, .series-item, .extra-item').forEach(el => {
        el.style.opacity = '0'; // Inicialmente invisibles
        observer.observe(el);
    });
});

// Definir la animación en el CSS si no existe
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`;
document.head.appendChild(style);