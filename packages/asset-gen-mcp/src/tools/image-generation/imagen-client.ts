import { GoogleGenAI } from "@google/genai";
import type { ImagenModel } from "../../types.js";

export interface ReferenceImage {
  imageBytes: string;
  referenceType?: "REFERENCE_TYPE_STYLE" | "REFERENCE_TYPE_SUBJECT";
}

interface ImagenGenerationOptions {
  prompt: string;
  model?: ImagenModel;
  referenceImages?: ReferenceImage[];
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

  const baseParams = {
    model,
    prompt: options.prompt,
    config: {
      numberOfImages: 1,
    },
  };

  let response;
  if (options.referenceImages && options.referenceImages.length > 0) {
    const referenceImagesPayload = options.referenceImages.map(
      (ref, index) => ({
        referenceType: ref.referenceType || "REFERENCE_TYPE_STYLE",
        referenceId: index + 1,
        referenceImage: {
          bytesBase64Encoded: ref.imageBytes,
        },
      }),
    );
    response = await ai.models.generateImages({
      ...baseParams,
      referenceImages: referenceImagesPayload,
    } as Parameters<typeof ai.models.generateImages>[0]);
  } else {
    response = await ai.models.generateImages(baseParams);
  }

  const generatedImages = response.generatedImages;
  if (!generatedImages || generatedImages.length === 0) {
    throw new Error("No images returned from Imagen API");
  }

  const firstImage = generatedImages[0];
  if (!firstImage?.image?.imageBytes) {
    throw new Error("No image data found in Imagen API response");
  }

  return {
    imageData: Buffer.from(firstImage.image.imageBytes, "base64"),
    mimeType: "image/png",
  };
}

export function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}
