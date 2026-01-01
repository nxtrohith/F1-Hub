import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Event } from "@/database/event.model";
import { v2 as cloudinary } from 'cloudinary';

export async function POST(req: NextRequest){
    try{
        await connectToDatabase();

        const formData = await req.formData();

        let rawEvent: Record<string, FormDataEntryValue>;

        try{
            rawEvent = Object.fromEntries(formData.entries()) as Record<string, FormDataEntryValue>;
        }catch{
            return NextResponse.json({message: 'Invalid JSON form data'}, {status: 400});
        }

        // Parse and validate capacity
        const capacityRaw = formData.get('capacity');
        const capacity = typeof capacityRaw === 'string' ? Number(capacityRaw) : null;
        if (capacity == null || !Number.isFinite(capacity) || capacity < 0) {
            return NextResponse.json({ message: 'Valid non-negative capacity is required' }, { status: 400 });
        }

        const event: Record<string, any> = {
            ...(rawEvent as Record<string, any>),
            capacity,
        };

        const file = formData.get('image') as File;

        if(!file) return NextResponse.json({message: 'Image file is required'}, {status: 400});


        const tags = JSON.parse(formData.get('tags') as string);

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'image', folder: 'events' }, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }).end(buffer);
        });

        event.image = (uploadResult as {secure_url: string}).secure_url;

        const createdEvent = await Event.create({
            ...event,
            tags: tags,
        });

        return NextResponse.json({message: 'Event Created Successfully', event: createdEvent}, {status: 201});    }catch(error){
        console.log(error);
        return NextResponse.json({message: 'Event Creation failed', error: error instanceof Error ? error.message : 'Unknown Error'}, {status: 500});
    }
}

export async function GET() {
    try{
        await connectToDatabase();

        const events = await Event.find().sort({createdAt: -1});
        return NextResponse.json({message: 'Events fetched successfully', events}, {status: 200});
    } catch(e){
        return NextResponse.json({message: 'Failed to fetch events', error: e instanceof Error ? e.message : 'Unknown Error'}, {status: 500});
    }
}

//route that accepts a slug as input -> returns the event with that slug