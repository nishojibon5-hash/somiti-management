const fs = require('fs');
const path = require('path');

console.log('🚀 Preparing build for cPanel hosting...');

const distPath = path.join(__dirname, '../dist');
const webDistPath = path.join(__dirname, '../web-build');

// Check if web-build exists (Expo web build)
if (fs.existsSync(webDistPath)) {
  console.log('✅ Using Expo web-build');
  
  // Copy web-build to dist
  if (fs.existsSync(distPath)) {
    fs.rmSync(distPath, { recursive: true, force: true });
  }
  
  fs.cpSync(webDistPath, distPath, { recursive: true });
  console.log('📁 Copied web-build to dist/');
}

// Ensure index.html exists
const indexPath = path.join(distPath, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.log('❌ index.html not found in dist/');
  process.exit(1);
}

// Read and modify index.html for cPanel compatibility
let indexHtml = fs.readFileSync(indexPath, 'utf8');

// Add meta tags for mobile compatibility
const metaTags = `
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <meta name="theme-color" content="#2563eb">
  <link rel="manifest" href="./manifest.json">
`;

// Insert meta tags before closing head tag
indexHtml = indexHtml.replace('</head>', metaTags + '</head>');

// Ensure all paths are relative for subdirectory deployment
indexHtml = indexHtml.replace(/href="\//g, 'href="./');
indexHtml = indexHtml.replace(/src="\//g, 'src="./');

// Write modified index.html
fs.writeFileSync(indexPath, indexHtml);
console.log('✅ Modified index.html for cPanel compatibility');

// Create manifest.json for PWA
const manifest = {
  "name": "সমিতি ম্যানেজার",
  "short_name": "সমিতি ম্যানেজার",
  "description": "আধুনিক সমিতি ও ক্ষুদ্রঋণ ব্যবস্থাপনা সফটওয়্যার",
  "start_url": "./",
  "display": "standalone",
  "theme_color": "#2563eb",
  "background_color": "#ffffff",
  "orientation": "portrait-primary",
  "scope": "./",
  "lang": "bn",
  "icons": [
    {
      "src": "./icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "./icon-512.png", 
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
};

fs.writeFileSync(
  path.join(distPath, 'manifest.json'),
  JSON.stringify(manifest, null, 2)
);
console.log('✅ Created manifest.json for PWA');

// Create .htaccess for Apache servers (common on cPanel)
const htaccess = `
# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Set cache headers
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>

# Handle React Router (SPA routing)
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-XSS-Protection "1; mode=block"
</IfModule>
`;

fs.writeFileSync(path.join(distPath, '.htaccess'), htaccess.trim());
console.log('✅ Created .htaccess for Apache/cPanel compatibility');

// Create simple icon files if they don't exist
const createSimpleIcon = (size) => {
  const iconPath = path.join(distPath, `icon-${size}.png`);
  if (!fs.existsSync(iconPath)) {
    // Create a simple SVG and convert note for user
    console.log(`📝 Note: Add icon-${size}.png to dist/ folder`);
  }
};

createSimpleIcon(192);
createSimpleIcon(512);

// Create deployment instructions
const instructions = `
# 🚀 cPanel Deployment Instructions

## Files to Upload:
Upload the entire 'dist' folder contents to your cPanel public_html directory.

## Steps:
1. Open cPanel File Manager
2. Navigate to public_html folder  
3. Upload all files from 'dist' folder
4. Extract if uploaded as ZIP
5. Set file permissions to 644 for files, 755 for folders

## URLs:
- Web App: https://yourdomain.com/
- Admin Panel: https://yourdomain.com/admin-login

## Demo Credentials:
- Admin Email: admin@somitimanager.com
- Admin Password: admin123
- Admin Code: SM2024

## Features Included:
✅ Mobile-responsive web app
✅ React Native Web components  
✅ Member management system
✅ Daily collection tracking
✅ Monthly reports & calendar
✅ Admin panel with full control
✅ Backup & restore system
✅ Bilingual support (Bengali/English)
✅ PWA capabilities (install on mobile)
✅ Offline data storage

## Mobile App:
The same codebase can be used to build native Android/iOS apps using:
- expo build:android
- expo build:ios

## Support:
For any issues, check:
1. File permissions (644/755)
2. .htaccess enabled on server
3. JavaScript enabled in browser
4. Modern browser (Chrome, Firefox, Safari, Edge)
`;

fs.writeFileSync(
  path.join(distPath, 'DEPLOYMENT_INSTRUCTIONS.txt'),
  instructions.trim()
);
console.log('✅ Created deployment instructions');

console.log('\n🎉 Build prepared for cPanel hosting!');
console.log('📁 Upload contents of "dist" folder to your public_html directory');
console.log('🌐 Your Somiti Manager app will be live at your domain!');
