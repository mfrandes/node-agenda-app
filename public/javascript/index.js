var phoneToEdit = "";

const API_URL = {
    CREATE: "contacts/create",
    READ: "contacts",
    UPDATE: "contacts/update",
    DELETE: "contacts/delete"
};
// if we are on demo sitte url: https://mfrandes.github.io
if (location.host === "mfrandes.github.io"){
    API_URL.read = 'data/contacts.json'
}
function loadContacts() {
    $.ajax(API_URL.READ).done(function (contacts) {
        window.globalContacts = contacts;
        displayContacts(contacts);
    });
}

function saveContact() {

    var firstName = $('input[name=firstName]').val();
    var lastName = document.querySelector('input[name=lastName]').value;
    var phone = $('input[name=phone]').val();

    console.log('save contact', firstName, lastName, phone);

    var actionUrl = phoneToEdit ? API_URL.UPDATE + 'id=' + phoneToEdit : API_URL.CREATE; // inline iff similat cu if (phoneToEdit){actionUrl=...}else {...}

    $.post(actionUrl, {
        firstName, // shortcut from Es6 (key is the same as value variable name)
        lastName,
        phone: phone // Es5 loger variant used when key is not the same as value variable name(not the case))
    }).done(function (response) {
        console.warn("done creating contact", response);
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
            <a href="${API_URL.DELETE}?id=${contact.id}">&#10006;</a>
            <a href="#" class="edit" data-id="${contact.id}" >&#9998</a>
        </td>
        </tr>`;
    });

    //listContacts.html(rows);
    document.querySelector("tbody").innerHTML = rows.join('')
}

function initevents() {
    // TODO use native click
    $("table").delegate("a.edit", "click", function () {
        phoneToEdit = this.getAttribute("data-id");

        var contact = globalContacts.find(function (contact) {
            return contact.id == phoneToEdit;
        })
        console.warn('TODO Edit', phoneToEdit, contact);

        $('input[name=firstName]').val(contact.firstName);
        document.querySelector('input[name=lastName]').value = contact.lastName;
        $('input[name=phone]').val(contact.phone);
    });

    document.getElementById('search').addEventListener('input', doSearch);
}

function doSearch(ev) {
    // var value = document.getElementById('search').value;
    var value = this.value.toLowerCase();


    var filteredContacts = globalContacts.filter(function (contact) {
        // console.log(contact.firstName, value);
        return contact.firstName.toLowerCase().includes(value) ||
            contact.lastName.toLowerCase().includes(value) ||
            contact.phone.toLowerCase().includes(value);
    });


    displayContacts(filteredContacts);
}

//start app

initevents()
loadContacts();
