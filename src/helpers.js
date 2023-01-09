/*
* App helper functions.
*/

/**
 * Simple debounce function.
 *
 * @param fn
 * @param delay
 * @returns {(function(): void)|*}
 */
const debounce = (fn, delay) => {
    let timeoutID = null;

    return function () {
        clearTimeout(timeoutID)

        let args = arguments;
        let that = this;

        timeoutID = setTimeout(function () {
            fn.apply(that, args);
        }, delay);
    }
}

/**
 * Format number to K or M.
 *
 * @param count
 * @returns {string|*}
 */
const format = (count) => {
    const million = count / 1000000;
    const thousand = count / 1000;

    if (million >= 1) {
        return million.toFixed(1) + 'M'
    }
    if (thousand >= 1) {
        return thousand.toFixed(1) + 'K'
    }

    return count;
};

/**
 * App helper.
 *
 * @returns {{embed(*, *): void, clean(): this}|*}
 */
const app = () => {
    return {

        /**
         * Redirect to twitch if is invalid domain.
         */
        check() {
            const hostnames = ['m.twitch.tv', 'localhost'];

            if (hostnames.indexOf(location.hostname) === -1) {
                location.assign('https://' + hostnames[0]);

                return false;
            }

            return this;
        },

        /**
         * Clean unused scripts, styles, etc.
         */
        clean(callback) {
            document.body.innerHTML = '<div id="app"></div>';

            callback();
        }
    }
}

/**
 * Work with cookies.
 *
 * @returns {string|null|{get(*): (string | undefined|null)}}
 */
const cookie = () => {
    return {
        get(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);

            if (parts.length === 2) {
                return parts.pop().split(';').shift();
            }

            return null;
        }
    }
}

export {
    format, cookie, app, debounce
}
