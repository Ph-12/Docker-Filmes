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
});


app.get('/health', async (_req, res) => {
        try {
                await pool.query('SELECT 1');
                res.json({ ok: true });
        } catch (e) {
                res.status(500).json({ ok: false, error: e.message });
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

app.listen(port, () => console.log(`API na porta ${port}`));
