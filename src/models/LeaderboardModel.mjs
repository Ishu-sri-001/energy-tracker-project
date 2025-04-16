import { DataModel } from './DataModel.mjs';

/**
 * Model representing a leaderboard entry
 */
export class LeaderboardModel extends DataModel {
  /**
   * @param {Object} data - Leaderboard entry data
   * @param {string} data.id - Unique identifier
   * @param {string} data.locationName - Location name
   * @param {string} data.state - State name
   * @param {number} data.totalEnergy - Total energy usage in KWh per day
   * @param {Object} data.energyBySource - Energy usage by source
   * @param {number} data.energyBySource.wind - Wind energy in KWh
   * @param {number} data.energyBySource.solar - Solar energy in KWh
   * @param {number} data.energyBySource.gas - Gas energy in KWh
   * @param {number} data.energyBySource.coal - Coal energy in KWh
   * @param {number} data.renewablePercentage - Percentage of renewable energy
   */
  constructor(data = {}) {
    super({
      id: data.id || crypto.randomUUID(),
      locationName: data.locationName || '',
      state: data.state || '',
      totalEnergy: data.totalEnergy || 0,
      energyBySource: data.energyBySource || {
        wind: 0,
        solar: 0,
        gas: 0,
        coal: 0
      },
      renewablePercentage: data.renewablePercentage || 0,
      timestamp: data.timestamp || Date.now()
    });
  }

  /**
   * Calculate renewable energy percentage
   * @returns {number} Percentage of renewable energy
   */
  calculateRenewablePercentage() {
    if (this.totalEnergy === 0) return 0;
    
    const renewable = this.energyBySource.wind + this.energyBySource.solar;
    return (renewable / this.totalEnergy) * 100;
  }
}
