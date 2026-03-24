/**
 * Run blog_posts migration against Supabase
 * Usage: node scripts/run-blog-migration.js
 *
 * Requires SUPABASE_DB_URL or NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in .env
 */

const fs = require('fs');
const path = require('path');

// Load .env manually
const envFile = fs.readFileSync(path.join(__dirname, '..', '.env'), 'utf-8');
const envVars = {};
for (const line of envFile.split('\n')) {
  const match = line.match(/^([A-Z_]+)=(.*)$/);
  if (match) {
    envVars[match[1]] = match[2].trim().replace(/^"|"$/g, '');
  }
}

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function createTableViaRPC() {
  // Read the SQL file
  const sqlFile = fs.readFileSync(
    path.join(__dirname, '..', 'supabase', 'migrations', '20260215_create_blog_posts.sql'),
    'utf-8'
  );

  // Split into separate statements
  const statements = sqlFile
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));

  console.log(`Found ${statements.length} SQL statements to execute`);
  console.log('Supabase URL:', supabaseUrl);
  console.log('');
  console.log('NOTE: This script cannot run DDL (CREATE TABLE) directly via the REST API.');
  console.log('');
  console.log('Please run the following SQL in the Supabase Dashboard SQL Editor:');
  console.log('Dashboard URL: ' + supabaseUrl.replace('.supabase.co', '.supabase.co/project/default/sql'));
  console.log('');
  console.log('--- COPY SQL BELOW ---');
  console.log(sqlFile);
  console.log('--- END SQL ---');
}

createTableViaRPC();
