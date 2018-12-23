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

/* new contact modal*/


document.getElementById("newContactBtn").onclick = displayModal;

function displayModal() {
    console.log('click pe mondal')
    document.getElementById("modal1").style.display = "flex"
}
document.querySelector('.close').onclick = closeModal;
function closeModal() {
    document.getElementById("modal1").style.display = "none";
}

/* add new contact */


document.getElementById("submitBtn").onclick = newContact;

function newContact() {
    var nfn = $('#lName').val();
    var nln = $('#fName').val();
    var npn = $('#phoneNumber').val();
    $.getJSON("data/agenda.json", function (data) {
        var newContact = { fisrtName: nfn, lastName: nln, phoneNumeber: npn }
        data.push(newContact);
        var newData = JSON.stringify(data);
        jQuery.post('http://localhost:3000/data/agenda.json', {
            newData: newData
        }, function (response) {
            console.info("caontact saved")
        })
    })
    console.log(nfn, nln, npn);
    document.getElementById("modal1").style.display = "none";
}