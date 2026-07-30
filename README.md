# MortgageMate-AI-RAG-based-Mortgage-Assistant-
Ask anything about a home loans and mortgaging to Indian banks and even talk to it live.
#Entire project workflow
```text

                                         ┌──────────────────────────┐
                                         │        CUSTOMER          │
                                         │  Web / Mobile App        │
                                         └─────────────┬────────────┘
                                                       │
                                                       ▼
                                         ┌──────────────────────────┐
                                         │    React / Flutter UI    │
                                         └─────────────┬────────────┘
                                                       │ HTTPS
                                                       ▼
                                         ┌──────────────────────────┐
                                         │     FastAPI Backend      │
                                         │ Authentication           │
                                         │ Business Logic           │
                                         │ API Gateway              │
                                         └─────────────┬────────────┘
                                                       │
                              ┌────────────────────────┼─────────────────────────┐
                              │                        │                         │
                              ▼                        ▼                         ▼
                    User Question              User History              Loan Database
                              │                  PostgreSQL               PostgreSQL
                              │
                              ▼
                    ┌───────────────────┐
                    │   RAG Pipeline     │
                    │ (LangChain/LlamaIndex)
                    └─────────┬─────────┘
                              │
              ┌───────────────┼────────────────┐
              │                                │
              ▼                                ▼
      Embedding Model                  Prompt Builder
      (BGE-M3)                         (Context + Question)
              │                                ▲
              ▼                                │
      ┌───────────────────┐                    │
      │  Vector Database  │────────────────────┘
      │     Qdrant        │
      └─────────┬─────────┘
                ▲
                │
                │ Stores vectors
                │
      ┌─────────┴────────────────────────────────────────────┐
      │                Knowledge Base                        │
      │-----------------------------------------------------│
      │ Mortgage Policies                                   │
      │ Interest Rates                                      │
      │ Loan Eligibility                                    │
      │ Property Rules                                      │
      │ Government Schemes                                  │
      │ FAQs                                                │
      │ PDF Documents                                       │
      │ DOCX                                                │
      │ Excel                                               │
      │ Internal Manuals                                    │
      └─────────┬────────────────────────────────────────────┘
                │
                │
                ▼
      Document Loader
      (PyMuPDF / Unstructured)
      
                │
                ▼
      Text Chunking
      (300–500 tokens)
      
                │
                ▼
      Embedding Generation
      (BGE-M3)
      
                │
                ▼
      Store Vectors
      (Qdrant)

```
#Exact scenario

```text
                     

                                          User:
                                          "Can I qualify for a mortgage?"
                                          
                                                    │
                                                    ▼
                                          FastAPI receives question
                                          
                                                    │
                                                    ▼
                                          Embedding Model
                                          (question → vector)
                                          
                                                    │
                                                    ▼
                                          Vector Search
                                          (Qdrant)
                                          
                                                    │
                                                    ▼
                                          Top 5 Relevant Chunks
                                          
                                                    │
                                                    ▼
                                          Prompt Builder
                                          
                                          System Prompt
                                          
                                          +
                                          Retrieved Chunks
                                          
                                          +
                                          User Question
                                          
                                                    │
                                                    ▼
                                          Llama 3.1
                                          
                                                    │
                                                    ▼
                                          Generates Answer
                                          
                                                    │
                                                    ▼
                                          FastAPI
                                          
                                                    │
                                                    ▼
                                          Frontend
                                          
                                                    │
                                                    ▼
                                          Customer sees answer
```

#Use case flow
```text
                                                 USER
                                                  │
                                                  ▼
                                        Ask Mortgage Question
                                                  │
                                                  ▼
                                    Speech-to-Text (Optional)
                                                  │
                                                  ▼
                                          User Query (Text)
                                                  │
                                                  ▼
                                      Convert Query to Embedding
                                                  │
                                                  ▼
                                   Search Vector Database (ChromaDB)
                                                  │
                                                  ▼
                                   Retrieve Relevant Document Chunks
                                                  │
                                                  ▼
                                  Send Context + Query to LLM
                                                  │
                                                  ▼
                                    Generate Accurate Response
                                                  │
                                      ┌───────────┴────────────┐
                                      │                        │
                                      ▼                        ▼
                               Display Text Answer      Text-to-Speech
                                      │                        │
                                      └───────────┬────────────┘
                                                  ▼
                                    Voice Response/In chat response
```
#Knowledge Base Creation Workflow

```text
                                             Mortgage PDFs
                                        (RBI, Major banking firms, FAQs,
                                            Home Loan Guides)
                                                  │
                                                  ▼
                                              PDF Extraction
                                         (PyMuPDF / pdfplumber)
                                                  │
                                                  ▼
                                              Text Cleaning
                                                  │
                                                  ▼
                                             Chunk the Text
                                         (500-1000 characters)
                                                  │
                                                  ▼
                                            Generate Embeddings
                                           (Sentence Transformers)
                                                  │
                                                  ▼
                                           Store in ChromaDB
                                            (Vector Database)
                                                  │
                                                  ▼
                                             Ready for RAG
```
