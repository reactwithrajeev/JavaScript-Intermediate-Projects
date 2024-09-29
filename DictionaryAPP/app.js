const input = document.querySelector("#inputWord");
const button = document.querySelector("#searchBtn");
const dictionary = document.querySelector("#dictionary");

async function findMeaning() {
  try {
    let word = input.value;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    let res = await fetch(url).then((res) => res.json());
    // console.log(res);

    let word2 = res[0].word;
    // console.log(word2);

    let audio = res[0].phonetics[1].audio;
    // console.log(audio);

    let definition = res[0].meanings[0].definitions[0].definition;
    // console.log(definition);

    let POS = res[0].meanings[0].partOfSpeech;
    // console.log(POS);

    let phonetic = res[0].phonetic;
    // console.log(phonetic);
    dictionary.style.display = "block"
    dictionary.innerHTML = `
    <div class="card">
                <div class="property">
                    <span>Word:</span>
                    <span>${word2}</span>
                </div>
                <div class="property">
                    <span>Phonetic:</span>
                    <span>${phonetic}</span>
                </div>
                <div class="property">
                    <span>Audio:</span>
                    <span><audio controls src="${audio}"></audio></span>
                </div>
                <div class="property">
                    <span>Definition:</span>
                    <span>${definition}</span>
                </div>
                <div class="property">
                    <span>Parts of Speech:</span>
                    <span>${POS}</span>
                </div>
            </div>
    `;
  } catch (error) {
    dictionary.innerHTML = `<p>Error fetching the word data. Please try again.</p>`;
  }
}

button.addEventListener("click", findMeaning);
