import OpenAI from 'openai';
import dotenv from 'dotenv';

//getting .env stuff
dotenv.config();


const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY // This is also the default, can be omitted
});

async function main(){
        const chatCompletion = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages:[{role: 'user', content: 'What is the capital of Australia'}],
        });
        console.log(chatCompletion.choices[0].message.content);
}

main();