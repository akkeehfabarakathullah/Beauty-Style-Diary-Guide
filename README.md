# ⚡ Beauty & Style Diary Guide

A sleek, modern, and minimal diary tracker for all things beauty and fashion. Built with React, TypeScript, Vite, and Tailwind CSS – this template provides an efficient starting point to log and manage your skincare and fashion routines.


## ✨ Features

- ✅ **Advanced Entry Management**
  - Prioritize entries (High, Medium, Low)
  - Tagging system for flexible organization
  - Delete confirmations to avoid accidental loss

- 🔍 **Search & Filtering**
  - Search by title, notes, or tags
  - Filter by category (skincare / fashion)
  - Filter by status (completed / pending)
  - Sort entries by date or priority

- 📊 **Statistics Dashboard**
  - Entry count overview
  - Completed entry count
  - Breakdown by category
  - Toggle stats view on/off

- 📝 **Enhanced Entry Form**
  - Select priority level
  - Add/remove tags
  - Improved form validation

- 💄 **Visual Improvements**
  - Color-coded priorities
  - Better spacing & layout
  - Entry tag badges
  - Fully responsive design

- 💡 **Improved UX**
  - Modal confirmation for deletions
  - Visual feedback for actions
  - Clean and intuitive UI controls

## ⚙️ Technologies Used

- ⚡ **Vite** – Lightning-fast build tool  
- ⚛️ **React 18** – Component-based UI  
- 🟦 **TypeScript** – Type safety from start to finish  
- 🎨 **Tailwind CSS** – Utility-first styling  
- 🧹 **ESLint** – Code quality and linting  
- 💎 **Lucide React** – Modern icon library  
- 🔑 **UUID** – Unique identifier generator  

## 🚀 Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/beauty-style-diary
   cd beauty-style-diary
   ```

2. Install dependencies:
   ```bash
   npm install
   npm install vite --save-dev
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser at:
   ```
   http://localhost:5173
   ```

## 📁 Project Structure

```
beauty-style-diary/
├── index.html              # Root HTML file
├── src/
│   ├── components/         # Reusable React components
│   ├── App.tsx             # Root application component
│   └── main.tsx            # App entry point
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.ts          # Vite config
├── tsconfig.json           # TypeScript config
└── package.json            # Project metadata & scripts
```

## 📦 Available Scripts

| Command          | Description                         |
|------------------|-------------------------------------|
| `npm run dev`    | Start the local development server  |
| `npm run build`  | Build for production                |
| `npm run preview`| Preview the production build        |
| `npm run lint`   | Run ESLint to check code quality    |

## 📱 Responsive Design

- Mobile-first with full responsiveness across:
  - 📱 Mobile: `<768px`
  - 💻 Tablet: `768px - 1024px`
  - 🖥️ Desktop: `>1024px`

## 🎨 Customization

Easily customize the app layout, tags, color scheme, and more using Tailwind and modular React components.

Update `tailwind.config.js`:
```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#EF7C8E',
        secondary: '#FAE8E0',
      },
    },
  },
};
```

## 🌐 Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to:
   - Vercel
   - Netlify
   - GitHub Pages
   - Your custom host

## 🤝 Contributing

Contributions are welcome!  
To contribute:

1. Fork the repo  
2. Create a new branch  
3. Commit your changes  
4. Open a pull request  

## 📄 License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by **akkeehfa barakathullah**  
_Stay stylish, stay beautiful._
