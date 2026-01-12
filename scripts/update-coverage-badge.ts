interface CoverageSummary {
  total: {
    lines: { pct: number };
    statements: { pct: number };
    functions: { pct: number };
    branches: { pct: number };
  };
}

interface BadgeData {
  schemaVersion: 1;
  label: string;
  message: string;
  color: string;
}

function getCoverageColor(percentage: number): string {
  if (percentage >= 80) return "brightgreen";
  if (percentage >= 60) return "green";
  if (percentage >= 40) return "yellow";
  if (percentage >= 20) return "orange";
  return "red";
}

async function updateCoverageBadge() {
  const coveragePath = "./packages/react-native/coverage/coverage-summary.json";
  const coverage: CoverageSummary = await Bun.file(coveragePath).json();

  const percentage = coverage.total.lines.pct;
  const color = getCoverageColor(percentage);

  const badgeData: BadgeData = {
    schemaVersion: 1,
    label: "coverage",
    message: `${percentage.toFixed(1)}%`,
    color: color,
  };

  const gistId = process.env.GIST_ID;
  const gistToken = process.env.GIST_TOKEN;

  if (!gistId || !gistToken) {
    console.error("Missing GIST_ID or GIST_TOKEN environment variables");
    process.exit(1);
  }

  const response = await fetch(`https://api.github.com/gists/${gistId}`, {
    method: "PATCH",
    headers: {
      Authorization: `token ${gistToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      files: {
        "morph-ui-coverage.json": {
          content: JSON.stringify(badgeData, null, 2),
        },
      },
    }),
  });

  if (!response.ok) {
    console.error(`Failed to update gist: ${response.statusText}`);
    process.exit(1);
  }

  console.log(`✓ Coverage badge updated: ${percentage.toFixed(1)}% (${color})`);
}

updateCoverageBadge();
