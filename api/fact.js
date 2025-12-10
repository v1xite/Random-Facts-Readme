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
    dark_blue: {
      bgColor: '#151515',
      textColor: '#B0B0B0',
      quoteColor: '#4DA6FF'
    },
    dark_red: {
      bgColor: '#151515',
      textColor: '#B0B0B0',
      quoteColor: '#FF4D4D'
    },
    dark_orange: {
      bgColor: '#151515',
      textColor: '#B0B0B0',
      quoteColor: '#FF974D'
    },
    dark_yellow: {
      bgColor: '#151515',
      textColor: '#B0B0B0',
      quoteColor: '#FFFC4D'
    },
    dark_green: {
      bgColor: '#151515',
      textColor: '#B0B0B0',
      quoteColor: '#4DFF50'
    },
    dark_ocean_blue: {
      bgColor: '#151515',
      textColor: '#B0B0B0',
      quoteColor: '#4DFFE4'
    },
    dark_ocean: {
      bgColor: '#151515',
      textColor: '#B0B0B0',
      quoteColor: '#4DD5FF'
    },
    dark_indigo: {
      bgColor: '#151515',
      textColor: '#B0B0B0',
      quoteColor: '#4D4DFF'
    },
    dark_purple: {
      bgColor: '#151515',
      textColor: '#B0B0B0',
      quoteColor: '#974DFF'
    },
    dark_pink: {
      bgColor: '#151515',
      textColor: '#B0B0B0',
      quoteColor: '#FF4DED'
    },
    dark_radical_red: {
      bgColor: '#151515',
      textColor: '#B0B0B0',
      quoteColor: '#FF4D8E'
    },
    dracula: {
      bgColor: '#282A36',
      textColor: '#F8F8F2',
      quoteColor: '#FF79C6'
    },
    ocean: {
      bgColor: '#0F1C2E',
      textColor: '#A3B8D6',
      quoteColor: '#38BDAE'
    },
    midnight: {
      bgColor: '#0F141A',
      textColor: '#C7D1E0',
      quoteColor: '#5AA6FF'
    },
    nebula: {
      bgColor: '#12171F',
      textColor: '#E3D7FF',
      quoteColor: '#B084FF'
    },
    deep_ocean: {
      bgColor: '#131B24',
      textColor: '#A5C4DA',
      quoteColor: '#3EE5C7'
    },
    amethyst: {
      bgColor: '#161B22',
      textColor: '#D6C7FF',
      quoteColor: '#A05BFF'
    },
    neo_pink: {
      bgColor: '#12171F',
      textColor: '#F5E9F7',
      quoteColor: '#FF4DBF'
    },
    inferno: {
      bgColor: '#1A222C',
      textColor: '#E6C8C8',
      quoteColor: '#FF6A4D'
    },
    jade: {
      bgColor: '#0F141A',
      textColor: '#C9F1D0',
      quoteColor: '#49FF87'
    },
    arctic: {
      bgColor: '#131B24',
      textColor: '#D4E9F5',
      quoteColor: '#73D5FF'
    },
    azure: {
      bgColor: '#161B22',
      textColor: '#BFD8FF',
      quoteColor: '#4D8CFF'
    },
    crimson_core: {
      bgColor: '#12171F',
      textColor: '#E9C1C1',
      quoteColor: '#FF3B6B'
    },
    light_blue: {
      bgColor: '#F5F5F5',
      textColor: '#111111',
      quoteColor: '#4DA6FF'
    },
    light_red: {
      bgColor: '#F5F5F5',
      textColor: '#111111',
      quoteColor: '#FF4D4D'
    },
    light_orange: {
      bgColor: '#F5F5F5',
      textColor: '#111111',
      quoteColor: '#FF974D'
    },
    light_yellow: {
      bgColor: '#F5F5F5',
      textColor: '#111111',
      quoteColor: '#E5D200'
    },
    light_green: {
      bgColor: '#F5F5F5',
      textColor: '#111111',
      quoteColor: '#00C73A'
    },
    light_ocean_blue: {
      bgColor: '#F5F5F5',
      textColor: '#111111',
      quoteColor: '#00D4B8'
    },
    light_ocean: {
      bgColor: '#F5F5F5',
      textColor: '#111111',
      quoteColor: '#25C2FF'
    },
    light_indigo: {
      bgColor: '#F5F5F5',
      textColor: '#111111',
      quoteColor: '#4D4DFF'
    },
    light_purple: {
      bgColor: '#F5F5F5',
      textColor: '#111111',
      quoteColor: '#974DFF'
    },
    light_pink: {
      bgColor: '#F5F5F5',
      textColor: '#111111',
      quoteColor: '#FF4DED'
    },
    light_radical_red: {
      bgColor: '#F5F5F5',
      textColor: '#111111',
      quoteColor: '#FF4D8E'
    },
    frost: {
      bgColor: '#F7F9FC',
      textColor: '#0D1117',
      quoteColor: '#4D8CFF'
    },
    polar_day: {
      bgColor: '#F5FAFF',
      textColor: '#1A2738',
      quoteColor: '#47C5FF'
    },
    silver_mist: {
      bgColor: '#F2F4F7',
      textColor: '#222831',
      quoteColor: '#8A7BFF'
    },
    cloudveil: {
      bgColor: '#FAFAFA',
      textColor: '#202428',
      quoteColor: '#FF7ACB'
    },
    dawnlight: {
      bgColor: '#FFFDF7',
      textColor: '#2C2F36',
      quoteColor: '#FF8E5A'
    },
    willow: {
      bgColor: '#F8FBF8',
      textColor: '#1F2A22',
      quoteColor: '#3DDC84'
    },
    tide: {
      bgColor: '#F3FAF9',
      textColor: '#1A2C2A',
      quoteColor: '#32D6C5'
    },
    ether: {
      bgColor: '#F6F6FF',
      textColor: '#27273A',
      quoteColor: '#9A6DFF'
    },
    nimbus: {
      bgColor: '#F4F6F8',
      textColor: '#1D232B',
      quoteColor: '#5AA6FF'
    },
    crystal: {
      bgColor: '#F0F7FF',
      textColor: '#1B2B3A',
      quoteColor: '#68B9FF'
    }
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
