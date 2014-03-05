module.exports = function () {

    var doc = document,
        lettersStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        charactersArray = lettersStr.split(''),
        totalCharacters = charactersArray.length;

    var letterSize = 24,
        lettersWrapper = doc.getElementById('letters-wrapper'),
        letterColsArray,
        letterArray,
        colTotal,
        letterTotal,
        zRange = 250,
        tickCount = 0,
        lettersMatrix = [];

    createLetters();

    function createLetters() {
        var iw = window.innerWidth,
            ih = window.innerHeight,
            w = iw / letterSize | 0,
            h = ih / letterSize | 0;

        for (var i = 0; i < w; i++) {
            var col = doc.createElement('div');

            col.yPos = -ih;
            col.zPos = Math.random() * (zRange * 2) - zRange;

            col.className = 'letters';
//            col.style.webkitFilter = 'blur(' + Math.abs(col.zPos / zRange) * 3 + 'px)';
            col.style.opacity = 1 - Math.abs(col.zPos / zRange);

            TweenMax.to(col, 5, {yPos: ih, delay: Math.random() * 5, repeat: -1, ease: Quad.easeIn});

            lettersWrapper.appendChild(col);

            var letterCover = doc.createElement('div');
            letterCover.className = 'letter-cover';
            col.appendChild(letterCover);

            for (var j = 0; j < h; j++) {
                var letter = doc.createElement('div');
                letter.className = "letter";
                letter.textContent = charactersArray[Math.random() * lettersStr.length | 0];
                col.appendChild(letter);
            }
        }

        letterColsArray = doc.getElementsByClassName('letters');
        letterArray = doc.getElementsByClassName('letter');

        colTotal = letterColsArray.length;
        letterTotal = letterArray.length;

        for (i = 0; i < colTotal; i++) {
            var col = letterColsArray[i];

            var colArray = col.getElementsByClassName('letter');

            var colLength = colArray.length;

            lettersMatrix.push([]);

            for (var j = 0; j < colLength; j++) {
                lettersMatrix[i].push(colArray[j]);
            }
        }
    }

    function tick() {
        // move cols
        var col;

        for (var i = 0; i < colTotal; i++) {
            col = letterColsArray[i];

            col.style.webkitTransform = 'translate3d(0px, ' + col.yPos + 'px, ' + col.zPos + 'px)';
        }

        // force 5fps for letter changing
        tickCount++;
        if (tickCount > 12) {
            return;
        }

//        tickCount = 0;

        //        randomize letters
        for (var i = 0; i < colTotal; i++) {
            var newArray = shuffle(lettersMatrix[i]);

            var nal = newArray.length;

            for (var j = 1; j < nal; j++) {
                newArray[j].style.webkitTransform = 'translate3d(0px, ' + letterSize * j + 'px, 0px)';
            }
        }
    }

    function shuffle(array) {
        var currentIndex = array.length
            , temporaryValue
            , randomIndex
            ;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    TweenMax.ticker.addEventListener('tick', tick);
};