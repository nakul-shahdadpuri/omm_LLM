# test.py

import os
from openai import OpenAI
from dotenv import load_dotenv

# Load your .env file
load_dotenv()

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def test_openai():
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",  # Or "gpt-4" if you have access
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "Tell me a short joke about computers."}
        ],
        temperature=0.7
    )

    print("✅ OpenAI API is working!\n")
    print("Response:\n", response.choices[0].message.content)

if __name__ == "__main__":
    test_openai()
