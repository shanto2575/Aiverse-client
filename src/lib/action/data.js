import { baseUrl } from "../baseUrl"

export const FeaturedSections = async () => {
    const res = await fetch(`${baseUrl}/api/featuredSection`)
    return res.json()
}

export const getTopCreators = async () => {
    const res = await fetch(`${baseUrl}/api/top-creators`,
        {
            cache: "no-store"
        }
    );

    return res.json();
};



export const getTestimonials = async () => {
    const res = await fetch(`${baseUrl}/api/testimonials`, {
        cache: "no-store",
    });

    return res.json();
};