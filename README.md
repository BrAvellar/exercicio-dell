# Informações
Autor: Bruno Sanvito Andreazza de Avellar
Data: 21/03/2023

# Escopo do projeto
Este é um projeto desenvolvido para o processo seletivo da empresa Dell. Este consiste em uma mega-sena onde um usuário pode fazer apostas a partir de números escolhidos por ele ou gerados aleatóriamente. O sorteio em sí é separado em duas etapas. A primeira sendo a fase de apostas onde o usuário pode fazer quantas apostas quiser e vizualizar todas apostas existentes no momento. Esta etapa termina quando o timer presente na tela chega ao fim, assim inicia-se a segunda etapa do sorteio. Esta onde o usuário pode ver as apostas realizadas por ele, os números sorteados e informações da rodada atual, como ganhadores quantidade de sorteio de números e estatísticas de números mais apostados ordenados por frequência. Este programa é repleto de validaçoes e verificações para garantir que o usuário não faça apostas inválidas e que o sorteio seja justo. Além disso, o programa é feito em next.js utilizando para o banco de dados SQLite, a biblioteca de componentes Shadcn/ui e o framework Tailwind CSS.

# Instalar as dependências
    Windows

	1.	Instalar Node.js e npm
	    •	Baixe o instalador do Node.js para Windows em https://nodejs.org/.
	    •	Execute o instalador e siga as instruções. Isso instalará tanto o Node.js quanto o npm no seu sistema.

	2.	Instalar pnpm
	    •	Abra o CMD (Prompt de Comando) e execute o seguinte comando:

        npm install -g pnpm

    Com a pasta project aberta no terminal, execute os seguintes comandos:

    3. Instalar dependência 
        pnpm i
        e
        npm i
    
    4. Instalar SQLite (Se necessário)
        npm install better-sqlite3

    MacOs

    1.	Instalar Node.js e npm
	    •	A maneira mais fácil é usar o Homebrew, um gerenciador de pacotes para macOS. Se você não tem o Homebrew instalado, pode instalá-lo abrindo o Terminal e executando:

        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

	    •	Após a instalação do Homebrew, instale o Node.js (e npm) usando:

        brew install node

	    •	Isso instalará tanto o Node.js quanto o npm.

	2.	Instalar pnpm
	    •	No Terminal, execute o seguinte comando:

        npm install -g pnpm

    Com a pasta project aberta no terminal, execute os seguintes comandos:

    3. Instalar dependência 
        pnpm i
        e
        npm i
    
    4. Instalar SQLite (Se necessário)
        npm install better-sqlite3

# Como rodar o projeto
    Para rodar o projeto, basta executar o comando:
    pnpm dev
    Ou
    npm run dev

# Em necessidade de mudança para testes
    Tempo do cronômetro:
    - cntrl + shift + f 
    - Procurar por "Fase de aposta" ou "Fase de sorteio" 
    - Alterar o valor de duration para o desejado.
    OU
    - Acessar o arquivo -> src/components/NumbersContainer/numbersContainer.jsx

    Números sorteados
    - cntrl + shift + f 
    - Procurar por "Vitória Forjada" OU acesse o arquivo -> src/hooks/useRaffle.js
    - Terá duas aparições nestas remova o comentário de ambas e atribua comente a linha superior a ela ( // Aleatório )

    Exemplo: 
    // Variável de estado para armazenar os números sorteados
    const [winningNumbers, setWinningNumbers] = useState([]); // Aleatório
    // const [winningNumbers, setWinningNumbers] = useState([1,2,3,4,5]); // Vitória Forjada

    > Dessa forma: 
    // Variável de estado para armazenar os números sorteados
    // const [winningNumbers, setWinningNumbers] = useState([]); // Aleatório
    const [winningNumbers, setWinningNumbers] = useState([1,2,3,4,5]); // Vitória Forjada
