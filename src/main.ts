import { Firebot } from "firebot-custom-scripts-types";

interface Params {
  message: string;
}

const script: Firebot.CustomScript<Params> = {
  getScriptManifest: () => {
    return {
      name: "$roundDecimal Variable",
      description: "Adds a $roundDecimal variable",
      author: "ebiggz",
      version: "1.0",
      firebotVersion: "5",
      startupOnly: true,
    };
  },
  getDefaultParameters: null,
  run: (runRequest) => {
    const { replaceVariableManager } = runRequest.modules;
    replaceVariableManager.registerReplaceVariable({
      definition: {
        handle: "roundDecimal",
        description: "Rounds the given number to the nearest whole number.",
        usage: "roundDecimal[num, decimalPlaces]",
        examples: [
          {
            usage: "roundDecimal[0.12345, 2]",
            description: "Round to two decimal places."
          }
        ],
        possibleDataOutput: ["number"],
      },
      evaluator: (_, number, decimalPlaces = 2) => {

        if (isNaN(number)) {
          return 0;
        }

        if (isNaN(decimalPlaces)) {
          return number;
        }

        return Number(number).toFixed(parseInt(decimalPlaces, 10));
      },
    });
  },
};

export default script;
