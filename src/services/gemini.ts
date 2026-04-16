import { GoogleGenAI, Type } from "@google/genai";

// Initialize Gemini Client
// Note: In a real production app, you might want to proxy these requests through a backend
// to keep the API key secure, but for this preview environment, client-side is acceptable
// as per the "API Key Security" guidelines for demos.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const geminiService = {
  // 1. Chat with Gemini Pro 3.1 (General Assistant)
  async chat(message: string, history: any[] = []) {
    const model = "gemini-3.1-pro-preview";
    const chat = ai.chats.create({
      model,
      history,
      config: {
        temperature: 0.7,
        systemInstruction: "You are 'Live Car Assistant', an expert automotive AI assistant. You help users with car diagnosis, maintenance tips, and app navigation. Keep responses concise and helpful. You speak Arabic and English.",
      },
    });
    const result = await chat.sendMessage({ message });
    return result.text;
  },

  // 2. Search Grounding (Up-to-date info)
  async search(query: string) {
    const model = "gemini-3-flash-preview";
    const result = await ai.models.generateContent({
      model,
      contents: query,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });
    return {
      text: result.text,
      sources: result.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  },

  // 3. Maps Grounding (Find Workshops)
  async findWorkshops(location: { lat: number; lng: number }, query: string = "car workshops nearby") {
    const model = "gemini-2.5-flash";
    const result = await ai.models.generateContent({
      model,
      contents: query,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: {
              latitude: location.lat,
              longitude: location.lng
            }
          }
        }
      },
    });
    return {
      text: result.text,
      maps: result.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  },

  // 4. Image Analysis (Diagnosis)
  async analyzeImage(base64Image: string, prompt: string = "Analyze this car image for damage or issues.") {
    const model = "gemini-3.1-pro-preview";
    const result = await ai.models.generateContent({
      model,
      contents: {
        parts: [
          { inlineData: { mimeType: "image/jpeg", data: base64Image } },
          { text: prompt }
        ]
      }
    });
    return result.text;
  },

  // 5. Audio Transcription (Engine Sound Notes)
  async transcribeAudio(base64Audio: string) {
    const model = "gemini-3-flash-preview";
    const result = await ai.models.generateContent({
      model,
      contents: {
        parts: [
          { inlineData: { mimeType: "audio/wav", data: base64Audio } },
          { text: "Transcribe this audio." }
        ]
      }
    });
    return result.text;
  },

  // 6. Thinking Mode (Complex Diagnosis)
  async complexDiagnosis(symptoms: string) {
    const model = "gemini-3.1-pro-preview";
    // Note: ThinkingLevel is part of the config in the new SDK, but we'll use standard config for now 
    // as the specific enum might need to be imported. 
    // Using standard generateContent for now with high reasoning prompt.
    const result = await ai.models.generateContent({
      model,
      contents: `Perform a deep technical analysis for these car symptoms: ${symptoms}. Think step-by-step about potential root causes, from most common to rare.`,
      // config: { thinkingConfig: { thinkingLevel: "HIGH" } } // Uncomment if supported by current SDK version types
    });
    return result.text;
  },

  // 7. Text to Speech
  async speak(text: string) {
    const model = "gemini-2.5-flash-preview-tts";
    const result = await ai.models.generateContent({
      model,
      contents: { parts: [{ text }] },
      config: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: "Zephyr" }
          }
        }
      }
    });
    return result.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  },

  // 8. Image Generation (Car Studio)
  async generateCarImage(prompt: string, aspectRatio: string = "16:9") {
    const model = "gemini-3-pro-image-preview";
    // Note: This model requires user-selected API key in some contexts, 
    // but we will try to use the environment key first.
    // If it fails, we might need to prompt the user.
    const result = await ai.models.generateContent({
      model,
      contents: { parts: [{ text: prompt }] },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio as any,
          imageSize: "1K"
        }
      }
    });
    
    // Extract image
    for (const part of result.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  },

  // 9. Video Generation (Veo)
  async generateCarVideo(prompt: string) {
    const model = "veo-3.1-fast-generate-preview";
    // Veo operations are long-running.
    let operation = await ai.models.generateVideos({
      model,
      prompt,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '16:9'
      }
    });

    // Poll for completion
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      operation = await ai.operations.getVideosOperation({ operation });
    }

    return operation.response?.generatedVideos?.[0]?.video?.uri;
  }
};
