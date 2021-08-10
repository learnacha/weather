console.log('loading js from public file')



const weatherForm = document.querySelector('form');

const searchElement = document.querySelector('input');
const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-2')
const msg3 = document.querySelector('#message-3')


weatherForm.addEventListener('submit', (event) => {

    const location = searchElement.value;
    event.preventDefault();

    msg1.textContent = 'loading...';
    msg2.textContent = '';
    msg2.textContent = '';

    fetch(`/weather?address=${location}`)
        .then(res => res.json())
        .then(({error, address, forecast, location, humidity}) => {
            if (error) {
                console.log(error);
                msg1.textContent = error;
                return ;
            }
            msg1.textContent = forecast;
            msg2.textContent = location;
            msg2.textContent = humidity;
        })
})