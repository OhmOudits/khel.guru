# Khel Guru - Enhanced Gaming Platform

Khel Guru is a modern, full-stack gaming platform featuring casino games and sports betting with real-time multiplayer functionality.

## 🚀 Recent Improvements

### Frontend Enhancements

#### 🎨 **Modern Design System**

- **Enhanced Color Palette**: New semantic color system with brand, background, interactive, text, and game-specific colors
- **Improved Accessibility**: Better contrast ratios and consistent color usage
- **Custom Animations**: Added glow effects, smooth transitions, and loading animations
- **Responsive Design**: Enhanced mobile-first approach with better spacing and typography

#### 🏗️ **Architecture Improvements**

- **Component Refactoring**: Broke down large components into smaller, reusable modules
- **Custom Hooks**: Created `useAuthState` and `useModalState` for better state management
- **Error Boundaries**: Added comprehensive error handling with user-friendly error pages
- **Lazy Loading**: Implemented code splitting for better performance
- **Centralized Routing**: Organized all routes in a dedicated component with loading states

#### 🔧 **API Integration**

- **Centralized API Service**: Created a robust API client with interceptors
- **Automatic Token Management**: JWT token handling with automatic refresh
- **Retry Logic**: Network error recovery with exponential backoff
- **Error Handling**: Consistent error formatting and user feedback
- **Type Safety**: Better request/response handling

#### 🎮 **User Experience**

- **Modern Loading States**: Beautiful loading spinners and skeleton loaders
- **Modal Management**: Improved modal system with backdrop and proper z-indexing
- **Toast Notifications**: Enhanced notification system with custom styling
- **Performance**: Optimized bundle size and loading times

### Backend Enhancements

#### 🛡️ **Security Improvements**

- **Enhanced Error Handling**: Custom error classes with proper HTTP status codes
- **Rate Limiting**: Intelligent rate limiting for different endpoint types
- **Security Headers**: Comprehensive security headers and CORS configuration
- **Input Validation**: Better request validation and sanitization
- **Environment Configuration**: Proper environment variable management

#### 🏗️ **Code Quality**

- **Middleware Organization**: Modular middleware for different concerns
- **Error Logging**: Comprehensive error logging with context
- **Health Checks**: Added health endpoint for monitoring
- **Async Handling**: Proper async error wrapping

#### 📊 **Performance**

- **Database Optimization**: Better query patterns and indexing
- **Memory Management**: Efficient rate limiting with cleanup
- **Request Optimization**: Larger payload limits for better UX

## 🛠️ Tech Stack

### Frontend

- **React 18** with hooks and modern patterns
- **Redux Toolkit** for state management
- **React Router** for client-side routing
- **Tailwind CSS** with custom design system
- **Framer Motion** for animations
- **Socket.io Client** for real-time features
- **Axios** for API communication

### Backend

- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **Socket.io** for real-time communication
- **JWT** for authentication
- **Helmet** for security headers
- **Morgan** for logging
- **Bcrypt** for password hashing

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd khel-guru
   ```

2. **Setup Frontend**

   ```bash
   cd khel.guru
   npm install

   # Copy environment file and configure
   cp .env.example .env
   # Edit .env with your configuration

   npm run dev
   ```

3. **Setup Backend**

   ```bash
   cd ../khel.guru-backend
   npm install

   # Copy environment file and configure
   cp .env.example .env
   # Edit .env with your configuration

   npm run dev
   ```

### Environment Configuration

#### Frontend (.env)

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_API_BASE_URL=http://localhost:8080/api
VITE_SOCKET_URL=http://localhost:8080
```

#### Backend (.env)

```env
MONGODB_URI=mongodb://localhost:27017/khelguru
JWT_SECRET=your_super_secret_jwt_key
PORT=8080
NODE_ENV=development
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🎮 Features

### 🎰 Casino Games

- **Wheel**: Spin-to-win game with customizable multipliers
- **Mines**: Risk-based treasure hunting game
- **Crash**: Multiplier crash game with real-time betting
- **Plinko**: Ball-drop physics game
- **Blackjack**: Classic card game with dealer AI
- **Baccarat**: Elegant card game with side bets
- **Roulette**: European and American variants
- **Dice**: Customizable dice rolling with odds
- **And many more...**

### ⚽ Sports Betting

- **Live Events**: Real-time sports event betting
- **Multiple Sports**: Cricket, Football, Tennis, Badminton
- **Live Odds**: Dynamic odds updating
- **Bet History**: Comprehensive betting records

### 🔐 User Management

- **Authentication**: Secure login/register with JWT
- **Profile Management**: User settings and preferences
- **Wallet System**: Deposits, withdrawals, and balance tracking
- **Game History**: Complete gaming activity logs

### 🎯 Real-time Features

- **Live Gaming**: Real-time multiplayer games
- **Live Chat**: In-game communication
- **Live Statistics**: Real-time game analytics
- **Push Notifications**: Important updates and alerts

## 📱 Design System

### Color Palette

- **Brand Colors**: Primary (#00D4AA), Secondary (#9945FF), Accent (#FFD700)
- **Background**: Dark theme with multiple surface levels
- **Interactive**: Hover states and feedback colors
- **Status**: Success, warning, error, and info states
- **Game-specific**: Win/loss, multiplier, and jackpot colors

### Typography

- **Responsive**: Fluid typography scaling
- **Hierarchy**: Clear heading and text sizes
- **Readability**: Optimized line heights and spacing

### Components

- **Buttons**: Multiple variants with states
- **Cards**: Consistent card components
- **Modals**: Centered modal system
- **Forms**: Styled form inputs and validation

## 🧪 Testing

```bash
# Frontend tests
cd khel.guru
npm test

# Backend tests
cd khel.guru-backend
npm test
```

## 📦 Deployment

### Frontend

```bash
npm run build
# Deploy dist/ folder to your hosting platform
```

### Backend

```bash
# Set production environment variables
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@khelguru.com or join our Discord community.

## 🔮 Roadmap

- [ ] Mobile app development
- [ ] Advanced analytics dashboard
- [ ] Social features and tournaments
- [ ] Cryptocurrency integration
- [ ] AI-powered game recommendations
- [ ] Progressive Web App (PWA) features

---

**Made with ❤️ by the Khel Guru Team**
