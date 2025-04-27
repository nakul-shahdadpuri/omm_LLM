from fastapi import FastAPI, UploadFile
from utils.pdf_reader import extract_text_from_pdf
from utils.chunker import chunk_text
from utils.embedder import get_embedding
from utils.vector_store import VectorStore
from utils.rag_pipeline import RAGPipeline
import os

app = FastAPI()

vector_store = VectorStore()
rag_pipeline = RAGPipeline(vector_store)

@app.post("/upload/")
async def upload_pdf(file: UploadFile):
    contents = await file.read()
    path = f"data/{file.filename}"
    with open(path, "wb") as f:
        f.write(contents)

    text = extract_text_from_pdf(path)
    chunks = chunk_text(text)
    embeddings = [get_embedding(chunk) for chunk in chunks]
    vector_store.add(embeddings, chunks)

    return {"message": f"{file.filename} uploaded and processed."}

@app.get("/query/")
async def ask_question(q: str):
    answer = rag_pipeline.query(q)
    return {"answer": answer}
