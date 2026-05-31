import axios from "axios";
import { useEffect, useState } from "react";
import "../Styles/video.css";

export default function LuxuryVideos() {

    const [videos, setVideos] = useState([]);

    useEffect(() => {

        const getVideos = async () => {

            try {

                const { data } = await axios.get(
                    "http://localhost:5000/api/v1/products"
                );

                // sirf watch videos
                const watchVideos = data.filter(
                    (product) =>
                        product.image.includes(".mp4") &&
                        product.category === "luxury watches"
                );

                setVideos(watchVideos);

            } catch (error) {
                console.log(error);
            }
        };

        getVideos();

    }, []);

    return (

        <div className="videos-section">

            <div className="videos-container">

                {videos.map((video) => (

                    <div
                        key={video._id}
                        className="video-card"
                    >

                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                        >
                            <source
                                src={video.image}
                                type="video/mp4"
                            />
                        </video>

                    </div>

                ))}

            </div>

        </div>
    );
}