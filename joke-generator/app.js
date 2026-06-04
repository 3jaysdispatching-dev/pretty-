class JokeGenerator {
    constructor() {
        this.apiUrl = 'https://official-joke-api.appspot.com/jokes/';
        this.jokeCount = 0;
        this.currentJoke = null;
        this.init();
    }

    init() {
        this.getJokeBtn = document.getElementById('getJokeBtn');
        this.copyBtn = document.getElementById('copyBtn');
        this.shareBtn = document.getElementById('shareBtn');
        this.jokeTypeSelect = document.getElementById('jokeTypeSelect');
        this.jokeText = document.getElementById('jokeText');
        this.jokeTypeDisplay = document.getElementById('jokeType');
        this.loadingEl = document.getElementById('loading');
        this.errorEl = document.getElementById('error');
        this.errorText = document.getElementById('errorText');
        this.jokeCountEl = document.getElementById('jokeCount');

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.getJokeBtn.addEventListener('click', () => this.fetchJoke());
        this.copyBtn.addEventListener('click', () => this.copyToClipboard());
        this.shareBtn.addEventListener('click', () => this.shareJoke());
    }

    async fetchJoke() {
        this.toggleLoading(true);
        this.hideError();
        
        const selectedType = this.jokeTypeSelect.value;
        const endpoint = selectedType === 'any' ? 'random' : `${selectedType}/random`;

        try {
            const response = await fetch(`${this.apiUrl}${endpoint}`);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            const jokeData = Array.isArray(data) ? data[0] : data;
            
            if (!jokeData || (!jokeData.joke && !jokeData.setup)) {
                throw new Error('Received an invalid joke format.');
            }

            this.displayJoke(jokeData);
        } catch (error) {
            console.error('Failed to fetch joke:', error);
            this.showError('Oops! Failed to grab a joke. Check your connection and try again.');
        } finally {
            this.toggleLoading(false);
        }
    }

    displayJoke(joke) {
        this.currentJoke = joke;
        
        if (joke.type === 'single' || joke.joke) {
            this.jokeText.innerHTML = this.escapeHtml(joke.joke);
        } else {
            this.jokeText.innerHTML = `
                <strong>${this.escapeHtml(joke.setup)}</strong>
                <br><br>
                <em style="color: #ffe0e0; font-size: 1.1em; font-style: normal;">👉 ${this.escapeHtml(joke.punchline)}</em>
            `;
        }

        this.jokeTypeDisplay.textContent = `Type: ${joke.type || this.jokeTypeSelect.value}`;
        this.copyBtn.disabled = false;
        this.shareBtn.disabled = !navigator.share; 
        
        this.jokeCount++;
        this.jokeCountEl.textContent = this.jokeCount;
    }

    async copyToClipboard() {
        if (!this.currentJoke) return;
        const jokeString = this.getPlainTextJoke();
        try {
            await navigator.clipboard.writeText(jokeString);
            const originalText = this.copyBtn.textContent;
            this.copyBtn.textContent = 'Copied! ✅';
            setTimeout(() => this.copyBtn.textContent = originalText, 2000);
        } catch (err) {
            console.error('Could not copy text: ', err);
        }
    }

    async shareJoke() {
        if (!this.currentJoke || !navigator.share) return;
        try {
            await navigator.share({
                title: 'Check out this joke! 😂',
                text: this.getPlainTextJoke(),
                url: window.location.href
            });
        } catch (err) {
            if (err.name !== 'AbortError') console.error('Error sharing:', err);
        }
    }

    getPlainTextJoke() {
        if (this.currentJoke.joke) return this.currentJoke.joke;
        return `${this.currentJoke.setup} - ${this.currentJoke.punchline}`;
    }

    toggleLoading(isLoading) {
        this.loadingEl.style.display = isLoading ? 'flex' : 'none';
        this.getJokeBtn.disabled = isLoading;
    }

    showError(message) {
        this.errorText.textContent = message;
        this.errorEl.style.display = 'block';
        this.jokeText.textContent = 'Click "Get Joke" to try again!';
        this.jokeTypeDisplay.textContent = '';
        this.copyBtn.disabled = true;
        this.shareBtn.disabled = true;
    }

    hideError() {
        this.errorEl.style.display = 'none';
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new JokeGenerator();
});
