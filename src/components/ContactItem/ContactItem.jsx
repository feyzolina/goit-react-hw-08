
const ContactItem = ({ contact }) => {
  return (
    <li>
      <span>{contact.name}</span>
      <span>{contact.number}</span>
      {/* Silme butonu vs. eklemek isterseniz burada bir buton olabilir */}
    </li>
  );
};

export default ContactItem;
