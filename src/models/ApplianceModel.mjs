import { DataModel } from './DataModel.mjs';

/**
 * Model representing an appliance
 */
export class ApplianceModel extends DataModel {
  /**
   * @param {Object} data - Appliance data
   * @param {string} data.id - Unique identifier
   * @param {string} data.type - Appliance type
   * @param {number} data.quantity - Number of appliances
   * @param {number} data.hoursPerDay - Hours of operation per day
   * @param {number} data.energyPerHour - Energy consumption per hour in KWh
   */
  constructor(data = {}) {
    super({
      id: data.id || crypto.randomUUID(),
      type: data.type || '',
      quantity: data.quantity || 1,
      hoursPerDay: data.hoursPerDay || 0,
      energyPerHour: data.energyPerHour || 0
    });
  }

  /**
   * Calculate daily energy usage for this appliance
   * @returns {number} Daily energy usage in KWh
   */
  getDailyEnergyUsage() {
    return this.quantity * this.hoursPerDay * this.energyPerHour;
  }
}
