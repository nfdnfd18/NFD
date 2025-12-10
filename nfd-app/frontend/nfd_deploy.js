#!/usr/bin/env node

const { execSync } = require('child_process');

try {
  console.log('Building project for Vercel deployment...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('Deploying to Vercel...');
  execSync('npx vercel --prod', { stdio: 'inherit' });
  console.log('Deployment to Vercel complete!');
} catch (error) {
  console.error('Deployment failed:', error.message);
  process.exit(1);
}
