async function searchWord() {
    const word = document.getElementById("wordInput").value.trim();

    const result = document.getElementById("result");

    if (word === "") {
        result.innerHTML = "<p>Please enter a word.</p>";
        return;
    }

    result.innerHTML = "<p>Searching...</p>";

    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

        if (!response.ok) {
            throw new Error("Word not found");
        }

        const data = await response.json();
        const entry = data[0];

        let meaningsHTML = "";

        entry.meanings.forEach(meaning => {
            meaningsHTML += `<h3>${meaning.partOfSpeech}</h3>`;

            meaning.definitions.slice(0, 3).forEach(def => {
                meaningsHTML += `<p><strong>Meaning:</strong> ${def.definition}</p>`;

                if (def.example) {
                    meaningsHTML += `<p><strong>Example:</strong> ${def.example}</p>`;
                }
            });
        });

        result.innerHTML = `
            <div class="word-card">
                <h2>${entry.word}</h2>
                <p><strong>Phonetic:</strong> ${entry.phonetic || "Not available"}</p>
                ${meaningsHTML}
            </div>
        `;
    } catch (error) {
        result.innerHTML = `
            <div class="word-card">
                <h2>Word Not Found</h2>
                <p>Try another word.</p>
            </div>
        `;
    }
}

