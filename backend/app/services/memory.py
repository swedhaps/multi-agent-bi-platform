
import chromadb

client = chromadb.PersistentClient(path="./chroma_db")
collection = client.get_or_create_collection("memory")

def save_memory(text):
    collection.add(
        documents=[text],
        ids=[str(hash(text))]
    )

def search_memory(query):
    result = collection.query(query_texts=[query], n_results=3)
    return result
