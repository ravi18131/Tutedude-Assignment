import React, { useEffect, useState } from "react";

import Header from "../../Components/Header/index";
import Footer from "../../Components/Footer/index";
import GetInTouch from "../../Components/GetInTouch/GetInTouch";
import FriendProfileCard from "../../Components/FriendProfileCard/Profile";

const FriendProfile = () => {
    const user = localStorage.getItem("user");
    const parseUserData = JSON.parse(user);
    return (
        <>
            <Header />
            <FriendProfileCard />
            {!parseUserData && <GetInTouch />}
            <Footer />
        </>
    );
};

export default FriendProfile;


// import React, { useState } from "react";
// import RecommendedFriendsList from "../../Components/RecommendationCard/index";
// import {
//     Box
// } from "@mui/material";
// const MockRecommendations = [
//     {
//         username: "john_doe",
//         avatar: "https://via.placeholder.com/60",
//         bio: "Loves photography and hiking.",
//         mutualFriends: 5,
//     },
//     {
//         username: "jane_smith",
//         avatar: "https://via.placeholder.com/60",
//         bio: "Passionate about cooking and art.",
//         mutualFriends: 8,
//     },
//     {
//         username: "robert_brown",
//         avatar: "",
//         bio: "Enjoys tech and programming.",
//         mutualFriends: 2,
//     },
// ];

// const Dashboard = () => {
//     const [recommendations, setRecommendations] = useState(MockRecommendations);

//     const handleConnect = (username) => {
//         console.log(`Connect request sent to ${username}`);
//         // Add API call here to send a friend request
//     };

//     return (
//         <Box sx={{ p: 3 }}>
//             <RecommendedFriendsList
//                 recommendations={recommendations}
//                 onConnect={handleConnect}
//             />
//         </Box>
//     );
// };

// export default Dashboard;
