const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, MessageFlags, ActionRowBuilder   } = require ('discord.js');

const games = new Map();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('game')
        .setDescription('Starts a game of Tic-Tac-Toe'),


    async execute(interaction) {

        const gameId = interaction.user.id;

        const gameState = {
            board: Array(9).fill(null),
            currentPlayer: 'X',
            gameOver: false,
            winner: null
        }

        games.set(gameId, gameState)

        await interaction.reply({
            content: 'Tic-Tac-Toe!',
            components: createBoard(gameState.board, gameId),
            fetchReply: true
        });        
    }
}

function getStyle(cell) {
    switch(cell){
        case 'X': return ButtonStyle.Primary
        case 'O': return ButtonStyle.Danger
        default:  return ButtonStyle.Secondary
    }
}

function createBoard(board, gameId) {
    const rows = []

    for (let i = 0; i < 3; i++) {
        const row = new ActionRowBuilder();

        for (let j = 0; j < 3; j++) {
            const index = (3*i) + j;
            const cell = board[index]

            row.addComponents(
                new ButtonBuilder()
                    .setCustomId(`${gameId}_${index}`)
                    .setLabel(cell || '-')
                    .setStyle(getStyle(cell))
                    .setDisabled(cell !== null)
            )
        }
        rows.push(row)
    }

    return rows
}

function checkWinner(board) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagnols
    ];
    
    for (const pattern of winPatterns) {
        let [a, b, c] = pattern
        if (board[a]) {
            if (board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
    }    

    for (const cell of board) {
        if (cell === null) return null;
    }

    return 'draw'
}

function getBotMove(board) {
    
    const available = []
    for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
            available.push(i)
        }        
    }

    return available[Math.floor(Math.random() * available.length)]    
}

function getMessage(result) {
    switch (result) {
        case 'X': return "You won! Congrats!"
        case 'O': return "You lost! How? This thing plays randomly..."
        default: return "It's a draw!"
    }
}

async function handleGameOver(gameState, result, gameId, interaction)  {
    gameState.gameOver = true;
        
    const message = getMessage(result)

    const boardReply = createBoard(gameState.board, gameId)
        .map(row => {
            row.components.forEach(btn => btn.setDisabled(true))
            return row
        })

    await interaction.update({
        content: `Tic-Tac-Toe! ${message}`,
        components: boardReply
    })
    games.delete(gameId);
}

module.exports.handleButton = async (interaction)=> {
    const [ gameId, position ] = interaction.customId.split('_');
    const pos = parseInt(position)

    if (gameId !== interaction.user.id) {
        await interaction.reply({
            content: 'This is not your game!',
            flags: MessageFlags.Ephemeral
        })
        return;
    }

    const gameState = games.get(gameId);

    gameState.board[pos] = 'X';

    let result = checkWinner(gameState.board)

    if (result) {
        await handleGameOver(gameState, result, gameId, interaction)        
        return;
    }

    const botMove = getBotMove(gameState.board)
    gameState.board[botMove] = 'O';

    result = checkWinner(gameState.board)
    if (result) {
        await handleGameOver(gameState, result, gameId, interaction)        
        return;
    }

    await interaction.update({
        content: 'Tic-Tac-Toe! Your turn!',
        components: createBoard(gameState.board, gameId)
    })
}