/**
 * Client-side model for location data
 */
export class LocationModel {
    /**
     * @param {Object} data - Location data
     * @param {string} data.id - Unique identifier
     * @param {string} data.name - Location name
     * @param {string} data.state - State name
     * @param {Array} data.appliances - Array of appliances
     * @param {number} data.totalEnergy - Total energy usage
     */
    constructor(data = {}) {
      this.id = data.id || crypto.randomUUID();
      this.name = data.name || '';
      this.state = data.state || '';
      this.appliances = data.appliances || [];
      this.totalEnergy = data.totalEnergy || 0;
    }
  
    /**
     * Save location to localStorage
     */
    save() {
      const locations = LocationModel.getAll();
      const index = locations.findIndex(loc => loc.id === this.id);
      
      if (index !== -1) {
        locations[index] = this;
      } else {
        locations.push(this);
      }
      
      localStorage.setItem('locations', JSON.stringify(locations));
    }
  
    /**
     * Calculate total energy usage
     * @returns {number} Total energy usage in KWh per day
     */
    calculateTotalEnergy() {
      this.totalEnergy = this.appliances.reduce((total, appliance) => {
        return total + (appliance.quantity * appliance.hoursPerDay * appliance.energyPerHour);
      }, 0);
      return this.totalEnergy;
    }
  
    /**
     * Add an appliance to the location
     * @param {Object} appliance - Appliance to add
     */
    addAppliance(appliance) {
      this.appliances.push(appliance);
      this.calculateTotalEnergy();
    }
  
    /**
     * Remove an appliance from the location
     * @param {string} applianceId - ID of appliance to remove
     */
    removeAppliance(applianceId) {
      this.appliances = this.appliances.filter(app => app.id !== applianceId);
      this.calculateTotalEnergy();
    }
  
    /**
     * Get all locations from localStorage
     * @returns {Array} Array of location objects
     */
    static getAll() {
      const locationsJson = localStorage.getItem('locations');
      return locationsJson ? JSON.parse(locationsJson) : [];
    }
  
    /**
     * Get a location by ID
     * @param {string} id - Location ID
     * @returns {LocationModel|null} Location object or null if not found
     */
    static getById(id) {
      const locations = LocationModel.getAll();
      const locationData = locations.find(loc => loc.id === id);
      return locationData ? new LocationModel(locationData) : null;
    }
  
    /**
     * Delete a location by ID
     * @param {string} id - Location ID
     * @returns {boolean} True if location was deleted, false otherwise
     */
    static deleteById(id) {
      console.log('Attempting to delete location with ID:', id);
      
      const locations = LocationModel.getAll();
      console.log('Before deletion, locations count:', locations.length);
      
      const newLocations = locations.filter(loc => loc.id !== id);
      console.log('After deletion, locations count:', newLocations.length);
      
      if (newLocations.length !== locations.length) {
        localStorage.setItem('locations', JSON.stringify(newLocations));
        return true;
      }
      
      return false;
    }
  
    /**
     * Search locations by name
     * @param {string} query - Search query
     * @returns {Array} Array of matching location objects
     */
    static search(query) {
      if (!query) return LocationModel.getAll();
      
      const locations = LocationModel.getAll();
      return locations.filter(loc => 
        loc.name.toLowerCase().includes(query.toLowerCase())
      );
    }
  }
  