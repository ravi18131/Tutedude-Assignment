// src/components/RecommendationSlider.js

import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import RecommendationCard from "./RecommendationCard";
import { fetchDataFromApi } from "../../utils/api"; // Replace with your API function

const RecommendationSlider = () => {
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await fetchDataFromApi("/api/recommendations"); // Replace with your API endpoint
                setRecommendations(response); // Assuming response is an array of recommended items
            } catch (error) {
                console.error("Error fetching recommendations:", error);
            }
        };

        fetchRecommendations();
    }, []);

    return (
        <Box display="flex" justifyContent="center" mt={4}>
            <Box width="100%">
                <Box className="d-flex align-items-center mb-4">
                    <div className="info">
                        <Typography variant="h5" mb={1}>
                            Featured Recommendations
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Do not miss connecting with your recommended friends!
                        </Typography>
                    </div>
                </Box>
                {/* Recommendation Slider */}
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    navigation={false}
                    loop={true}
                    className="recommendation-slider"
                    centeredSlides={false}
                    // modules={[Autoplay]}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    breakpoints={{
                        200: {
                            slidesPerView: 1,
                        },
                        500: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                    }}
                >
                    {recommendations?.length > 0 &&
                        recommendations.map((item, index) => (
                            <SwiperSlide key={index}>
                                <RecommendationCard item={item} />
                            </SwiperSlide>
                        ))}
                </Swiper>
            </Box>
        </Box>
    );
};

export default RecommendationSlider;