@echo off
echo Setting up Firebase configuration...

echo FIREBASE_PROJECT_ID=vyapar-ai-6042e > backend\.env
echo FIREBASE_PRIVATE_KEY_ID=1ecd7350959a144ef02378f21167cfde89c62ea5 >> backend\.env
echo FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCGSbH3do7y9Fa6\nLJTfBEKHM3uVvVn2XhGzXi3toxeqVFvCkmoISUczmIAc2EWsOAeTx0ScZBdT+mCt\nYY+Ap9DvYxxJ0QBEeFS6Z2awVwG1R312QnUTZyVT6NuuMuCV2FLzIfKVpwDz5czU\nfNZYSfd6lFp1yu+k450fFLop5289dSoSj2g4RRRr7iGj2YUfwd0v7Y5W6M0wuUTl\nKShfp2FaYuJXMmWZGPNWGvWYpC4tgPv2KKezVa8UFNh4qghEtcmWRcmigE753TP3\nQU3PM3Z3JACiaydtDet6kFAI6IHFwiQTFpBPWNe8N1f8zbcIcRUynMKeTONFW6mH\nj7SzePJHAgMBAAECggEADB2ZsGV3x+S9RGZ291i3izeHtr6oNLRPrYVZkx9L/c1G\n9XA8n8sYtkd+hjEJttwxQXx7gg6nv3xkp4/t9gzDVYMgJMAgtuISZuT4XKrk7Q7q\nULaglc5luEMskB69U4JPwumKV5qDLqjKM6ugXRkt+lcTLZ3QbunYSFsYNrqk4dWk\nWZhNKLMHO57dDuhReEYx/rVFiNF108ZVOmr8BPrqBLRucRO3MaWem2YLUg1GfQwu\nPhE5F6jVV6cREfGx8DULzWx2tb55XOUKqbZ8p7MHKCt9bL3cAz4n8eGx5536CXSQ\npWEdjE3xsUZ9Q9tZrlRi/MRBDQizf+jPj7G6Ryn9WQKBgQC8YGBD4skBiudEITwH\n37ymsSfy7wY1zRIpKvoSvGbKkt8asUtwIhr+vSk8IDdQLaXMgY9S3eLUKBwl07Nv\ngQbW6EfSAbDjlLYubL1th6a1aDlzWBGMGSJZsCu9KJNlxJnjmxCTEihdAzro352n\nWiNuTY6ZGfRYtlELz5VEZBrgmQKBgQC2fqB8dlLSuQvbscqJVwoOu3mteHtlp26x\npjclvsbbKOG0FdQ+TvknMAhFpKXKwUWv9e6Jm+tNuIaW9qwebfVrH0y5ORDdDUm8\nLDt7+EZXCHdNT6JcfoIzjlQaDbCWIUzCltEitSl3Mu15QHnV3bzuAFBcpq7ObzD4\nV+3EyrDV3wKBgAandN8RBL6sNG0gq2kvyw8sVNfs/5Ao9UpE/V5qD0t6kqzztFF6\nsu9qqSk5jhqj8iZeMTzhH6EU5aGkb8MxkJdIzzio3KG9YA4Vwz86OnZP/y+G3d/Q\nB3mZkoH1C/fdUP5MPPKlAo3+jjcppv0BXx0HWlEoLIxxrD05kPFAg/6JAoGAdEhF\nPGkspwav7qHf2xkx2GdOxeDyR7ijCOFPXGauUPFAt739CmLJ0VWCv9WEqqfyHofH\nIbnO+ivs3n5497661TIRcihRfXi9FgDdOkXdlBFZ61Ils2gM0IsNPbihX1gCkC8H\nPWVP8ZrqxAr4VvS+MKzUh+TRl8oz2to0L+OzP+MCgYAQN3SCzBmPb2XWOfxeNqaS\n7M/QXUky9YkmjnTZ6PIA4PMFIllRzWKJHSg+/LrWy04sfScuJCCofHyqNsAbxeHA\noDTRy7rCZk8aL/kaNPOwlaA9mxa6TLM1I4p2kaK9Tk/RiWtg8pwgIUFLzNLnQRAn\nr2ZfncwlrsOOzm2o0nQmmw==\n-----END PRIVATE KEY-----\n" >> backend\.env
echo FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@vyapar-ai-6042e.iam.gserviceaccount.com >> backend\.env
echo FIREBASE_CLIENT_ID=103821165342060048275 >> backend\.env
echo FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth >> backend\.env
echo FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token >> backend\.env
echo FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs >> backend\.env
echo FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%%40vyapar-ai-6042e.iam.gserviceaccount.com >> backend\.env
echo. >> backend\.env
echo # OpenAI Configuration >> backend\.env
echo OPENAI_API_KEY=your-openai-api-key-here >> backend\.env
echo. >> backend\.env
echo # JWT Secret >> backend\.env
echo JWT_SECRET=vyapaar-ai-super-secret-jwt-key-2024-secure >> backend\.env

echo ✅ Firebase configuration created in backend\.env
echo.
echo 🔧 Next steps:
echo 1. Add your OpenAI API key to backend\.env
echo 2. Run: npm install
echo 3. Run: start-complete-project.bat

