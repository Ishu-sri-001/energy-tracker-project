import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Import controllers directly for API endpoints
import { ApplianceController } from './src/controllers/ApplianceController.mjs';
import { NationalSourcesController } from './src/controllers/NationalSources.mjs';
import { NationalStatsController } from './src/controllers/NationalStatsController.mjs';
import { LeaderboardController } from './src/controllers/LeaderboardController.mjs';

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Get directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', [
  path.join(__dirname, 'views'),
  path.join(__dirname, 'public', 'views')
]);

// API Routes - Direct controller usage
app.get('/api/appliances/types', ApplianceController.getApplianceTypes);
app.post('/api/appliances', ApplianceController.createAppliance);

app.get('/api/national/states', NationalSourcesController.getStates);
app.get('/api/national/states/:state', NationalSourcesController.getStateSourceDistribution);
app.get('/api/national/stats', NationalStatsController.getNationalStats);

app.get('/api/leaderboard', LeaderboardController.getLeaderboard);
app.post('/api/leaderboard', LeaderboardController.addLeaderboardEntry);
app.put('/api/leaderboard/:id', LeaderboardController.updateLeaderboardEntry);
app.delete('/api/leaderboard/:id', LeaderboardController.deleteLeaderboardEntry);

// View Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'location_list.html'));
});

app.get('/location/edit/:id?', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'location_edit.html'));
});

app.get('/location/stats/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'location_stats.html'));
});

app.get('/leaderboard', (req, res) => {
  res.render('leaderboard');
});

app.get('/national-stats', (req, res) => {
  res.render('national_stats');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Server is running at http://localhost:${PORT}`);
  
  // Initialize in-memory leaderboard data for demo purposes
  if (!process.leaderboardData) {
    process.leaderboardData = JSON.stringify([]);
  }
});
