const contactsFunction = require("./contacts");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactsFunction.listContacts();
      console.log(contacts);
      break;

    case "get":
      const contact = await contactsFunction.getContactById(id);
      if (!contact) {
        throw new Error(`Contact with ${id} not found`);
      }
      console.log(contact);
      break;

    case "add":
      const newContact = await contactsFunction.addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const removeContact = await contactsFunction.removeContact(id);
      console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
const arr = hideBin(process.argv);
const { argv } = yargs(arr);
invokeAction(argv);
