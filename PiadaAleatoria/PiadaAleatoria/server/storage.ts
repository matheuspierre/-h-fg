import { type Piada } from "@shared/schema";

export interface IStorage {
  getRandomPiada(): Piada;
}

export class MemStorage implements IStorage {
  private piadas: string[] = [
    "Por que o livro de matemática ficou triste? Porque tinha muitos problemas.",
    "O que a Lua disse ao Sol? – Nossa, você é tão grande e ainda não te deixam sair à noite!",
    "Por que o computador foi ao médico? Porque estava com vírus!",
    "O que o pato disse para a pata? Vem Quá!",
    "Por que a galinha atravessou a rua? Para chegar do outro lado!",
    "O que o zero disse para o oito? Que cinto maneiro!",
    "Como o elefante se esconde na floresta? Ele pinta as unhas de vermelho e sobe numa árvore de cereja.",
    "Por que o esqueleto não lutou? Porque não tinha estômago para isso!",
    "O que o pinto disse para a pinta? Pinto ou pinta?",
    "Por que a formiga foi ao cinema? Para assistir Formiga Z!",
    "O que o papel higiênico disse para o outro? Estamos numa situação... bem delicada!",
    "Como você chama um jacaré com um GPS? Um navi-gator!",
    "Por que o desenvolvedor saiu do chuveiro frio? Porque esqueceu de aquecer o código!",
    "O que uma impressora disse para a outra? Essa folha é sua ou é impressão minha?"
  ];

  getRandomPiada(): Piada {
    const randomIndex = Math.floor(Math.random() * this.piadas.length);
    return {
      piada: this.piadas[randomIndex]
    };
  }
}

export const storage = new MemStorage();
