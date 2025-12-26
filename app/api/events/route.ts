import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Event } from "@/database/event.model";

export async function POST(req: NextRequest){
    try{
        await connectToDatabase();

        const formData = await req.formData();

        let event;

        try{
            event = Object.fromEntries(formData.entries());
        }catch(e){
            return NextResponse.json({message: 'Invalid JSON form data'}, {status: 400});
        }

        const createdEvent = await Event.create(event);

        return NextResponse.json({message: 'Event Created Successfully', event: createdEvent, status: 201});
    }catch(error){
        console.log(error);
        return NextResponse.json({message: 'Event Creation failed', error: error instanceof Error ? error.message : 'Unknown Error'}, {status: 500});
    }
}