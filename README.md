# rmtDev 🚀

**Find your remote developer job with ease**

rmtDev is a modern, responsive web application designed to help developers find remote job opportunities. Built with React, TypeScript, and powered by Vite, it provides a seamless job search experience with advanced filtering, bookmarking, and real-time search capabilities.

![rmtDev Preview](https://bytegrad.com/course-assets/js/2/logo.svg)

## ✨ Features

### 🔍 **Smart Job Search**
- Real-time job search with instant results
- Advanced filtering and sorting options
- Relevance-based and date-based sorting
- Pagination for easy navigation through results

### 📑 **Job Management**
- Detailed job listings with comprehensive information
- Company profiles and job descriptions
- Salary information and job requirements
- Location and duration details

### 🔖 **Bookmarking System**
- Save favorite job listings for later review
- Persistent bookmark storage using local storage
- Quick access to saved jobs via bookmark popover
- Toast notifications for bookmark actions

### 🎨 **Modern UI/UX**
- Clean, responsive design that works on all devices
- Intuitive navigation and user interface
- Loading states and smooth animations
- Accessible components with proper ARIA labels

## 🛠️ Tech Stack

### **Frontend**
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool and dev server

### **State Management & Data Fetching**
- **TanStack Query (React Query)** - Powerful data fetching and caching
- **React Context** - Global state management
- **Custom Hooks** - Reusable logic abstraction

### **UI Components & Styling**
- **Radix UI Icons** - High-quality, accessible icons
- **CSS Modules** - Scoped styling
- **Font Awesome** - Additional icon library

### **Developer Experience**
- **ESLint** - Code linting and formatting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **React Hot Toast** - Beautiful toast notifications
- **Vite HMR** - Hot module replacement for fast development

## 📁 Project Structure

```
rmtdev/
├── public/
│   └── vite.svg
├── src/
│   ├── components/          # React components
│   │   ├── App.tsx         # Main application component
│   │   ├── SearchForm.tsx  # Job search functionality
│   │   ├── JobList*.tsx    # Job listing components
│   │   ├── Bookmarks*.tsx  # Bookmark management
│   │   └── ...
│   ├── contexts/           # React Context providers
│   │   ├── SearchTextContextProvider.tsx
│   │   ├── JobItemsContextProvider.tsx
│   │   ├── BookmarksContextProvider.tsx
│   │   └── ActiveIDContextProvider.tsx
│   ├── lib/               # Utilities and types
│   │   ├── types.ts       # TypeScript type definitions
│   │   ├── hooks.ts       # Custom React hooks
│   │   ├── utils.ts       # Helper functions
│   │   └── constants.ts   # Application constants
│   ├── assets/            # Static assets
│   ├── index.css         # Global styles
│   └── main.tsx          # Application entry point
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── tsconfig*.json        # TypeScript configuration
├── vite.config.ts        # Vite configuration
└── eslint.config.js      # ESLint configuration
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rmtdev
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 📜 Available Scripts

| Script | Description |
|--------|--------------|
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Build the application for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check code quality |

## 🔧 Configuration

### Environment Setup
The application uses a public API endpoint defined in `src/lib/constants.ts`:
```typescript
export const BASE_API_URL = "https://bytegrad.com/course-assets/projects/rmtdev/api/data";
```

### TypeScript Configuration
The project uses multiple TypeScript configurations:
- `tsconfig.json` - Main TypeScript configuration
- `tsconfig.app.json` - Application-specific settings
- `tsconfig.node.json` - Node.js specific settings for build tools

### ESLint Configuration
ESLint is configured with:
- TypeScript support
- React-specific rules
- React Hooks rules
- Modern JavaScript standards

## 🏗️ Architecture

### Component Architecture
The application follows a component-based architecture with:
- **Presentational Components** - Pure UI components
- **Container Components** - Components with business logic
- **Context Providers** - Global state management
- **Custom Hooks** - Reusable logic extraction

### State Management
State is managed through a combination of:
- **React Context** - Global application state
- **TanStack Query** - Server state and caching
- **Local State** - Component-specific state
- **Local Storage** - Persistent bookmark data

### Data Flow
1. User interactions trigger context actions
2. Context providers manage global state
3. Custom hooks abstract complex logic
4. TanStack Query handles API calls and caching
5. Components render based on state changes

## 📱 Features in Detail

### Search Functionality
- **Real-time search** as you type
- **Debounced requests** to optimize performance
- **Search suggestions** and autocomplete
- **Error handling** for failed requests

### Job Listings
- **Paginated results** with customizable page size
- **Sorting options** (relevance, date)
- **Detailed job information** on selection
- **Company information** and links

### Bookmarking
- **Local storage persistence** across sessions
- **Visual indicators** for bookmarked jobs
- **Bookmark management** via popover
- **Toast notifications** for user feedback

## 🎯 Performance Optimizations

- **Code Splitting** - Lazy loading of components
- **React Query Caching** - Efficient data fetching and caching
- **Debounced Search** - Reduced API calls
- **Memoization** - Optimized re-renders
- **Tree Shaking** - Minimal bundle size with Vite

## 🧪 Development

### Code Style
- **TypeScript** for type safety
- **ESLint** for code quality
- **Consistent naming conventions**
- **Component composition patterns**

### Best Practices
- **Separation of concerns**
- **Reusable components**
- **Custom hooks for logic**
- **Error boundaries**
- **Accessibility considerations**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [ByteGrad](https://bytegrad.com) for the API and course assets
- [Radix UI](https://radix-ui.com) for accessible UI components
- [TanStack Query](https://tanstack.com/query) for powerful data fetching
- [Vite](https://vitejs.dev) for the amazing build tool

---

**Built with ❤️ for the developer community**

For questions or support, please open an issue in the repository.
