import { Progress } from "../Progress";
import { Card, Stack, Typography } from "../..";
import { useState } from "react";

export const AnimatedProgressExample = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const startProgress = () => {
    setIsLoading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  return (
    <Card>
      <Stack gap={16}>
        <Typography variant="heading">Download Simulation</Typography>
        <Progress value={progress} showValue />
        <Typography variant="callout" style={{ color: "#6B7280" }}>
          {progress === 100
            ? "Download complete!"
            : isLoading
              ? "Downloading..."
              : "Ready to download"}
        </Typography>
        {!isLoading && (
          <Typography
            variant="callout"
            style={{ color: "#4A90E2", textDecorationLine: "underline" }}
            onPress={startProgress}
          >
            Start Download
          </Typography>
        )}
      </Stack>
    </Card>
  );
};
