import os
import asyncio
from dotenv import load_dotenv
from rodiumai import RodiumAI

# Chargement des variables d'environnement
load_dotenv()
api_key = os.getenv("RODIUMAI_API_KEY")

# Initialisation du client SDK
client = RodiumAI(api_key=api_key)

async def main():
    print("=== Exercice 3 : SDK Python ===")

    response = await client.chat.completions.create(
        model="openai/gpt-4o-mini",
        messages=[
            {"role": "user", "content": "Explique la différence entre une API REST et un SDK en deux phrases."}
        ]
    )

    print("\n[Réponse SDK Python] :")
    print(response.choices[0].message.content)

if __name__ == "__main__":
    asyncio.run(main())
