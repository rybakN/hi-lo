import readline from "node:readline/promises";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const askQuestion = async (
  query: string,
  validator: Function,
): Promise<any> => {
  const answer = await rl.question(query);
  if (validator(answer)) {
    return answer;
  } else {
    console.log("Неверный ввод. Пожалуйста, попробуйте снова.");
    return await askQuestion(query, validator);
  }
};
