import Database from "better-sqlite3";

export default async function handler(req, res) {

    const db = new Database('./raffle.db', { verbose: console.log });

  if (req.method === 'POST') {
    try {

      const db = new Database('./raffle.db', { verbose: console.log });
      
      const tableExists = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='user_bets'").get();
      if (!tableExists) {
        db.prepare(`
          CREATE TABLE user_bets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cpf VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            numbers VARCHAR(255) NOT NULL,
            register INTEGER NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `).run();
      }
      
        // Extrai cpf, nome e o objeto numbers da requisição
        const { cpf, name, numbers } = req.body;

        const validaCpf = (cpf) => {
            if (cpf.length !== 11) {
                return false;
            }

            let soma = 0;
            let resto;

            for (let i=1; i<=9; i++) soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
            resto = (soma * 10) % 11;

            if ((resto === 10) || (resto === 11)) resto = 0;
            if (resto !== parseInt(cpf.substring(9, 10))) return false;

            soma = 0;
            for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
            resto = (soma * 10) % 11;

            if ((resto === 10) || (resto === 11))  resto = 0;
            if (resto !== parseInt(cpf.substring(10, 11))) return false;

            return true;
        }

        if (!name || !cpf || !numbers) {
            return res.status(400).json({ message: "Dados de name e cpf são obrigatórios." });
          }
        if(!validaCpf(cpf)) {
            return res.status(400).json({ message: "CPF inválido." });
        }

        const maxRegisterResult = db.prepare("SELECT MAX(register) AS maxRegister FROM bets").get();
        let nextRegister = 1000; // valor inicial
        
        if (maxRegisterResult.maxRegister) {
          nextRegister = maxRegisterResult.maxRegister + 1;
        }

        const insert = db.prepare("INSERT INTO bets (cpf, name, numbers, register) VALUES (?, ?, ?, ?)");
        insert.run(cpf, name, JSON.stringify(numbers), nextRegister);

        const insertUserBets = db.prepare("INSERT INTO user_bets (cpf, name, numbers, register) VALUES (?, ?, ?, ?)");
        insertUserBets.run(cpf, name, JSON.stringify(numbers), nextRegister);

        res.status(200).json({ message: "Nova aposta adicionada com sucesso." });
    } catch (error) {
        console.error("Erro ao inserir nova aposta:", error);
        res.status(500).json({ message: "Ocorreu um erro ao tentar criar uma nova aposta." });
    }
  } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

