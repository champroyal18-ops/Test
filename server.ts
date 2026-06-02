import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = 3000;

// Lazy initialization of Gemini client
let aiInstance: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY is not defined in the environment secrets. AI mock tests and tutoring will use local generation fallbacks.");
    }
    aiInstance = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// 1. API: AI Test Generator
app.post("/api/generate-test", async (req, res) => {
  const { subject, topic, qCount = 5 } = req.body;

  if (!subject) {
    res.status(400).json({ error: "Subject parameter is required" });
    return;
  }

  // Fallback check if API key is not set
  if (!process.env.GEMINI_API_KEY) {
    res.status(503).json({
      error: "AI Integration needs configuration. Please add GEMINI_API_KEY in Settings > Secrets.",
      isDemoMode: true
    });
    return;
  }

  try {
    const ai = getGemini();
    
    const prompt = `You are a professional medical entrance exam coach creating high-fidelity NEET-UG (National Eligibility cum Entrance Test) exam questions.
Generate ${qCount} highly accurate, NCERT-syllabus aligned Multiple Choice Questions for the Subject: "${subject}" and Topic/Chapter: "${topic || 'General Syllabus'}".
Requirements:
1. Standard NEET format with exactly 4 options: A, B, C, D.
2. Only one correct option (must be A, B, C, or D).
3. The content must be extremely realistic, reflecting the style, terminology, and difficulty of recent NEET exam papers.
4. Categorize difficulty into "Easy", "Medium", and "Hard".
5. Provide a rigorous, step-by-step explanatory solution citing the exact NCERT concept textbook context (such as Class 11 Biology, Genotypical ratios, organic reaction mechanism, dimension physics equations, etc.).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          description: "List of generated NEET UG questions",
          items: {
            type: Type.OBJECT,
            properties: {
              questionText: { type: Type.STRING, description: "The MCQ question text" },
              options: {
                type: Type.OBJECT,
                description: "Four options available to choose from",
                properties: {
                  A: { type: Type.STRING },
                  B: { type: Type.STRING },
                  C: { type: Type.STRING },
                  D: { type: Type.STRING }
                },
                required: ["A", "B", "C", "D"]
              },
              correctAnswer: { type: Type.STRING, description: "Must equal A, B, C, or D" },
              explanation: { type: Type.STRING, description: "NCERT-aligned step-by-step breakdown" },
              difficulty: { type: Type.STRING, description: "Must be Easy, Medium, or Hard" },
              chapter: { type: Type.STRING, description: "NCERT Chapter or subtopic name" }
            },
            required: ["questionText", "options", "correctAnswer", "explanation", "difficulty", "chapter"]
          }
        }
      }
    });

    const dataText = response.text || "[]";
    const parsedQuestions = JSON.parse(dataText.trim());
    
    // Add custom front-end IDs
    const finalizedQuestions = parsedQuestions.map((q: any, idx: number) => ({
      id: `ai-q-${Date.now()}-${idx}`,
      subject,
      section: 'A',
      ...q
    }));

    res.json({ questions: finalizedQuestions });
  } catch (err: any) {
    console.error("Gemini failed, serving fallbacks", err);
    res.status(500).json({ error: err.message || "Failed to generate AI questions" });
  }
});

// 2. API: AI Detailed Tutor Lesson / Question Explainer
app.post("/api/explain-question", async (req, res) => {
  const { questionText, options, correctAnswer, userResponse, subject, chapter } = req.body;

  if (!questionText || !options) {
    res.status(400).json({ error: "Question text and options are required" });
    return;
  }

  if (!process.env.GEMINI_API_KEY) {
    res.status(503).json({
      error: "AI Study Coach requires an active API key. Please insert GEMINI_API_KEY in the Secrets layout.",
      isDemoMode: true
    });
    return;
  }

  try {
    const ai = getGemini();

    const promptContext = `You are a friendly, direct, and elite medical coaching professor specializing in crack NEET-UG exams.
Analyze the following MCQ question and give an outstanding explanation:

Subject: ${subject || 'NEET General'}
Chapter/Topic: ${chapter || 'NCERT Core Syllabus'}
Question: "${questionText}"
Options:
A: ${options.A}
B: ${options.B}
C: ${options.C}
D: ${options.D}

Correct Answer Key: "${correctAnswer}"
Student Answered: "${userResponse || 'unattempted'}"

Please design a comprehensive explanation structured as:
1. **CRITICAL CONCLUSION AND KEYWORD**: State the correct option directly and provide a key NCERT line confirming it.
2. **STEP-BY-STEP PROBLEM DECONSTRUCTION**:
   - For Biology: Explain the physiological, biochemical, or morphological mechanism simply.
   - For Chemistry: Describe reaction reagents, hybridization, stoichiometry calculations, or rules (e.g. anti-Markovnikov).
   - For Physics: State standard formulas, input given parameters, write equations clearly, and perform the derivation step-by-step.
3. **OPTION ELIMINATION ANALYSIS**: Briefly state why the other options (and distractors) are scientifically incorrect.
4. **HIGH-YIELD NEET TIPS**: Tips on how to avoid silly mistakes, mnemonics to trigger active recall, and expected patterns from this topic.
Keep the style supportive, objective, clear, and compact. Ready? Go!`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptContext
    });

    res.json({ explanation: response.text || "Could not generate explanation." });
  } catch (err: any) {
    console.error("Explaining failed", err);
    res.status(500).json({ error: err.message || "Could not generate AI explanation." });
  }
});

// Serve Frontend Vite / Static Assets
async function setupViteAndListen() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

setupViteAndListen();
export default app;
