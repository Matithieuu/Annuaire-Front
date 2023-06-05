
<div align="center">
<h1 align="center">
<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
<br>
Annuaire-Front
</h1>
<h3 align="center">📍 Error generating file summary. Exception: Client error '409 Conflict' for url 'https://api.openai.com/v1/chat/completions'
For more information check: https://httpstatuses.com/409</h3>
<h3 align="center">⚙️ Developed with the software and tools below:</h3>

<p align="center">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black" alt="JavaScript" />
<img src="https://img.shields.io/badge/React-61DAFB.svg?style=for-the-badge&logo=React&logoColor=black" alt="React" />
<img src="https://img.shields.io/badge/Expo-000020.svg?style=for-the-badge&logo=Expo&logoColor=white" alt="Expo" />
</p>
</div>

---

## 📚 Table of Contents
- [📚 Table of Contents](#-table-of-contents)
- [📍 Overview](#-overview)
- [💫 Features](#-features)
- [📂 Project Structure](#project-structure)
- [🧩 Important Modules](#modules)
- [🚀 Getting Started](#-getting-started)
- [📄 License](#-license)
---


## 📍 Overview
Annuaire de contacts en React Native.

---

## 💫 Features

Annuaire qui permet de se connecter ou de s'enregistrer pour lire, ajouter, supprimer ou modifer des contacts.

---


<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-github-open.svg" width="80" />

## 📂 Project Structure


```bash
repo
├── annuaire.json
├── App.js
├── app.json
├── assets
│   ├── cogwheel.png
│   └── icons8-logout-50.png
├── babel.config.js
├── LICENSE
├── package.json
├── package-lock.json
├── README.md
├── src
│   └── page
│       ├── MainPage.js
│       ├── MySelf
│       ├── BasePage
│       │   ├── AboutPage.js
│       │   ├── ForgotPassword.js
│       │   ├── RegisterPage.js
│       │   └── Settings.js
│       │   			
│       ├── Contact
│       │   ├── AddContactPage.js
│       │   ├── ContactDetails.js
│       │   └── ModifyContact.js
│       │   
│       ├── MySelf	
│       │   ├── Disconnect.js
│       │   ├── ModifyMyself.js
│       │   ├── MySelfDetails.js
│       │   └── MySelf.js
│       │   
│       └──  Plugins
│           ├── Alert.js
│           ├── ErrorMessage.js
│           ├── SanitizeInput.js
│           └── StorageUtils.js
│       
└── yarn.lock
```

---

<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-src-open.svg" width="80" />

## 🧩 Important Modules

<details closed><summary>Basepage</summary>

| File              | Summary                                                                                                                    | Module                              |
|:------------------|:---------------------------------------------------------------------------------------------------------------------------|:------------------------------------|
| Settings.js       | Load login informations to the API | src/page/BasePage/Settings.js       |                     |
| Disconnect.js    | Clear the local storage (tokens and users's credentials) | src/page/MySelf/Disconnect.js    |                  |
| ErrorMessage.js  | Composant to show errors | src/page/Plugins/ErrorMessage.js  |
| SanitizeInput.js | Securize inputs againts XXS attacks | src/page/Plugins/SanitizeInput.js |                                |
| StorageUtils.js  | Composant to securize data retrived by the API | src/page/Plugins/StorageUtils.js  |                                   |                              |
</details>

---

## 🚀 Getting Started

### ✅ Prerequisites

Before you begin, ensure that you have the following prerequisites installed:
> - [📌  Expo]
> - [📌 React Native]
> - [📌  Npx]

### 🖥 Installation

1. Clone the Annuaire-Front repository:
```sh
git clone https://github.com/Matithieuu/Annuaire-Front
```

2. Change to the project directory:
```sh
cd Annuaire-Front
```

3. Install the dependencies:
```sh
npm install
```

### 🤖 Using Annuaire-Front

```sh
npx expo start
```

### 🧪 Running Tests
```sh
npm test
```
## 📄 License

This project is licensed under the `[📌 MIT License]` License. See the [LICENSE](https://github.com/Matithieuu/Annuaire-Front/blob/main/LICENSE) file for additional info.
