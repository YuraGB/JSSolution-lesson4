/**
 * Created by Yura on 24.03.2017.
 */
window.addEventListener("DOMContentLoaded", function () {
    var body = document.getElementById("app");
    function Router() {
        this.cache ={};
    }
    Router.prototype.add = function (str, cb) {
        if (!this.cache[str]) {
            return this.cache[str] = cb()
        }
    };
    Router.prototype._init = function () {
        body.appendChild(renderRoot());
    }

    Router.prototype.run = function () {
        var self = this;
            console.log(this.cache)
        var url = window.location.pathname;

            if (self.cache[url]) {
                body.innerHTML = "";
                body.appendChild(self.cache[url])
            }
            else {
                body.innerHTML = "";
                body.appendChild(self.cache['#']);
            }

    };
    App.prototype._init = function(){
        var self = this;


        window.addEventListener("popstate", function(){
            var url = window.location.pathname;
            body.innerHTML ="";
            body.appendChild(self.router.cache[url])
        });

        body.addEventListener("click", function (event) {
            event.preventDefault();
            var el = event.target;
            while (el.tagName !== "A") {
                el = el.parentNode;
            }

            if (el) {
                event.preventDefault();
                history.pushState(null, null, el.href)
            }
            else {
                return;
            }

            return self.router.run()
        })

    };

    function App() {


        this.router = new Router();

        this.router.add('/', renderRoot);
        this.router.add('/hello', renderHello);
        this.router.add('#', renderNotFound);
        this.router._init();
    }




    function renderRoot() {
        "use strict";
        const view = p('div', {id: 'header'}, [
            p('div', {textContent: 'Привіт, TernopilJS!'}),
            p('div', {textContent: ' Базовий приклад SPA без використання сторонніх бібліотек.'}),
            p('a', {href: '/hello', textContent: 'Перейти на привітання'}),
            p('a', {href: '/back', textContent: 'Перейти назад'})
        ]);
        return view;
    }
    function renderHello() {
        "use strict";
        const view = p('div', {id: 'header'}, [
            p('div', {textContent: 'Привіт, TernopilJS!  FROM HELLO PAGE'}),
            p('div', {textContent: ' Базовий приклад SPA без використання сторонніх бібліотек.'}),
            p('a', {href: '/hello', textContent: 'Перейти на привітання'}),
            p('a', {href: '/back', textContent: 'Перейти назад'})
        ]);
        return view;
    }
    function renderNotFound() {
        "use strict";
        const view = p('div', {id: 'header',textContent: 'OOps  wrong page :('});

        return view;

    }
    function p() {
        var parent = document.createElement(arguments[0]),
            prop = arguments[1],
            children = arguments[2];
        if (arguments[1]) {
            Object.keys(arguments[1]).forEach(function (key) {
                if (key !== "textContent") {
                    parent.setAttribute(key, prop[key])
                }
                else {
                    parent[key] = prop[key]
                }
            })
        }
        if (children) {
            children.forEach(function (key) {
                parent.appendChild(key);
            })
        }
        return parent;
    }
    var app = new App();
    app._init()



});