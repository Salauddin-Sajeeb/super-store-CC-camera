import React from 'react';
import Footer from './Footer/Footer';
import HomePackage from './Home Service/homeService';
import Banner from './Navigation/Banner/Banner';
import Navigation from './Navigation/Navigation';
import Reviews from './Review/Reviews';

const Home = () => {
    return (
        <div>
            <Navigation></Navigation>
            <Banner></Banner>
            <HomePackage></HomePackage>
            <Reviews></Reviews>
            <Footer></Footer>
        </div>
    );
};

export default Home;