# Kanban Task Board

Lightweight Trello-like application for task tracking (To Do / In Progress / Done).  
Built with **Vite + React + TypeScript + TailwindCSS**.  
Evaluation project.

---

## ✨ Features

- Three columns: **To Do**, **In Progress**, **Done**
- Initial tasks fetched from [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
- Drag & Drop support for moving tasks between columns
- Local state management with `useReducer`
- Data persistence in **localStorage**
- Responsive layout (1 column <600px, 2 columns 600–960px, 3 columns ≥960px)
- Pixel-perfect design matching provided Figma

---

## 🚀 Setup & Run

Clone the repository:

```bash
git clone https://github.com/d-roncevic/slothui.git
```

Select repo

```bash
cd "slothui"
```

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

## 🛠️ Tech Stack

[Vite](https://vite.dev/) – build tool & dev server

[React](https://react.dev/) – UI library

[TypeScript](https://www.typescriptlang.org/) – type safety

[TailwindCSS](https://tailwindcss.com/) – utility-first CSS framework

[JSONplaceholder](https://jsonplaceholder.typicode.com/) – mock API for demo data

## 📂 Project Structure

```bash
src/
├── components/   # Reusable UI components
├── hooks/        # Custom hooks (e.g. useLocalStorage)
├── reducers/     # useReducer logic for tasks
├── App.tsx       # Main app component
├── main.tsx      # Entry point
└── index.css     # TailwindCSS entry
```

## 📦 Notes

This project is based on the official [Vite + React + TypeScript](https://vite.dev/guide/) template
and extended with TailwindCSS and custom features.

## 📜 License

This project is created for evaluation purposes.
Feel free to use it as a reference.
