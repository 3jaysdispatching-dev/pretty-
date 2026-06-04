class JokeGenerator {
    constructor() {
        this.apiUrl = 'https://official-joke-api.appspot.com/jokes/';
        this.jokeCount = 0;
        this.currentJoke = null;
        this.init();
    }

    init() {
        // Cache DOM elements
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

        // Validate that all required DOM elements exist
        if (!this.getJokeBtn || !this.jokeText) {
            console.error('Required DOM elements not found');
            return;
        }

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.getJokeBtn.addEventListener('click', () => this.fetchJoke());
        
        // Only add listeners if elements exist
        if (this.copyBtn) {
            this.copyBtn.addEventListener('click', () => this.copyToClipboard());
        }
        if (this.shareBtn) {
            this.shareBtn.addEventListener('click', () => this.shareJoke());
        }
    }

    async fetchJoke() {
        this.toggleLoading(true);
        this.hideError();
        
        const selectedType = this.jokeTypeSelect?.value || 'any';
        // Build URL based on dropdown selection
        const endpoint = selectedType === 'any' ? 'random' : `${selectedType}/random`;

        try {
            const response = await fetch(`${this.apiUrl}${endpoint}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            
            // Handle both array responses and single object responses safely
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
        
        // Some jokes come as a single string ('joke'), others come as 'setup' + 'punchline'
        if (joke.type === 'single' || joke.joke) {
            this.jokeText.innerHTML = this.escapeHtml(joke.joke);
        } else {
            this.jokeText.innerHTML = `
                <strong>${this.escapeHtml(joke.setup)}</strong>
                <br><br>
                <em style="color: #ffe0e0; font-size: 1.1em;">${this.escapeHtml(joke.punchline)}</em>
            `;
        }

        // Update UI states safely
        if (this.jokeTypeDisplay) {
            this.jokeTypeDisplay.textContent = `Type: ${joke.type || this.jokeTypeSelect?.value || 'unknown'}`;
        }
        
        if (this.copyBtn) {
            this.copyBtn.disabled = false;
        }
        
        if (this.shareBtn) {
            this.shareBtn.disabled = !navigator.share; // Enable share button only if Web Share API is supported
        }
        
        this.jokeCount++;
        if (this.jokeCountEl) {
            this.jokeCountEl.textContent = this.jokeCount;
        }
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
            this.showError('Failed to copy joke to clipboard.');
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
            // Ignore abort errors caused by user canceling the share menu
            if (err.name !== 'AbortError') {
                console.error('Error sharing:', err);
            }
        }
    }

    getPlainTextJoke() {
        if (this.currentJoke.joke) {
            return this.currentJoke.joke;
        }
        return `${this.currentJoke.setup} - ${this.currentJoke.punchline}`;
    }

    toggleLoading(isLoading) {
        if (this.loadingEl) {
            this.loadingEl.style.display = isLoading ? 'flex' : 'none';
        }
        this.getJokeBtn.disabled = isLoading;
    }

    showError(message) {
        if (this.errorText) {
            this.errorText.textContent = message;
        }
        if (this.errorEl) {
            this.errorEl.style.display = 'block';
        }
        this.jokeText.textContent = 'Click "Get Joke" to try again!';
        if (this.jokeTypeDisplay) {
            this.jokeTypeDisplay.textContent = '';
        }
        if (this.copyBtn) {
            this.copyBtn.disabled = true;
        }
        if (this.shareBtn) {
            this.shareBtn.disabled = true;
        }
    }

    hideError() {
        if (this.errorEl) {
            this.errorEl.style.display = 'none';
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new JokeGenerator();
});
