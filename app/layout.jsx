
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';
import '@assets/styles/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalProvider } from '@/context/GlobalContext';


export const metadata = {
    title: 'Property NextJS',
    keywords: 'rental, property, houses, flats',
    description: 'find a perfect space for your vacation'
}

const MainLayout = ({ children }) => {
    return (
        <AuthProvider>
            <GlobalProvider>
                <html >
                    <body>
                        <Navbar/>
                        <main>
                            { children }
                        </main>
                        <Footer/>
                        <ToastContainer />
                    </body>
                </html>
            </GlobalProvider>
        </AuthProvider>
    );
}

export default MainLayout;