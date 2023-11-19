import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function AllTravelDestination() {
const [data, setdata] = useState([]);
let navigate = useNavigate()
let handleDelete = async(id)=>{
        try {
           let res = await axios.delete(`https://www.melivecode.com/api/attractions/${id}`)
           console.log(res);
           if (res.status===200)
           {
            getData()
           } 
        } catch (error) {
            console.log(error)
        }

    }

let getData = async()=>{
    try {
        let res = await axios.get('https://www.melivecode.com/api/attractions')
        setdata(res.data)

    } catch (error) {
        console.log(error) 
    }
}
useEffect(()=>{
    getData()
},[])

  return (
    <Container sx={{ mt: 5 }} disableGutters>
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        TRAVAL DESTINATION LIST
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {data.map(e => {
          return (
            <Box sx={{ margin: "30px 10px 0px 0px" }}>
              
            <Card
                    sx={{
                      maxWidth: 245,
                      margin: { lg: "10px", md: "10px", xs: "auto" },
                      mb: { xs: 5 }
                    }}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={e.coverimage}
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {e.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          DETAILS - {e.detail}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Latitude - {e.latitude}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                          Longitude - {e.longitude}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          status - {e.status}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                    <Button variant="contained" color="primary" onClick={()=>navigate(`/add-travel/${e.id}`)}>
                    <i className="fas fa-pen-to-square"></i>Edit</Button>
                    &nbsp;
                    &nbsp;
                    <Button variant="contained" color="error" onClick={()=>handleDelete(e.id)}>
                    <i className="fas fa-trash"></i>Delete</Button>
                    </CardActions>
                  </Card>
                  
            </Box>
          );
        })}
      </Box>
    </Container>
  )
}

export default AllTravelDestination;