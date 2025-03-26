const STORAGE_KEY = "hangmanGame"; // Clave única para guardar los datos en Local Storage

 const defaultData = {
  word: "",
  progress: [],
  remainingAttempts: 6
};

// Función para obtener los datos desde Local Storage
export function getData() {
  const storedData = localStorage.getItem(STORAGE_KEY);
  return storedData ? JSON.parse(storedData) : defaultData;
}

// Función para guardar datos en Local Storage
export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Función para resetear los datos
export function resetData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
}
