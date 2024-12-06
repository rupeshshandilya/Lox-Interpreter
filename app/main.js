import fs from "fs";

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
        console.log("SLASH / null");
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
}
