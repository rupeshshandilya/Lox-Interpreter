import fs from "fs";
import { KEYWORDS } from "./constants/keywords.js";

const args = process.argv.slice(2);

if (args.length < 2) {
  console.error("Usage: ./your_program.sh tokenize <filename>");
  process.exit(1);
}

const command = args[0];

if (command !== "tokenize") {
  console.error(`Usage: Unknown command: ${command}`);
  process.exit(1);
}

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.error("Logs from your program will appear here!");

const filename = args[1];

// Uncomment this block to pass the first stage

const fileContent = fs.readFileSync(filename, "utf8");
let hasErrors = false;
let comment = false;

if (fileContent.length !== 0) {
  let lines = fileContent.split("\n");
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      const char = lines[i][j];

      //For ignoring whitespace characters
      if (char === " " || char === "\t") {
        continue;
      }

      // Handle Identifiers & Keywords
      if (
        (char >= "a" && char <= "z") ||
        (char >= "A" && char <= "Z") ||
        char === "_"
      ) {
        const startingIndex = j;
        while (
          j < lines[i].length &&
          ((lines[i][j] >= "a" && lines[i][j] <= "z") ||
            (lines[i][j] >= "A" && lines[i][j] <= "Z") ||
            lines[i][j] === "_" ||
            (lines[i][j] >= "0" && lines[i][j] <= "9"))
        ) {
          j++;
        }
        const identifierString = lines[i].slice(startingIndex, j);
        j--;
        if (KEYWORDS.includes(identifierString)) {
          console.log(
            `${identifierString.toUpperCase()} ${identifierString} null`
          );
        } else {
          console.log(`IDENTIFIER ${identifierString} null`);
        }
        continue;
      }

      // For String
      if (char === '"') {
        let stringStart = j;
        let stringEnd = -1;

        // Find the closing quote
        for (let k = j + 1; k < lines[i].length; k++) {
          if (lines[i][k] === '"') {
            stringEnd = k;
            break;
          }
        }

        if (stringEnd !== -1) {
          // Valid string found

          // Include quotes
          const lexeme = lines[i].slice(stringStart, stringEnd + 1);
          // Exclude quotes
          const literal = lines[i].slice(stringStart + 1, stringEnd);

          console.log(`STRING ${lexeme} ${literal}`);
          // Skip to the closing quote
          j = stringEnd;
        } else {
          // Unterminated string
          console.error(`[line ${i + 1}] Error: Unterminated string.`);
          hasErrors = true;
          break;
        }
        continue;
      }

      //For Number Literals
      if (lines[i][j] >= "0" && lines[i][j] <= "9") {
        let numberString = "" + lines[i][j];
        let k = j + 1;
        // Compose the string literal searching for the end of the number (next char not a . or a numeric char)
        for (k; k < lines[i].length; k++) {
          if (lines[i][k] == "." || (lines[i][k] >= "0" && lines[i][k] <= "9"))
            numberString += lines[i][k];
          else break;
        }
        j = k - 1;
        // If the string is an int add the decimal point at the end
        let floatNumber = parseFloat(numberString);
        console.log(
          "NUMBER " +
            numberString +
            " " +
            (Number.isInteger(floatNumber) ? floatNumber + ".0" : floatNumber)
        );
        continue;
      }

      if (char === "=" && lines[i][j + 1] === "=") {
        console.log("EQUAL_EQUAL == null");
        j++;
      } else if (char === "!" && lines[i][j + 1] === "=") {
        console.log("BANG_EQUAL != null");
        j++;
      } else if (char === "<" && lines[i][j + 1] === "=") {
        console.log("LESS_EQUAL <= null");
        j++;
      } else if (char === ">" && lines[i][j + 1] === "=") {
        console.log("GREATER_EQUAL >= null");
        j++;
      } else if (char === "/" && lines[i][j + 1] === "/") {
        comment = true;
      } else {
        switch (char) {
          case "(":
            console.log("LEFT_PAREN ( null");
            break;
          case ")":
            console.log("RIGHT_PAREN ) null");
            break;
          case "{":
            console.log("LEFT_BRACE { null");
            break;
          case "}":
            console.log("RIGHT_BRACE } null");
            break;
          case ".":
            console.log("DOT . null");
            break;
          case ",":
            console.log("COMMA , null");
            break;
          case "+":
            console.log("PLUS + null");
            break;
          case "-":
            console.log("MINUS - null");
            break;
          case ";":
            console.log("SEMICOLON ; null");
            break;
          case "*":
            console.log("STAR * null");
            break;
          case "=":
            console.log("EQUAL = null");
            break;
          case "!":
            console.log("BANG ! null");
            break;
          case "<":
            console.log("LESS < null");
            break;
          case ">":
            console.log("GREATER > null");
            break;
          case "/":
            console.log("SLASH / null");
            break;
          default:
            console.error(
              `[line ${i + 1}] Error: Unexpected character: ${char}`
            );
            hasErrors = true;
            break;
        }
      }

      if (comment) {
        comment = false;
        break;
      }
    }
  }
  console.log("EOF  null");

  // Exit with code 65 if there were errors
  if (hasErrors) {
    process.exit(65);
  } else {
    process.exit(0);
  }
} else {
  console.log("EOF  null");
  process.exit(0);
}
