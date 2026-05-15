# import chromadb

# client = chromadb.PersistentClient(
#     path="./chroma_db"
# )

# collection = client.get_or_create_collection(
#     name="workflow_memory"
# )

# def save_memory(data):

#     collection.add(
#         documents=[str(data)],
#         ids=[str(hash(str(data)))]
#     )

# def get_memory():

#     return collection.get()

import chromadb

client = chromadb.PersistentClient(
    path="./chroma_db"
)

collection = client.get_or_create_collection(
    name="workflow_memory"
)

def save_memory(text):

    collection.add(
        documents=[text],
        ids=[str(hash(text))]
    )

def retrieve_memory(query):

    results = collection.query(
        query_texts=[query],
        n_results=2
    )

    docs = results.get("documents", [[]])

    if docs and len(docs[0]) > 0:
        return "\n".join(docs[0])

    return ""