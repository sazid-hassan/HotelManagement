import * as React from 'react';

import { useHistory } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CardActions, Button } from '@mui/material';

export default function RoomCard(props) {

    const history = useHistory();
    return (

        <Box
            sx={{
                boxShadow: 12,
                m: 2,
            }}

        >
            <Card sx={{ maxWidth: 335 }}>

                <CardMedia
                    component="img"
                    height="194"
                    image={props.img}
                    alt={props.name}
                />
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    <span style={{ margin: 15, color: "#6e7475" }}>
                        {props.price}
                    </span>
                </Typography>
                <Typography variant="h5" component="div">
                    <span style={{ margin: 15, color: "#6e7475" }}>{props.name}</span>
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    <span style={{ margin: 15, color: "#6e7475" }}>
                        Category : {props.type}
                    </span>
                </Typography>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {props.desc}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        style={{ color: '#ed114f', fontWeight: "bold" }}
                        onClick={() => history.push("/confirm")}
                    >
                        Book Now!
                    </Button>
                </CardActions>
            </Card>
        </Box>

    );
}