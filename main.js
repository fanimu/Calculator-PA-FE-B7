document.addEventListener('keydown', (event) => {
  const key = event.key;

  // Define the key mapping for your calculator
  const keyMap = {
    Enter: '=',
    Escape: 'clear',
    Backspace: 'backspace',
    '/': '/',
    '*': '*',
    '-': '-',
    '+': '+',
    '(': 'brackets',
    ')': 'brackets',
    '%': '%',
    0: '0',
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9',
    '.': '.',
  };

  const mappedKey = keyMap[key];

  if (mappedKey !== undefined) {
    const targetKey = document.querySelector(`.key[data-key="${mappedKey}"]`);

    if (targetKey) {
      targetKey.click();
    }
  }
});

const keys = document.querySelectorAll('.key');
const display_input = document.querySelector('.display .input');
const display_output = document.querySelector('.display .output');

let input = '';

for (let key of keys) {
  const value = key.dataset.key;

  key.addEventListener('click', () => {
    display_input.innerHTML = CleanInput(input);

    if (value == 'clear') {
      input = '';
      display_input.innerHTML = '';
      display_output.innerHTML = CleanInput(input);
    } else if (value == 'backspace') {
      input = input.slice(0, -1);
      display_input.innerHTML = CleanInput(input);
    } else if (value == '=') {
      let result = eval(PrepareInput(input));

      display_output.innerHTML = CleanOutput(result);
    } else if (value == 'minus') {
      //   if (input.indexOf('(') == -1 || (input.indexOf('(') != -1 && input.indexOf(')') != -1 && input.lastIndexOf('(') < input.lastIndexOf(')'))) {
      //     input = '(';
      //   } else if ((input.indexOf('(') != -1 && input.indexOf(')') == -1) || (input.indexOf('(') != -1 && input.indexOf(')') != -1 && input.lastIndexOf('(') > input.lastIndexOf(')'))) {
      //     input += ')';
      //   }

      input = '-' + input;
      display_input.innerHTML = CleanInput(input);
    } else {
      if (ValidateInput(value)) {
        input += value;
        display_input.innerHTML = CleanInput(input);
      }
    }
  });
}

function CleanInput(input) {
  let input_array = input.split('');
  let input_array_length = input_array.length;

  for (let i = 0; i < input_array_length; i++) {
    if (input_array[i] == '*') {
      input_array[i] = ` <span class="operator">x</span> `;
    } else if (input_array[i] == '/') {
      input_array[i] = ` <span class="operator">÷</span> `;
    } else if (input_array[i] == '+') {
      input_array[i] = ` <span class="operator">+</span> `;
    } else if (input_array[i] == '-') {
      input_array[i] = ` <span class="operator">-</span> `;
    } else if (input_array[i] == '(') {
      input_array[i] = `<span class="brackets">(</span>`;
    } else if (input_array[i] == ')') {
      input_array[i] = `<span class="brackets">)</span>`;
    } else if (input_array[i] == '%') {
      input_array[i] = `<span class="percent">%</span>`;
    }
  }

  return input_array.join('');
}

function CleanOutput(output) {
  let output_string = output.toString();
  let decimal = output_string.split('.')[1];
  output_string = output_string.split('.')[0];

  let output_array = output_string.split('');

  if (output_array.length > 3) {
    for (let i = output_array.length - 3; i > 0; i -= 3) {
      output_array.splice(i, 0, ',');
    }
  }

  if (decimal) {
    output_array.push('.');
    output_array.push(decimal);
  }

  return output_array.join('');
}

function ValidateInput(value) {
  let last_input = input.slice(-1);
  let operators = ['+', '-', '*', '/'];

  if (value == '.' && last_input == '.') {
    return false;
  }

  if (operators.includes(value)) {
    if (operators.includes(last_input)) {
      return false;
    } else {
      return true;
    }
  }

  return true;
}

function PrepareInput(input) {
  let input_array = input.split('');

  for (let i = 0; i < input_array.length; i++) {
    if (input_array[i] == '%') {
      input_array[i] = '/100';
    }
  }

  return input_array.join('');
}

document.getElementById('toggleMode').addEventListener('click', function () {
  document.body.classList.toggle('light-mode');
  document.querySelector('.form-check-label').innerHTML = document.body.classList.contains('light-mode') ? 'Light Mode' : 'Dark Mode';
});
