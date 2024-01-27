import openai from "./opn-ai.js";
import readlineSync from 'readline-sync';
import colors from 'colors';

async function main(){
        console.log(colors.bold.green('Welcome to the Chatbot!'));
        console.log(colors.bold.green('Start chatting with the bot'));

        const chatHistory = []; //Keeps conversation history

        while (true) {
                const userInput = readlineSync.question(colors.yellow('you: '));

                try{
                        //construct messages by iterating over the history
                        const messages = chatHistory.map(([role, content]) => ({role, content}));

                        //add user input to array
                        messages.push({role: 'user', message: userInput});

                        // Call the Api using user input

                        const completion = await openai.chat.completions.create({
                                // userinput as the content
                                messages: [{role: 'user', content: messages }],
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

                        //Adding bot response to history
                        chatHistory.push(['user', userInput]);
                        chatHistory.push(['bot', conpletionText]);

                } catch (error){
                        console.error(colors.red(error));
                }
        }

}

main();