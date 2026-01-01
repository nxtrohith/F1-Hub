'use server';
import connectToDatabase from "../mongodb";
import { Event, EventDoc } from "@/database/event.model";
export const getSimilarEventsBySlug = async (slug: string) => {
    try{
        await connectToDatabase();
        const event = await Event.findOne({slug});
        if(!event) return [];

        const similarEvents = await Event.find({ _id: { $ne: event._id }, tags: { $in: event.tags } }).lean();

        return similarEvents.map((similarEvent) => ({
            ...similarEvent,
            _id: similarEvent._id?.toString(),
            id: similarEvent._id?.toString(),
        }));

    }catch(e){
        console.error('Error fetching similar events:', e);
        return [];
    }}