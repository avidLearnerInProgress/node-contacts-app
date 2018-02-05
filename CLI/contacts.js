const fs = require('fs');
const validator = require('validator')

var fetchContacts = () =>{
	try{
		var contactsString = fs.readFileSync('contacts-data.json');
		var contacts = JSON.parse(contactsString);
		return contacts;	
	}
	catch(e){
		return [];
	}
	
};


var saveContacts = (contacts) =>{
	 fs.writeFileSync('contacts-data.json', JSON.stringify(contacts), function(err){
            if(err)
                console.log("Error!");
        });
}





/*-----------------------------------------------------------------------------*/


var addContact = (name, number, email, gender, address) => {

	/*var _gender, _email, _contact, _name, _address;

	var isnum = /^\d+$/.test(number);
	if (isnum)
		_number = number;
	else {
		console.log('Contact invalid! Please try again');
		return 	null;
	}

	var x = name.split(' ');
	var fn = x[0];
	var ln = x[1];

	if(/^[a-zA-Z]+$/.test(fn) && /^[a-zA-Z]+$/.test(ln)){
		_name = name;
	}
	else{
		console.log('Name invalid! Please try again');
		return null;
	}

	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(String(email).toLowerCase()) === true)
    	_email = email
   	else{
   		console.log('Email invalid! Please try again');
		return null;	
   	}

   	if(gender.toLowerCase() === 'male' || gender.toLowerCase() === 'female')
		_gender = gender;
	else return null;

	if(address) _address = address;
	else _address = null;*/

	//console.log(_name+_number+_address+_email+_gender);

	var contact = {name, number, email, gender, address};

	var contacts = fetchContacts();
	//console.log(contacts);
	var duplicateContactNumber = contacts.filter((c) => c.number === number);
	var duplicateContactEmail = contacts.filter((c) => c.email === email);
	
	//console.log(duplicateContactNumber);
	//console.log(duplicateContactEmail);
	//console.log(duplicateContact.length);

	if(duplicateContactNumber.length === 0 && duplicateContactEmail.length === 0){
			contacts.push(contact);
			saveContacts(contacts);
			return contact;
	}

	
};

    
var removeContact = (x) => {

	var contacts = fetchContacts();
	//number = parseInt(number);
	var filteredContacts = contacts.filter((c) => c.number !== x);

	//console.log(filteredContacts);
	saveContacts(filteredContacts);

	return filteredContacts.length !== contacts.length;

};


var listContacts = () => {

	return fetchContacts(); 

};

var getContact = (name) => {

	var contacts = fetchContacts();

	var filteredContact = contacts.filter((c) => c.name === name);
	//console.log(filteredContact);
	/*if(filteredContact.length > 1){
		console.log("There are multiple contacts with same name.!")
		for (var i = 0 ; i <= filteredContact.length; i++) {
			logContact(filteredContact[i]);
		}
		return null;
	}
	else*/
		return filteredContact;
};


var logContact = (contact) => {
    //debugger;
    console.log("");
    console.log(`Name: ${contact.name}`);
    console.log(`Contact: ${contact.number}`);
    console.log(`Email: ${contact.email}`);
    if(contact.gender != undefined)
    	console.log(`Gender: ${contact.gender}`);
    if(contact.address != undefined)
    	console.log(`Address: ${contact.address}`);
};

module.exports = {
	addContact,
	getContact,
	removeContact,
	listContacts,
	logContact
}
