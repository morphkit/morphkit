import { intro, outro, text, select, isCancel } from "@clack/prompts";
import { writeFile, mkdir, access } from "fs/promises";
import { join, dirname } from "path";
import pc from "picocolors";
import { readConfig } from "../utils/config.js";
import { ConfigNotFoundError, ValidationError } from "../utils/errors.js";
import { isInteractive } from "../utils/context.js";
import { isJsonMode, outputSuccess } from "../utils/output.js";
import type { GenerateOptions } from "../types/index.js";

type TemplateType = "theme" | "screen" | "layout" | "flow";

const TEMPLATES: Record<
  TemplateType,
  { description: string; generator: GeneratorFn }
> = {
  theme: {
    description: "Create a custom theme configuration",
    generator: generateTheme,
  },
  screen: {
    description: "Create an Expo Router screen component",
    generator: generateScreen,
  },
  layout: {
    description: "Create an Expo Router layout component",
    generator: generateLayout,
  },
  flow: {
    description: "Create a multi-screen user flow",
    generator: generateFlow,
  },
};

type GeneratorFn = (options: GenerateOptions) => Promise<GeneratedFile[]>;

interface GeneratedFile {
  path: string;
  content: string;
}

async function ensureDirectoryExists(filePath: string): Promise<void> {
  const dir = dirname(filePath);
  try {
    await access(dir);
  } catch {
    await mkdir(dir, { recursive: true });
  }
}

async function writeGeneratedFiles(files: GeneratedFile[]): Promise<string[]> {
  const writtenPaths: string[] = [];
  for (const file of files) {
    await ensureDirectoryExists(file.path);
    await writeFile(file.path, file.content, "utf-8");
    writtenPaths.push(file.path);
  }
  return writtenPaths;
}

function toPascalCase(str: string): string {
  return str
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

async function generateTheme(
  options: GenerateOptions,
): Promise<GeneratedFile[]> {
  const name = toPascalCase(options.name);
  const outputPath = join(
    process.cwd(),
    options.output,
    `${toKebabCase(options.name)}.ts`,
  );

  const content = `import { createTheme } from "@morphkit/react-native";

export const ${name}Theme = createTheme({
  primitive: {
    colors: {
      brand: {
        50: "#f0f9ff",
        100: "#e0f2fe",
        200: "#bae6fd",
        300: "#7dd3fc",
        400: "#38bdf8",
        500: "#0ea5e9",
        600: "#0284c7",
        700: "#0369a1",
        800: "#075985",
        900: "#0c4a6e",
      },
    },
  },
  semantic: {
    colors: {
      light: {
        action: {
          primary: "#0ea5e9",
          primaryHover: "#0284c7",
          primaryActive: "#0369a1",
        },
        text: {
          primary: "#0f172a",
          secondary: "#475569",
          tertiary: "#94a3b8",
        },
        surface: {
          primary: "#ffffff",
          secondary: "#f8fafc",
          tertiary: "#f1f5f9",
        },
      },
      dark: {
        action: {
          primary: "#38bdf8",
          primaryHover: "#7dd3fc",
          primaryActive: "#bae6fd",
        },
        text: {
          primary: "#f8fafc",
          secondary: "#cbd5e1",
          tertiary: "#64748b",
        },
        surface: {
          primary: "#0f172a",
          secondary: "#1e293b",
          tertiary: "#334155",
        },
      },
    },
  },
});
`;

  return [{ path: outputPath, content }];
}

async function generateScreen(
  options: GenerateOptions,
): Promise<GeneratedFile[]> {
  const name = toPascalCase(options.name);
  const outputPath = join(process.cwd(), options.output, "index.tsx");

  const content = `import { Box, Container, Typography } from "@morphkit/react-native";

export default function ${name}Screen() {
  return (
    <Container>
      <Box style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Typography variant="title-1">${name}</Typography>
        <Typography variant="body" style={{ marginTop: 8 }}>
          Add your content here
        </Typography>
      </Box>
    </Container>
  );
}
`;

  return [{ path: outputPath, content }];
}

async function generateLayout(
  options: GenerateOptions,
): Promise<GeneratedFile[]> {
  const name = toPascalCase(options.name);
  const layoutType = options.type || "stack";
  const outputPath = join(process.cwd(), options.output, "_layout.tsx");

  let content: string;

  if (layoutType === "tabs") {
    content = `import { Tabs } from "expo-router";
import { Typography } from "@morphkit/react-native";

export default function ${name}Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#0ea5e9",
        headerTitle: (props) => (
          <Typography variant="title-3">{props.children}</Typography>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarLabel: "Settings",
        }}
      />
    </Tabs>
  );
}
`;
  } else if (layoutType === "drawer") {
    content = `import { Drawer } from "expo-router/drawer";
import { Typography } from "@morphkit/react-native";

export default function ${name}Layout() {
  return (
    <Drawer
      screenOptions={{
        headerTitle: (props) => (
          <Typography variant="title-3">{props.children}</Typography>
        ),
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: "Home",
          drawerLabel: "Home",
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          title: "Settings",
          drawerLabel: "Settings",
        }}
      />
    </Drawer>
  );
}
`;
  } else {
    content = `import { Stack } from "expo-router";
import { Typography } from "@morphkit/react-native";

export default function ${name}Layout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: (props) => (
          <Typography variant="title-3">{props.children}</Typography>
        ),
      }}
    >
      <Stack.Screen name="index" options={{ title: "Home" }} />
    </Stack>
  );
}
`;
  }

  return [{ path: outputPath, content }];
}

async function generateFlow(
  options: GenerateOptions,
): Promise<GeneratedFile[]> {
  const name = toPascalCase(options.name);
  const flowName = toKebabCase(options.name);
  const screens = options.screens?.split(",").map((s) => s.trim()) || [
    "welcome",
    "step1",
    "done",
  ];
  const basePath = join(process.cwd(), options.output);

  const files: GeneratedFile[] = [];

  const layoutContent = `import { Stack, Typography } from "@morphkit/react-native";

export default function ${name}Layout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: (props) => (
          <Typography variant="title-2">{props.children}</Typography>
        ),
      }}
    >
${screens
  .map((screen, index) => {
    const screenName = toPascalCase(screen);
    const headerShown = index === 0 ? "false" : "true";
    return `      <Stack.Screen name="${screen}" options={{ headerShown: ${headerShown}, title: "${screenName}" }} />`;
  })
  .join("\n")}
    </Stack>
  );
}
`;

  files.push({ path: join(basePath, "_layout.tsx"), content: layoutContent });

  for (let i = 0; i < screens.length; i++) {
    const screen = screens[i]!;
    const screenName = toPascalCase(screen);
    const isFirst = i === 0;
    const isLast = i === screens.length - 1;
    const nextScreen = !isLast ? screens[i + 1] : null;

    const screenContent = `import { useRouter } from "expo-router";
import { Box, Button, Container, Typography } from "@morphkit/react-native";

export default function ${screenName}Screen() {
  const router = useRouter();

  return (
    <Container>
      <Box style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
        <Typography variant="title-1">${screenName}</Typography>
        <Typography variant="body" style={{ marginTop: 8, textAlign: "center" }}>
          ${isFirst ? `Welcome to the ${flowName} flow` : isLast ? "You have completed the flow!" : `Step ${i + 1} of ${screens.length}`}
        </Typography>
      </Box>
      <Box style={{ padding: 24 }}>
${
  isLast
    ? `        <Button onPress={() => router.dismissAll()}>
          <Button.Text>Finish</Button.Text>
        </Button>`
    : `        <Button onPress={() => router.push("/${flowName}/${nextScreen}")}>
          <Button.Text>${isFirst ? "Get Started" : "Continue"}</Button.Text>
        </Button>`
}
      </Box>
    </Container>
  );
}
`;

    files.push({
      path: join(basePath, `${screen}.tsx`),
      content: screenContent,
    });
  }

  const indexContent = `export { default as ${name}Layout } from "./_layout";
${screens
  .map((screen) => {
    const screenName = toPascalCase(screen);
    return `export { default as ${screenName}Screen } from "./${screen}";`;
  })
  .join("\n")}
`;

  files.push({ path: join(basePath, "index.ts"), content: indexContent });

  return files;
}

export async function generateCommand(
  template: string | undefined,
  options: GenerateOptions,
): Promise<void> {
  const interactive = isInteractive(options.yes);

  const config = await readConfig();
  if (!config) {
    throw new ConfigNotFoundError();
  }

  if (interactive && !isJsonMode()) {
    intro(pc.cyan("Generate morphkit template"));
  }

  let selectedTemplate: TemplateType;

  if (template && template in TEMPLATES) {
    selectedTemplate = template as TemplateType;
  } else if (interactive) {
    const selected = await select({
      message: "Select template to generate",
      options: Object.entries(TEMPLATES).map(([key, value]) => ({
        value: key,
        label: `${key} - ${value.description}`,
      })),
    });

    if (isCancel(selected)) {
      outro(pc.red("Operation cancelled"));
      process.exit(0);
    }

    selectedTemplate = selected as TemplateType;
  } else {
    throw new ValidationError(
      `Invalid template: "${template}". Valid templates: ${Object.keys(TEMPLATES).join(", ")}`,
    );
  }

  let name = options.name;
  let output = options.output;

  if (interactive) {
    if (!name) {
      const inputName = await text({
        message: "Enter name",
        placeholder: selectedTemplate === "theme" ? "my-theme" : "MyComponent",
        validate: (value) => {
          if (!value || value.trim().length === 0) {
            return "Name is required";
          }
          return undefined;
        },
      });

      if (isCancel(inputName)) {
        outro(pc.red("Operation cancelled"));
        process.exit(0);
      }

      name = inputName as string;
    }

    if (!output) {
      const defaultOutput = getDefaultOutput(selectedTemplate, name, config);
      const inputOutput = await text({
        message: "Enter output path",
        placeholder: defaultOutput,
        defaultValue: defaultOutput,
      });

      if (isCancel(inputOutput)) {
        outro(pc.red("Operation cancelled"));
        process.exit(0);
      }

      output = inputOutput as string;
    }
  } else {
    if (!name) {
      throw new ValidationError("Name is required. Use --name flag.");
    }
    if (!output) {
      output = getDefaultOutput(selectedTemplate, name, config);
    }
  }

  const generator = TEMPLATES[selectedTemplate].generator;
  const files = await generator({ ...options, name, output });

  const writtenPaths = await writeGeneratedFiles(files);

  const successMessage = `Generated ${writtenPaths.length} file${writtenPaths.length !== 1 ? "s" : ""}`;

  if (isJsonMode()) {
    outputSuccess(successMessage, {
      template: selectedTemplate,
      files: writtenPaths,
    });
  } else {
    console.log(pc.green(`\n${successMessage}:`));
    for (const filePath of writtenPaths) {
      console.log(`  ${pc.dim(filePath)}`);
    }
    if (interactive) {
      outro(pc.green("Done!"));
    }
  }
}

function getDefaultOutput(
  template: TemplateType,
  name: string,
  config: { paths: { components: string; flows: string } },
): string {
  switch (template) {
    case "theme":
      return "src/theme";
    case "screen":
      return `src/app/${toKebabCase(name)}`;
    case "layout":
      return `src/app/(${toKebabCase(name)})`;
    case "flow":
      return join(config.paths.flows, toKebabCase(name));
    default:
      return "src";
  }
}
