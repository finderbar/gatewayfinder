const querystring = require('querystring');
const Promise = require('bluebird');
const crypto = require('crypto');
const { _ } = require('underscore');
const request = Promise.promisifyAll(require('request'));


class BaseServices {
    constructor() {
        this.urls = {
            baseUrl: 'https://192.168.43.233/v1.3',
        }
        this.props = {
            headers: { 'Accept': 'application/json' }
        }
    }

    get(props) {
        return request.getAsync(_.extend(this.props, props));
    }

    post(props) {
        return request.postAsync(_.extend(this.props, props));
    }

    put(props) {
        return request.putAsync(_.extend(this.props, props));
    }

    patch(props) {
        return request.patchAsync(_.extend(this.props, props));
    }

    remove(props) {
        return request.delAsync(_.extend(this.props, props));
    }
}


module.exports = BaseServices;