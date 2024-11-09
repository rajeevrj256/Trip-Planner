import { GoogleGenerativeAI } from "@google/generative-ai";


const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};


export const chatSession = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for a Couple with a Cheap budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image URL, geo coordinates, rating, descriptions, and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON formate" },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n{\n  \"hotels\": [\n    {\n      \"hotelName\": \"The D Las Vegas\",\n      \"hotelAddress\": \"301 Fremont Street, Las Vegas, NV 89101\",\n      \"price\": \"$50-$100 per night\",\n      \"hotelImageURL\": \"https://www.thed.com/assets/images/header-images/hero-background-the-d.jpg\",\n      \"geoCoordinates\": \"36.1699, -115.1423\",\n      \"rating\": 4.0,\n      \"description\": \"A historic downtown hotel with a retro vibe, offering affordable rooms, a casino, and a lively atmosphere.\"\n    },\n    {\n      \"hotelName\": \"Golden Nugget Las Vegas\",\n      \"hotelAddress\": \"129 E Fremont St, Las Vegas, NV 89101\",\n      \"price\": \"$70-$150 per night\",\n      \"hotelImageURL\": \"https://www.goldennugget.com/las-vegas/media/images/hero-images/hero-image-mobile.jpg\",\n      \"geoCoordinates\": \"36.1696, -115.1425\",\n      \"rating\": 4.5,\n      \"description\": \"A luxurious downtown hotel with a focus on entertainment, featuring a casino, a pool with a shark tank, and dining options.\"\n    },\n    {\n      \"hotelName\": \"Circus Circus Hotel & Casino\",\n      \"hotelAddress\": \"2880 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"price\": \"$40-$80 per night\",\n      \"hotelImageURL\": \"https://www.circuscircus.com/media/images/hero-images/hero-image-mobile.jpg\",\n      \"geoCoordinates\": \"36.1120, -115.1722\",\n      \"rating\": 3.5,\n      \"description\": \"A classic Las Vegas hotel with a circus theme, offering affordable rooms, a casino, and family-friendly attractions.\"\n    }\n  ],\n  \"itinerary\": [\n    {\n      \"day\": 1,\n      \"theme\": \"Downtown Exploration\",\n      \"plan\": [\n        {\n          \"placeName\": \"Fremont Street Experience\",\n          \"placeDetails\": \"A pedestrian mall with a canopy of lights and street performers, offering a vibrant atmosphere.\",\n          \"placeImageURL\": \"https://www.fremontstreetexperience.com/media/images/hero-images/hero-image-mobile.jpg\",\n          \"geoCoordinates\": \"36.1699, -115.1423\",\n          \"ticketPricing\": \"Free\",\n          \"rating\": 4.5,\n          \"time\": \"Evening (after sunset)\"\n        },\n        {\n          \"placeName\": \"The Mob Museum\",\n          \"placeDetails\": \"A museum dedicated to organized crime, showcasing exhibits on notorious gangsters and the history of Las Vegas.\",\n          \"placeImageURL\": \"https://www.themobmuseum.org/media/images/hero-images/hero-image-mobile.jpg\",\n          \"geoCoordinates\": \"36.1716, -115.1432\",\n          \"ticketPricing\": \"$20-$30\",\n          \"rating\": 4.0,\n          \"time\": \"Afternoon\"\n        },\n        {\n          \"placeName\": \"Pinball Hall of Fame\",\n          \"placeDetails\": \"A museum dedicated to pinball machines, featuring over 200 vintage and modern games.\",\n          \"placeImageURL\": \"https://www.pinballhall.com/uploads/images/gallery/image-11353.jpg\",\n          \"geoCoordinates\": \"36.1704, -115.1418\",\n          \"ticketPricing\": \"$10-$15\",\n          \"rating\": 4.0,\n          \"time\": \"Early evening\"\n        }\n      ]\n    },\n    {\n      \"day\": 2,\n      \"theme\": \"Strip Exploration\",\n      \"plan\": [\n        {\n          \"placeName\": \"Bellagio Fountains\",\n          \"placeDetails\": \"A spectacular water show synchronized to music, held every 15 minutes in the evenings.\",\n          \"placeImageURL\": \"https://www.bellagio.com/content/dam/mgmresorts/bellagio/images/hero-images/bellagio-fountains-hero-image-mobile.jpg\",\n          \"geoCoordinates\": \"36.1103, -115.1722\",\n          \"ticketPricing\": \"Free\",\n          \"rating\": 4.5,\n          \"time\": \"Evening\"\n        },\n        {\n          \"placeName\": \"The LINQ Promenade\",\n          \"placeDetails\": \"An outdoor shopping and dining area with a High Roller observation wheel.\",\n          \"placeImageURL\": \"https://www.caesars.com/linq/media/images/hero-images/hero-image-mobile.jpg\",\n          \"geoCoordinates\": \"36.1098, -115.1727\",\n          \"ticketPricing\": \"$20-$30 for High Roller\",\n          \"rating\": 4.0,\n          \"time\": \"Afternoon\"\n        },\n        {\n          \"placeName\": \"MGM Grand Garden Arena\",\n          \"placeDetails\": \"A large arena hosting concerts, sporting events, and other shows.\",\n          \"placeImageURL\": \"https://www.mgmgrand.com/content/dam/mgmresorts/mgmgrand/images/hero-images/mgm-grand-garden-arena-hero-image-mobile.jpg\",\n          \"geoCoordinates\": \"36.1095, -115.1730\",\n          \"ticketPricing\": \"Varies depending on event\",\n          \"rating\": 4.0,\n          \"time\": \"Evening\"\n        }\n      ]\n    },\n    {\n      \"day\": 3,\n      \"theme\": \"Free Activities & Local Flavor\",\n      \"plan\": [\n        {\n          \"placeName\": \"Red Rock Canyon National Conservation Area\",\n          \"placeDetails\": \"A scenic canyon with hiking trails and rock formations.\",\n          \"placeImageURL\": \"https://www.nps.gov/redr/learn/photosmultimedia/web-photos.htm\",\n          \"geoCoordinates\": \"36.1931, -115.2426\",\n          \"ticketPricing\": \"Free entry\",\n          \"rating\": 4.5,\n          \"time\": \"Morning\"\n        },\n        {\n          \"placeName\": \"The Neon Museum\",\n          \"placeDetails\": \"A museum dedicated to vintage neon signs from Las Vegas' history.\",\n          \"placeImageURL\": \"https://www.neonmuseum.org/tours/\",\n          \"geoCoordinates\": \"36.1685, -115.1467\",\n          \"ticketPricing\": \"$20-$30\",\n          \"rating\": 4.0,\n          \"time\": \"Afternoon\"\n        },\n        {\n          \"placeName\": \"Local Food Market\",\n          \"placeDetails\": \"Explore a local food market for a taste of authentic Las Vegas flavors. (Downtown Container Park or Arts District)\",\n          \"placeImageURL\": \"https://www.containerpark.com/events/\",\n          \"geoCoordinates\": \"36.1682, -115.1472\",\n          \"ticketPricing\": \"Free entry\",\n          \"rating\": 4.0,\n          \"time\": \"Evening\"\n        }\n      ]\n    }\n  ]\n}\n```\n\n**Please note:**\n\n* This itinerary is a suggestion and can be customized based on your preferences and interests.\n* Hotel prices are approximate and may vary depending on the season and availability.\n* Ticket prices are subject to change.\n* It's recommended to book hotels and attractions in advance, especially during peak seasons.\n* Consider utilizing public transportation or rideshare services to navigate Las Vegas.\n* Take advantage of free activities and attractions, such as the Bellagio Fountains, Fremont Street Experience, and Red Rock Canyon.\n* Pack comfortable shoes and clothing, as you'll be doing a lot of walking.\n* Stay hydrated and apply sunscreen, especially during the day.\n* Have fun and enjoy your trip!" },
            ],
        },
    ],
});
