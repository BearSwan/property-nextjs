import BookmarkButton from "@/components/BookmarkButton";
import PropertyContactForm from "@/components/PropertyContactForm";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyImages from "@/components/PropertyImages";
import ShareButtons from "@/components/ShareButtons";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { convertToSerializibleObject } from "@/utils/covertToObject";
import Link from "next/link";
import { FaArrowLeft } from 'react-icons/fa'

const propertyPage = async ({ params }) => {
    const { id } = await params;

    await connectDB();
    const propertyDoc = await Property.findById(id).lean();
    // Single object
    const property = convertToSerializibleObject(propertyDoc);

    if (!property) {
        return (
            <h1 className="text-center text-2xl font-bold mt-10">Property not found</h1>
        )
    }

    return (
        <>
            <PropertyHeaderImage image={property.images[0]} />
            <section>
                <div className="container m-auto py-6 px-6">
                    <Link
                    href="/properties"
                    className="text-blue-500 hover:text-blue-600 flex items-center"
                    >
                        <FaArrowLeft className="mr-2" />
                        Back to Properties
                    </Link>
                </div>
            </section>
            <section className="bg-blue-50">
                <div className="container m-auto py-10 px-6">
                    {/* add md:grid-cols-70/30 custom class to tailwind.config */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 w-full gap-6">
                        <PropertyDetails property={property}/>
                        <aside className="space-y-4">
                            <BookmarkButton property={property} />
                            <ShareButtons property={property} />
                            <PropertyContactForm property={property} />
                        </aside>
                    </div>
                </div>
            </section>
            <PropertyImages images={ property.images } />
        </>
    );
}

export default propertyPage;