# omm_LLM

A RAG (Retrieval-Augmented Generation) based LLM for Omm's Enterprise documents search and retrieval system. This application provides an intelligent document search and question-answering system using OpenAI's GPT models combined with vector storage for enterprise document management.

## 🏗️ Architecture

The application follows a modern full-stack architecture:

- **Backend**: Flask-based REST API with OpenAI integration
- **Frontend**: React + TypeScript with Vite, featuring a modern UI with Tailwind CSS
- **Document Processing**: Vector store implementation using OpenAI embeddings
- **Authentication**: Simple localStorage-based authentication system

## 📁 Project Structure

```
omm_LLM/
├── app/                          # Backend Flask application
│   ├── server.py                # Main Flask server
│   ├── routes.py                # API endpoints and business logic
│   └── __init__.py             # Package initialization
├── client/rfp-omm/ui/          # Frontend React application
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

### Backend
- **Flask** - Web framework
- **OpenAI** - GPT models and embeddings
- **Flask-CORS** - Cross-origin resource sharing
- **Python 3.x** - Programming language

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **React Router** - Client-side routing
- **Lucide React** - Icon library

### Document Processing
- **PyMuPDF** - PDF document loading
- **LangChain** - Document processing and text splitting
- **FAISS** - Vector similarity search
- **OpenAI Embeddings** - Document vectorization

## 📋 Prerequisites

- **Python 3.8+**
- **Node.js 16+** and npm
- **OpenAI API Key**

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd omm_LLM
```

### 2. Backend Setup

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

### 3. Frontend Setup

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
The frontend will run on `http://localhost:5173`

## 🔧 Configuration

### Backend Configuration
- **Vector Store ID**: Update `VECTOR_STORE_ID` in `app/routes.py`
- **Assistant ID**: Update `assistant_id` in the ask endpoint
- **API Base URL**: Configure in frontend components for production deployment

### Frontend Configuration
- **API Endpoint**: Update base URL in `StudyApp.tsx` for production
- **Authentication**: Currently uses localStorage-based authentication

## 📖 API Documentation

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

## 🎯 Usage

### For End Users
1. **Login**: Access the application through the login page
2. **Upload Documents**: Use the upload interface to add PDF documents
3. **Ask Questions**: Type natural language questions about your documents
4. **View Results**: Get AI-powered answers with source information
5. **Browse Documents**: View and manage uploaded documents

### For Developers
1. **Vector Store Setup**: Use `scripts/build_vector_store.py` to initialize vector storage
2. **Document Processing**: Utilize `utils/load_documents.py` for document handling
3. **API Integration**: Extend the REST API by adding new routes in `app/routes.py`
4. **UI Components**: Create new React components in `client/rfp-omm/ui/src/components/`

## 🏃‍♂️ Running in Production

### Backend Deployment
1. Set environment variables for production
2. Use a production WSGI server like Gunicorn:
```bash
gunicorn -w 4 -b 0.0.0.0:8000 app.server:create_app()
```

### Frontend Deployment
1. Build the production bundle:
```bash
npm run build
```
2. Serve the built files using a web server like Nginx

## 🐛 Troubleshooting

### Common Issues
- **OpenAI API Key**: Ensure your API key is valid and has sufficient credits
- **Vector Store**: Verify the vector store ID exists in your OpenAI account
- **CORS Issues**: Check that Flask-CORS is properly configured
- **File Upload**: Ensure proper file permissions for temporary file storage

### Debug Mode
- Backend runs in debug mode by default for development
- Check browser console for frontend errors
- Monitor Flask logs for backend issues

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