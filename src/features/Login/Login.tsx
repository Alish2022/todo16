import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {TextField} from "@mui/material";
import {Form} from "formik";


export default function BasicGrid() {
    return (
        <Box sx={{ width: 500,
            height: 300,
            backgroundColor: 'primary.dark',
        }}>
            <Form>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        Email
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="outlined-basic" label="Email" variant="outlined" />
                    </Grid>
                    <Grid item xs={6}>
                        Password
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="outlined-basic" label="Password" variant="outlined" />
                    </Grid>
                </Grid>
            </Form>
        </Box>
    );
}