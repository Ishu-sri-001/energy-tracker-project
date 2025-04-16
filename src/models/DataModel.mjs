/**
 * Base data model class
 */
export class DataModel {
    constructor(data = {}) {
      Object.assign(this, data);
    }
  
    /**
     * Convert model to JSON string
     * @returns {string} JSON representation of the model
     */
    toJSON() {
      return JSON.stringify(this);
    }
  
    /**
     * Create model from JSON string
     * @param {string} json - JSON string
     * @returns {DataModel} New model instance
     */
    static fromJSON(json) {
      try {
        const data = JSON.parse(json);
        return new this(data);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        return null;
      }
    }
  }
  