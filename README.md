# 🌹 Lovella - Couple's Love Diary

A beautiful, private web application for couples to preserve their love story, share memories, and build their future together.

## 🚀 Live Demo

- **Frontend**: [https://lovella.vercel.app](https://lovella.vercel.app)
- **Backend**: [https://lovella-backend.onrender.com](https://lovella-backend.onrender.com)

## ✨ Features

### 💕 Core Features
- **Private Couple Space** - Secure, personalized dashboard
- **Memory Gallery** - Upload and caption precious photos
- **Love Story** - Document your journey together
- **Achievements & Goals** - Track milestones and future dreams
- **Private Chat** - Intimate message exchange
- **Anniversary Countdown** - Never forget special dates

### 🎨 Beautiful Design
- **Romantic UI/UX** - Beautiful pink/rose gold theme
- **Responsive Design** - Works perfectly on all devices
- **Smooth Animations** - Heart beats and fade transitions
- **Custom Fonts** - Dancing Script, Playfair Display, Poppins

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **React Router** - Navigation
- **React Hot Toast** - Beautiful notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **JWT** - Authentication
- **Cloudinary** - Image storage

## 🚀 Quick Start

### Prerequisites
- Node.js 14+
- MongoDB Atlas account

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/Itsshisia/Lovella.git
cd Lovella
```

2. **Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

3. **Setup Frontend** (in new terminal)
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your backend URL
npm run dev
```

4. **Open your browser**
```
http://localhost:3000
```

## 🌐 Deployment

This project is deployed using:
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB Atlas

### Environment Variables

**Backend (.env)**
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=https://lovella.vercel.app
```

**Frontend (.env)**
```env
VITE_API_URL=https://lovella-backend.onrender.com/api
```

## 📱 Usage

1. **Register** - Create your couple account
2. **Add Memories** - Upload photos to your gallery
3. **Write Story** - Document your love journey
4. **Set Goals** - Plan your future together
5. **Chat** - Share intimate messages
6. **Celebrate** - Track anniversaries and milestones

## 🎯 Project Structure

```
Lovella/
├── backend/
│   ├── controllers/     # Route controllers
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── middleware/     # Auth & upload middleware
│   ├── server.js       # Main server file
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── pages/      # Page components
│   │   ├── context/    # React context
│   │   └── services/   # API services
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - User login

### Gallery
- `GET /api/gallery` - Get images
- `POST /api/gallery/upload` - Upload image
- `DELETE /api/gallery/:id` - Delete image

### Story
- `GET /api/story` - Get couple story
- `PUT /api/story` - Update story

### Achievements
- `GET /api/achievements` - Get achievements
- `POST /api/achievements` - Create achievement

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📞 Support

If you need help:
- **Open an issue** on GitHub
- **Check the documentation**
- **Contact the development team**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎉 Acknowledgments

- Icons and emojis from Twemoji
- Beautiful couple photos from Unsplash
- Romantic color palette inspired by love themes
- Fonts from Google Fonts

---

**Made with 💕 for couples in love**

*Your love story deserves to be remembered forever* 🌹

## 🔗 Links

- **Live Site**: [https://lovella.vercel.app](https://lovella.vercel.app)
- **GitHub Repository**: [https://github.com/Itsshisia/Lovella](https://github.com/Itsshisia/Lovella)
- **Backend API**: [https://lovella-backend.onrender.com](https://lovella-backend.onrender.com)

---
*Start your love story today at [lovella.vercel.app](https://lovella.vercel.app)* 🚀