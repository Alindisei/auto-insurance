//Constructor
function Insurance(brand, year, type) {
    this.brand = brand;
    this.year  = year;
    this.type  = type;
}


Insurance.prototype.calculatedInsurance = function() {
    let amount;
    const base = 2000;

    switch(this.brand) {

        case '1':
            amount = base * 1.15;
            break;
        case '2':
            amount = base * 1.05;
            break;
        case '3':
            amount = base * 1.35;
            break;
        default:
            break;
    }

    const difference = new Date().getFullYear() - this.year;

    amount += ( difference * 3 * amount ) / 100;

    if( this.type === 'essential' ) {
        amount *= 1.30;
    }else {
        amount *= 1.50;
    }

    return amount;
}


UserInterface.prototype.showResult = (total, insurance) => {

    const { brand, year, type } = insurance;
    let textBrand;

    switch(brand) {
        case '1':
            textBrand = 'American';
            break;
        case '2':
            textBrand = 'Asian';
            break;
        case '3':
            textBrand = 'European';
            break;
        default:
            break;
    }
    // Create the result
    const div = document.createElement('DIV');
    div.classList.add('mt-10');

    div.innerHTML = `
        <p class="header">Insurance cost</p>
        <p class="font-bold">Brand: <spam class="font-normal"> ${textBrand} </span></p>
        <p class="font-bold">Year: <spam class="font-normal">  ${year} </span></p>
        <p class="font-bold">Type: <spam class="font-normal capitalize">  ${type} </span></p>
        <p class="font-bold">Total: <spam class="font-normal"> $ ${total} </span></p>
    `;

    const resultDiv = document.querySelector('#result');

    // Spinner
    const spinner = document.querySelector('#charging');
    spinner.style.display = 'block';

    setTimeout(() => {
        spinner.style.display = 'none'; 
        resultDiv.appendChild(div);
    }, 2000);
}


function UserInterface() {}

// Create option of year select / function que solo genera HTML.
UserInterface.prototype.fullOptions = () => {
    const max = new Date().getFullYear();
    const min = max - 20;
    const selectYear = document.querySelector('#year');

    for( i = max; i > min; i-- ) {
        let option = document.createElement('OPTION');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}


// Show alerts on screen
UserInterface.prototype.showMessage = (message, type) => {

    const div = document.createElement('DIV');

    if( type === 'error' ) {
        div.classList.add('message', 'error');
    } else {
        div.classList.add('message', 'correct');
    }

    div.classList.add('message', 'mt-10');
    div.textContent = message;

    // ADD to HTML
    const form = document.querySelector('#quote-insurance');
    form.insertBefore(div, document.querySelector('#result'));

    setTimeout(() => {
        div.remove();
    }, 2000); 
}


// Instantiate UserInterface
const userInterface = new UserInterface();


// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    userInterface.fullOptions();
});

eventListeners();
function eventListeners() {
    const form = document.querySelector('#quote-insurance');
    form.addEventListener('submit', quoteInsurance);
}

function quoteInsurance(e) {
    e.preventDefault();
    const brand = document.querySelector('#brand').value;
    const year = document.querySelector('#year').value;
    const type = document.querySelector('input[name="type"]:checked').value;
    
    if( brand === '' || year === '' || type === '' ) {
        userInterface.showMessage('All fields are required', 'error');
        return;
    }
        
    userInterface.showMessage('Searching...', 'success');

    // hide previous quotes
    const results = document.querySelector('#result div');
    if( results != null ) {
        results.remove();
    }

    // Instantiate insurance
    const insurance = new Insurance(brand, year, type); 
    const total = insurance.calculatedInsurance(); 

    // Use the prototype to quote the insurance
    userInterface.showResult(total, insurance);
}


// ToDO: To Update:
/* 
    *si muestra un mensaje de error no mostrar otro.
    * si muestra mensaje de error no mostrar el resultado caso cambie la marca
*/
