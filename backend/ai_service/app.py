from pymongo.mongo_client import MongoClient
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores.mongodb_atlas import MongoDBAtlasVectorSearch
from langchain.llms.openai import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from flask import Flask, request
import os


llm = OpenAI(temperature=0.7)
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
embedding = OpenAIEmbeddings()
col = client.get_default_database().get_collection("embeddings")
vectordb = MongoDBAtlasVectorSearch(embedding=embedding, collection=col, index_name="embedding_index")
app = Flask(__name__)

@app.route('/')
def hello():
    query = request.args.get('query')
    print(query)
    user = request.args.get('user')

    docs = vectordb.similarity_search(query, pre_filter={
        "userId": {
            "$eq": user
        }
    })    
    
    print(docs)
    
    docs_page_content = " ".join([d.page_content for d in docs])
    prompt = PromptTemplate(
        input_variables=["docs", "question"],
                        template="""
                        You're a helpful assistant. Here are relevant information you might need to answer a question:
                        {docs}
                        
                        Please answer this question:
                        {question}
                    
                        """
    )

    chain = LLMChain(llm=llm, prompt=prompt)
    response = chain.run(question=query, docs=docs_page_content)
    return response

if __name__ == '__main__':
    app.run(host="0.0.0.0")
