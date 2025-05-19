/**
 * Funções de segurança para o aplicativo de finanças pessoais
 */

// Sanitiza strings para prevenir XSS
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// Valida se uma string é um número válido
export const isValidNumber = (value: string): boolean => {
  return /^-?\d+(\.\d+)?$/.test(value);
};

// Valida se uma string é uma data válida no formato DD/MM/YYYY
export const isValidDate = (dateString: string): boolean => {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) return false;
  
  const parts = dateString.split('/');
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);
  
  const date = new Date(year, month, day);
  
  return (
    date.getFullYear() === year &&
    date.getMonth() === month &&
    date.getDate() === day
  );
};

// Criptografa dados sensíveis antes de armazenar localmente
export const encryptData = (data: string, key: string): string => {
  // Implementação simplificada - em produção, use bibliotecas como CryptoJS
  // Esta é apenas uma simulação para fins educacionais
  return btoa(
    data
      .split('')
      .map((char, i) => 
        String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(i % key.length))
      )
      .join('')
  );
};

// Descriptografa dados sensíveis
export const decryptData = (encryptedData: string, key: string): string => {
  // Implementação simplificada - em produção, use bibliotecas como CryptoJS
  // Esta é apenas uma simulação para fins educacionais
  try {
    const data = atob(encryptedData);
    return data
      .split('')
      .map((char, i) => 
        String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(i % key.length))
      )
      .join('');
  } catch (e) {
    console.error('Erro ao descriptografar dados:', e);
    return '';
  }
};

// Gera um token de segurança para operações sensíveis
export const generateCSRFToken = (): string => {
  return Array(32)
    .fill(0)
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join('');
};

// Armazena dados de forma segura no localStorage com expiração
export const secureLocalStorage = {
  setItem: (key: string, value: any, expirationInMinutes = 60): void => {
    const now = new Date();
    const item = {
      value,
      expiry: now.getTime() + expirationInMinutes * 60 * 1000,
    };
    localStorage.setItem(key, JSON.stringify(item));
  },
  
  getItem: (key: string): any => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;
    
    try {
      const item = JSON.parse(itemStr);
      const now = new Date();
      
      if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
      }
      
      return item.value;
    } catch (e) {
      return null;
    }
  },
  
  removeItem: (key: string): void => {
    localStorage.removeItem(key);
  },
  
  clear: (): void => {
    localStorage.clear();
  }
};
