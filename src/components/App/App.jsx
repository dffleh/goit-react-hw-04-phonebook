import { useState } from 'react';
import { Wrap } from './App.styled';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';

import { useLocaleStorage } from 'components/Hooks/useLocaleStorage';
import FormContacts from 'components/FormContacts/FormContacts';

export function App() {
  const defaultContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];

  const [contacts, setContacts] = useLocaleStorage(defaultContacts);
  const [filter, setFilter] = useState('');

  const addContact = ({ name, number, id }) => {
    const newContact = {
      id,
      name,
      number,
    };
    contacts.find(contact => contact.name === name)
      ? alert(`${name} is already in contacts`)
      : setContacts(contacts => [newContact, ...contacts]);
  };

  const deleteContact = nanoid => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== nanoid)
    );
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Wrap>
      <h2>Phonebook</h2>
      <FormContacts onSubmit={addContact} />
      <div>
        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />

        <ContactList contacts={visibleContacts} deleteContact={deleteContact} />
      </div>
    </Wrap>
  );
}
