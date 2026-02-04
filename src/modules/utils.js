/**
 * Updates the footer year
 */
export function updateYear() {
    document.getElementById('year').textContent = new Date().getFullYear();
}

/**
 * Typing effect helper function
 * @param {HTMLElement} element 
 * @param {string} text 
 * @param {number} speed 
 * @returns {Promise}
 */
export function typeText(element, text, speed = 50) {
    return new Promise((resolve) => {
        if (!element || !text) {
            resolve();
            return;
        }

        let i = 0;
        element.textContent = '';

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                resolve();
            }
        }

        type();
    });
}
