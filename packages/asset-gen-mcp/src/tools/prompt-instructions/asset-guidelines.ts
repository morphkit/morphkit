import type { GeneratedAssetType, StylePreferences } from "../../types.js";

interface AssetGuideline {
  assetType: GeneratedAssetType;
  title: string;
  overview: string;
  threeElementStructure: {
    subject: string;
    context: string;
    style: string;
  };
  bestPractices: string[];
  lightingTips: string[];
  qualityModifiers: string[];
  textRenderingRules: string[];
  examplePrompts: string[];
  commonMistakes: string[];
  svgOptimization?: {
    recommended: boolean;
    tips: string[];
    optimizedPromptModifiers: string[];
    exampleOptimizedPrompt: string;
  };
}

const ASSET_GUIDELINES: Record<GeneratedAssetType, AssetGuideline> = {
  logo: {
    assetType: "logo",
    title: "Logo Design Guidelines",
    overview:
      "Logos require clean, scalable designs with high contrast and minimal detail. Focus on simplicity and recognizability.",
    threeElementStructure: {
      subject:
        "The core symbol or lettermark (e.g., 'minimalist owl icon', 'letter M in geometric style')",
      context:
        "Application context (e.g., 'on white background', 'centered composition', 'suitable for app icon')",
      style:
        "Visual style (e.g., 'flat design', 'gradient style', 'monochrome', 'outlined')",
    },
    bestPractices: [
      "Request 'simple' or 'minimalist' designs for better scalability",
      "Specify 'vector-style' or 'clean edges' for crisp results",
      "Use 'centered composition' for balanced layouts",
      "Request 'isolated on white/black background' for easy extraction",
      "Include 'no text' unless text is essential to the design",
    ],
    lightingTips: [
      "Avoid complex lighting for logos - use 'flat lighting' or 'no shadows'",
      "For gradient logos, specify gradient direction: 'diagonal gradient', 'radial gradient'",
      "Request 'consistent color fill' for solid logos",
    ],
    qualityModifiers: [
      "high contrast",
      "crisp edges",
      "scalable design",
      "professional quality",
      "clean lines",
      "geometric precision",
    ],
    textRenderingRules: [
      "Keep text under 5 characters for best results",
      "Specify font style: 'sans-serif', 'bold geometric', 'modern typeface'",
      "Use 'stylized text' or 'lettermark' for text-based logos",
    ],
    examplePrompts: [
      "Minimalist owl logo, geometric shapes, flat design, clean edges, isolated on white background, no text, professional quality",
      "Abstract letter A logo, gradient from blue to purple, modern style, centered composition, scalable vector design",
      "Tech company logo, interconnected nodes forming a hexagon, monochrome, simple lines, high contrast on dark background",
    ],
    commonMistakes: [
      "Too much detail - logos should be simple enough to recognize at small sizes",
      "Complex backgrounds - always request isolated backgrounds",
      "Realistic styles - logos work better with stylized/flat approaches",
    ],
    svgOptimization: {
      recommended: true,
      tips: [
        "CRITICAL: Always use 'flat design' or '2D vector style' - 3D effects, shadows, and lighting create artifacts when traced",
        "Request 'solid colors only' or 'no gradients' - gradients vectorize poorly and create banding",
        "Use 'pure white background' (#FFFFFF) or 'pure black background' (#000000) - easier to remove than gray",
        "Add 'sharp clean edges' and 'no anti-aliasing artifacts' for crisp vector paths",
        "Request 'no shadows', 'no drop shadows', 'no glow effects' - these cannot be cleanly vectorized",
        "Use 'geometric shapes' and 'simple forms' - complex organic shapes lose detail when traced",
        "Specify 'high contrast' between logo and background for clean separation",
      ],
      optimizedPromptModifiers: [
        "flat 2D design",
        "solid colors",
        "no shadows",
        "no gradients",
        "no lighting effects",
        "sharp clean edges",
        "pure white background",
        "vector style",
        "geometric shapes",
        "high contrast",
        "minimalist",
      ],
      exampleOptimizedPrompt:
        "Minimalist owl logo, flat 2D design, solid blue and white colors only, no shadows, no gradients, geometric shapes, sharp clean edges, pure white background, high contrast, vector style suitable for SVG conversion",
    },
  },
  icon: {
    assetType: "icon",
    title: "Icon Design Guidelines",
    overview:
      "Icons must be instantly recognizable at small sizes with clear silhouettes and consistent stroke weights.",
    threeElementStructure: {
      subject:
        "The icon concept (e.g., 'settings gear', 'notification bell', 'home house')",
      context:
        "Size and usage context (e.g., 'app icon', '24px UI icon', 'toolbar icon')",
      style: "Icon style (e.g., 'outlined', 'filled', 'duotone', 'glyph')",
    },
    bestPractices: [
      "Use 'single concept' icons - one clear meaning",
      "Specify stroke weight: 'thin stroke', 'medium weight', 'bold stroke'",
      "Request 'consistent corner radius' for unified icon sets",
      "Use 'pixel-perfect' or 'aligned to grid' for sharp rendering",
      "Specify 'filled' or 'outlined' style explicitly",
    ],
    lightingTips: [
      "Icons should have no lighting effects - use 'flat' style",
      "For 3D icons, use 'soft ambient light' only",
      "Avoid shadows except for app icons that need depth",
    ],
    qualityModifiers: [
      "pixel-perfect",
      "sharp edges",
      "uniform stroke",
      "balanced proportions",
      "clear silhouette",
      "recognizable at small size",
    ],
    textRenderingRules: [
      "Avoid text in icons - use symbols instead",
      "If text needed, use single character only",
      "Prefer universal symbols over language-specific text",
    ],
    examplePrompts: [
      "Settings gear icon, outlined style, 2px stroke weight, rounded corners, simple design, isolated on transparent",
      "Heart icon, filled solid red, flat design, perfectly symmetric, centered, no shadow",
      "Calendar icon, duotone style, blue primary color, light fill, clean grid lines, modern minimal design",
    ],
    commonMistakes: [
      "Inconsistent stroke weights within the same icon",
      "Too many elements - icons should have one focal point",
      "Gradients on small icons - they don't scale well",
    ],
    svgOptimization: {
      recommended: true,
      tips: [
        "Use 'flat design' with uniform fills - avoid shading or lighting effects",
        "Request 'monochrome' or '2-3 solid colors max' for clean vector output",
        "Specify 'uniform stroke weight' - varying strokes create complex paths",
        "Use 'pure white background' or 'pure black background' for easy removal",
        "Add 'no anti-aliasing' for pixel-perfect edges that trace cleanly",
        "Request 'filled shapes' or 'outlined only' - mixing both complicates vectorization",
        "Keep icon simple - fewer than 5 distinct shapes traces best",
      ],
      optimizedPromptModifiers: [
        "flat design",
        "solid fill",
        "uniform stroke",
        "no shading",
        "no shadows",
        "monochrome",
        "pure white background",
        "simple shapes",
        "clean edges",
        "vector style",
      ],
      exampleOptimizedPrompt:
        "Settings gear icon, flat design, solid dark gray fill, no shading, no shadows, uniform 2px stroke, simple geometric shapes, pure white background, clean crisp edges, vector style",
    },
  },
  illustration: {
    assetType: "illustration",
    title: "Illustration Guidelines",
    overview:
      "Illustrations allow for creative expression with scenes, characters, and narratives. Balance detail with clarity.",
    threeElementStructure: {
      subject:
        "Main subject and action (e.g., 'woman working on laptop', 'team celebrating success')",
      context:
        "Scene and environment (e.g., 'in modern office', 'outdoor park setting', 'abstract background')",
      style:
        "Art style (e.g., 'flat vector', 'isometric', 'hand-drawn', 'watercolor')",
    },
    bestPractices: [
      "Define the narrative or emotion clearly in the prompt",
      "Specify illustration style: 'flat illustration', 'isometric', 'hand-drawn sketch'",
      "Include composition guidance: 'rule of thirds', 'centered subject', 'full scene'",
      "Request specific color palettes: 'pastel colors', 'vibrant palette', 'muted earth tones'",
      "Add perspective: 'bird's eye view', 'eye level', 'isometric perspective'",
    ],
    lightingTips: [
      "For flat illustrations, use 'no shadows' or 'minimal shading'",
      "For depth, specify 'soft shadows', 'ambient occlusion'",
      "Request 'warm lighting' or 'cool lighting' to set mood",
      "Use 'rim lighting' for character emphasis",
    ],
    qualityModifiers: [
      "cohesive color palette",
      "balanced composition",
      "clean lines",
      "consistent style throughout",
      "professional illustration",
      "editorial quality",
    ],
    textRenderingRules: [
      "Keep text minimal - under 25 characters",
      "Use 'stylized text' that matches illustration style",
      "Consider text as decorative element, not informational",
    ],
    examplePrompts: [
      "Flat vector illustration of diverse team collaborating around a table, modern office setting, warm pastel colors, minimal shadows, professional style",
      "Isometric illustration of a smart city with self-driving cars, green spaces, and modern buildings, vibrant color palette, detailed scene",
      "Hand-drawn style illustration of a person meditating in nature, soft watercolor effect, calming blue and green palette, peaceful mood",
    ],
    commonMistakes: [
      "Mixing incompatible styles (e.g., realistic + cartoon)",
      "Overcrowded scenes without clear focal point",
      "Inconsistent perspective within the same illustration",
    ],
  },
  character: {
    assetType: "character",
    title: "Character Design Guidelines",
    overview:
      "Character designs need distinct features, consistent proportions, and clear personality expression.",
    threeElementStructure: {
      subject:
        "Character description (e.g., 'friendly robot mascot', 'young wizard with glasses')",
      context:
        "Pose and setting (e.g., 'standing confidently', 'waving hello', 'action pose')",
      style: "Art style (e.g., 'Pixar style', 'anime', 'cartoon', 'realistic')",
    },
    bestPractices: [
      "Describe distinctive features: 'large expressive eyes', 'unique hairstyle', 'signature accessory'",
      "Specify body proportions: 'chibi style', 'realistic proportions', 'exaggerated features'",
      "Include personality traits: 'cheerful expression', 'confident stance', 'curious look'",
      "Request specific pose: 'T-pose', 'character sheet', 'three-quarter view'",
      "Define costume/outfit clearly with colors and details",
    ],
    lightingTips: [
      "Use 'three-point lighting' for dramatic character renders",
      "Specify 'soft studio lighting' for friendly characters",
      "Request 'rim light' to separate character from background",
      "Use 'dramatic shadows' for villain or mysterious characters",
    ],
    qualityModifiers: [
      "consistent proportions",
      "expressive features",
      "dynamic pose",
      "clear silhouette",
      "appealing design",
      "distinctive personality",
    ],
    textRenderingRules: [
      "Avoid text on character designs",
      "Name tags or badges should be readable but not focal",
      "Speech bubbles work better as separate elements",
    ],
    examplePrompts: [
      "Friendly robot mascot character, round body, large blue eyes, antenna on head, waving pose, Pixar style, soft studio lighting, cheerful expression",
      "Anime-style young wizard, purple robe, round glasses, holding glowing wand, confident stance, detailed costume, dynamic lighting",
      "Cartoon fox character, orange fur, white belly, big fluffy tail, curious expression, standing on hind legs, simple background",
    ],
    commonMistakes: [
      "Inconsistent style between different character elements",
      "Overcomplicated designs that don't read as silhouettes",
      "Stiff poses - characters need dynamic energy",
    ],
  },
  sprite: {
    assetType: "sprite",
    title: "Game Sprite Guidelines",
    overview:
      "Sprites need pixel-perfect consistency, animation-ready poses, and clear readability at game scale.",
    threeElementStructure: {
      subject:
        "Sprite subject (e.g., 'knight character', 'treasure chest', 'enemy slime')",
      context:
        "Game context (e.g., 'platformer game', 'RPG style', 'top-down view')",
      style:
        "Pixel art style (e.g., '16-bit', '8-bit', '32x32 pixel', 'modern pixel art')",
    },
    bestPractices: [
      "Specify exact pixel dimensions: '32x32', '64x64', '16x24'",
      "Request 'transparent background' for game integration",
      "Define sprite sheet needs: 'idle animation', 'walk cycle', 'attack frames'",
      "Use 'limited color palette' for cohesive game art: '16 colors', '32 colors'",
      "Request 'anti-aliasing' or 'no anti-aliasing' based on game style",
    ],
    lightingTips: [
      "Use consistent light source direction across all sprites",
      "Specify 'top-left light source' for traditional pixel art look",
      "Keep shading simple: '3-4 shade levels per color'",
      "Avoid complex gradients in small sprites",
    ],
    qualityModifiers: [
      "pixel-perfect",
      "limited palette",
      "animation-ready",
      "consistent style",
      "clear at small size",
      "game-ready asset",
    ],
    textRenderingRules: [
      "Avoid text in sprites - they're too small",
      "Use pixel font style if text absolutely needed",
      "Numbers work better than words at sprite scale",
    ],
    examplePrompts: [
      "32x32 pixel art knight sprite, silver armor, blue cape, idle pose, 16-bit style, limited 16 color palette, transparent background",
      "Top-down RPG character sprite sheet, 4 direction walk cycle, 16x24 pixels, retro SNES style, consistent lighting",
      "Pixel art treasure chest sprite, open and closed states, gold and brown colors, 32x32, fantasy RPG style",
    ],
    commonMistakes: [
      "Too much detail for sprite size - keep it readable",
      "Inconsistent pixel scale within the same sprite",
      "Anti-aliasing when crisp pixel edges are needed",
    ],
    svgOptimization: {
      recommended: false,
      tips: [
        "Sprites are typically better as raster images - pixel art intentionally uses discrete pixels",
        "If SVG needed, use 'no anti-aliasing' and 'crisp pixel edges'",
        "Request 'indexed color palette' with limited colors (4-16) for cleaner tracing",
        "Use 'pure magenta background' (#FF00FF) or 'pure green' (#00FF00) as chroma key",
        "Keep shapes blocky and geometric for pixel art style",
      ],
      optimizedPromptModifiers: [
        "no anti-aliasing",
        "crisp pixel edges",
        "limited color palette",
        "magenta background",
        "blocky shapes",
        "hard edges",
      ],
      exampleOptimizedPrompt:
        "32x32 pixel art knight sprite, no anti-aliasing, crisp hard edges, 8 color palette only, pure magenta background #FF00FF, blocky geometric style, game sprite",
    },
  },
  pattern: {
    assetType: "pattern",
    title: "Pattern Design Guidelines",
    overview:
      "Patterns must tile seamlessly with balanced element distribution and consistent visual rhythm.",
    threeElementStructure: {
      subject:
        "Pattern elements (e.g., 'geometric shapes', 'floral motifs', 'abstract lines')",
      context:
        "Usage context (e.g., 'fabric print', 'wallpaper', 'web background')",
      style:
        "Pattern style (e.g., 'seamless tile', 'repeat pattern', 'geometric', 'organic')",
    },
    bestPractices: [
      "Always request 'seamless' or 'tileable' pattern",
      "Specify repeat type: 'straight repeat', 'half-drop', 'brick repeat'",
      "Define scale: 'small-scale print', 'large motif', 'micro pattern'",
      "Include density: 'dense pattern', 'sparse elements', 'balanced distribution'",
      "Request specific color count: '3-color pattern', 'monochrome', 'multicolor'",
    ],
    lightingTips: [
      "Patterns work best with flat, even lighting",
      "Avoid shadows that break the seamless effect",
      "Use subtle highlights only for texture patterns",
      "Keep lighting consistent across all pattern elements",
    ],
    qualityModifiers: [
      "seamless tile",
      "balanced distribution",
      "consistent spacing",
      "clean edges",
      "harmonious colors",
      "production-ready",
    ],
    textRenderingRules: [
      "Text in patterns should be part of the design motif",
      "Keep text as decorative elements, not readable content",
      "Use stylized or abstracted letterforms",
    ],
    examplePrompts: [
      "Seamless geometric pattern, triangles and hexagons, navy blue and gold, modern minimalist style, balanced spacing, tileable design",
      "Floral seamless pattern, watercolor roses, soft pink and green, vintage style, fabric print quality, half-drop repeat",
      "Abstract seamless background, flowing curved lines, gradient purple to blue, subtle depth, web design ready",
    ],
    commonMistakes: [
      "Visible seams at tile edges - test seamlessness",
      "Uneven element distribution creating visual holes",
      "Too many colors making the pattern chaotic",
    ],
    svgOptimization: {
      recommended: true,
      tips: [
        "Use 'flat geometric shapes' - organic shapes create complex vector paths",
        "Request '3-5 solid colors max' - fewer colors means cleaner SVG output",
        "Specify 'no gradients' and 'no shading' - use solid fills only",
        "Add 'sharp edges' and 'clean lines' for crisp vector boundaries",
        "Use 'pure white background' with high contrast pattern elements",
        "Request 'simple repeating elements' - complex motifs don't trace well",
      ],
      optimizedPromptModifiers: [
        "flat geometric",
        "solid colors only",
        "no gradients",
        "no shading",
        "sharp edges",
        "clean lines",
        "high contrast",
        "pure white background",
        "simple shapes",
      ],
      exampleOptimizedPrompt:
        "Seamless geometric pattern, flat design, triangles and circles, 3 solid colors navy blue gold and white, no gradients, no shading, sharp clean edges, pure white background, high contrast, vector style",
    },
  },
  photograph: {
    assetType: "photograph",
    title: "Photographic Image Guidelines",
    overview:
      "Photorealistic images benefit from specific camera terminology, lighting setups, and composition rules.",
    threeElementStructure: {
      subject:
        "Main subject (e.g., 'professional headshot', 'product on marble surface', 'landscape scene')",
      context:
        "Environment and setup (e.g., 'studio setting', 'natural outdoor light', 'urban background')",
      style:
        "Photography style (e.g., 'editorial', 'commercial', 'documentary', 'fine art')",
    },
    bestPractices: [
      "Use camera terminology: '85mm lens', 'f/1.8 aperture', 'shallow depth of field'",
      "Specify camera angle: 'eye level', 'low angle', 'overhead shot', 'dutch angle'",
      "Include time of day: 'golden hour', 'blue hour', 'midday sun', 'overcast'",
      "Request specific photography genre: 'portrait', 'product', 'landscape', 'macro'",
      "Define post-processing style: 'high contrast', 'muted tones', 'vibrant colors'",
    ],
    lightingTips: [
      "Use photography lighting terms: 'Rembrandt lighting', 'butterfly lighting', 'split lighting'",
      "Specify light quality: 'soft diffused light', 'hard directional light'",
      "Include practical lights: 'neon signs', 'window light', 'candle glow'",
      "Request 'backlit' or 'rim light' for dramatic effect",
    ],
    qualityModifiers: [
      "8K resolution",
      "photorealistic",
      "sharp focus",
      "professional photography",
      "magazine quality",
      "DSLR quality",
    ],
    textRenderingRules: [
      "Text in photographs should appear on real objects (signs, labels)",
      "Keep text under 25 characters for readability",
      "Specify font appearance: 'neon sign text', 'vintage poster lettering'",
    ],
    examplePrompts: [
      "Professional headshot of a business woman, studio lighting, neutral gray background, 85mm lens, f/2.8, sharp focus, editorial quality",
      "Product photography of luxury watch on black marble, dramatic side lighting, reflection, commercial quality, 8K resolution",
      "Landscape photograph of mountain lake at golden hour, wide angle lens, vibrant colors, sharp foreground, soft background, nature photography",
    ],
    commonMistakes: [
      "Mixing incompatible lighting styles",
      "Forgetting depth of field specifications",
      "Not specifying time of day for outdoor scenes",
    ],
  },
  "ui-element": {
    assetType: "ui-element",
    title: "UI Element Guidelines",
    overview:
      "UI elements require precise specifications for dimensions, states, and platform design guidelines.",
    threeElementStructure: {
      subject:
        "UI element type (e.g., 'button', 'card component', 'navigation bar')",
      context:
        "Platform and state (e.g., 'iOS style', 'hover state', 'dark mode')",
      style:
        "Design system style (e.g., 'material design', 'glassmorphism', 'neumorphism')",
    },
    bestPractices: [
      "Specify exact dimensions: '120x44px button', '16:9 card'",
      "Include all states: 'default, hover, pressed, disabled'",
      "Request platform-specific: 'iOS Human Interface', 'Material Design 3'",
      "Define corner radius: '8px radius', 'fully rounded', 'sharp corners'",
      "Include shadow specifications: 'subtle shadow', 'elevation-2', 'no shadow'",
    ],
    lightingTips: [
      "UI elements typically use flat design with no lighting",
      "For neumorphism, specify 'soft inner shadow', 'light source top-left'",
      "Glassmorphism uses 'background blur' and 'subtle reflections'",
      "Avoid complex lighting that affects usability",
    ],
    qualityModifiers: [
      "pixel-perfect",
      "production-ready",
      "design system compliant",
      "accessible contrast",
      "crisp edges",
      "scalable",
    ],
    textRenderingRules: [
      "Use system fonts: 'SF Pro', 'Roboto', 'Inter'",
      "Maintain readable size: minimum 14px for body text",
      "Ensure sufficient contrast ratio for accessibility",
      "Keep button text concise: 1-3 words",
    ],
    examplePrompts: [
      "Primary action button, iOS style, blue background, white text, 120x44px, rounded corners 10px, default and pressed states",
      "Card component, Material Design 3, white background, subtle elevation shadow, 16:9 ratio, light mode, clean layout",
      "Glassmorphism notification card, frosted glass effect, subtle border, dark mode, rounded corners, modern minimal design",
    ],
    commonMistakes: [
      "Inconsistent border radius across components",
      "Poor contrast ratios failing accessibility",
      "Missing interaction states",
    ],
    svgOptimization: {
      recommended: true,
      tips: [
        "Use 'flat design' - neumorphism and glassmorphism effects don't vectorize",
        "Request 'solid color fills' - no gradients, no transparency effects",
        "Specify 'sharp corners' or 'exact border radius' for clean paths",
        "Add 'no shadows' and 'no blur effects' - these create raster artifacts",
        "Use 'pure white background' for easy background removal",
        "Keep UI elements simple - complex states should be separate images",
        "Request 'high contrast' between element and background",
      ],
      optimizedPromptModifiers: [
        "flat design",
        "solid colors",
        "no shadows",
        "no gradients",
        "no blur effects",
        "sharp edges",
        "pure white background",
        "high contrast",
        "clean lines",
        "simple shapes",
      ],
      exampleOptimizedPrompt:
        "Primary button UI element, flat design, solid blue fill #007AFF, white text, rounded corners 8px, no shadows, no gradients, pure white background, clean sharp edges, vector style",
    },
  },
};

export function getGuidelinesForAssetType(
  assetType: GeneratedAssetType,
  stylePreferences?: StylePreferences,
): string {
  const guidelines = ASSET_GUIDELINES[assetType];

  const sections: string[] = [
    `# ${guidelines.title}`,
    "",
    `## Overview`,
    guidelines.overview,
    "",
    `## Three-Element Prompt Structure`,
    "Build your prompt using these three elements:",
    "",
    `1. **Subject**: ${guidelines.threeElementStructure.subject}`,
    `2. **Context**: ${guidelines.threeElementStructure.context}`,
    `3. **Style**: ${guidelines.threeElementStructure.style}`,
    "",
    `## Best Practices`,
    ...guidelines.bestPractices.map((practice) => `- ${practice}`),
    "",
    `## Lighting Tips`,
    ...guidelines.lightingTips.map((tip) => `- ${tip}`),
    "",
    `## Quality Modifiers`,
    "Add these to enhance output quality:",
    guidelines.qualityModifiers.map((mod) => `\`${mod}\``).join(", "),
    "",
    `## Text Rendering Rules`,
    ...guidelines.textRenderingRules.map((rule) => `- ${rule}`),
    "",
    `## Example Prompts`,
    ...guidelines.examplePrompts.map((example, i) => `${i + 1}. "${example}"`),
    "",
    `## Common Mistakes to Avoid`,
    ...guidelines.commonMistakes.map((mistake) => `- ${mistake}`),
  ];

  if (guidelines.svgOptimization) {
    const svg = guidelines.svgOptimization;
    sections.push("");
    sections.push(
      `## SVG/Vector Output Optimization ${svg.recommended ? "(Recommended for this asset type)" : "(Use with caution)"}`,
    );
    sections.push("");
    sections.push(
      "If you need transparent PNG or SVG output (using remove-background → vectorize pipeline):",
    );
    sections.push("");
    svg.tips.forEach((tip) => sections.push(`- ${tip}`));
    sections.push("");
    sections.push("**Optimized Prompt Modifiers for SVG:**");
    sections.push(
      svg.optimizedPromptModifiers.map((mod) => `\`${mod}\``).join(", "),
    );
    sections.push("");
    sections.push("**Example SVG-Optimized Prompt:**");
    sections.push(`> ${svg.exampleOptimizedPrompt}`);
  }

  if (stylePreferences) {
    sections.push("");
    sections.push("## Style Preferences Applied");

    if (stylePreferences.colorScheme) {
      sections.push(`- **Color Scheme**: ${stylePreferences.colorScheme}`);
      sections.push(
        `  Consider incorporating: "${stylePreferences.colorScheme} color palette" in your prompt`,
      );
    }

    if (stylePreferences.artStyle) {
      sections.push(`- **Art Style**: ${stylePreferences.artStyle}`);
      sections.push(
        `  Consider incorporating: "${stylePreferences.artStyle} style" in your prompt`,
      );
    }

    if (stylePreferences.mood) {
      sections.push(`- **Mood**: ${stylePreferences.mood}`);
      sections.push(
        `  Consider incorporating: "${stylePreferences.mood} mood" or "${stylePreferences.mood} atmosphere" in your prompt`,
      );
    }
  }

  return sections.join("\n");
}

export { ASSET_GUIDELINES, type AssetGuideline };
