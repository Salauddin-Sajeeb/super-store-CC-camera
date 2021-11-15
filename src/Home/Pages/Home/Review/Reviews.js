
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { Container } from 'react-bootstrap';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';



const Reviews = () => {
    const [reviews, setReview] = useState([])
    useEffect(() => {
        fetch('https://immense-beyond-10275.herokuapp.com/reviews')
            .then(res => res.json())
            .then(data => setReview(data))
    }, [])


    return (


        <Box sx={{ flexGrow: 1 }}>

            <Container>

                <Typography sx={{ fontWeight: 500, m: 2, color: 'success.main' }} variant="h5" component="div">
                    Our Customer Reviews
                </Typography>

                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {
                        reviews.map(review =>


                            <Grid item xs={4} sm={4} md={3} key={review._id}>

                                <Card sx={{ minWidth: 275, height: 200, my: 2 }}>


                                    <CardContent>

                                        <Typography sx={{ m: 2 }} variant="h5" component="div">
                                            Reviewer: {review.name}
                                        </Typography>

                                        <Typography variant="body2">
                                            Description: {review.description}
                                        </Typography>
                                        <Typography variant="body2">

                                        </Typography>
                                    </CardContent>



                                </Card>
                            </Grid>

                        )

                    }

                </Grid>
            </Container>
        </Box>
    );
}



export default Reviews;