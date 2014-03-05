module.exports = function () {

    var doc = document,
        lettersStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        letterSize = 24,
        lettersWrapper = doc.getElementById('letters-wrapper');

    createLetters();

    function createLetters() {
        var w = window.innerWidth / letterSize | 0,
            h = window.innerHeight / letterSize | 0;

        for (var i = 0; i < w; i++) {
            var letters = doc.createElement('div');

            letters.className = 'letters';
            lettersWrapper.appendChild(letters);

            for (var j = 0; j < h; j++) {
                var letter = doc.createElement('div');

                letter.textContent = lettersStr.charAt(Math.random() * lettersStr.length | 0);
                letter.className = "letter";
                letters.appendChild(letter);
            }
        }
    }
};