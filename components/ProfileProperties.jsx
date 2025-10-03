'use client'

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import deleteProperty from "@/app/actions/deleteProperty";
import { toast } from "react-toastify";

const ProfileProperties = ({properties:initialProperties}) => {
    const [properties, setProperties] = useState(initialProperties)

    const handleDeleteProperty = async (propertyId) => {
        const confirm = window.confirm('Are you sure you want to delete this property?');

        if (!confirm) {
            return
        }

        await deleteProperty(propertyId);

        const updatedProperties = properties.filter((property) => property._id !== propertyId);

        setProperties(updatedProperties);

        window.scrollTo({ top: 0, behavior: 'smooth' });
        toast.success('Property deleted successfully');
    }

    return properties.map((property, index) => (
        <div className="mb-10" key={index}>
            <Link href={`/properties/${property._id}`}>
                <Image
                    className="h-32 w-full rounded-md object-cover"
                    src={property.images[0]}
                    alt="Property 1"
                    width={800}
                    height={400}
                    priority={true}
                />
            </Link>
            <div className="mt-2">
            <p className="text-lg font-semibold">{property.name}</p>
            <p className="text-gray-600">{property.location.street} {property.location.city} {property.location.state}</p>
            </div>
            <div className="mt-2">
            <Link
                href={`/properties/${property._id}/edit`}
                className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
            >
                Edit
            </Link>
            <button
                className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                type="button"
                onClick={ () => handleDeleteProperty(property._id)}
            >
                Delete
            </button>
            </div>
        </div>
    ))
}

export default ProfileProperties;
