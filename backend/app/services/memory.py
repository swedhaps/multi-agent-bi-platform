import chromadb

client = chromadb.PersistentClient(
    path="./chroma_db"
)

collection = client.get_or_create_collection(
    name="workflow_memory"
)

def save_memory(data):

    collection.add(
        documents=[str(data)],
        ids=[str(hash(str(data)))]
    )

def get_memory():

    results = collection.get()

    return results