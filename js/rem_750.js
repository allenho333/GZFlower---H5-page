(function flexible(window, document) {
            var docEl = document.documentElement;
            var tid;
            var dpr = window.devicePixelRatio || 1;
            docEl.setAttribute("data-dpr", dpr);

            function setRemUnit() {
                var width = docEl.getBoundingClientRect().width;
                if (width > 640) { // 设计稿的宽度是640px
                    docEl.style.fontSize = 64 + 'px';
                }
                else {
                    var rem = width / 6.4;
                    docEl.style.fontSize = rem + 'px';
                }
            }

            setRemUnit();

            window.addEventListener('resize', function () {
                clearTimeout(tid);
                tid = setTimeout(setRemUnit, 200);
            }, false);
            window.addEventListener('pageshow', function (e) {
                if (e.persisted) {
                    clearTimeout(tid);
                    tid = setTimeout(setRemUnit, 200);
                }
            }, false);
        }(window, document));

        window.addEventListener("load", function () {
            setTimeout(function () {
                window.scrollTo(0, 0);
            }, 0);
        }, false);