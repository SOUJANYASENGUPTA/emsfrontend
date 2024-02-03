import React, { useEffect, useState } from 'react';
import '../styles.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import DashboardHeader from '../../components/DashboardHeader';

const User = () => {
    const [users, setUsers] = useState([]);
    const [edit, setEdit] = useState(false);
    const [add, setAdd] = useState(false);
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [upiId, setUpiId] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const fetchUsers = async () => {
        await axios.get('http://localhost:8080/user').then((response) => {
            setUsers(response.data);
        });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const submitDelete = async (id) => {
        await axios.delete(`http://localhost:8080/user/${id}`).then(() => {
            fetchUsers();
        });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
        }).then((result) => {
            if (result.isConfirmed) {
                submitDelete(id);
                Swal.fire({
                    icon: 'success',
                    text: 'Success',
                    title: 'User Deleted',
                    showConfirmButton: false,
                    timer: 1000
                });
            }
        });
    };

    const handleEdit = (user) => {
        setEdit(true);
        setUserId(user.id);
        setName(user.name);
        setEmail(user.email);
        setPhoneNumber(user.phoneNumber);
        setUpiId(user.upiId);
    };

    const handleNewUser = (e) => {
        e.preventDefault();
        setAdd(true);
        setEdit(false);
        clearFields();
    };

    const handleBack = (e) => {
        e.preventDefault();
        setAdd(false);
        setEdit(false);
        clearFields();
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const updatedUser = {
            id: userId,
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            upiId: upiId
        };

        await axios.put(`http://localhost:8080/user/${userId}`, updatedUser).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'User Updated Successfully',
                showConfirmButton: false,
                timer: 1000
            });
            setEdit(false);
            clearFields();
            fetchUsers();
        }).catch((err) => {
            console.log(err);
        });
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            upiId: upiId
        };

        await axios.post('http://localhost:8080/user/add-new', newUser).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'User Added',
                showConfirmButton: false,
                timer: 1000
            });
            fetchUsers();
            setAdd(false);
            clearFields();
        }).catch((err) => {
            console.log(err);
        });
    };

    const clearFields = () => {
        setUserId('');
        setName('');
        setEmail('');
        setPhoneNumber('');
        setUpiId('');
    };

    return (
        <div>
            <div className="dashboard-content">
                {!edit && !add && <DashboardHeader btnText="New User" onClick={handleNewUser} />}
                {(edit || add) && <DashboardHeader btnText="Back to Users" onClick={handleBack} />}
                {!edit && !add && (
                    <div className="dashboard-content-container">
                        <div className="dashboard-content-header">
                            <h2>User List</h2>
                            <div className='dashboard-content-search'>
                                <input
                                    type='text'
                                    placeholder='Search..'
                                    className='dashboard-content-input'
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    min="1"
                                    inputMode="numeric"
                                />
                            </div>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>UPI ID</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            {users.length !== 0 && (
                                <tbody>
                                    {users.map((user) => {
                                        return (
                                            <tr key={user.id}>
                                                <td><span>{user.id}</span></td>
                                                <td><span>{user.name}</span></td>
                                                <td><span>{user.email}</span></td>
                                                <td><span>{user.phoneNumber}</span></td>
                                                <td><span>{user.upiId}</span></td>
                                                <td>
                                                    <button onClick={() => handleEdit(user)} className="edit-save-btn">
                                                        Edit
                                                    </button>
                                                    <button onClick={() => handleDelete(user.id)} className="edit-back-btn">
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            )}
                        </table>
                    </div>
                )}
                {edit && (
                    <div className="form-elements">
                        <div className="dashboard-content-header">
                            <h2>Edit User Details</h2>
                        </div>
                        <form onSubmit={handleEditSubmit}>
                            <label>Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                            <label>Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <label>Phone Number</label>
                            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                            <label>UPI ID</label>
                            <input type="text" value={upiId} onChange={(e) => setUpiId(e.target.value)} required />
                            <button type="submit">Save</button>
                            <button onClick={handleBack}>Cancel</button>
                        </form>
                    </div>
                )}
                {add && (
                    <div className="form-elements">
                        <div className="dashboard-content-header">
                            <h2>Add New User</h2>
                        </div>
                        <form onSubmit={handleAddSubmit}>
                            <label>Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                            <label>Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <label>Phone Number</label>
                            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                            <label>UPI ID</label>
                            <input type="text" value={upiId} onChange={(e) => setUpiId(e.target.value)} required />
                            <button type="submit">Save</button>
                            <button onClick={handleBack}>Cancel</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default User;
