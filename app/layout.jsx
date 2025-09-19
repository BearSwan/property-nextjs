
import '@assets/styles/globals.css';

export const metadata = {
    title: 'Property NextJS',
    keywords: 'rental, property, houses, flats',
    description: 'find a perfect space for your vacation'
}

const MainLayout = ({ children }) => {
    return ( 
        <html >
            <body>
                <main>
                    { children }
                </main>
            </body>
        </html>
    );
}

export default MainLayout;