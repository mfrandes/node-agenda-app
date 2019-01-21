function loadContacts() {
    $.ajax("data/contacts.json").done(function (contacts) {
        displayContacts(contacts);
    });
}

function getNewRow() {
    return `<tr>
        <td><input type="text" name="firstName" placeholder="Fisrt Name"/></td>
        <td><input type="text" name="lastName" placeholder="Last Name"/></td>
        <td><input type="text" name="phone" placeholder="Phone"/></td>
        <td><button onclick="saveContact()" >Save</button></td>
        </tr>`;
}

function saveContact(){
    
    var firstName = $('input[name=firstName]').val();
    var lastName = document.querySelector('input[name=lastName]').value;
    var phone = $('input[name=phone]').val();
    console.log('save contact', firstName, lastName, phone);
    $.post('contacts/create', {
        firstName, // shortcut from Es6 (key is the same as value variable name)
        lastName,
        phone: phone // Es5 loger variant used when key is not the same as value variable name(not the case))
    }).done(function(response){
        console.warn("done creating contact", response)
        if(response.success) {
            loadContacts();
        }
    })
 }

function displayContacts(contacts) {
    var listContacts = $("table tbody");
    var rows = contacts.map(function (contact) {
        return `<tr>
        <td>${contact.firstName}</td>
        <td>${contact.lastName}</td>
        <td>${contact.phone}</td>
        <td><a href="/contacts/delete?phone=${contact.phone}">X</a></td>
        </tr>`;
    });
    console.warn('rows', rows);
    rows.push(getNewRow());
    //listContacts.html(rows);
    document.querySelector("tbody").innerHTML = rows.join('')
}



loadContacts();




/*function populateAgenda() {
    $.ajax('data/contacts.json').done(function (contacts) {
        var listContacts = $('table tbody');
        var resultList = contacts.map(function (contact) {
            return `
            <tr>
            <td>${contact.firstName}</td>
            <td>${contact.lastName}</td>
            <td>${contact.phone}</td>
            </tr>
    `;
        });
        listContacts.html(resultList);
    });
};
populateAgenda();*/