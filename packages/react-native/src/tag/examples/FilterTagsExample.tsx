import { Tag } from "../Tag";
import { Card, Stack, Typography } from "../..";
import { useState } from "react";

interface FilterTag {
  id: number;
  label: string;
  variant: "default" | "primary" | "success" | "warning" | "error";
}

export const FilterTagsExample = () => {
  const [filters, setFilters] = useState<FilterTag[]>([
    { id: 1, label: "Electronics", variant: "primary" },
    { id: 2, label: "In Stock", variant: "success" },
    { id: 3, label: "Under $100", variant: "default" },
    { id: 4, label: "Free Shipping", variant: "default" },
  ]);

  const removeFilter = (id: number) => {
    setFilters(filters.filter((f) => f.id !== id));
  };

  return (
    <Card>
      <Stack gap={12}>
        <Typography variant="heading">Active Filters</Typography>
        {filters.length > 0 ? (
          <Stack direction="horizontal" gap={8} style={{ flexWrap: "wrap" }}>
            {filters.map((filter) => (
              <Tag
                key={filter.id}
                variant={filter.variant}
                dismissible
                onDismiss={() => removeFilter(filter.id)}
              >
                {filter.label}
              </Tag>
            ))}
          </Stack>
        ) : (
          <Typography variant="callout" style={{ color: "#6B7280" }}>
            No active filters
          </Typography>
        )}
      </Stack>
    </Card>
  );
};
