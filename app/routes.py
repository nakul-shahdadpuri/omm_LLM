from flask import request, jsonify

def register_routes(app):

    # Demo: Upload document
    @app.route("/api/upload", methods=["POST"])
    def upload():
        file = request.files.get("file")
        if not file or file.filename == '':
            return jsonify({"error": "No file selected"}), 400

        return jsonify({
            "message": "(Demo) File uploaded successfully",
            "file_name": file.filename,
            "file_id": "demo-file-id",
            "vector_store_id": "demo-vector-store-id"
        })

    # Demo: List all documents
    @app.route("/api/documents", methods=["GET"])
    def list_docs():
        return jsonify({
            "documents": [
                {"file_id": "demo-file-1", "name": "Resume_Alice.pdf"},
                {"file_id": "demo-file-2", "name": "JobDescription_Backend.txt"}
            ]
        })

    # Demo: Get specific document content
    @app.route("/api/documents/<filename>", methods=["GET"])
    def view_document(filename):
        return jsonify({
            "filename": filename,
            "content": f"(Demo) This is the content of {filename}."
        })

    # Demo: Ask a question across documents
    @app.route("/api/ask", methods=["POST"])
    def ask_question():
        data = request.get_json()
        question = data.get("question", "")
        return jsonify({
            "text": f"(Demo) This is a mock response to your question: '{question}'",
            "sourceSnippet": "(Demo) Answer generated from internal knowledge base"
        })
