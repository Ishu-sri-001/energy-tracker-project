import { LeaderboardModel } from '../models/LeaderboardModel.mjs';

/**
 * Controller for national statistics
 */
export class NationalStatsController {
  /**
   * Get aggregated national statistics from leaderboard data
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  static getNationalStats(req, res) {
    try {
      // In a real application, this would fetch from a database
      const leaderboardJson = process.leaderboardData || '[]';
      const leaderboard = JSON.parse(leaderboardJson);
      
      // Initialize statistics
      const stats = {
        totalEnergy: 0,
        energyBySource: {
          wind: 0,
          solar: 0,
          gas: 0,
          coal: 0
        },
        renewablePercentage: 0,
        entryCount: leaderboard.length
      };
      
      // Aggregate data
      leaderboard.forEach(entry => {
        stats.totalEnergy += entry.totalEnergy;
        stats.energyBySource.wind += entry.energyBySource.wind;
        stats.energyBySource.solar += entry.energyBySource.solar;
        stats.energyBySource.gas += entry.energyBySource.gas;
        stats.energyBySource.coal += entry.energyBySource.coal;
      });
      
      // Calculate renewable percentage
      if (stats.totalEnergy > 0) {
        const renewable = stats.energyBySource.wind + stats.energyBySource.solar;
        stats.renewablePercentage = (renewable / stats.totalEnergy) * 100;
      }
      
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
