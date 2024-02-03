import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../styles.css';
import DashboardHeader from '../../components/DashboardHeader';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventPackage, setEventPackage] = useState('');
  const [services, setServices] = useState('');
  const [userId, setUserId] = useState('');
  const [managedBy, setManagedBy] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchEvents = async () => {
    await axios.get('http://localhost:8080/events').then((response) => {
      setEvents(response.data);
      console.log(response.data);
    });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const submitDelete = async (id) => {
    await axios.delete(`http://localhost:8080/events/${id}`).then(() => {
      console.log('Event deleted');
      fetchEvents();
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
                text: "Success",
                title: 'Event Deleted',
                showConfirmButton: false,
                timer: 1000
            })
        }
    })
  };

  const handleEdit = (event) => {
    setEdit(true);
    setId(event.id);
    setName(event.name);
    setType(event.type);
    setEventDate(event.eventDate);
    setEventPackage(event.package);
    setServices(event.services);
    setUserId(event.userId);
    setManagedBy(event.managedBy);
  };

  const handleNewEvent = (e) => {
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
    const updatedEvent = {
      id: id,
      name: name,
      type: type,
      eventDate: eventDate,
      package: eventPackage,
      services: services,
      userId: userId,
      managedBy: managedBy
    };
    await axios.put(`http://localhost:8080/events/${id}`, updatedEvent).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Updated',
        title: 'Event Updated Successfully',
        showConfirmButton: false,
        timer: 1000,
      });
      setEdit(false);
      clearFields();
      fetchEvents();
    }).catch((err) => {
      console.log(err);
    });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const event = {
      name: name,
      type: type,
      eventDate: eventDate,
      package: eventPackage,
      services: services,
      userId: userId,
      managedBy: managedBy
    };
    await axios.post('http://localhost:8080/events/add-new', event).then((response) => {
      console.log(response.data);
      Swal.fire({
        icon: 'success',
        title: 'Event Added',
        showConfirmButton: false,
        timer: 1000,
      });
      fetchEvents();
      setAdd(false);
      clearFields();
    }).catch((err) => {
      console.log(err);
    });
  };

  const clearFields = () => {
    setId('');
    setName('');
    setType('');
    setEventDate('');
    setEventPackage('');
    setServices('');
    setUserId('');
    setManagedBy('');
  };

  return (
    <div>
      <div className="dashboard-content">
        {!edit && !add && <DashboardHeader btnText="New Event" onClick={handleNewEvent} />}
        {(edit || add) && <DashboardHeader btnText="Back to Events" onClick={handleBack} />}
        {!edit && !add && (
          <div className="dashboard-content-container">
            <div className="dashboard-content-header">
              <h2>Event List</h2>
              <div className='dashboard-content-search'>
                <input
                  type='text'
                  placeholder='Search..'
                  className='dashboard-content-input'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Package</th>
                  <th>Services</th>
                  <th>User ID</th>
                  <th>Managed By</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {events.length !== 0 && (
                <tbody>
                  {events.map((event) => {
                    return (
                      <tr key={event.id}>
                        <td><span>{event.id}</span></td>
                        <td><span>{event.name}</span></td>
                        <td><span>{event.type}</span></td>
                        <td><span>{event.eventDate}</span></td>
                        <td><span>{event.package}</span></td>
                        <td><span>{event.services}</span></td>
                        <td><span>{event.userId}</span></td>
                        <td><span>{event.managedBy}</span></td>
                        <td>
                          <button onClick={() => handleEdit(event)} className="edit-save-btn">
                            Edit
                          </button>
                          <button onClick={() => handleDelete(event.id)} className="edit-back-btn">
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
              <h2>Edit Event Details</h2>
            </div>
            <form onSubmit={handleEditSubmit}>
              {/* Add input fields for editing event details */}
            </form>
          </div>
        )}
        {add && (
          <div className="form-elements">
            <div className="dashboard-content-header">
              <h2>Add Event</h2>
            </div>
            <form onSubmit={handleAddSubmit}>
              <label htmlFor="" className='form_label'>Name:</label><br />
              <input type="text" className='form-inputs' value={name} onChange={(e)=> setName(e.target.value)} required />
              <br /><label htmlFor="" className='form_label'>Type:</label><br />
              <input type="text" className='form-inputs' value={type} onChange={(e) => setType(e.target.value)} required />
              <br /><label htmlFor="" className='form_label'>Date:</label><br />
              <input type="date" className='form-inputs' value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />
              <br /><label htmlFor="" className='form_label'>Package:</label><br />
              <input type="text" className='form-inputs' value={eventPackage} onChange={(e) => setEventPackage(e.target.value)} required />
              <br /><label htmlFor="" className='form_label'>Services:</label><br />
              <input type="text" className='form-inputs' value={services} onChange={(e) => setServices(e.target.value)} required />
              <br /><label htmlFor="" className='form_label'>User ID:</label><br />
              <input type="text" className='form-inputs' value={userId} onChange={(e) => setUserId(e.target.value)} required />
              <br /><label htmlFor="" className='form_label'>Managed By:</label><br />
              <input type="text" className='form-inputs' value={managedBy} onChange={(e) => setManagedBy(e.target.value)} required />
              <br /><button type="submit" className="save-btn">Save</button>
              <button className="back-btn" onClick={handleBack}>Cancel</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
