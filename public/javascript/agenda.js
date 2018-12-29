/* optimizez cod 

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
initAgenda(); */

function populateAgenda() {
    $.ajax('data/agenda.json').done(function (contacts) {
        var lisContacts = $('table tbody');
        var resultList = contacts.map(function (contact) {
            return `
            <tr>
            <td>${contact.fisrtName}</td>
            <td>${contact.lastName}</td>
            <td>${contact.phoneNumeber}</td>
            </tr>
    `;
        });
        lisContacts.html(resultList);
    });
};
populateAgenda();
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
        var newContact = {
            fisrtName: nfn,
            lastName: nln,
            phoneNumeber: npn
        }
        data.push(newContact);
        var newData = JSON.stringify(newContact);
        fs.writeFile('data/agenda.json', newData, 'utf8', function (err) {
            if (err) throw err;
            console.log('The file has been saved!');
        });




        /*$.ajax({
             type: 'POST',
             data: newData,
             url: 'data/agenda.json',
             success: function(){
                 console.info('data saved!')
             },
             error: function(){
                 console.error('fail to save data')
             }
         });*/


        /*jQuery.post('http://localhost:3000/data/agenda.json', {
            newData: newData
        }, function (response) {
            console.info("caontact saved")
        })*/
    })
    console.log(nfn, nln, npn);
    document.getElementById("modal1").style.display = "none";
}