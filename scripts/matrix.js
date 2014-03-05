module.exports = function () {

    var doc = document,
        lettersStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        letterSize = 24,
        lettersWrapper = doc.getElementById('letters-wrapper'),
        allLetters,
        totalLetters,
        zRange = 250,
        tickCount = 0;

    createLetters();

    function createLetters() {
        var w = window.innerWidth / letterSize | 0,
            h = window.innerHeight / letterSize | 0;

        for (var i = 0; i < w; i++) {
            var letters = doc.createElement('div');

            var ranZ = Math.random() * 500 - 250;

            letters.className = 'letters';
            //            letters.style.webkitTransform = 'scale(' + ranScale + ', ' + ranScale + ')';
            letters.style.webkitTransform = 'translate3d(0px, 0px, ' + ranZ + 'px)';
            letters.style.webkitFilter = 'blur(' + Math.abs(ranZ / zRange) * 3 + 'px)';
            lettersWrapper.appendChild(letters);

            var letterCover = doc.createElement('div');
            letterCover.className = 'letter-cover';
            letters.appendChild(letterCover);

            for (var j = 0; j < h; j++) {
                var letter = doc.createElement('div');
                letter.className = "letter";
                letter.textContent = lettersStr.charAt(Math.random() * lettersStr.length | 0);
                letters.appendChild(letter);
            }
        }

        allLetters = doc.getElementsByClassName('letter');
        totalLetters = allLetters.length;
    }

    window.requestAnimFrame = (function () {
        return  window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    function tick() {
        requestAnimFrame(tick);

        // force 20fps
        tickCount++
        if (tickCount < 3) {
            return;
        }
        tickCount = 0

        for (var i = 0; i < totalLetters; i++) {
            var l = allLetters[i];

            // fastest way to set element value
            l.firstChild.nodeValue = lettersStr.charAt(Math.random() * lettersStr.length | 0);
        }
    }

//    tick();
};