const player1 = {
  NOME: "Mario",
  VELOCIDADE: 4,
  MANOBRABILIDADE: 3,
  PODER: 3,
  PONTOS: 0,
};

const player2 = {
  NOME: "luigi",
  VELOCIDADE: 3,
  MANOBRABILIDADE: 4,
  PODER: 4,
  PONTOS: 0,
};
const player3 = {
  NOME: "yoshi",
  VELOCIDADE: 2,
  MANOBRABILIDADE: 4,
  PODER: 3,
  PONTOS: 0,
};
const player4 = {
  NOME: "toad",
  VELOCIDADE: 2,
  MANOBRABILIDADE: 2,
  PODER: 5,
  PONTOS: 0,
};
const player5 = {
  NOME: "Peach",
  VELOCIDADE: 3,
  MANOBRABILIDADE: 4,
  PODER: 2,
  PONTOS: 0,
};
const player6 = {
  NOME: "Bowser",
  VELOCIDADE: 5,
  MANOBRABILIDADE: 2,
  PODER: 5,
  PONTOS: 0,
};
async function rollDice() {
  // funcao asincrona
  return Math.floor(Math.random() * 6) + 1;
}
async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;

    default:
      result = "CONFRONTO";
  }
  return result;
}
async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
      diceResult + attribute
    }`
  );
}
async function playRaceEngine(character1, character2) {
  // vamos usar laco de repeticao para percorrer os rouds
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁Rodada ${round}`);
    // sortear bloco
    let block = await getRandomBlock();
    console.log(`BLOCO: ${block}`);

    // rolar os dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    // teste de habilidades
    let TotaltesteSkill1 = 0;
    let TotaltesteSkill2 = 0;

    if (block === "RETA") {
      TotaltesteSkill1 = diceResult1 + character1.VELOCIDADE;
      TotaltesteSkill2 = diceResult2 + character2.VELOCIDADE;

      await logRollResult(
        character1.NOME,
        "velocidade",
        diceResult1,
        character1.VELOCIDADE
      );

      await logRollResult(
        character2.NOME,
        "velocidade",
        diceResult2,
        character2.VELOCIDADE
      );
    }
    if (block === "CURVA") {
      TotaltesteSkill1 = diceResult1 + character1.MANOBRABILIDADE;
      TotaltesteSkill2 = diceResult2 + character2.MANOBRABILIDADE;

      await logRollResult(
        character1.NOME,
        "manobrabilidade",
        diceResult1,
        character1.MANOBRABILIDADE
      );

      await logRollResult(
        character2.NOME,
        "manobrabilidade",
        diceResult2,
        character2.MANOBRABILIDADE
      );
    }
    if (block === "CONFRONTO") {
      let powerResult1 = diceResult1 + character1.PODER;
      let powerResult2 = diceResult2 + character2.PODER;
      console.log(`${character1.NOME} confrontou com ${character2.NOME}!🥊`);

      await logRollResult(
        character1.NOME,
        "poder",
        diceResult1,
        character1.PODER
      );

      await logRollResult(
        character2.NOME,
        "poder",
        diceResult2,
        character2.PODER
      );

      if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
        console.log(
          `${character1.NOME} venceu o confronto ${character2.NOME} perdeu um ponto 🐢`
        );
        character2.PONTOS--;
      }
      // if ternario
      if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
        console.log(
          `${character2.NOME} venceu o confronto ${character1.NOME} perdeu um ponto 🐢`
        );
        character1.PONTOS--;
      }

      console.log(
        powerResult2 === powerResult1
          ? "Embate empatado! Nenhum ponto perdido"
          : ""
      );
    }

    // Verificando vencedor
    if (TotaltesteSkill1 > TotaltesteSkill2) {
      console.log(`${character1.NOME}, marcou um ponto!`);
      character1.PONTOS++;
    } else if (TotaltesteSkill2 > TotaltesteSkill1) {
      console.log(`${character2.NOME} marcou um ponto!`);
      character2.PONTOS++;
    }
    console.log("-----------------");
  }
}
async function declareWinner(character1, character2) {
  console.log("Resultado final");
  console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
  console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

  if (character1.PONTOS > character2.PONTOS) {
    console.log(
      `\n ${character1.NOME}:venceu a corrida! congratulations 🏁🏆🎉 `
    );
  } else if (character2.PONTOS > character1.PONTOS) {
    console.log(
      `\n ${character2.NOME}: venceu a corrida! congratulations 🏁🏆🎉`
    );
  } else {
    console.log(" A corrida terminou em empate");
  }
}
(async function main() {
  // funcao auto invocavel
  console.log(
    `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} comecando ...\n`
  );
  await playRaceEngine(player1, player2); // usando o await para esperar a acao do playraceengine execultar antes de fazer qualaquer outros comando, nessa linha, tambem estamos chamadno uma funcao dentro da outra, dentro do corpo main
  await declareWinner(player1, player2);
})();
