
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';
import '@assets/styles/globals.css';

export const metadata = {
    title: 'Property NextJS',
    keywords: 'rental, property, houses, flats',
    description: 'find a perfect space for your vacation'
}

const MainLayout = ({ children }) => {
    return ( 
        <AuthProvider>
            <html >
                <body>
                    <Navbar/>
                    <main>
                        { children }
                    </main>
                    <Footer/>
                </body>
            </html>
        </AuthProvider>
    );
}

export default MainLayout;