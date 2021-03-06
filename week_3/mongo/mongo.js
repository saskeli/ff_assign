const mongoose = require('mongoose');

if ( process.argv.length < 3 ) {
    console.log('give password as arguments');
    process.exit(1);
} else if ( process.argv.length > 3 && process.argv.length !== 5) {
    console.log("To add new password, name and number need to be provided as parameters.");
    process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url =
    `mongodb+srv://fubar:${password}@cluster0-22nvf.mongodb.net/fstack?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true });

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model('Person', personSchema);

if (name) {
    const person = new Person({
        name: name,
        number: number
    });
      
    person.save().then(response => {
        console.log(`added ${name} number ${number}.`);
        mongoose.connection.close();
    });
} else {
    Person.find({}).then(result => {
        console.log("Phonebook:")
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`);
        });
        mongoose.connection.close();
    });
}

