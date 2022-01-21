import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Button from '@mui/material/Button';

import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../App';

const Finalize = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState({
        checkIN: new Date(),
        checkOut: new Date()
    });

    const [loggedUser] = useContext(UserContext);

    const history = useHistory();

    const handleCheckIn = (date) => {

        const newDates = { ...value }
        newDates.checkIN = date;

        setValue(newDates);
    };
    const handleCheckOut = (date) => {
        const newDates = { ...value }
        newDates.checkOut = date;

        setValue(newDates);
    };

    const handleBooking = () => {

        const details = { ...loggedUser };

        const user = {
            mail: details.mail,
            name: details.name
        };

        const newBooking = { ...user, ...value };

        fetch("http://localhost:3100/addBooking", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newBooking)
        })
            .then(res => {
                res.json()
                history.push('/bookings')

            })
            .catch(err => {
                console.log(err);
            });
        setIsLoading(false);

    }

    return (
        <div>
            <h3>Confirm Your Booking!</h3>


            <LocalizationProvider dateAdapter={AdapterDateFns} >
                <DesktopDatePicker
                    label="From"
                    inputFormat="dd/MM/yyyy"
                    value={value.checkIN}
                    onChange={handleCheckIn}
                    renderInput={(params) => <TextField {...params} />}
                />
                <DesktopDatePicker
                    label="To"
                    inputFormat="dd/MM/yyyy"
                    value={value.checkOut}
                    onChange={handleCheckOut}
                    renderInput={(params) => <TextField {...params} />}

                />
            </LocalizationProvider>
            <br />
            <Button
                variant="contained"
                disabled={isLoading}
                onClick={() => handleBooking()} style={{ marginTop: 5, marginRight: 5 }}>
                Book Now!
            </Button>

            <Button variant="contained"
                color='success'
                onClick={() => history.push('/dashboard')}
                style={{ marginTop: 5, marginRight: 5 }}>
                Back to Dashboard!
            </Button>


        </div >
    )
}

export default Finalize


