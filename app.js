require('dotenv').config();  // Carrega as variáveis de ambiente
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

console.log("PGHOST:", process.env.PGHOST);
console.log("PGPORT:", process.env.PGPORT);

// Configuração da conexão ao banco de dados
const pool = new Pool({
        host: process.env.PGHOST,
        port: Number(process.env.PGPORT || 5432),
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        connectionTimeoutMillis: 2000,
        idleTimeoutMillis: 10000
});


app.get('/health', (_req, res) => {
        res.json({ ok: true, uptime: process.uptime() });
});

// DB health (verifica conexão)
app.get('/dbhealth', async (_req, res) => {
        try {
                await pool.query('SELECT 1');
                res.json({ db: true });
        } catch (e) {
                res.status(500).json({ db: false, error: e.message });
        }
});

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
