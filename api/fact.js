const facts = require('./facts.json');

module.exports = (req, res) => {
  if (!facts || facts.length === 0) {
    const errorSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="50">
      <text x="10" y="30" style="font-family: monospace; fill: red;">ERROR: Facts file is empty!</text>
    </svg>`;
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    return res.send(errorSVG);
  }

  // --- 1. Define your Themes here ---
  const themes = {
    dark: {
      bgColor: '#151515',
      textColor: '#B0B0B0',
      quoteColor: '#4DA6FF'
    },
    light: {
      bgColor: '#FFFFFF',
      textColor: '#333333',
      quoteColor: '#0070F3' // Vercel Blue
    },
    dracula: {
      bgColor: '#282a36',
      textColor: '#f8f8f2',
      quoteColor: '#ff79c6' // Dracula Pink
    },
    ocean: {
      bgColor: '#0f1c2e',
      textColor: '#a3b8d6',
      quoteColor: '#38bdae'
    },
    // Add as many as you want here...
  };

  // --- 2. Get the requested theme from URL (default to 'dark') ---
  // req.query.theme looks for ?theme=xyz in the URL
  const requestedTheme = req.query.theme || 'dark';
  
  // Select the theme config, or fallback to 'dark' if the name doesn't exist
  const currentTheme = themes[requestedTheme] || themes.dark;

  const randomIndex = Math.floor(Math.random() * facts.length);
  const fact = facts[randomIndex];
  const factText = fact && fact.text ? fact.text : "Error loading fact text.";

  const width = 650;
  const height = 180;
  
  // --- 3. Use the dynamic colors ---
  const { bgColor, textColor, quoteColor } = currentTheme;

  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${width}" height="${height}" fill="${bgColor}" rx="8" />
      <foreignObject x="20" y="20" width="${width - 40}" height="${height - 40}">
        <div xmlns="http://www.w3.org/1999/xhtml" style="
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          height: 100%;
          box-sizing: border-box;
        ">
          <p style="color: ${textColor}; font-size: 22px; font-weight: 400; font-style: italic; line-height: 1.4; margin: 0; padding: 0; text-align: left;">
            <span style="color: ${quoteColor}; font-size: 28px; font-family: 'Georgia', serif;">“</span>
            ${factText}
            <span style="color: ${quoteColor}; font-size: 28px; font-family: 'Georgia', serif;">”</span>
          </p>
        </div>
      </foreignObject>
    </svg>
  `;

  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  res.send(svg);
};
