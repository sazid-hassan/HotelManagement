import React, { useContext, useEffect } from 'react';

import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { UserContext } from '../../App';
import BasicTable from './BasicTable';
import TableHeader from './TableHeader';

import Button from '@mui/material/Button';


const Booking = () => {

    const [bookings, setBookings] = useState([]);
    const loggedUser = useContext(UserContext);

    const history = useHistory();

    const email = loggedUser[0].mail;


    useEffect(() => {
        fetch('http://localhost:3100/bookings?mail=' + email, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => setBookings(data));
    }, [loggedUser])

    return <div>
        <h3> Bookings: {bookings.length}</h3>

        <TableHeader />
        {
            bookings.map(bk => <BasicTable
                key={bk.id}
                name={bk.name}
                checkIn={new Date(bk.checkIN).toDateString('dd / mm / yyyy')}
                checkOut={new Date(bk.checkOut).toDateString('dd / mm / yyyy')}
            />)
        }

        <br />

        <Button variant="contained"
            color='success'
            onClick={() => history.push('/profile')}
            style={{ marginTop: 5, marginRight: 5 }}>
            Profile
        </Button>

        <Button variant="contained"
            color='success'
            onClick={() => history.push('/dashboard')}
            style={{ marginTop: 5, marginRight: 5 }}>
            Back to Dashboard!
        </Button>


    </div>;
};

export default Booking;
