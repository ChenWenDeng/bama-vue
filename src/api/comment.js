import config from '../store/config.js';

const comment = function (url, data) {
    let token = '';
    let opts = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'XX-Token': token,
            'XX-Device-Type': 'wxapp',
        },
        body: JSON.stringify(data)
    };

    fetch(url, opts).then(response => response.json()).then(json => {
        if (json.data) {
            // state.article = json.data;

            return true;
        } else {
            return false;
        }
    });
};

export default {
    comment
}