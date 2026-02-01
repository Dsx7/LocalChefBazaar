import React from 'react';
import errorImg from '../../assets/errorImg.png';
import Container from '../Layout/Container';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Errorpage = () => {
    return (
        <>
        <title>Error - 404 | LocalChefBazaar</title>
            <section className='bg-neutral py-10'>
                <Container>
                    <div className='flex items-center bg-white rounded-lg text-secondary justify-evenly py-10 flex-col md:flex-row'>
                        <img className='w-[400px]' src={errorImg} alt="" />
                        <div className='w-[350px] space-y-4'>
                            <h2 className='font-semibold text-secondary text-lg md:text-xl'>
                                This Page is Not Found.
                            </h2>
                            <h2 className='text-2xl md:text-4xl'>
                                We are very sorry for error. We  <span className='text-primary'>can’t find this</span> page.
                            </h2>
                            <a className='btn border-none shadow-none text-secondary bg-primary' href='/'>
                                Back To Home
                            </a>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
};

export default Errorpage;