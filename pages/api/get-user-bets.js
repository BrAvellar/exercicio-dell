import Database from 'better-sqlite3';

export default function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const db = new Database('./raffle.db', { verbose: console.log });
      const todos = db.prepare('SELECT * FROM user_bets').all();

      db.close(); // É uma boa prática fechar a conexão com o banco de dados quando terminar.
      
      res.status(200).json(todos);
    } catch (error) {
      console.error("Erro ao acessar o banco de dados:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
