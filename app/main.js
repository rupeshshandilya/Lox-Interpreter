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

if (fileContent.length !== 0) {
  const lines = fileContent.split("/n");
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines.length; j++) {
      const char = lines[j];
      switch (char) {
        case "(":
          console.log("LEFT_PAREN ( null");
          break;
        case ")":
          console.log("RIGHT_PAREN ) null");
          break;
      }
    }
  }
  console.log('EOF  null');
} else {
  console.log("EOF  null");
}
