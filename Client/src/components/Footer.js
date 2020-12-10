import React from 'react';

function Footer() {
  return (
    <footer className="pt-3 mt-5">
        <div className="bg-dark pt-5 py-5">
            <div className="p-3"></div>
                <div className="container">
                    <div className="row ">
                        <div className="col-md-4 text-center text-md-left ">
                            <div className="py-0">
                                <p className="text-light py-4 mb-4">&copy;2020 All rights reserved</p>
                            </div>
                        </div>
                        <div className="col-md-4 text-center text-md-left ">
                            <div className="py-0">
                                <p>
                                    <span className="row col text-white font-weight-bold ">Address: No 41,peradeniya road,Kandy.</span>
                                </p>
                                    <span className="row col text-white font-weight-bold">Phone: 099 1234567</span>
                                    <span className="row col text-white font-weight-bold">Email: AUTOservice@gmail.com</span>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <span className="row col text-light" ><span className="row col text-white font-weight-bold ">About Us: </span>Our Service Centre facilitates in all necessary services which is our priority at all costs.</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>               
  )
}

export default Footer;