import { useState } from "react";
import { Stack } from "../../stack";
import { Button } from "../../button";
import { Toast } from "../Toast";

type ToastPosition = "top" | "bottom";

export const PositionsExample = () => {
  const [activePosition, setActivePosition] = useState<ToastPosition | null>(
    null,
  );

  return (
    <Stack gap="md">
      <Button variant="secondary" onPress={() => setActivePosition("top")}>
        Show at Top
      </Button>
      <Button variant="secondary" onPress={() => setActivePosition("bottom")}>
        Show at Bottom
      </Button>
      {activePosition && (
        <Toast
          visible={true}
          position={activePosition}
          message={`Toast positioned at ${activePosition}`}
          onDismiss={() => setActivePosition(null)}
        />
      )}
    </Stack>
  );
};
