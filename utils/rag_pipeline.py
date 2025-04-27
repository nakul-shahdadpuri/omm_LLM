from .embedder import get_embedding
from .vector_store import VectorStore
import openai
from config import CHAT_MODEL, OPENAI_API_KEY

openai.api_key = OPENAI_API_KEY

class RAGPipeline:
    def __init__(self, vector_store):
        self.vector_store = vector_store

    def query(self, question, top_k=5):
        q_emb = get_embedding(question)
        context_chunks = self.vector_store.search(q_emb, k=top_k)

        prompt = f"""You are an assistant working for Omm IT solutions helping with RFP analysis. Use the context to answer the question.

                    Context:
                    {''.join(context_chunks)}

                    Question: {question}
                    Answer:"""

        response = openai.ChatCompletion.create(
            model=CHAT_MODEL,
            messages=[{"role": "user", "content": prompt}]
        )
        return response['choices'][0]['message']['content']
