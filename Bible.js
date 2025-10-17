const API_URL = 'https://bible-api.com/random';
const verseTextElement = document.getElementById('verse-text');
const verseReferenceElement = document.getElementById('verse-reference');
const fetchButton = document.getElementById('fetch-button');
const errorMessageElement = document.getElementById('error-message');

function setLoadingState(isLoading) {
    fetchButton.disabled = isLoading;
    fetchButton.textContent = isLoading ? 'Loading...' : 'Get New Verse';
    errorMessageElement.classList.add('hidden');
}

function updateVerseUI(text, reference) {
    verseTextElement.textContent = text;
    verseReferenceElement.textContent = reference;
}

function displayError() {
    errorMessageElement.classList.remove('hidden');
    updateVerseUI(
        'Could not retrieve the verse at this time.',
        '(Connection Error)'
    );
}

async function fetchNewVerse() {
    setLoadingState(true);

    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        
        const verse = data.text.trim().replace(/\s+/g, ' ');
        const reference = `— ${data.reference}`;

        updateVerseUI(verse, reference);

    } catch (error) {
        console.error('Fetch error:', error);
        displayError();
    } finally {
        setLoadingState(false);
    }
}

fetchButton.addEventListener('click', fetchNewVerse);

window.onload = () => {
    fetchNewVerse();
};
