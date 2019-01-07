function displayContacts(contacts){
    var listContacts = $("table tbody");
    var rows = contacts.map(function(contact){
        return `<tr>
        <td>${contact.fisrtName}</td>
        <td>${contact.lastName}</td>
        <td>${contact.phone}</td>
        <td><a href="data/agenda.json?dlete=${contact.phone}">X</a></td>
        </tr>`;
    });
   
    listContacts.html(rows);
    
}


function loadContacts(){
    $.ajax("data/agenda.json").done(function(contacts){
        displayContacts(contacts);
    });
}
loadContacts();




/*function populateAgenda() {
    $.ajax('data/agenda.json').done(function (contacts) {
        var listContacts = $('table tbody');
        var resultList = contacts.map(function (contact) {
            return `
            <tr>
            <td>${contact.fisrtName}</td>
            <td>${contact.lastName}</td>
            <td>${contact.phone}</td>
            </tr>
    `;
        });
        listContacts.html(resultList);
    });
};
populateAgenda();*/