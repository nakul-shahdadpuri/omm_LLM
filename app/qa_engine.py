import os
from dotenv import load_dotenv
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings
from langchain.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA
from app.utils import load_all_documents, chunk_documents

load_dotenv()
os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")

embedding_model = OpenAIEmbeddings()
index_path = "index/vectordb"

def build_or_load_index(data_dir):
    faiss_file = os.path.join(index_path, "index.faiss")
    if os.path.exists(faiss_file):
        return FAISS.load_local(index_path, embedding_model, allow_dangerous_deserialization=True)
    
    # Build new index from scratch
    texts = load_all_documents(data_dir)
    chunks = chunk_documents(texts)
    docs = [f"[{fname}]\n{chunk}" for fname, chunk in chunks]
    vectordb = FAISS.from_texts(docs, embedding_model)
    vectordb.save_local(index_path)
    return vectordb


def get_qa_chain():
    db = build_or_load_index("data/raw_docs")
    retriever = db.as_retriever(search_kwargs={"k": 5})
    llm = ChatOpenAI(model_name="gpt-4", temperature=0)
    return RetrievalQA.from_chain_type(llm=llm, retriever=retriever)
