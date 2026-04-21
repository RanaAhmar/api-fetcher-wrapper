# API Fetcher Wrapper 🌐

![JS Size](https://img.shields.io/badge/Size-2KB_Gzipped-brightgreen?style=flat-square)
![License](https://img.shields.io/github/license/RanaAhmar/api-fetcher-wrapper?style=flat-square)
![Compatibility](https://img.shields.io/badge/Env-Browser%20%26%20Node.js-blue?style=flat-square)

**A lightweight JS fetch wrapper with built-in retry logic, timeouts, and interceptors.**

Native `fetch()` is great, but building robust frontend architectures requires error handling, timeouts, retry logic for flaky connections, and request interceptors for auth tokens. `api-fetcher-wrapper` handles all of this automatically without the heavy 15kb+ overhead of libraries like Axios.

## 🌟 Key Features
- **Auto-Retries**: Automatically retries failed requests (e.g. 503, 504 errors) with exponential backoff.
- **Request Timeouts**: Built-in timeout killing to prevent hanging requests.
- **Interceptors**: Easily inject Bearer tokens globally before every request fires.
- **Zero Dependencies**: Powered entirely by native browser/Node capabilities.

## 📚 Table of Contents
- [Installation](#-installation)
- [How to Use](#-how-to-use)
- [Configuration options](#-configuration-options)
- [License](#-license)

## 📦 Installation

```bash
npm install api-fetcher-wrapper
```

## 🚀 How to Use

```javascript
import ApiFetcher from 'api-fetcher-wrapper';

// Initialize with defaults
const api = new ApiFetcher({
    baseURL: 'https://api.example.com/v1',
    timeout: 5000,
    retries: 3,
});

// Set a global auth token (Interceptor simulation)
api.setAuthToken('eyJhbGciOiJIUzI1NiIsInR5cCI6...');

// Use the wrapper
async function getUser() {
    try {
        const data = await api.get('/users/me');
        console.log(data);
    } catch (error) {
        console.error("API Call Failed:", error);
    }
}
```

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.


---

## 🚀 Discover More from Stackaura

If you found this tool useful, check out our other high-performance web utilities and follow **Ahmar Hussain** for more open-source excellence.

### 🌟 Featured Projects
- **[Free LLM APIs](https://github.com/RanaAhmar/free-llm-apis)** - A curated list of zero-cost AI endpoints.
- **[Awesome MCP Servers](https://github.com/RanaAhmar/awesome-mcp-servers)** - The ultimate collection of Model Context Protocol implementations.
- **[System Design Cheatsheet](https://github.com/RanaAhmar/system-design-cheatsheet)** - Master complex architectures in minutes.
- **[Next.js SaaS Starter](https://github.com/RanaAhmar/nextjs-saas-starter)** - The fastest way to launch your next product.

### 🔗 Stay Connected
- **Website:** [stackaura.com](https://www.stackaura.com/)
- **Author:** [Ahmar Hussain](https://github.com/RanaAhmar)

---

