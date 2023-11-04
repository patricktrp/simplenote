from pymongo.mongo_client import MongoClient
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.docstore.document import Document
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores.mongodb_atlas import MongoDBAtlasVectorSearch
from flask import Flask
import os

MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
app = Flask(__name__)

@app.route('/', methods=['POST'])
def hello():
    return "Hello"

if __name__ == '__main__':
    app.run()
