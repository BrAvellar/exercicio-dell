import Database from "better-sqlite3";

export default function handler(req, res) {
  try {
    const db = new Database('./raffle.db', { verbose: console.log });
    
    db.prepare("DROP TABLE IF EXISTS bets").run();
    db.prepare("DROP TABLE IF EXISTS user_bets").run();
    
    const tableExists = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='bets'").get();
    if (!tableExists) {
      db.prepare(`
        CREATE TABLE bets (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          cpf VARCHAR(255) NOT NULL,
          name VARCHAR(255) NOT NULL,
          numbers VARCHAR(255) NOT NULL,
          register INTEGER NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `).run();

      // Iniciar o valor de 'registro' com 1000 para a primeira inserção
      db.prepare("INSERT INTO bets (cpf, name, numbers, register) VALUES ('', '', '', 999)").run();

      res.status(200).json({ message: "Tabela 'bets' criada com sucesso." });
    } else {
      res.status(200).json({ message: "A tabela 'bets' já existe." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ocorreu um erro ao configurar o banco de dados." });
  }
}

