// Language utility functions for URL management

export const getLanguageFromURL = (): string | null => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("lang");
};

export const updateURLLanguage = (language: string): void => {
  const url = new URL(window.location.href);

  if (language === "vi") {
    // Remove lang parameter for Vietnamese (default)
    url.searchParams.delete("lang");
  } else {
    // Set lang parameter for other languages
    url.searchParams.set("lang", language);
  }

  // Update URL without page reload
  window.history.replaceState({}, "", url.toString());
};

export const getLanguageFromPath = (): string => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("lang") || "vi";
};

export const createLanguageURL = (
  language: string,
  currentPath?: string
): string => {
  const path = currentPath || window.location.pathname + window.location.search;
  const url = new URL(path, window.location.origin);

  if (language === "vi") {
    url.searchParams.delete("lang");
  } else {
    url.searchParams.set("lang", language);
  }

  return url.pathname + url.search;
};
