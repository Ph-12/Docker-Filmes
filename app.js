// Carrega variáveis de ambiente APENAS se não estiver em produção.
// Em produção (NODE_ENV=production), assumimos que as variáveis já
// vêm do ambiente (PM2, Docker, etc.).
if (process.env.NODE_ENV !== 'production') {
        const path = process.env.DOTENV_CONFIG_PATH || '.env';
        console.log(`Carregando variáveis de ambiente do arquivo: ${path}`);
        require('dotenv').config({ path });
}

const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Logs úteis para debug (não mostra senha)
console.log('PGHOST:', process.env.PGHOST);
console.log('PGPORT:', process.env.PGPORT);

// Configuração da conexão ao banco de dados
const pool = new Pool({
        host: process.env.PGHOST,
        port: Number(process.env.PGPORT || 5432),
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        connectionTimeoutMillis: 2000,
        idleTimeoutMillis: 10000,
});

// Healthcheck da API
app.get('/health', (_req, res) => {
        res.json({ ok: true, uptime: process.uptime() });
});

// Healthcheck do banco
app.get('/dbhealth', async (_req, res) => {
        try {
                await pool.query('SELECT 1');
                res.json({ db: true });
        } catch (e) {
                res.status(500).json({ db: false, error: e.message });
        }
});

// Endpoint de exemplo
app.get('/filmes', async (_req, res) => {
        try {
                const r = await pool.query('SELECT * FROM filmes ORDER BY id');
                res.json(r.rows);
        } catch (e) {
                console.error(e);
                res.status(500).json({ error: 'Erro ao consultar filmes' });
        }
});

app.listen(port, '0.0.0.0', () => console.log(`API na porta ${port}`));