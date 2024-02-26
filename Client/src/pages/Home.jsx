import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({type}) => {
  //For Fetching data from Node.js using MongoDB
  const [videos, setVideos] = useState([]);

  useEffect(() => {    //Run the function when the page loads and it refresh the videos
    const fetchVideos = async () => {
      const res = await axios.get(`/videos/${type}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [type]);

  return (
    <Container>
      {videos.map((video) => (
         <Card key={video._id} video={video}/>
      ))}
    </Container>
  );
};

export default Home;