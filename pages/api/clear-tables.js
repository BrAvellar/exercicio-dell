import Database from "better-sqlite3";

export default function handler(req, res) {
  try {
    const db = new Database('./raffle.db', { verbose: console.log });

    // Limpar o conteúdo das tabelas existentes
    db.prepare("DELETE FROM bets").run();
    db.prepare("DELETE FROM user_bets").run();

    // Verifica se as tabelas existem após a limpeza
    const betsExists = db.prepare("SELECT count(name) AS count FROM sqlite_master WHERE type='table' AND name='bets'").get();
    const userBetsExists = db.prepare("SELECT count(name) AS count FROM sqlite_master WHERE type='table' AND name='user_bets'").get();

    db.prepare("INSERT INTO bets (cpf, name, numbers, register) VALUES ('', '', '', 999)").run();

    if (betsExists.count > 0 && userBetsExists.count > 0) {
      // As tabelas existem e foram limpas
      res.status(200).json({ message: "Conteúdo das tabelas 'bets' e 'user_bets' limpo com sucesso." });
    } else {
      // Caso as tabelas não existam, você pode optar por criar as tabelas aqui, ou simplesmente retornar uma mensagem
      res.status(200).json({ message: "Tabelas não encontradas. O banco de dados está vazio ou as tabelas não existem." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ocorreu um erro ao limpar o conteúdo do banco de dados." });
  }
}
