//add contact
//update contact
//delete contact
//insert contact

const contacts = require('./contacts.js');

const nameOption = {
	describe: 'Name of Person',
	demand: true,  
	alias: 'n'
};

const contactOption = {
	describe: 'Contact number of Person',
	demand: true,
	alias: 'c'
};

const genderOption = {
	describe: 'Gender of Person',
	demand: false,
	alias: 'g'
};

const emailOption = {
	describe: 'Email of Person',
	demand: true,   
	alias: 'e'  
};


const addressOption = {
	describe: 'Address of Person',
	demand: false,    
	alias: 'a'
};

const argv = require('yargs')
.command('add','Add new contact',{

	name: nameOption,
	number: contactOption,
	gender: genderOption,
	email: emailOption,   
	address: addressOption  

}).command('remove','Remove contact',{

	number: contactOption,

}).command('read','Read contact',{

	name: nameOption

}).command('list', 'List all contacts').help().argv;

var command = argv._[0];

if(command === 'add'){
	var contactAdded = contacts.addContact(argv.name, argv.number, argv.email, argv.gender, argv.address);

	if(contactAdded){
        console.log("\nSuccessfully added new contact!");
       	contacts.logContact(contactAdded);
    }
    else{
        console.log("\nContact already exists");
    }

}
else if(command === 'read'){

	var contact = contacts.getContact(argv.name);
	
	if(contact!==undefined && contact.length === 1){	
		console.log('Contact Found!');
			contacts.logContact(contact[0]);
	}

	else if(contact!==undefined && contact.length > 1){	
		console.log('Multiple Contacts for same name Found!\n');
		console.log(`Printing ${contact.length} contacts: `);
		for(var i = 0; i<contact.length ;i++){
			contacts.logContact(contact[i]);
		}
	}
	else{
		console.log('Not Found!');
	}

}
else if(command === 'remove'){
	var contactRemoved = contacts.removeContact(argv.number);
    var message = contactRemoved ? "Contact Removed!" : "Contact not found!";
    console.log(message);

}
else if(command === 'list'){
	var allContacts = contacts.listContacts();
    console.log(`Printing ${allContacts.length} contact(s).`);
    allContacts.forEach((contact) => contacts.logContact(contact));

}
else{
	console.log('Command not recognised');
}


