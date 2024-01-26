import openai from "./opn-ai.js";
import readlineSync from 'readline-sync';
import colors from 'colors';

async function main(){
        console.log(colors.bold.green('Welcome to the Chatbot!'));
        console.log(colors.bold.green('Start chatting with the bot'));

        while (true) {
                const userInput = readlineSync.question(colors.yellow('you: '));

                try{
                // Call the Api using user input

                const completion = await openai.chat.completions.create({
                        // userinput as the content
                        messages: [{role: 'user', content: userInput }],
                        model: 'gpt-3.5-turbo',
                });

                // Get response:

                const conpletionText = completion.choices[0].message.content;

                //exit case
                if(userInput.toLowerCase() === 'exit'){
                        console.log(colors.green('Bot: ' + conpletionText));
                        return;
                }

                console.log(colors.green('Bot: ' + conpletionText));

                } catch (error){
                        console.error(colors.red(error));
                }
        }

}

main();