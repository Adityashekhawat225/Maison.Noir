import Nav from "../Components/Nav";
// import LuxuryBags from "../Components/LuxuryBags";
import HeroSlider from "../Components/HeroSlider";
import MaisonCollection from "../Components/MaisonCollection";
import LuxuryVideos from "../Components/FeaturedVideo";
import ExclusiveMaisonCollection from "../Components/MaisonNoirExclusive"
import LimitedAddition from "../Components/LimitedAddition";
import EarlyExcessBags from "../Components/EarlyExcessBags";
import Latest from "../Components/LimitedWomenCollection";
import LatestLuxury from "../Components/Latest_Once";

import Footer from "../Components/Footer";


export default function Home() {
    return (
        <>
            <Nav />
            {/* <LuxuryBags /> */}
            <HeroSlider />
            <MaisonCollection />
            <LuxuryVideos />
            <ExclusiveMaisonCollection/>
            <LimitedAddition/>
            <EarlyExcessBags/>
            <Latest/>
            <LatestLuxury/>
            <Footer/>
            </>
    )
}