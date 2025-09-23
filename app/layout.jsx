
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '@assets/styles/globals.css';

// Components:

export const metadata = {
    title: 'Property NextJS',
    keywords: 'rental, property, houses, flats',
    description: 'find a perfect space for your vacation'
}

const MainLayout = ({ children }) => {
    return ( 
        <html >
            <body>
                <Navbar/>
                <main>
                    { children }
                </main>
                <Footer/>
            </body>
        </html>
    );
}

export default MainLayout;