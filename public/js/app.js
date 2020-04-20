
console.log('Client side js file isloaded !')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    
    const usersearch = search.value
    const url = 'http://localhost:3000/weather?address=' + usersearch

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    //its a browser function to get the values in client side jaascript
    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
 
    })
    })

})
