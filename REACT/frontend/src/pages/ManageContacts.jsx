import React, { use, useEffect, useState } from "react";
import axios from 'axios';
const ManageContacts = () => {

    const [contacts,setContacts] = useState([]);
    const [formData,setFormData] = useState({ name:'', email:'', phone:'' });
    const [editId,setEditId] = useState(null);
    const API_URL='http://localhost:8080/contacts';
    
    const fetchContacts = async () => {
        const ContactData = await axios.get(API_URL);
        setContacts(ContactData.data);
    };

    useEffect(()=>{ fetchContacts();
     },[]);

    const handleCreate = async () => {
        if(!formData.name||!formData.email||!formData.phone){
        return alert("Fill all the given Details");
        }

        await axios.post(API_URL,formData);
        setFormData({name:'', email:'', phone:''});
        fetchContacts();
    };

    const handleDelete = async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        fetchContacts();
    };

    const handleEdit = (contact) => {
        setEditId(contact.id);
        setFormData({ name:contact.name, email:contact.email, phone:contact.phone });
    };
    
    const handleUpdate = async () => {
        await axios.put(`${API_URL}/${editId}`,formData);
        setEditId(null);
        setFormData({name:'', email:'', phone:''});
        fetchContacts();
    };


    return( 
        <div>
            <h2 className="text-center mb-4">Manage Contact</h2>
            <div className="row mb-3">

                <div className="col-md-4 mb-2">
                    <input 
                        className="form-control"
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={formData.name}
                        onChange={e=>setFormData({...formData,[e.target.name]:e.target.value})}
                    />
                </div>
                <div className="col-md-4 mb-2">
                     <input 
                        className="form-control"
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={e=>setFormData({...formData,[e.target.name]:e.target.value})}
                    />
                </div>
                <div className="col-md-4 mb-2">
                    <input 
                        className="form-control"
                        type="text"
                        placeholder="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={e=>setFormData({...formData,[e.target.name]:e.target.value})}
                    />
                </div>

                <div className="col-12" >
                    {editId ? (
                        <button className="btn btn-warning w-100 " onClick={handleUpdate} >Update Contact</button>
                    ):(
                        <button className="btn btn-primary w-100" onClick={handleCreate} >Add Contact</button>
                    )}
                </div>
                <div className="p-3"></div>
                <div className="table-responsive">
                    <table className="table table-bordered tabel-striped">
                        <thead className="table-dark">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map(contact => (
                                <tr key={contact.id}>
                                    <td>{contact.name}</td>
                                    <td>{contact.email}</td>
                                    <td>{contact.phone}</td>
                                    <td>
                                        <div className="d-felx gap-2">
                                            <button className="btn btn-info btn-sm w-50" onClick={()=>handleEdit(contact)}>Edit</button>
                                            <button className="btn btn-danger btn-sm w-50" onClick={()=>handleDelete(contact.id)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default ManageContacts;