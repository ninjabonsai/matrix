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
        tickCount = 0;

    createLetters();

    function createLetters() {
        var iw = window.innerWidth,
            ih = window.innerHeight,
            w = iw / letterSize | 0,
            h = ih / letterSize | 0;

        for (var i = 0; i < 1; i++) {
            var col = doc.createElement('div');

            col.yPos = -ih;
            col.zPos = Math.random() * (zRange * 2) - zRange;

            col.className = 'letters';
            col.style.webkitTransform = 'translate3d(0px, ' + 0 + 'px, ' + col.zPos + 'px)';
            col.style.webkitFilter = 'blur(' + Math.abs(col.zPos / zRange) * 3 + 'px)';

            TweenMax.to(col, 6, {yPos: ih, delay: Math.random() * 5, repeat: -1});

            lettersWrapper.appendChild(col);

            var letterCover = doc.createElement('div');
            letterCover.className = 'letter-cover';
            col.appendChild(letterCover);

            for (var j = 0; j < h; j++) {
                var letter = doc.createElement('div');
                letter.className = "letter";
                //                letter.style.webkitTransform = 'translate3d(0px, ' + j / 4 * letterSize + 'px, 0px)';
                letter.textContent = charactersArray[Math.random() * lettersStr.length | 0];
                col.appendChild(letter);
            }
        }

        letterColsArray = doc.getElementsByClassName('letters');
        letterArray = doc.getElementsByClassName('letter');

        colTotal = letterColsArray.length;
        letterTotal = letterArray.length;
    }

    function tick() {
        // move cols
//        var col;
//
//        for (var i = 0; i < colTotal; i++) {
//            col = letterColsArray[i];
//
//            col.style.webkitTransform = 'translate3d(0px, ' + col.yPos + 'px, ' + col.zPos + 'px)';
//        }

        // force 20fps for letter changing
//        tickCount++;
//        if (tickCount < 300) {
//            return;
//        }
//        tickCount = 0;
//
//        var ranArray, newArray;

//        randomize letters
        for (var i = 0; i < colTotal; i++) {
            //            letterArray[i].firstChild.nodeValue = charactersArray[Math.random() * totalCharacters | 0];

            var col = letterColsArray[i];

            var cl = col.childNodes.length;

            var ls = col.getElementsByClassName('letter');

            for (var j = 0; j < ls.length; j++) {
//                ranArray.push(col.removeChild(col.childNodes[j]));

                var l = ls[j];

//                l.style.webkitTransform = 'translate3d(0px, ' + 400 + 'px, 0px)';
                l.style.opacity = .1;

                console.log(l.style.opacity);
            }

//            newArray = shuffleArray(ranArray);
//
//            var nal = newArray.length;
//
//            for (j = 0; j < nal; j++) {
//                col.appendChild(newArray[j]);
//            }
        }
    }

//    function shuffleArray(o) {
//        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x) {
//            ;
//        }
//        return o;
//    };

    tick();

//    TweenMax.ticker.addEventListener('tick', tick);
};