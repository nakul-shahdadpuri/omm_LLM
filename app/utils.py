import os
import docx2txt
import fitz 
from langchain.text_splitter import RecursiveCharacterTextSplitter

def extract_text_from_pdf(file_path):
    doc = fitz.open(file_path)
    return "\n".join(page.get_text() for page in doc)


def extract_text_from_docx(file_path):
    return docx2txt.process(file_path)

def load_all_documents(folder_path):
    texts = []
    for fname in os.listdir(folder_path):
        path = os.path.join(folder_path, fname)
        if fname.endswith(".pdf"):
            text = extract_text_from_pdf(path)
        elif fname.endswith(".docx"):
            text = extract_text_from_docx(path)
        else:
            continue
        texts.append((fname, text))
    return texts

def chunk_documents(texts, chunk_size=1000, chunk_overlap=100):
    splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
    return [(fname, chunk) for fname, text in texts for chunk in splitter.split_text(text)]
