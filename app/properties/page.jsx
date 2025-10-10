import Pagination from '@/components/Pagination';
import PropertyCard from '@/components/PropertyCard';
import connectDB from '@/config/database';
import Property from '@/models/Property';

const PropertiesPage = async ({ searchParams }) => {
    const { page = 1, pageSize = 3 } = await searchParams;
    await connectDB();

    const skip = (page - 1) * pageSize;
    const total = await Property.countDocuments({});

    const showPagination = total > pageSize;

    // const properties = await Property.find({ }).lean();
    const properties = await Property.find({ }).skip(skip).limit(pageSize);

    return ( 
        <section className='px-4 py-6'>
            <div className='container-xl lg:container m-auto px-4 py-6'>
                <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">Recent Properties</h2>

                { properties.length === 0 ? (<p>No properties found</p>) : (
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {
                            properties.map((property) => (
                                <PropertyCard key={property._id} property={property}/>
                            ))
                        }
                    </div>
                )}

                {showPagination && (
                    <Pagination page={parseInt(page)} pageSize={parseInt(pageSize)} totalItems={total} />
                )}
            </div>
        </section>
    );
}

export default PropertiesPage;
