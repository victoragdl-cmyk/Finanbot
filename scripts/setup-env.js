const { existsSync, copyFileSync } = require('fs');
const { join } = require('path');

const projectRoot = join(__dirname, '..');
const backendEnvExample = join(projectRoot, 'backend', 'env.example');
const backendEnv = join(projectRoot, 'backend', '.env');

try {
  if (!existsSync(backendEnvExample)) {
    console.warn('⚠️  Arquivo backend/env.example não encontrado. Pule a cópia automática.');
  } else if (existsSync(backendEnv)) {
    console.log('ℹ️  backend/.env já existe. Nenhum arquivo foi sobrescrito.');
  } else {
    copyFileSync(backendEnvExample, backendEnv);
    console.log('✅ Criado backend/.env a partir de backend/env.example.');
  }

  console.log('\nRevise backend/.env antes de iniciar o ambiente de desenvolvimento:');
  console.log('- Configure DATABASE_URL com as credenciais do seu PostgreSQL.');
  console.log('- Defina JWT_ACCESS_SECRET e JWT_REFRESH_SECRET com valores fortes e únicos.');
  console.log('- Preencha as chaves OPENAI_API_KEY e variáveis OPEN_FINANCE_* conforme integrações necessárias.');
  console.log('\nDepois de revisar as variáveis, execute `npm run dev` para iniciar o projeto.');
} catch (error) {
  console.error('❌ Erro ao preparar backend/.env:', error);
  process.exitCode = 1;
}
