// Utility to get API URL with fallback for production
export const getApiUrl = (): string => {
  return import.meta.env.VITE_API_URL || "https://api.it-its.id";
};

// Helper to build full URL for static assets (images, etc.)
export const getAssetUrl = (path: string | null | undefined): string | null => {
  if (!path) return null;
  const baseUrl = getApiUrl();
  return `${baseUrl}/${path}`;
};
