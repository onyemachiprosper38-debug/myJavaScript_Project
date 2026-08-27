const display = document.querySelector('.text-display');
const buttons = document.querySelectorAll('button');

for (let button of buttons) {
    button.addEventListener('click', ()=> {
        let buttonText = button.textContent;
        console.log(button);
   
    if(buttonText == 'C') {
        display.textContent = '0';
    } else if (buttonText == 'DEL') {
        if(display.textContent == '0' || display.textContent == 'Error') {
            return; 
        }
        display.textContent = display.textContent.slice(0, -1);

         if (display.textContent == '') {
                display.textContent = '0';
            }
    } else if (buttonText == '=') {
        try {
            display.textContent = eval(display.textContent);
        } catch(error){
            display.textContent = 'Error';
        }
        
    } else {
         if (display.textContent == '0' || display.textContent == 'Error') {
                display.textContent = buttonText;
            } else {
               
                display.textContent = display.textContent + buttonText;
            }
    }

    }) 
}