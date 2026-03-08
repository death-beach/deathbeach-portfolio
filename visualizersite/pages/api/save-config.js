import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const config = req.body;

    // Validate the config has required fields
    if (!config.artist || !config.tracks || !Array.isArray(config.tracks)) {
      return res.status(400).json({ error: 'Invalid config: missing required fields' });
    }

    // Generate the config file content
    const configContent = `export const config = ${JSON.stringify(config, null, 2)};`;

    // Write to the config file
    const configPath = path.join(process.cwd(), 'data', 'playlist.config.js');
    fs.writeFileSync(configPath, configContent, 'utf8');

    res.status(200).json({ success: true, message: 'Configuration saved successfully' });
  } catch (error) {
    console.error('Error saving config:', error);
    res.status(500).json({ error: 'Failed to save configuration' });
  }
}