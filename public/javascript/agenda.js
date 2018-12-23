function displayAgenda(agenda) {
    console.log("I'm alive!", agenda);
    var resultList = document.querySelector('table tbody');
    
    
   

    var listItems = agenda.map(function (item) {


        
        return `
                <tr>
                <td>${item.fisrtName}</td>
                <td>${item.lastName}</td>
                <td>${item.phoneNumeber}</td>
                </tr>
        `;
    })
    

    resultList.innerHTML = listItems.join('');

}
function initAgenda() {
    console.info('first step')
    $.ajax('data/agenda.json').done(function (agenda) {
    displayAgenda(agenda)
    })
}
initAgenda();