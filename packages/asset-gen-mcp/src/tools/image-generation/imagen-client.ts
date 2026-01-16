import { GoogleGenAI, type Modality } from "@google/genai";
import type { ImagenModel } from "../../types.js";

interface ImagenGenerationOptions {
  prompt: string;
  model?: ImagenModel;
  referenceImages?: Buffer[];
}

interface ImagenGenerationResult {
  imageData: Buffer;
  mimeType: string;
}

function getApiKey(): string {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GOOGLE_API_KEY environment variable is not set. Get your key at: https://aistudio.google.com/apikey",
    );
  }
  return apiKey;
}

function getDefaultModel(): ImagenModel {
  const envModel = process.env.IMAGEN_DEFAULT_MODEL;
  if (
    envModel &&
    [
      "imagen-4.0-ultra-generate-001",
      "imagen-4.0-generate-001",
      "imagen-4.0-fast-generate-001",
    ].includes(envModel)
  ) {
    return envModel as ImagenModel;
  }
  return "imagen-4.0-generate-001";
}

export async function generateImageWithImagen(
  options: ImagenGenerationOptions,
): Promise<ImagenGenerationResult> {
  const apiKey = getApiKey();
  const ai = new GoogleGenAI({ apiKey });

  const model = options.model || getDefaultModel();

  const contents: Array<
    { text: string } | { inlineData: { mimeType: string; data: string } }
  > = [{ text: options.prompt }];

  if (options.referenceImages && options.referenceImages.length > 0) {
    for (const imageBuffer of options.referenceImages) {
      contents.push({
        inlineData: {
          mimeType: "image/png",
          data: imageBuffer.toString("base64"),
        },
      });
    }
  }

  const response = await ai.models.generateContent({
    model,
    contents,
    config: {
      responseModalities: ["image" as Modality, "text" as Modality],
    },
  });

  const candidates = response.candidates;
  if (!candidates || candidates.length === 0) {
    throw new Error("No candidates returned from Imagen API");
  }

  const firstCandidate = candidates[0];
  if (!firstCandidate) {
    throw new Error("No candidate found in Imagen API response");
  }

  const parts = firstCandidate.content?.parts;
  if (!parts || parts.length === 0) {
    throw new Error("No parts returned from Imagen API");
  }

  for (const part of parts) {
    if (part.inlineData) {
      const { data, mimeType } = part.inlineData;
      if (!data || !mimeType) {
        continue;
      }
      return {
        imageData: Buffer.from(data, "base64"),
        mimeType,
      };
    }
  }

  throw new Error("No image data found in Imagen API response");
}

export function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}
