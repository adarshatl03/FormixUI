export type PropType = "string" | "boolean" | "number" | "select" | "color" | "json";

export interface PropConfig {
  type: PropType;
  label?: string;
  options?: string[]; // For select
  description?: string;
}

export interface PlaygroundConfig {
  title: string;
  description: string;
  component: React.ComponentType<any>;
  propDefinitions: Record<string, PropConfig>;
  defaultProps: Record<string, any>;
}
