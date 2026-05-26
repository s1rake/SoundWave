(function () {
    const initialTracks = [
        { artist: "Midnight velvet", title: "Broken satellite", cover: "", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
        { artist: "Midnight velvet", title: "Crystal echo", cover: "", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
        { artist: "Dua Lipa", title: "Levitating", cover: "", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
        { artist: "Glass Animals", title: "Heat Waves", cover: "", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" }
    ];

    const additionalTracks = [
        { artist: "Billie Eilish", title: "bad guy", cover: "", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
        { artist: "Post Malone", title: "Circles", cover: "", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
        { artist: "Tame Impala", title: "The Less I Know", cover: "", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
        { artist: "Arctic Monkeys", title: "Do I Wanna Know?", cover: "", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" }
    ];

    let currentTrackCount = initialTracks.length;
    const maxTracks = initialTracks.length + additionalTracks.length;

    const tracksContainer = document.getElementById('tracksContainer');
    const showMoreBtn = document.getElementById('showMoreBtn');

    function renderTracks(trackList) {
        trackList.forEach(track => {
            const card = document.createElement('div');
            card.className = 'track-card';
            card.innerHTML = `
            <div class="card-image">${track.cover}</div>
            <div class="card-info">
              <h3>${track.title}</h3>
              <p>${track.artist}</p>
              <audio controls class="audio-player">
                <source src="${track.audio}" type="audio/mpeg">
                Ваш браузер не поддерживает аудио.
              </audio>
            </div>
          `;
            tracksContainer.appendChild(card);
        });
    }

    renderTracks(initialTracks);

    showMoreBtn.addEventListener('click', function () {
        if (currentTrackCount < maxTracks) {
            renderTracks(additionalTracks);
            currentTrackCount = maxTracks;
            showMoreBtn.style.display = 'none';
        }
    });

    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeText');
    const htmlElement = document.documentElement;

    function setTheme(theme) {
        if (theme === 'dark') {
            htmlElement.setAttribute('data-theme', 'dark');
            themeIcon.textContent = '☀️';
            themeText.textContent = 'Светлая';
        } else {
            htmlElement.removeAttribute('data-theme');
            themeIcon.textContent = '🌙';
            themeText.textContent = 'Темная';
        }
    }

    const savedTheme = localStorage.getItem('soundwave-theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        setTheme('light');
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('soundwave-theme', newTheme);
    });

    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function clearErrors() {
        nameError.textContent = '';
        emailError.textContent = '';
        messageError.textContent = '';
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        clearErrors();
        let isValid = true;

        const nameValue = nameInput.value.trim();
        const emailValue = emailInput.value.trim();
        const messageValue = messageInput.value.trim();

        if (nameValue === '') {
            nameError.textContent = 'Введите имя';
            isValid = false;
        } else if (nameValue.length < 2) {
            nameError.textContent = 'Имя слишком короткое';
            isValid = false;
        }

        if (emailValue === '') {
            emailError.textContent = 'Введите email';
            isValid = false;
        } else if (!validateEmail(emailValue)) {
            emailError.textContent = 'Некорректный email (example@domain.com)';
            isValid = false;
        }

        if (messageValue === '') {
            messageError.textContent = 'Напишите сообщение';
            isValid = false;
        } else if (messageValue.length < 10) {
            messageError.textContent = 'Минимум 10 символов';
            isValid = false;
        }

        if (isValid) {

            console.log('📬 Данные формы обратной связи:');
            console.log('Имя:', nameValue);
            console.log('Email:', emailValue);
            console.log('Сообщение:', messageValue);

            alert('Спасибо! Данные отправлены (подробнее в консоли).');
            form.reset();
            clearErrors();
        }
    });
})();