import { useSelector } from "react-redux";
import { selectNameFilter } from "../../redux/filters/selectors";
import Contact from "../Contact/Contact";
import { selectContacts } from "../../redux/contacts/selectors";

const ContactList = () => {
  const filter = useSelector(selectNameFilter);
  const contacts = useSelector(selectContacts);

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <ul>
      {filteredContacts.map(contact => (
        <Contact key={contact.id} contact={contact} />
      ))}
    </ul>
  );
};

export default ContactList;
