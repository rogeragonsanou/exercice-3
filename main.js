import { RodiumAI } from 'rodiumai';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const client = new RodiumAI({
  apiKey: process.env.RODIUMAI_API_KEY,
});

async function main() {
  console.log("=== Exercice 3 : Test SDK JS v0.3.1 ===");

  try {
    // 1. Test Chat Completion
    console.log("\n1. Envoi de la requête Chat...");
    const chatResponse = await client.chat.completions.create({
      model: 'openai/gpt-4o-mini',
      messages: [
        { role: 'user', content: 'Donne deux avantages du langage JavaScript.' }
      ],
    });
    console.log("[Réponse Chat] :");
    console.log(chatResponse.choices[0].message.content);

    // 2. Test Génération Vidéo
    console.log("\n2. Génération de la vidéo en cours...");
    const videoResponse = await client.video.generations.create({
      model: 'openai/sora-2',
      prompt: "A beautiful sunset over the ocean, cinematic lighting",
    });

    const b64Data = videoResponse.data[0].b64_json;

    if (b64Data) {
      // Sauvegarde du fichier MP4
      const buffer = Buffer.from(b64Data, 'base64');
      fs.writeFileSync('video_output.mp4', buffer);
      console.log("\n[Résultat Vidéo] : Succès ! Vidéo sauvegardée sous 'video_output.mp4'");
    } else if (videoResponse.data[0].url) {
      console.log("\n[Résultat Vidéo] : Lien URL ->", videoResponse.data[0].url);
    }

  } catch (error) {
    console.error("Erreur lors de l'exécution :", error);
  }
}

main();
