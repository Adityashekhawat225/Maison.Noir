import {
  Gem,
  ShieldCheck,
  Globe,
  Sparkles
} from "lucide-react";
import "../Styles/about.css";

export default function About() {
  return (
    <div className="about-container">

      {/* Hero */}

      <section className="about-hero">

        <div className="hero-overlay"></div>

        <div className="hero-content">

          <p>MAISON.NOIR</p>

          <h1>
            TIMELESS <br />
            LUXURY
          </h1>

          <span>
            Crafted with elegance, inspired by luxury,
            designed for modern sophistication.
          </span>

        </div>

      </section>


      {/* Story */}

      <section className="about-story">

        <div className="story-image">

          <img
            src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b"
            alt=""
          />

        </div>

        <div className="story-content">

          <p>OUR STORY</p>

          <h2>
            Luxury Beyond Fashion
          </h2>

          <span>

            Maison.Noir represents elegance,
            timeless fashion and premium quality.

            Our vision is simple —
            create products that feel exclusive,
            luxurious and unforgettable.

          </span>

        </div>

      </section>



      {/* Features */}


      <section className="about-features">


        <div className="feature-card">

          <Gem size={30} />

          <h3>Premium Craft</h3>

          <p>
            Finest luxury materials with perfect details.
          </p>

        </div>



        <div className="feature-card">

          <ShieldCheck size={30} />

          <h3>Luxury Quality</h3>

          <p>
            Carefully inspected premium collections.
          </p>

        </div>



        <div className="feature-card">

          <Globe size={30} />

          <h3>Worldwide</h3>

          <p>
            Delivering luxury around the world.
          </p>

        </div>



        <div className="feature-card">

          <Sparkles size={30} />

          <h3>Timeless</h3>

          <p>
            Luxury style with modern design.
          </p>

        </div>


      </section>



      {/* Quote */}


      <section className="luxury-quote">

        <h1>

          Luxury is not created. <br />

          It is experienced.

        </h1>

      </section>


    </div>
  );
}