package com.ram.contactapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ram.contactapp.entity.Contact;
import com.ram.contactapp.repository.ContactRepository;

@Service
public class ContactService {
    @Autowired
    private ContactRepository contactRepository;

    public List<Contact> getAllContacts(){
            return contactRepository.findAll();
    }

    public Contact createContact(Contact contact){
        return contactRepository.save(contact);
    }

    public Optional<Contact> getContactById(Long id){
        return contactRepository.findById(id);
    }

    public Contact updateContact (Long id,Contact updatedContact){
        Contact contact = contactRepository.findById(id).orElseThrow();
        contact.setName(updatedContact.getName());
        contact.setEmail(updatedContact.getName());
        contact.setPhone(updatedContact.getPhone());
        return contactRepository.save(contact);
    }

    public void delectContact(Long id){
        contactRepository.deleteById(id);
    }
}
