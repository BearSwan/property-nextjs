// import PropertyCard from '@/components/PropertyCard';
// import properties from '@/properties.json'

import PropertyAddForm from "@/components/PropertyAddForm";

const AddPropertyPage = () => {
    return ( 
        <section className="bg-blue-50">
            <div className="container m-auto max-w-2xl py-24">
                <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m4 md:m-0">
                    <PropertyAddForm />
                </div>
            </div>
        </section>
    );
}

export default AddPropertyPage;