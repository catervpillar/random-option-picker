let options = [];

/**
 * Returns a random object of this array.
 * @returns a random object
 */
Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
}

/**
 * Removes this HTML element from the DOM.
 */
Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
}

/**
 * Removes this HTML collection of elements from the DOM.
 */
NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

/**
 * HTML encoder functions to prevent XSS from user input values.
 * @param {*} str the string to encode
 * @returns the encoded string
 */
function htmlEncode(str) {
    return String(str).replace(/[^\w. ]/gi, function (c) {
        return '&#' + c.charCodeAt(0) + ';';
    });
}

/**
 * Removes all inserted items.
 */
function clearAll() {
    options = [];
    const container = document.getElementById("things-container");
    container.innerHTML = '';
}

/**
 * Insert a the typed item in the 'options' array and renders a new card for it.
 * @returns 
 */
function insertThing() {
    var input = document.getElementById('input');
    sanitizedValue = htmlEncode(input.value);

    if (sanitizedValue) {
        if (options.includes(sanitizedValue)) return;

        options.push(sanitizedValue);
        const container = document.getElementById("things-container");
        container.appendChild(getNewCardElement(sanitizedValue));
        input.value = '';
    } else return;
}

/**
 * Returns a new HTML element for a newly inserted item.
 * @param {*} name the name of the item
 * @returns the new HTML object
 */
function getNewCardElement(name) {
    const newCard = document.createElement('div');
    newCard.id = name;
    newCard.title = "Right click to delete";
    newCard.innerHTML = `<p>${name}</p>`;
    newCard.classList.add('thing-card');
    newCard.addEventListener('contextmenu', function (ev) {
        ev.preventDefault();
        newCard.remove();
        options.splice(options.indexOf(name), 1);
        return false;
    }, false);
    return newCard;
}

/**
 * Pick a random item from the 'options' array and displays it in
 * the apposite HTML label applying a CSS KeyFrames animation
 */
function pickOne() {
    if (options.length > 0) {
        const label = document.getElementById('result-label');
        label.classList.remove('animated-result'); // reset animation
        void label.offsetWidth;
        label.innerText = options.random();
        label.classList.add('animated-result');
    }
}

/**
 * Change the color theme for the whole page.
 */
function changeColorTheme() {
    document.body.classList.toggle('dark-mode');
}