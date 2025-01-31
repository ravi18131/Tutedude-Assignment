import React, { useEffect } from "react";
import axios from "axios";
import {Box, Card, Typography} from "@mui/material"
import { useState } from "react";

const DisplayData = () => {

    const [data, setData] = useState([]);
    useEffect(() => {
        const fatchData = async () => {
            try {
                const responce = await axios.get("https://jsonplaceholder.typicode.com/posts");
                setData(responce.data);
            } catch (e) {
                console.log("An error is Accoured !!", e);
            }
        }
        fatchData();
    }, [])
    return (
        <Box >
            {
                data.length != 0 &&
                data.map((value, index) => (
                    <Card key={index} className="box" >
                        <Typography>{value.id}</Typography>
                        <h3>{value.title}</h3>
                        <Typography>{value.body}</Typography>
                    </Card>
                )
                )
            }

        </Box>
    )
}

export default DisplayData;