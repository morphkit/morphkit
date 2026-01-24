import { useState } from "react";
import { Flex } from "../../flex";
import { Button } from "../../button";
import { Toast } from "../Toast";

type ToastVariant = "info" | "success" | "warning" | "error";

export const VariantsExample = () => {
  const [activeVariant, setActiveVariant] = useState<ToastVariant | null>(null);

  const showToast = (variant: ToastVariant) => {
    setActiveVariant(variant);
  };

  const variantMessages: Record<ToastVariant, string> = {
    info: "This is an informational message",
    success: "Operation completed successfully",
    warning: "Please review before proceeding",
    error: "An error occurred. Please try again",
  };

  return (
    <Flex gap="md">
      <Button variant="tonal" onPress={() => showToast("info")}>
        Info Toast
      </Button>
      <Button variant="tonal" onPress={() => showToast("success")}>
        Success Toast
      </Button>
      <Button variant="tonal" onPress={() => showToast("warning")}>
        Warning Toast
      </Button>
      <Button variant="tonal" onPress={() => showToast("error")}>
        Error Toast
      </Button>
      {activeVariant && (
        <Toast
          visible={true}
          variant={activeVariant}
          message={variantMessages[activeVariant]}
          onDismiss={() => setActiveVariant(null)}
        />
      )}
    </Flex>
  );
};
