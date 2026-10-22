const sharp = require('C:/Users/HP/AppData/Local/OpenAI/Codex/runtimes/cua_node/2fbcd108736f9c20/bin/node_modules/sharp');
const fs = require('fs');

async function fixRibbon() {
  const inputBuffer = fs.readFileSync('C:/Users/HP/.gemini/antigravity/brain/f6e4db3b-cba9-4101-b958-27d724daff8d/blessings_ameen_first_1792699672313.jpg');

  const svgBanner = `
    <svg width="1376" height="768" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="ribbonShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#4B342E" flood-opacity="0.25"/>
        </filter>
        <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#C9A66B"/>
          <stop offset="50%" stop-color="#E5CF9F"/>
          <stop offset="100%" stop-color="#C9A66B"/>
        </linearGradient>
      </defs>

      <!-- Crisp Gold Ribbon Patch matching background banner curve -->
      <g filter="url(#ribbonShadow)">
        <path d="M 440 152 Q 688 128 936 152 Q 936 218 936 218 Q 688 194 440 218 Z" 
              fill="#FFF8F1" 
              stroke="url(#goldBorder)" 
              stroke-width="2.5" />
      </g>

      <!-- Royal Upper-case Capital 'A' in Ameen & Suada -->
      <text x="688" y="195" 
            text-anchor="middle" 
            font-family="'Playfair Display', 'Cormorant Garamond', 'Cinzel', Georgia, serif" 
            font-size="38" 
            font-weight="700" 
            font-style="italic"
            letter-spacing="1"
            fill="#8E3C51">
        Ameen &amp; Suada
      </text>

      <!-- Small ornamental gold flourishes -->
      <circle cx="468" cy="186" r="3" fill="#C9A66B"/>
      <circle cx="908" cy="186" r="3" fill="#C9A66B"/>
    </svg>
  `;

  const outputBuffer = await sharp(inputBuffer)
    .composite([{ input: Buffer.from(svgBanner), top: 0, left: 0 }])
    .jpeg({ quality: 95 })
    .toBuffer();

  fs.writeFileSync('public/assets/images/scene_blessings.jpg', outputBuffer);
  fs.writeFileSync('src/assets/images/scene_blessings.jpg', outputBuffer);
  console.log('Successfully written clean Ameen & Suada with crisp capital A!');
}

fixRibbon().catch(err => console.error(err));
