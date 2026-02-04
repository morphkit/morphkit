import { config } from "dotenv";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { OpenAIEmbeddings } from "@langchain/openai";
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();
config({ path: join(projectDir, ".env"), quiet: true });

interface HookInput {
  session_id: string;
  transcript_path: string;
  cwd: string;
  permission_mode: string;
  prompt: string;
}

interface SkillMetadata {
  skillPath: string;
  skillName: string;
  references: string[];
  assets: string[];
  scripts: string[];
}

interface RelevantSkill {
  name: string;
  similarity: string;
  references: string[];
}

async function querySkillIndex(prompt: string): Promise<RelevantSkill[]> {
  const indexPath = join(projectDir, ".claude/hooks/skills.faiss");

  if (!existsSync(indexPath)) {
    return [];
  }

  const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-large",
    dimensions: 1536,
  });

  const vectorStore = await FaissStore.load(indexPath, embeddings);

  const MAX_SKILLS = 5;
  const results = await vectorStore.similaritySearchWithScore(
    prompt,
    MAX_SKILLS,
  );

  const DEBUG = process.env.DEBUG_SKILLS === "true";
  if (DEBUG) {
    console.error("DEBUG: Raw scores (L2 distance, lower is better):");
    for (const [doc, score] of results) {
      const metadata = doc.metadata as SkillMetadata;
      console.error(`  ${metadata.skillName}: ${score.toFixed(4)}`);
    }
  }

  const SIMILARITY_THRESHOLD = 1.3;
  const SECONDARY_GAP = 0.2;

  if (results.length === 0) {
    return [];
  }

  const topScore = results[0][1];

  if (topScore >= SIMILARITY_THRESHOLD) {
    return [];
  }

  const relevantSkills = results
    .filter(([, score], index) => {
      if (index === 0) return true;
      return score < SIMILARITY_THRESHOLD && score - topScore < SECONDARY_GAP;
    })
    .slice(0, MAX_SKILLS)
    .map(([doc, score]) => {
      const metadata = doc.metadata as SkillMetadata;
      const normalizedSimilarity = Math.max(0, 1 - score / 2);
      return {
        name: metadata.skillName || doc.pageContent.split("\n")[0],
        similarity: normalizedSimilarity.toFixed(2),
        references: metadata.references || [],
      };
    });

  return relevantSkills;
}

function formatOutput(skills: RelevantSkill[]): string {
  let output = "\n";
  output += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
  output += "SKILL ACTIVATION (Semantic Match)\n";
  output += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

  output += "RECOMMENDED SKILLS:\n";
  for (const skill of skills) {
    output += `  -> ${skill.name} (similarity: ${skill.similarity})\n`;
    if (skill.references.length > 0) {
      output += `     references: ${skill.references.join(", ")}\n`;
    }
  }

  output += "\nACTION: Use Skill tool BEFORE responding\n";
  output += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";

  return output;
}

async function main(): Promise<void> {
  const input = readFileSync(0, "utf-8");
  let data: HookInput;

  try {
    data = JSON.parse(input);
  } catch {
    process.exit(0);
  }

  if (!data.prompt || data.prompt.trim().length === 0) {
    process.exit(0);
  }

  const relevantSkills = await querySkillIndex(data.prompt);

  if (relevantSkills.length > 0) {
    console.log(formatOutput(relevantSkills));
  }

  process.exit(0);
}

main().catch(() => {
  process.exit(0);
});
