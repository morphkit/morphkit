import { config } from "dotenv";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Document } from "@langchain/core/documents";
import { readdirSync, readFileSync, statSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();
config({ path: join(projectDir, ".env"), quiet: true });

interface SkillMetadata {
  skillPath: string;
  skillName: string;
  references: string[];
  assets: string[];
  scripts: string[];
}

function parseYamlFrontmatter(content: string): {
  name: string;
  description: string;
} | null {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    return null;
  }

  const frontmatter = frontmatterMatch[1];
  const nameMatch = frontmatter.match(/^name:\s*(.+)$/m);
  const descriptionMatch = frontmatter.match(/^description:\s*(.+)$/m);

  if (!nameMatch || !descriptionMatch) {
    return null;
  }

  return {
    name: nameMatch[1].trim(),
    description: descriptionMatch[1].trim(),
  };
}

function listDirectoryFiles(dirPath: string): string[] {
  if (!existsSync(dirPath) || !statSync(dirPath).isDirectory()) {
    return [];
  }

  return readdirSync(dirPath).filter((file) => {
    const filePath = join(dirPath, file);
    return statSync(filePath).isFile();
  });
}

function scanSkillsDirectory(skillsDir: string): Document<SkillMetadata>[] {
  const documents: Document<SkillMetadata>[] = [];

  if (!existsSync(skillsDir)) {
    console.log(`Skills directory not found: ${skillsDir}`);
    return documents;
  }

  const skillFolders = readdirSync(skillsDir).filter((name) => {
    const folderPath = join(skillsDir, name);
    return (
      statSync(folderPath).isDirectory() &&
      existsSync(join(folderPath, "SKILL.md"))
    );
  });

  for (const skillFolder of skillFolders) {
    const skillPath = join(skillsDir, skillFolder);
    const skillMdPath = join(skillPath, "SKILL.md");

    const content = readFileSync(skillMdPath, "utf-8");
    const frontmatter = parseYamlFrontmatter(content);

    if (!frontmatter) {
      console.log(`Skipping ${skillFolder}: invalid or missing frontmatter`);
      continue;
    }

    const references = listDirectoryFiles(join(skillPath, "references"));
    const assets = listDirectoryFiles(join(skillPath, "assets"));
    const scripts = listDirectoryFiles(join(skillPath, "scripts"));

    const document = new Document<SkillMetadata>({
      pageContent: `${frontmatter.name}\n\n${frontmatter.description}`,
      metadata: {
        skillPath: skillPath,
        skillName: frontmatter.name,
        references,
        assets,
        scripts,
      },
    });

    documents.push(document);
    console.log(`Indexed: ${frontmatter.name}`);
    if (references.length > 0)
      console.log(`  references: ${references.join(", ")}`);
    if (assets.length > 0) console.log(`  assets: ${assets.join(", ")}`);
    if (scripts.length > 0) console.log(`  scripts: ${scripts.join(", ")}`);
  }

  return documents;
}

async function buildFaissIndex(): Promise<void> {
  if (!process.env.OPENAI_API_KEY) {
    console.error("Error: OPENAI_API_KEY is not set.");
    console.error("Please set it in .env file or as an environment variable.");
    process.exit(1);
  }

  const skillsDir = join(projectDir, ".claude/skills");
  const outputDir = join(projectDir, ".claude/hooks/skills.faiss");

  console.log("Scanning skills directory:", skillsDir);
  console.log("");

  const documents = scanSkillsDirectory(skillsDir);

  if (documents.length === 0) {
    console.error("No valid skills found to index");
    process.exit(1);
  }

  console.log("");
  console.log(`Found ${documents.length} skills to embed`);
  console.log("Creating embeddings with text-embedding-3-large...");

  const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-large",
    dimensions: 1536,
  });

  const vectorStore = await FaissStore.fromDocuments(documents, embeddings);

  await vectorStore.save(outputDir);

  console.log("");
  console.log(`FAISS index saved to: ${outputDir}`);
  console.log("Done!");
}

buildFaissIndex().catch((error) => {
  console.error("Error building FAISS index:", error);
  process.exit(1);
});
