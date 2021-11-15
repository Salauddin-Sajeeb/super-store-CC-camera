import React from 'react';
import './banner.css'


const Banner = () => {
    return (
        <div>
            <div className="banner  d-flex justify-content-center align-items-center">
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 col-sm-12">

                            <button className="btn-dark px-2 py-1">Shop now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;