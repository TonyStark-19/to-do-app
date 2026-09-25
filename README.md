# ⚡ My Day - Modern React Todo App

<!-- Project Stats -->
![Repo Size](https://img.shields.io/github/repo-size/TonyStark-19/to-do-app?color=yellow)
![Stars](https://img.shields.io/github/stars/TonyStark-19/to-do-app?color=blue)
![Forks](https://img.shields.io/github/forks/TonyStark-19/to-do-app?color=blueviolet)
![Last Commit](https://img.shields.io/github/last-commit/TonyStark-19/to-do-app?color=brightgreen)

<!-- Features -->
![Responsive](https://img.shields.io/badge/Responsive-Yes-success)
![Sound Effects](https://img.shields.io/badge/Sound-Effects-blue)
![Dynamic Theme](https://img.shields.io/badge/Theme%20Color-Dynamic-ff69b4)
![Data Persistence](https://img.shields.io/badge/Data-Persistent%20(LS)-informational)

A sleek, minimalistic, and feature-rich **Todo App** built with **React** and styled using custom glassmorphism CSS. Designed to help users stay focused and organize their daily task flow with satisfying sound feedback, inline task editing, view filtering, and dynamic themes.

---

## 📸 Screenshot

| Main View & Tasks | Theme Selector & Stats |
| :---: | :---: |
| ![Screenshot 1](/public/image/image1.png) | ![Screenshot 2](/public/image/image2.png) |

| Task Filtering & Editing | Delete Confirmation Modal |
| :---: | :---: |
| ![Screenshot 3](/public/image/image3.png) | ![Screenshot 4](/public/image/image4.png) |

---

## 🌐 Live Demo  

The project is live and can be viewed here: [to-do-app](https://todo-phi-ruby.vercel.app/)

---

## ✨ Features

| Feature | Description |
| --- | --- |
| 📅 **Dynamic Date Display** | Displays current day, date, and month dynamically. |
| 🔍 **Task Filtering** | Instantly filter tasks by **All**, **Active**, and **Completed** states. |
| ✏️ **Inline Task Editing** | Double-click or click the edit icon to modify existing tasks on the fly. |
| 🎨 **Dynamic & Persistent Themes** | Pick custom accent colors with automatic `localStorage` persistence. |
| 🔊 **Audio Feedback** | Audio cues for task completion (`ding.mp3`) and deletion (`pop.mp3`). |
| 🗑️ **Delete Confirmation & Batch Clear** | Safe modal confirmation for individual items and batch-clearing for completed tasks. |
| 📊 **Task Analytics & Info Panel** | Real-time breakdown of total, completed, and pending tasks. |
| 💾 **Full LocalStorage Persistence** | Tasks and active theme choices persist across browser sessions. |
| 📱 **Responsive Glassmorphism UI** | Mobile-first, dark-themed responsive design crafted with clean CSS. |

---

## 🛠️ Technologies Used

<!-- Tech Stack -->
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![LocalStorage](https://img.shields.io/badge/LocalStorage-Enabled-green)
![React Icons](https://img.shields.io/badge/React%20Icons-Icon%20Library-orange)

| Technology / API | Purpose & Usage |
| --- | --- |
| **React JS (Hooks)** | Core library for component state management, effects, and dynamic UI rendering |
| **React Icons** | Icon set for task completion, editing, deletion, theme options, and navigation |
| **CSS3** | Glassmorphism UI styling, flexbox layouts, animations, and custom scrollbars |
| **LocalStorage API** | Browser storage for persisting user tasks, completed status, and chosen theme color |
| **HTML5** | Semantic structure for inputs, buttons, and app containers |
| **JavaScript (DOM Styling)** | Dynamic inline color application for real-time theme customization |

---

## 📂 Project Structure

```plaintext
to-do-app/
├── public/
│   ├── favicon/        # Favicon assets & app icons
│   ├── image/          # App screenshots for documentation
│   ├── sounds/         # Interactive sound effects (ding, pop)
│   └── index.html
├── src/
│   ├── components/     # Modular React components & helpers
│   │   ├── Navbar.jsx           # Top navigation bar & date header
│   │   ├── Task.jsx             # Task container, state logic & options modal
│   │   ├── TaskElements.jsx     # Individual task item with inline editing
│   │   └── getFormattedDate.js  # Helper utility for date formatting
│   ├── App.js          # Core application container
│   ├── App.css         # Glassmorphism & layout styles
│   ├── index.js        # React DOM entrypoint
│   └── index.css       # Global resets & typography
├── package.json
└── README.md
```
---

## 🚀 Getting Started Locally

To use these projects locally, follow these steps:  

- **Clone this repository**  
```bash  
git clone https://github.com/TonyStark-19/to-do-app.git
cd to-do-app
```

- **Install dependencies:**
```bash  
npm install
```

- **Start the development server:**
```bash  
npm start
```

---

## 🙌 Acknowledgments

- 💡 Inspired by Microsoft To Do
- Icons by [React Icons](https://react-icons.github.io/react-icons/)

---

Feel free to ⭐️ the repository if you like it!
