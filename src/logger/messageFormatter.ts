export type MessageFormatter = (
  service: string,
  level: string,
  message: string,
) => string;
