EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFmMDMzODljLWMzODItNDg0NC05NmVkLTMyODQ0NGQ5NWQ3ZSIsImV4cCI6MTc2MzM4OTA2OX0.EIP5UhhbdQ5VvEKubLipF_6qPOzWDl0GUXnDbZjplKw

curl -X POST https://ai.imwithstupid.fun/ollama/api/generate \
  -H "Authorization: Bearer sk-8b9ad3c39b884099a809c413d708b8a0
" \
  -d '{
    "model": "gemma3:4b",
    "prompt": "Why is the sky blue?"
  }'

curl -X POST https://ai.imwithstupid.fun/api/chat/completions \
  -H "Authorization: Bearer sk-8b9ad3c39b884099a809c413d708b8a0" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gemma3:4b",
    "messages": [
      {
        "role": "user",
        "content": "Why is the sky blue?"
      }
    ]
  }'
