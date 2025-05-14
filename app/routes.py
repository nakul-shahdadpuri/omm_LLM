from flask import request, jsonify
import os
import traceback
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# In-memory store for uploaded file metadata
UPLOADED_FILES = []

# Register app routes

def register_routes(app):

    @app.route("/api/upload", methods=["POST"])
    def upload():
        file = request.files.get("file")
        if not file or file.filename == '':
            return jsonify({"error": "No file selected"}), 400

        temp_path = f"/tmp/{file.filename}"
        file.save(temp_path)

        try:
            with open(temp_path, "rb") as f:
                uploaded_file = client.files.create(file=f, purpose="assistants")
            file_id = uploaded_file.id

            UPLOADED_FILES.append({"file_id": file_id, "name": file.filename})

            return jsonify({
                "message": "File uploaded successfully",
                "file_name": file.filename,
                "file_id": file_id
            })
        except Exception as e:
            traceback.print_exc()
            return jsonify({"error": f"Upload failed: {str(e)}"}), 500

    @app.route("/api/documents", methods=["GET"])
    def list_docs():
        return jsonify({"documents": UPLOADED_FILES})

    @app.route("/api/documents/<filename>", methods=["GET"])
    def view_document(filename):
        match = next((f for f in UPLOADED_FILES if f['name'] == filename), None)
        if not match:
            return jsonify({"error": "File not found"}), 404

        return jsonify({"filename": filename, "content": "Viewing document content is not supported for files uploaded with purpose='assistants'."})

    @app.route("/api/ask", methods=["POST"])
    def ask_question():
        data = request.get_json()
        question = data.get("question", "")

        if not question.strip():
            return jsonify({"error": "Question cannot be empty"}), 400

        try:
            thread = client.beta.threads.create()
            print("Thread created:", thread.id)

            client.beta.threads.messages.create(
                thread_id=thread.id,
                role="user",
                content=question
            )
            print("Message sent to thread")

            run = client.beta.threads.runs.create(
                thread_id=thread.id,
                assistant_id="asst_lY2FkYc4pSomJSDF0H8lLCFN"
            )
            print("Run created:", run.id)

            import time
            while True:
                status = client.beta.threads.runs.retrieve(thread_id=thread.id, run_id=run.id)
                if status.status == "completed":
                    print("Run complete")
                    break
                elif status.status == "failed":
                    raise Exception("Run failed")
                time.sleep(1)

            messages = client.beta.threads.messages.list(thread_id=thread.id)
            final_message = messages.data[0].content[0].text.value

            return jsonify({
                "text": final_message,
                "sourceSnippet": "Generated using OpenAI Assistant"
            })
        except Exception as e:
            traceback.print_exc()
            return jsonify({"error": f"Ask failed: {str(e)}"}), 500
