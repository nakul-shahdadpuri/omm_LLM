import openai
from config import OPENAI_API_KEY, EMBEDDING_MODEL

openai.api_key = OPENAI_API_KEY

def get_embedding(text):
    response = openai.Embedding.create(
        model=EMBEDDING_MODEL,
        input=text
    )
    return response['data'][0]['embedding']
