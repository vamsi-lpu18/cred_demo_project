# Cred Test Automation Project

## Overview
Cred Test Automation Project is a robust, modular framework for automated UI testing of web applications. Built with WebdriverIO and JavaScript, it is designed to ensure the reliability and quality of core e-commerce functionalities such as authentication, product browsing, cart management, and navigation. The project is structured for scalability, maintainability, and seamless integration with CI/CD pipelines.

---

## Features
- **Automated End-to-End Testing**: Comprehensive coverage for login, product, cart, and navigation flows.
- **Modular Architecture**: Organized test suites for easy maintenance and scalability.
- **CI/CD Ready**: Easily integrates with modern DevOps workflows.
- **Static Deployment Example**: Deployed on Netlify for demonstration purposes.

---

## Project Structure
```
├── src/                    # Application source code
│   ├── components/         # React components
│   ├── pages/              # Page components
│   ├── styles/             # CSS styles
│   └── App.js              # Main app entry
├── tests/                  # Automated test suites
│   └── ui/                 # UI test specifications
│       ├── test_login.js
│       ├── test_products.js
│       ├── test_cart.js
│       └── test_navigation.js
├── wdio.conf.js            # WebdriverIO configuration
├── package.json            # Project dependencies & scripts
├── netlify.toml            # Netlify deployment configuration
└── README.md               # Project documentation
```

---

## Getting Started
### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)
- Chrome browser

### Installation
```bash
git clone <repository-url>
cd <project-directory>
npm install
```

### Running Locally
Start the application:
```bash
npm start
```

Run all tests:
```bash
npm test
```

---

## Deployment
This project is deployed on Netlify, serving static files from the `src` directory. 

**Live Demo:**  
[https://cred-test-automation.netlify.app](https://cred-test-automation.netlify.app)

### Deploying to Netlify (Steps)
1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```
2. Login to Netlify:
   ```bash
   netlify login
   ```
3. Create a new site:
   ```bash
   netlify sites:create --name cred-test-automation
   ```
4. Deploy to production:
   ```bash
   netlify deploy --prod
   ```

Deployment settings are managed in `netlify.toml`.

---

## License
This project is licensed under the MIT License.
