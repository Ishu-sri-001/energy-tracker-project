import { DataModel } from './DataModel.mjs';

/**
 * Model representing energy sources for a state
 */
export class NationalSourceModel extends DataModel {
  /**
   * @param {Object} data - Energy source data
   * @param {string} data.state - State name
   * @param {Object} data.sources - Energy source percentages
   * @param {number} data.sources.wind - Wind energy percentage
   * @param {number} data.sources.solar - Solar energy percentage
   * @param {number} data.sources.gas - Gas energy percentage
   * @param {number} data.sources.coal - Coal energy percentage
   */
  constructor(data = {}) {
    super({
      state: data.state || '',
      sources: data.sources || {
        wind: 0,
        solar: 0,
        gas: 0,
        coal: 0
      }
    });
  }

  /**
   * Get energy source percentages for a state
   * @returns {Object} Energy source percentages
   */
  getSourcePercentages() {
    return this.sources;
  }
}
