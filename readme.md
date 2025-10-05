# Projeto de teste para Docker na VPS

<pre>
#Script de Banco de dados: Postgres para uso de exemplo
CREATE TABLE filmes (
id SERIAL PRIMARY KEY, -- Identificador único do filme
titulo VARCHAR(255) NOT NULL, -- Título do filme
diretor VARCHAR(255), -- Nome do diretor do filme
ano INT, -- Ano de lançamento do filme
genero VARCHAR(100), -- Gênero do filme (ex: Aventura, Drama, etc.)
duracao INT, -- Duração do filme em minutos
descricao TEXT -- Descrição ou sinopse do filme
);
</pre>
<pre>
CREATE TABLE series (
id SERIAL PRIMARY KEY, -- Identificador único da série
titulo VARCHAR(255) NOT NULL, -- Título da série
diretor VARCHAR(255), -- Nome do diretor da série
ano_inicio INT, -- Ano de início da série
ano_fim INT, -- Ano de término da série (pode ser NULL se a série ainda estiver no ar)
genero VARCHAR(100), -- Gênero da série (ex: Suspense, Ação, etc.)
numero_temporadas INT, -- Número de temporadas da série
descricao TEXT -- Descrição ou sinopse da série
);
</pre>
<pre>
CREATE TABLE musica (
id SERIAL PRIMARY KEY, -- Identificador único da música
titulo VARCHAR(255) NOT NULL, -- Título da música
artista VARCHAR(255), -- Nome do artista ou banda
ano_lancamento INT, -- Ano de lançamento da música
genero VARCHAR(100), -- Gênero musical (ex: Rock, Pop, etc.)
duracao INT, -- Duração da música em segundos
album VARCHAR(255), -- Nome do álbum onde a música foi lançada
descricao TEXT -- Descrição ou comentários adicionais sobre a música
);
</pre>
<pre>
INSERT INTO filmes (titulo, diretor, ano, genero, duracao, descricao) VALUES
('O Senhor dos Anéis: A Sociedade do Anel', 'Peter Jackson', 2001, 'Aventura', 178, 'A jornada épica de um hobbit e seus amigos para destruir o anel do poder e salvar a Terra-Média.'),
('Matrix', 'Lana Wachowski, Lilly Wachowski', 1999, 'Ficção Científica', 136, 'Um hacker descobre que a realidade em que vive é uma simulação criada por máquinas.'),
('A Origem', 'Christopher Nolan', 2010, 'Aventura', 148, 'Um ladrão especializado em invadir os sonhos das pessoas é contratado para realizar o maior golpe de sua carreira.')
;
</pre>
<pre>
INSERT INTO series (titulo, diretor, ano_inicio, ano_fim, genero, numero_temporadas, descricao) VALUES
('Breaking Bad', 'Vince Gilligan', 2008, 2013, 'Crime', 5, 'A história de um professor de química que se transforma em um fabricante de metanfetamina para garantir o futuro financeiro de sua família.'),
('Stranger Things', 'The Duffer Brothers', 2016, NULL, 'Suspense', 4, 'Um grupo de crianças tenta resgatar seu amigo desaparecido e enfrenta fenômenos paranormais em sua pequena cidade.'),
('Game of Thrones', 'David Benioff, D.B. Weiss', 2011, 2019, 'Fantasia', 8, 'Lutas pelo poder entre casas nobres em um reino fictício com dragões, magia e traições.')
;
</pre>
<pre>
INSERT INTO musica (titulo, artista, ano_lancamento, genero, duracao, album, descricao) VALUES
('Bohemian Rhapsody', 'Queen', 1975, 'Rock', 354, 'A Night at the Opera', 'Uma das músicas mais icônicas da história do rock, famosa por sua estrutura incomum e poder vocal.'),
('Shape of You', 'Ed Sheeran', 2017, 'Pop', 233, 'Divide', 'Uma das músicas mais populares do Ed Sheeran, com um ritmo envolvente e letra sobre amor e relacionamentos.'),
('Imagine', 'John Lennon', 1971, 'Rock', 183, 'Imagine', 'Uma música que transmite uma mensagem de paz e esperança, imaginando um mundo sem divisões.')
;
</pre>
<p> Select teste</p>
<pre>
SELECT \* FROM series WHERE titulo = 'Breaking Bad';
</pre>

# Os arquivos .env devem ser criado.
#exemplo de variaveis de ambiente
### .env
<pre>
PGHOST=127.0.0.1 # IP localhost
PGPORT=5432
PGUSER=postgres
PGPASSWORD=xxxx
PGDATABASE=postgres
</pre>
### .env.dev
<pre>
PGHOST=xxx.xxx.xxx.xxx # IP da VPS
PGPORT=5432
PGUSER=postgres
PGPASSWORD=xxxx
PGDATABASE=postgres
</pre>

# Comando yarn install
<code>yarn install</code>
### Desenvolvimento
<code>yarn dev</code>
### Produção
<code>yarn start</code>

# Comandos docker
### Desenvolvimento
<code>docker-compose --env-file .env.dev up --build</code>
### Produção
<code>docker compose up --build</code>

# 📁 Estrutura do Projeto
<pre>
projeto/
├── .env # Variáveis de ambiente produção
├── .env.dev # Variáveis de ambiente desenvolvimento
├── docker-compose.yml
├── Dockerfile
├── package.json
└── app.js # Código da aplicação
</pre>