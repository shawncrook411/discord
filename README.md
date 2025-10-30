# Discord Bot Project

A basic Discord bot built with JavaScript using the discord.js 
## Purpose

The purpose of this project is to explore other applications of JavaScript, as well as to get some experience with creating a "shell."

## Setup

1. Install dependencies:
```bash
npm install 
```

2. Create a `.env` file in the root directory:
```
token=YOUR_BOT_TOKEN
client_id=YOUR_CLIENT_ID
guild_id=YOUR_GUILD_ID
```

3. Deploy the commands to Discord:
```bash
node deploy-commands.js
```

4. Start the bot:
```bash
node index.js
```

## Commands

- `/help` - Displays all available commands
- `/lorem` - Shows lorem ipsum text (stored in lorem.txt)
- `/roll` - Roll a virtual die (choose d4, d6, d8, d10, or d20)
- `/game` - Play an interactive tic-tac-toe game against the bot
- `/die` - Shuts down the bot

## More Commands

More command could be created - Simply add the files to the commands/utility/ directory

From there, update the string in 'commandsList.js' to add the name of the file to automatically be process when the bot goes live, or when deploy-commands is ran