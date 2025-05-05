# scripts/build_vector_store.py

import os
from dotenv import load_dotenv
from tqdm import tqdm
from langchain_community.document_loaders import PyMuPDFLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings

load_dotenv()

RAW_DOCS_PATH = "./data/raw_docs"
DB_FAISS_PATH = "./data/index"

def build_vector_store():
    print("🔍 Loading PDFs...")
    documents = []
    for file in os.listdir(RAW_DOCS_PATH):
        if file.endswith(".pdf"):
            path = os.path.join(RAW_DOCS_PATH, file)
            loader = PyMuPDFLoader(path)
            docs = loader.load()
            documents.extend(docs)
            print(f"✅ Loaded {len(docs)} pages from {file}")

    print(f"\n📄 Total docs loaded: {len(documents)}")

    splitter = CharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    chunks = splitter.split_documents(documents)
    print(f"✂️ Split into {len(chunks)} chunks.")

    embedding_model = OpenAIEmbeddings(openai_api_key=os.getenv("OPENAI_API_KEY"))
    all_texts = [doc.page_content for doc in chunks]
    all_metas = [doc.metadata for doc in chunks]

    batch_size = 20
    all_vectors = []
    print("\n⚙️ Embedding in batches (avoid token limits)...")
    for i in tqdm(range(0, len(all_texts), batch_size)):
        batch_texts = all_texts[i:i + batch_size]
        batch_vectors = embedding_model.embed_documents(batch_texts)
        all_vectors.extend(batch_vectors)

    print("\n💾 Building FAISS index manually (no re-embedding)...")

    # Build FAISS index from embeddings directly
    vectordb = FAISS.from_embeddings(
        list(zip(all_vectors, all_texts)),  # each item: (vector, text)
        embedding=embedding_model,
        metadatas=all_metas
    )

    vectordb.save_local(DB_FAISS_PATH)
    print(f"\n✅ Vector store saved to: {DB_FAISS_PATH}")

if __name__ == "__main__":
    build_vector_store()
