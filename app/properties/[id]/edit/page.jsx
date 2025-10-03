import PropertyEditForm from "@/components/PropertyEditForm";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { convertToSerializibleObject } from "@/utils/covertToObject";

const PropertyEditPage = async ({ params }) => {
    await connectDB();

    const propertyDoc = await Property.findById(params.id).lean();
    const property = convertToSerializibleObject(propertyDoc);

    if (!property) {
        return <h1>Property Not Found</h1>
    }

    return ( 
        <section className="bg-blue-50">
            <div className="m-auto max-2xl py-24">
                <div className="bg-white px-6 py-8 -mb-4 shadowmd rounded-md m-4 mb:m-0">
                    <PropertyEditForm property={property} />
                </div>
            </div>
        </section>
    );
}

export default PropertyEditPage;