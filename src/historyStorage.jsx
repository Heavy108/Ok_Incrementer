
export const saveHistory = history => {
  localStorage.setItem("history", JSON.stringify(history));
};

export const loadHistory = () => {
  const storedHistory = localStorage.getItem("history");
  return storedHistory ? JSON.parse(storedHistory) : [];
};
