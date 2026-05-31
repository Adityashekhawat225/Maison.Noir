import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";

import "../Styles/swiper.css";

export default function HeroSlider() {
  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      navigation={true}
      autoplay={{
        delay: 3500,
      }}
      loop={true}
      className="heroSwiper"
    >
      {/* WATCHES */}
      <SwiperSlide>
        <div className="hero_slide">
          <img
            src="https://res.cloudinary.com/dzcaerfu7/image/upload/v1778392904/redd-francisco-bmYKlg8tfjE-unsplash_qyu5wx.jpg"
            alt=""
          />

          <div className="hero_content">
            <h1>Timeless Watches</h1>

            <p>
              Precision-crafted timepieces inspired by iconic elegance.
            </p>

            <Link to="/watches" className="hero_btn">
              Discover Timepieces
            </Link>
          </div>
        </div>
      </SwiperSlide>

      {/* BAGS */}
      <SwiperSlide>
        <div className="hero_slide">
          <img
            src="https://res.cloudinary.com/dzcaerfu7/image/upload/v1778393400/muneeb-malhotra-BCVP-yE089g-unsplash_dmtpxe.jpg"
            alt=""
          />

          <div className="hero_content">
            <h1>Designer Bags</h1>

            <p>
              Signature handbags crafted for modern sophistication.
            </p>

            <Link to="/bags-wallets" className="hero_btn">
              Explore Collection
            </Link>
          </div>
        </div>
      </SwiperSlide>

      {/* MEN */}
      <SwiperSlide>
        <div className="hero_slide">
          <img
            src="https://res.cloudinary.com/dzcaerfu7/image/upload/v1778393373/dokyung-kim-MjOrtUZL29o-unsplash_k9hsvm.jpg"
            alt=""
          />

          <div className="hero_content">
            <h1>Men's Prestige</h1>

            <p>
              Refined fashion designed for modern gentlemen.
            </p>

            <Link to="/men" className="hero_btn">
              Shop Fashion
            </Link>
          </div>
        </div>
      </SwiperSlide>

      {/* PERFUMES */}
      <SwiperSlide>
        <div className="hero_slide">
          <img
            src="https://res.cloudinary.com/dzcaerfu7/image/upload/v1778397467/0xk-qfOafEABN94-unsplash_itrefd.jpg"
            alt=""
          />

          <div className="hero_content">
            <h1>Signature Scents</h1>

            <p>
              Elegant fragrances blended with timeless notes.
            </p>

            <Link to="/perfumes" className="hero_btn">
              Explore Fragrances
            </Link>
          </div>
        </div>
      </SwiperSlide>

      {/* JEWELLERY */}
      <SwiperSlide>
        <div className="hero_slide">
          <img
            src="https://res.cloudinary.com/dzcaerfu7/image/upload/v1778393079/kateryna-hliznitsova-ceSCZzjTReg-unsplash_hwcgsu.jpg"
            alt=""
          />

          <div className="hero_content">
            <h1>Diamond Atelier</h1>

            <p>
              Fine jewellery crafted with elegance and brilliance.
            </p>

            <Link to="/jewellery" className="hero_btn">
              View Collection
            </Link>
          </div>
        </div>
      </SwiperSlide>

      {/* WOMEN */}
      <SwiperSlide>
        <div className="hero_slide">
          <img
            src="https://res.cloudinary.com/dzcaerfu7/image/upload/v1778393243/freestocks-_3Q3tsJ01nc-unsplash_ufrcpt.jpg"
            alt=""
          />

          <div className="hero_content">
            <h1>Women's Couture</h1>

            <p>
              Sophisticated silhouettes inspired by Parisian fashion.
            </p>

            <Link to="/women" className="hero_btn">
              Explore Fashion
            </Link>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}