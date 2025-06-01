const MAX_HISTORY_ITEMS = 50;

export const getGameHistory = (key) => {
  try {
    const history = localStorage.getItem(key);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error("Error reading game history:", error);
    return [];
  }
};

export const addToGameHistory = (key, result) => {
  try {
    const history = getGameHistory(key);
    const newHistoryItem = {
      id: Date.now(),
      value: result.number,
      color: result.isWin ? "#15803D" : "#B91C1C",
      timestamp: new Date().toISOString(),
    };

    history.unshift(newHistoryItem);

    const trimmedHistory = history.slice(0, MAX_HISTORY_ITEMS);

    localStorage.setItem(key, JSON.stringify(trimmedHistory));
    return trimmedHistory;
  } catch (error) {
    console.error("Error saving game history:", error);
    return getGameHistory(key);
  }
};

export const clearGameHistory = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error clearing game history:", error);
  }
};
