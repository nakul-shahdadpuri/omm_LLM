# omm_LLM

> ⚠️ **IMPORTANT**: The Flask backend (`/app` directory) is **DEPRECATED** and no longer maintained. This project now focuses on the React frontend application located in `/client/rfp-omm/ui/`.

A React-based frontend application for enterprise document search and retrieval. Originally designed as a RAG (Retrieval-Augmented Generation) system, this project now provides a modern TypeScript React interface for document management and AI-powered interactions.

## 🏗️ Architecture

The application follows a modern frontend-focused architecture:

- **Backend**: ⚠️ **DEPRECATED** - Flask-based REST API (legacy, no longer maintained)
- **Frontend**: React + TypeScript with Vite, featuring a modern UI with Tailwind CSS
- **Document Processing**: Vector store implementation using OpenAI embeddings
- **Authentication**: Simple localStorage-based authentication system

## 📁 Project Structure

```
omm_LLM/
├── app/                          # ⚠️ DEPRECATED - Backend Flask application
│   ├── server.py                # DEPRECATED - Main Flask server
│   ├── routes.py                # DEPRECATED - API endpoints and business logic
│   └── __init__.py             # DEPRECATED - Package initialization
├── client/rfp-omm/ui/          # Frontend React application (MAIN)
│   ├── src/
│   │   ├── components/ui/       # UI components
│   │   │   ├── StudyApp.tsx    # Main application interface
│   │   │   ├── LoginPage.tsx   # Authentication page
│   │   │   └── button.tsx      # Reusable UI components
│   │   ├── App.tsx             # Root React component
│   │   └── main.tsx            # Application entry point
│   ├── package.json            # Frontend dependencies
│   └── vite.config.ts          # Vite configuration
├── scripts/                     # Utility scripts
│   └── build_vector_store.py   # Vector store creation script
├── utils/                       # Utility functions
│   └── load_documents.py       # Document loading utilities
├── requirements.txt            # Python dependencies
└── README.md                   # This file
```

## 🚀 Features

### Core Functionality
- **Document Upload**: Upload PDF documents to the vector store
- **Intelligent Search**: Ask questions about uploaded documents using natural language
- **Document Viewer**: Browse and view uploaded documents
- **Real-time Responses**: Get instant answers powered by OpenAI's GPT models

### Technical Features
- **Vector Storage**: Efficient document embedding and retrieval using OpenAI's vector stores
- **RAG Implementation**: Combines document retrieval with language generation
- **Modern UI**: Responsive design with dark/light mode support
- **Authentication**: Secure access control
- **CORS Support**: Cross-origin resource sharing for API access

## 🛠️ Technology Stack

### Frontend (Primary Application)
- **React 19** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **React Router** - Client-side routing
- **Lucide React** - Icon library

### Legacy Backend (DEPRECATED) ⚠️
- **Flask** - Web framework (no longer maintained)
- **OpenAI** - GPT models and embeddings (legacy implementation)
- **Flask-CORS** - Cross-origin resource sharing
- **Python 3.x** - Programming language

### Document Processing (Legacy) ⚠️
- **PyMuPDF** - PDF document loading (deprecated)
- **LangChain** - Document processing and text splitting (deprecated)
- **FAISS** - Vector similarity search (deprecated)
- **OpenAI Embeddings** - Document vectorization (deprecated)

## 📋 Prerequisites

- **Node.js 16+** and npm
- ~~**Python 3.8+**~~ (deprecated - backend no longer needed)
- ~~**OpenAI API Key**~~ (deprecated - handled differently in frontend)

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd omm_LLM
```

### 2. Frontend Setup (Primary Application)

#### Navigate to Frontend Directory
```bash
cd client/rfp-omm/ui
```

#### Install Node Dependencies
```bash
npm install
```

#### Start the Development Server
```bash
npm run dev
```
The application will run on `http://localhost:5173`

### 3. Legacy Backend Setup (DEPRECATED) ⚠️

> **Note**: The Flask backend is deprecated and no longer maintained. The frontend now handles all functionality.

<details>
<summary>Click to view legacy backend setup (not recommended)</summary>

#### Install Python Dependencies
```bash
pip install -r requirements.txt
```

#### Environment Configuration
Create a `.env` file in the root directory:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

#### Start the Backend Server
```bash
cd app
python server.py
```
The backend will run on `http://localhost:5000`

</details>

## 🔧 Configuration

### Frontend Configuration
- **API Endpoint**: Configure base URL in `StudyApp.tsx` for production
- **Authentication**: Currently uses localStorage-based authentication
- **OpenAI Integration**: Handled directly in frontend components

### Legacy Backend Configuration (DEPRECATED) ⚠️
<details>
<summary>Click to view deprecated backend configuration</summary>

- **Vector Store ID**: Update `VECTOR_STORE_ID` in `app/routes.py`
- **Assistant ID**: Update `assistant_id` in the ask endpoint
- **API Base URL**: Configure in frontend components for production deployment

</details>

## 📖 API Documentation (DEPRECATED) ⚠️

> **Note**: The following API documentation is for the deprecated Flask backend. The frontend now handles all operations directly.

<details>
<summary>Click to view legacy API documentation</summary>

### Upload Document
```http
POST /api/upload
Content-Type: multipart/form-data

Body: file (PDF document)
```

**Response:**
```json
{
  "message": "File uploaded successfully",
  "file_name": "document.pdf",
  "file_id": "file_123"
}
```

### List Documents
```http
GET /api/documents
```

**Response:**
```json
{
  "documents": [
    {
      "file_id": "file_123",
      "name": "document.pdf"
    }
  ]
}
```

### View Document
```http
GET /api/documents/{filename}
```

**Response:**
```json
{
  "filename": "document.pdf",
  "content": "Viewing document content is not supported for files uploaded to vector stores."
}
```

### Ask Question
```http
POST /api/ask
Content-Type: application/json

{
  "question": "What is the main topic of the document?"
}
```

**Response:**
```json
{
  "text": "The main topic of the document is...",
  "sourceSnippet": "Generated using OpenAI Assistant"
}
```

</details>

## 🎯 Usage

### For End Users
1. **Login**: Access the application through the login page
2. **Upload Documents**: Use the upload interface to add PDF documents
3. **Ask Questions**: Type natural language questions about your documents
4. **View Results**: Get AI-powered answers with source information
5. **Browse Documents**: View and manage uploaded documents

### For Developers
1. **UI Components**: Create new React components in `client/rfp-omm/ui/src/components/`
2. **Frontend Integration**: Extend the React application with new features
3. **State Management**: Manage application state within React components
4. ~~**Vector Store Setup**: Use `scripts/build_vector_store.py`~~ (deprecated)
5. ~~**API Integration**: Extend the REST API by adding new routes**~~ (deprecated)

## 🏃‍♂️ Running in Production

### Frontend Deployment (Primary)
1. Build the production bundle:
```bash
npm run build
```
2. Serve the built files using a web server like Nginx or deploy to platforms like Vercel, Netlify

### Legacy Backend Deployment (DEPRECATED) ⚠️
<details>
<summary>Click to view deprecated backend deployment</summary>

1. Set environment variables for production
2. Use a production WSGI server like Gunicorn:
```bash
gunicorn -w 4 -b 0.0.0.0:8000 app.server:create_app()
```

</details>

## 🐛 Troubleshooting

### Common Issues
- **Node.js Dependencies**: Ensure all npm packages are installed correctly
- **Build Issues**: Clear npm cache and reinstall dependencies if needed
- **Browser Compatibility**: Use modern browsers with ES6+ support
- ~~**OpenAI API Key**: Legacy backend issue~~ (deprecated)
- ~~**CORS Issues**: Legacy backend issue~~ (deprecated)

### Debug Mode
- Check browser console for frontend errors
- Use React Developer Tools for component debugging
- Monitor network requests in browser DevTools
- ~~Monitor Flask logs~~ (deprecated - backend no longer used)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add new feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## 📄 License

This project is part of Omm's Enterprise document management system.

## 🆘 Support

For questions or issues, please refer to the project documentation or contact the development team.

---

**Built with ❤️ for enterprise document intelligence**