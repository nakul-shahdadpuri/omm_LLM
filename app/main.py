from fastapi import FastAPI
from pydantic import BaseModel
from app.qa_engine import get_qa_chain

app = FastAPI()
qa = get_qa_chain()

class QueryRequest(BaseModel):
    query: str

@app.post("/ask")
def ask_question(request: QueryRequest):
    answer = qa.run(request.query)
    return {"answer": answer}
