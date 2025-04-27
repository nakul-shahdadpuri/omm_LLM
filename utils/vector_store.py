import faiss
import numpy as np

class VectorStore:
    def __init__(self, dimension=1536):
        self.index = faiss.IndexFlatL2(dimension)
        self.text_chunks = []

    def add(self, embeddings, texts):
        self.index.add(np.array(embeddings).astype('float32'))
        self.text_chunks.extend(texts)

    def search(self, embedding, k=5):
        D, I = self.index.search(np.array([embedding]).astype('float32'), k)
        return [self.text_chunks[i] for i in I[0]]
