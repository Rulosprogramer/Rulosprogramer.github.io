document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('subscription-form');
    const messageDiv = document.getElementById('subscription-message');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;

        try {
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email })
            });

            if (response.ok) {
                messageDiv.textContent = "¡Gracias por suscribirte!";
                messageDiv.classList.add('success');
                form.reset();
            } else {
                const errorData = await response.json();
                messageDiv.textContent = errorData.error || "Hubo un problema con la suscripción.";
                messageDiv.classList.add('error');
            }
        } catch (error) {
            console.error('Error:', error);
            messageDiv.textContent = "Hubo un problema con la suscripción. Por favor, inténtalo de nuevo.";
            messageDiv.classList.add('error');
        }
    });
});

document.getElementById('whatsapp-button').addEventListener('click', function (event) {
    event.preventDefault();
    window.open('https://wa.me/+573227093940', '_blank');
});



(() => {
    'use strict'

    const getStoredTheme = () => localStorage.getItem('theme')
    const setStoredTheme = theme => localStorage.setItem('theme', theme)

    const getPreferredTheme = () => {
        const storedTheme = getStoredTheme()
        if (storedTheme) {
            return storedTheme
        }

        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    const setTheme = theme => {
        if (theme === 'auto') {
            document.documentElement.setAttribute('data-bs-theme', (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
        } else {
            document.documentElement.setAttribute('data-bs-theme', theme)
        }
    }

    setTheme(getPreferredTheme())

    const showActiveTheme = (theme, focus = false) => {
        const themeSwitcher = document.querySelector('#bd-theme')

        if (!themeSwitcher) {
            return
        }

        const themeSwitcherText = document.querySelector('#bd-theme-text')
        const activeThemeIcon = document.querySelector('.theme-icon-active use')
        const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
        const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href')

        document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
            element.classList.remove('active')
            element.setAttribute('aria-pressed', 'false')
        })

        btnToActive.classList.add('active')
        btnToActive.setAttribute('aria-pressed', 'true')
        activeThemeIcon.setAttribute('href', svgOfActiveBtn)
        const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`
        themeSwitcher.setAttribute('aria-label', themeSwitcherLabel)

        if (focus) {
            themeSwitcher.focus()
        }
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        const storedTheme = getStoredTheme()
        if (storedTheme !== 'light' && storedTheme !== 'dark') {
            setTheme(getPreferredTheme())
        }
    })

    window.addEventListener('DOMContentLoaded', () => {
        showActiveTheme(getPreferredTheme())

        document.querySelectorAll('[data-bs-theme-value]')
            .forEach(toggle => {
                toggle.addEventListener('click', () => {
                    const theme = toggle.getAttribute('data-bs-theme-value')
                    setStoredTheme(theme)
                    setTheme(theme)
                    showActiveTheme(theme, true)
                })
            })
    })
})()

document.addEventListener('DOMContentLoaded', function () {
    const carouselButtons = document.querySelectorAll('.carousel-indicators button');

    carouselButtons.forEach(button => {
        button.addEventListener('click', function () {
            const currentActiveButton = document.querySelector('.carousel-indicators button.active');
            currentActiveButton.classList.remove('active');
            this.classList.add('active');
        });
    });

    var myCarousel = document.getElementById('carouselExampleFade');
    var carousel = new bootstrap.Carousel(myCarousel, {
        interval: 3000,
    });

    document.cookie = "cookieName=cookieValue; SameSite=None; Secure";
});

const swiper = new Swiper('.swiper', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        reverseDirection: false
    },
    coverFlowEffect: {
        depth: 500,
        modifier: 1,
        slidesShadows: true,
        rotate: 0,
        stretch: 0
    },
    direction: 'horizontal', // Por defecto, pero especificar explícitamente no hace daño
    on: {
        slideChangeTransitionEnd: function () {
            // Resetea el autoplay direction para asegurarte de que siempre sea hacia adelante
            swiper.autoplay.stop();
            swiper.autoplay.start();
        }
    }
});





