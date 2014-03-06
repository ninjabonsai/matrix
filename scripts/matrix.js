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
        lettersMatrix = [],
        letterCoversArray,
        totalCovers;

    createLetters();

    function createLetters() {
        var iw = window.innerWidth,
            ih = window.innerHeight,
            w = iw / letterSize | 0,
            h = ih / letterSize | 0;

        for (var i = 0; i < w; i++) {
            var col = doc.createElement('div');

            col.yPos = 0;
            col.zPos = Math.random() * (zRange * 2) - zRange;

            col.className = 'letters';
            //            col.style.webkitFilter = 'blur(' + Math.abs(col.zPos / zRange) * 3 + 'px)';
            col.style.opacity = 1 - Math.abs(col.zPos / zRange);

            var ranStart = Math.random() * 8;

            TweenMax.to(col, 12, {yPos: ih, delay: ranStart, repeat: -1, ease: Quad.easeIn});

            lettersWrapper.appendChild(col);

            var letterCover = doc.createElement('div');
            letterCover.className = 'letter-cover';

            letterCover.yPos = -ih * 2;
            letterCover.style.height = ih * 3 + 'px';
            TweenMax.to(letterCover, 8, {yPos: 0, delay: ranStart, repeat: -1, ease: Quad.easeIn});
            letterCover.style.webkitTransform = 'translate3d(0px, ' + letterCover.yPos + 'px, 0px)';

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
        letterCoversArray = doc.getElementsByClassName('letter-cover');

        colTotal = letterColsArray.length;
        letterTotal = letterArray.length;
        totalCovers = letterCoversArray.length;

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
        var col,
            letterCover;

        for (var i = 0; i < colTotal; i++) {
            col = letterColsArray[i];
            col.style.webkitTransform = 'translate3d(0px, ' + col.yPos + 'px, ' + col.zPos + 'px)';

            letterCover = letterCoversArray[i];
            letterCover.style.webkitTransform = 'translate3d(0px, ' + letterCover.yPos + 'px, 0px)';
        }

        // force 20fps for letter changing
        //        tickCount++;
        //        if (tickCount > 3) {
        //            return;
        //        }
        //
        //        tickCount = 0;

        var currentLetterUpdatePos = Math.random() * lettersMatrix.length | 0,
            l = lettersMatrix[currentLetterUpdatePos].length;

        //        randomize letters
        for (var i = 0; i < l; i++) {
            lettersMatrix[currentLetterUpdatePos][i].firstChild.nodeValue = charactersArray[Math.random() * lettersStr.length | 0];
        }
    }

    TweenMax.ticker.addEventListener('tick', tick);
};