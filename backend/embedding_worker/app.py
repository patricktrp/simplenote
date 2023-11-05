from pymongo.mongo_client import MongoClient
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.docstore.document import Document
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores.mongodb_atlas import MongoDBAtlasVectorSearch
import os

MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)

collection = client.get_default_database().get_collection("note")

change_stream = collection.watch(full_document="updateLookup")
for change in change_stream:
    
    operation_type = change["operationType"]
    if operation_type == "replace":
     
        full_doc = change['fullDocument']
        raw_content = full_doc['rawContent']
        original_document = full_doc['_id']
        user_id = full_doc['userId']
        
        collection = client.get_default_database().get_collection("embeddings")
        collection.delete_many({"originalDocument": original_document})
        
        doc = Document(page_content=raw_content, metadata={"userId": user_id, "originalDocument": original_document})
        
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        documents = text_splitter.split_documents([doc])
        
        
        embedding = OpenAIEmbeddings()
        col = client.get_default_database().get_collection("embeddings")
        vec = MongoDBAtlasVectorSearch.from_documents(documents, embedding, collection=collection)
    
    if operation_type == "delete":
        doc_id = change['documentKey']['_id']
        collection = client.get_default_database().get_collection("embeddings")
        collection.delete_many({"originalDocument": doc_id})