/**
 * A lightweight overlay over native fetch() with advanced options.
 */
class ApiFetcher {
    /**
     * @param {Object} options Configuration Object
     */
    constructor(options = {}) {
        this.baseURL = options.baseURL || '';
        this.defaultHeaders = {
            'Content-Type': 'application/json',
            ...(options.headers || {})
        };
        this.timeout = options.timeout || 8000;
        this.retries = options.retries || 0;
    }

    /**
     * Globally sets the Authorization Bearer token.
     * @param {string} token 
     */
    setAuthToken(token) {
        if (token) {
            this.defaultHeaders['Authorization'] = `Bearer ${token}`;
        } else {
            delete this.defaultHeaders['Authorization'];
        }
    }

    async request(endpoint, options = {}, retries = this.retries) {
        const url = `${this.baseURL}${endpoint}`;
        
        // Timeout Controller
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), this.timeout);

        const config = {
            ...options,
            headers: {
                ...this.defaultHeaders,
                ...(options.headers || {})
            },
            signal: controller.signal
        };

        try {
            const response = await fetch(url, config);
            clearTimeout(id);

            // Handle successful JSON responses
            if (response.ok) {
                // Return text if 204 No Content, else JSON
                return response.status === 204 ? null : await response.json();
            }

            // Throw on HTTP error
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);

        } catch (error) {
            clearTimeout(id);
            // Handle retry logic for network errors or server aborts
            if (retries > 0 && (error.name === 'AbortError' || error.message.includes('fetch'))) {
                console.warn(`Retrying request to ${url}. Attempts left: ${retries - 1}`);
                // Exponential backoff mock
                await new Promise(res => setTimeout(res, 1000));
                return this.request(endpoint, options, retries - 1);
            }
            throw error;
        }
    }

    get(endpoint, headers = {}) {
        return this.request(endpoint, { method: 'GET', headers });
    }

    post(endpoint, body, headers = {}) {
        return this.request(endpoint, { method: 'POST', body: JSON.stringify(body), headers });
    }

    put(endpoint, body, headers = {}) {
        return this.request(endpoint, { method: 'PUT', body: JSON.stringify(body), headers });
    }

    delete(endpoint, headers = {}) {
        return this.request(endpoint, { method: 'DELETE', headers });
    }
}

export default ApiFetcher;
