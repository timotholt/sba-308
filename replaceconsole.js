//============================================================================
// Hook the console log function so we can show results on the HTML page
//
// This allows us to write the console out to the HTML!
//============================================================================

console.stdlog = console.log.bind(console);
console.logs = [];
let entireConsoleLog = '';

const consoleDiv = document.getElementById("console");
const consoleSubDiv = document.createElement('pre');

function wait(ms) {
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
  }
}

// Override the console.log() funcction
console.log = function() {

  // Included but not used
  console.logs.push(Array.from(arguments));
  console.stdlog.apply(console, arguments);

  // Grab all the arguments and convert it to one long string
  let s = '';
  for (i = 0; i < arguments.length; i++) {
    s += String(arguments[i]);
  }

  // Add it to the "fake" console
  entireConsoleLog += s;
  entireConsoleLog += `\n`;

  // And output the "fake" console
  consoleSubDiv.innerHTML = entireConsoleLog;
  consoleDiv.appendChild(consoleSubDiv);
  // wait(200);

  // // in plain js
  // document.getElementById('consoleContainer').style.display = 'none';
  // document.getElementById('consoleContainer').style.display = 'block';
}

