import { LeaderboardModel } from '../models/LeaderboardModel.mjs';

/**
 * Controller for leaderboard operations
 */
export class LeaderboardController {
  /**
   * Get all leaderboard entries
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  static getLeaderboard(req, res) {
    try {
      // In a real application, this would fetch from a database
      const leaderboardJson = process.leaderboardData || '[]';
      let leaderboard = JSON.parse(leaderboardJson);
      
      // Convert to LeaderboardModel instances
      leaderboard = leaderboard.map(entry => new LeaderboardModel(entry));
      
      // Sort by renewable percentage (highest first)
      leaderboard.sort((a, b) => b.renewablePercentage - a.renewablePercentage);
      
      res.json(leaderboard);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Add a new leaderboard entry
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  static addLeaderboardEntry(req, res) {
    try {
      const entryData = req.body;
      const entry = new LeaderboardModel(entryData);
      
      // Calculate renewable percentage if not provided
      if (!entry.renewablePercentage) {
        entry.renewablePercentage = entry.calculateRenewablePercentage();
      }
      
      // In a real application, this would save to a database
      const leaderboardJson = process.leaderboardData || '[]';
      const leaderboard = JSON.parse(leaderboardJson);
      leaderboard.push(entry);
      process.leaderboardData = JSON.stringify(leaderboard);
      
      res.status(201).json(entry);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Update a leaderboard entry
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  static updateLeaderboardEntry(req, res) {
    try {
      const { id } = req.params;
      const entryData = req.body;
      
      // In a real application, this would update in a database
      const leaderboardJson = process.leaderboardData || '[]';
      const leaderboard = JSON.parse(leaderboardJson);
      
      const index = leaderboard.findIndex(entry => entry.id === id);
      
      if (index === -1) {
        return res.status(404).json({ error: 'Leaderboard entry not found' });
      }
      
      const updatedEntry = new LeaderboardModel({
        ...leaderboard[index],
        ...entryData,
        id // Ensure ID doesn't change
      });
      
      // Calculate renewable percentage
      updatedEntry.renewablePercentage = updatedEntry.calculateRenewablePercentage();
      
      leaderboard[index] = updatedEntry;
      process.leaderboardData = JSON.stringify(leaderboard);
      
      res.json(updatedEntry);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Delete a leaderboard entry
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  static deleteLeaderboardEntry(req, res) {
    try {
      const { id } = req.params;
      
      // In a real application, this would delete from a database
      const leaderboardJson = process.leaderboardData || '[]';
      const leaderboard = JSON.parse(leaderboardJson);
      
      const newLeaderboard = leaderboard.filter(entry => entry.id !== id);
      
      if (newLeaderboard.length === leaderboard.length) {
        return res.status(404).json({ error: 'Leaderboard entry not found' });
      }
      
      process.leaderboardData = JSON.stringify(newLeaderboard);
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
