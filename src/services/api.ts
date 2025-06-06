
const API_BASE_URL = 'http://localhost:3001/api';

export class ApiService {
  private static async request(endpoint: string, options?: RequestInit) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  // Surfaces API
  static async getSurfaces() {
    return this.request('/surfaces');
  }

  static async createSurface(data: any) {
    return this.request('/surfaces', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async updateSurface(id: string, data: any) {
    return this.request(`/surfaces/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  // Fields API
  static async getFields() {
    return this.request('/fields');
  }

  static async createField(data: any) {
    return this.request('/fields', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async createFieldAction(fieldId: string, action: any) {
    return this.request(`/fields/${fieldId}/actions`, {
      method: 'POST',
      body: JSON.stringify(action),
    });
  }

  // Harvests API
  static async getHarvests() {
    return this.request('/harvests');
  }

  static async createHarvest(data: any) {
    return this.request('/harvests', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async updateHarvest(id: string, data: any) {
    return this.request(`/harvests/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  static async updateHarvestStock(id: string, quantitySold: number) {
    return this.request(`/harvests/${id}/stock`, {
      method: 'PATCH',
      body: JSON.stringify({ quantitySold }),
    });
  }

  // Sales API
  static async getSales() {
    return this.request('/sales');
  }

  static async createSale(data: any) {
    return this.request('/sales', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Inputs API
  static async getInputs() {
    return this.request('/inputs');
  }

  static async createInput(data: any) {
    return this.request('/inputs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async updateInput(id: string, data: any) {
    return this.request(`/inputs/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  static async useInput(inputId: string, usage: any) {
    return this.request(`/inputs/${inputId}/use`, {
      method: 'POST',
      body: JSON.stringify(usage),
    });
  }

  static async buyInput(inputId: string, purchase: any) {
    return this.request(`/inputs/${inputId}/buy`, {
      method: 'POST',
      body: JSON.stringify(purchase),
    });
  }

  // Clients API
  static async getClients() {
    return this.request('/clients');
  }

  static async createClient(data: any) {
    return this.request('/clients', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}
