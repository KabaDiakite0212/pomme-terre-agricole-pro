import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

// Créer une instance Axios avec configuration de base
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour gérer les erreurs globalement
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    throw error;
  }
);

export class ApiService {
  // Surfaces API
  static async getSurfaces() {
    const response = await api.get('/surfaces');
    return response.data;
  }

  static async createSurface(data: any) {
    const response = await api.post('/surfaces', data);
    return response.data;
  }

  static async updateSurface(id: string, data: any) {
    const response = await api.patch(`/surfaces/${id}`, data);
    return response.data;
  }

  // Fields API
  static async getFields() {
    const response = await api.get('/fields');
    return response.data;
  }

  static async createField(data: any) {
    const response = await api.post('/fields', data);
    return response.data;
  }

  static async createFieldAction(fieldId: string, action: any) {
    const response = await api.post(`/fields/${fieldId}/actions`, action);
    return response.data;
  }

  // Harvests API
  static async getHarvests() {
    const response = await api.get('/harvests');
    return response.data;
  }

  static async createHarvest(data: any) {
    const response = await api.post('/harvests', data);
    return response.data;
  }

  static async updateHarvest(id: string, data: any) {
    const response = await api.patch(`/harvests/${id}`, data);
    return response.data;
  }

  static async updateHarvestStock(id: string, quantitySold: number) {
    const response = await api.patch(`/harvests/${id}/stock`, { quantitySold });
    return response.data;
  }

  // Sales API
  static async getSales() {
    const response = await api.get('/sales');
    return response.data;
  }

  static async createSale(data: any) {
    const response = await api.post('/sales', data);
    return response.data;
  }

  // Inputs API
  static async getInputs() {
    const response = await api.get('/inputs');
    return response.data;
  }

  static async createInput(data: any) {
    const response = await api.post('/inputs', data);
    return response.data;
  }

  static async updateInput(id: string, data: any) {
    const response = await api.patch(`/inputs/${id}`, data);
    return response.data;
  }

  static async useInput(inputId: string, usage: any) {
    const response = await api.post(`/inputs/${inputId}/use`, usage);
    return response.data;
  }

  static async buyInput(inputId: string, purchase: any) {
    const response = await api.post(`/inputs/${inputId}/buy`, purchase);
    return response.data;
  }

  // Clients API
  static async getClients() {
    const response = await api.get('/clients');
    return response.data;
  }

  static async createClient(data: any) {
    const response = await api.post('/clients', data);
    return response.data;
  }

  // Conservation API
  static async getConservation(type?: string, parentId?: string) {
    const params = new URLSearchParams();
    if (type) params.append('type', type);
    if (parentId) params.append('parentId', parentId);
    
    const response = await api.get(`/conservation?${params.toString()}`);
    return response.data;
  }

  static async createConservation(data: any) {
    const response = await api.post('/conservation', data);
    return response.data;
  }

  static async updateConservation(id: string, data: any) {
    const response = await api.patch(`/conservation/${id}`, data);
    return response.data;
  }

  static async deleteConservation(id: string) {
    const response = await api.delete(`/conservation/${id}`);
    return response.data;
  }

  static async assignRecolte(conservationId: string, recolteId: string) {
    const response = await api.post(`/conservation/${conservationId}/assign`, { recolteId });
    return response.data;
  }

  static async libererEmplacement(conservationId: string) {
    const response = await api.post(`/conservation/${conservationId}/liberer`);
    return response.data;
  }

  static async getConservationStatistics() {
    const response = await api.get('/conservation/statistics');
    return response.data;
  }
}
