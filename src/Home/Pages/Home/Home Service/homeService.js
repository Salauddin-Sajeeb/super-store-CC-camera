import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Container, Grid, ListItem, Typography } from '@mui/material';
import { Link } from 'react-router-dom';


const HomePackage = () => {
    const [packages, setPackages] = useState([])
    useEffect(() => {
        fetch('https://immense-beyond-10275.herokuapp.com/packages')
            .then(res => res.json())
            .then(data =>

                setPackages(data)
            )

    }, [])

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <Container>

                    <Typography sx={{ fontWeight: 500, m: 2, color: 'success.main' }} variant="h5" component="div">
                        Our Services
                    </Typography>
                    <Typography sx={{ fontWeight: 600, m: 2 }} variant="h4" component="div">
                        Service We Provide
                    </Typography>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {
                            packages.slice(0, 6).map(service =>

                                <Grid item xs={4} sm={4} md={4} key={service._id}>

                                    <Card sx={{ minWidth: 275, height: 300, my: 5 }} >

                                        <CardMedia
                                            component="img"
                                            style={{ width: '100px', height: '60px', margin: '0 auto' }}
                                            image={service.img}

                                            alt="green iguana"
                                        />
                                        <CardContent>


                                            <Typography sx={{ m: 2 }} variant="h5" component="div">
                                                {service.name}
                                            </Typography>

                                            <Typography variant="body2">
                                                {service.description}
                                            </Typography>
                                            <Typography variant="body2">
                                                Price: ৳ {service.price}
                                            </Typography>


                                        </CardContent>

                                        <Link to={`/homeservice/${service._id}`}>
                                            <button className="btn btn-info ">Purchase now</button>

                                        </Link>
                                    </Card>
                                </Grid>

                            )
                        }

                    </Grid>
                </Container>
            </Box>
        </div>
    );
};

export default HomePackage;