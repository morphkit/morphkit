import { Alert } from "../Alert";
import { Card, Stack, Typography } from "../..";
import { useState } from "react";

interface AlertItem {
  id: number;
  variant: "info" | "warning" | "success" | "error";
  title: string;
  description: string;
}

export const DismissibleAlertsExample = () => {
  const [alerts, setAlerts] = useState<AlertItem[]>([
    { id: 1, variant: "info", title: "New features available", description: "Check out what's new in version 2.0" },
    { id: 2, variant: "warning", title: "Password expires soon", description: "Your password will expire in 7 days" },
    { id: 3, variant: "success", title: "Backup completed", description: "Your data was backed up successfully" },
  ]);

  const dismissAlert = (id: number) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  return (
    <Card>
      <Stack gap={12}>
        <Typography variant="heading">Notifications</Typography>
        {alerts.length > 0 ? (
          <Stack gap={12}>
            {alerts.map((alert) => (
              <Alert
                key={alert.id}
                variant={alert.variant}
                title={alert.title}
                description={alert.description}
                dismissible
                onDismiss={() => dismissAlert(alert.id)}
              />
            ))}
          </Stack>
        ) : (
          <Typography variant="callout" style={{ color: "#6B7280" }}>
            No active notifications
          </Typography>
        )}
      </Stack>
    </Card>
  );
};
