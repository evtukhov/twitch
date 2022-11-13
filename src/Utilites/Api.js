import {cookie} from "@/helpers.js";

/**
 * Api helper class.
 */
class Api {
    constructor() {
        this.url = 'https://gql.twitch.tv/gql';

        this.params = {
            method: 'POST',
            headers: {
                "accept": "application/json",
                "content-type": "application/json",
                // TODO: Search Client ID this in the server response.
                "client-id": "r8s4dac0uhzifbpu9sjdiwzctle17ff",
                "device-id": cookie().get('unique_id_samesite_compat')
            },
            body: JSON.stringify({})
        }
    }

    async fetch(query) {
        this.params.body = JSON.stringify(query);

        return await fetch(this.url, this.params).then(res => res.json());
    }
}

/**
 * Define helper function.
 *
 * @returns {Api}
 */
const api = () => {
    return new Api();
}

export {
    api
}
