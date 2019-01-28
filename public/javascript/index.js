var phoneToEdit = "";

function loadContacts() {
    $.ajax("data/contacts.json").done(function (contacts) {
        window.globalContacts = contacts;
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

function saveContact() {

    var firstName = $('input[name=firstName]').val();
    var lastName = document.querySelector('input[name=lastName]').value;
    var phone = $('input[name=phone]').val();

    console.log('save contact', firstName, lastName, phone);

    var actionUrl = phoneToEdit ? 'contacts/update?phone=' + phoneToEdit : 'contacts/create'; // inline iff similat cu if (phoneToEdit){actionUrl=...}else {...}

    $.post(actionUrl, {
        firstName, // shortcut from Es6 (key is the same as value variable name)
        lastName,
        phone: phone // Es5 loger variant used when key is not the same as value variable name(not the case))
    }).done(function (response) {
        console.warn("done creating contact", response).
        phoneToEdit = '';
        if (response.success) {
            
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
        <td>
            <a href="/contacts/delete?phone=${contact.phone}">&#10006;</a>
            <a href="#" class="edit" data-id="${contact.phone}" >&#9998</a>
        </td>
        </tr>`;
    });
    //console.warn('rows', rows);
    rows.push(getNewRow());

    //listContacts.html(rows);
    document.querySelector("tbody").innerHTML = rows.join('')
}

function initevents() {
    // TODO use native click
    $("table").delegate("a.edit", "click", function () {
        phoneToEdit = this.getAttribute("data-id");

        var contact = globalContacts.find(function(contact){
            return contact.phone == phoneToEdit;
        })
        console.warn('TODO Edit', phoneToEdit, contact);
        
        $('input[name=firstName]').val(contact.firstName);
        document.querySelector('input[name=lastName]').value = contact.lastName;
        $('input[name=phone]').val(contact.phone);
    });

    document.getElementById('search').addEventListener('input', doSearch);
}

function doSearch(ev){
    var value = this.value.toLowerCase();
    

    var filteredContacts = globalContacts.filter(function (contact){
        console.log(contact.firstName, value);
        return contact.firstName.toLowerCase().includes(value);
    });
   

    displayContacts(filteredContacts);
}

//start app

initevents()
loadContacts();
