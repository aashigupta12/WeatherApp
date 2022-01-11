const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')//  for class (.), ad for id (#)
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
 
    const location = search.value

messageOne.textContent = 'Loading...'
messageTwo.textContent = ' '
    fetch('http://127.0.0.1:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
             messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        
             console.log('Location: '+data.location)
             console.log('Forecast: '+data.forecast)
             console.log('Latitude:' + data.latitude + ','+ 'Longitude: ' +data.longitude)
        }
      })
    })
})



//EXAMPLE FOR FETCH API
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })
