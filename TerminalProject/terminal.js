const app = document.querySelector("#app");

function createDelay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

const getYear = () => {
  return new Date().getFullYear();
};

function removeInput() {
  const div = document.querySelector(".type");
  app.removeChild(div);
}

app.addEventListener("keypress", async function (event) {
  if (event.key === "Enter") {
    createDelay(150);

    getCommand();

    removeInput();

    createDelay(150);
  }
});

app.addEventListener("click", function (event) {
  const input = document.querySelector("input");
  input.focus();
});

async function getName() {
  // Clear the local storage
  localStorage.clear();

  let userName;
  do {
    clearTerminal();
    createText("Enter a name (minimum 2 characters):");

    // Create a new element to hold the input field
    const div = document.createElement("div");
    div.setAttribute("class", "type");

    // Create the input field
    const input = document.createElement("input");
    input.setAttribute("class", "input");
    div.appendChild(input);
    app.appendChild(div);

    // Focus the input field
    input.focus();

    // Wait for the user to enter their name and press "Enter"
    await new Promise((resolve) => {
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          // Get the value of the input field
          userName = document.querySelector("input").value;
          // Resolve the promise
          resolve();
        }
      });
    });
  } while (userName.length < 2);
  // Set name in local storage
  localStorage.setItem("name", JSON.stringify(userName));
}

function displayPDF() {
  // Set the URL of the PDF file
  const pdfUrl = "../Resources/learning-outcome.pdf";

  // Open a new window
  const newWindow = window.open("");

  // Set the URL of the new window to the PDF file
  newWindow.location.href = pdfUrl;
}

function createText(text) {
  const p = document.createElement("p");
  p.innerHTML = text;
  app.appendChild(p);
}

function createCode(code, text) {
  // function body
  const p = document.createElement("p");
  p.setAttribute("class", "code");
  p.innerHTML = `${code} <br/> <span class='text'> ${text} </span>`;
  app.appendChild(p);
}

function listCommands() {
  createCode("-y", "what this site is and why I made it");
  createCode("all", "see all commands.");
  createCode("brief", "functionality and learning outcomes");
  createCode("-ls", "check what is included in this site");
  createCode("clear", "clear terminal\n");
}

async function runTerminal() {
  // Prompt the user for their name and store it in local storage
  await getName();
  const name = JSON.parse(localStorage.getItem("name"));
  removeInput();
  clearTerminal();

  createText(`Welcome to my ePortfolio, ${name}`);

  playTerminalSound();
  await createDelay(750);
  createText("Configuring...");
  await createDelay(1400);
  createText("You can run several commands:");

  listCommands();

  createDelay(500);
  newLine();
}

function playTerminalSound() {
  // Create a new Audio object.
  const audio = new Audio("../terminalSound.mp3");

  // Set the 'currentTime' property to 3 seconds.
  audio.currentTime = 3;

  // Play the audio.
  audio.play();

  // Pause the audio after 3 seconds.
  setTimeout(function () {
    audio.pause();
  }, 3250);
}

function clearTerminal() {
  document.querySelectorAll("p").forEach((e) => e.remove());
  document.querySelectorAll("section").forEach((e) => e.remove());
}

function newLine() {
  // Create the elements
  const p = document.createElement("p");
  const span1 = document.createElement("span");
  const span2 = document.createElement("span");

  p.setAttribute("class", "path");

  // Get the name from the local storage
  const name = localStorage.getItem("name");

  // Set the text content of the p element
  if (name) {
    p.textContent = `# User ${name}`;
  } else {
    p.textContent = "# Visitor";
  }

  span1.textContent = " on ";
  span2.textContent = " ~/EzLeezy";

  // Append the elements to the p element
  p.appendChild(span1);
  p.appendChild(span2);

  // Append the p element to the app element
  app.appendChild(p);

  // Create the input field
  const div = document.createElement("div");
  div.setAttribute("class", "type");
  const input = document.createElement("input");
  div.appendChild(input);
  app.appendChild(div);
  input.focus();
}

// function openSite() {
//   // Open the home.html page in a new tab
//   window.open("home.html", "_blank");
// }

async function getCommand() {
  const command = document.querySelector("input").value;

  switch (command) {
    case "-y":
      createText(
        "This terminal site is a personal project that I created\n as a way to showcase my skills and experience as a student.\n"
      );
      createText("It serves as a gateway to my CV and portfolio site");
      createText(
        "I enjoy tackling difficult challenges and constantly striving to improve my skills. This site reflects my passion for learning and self-improvement."
      );
      newLine();
      break;
    case "all":
      displayCommandSuccess(command);
      listCommands();
      newLine();
      break;

    case "brief":
      displayCommandSuccess(command);
      displayPDF();
      createText("brief opened!");
      newLine();
      break;

    case "clear":
      document.querySelectorAll("p").forEach((e) => e.remove());
      document.querySelectorAll("section").forEach((e) => e.remove());
      newLine();
      break;

    case "-ls":
      displayCommandSuccess(command);
      createText("This site includes: ");
      createText("An origin story...");
      createText("A functional terminal used for navigation");
      createText("A PDF brief displaying what is implemented within");

      createText("");
      createText(
        "GitHub Link: <a href='https://github.com/EzLeezy' target='_blank'> 💻 </a> \n"
      );

      createText(
        "LinkedIn Link: <a href='https://www.linkedin.com/in/mrleecampbell/' target='_blank'>  💼 </a> \n"
      );
      newLine();
      break;

    default:
      displayCommandError(command);
      createText(`command not found: ${command}`);
      newLine();
  }
}

function displayCommandSuccess(command) {
  // Create a new 'section' element and set its class to 'type2'.
  const container = document.createElement("section");
  container.setAttribute("class", "type2");

  // Create a new 'h2' element and set its class to 'success'.
  const message = document.createElement("h2");
  message.setAttribute("class", "success");

  // Set the text content of the 'h2' element to the command that was successfully executed.
  message.textContent = `${command}`;

  // Append the 'h2' element to the 'section' element.
  container.appendChild(message);

  // Append the 'section' element to the DOM.
  app.appendChild(container);
}

function displayCommandError(command) {
  // Create a new 'section' element and set its class to 'type2'.
  const container = document.createElement("section");
  container.setAttribute("class", "type2");

  // Create a new 'h2' element and set its class to 'error'.
  const message = document.createElement("h2");
  message.setAttribute("class", "error");

  // Set the text content of the 'h2' element to the command that was not found.
  message.textContent = `${command}`;

  // Append the 'h2' element to the 'section' element.
  container.appendChild(message);

  // Append the 'section' element to the DOM.
  app.appendChild(container);
}

runTerminal();
