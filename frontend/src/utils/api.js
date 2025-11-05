// Helper para construir URLs da API
export const getApiUrl = (endpoint) => {
  const baseUrl = import.meta.env.VITE_API_URL;
  if (!baseUrl) {
    console.error('VITE_API_URL não está configurada');
    throw new Error('URL da API não configurada');
  }
  // Remove barra inicial do endpoint se existir
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  // Garante que o baseUrl não termina com barra e adiciona /api/ se necessário
  const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  
  // Se o endpoint já começa com /api/, não duplicar
  if (cleanEndpoint.startsWith('api/')) {
    return `${cleanBaseUrl}/${cleanEndpoint}`;
  }
  return `${cleanBaseUrl}/api/${cleanEndpoint}`;
};

