#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();
const issues = [];

function logIssue(issue) {
  issues.push(issue);
}

function readFileIfExists(filePath) {
  try {
    return fs.readFileSync(path.join(projectRoot, filePath), 'utf8');
  } catch (error) {
    logIssue(`File not found: ${filePath}`);
    return null;
  }
}

function extractVersion(versionString) {
  const match = versionString?.match(/[0-9]+\.[0-9]+\.[0-9]+/);
  return match ? match[0] : null;
}

function countDirectories(dirPath) {
  try {
    const entries = fs.readdirSync(path.join(projectRoot, dirPath), { withFileTypes: true });
    return entries.filter(entry => entry.isDirectory() && entry.name !== 'src').length;
  } catch (error) {
    logIssue(`Cannot count directories in ${dirPath}: ${error.message}`);
    return 0;
  }
}

console.log('======================================');
console.log('Documentation Sync Validation');
console.log('======================================\n');

const packageJson = readFileIfExists('package.json');
const claudeMd = readFileIfExists('CLAUDE.md');
const projectMd = readFileIfExists('openspec/project.md');
const agentsMd = readFileIfExists('AGENTS.md');
const readmeMd = readFileIfExists('README.md');

if (!packageJson || !claudeMd || !projectMd || !agentsMd) {
  console.error('❌ Critical files missing. Cannot proceed with validation.\n');
  issues.forEach(issue => console.error(`  - ${issue}`));
  process.exit(1);
}

console.log('[1/5] Tech Stack Versions');

try {
  const pkg = JSON.parse(packageJson);

  const bunVersion = pkg.packageManager?.split('@')[1];
  if (bunVersion) {
    if (!claudeMd.includes(bunVersion)) {
      logIssue(`CLAUDE.md: Bun version mismatch (expected ${bunVersion})`);
    }
    if (!projectMd.includes(bunVersion)) {
      logIssue(`openspec/project.md: Bun version mismatch (expected ${bunVersion})`);
    }
  }

  const turboVersion = extractVersion(pkg.devDependencies?.turbo);
  if (turboVersion) {
    if (!claudeMd.includes(turboVersion)) {
      logIssue(`CLAUDE.md: Turborepo version mismatch (expected ${turboVersion})`);
    }
    if (!projectMd.includes(turboVersion)) {
      logIssue(`openspec/project.md: Turborepo version mismatch (expected ${turboVersion})`);
    }
  }

  const typescriptVersion = extractVersion(pkg.devDependencies?.typescript);
  if (typescriptVersion) {
    if (!claudeMd.includes(typescriptVersion)) {
      logIssue(`CLAUDE.md: TypeScript version mismatch (expected ${typescriptVersion})`);
    }
    if (!projectMd.includes(typescriptVersion)) {
      logIssue(`openspec/project.md: TypeScript version mismatch (expected ${typescriptVersion})`);
    }
  }

  if (issues.filter(i => i.includes('version mismatch')).length === 0) {
    console.log('✅ All tech stack versions are consistent\n');
  } else {
    console.log('❌ Tech stack version inconsistencies detected\n');
  }
} catch (error) {
  logIssue(`Failed to parse package.json: ${error.message}`);
  console.log('❌ Failed to validate tech stack versions\n');
}

console.log('[2/5] Component Count');

const actualComponentCount = countDirectories('packages/react-native/src');
const componentCountRegex = /(\d+)\s+(?:fully-implemented\s+)?(?:Production-Ready\s+)?[Cc]omponents/g;

const claudeMatches = Array.from(claudeMd.matchAll(componentCountRegex));
const projectMatches = Array.from(projectMd.matchAll(componentCountRegex));

let componentCountConsistent = true;

if (claudeMatches.length > 0) {
  const claudeCount = parseInt(claudeMatches[0][1], 10);
  if (claudeCount !== actualComponentCount) {
    logIssue(`CLAUDE.md: Component count mismatch (found ${actualComponentCount} directories, docs say ${claudeCount})`);
    componentCountConsistent = false;
  }
} else {
  logIssue('CLAUDE.md: Component count not found');
  componentCountConsistent = false;
}

if (projectMatches.length > 0) {
  const projectCount = parseInt(projectMatches[0][1], 10);
  if (projectCount !== actualComponentCount) {
    logIssue(`openspec/project.md: Component count mismatch (found ${actualComponentCount} directories, docs say ${projectCount})`);
    componentCountConsistent = false;
  }
} else {
  logIssue('openspec/project.md: Component count not found');
  componentCountConsistent = false;
}

if (componentCountConsistent) {
  console.log(`✅ Component count is consistent (${actualComponentCount} components)\n`);
} else {
  console.log('❌ Component count inconsistencies detected\n');
}

console.log('[3/5] README.md Staleness');

if (readmeMd) {
  let readmeIsStale = false;

  if (readmeMd.includes('official starter Turborepo') || readmeMd.includes('Turborepo template')) {
    logIssue('README.md: Contains generic Turborepo template phrases');
    readmeIsStale = true;
  }

  if (!readmeMd.includes('morph-ui') && !readmeMd.includes('MorphUI')) {
    logIssue('README.md: Project name (morph-ui/MorphUI) not found');
    readmeIsStale = true;
  }

  if (!readmeMd.includes('component library')) {
    logIssue('README.md: "component library" not mentioned');
    readmeIsStale = true;
  }

  if (readmeIsStale) {
    console.log('❌ README.md appears to be outdated\n');
  } else {
    console.log('✅ README.md appears to be up to date\n');
  }
} else {
  logIssue('README.md: File not found');
  console.log('❌ README.md missing\n');
}

console.log('[4/5] Cross-References');

let crossReferencesValid = true;

const filesToCheck = [
  'CLAUDE.md',
  'openspec/project.md',
  'openspec/AGENTS.md'
];

filesToCheck.forEach(file => {
  const filePath = path.join(projectRoot, file);
  if (!fs.existsSync(filePath)) {
    logIssue(`Cross-reference broken: ${file} does not exist`);
    crossReferencesValid = false;
  }
});

if (agentsMd.includes('@CLAUDE.md') && !fs.existsSync(path.join(projectRoot, 'CLAUDE.md'))) {
  logIssue('AGENTS.md: @CLAUDE.md reference is broken');
  crossReferencesValid = false;
}

if (agentsMd.includes('@openspec/project.md') && !fs.existsSync(path.join(projectRoot, 'openspec/project.md'))) {
  logIssue('AGENTS.md: @openspec/project.md reference is broken');
  crossReferencesValid = false;
}

if (agentsMd.includes('@openspec/AGENTS.md') && !fs.existsSync(path.join(projectRoot, 'openspec/AGENTS.md'))) {
  logIssue('AGENTS.md: @openspec/AGENTS.md reference is broken');
  crossReferencesValid = false;
}

if (crossReferencesValid) {
  console.log('✅ All cross-references are valid\n');
} else {
  console.log('❌ Cross-reference issues detected\n');
}

console.log('[5/5] Development Rules');

const qualityGates = [
  'bun run lint',
  'bun run check-types',
  'bun run format',
  'bun run test'
];

let rulesConsistent = true;

qualityGates.forEach(gate => {
  if (!claudeMd.includes(gate)) {
    logIssue(`CLAUDE.md: Quality gate "${gate}" not mentioned`);
    rulesConsistent = false;
  }
  if (!agentsMd.includes(gate)) {
    logIssue(`AGENTS.md: Quality gate "${gate}" not mentioned`);
    rulesConsistent = false;
  }
});

const zeroToleranceRules = [
  { rule: 'zero tolerance', files: ['CLAUDE.md', 'AGENTS.md', 'openspec/project.md'] },
  { rule: 'Conventional Commits', files: ['CLAUDE.md', 'openspec/project.md'] }
];

zeroToleranceRules.forEach(({ rule, files }) => {
  files.forEach(file => {
    const content = file === 'CLAUDE.md' ? claudeMd :
                    file === 'AGENTS.md' ? agentsMd :
                    projectMd;

    if (!content.toLowerCase().includes(rule.toLowerCase())) {
      logIssue(`${file}: "${rule}" not mentioned`);
      rulesConsistent = false;
    }
  });
});

if (rulesConsistent) {
  console.log('✅ Development rules are consistent\n');
} else {
  console.log('❌ Development rule inconsistencies detected\n');
}

console.log('======================================');

if (issues.length === 0) {
  console.log('✅ All documentation files are in sync');
  console.log('======================================\n');
  process.exit(0);
} else {
  console.log(`❌ Found ${issues.length} inconsistency/inconsistencies:`);
  console.log('======================================\n');
  issues.forEach((issue, index) => {
    console.error(`  ${index + 1}. ${issue}`);
  });
  console.log('');
  process.exit(1);
}
