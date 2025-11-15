import OurExperts from './Home/OurExperts.jsx'
import Appoint from './Home/Appoint.jsx'
import ClientReviews from './Home/ClientReviews.jsx'
import GetInTouchSection from './Home/GetInTouch.jsx'
import Herosection from './Home/Herosection.jsx'
import WhatNew from './Home/WhatNew.jsx'

function Home() {
    return(
        <div>
            <Herosection/>
            <WhatNew/>
            <OurExperts/>
            <Appoint/>
            <ClientReviews/>
            <GetInTouchSection/>
        </div>
    );
}

export default Home;