# MortgageMate-AI-RAG-based-Mortgage-Assistant-
Ask anything about a home loans and mortgaging to Indian banks and even talk to it live.

'''text
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
        Voice Response/Genrated response in chat
'''
