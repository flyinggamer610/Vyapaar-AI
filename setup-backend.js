#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Setting up Vyapaar AI Backend...\n');

const checkNodeVersion = () => {
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
  
  if (majorVersion < 18) {
    console.error('❌ Node.js 18 or higher is required');
    console.error(`Current version: ${nodeVersion}`);
    process.exit(1);
  }
  
  console.log(`✅ Node.js version: ${nodeVersion}`);
};

const installDependencies = () => {
  console.log('\n📦 Installing dependencies...');
  
  try {
    execSync('npm install', { 
      cwd: './backend',
      stdio: 'inherit'
    });
    console.log('✅ Dependencies installed successfully');
  } catch (error) {
    console.error('❌ Failed to install dependencies');
    process.exit(1);
  }
};

const createEnvFile = () => {
  console.log('\n🔧 Setting up environment configuration...');
  
  const envPath = './backend/.env';
  const envExamplePath = './backend/env.example';
  
  if (fs.existsSync(envPath)) {
    console.log('✅ .env file already exists');
    return;
  }
  
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ Created .env file from template');
    console.log('⚠️  Please update .env with your actual credentials');
  } else {
    console.error('❌ env.example file not found');
    process.exit(1);
  }
};

const createDirectories = () => {
  console.log('\n📁 Creating necessary directories...');
  
  const dirs = [
    './backend/logs',
    './backend/uploads',
    './database/migrations'
  ];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✅ Created directory: ${dir}`);
    } else {
      console.log(`✅ Directory already exists: ${dir}`);
    }
  });
};

const createGitignore = () => {
  console.log('\n📝 Creating .gitignore...');
  
  const gitignoreContent = `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
logs/
*.log

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# nyc test coverage
.nyc_output

# Dependency directories
node_modules/
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# next.js build output
.next

# nuxt.js build output
.nuxt

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port

# Stores VSCode versions used for testing VSCode extensions
.vscode-test

# Uploads
uploads/
temp/

# Firebase
firebase-debug.log
firebase-debug.*.log

# MacOS
.DS_Store

# Windows
Thumbs.db
ehthumbs.db
Desktop.ini

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Testing
coverage/
.nyc_output/
`;

  const gitignorePath = './backend/.gitignore';
  
  if (!fs.existsSync(gitignorePath)) {
    fs.writeFileSync(gitignorePath, gitignoreContent);
    console.log('✅ Created .gitignore file');
  } else {
    console.log('✅ .gitignore already exists');
  }
};

const createPackageScripts = () => {
  console.log('\n📋 Setting up package scripts...');
  
  const packagePath = './backend/package.json';
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  const newScripts = {
    ...packageJson.scripts,
    'setup': 'node ../setup-backend.js',
    'test:watch': 'jest --watch',
    'test:coverage': 'jest --coverage',
    'lint:fix': 'eslint . --fix',
    'db:setup': 'node ../database/setup.js',
    'db:sample': 'node -e "import { createSampleData } from \'../database/setup.js\'; createSampleData(\'test-user-123\');"'
  };
  
  packageJson.scripts = newScripts;
  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
  console.log('✅ Updated package.json scripts');
};

const displayNextSteps = () => {
  console.log('\n🎉 Backend setup completed successfully!\n');
  
  console.log('📋 Next Steps:');
  console.log('1. Configure Firebase:');
  console.log('   - Create a Firebase project');
  console.log('   - Enable Firestore Database');
  console.log('   - Enable Authentication with Phone provider');
  console.log('   - Generate a service account key');
  console.log('   - Update backend/.env with your Firebase credentials');
  console.log('');
  console.log('2. Get OpenAI API Key:');
  console.log('   - Sign up at https://platform.openai.com');
  console.log('   - Generate an API key');
  console.log('   - Add it to backend/.env');
  console.log('');
  console.log('3. Start the development server:');
  console.log('   cd backend && npm run dev');
  console.log('');
  console.log('4. Test the API:');
  console.log('   curl http://localhost:5000/health');
  console.log('');
  console.log('5. Set up the database:');
  console.log('   npm run db:setup');
  console.log('   npm run db:sample  # Optional: Create sample data');
  console.log('');
  console.log('📚 Documentation:');
  console.log('   - Backend API: backend/README.md');
  console.log('   - Database Schema: database/README.md');
  console.log('');
  console.log('🔗 API Endpoints:');
  console.log('   - Health Check: GET /health');
  console.log('   - Authentication: POST /auth/send-otp, POST /auth/verify-otp');
  console.log('   - Inventory: GET|POST|PUT|DELETE /api/inventory');
  console.log('   - Payments: GET|POST|PUT|DELETE /api/payments');
  console.log('   - Invoices: GET|POST|PUT /api/invoices');
  console.log('   - Dashboard: GET /api/dashboard/stats');
  console.log('   - Voice: POST /api/voice/process-command');
  console.log('   - WhatsApp: POST /api/whatsapp/chat');
};

const main = () => {
  try {
    checkNodeVersion();
    createDirectories();
    installDependencies();
    createEnvFile();
    createGitignore();
    createPackageScripts();
    displayNextSteps();
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
};

main();


