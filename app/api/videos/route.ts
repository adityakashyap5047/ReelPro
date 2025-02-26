import { connectDB } from "@/lib/db";
import Video from "@/models/Video";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        
        await connectDB();

        const videos = await Video.find({}).sort({createdAt: -1}).lean()
        if(!videos || videos.length === 0){
            return NextResponse.json([], {status: 200})
        }

        return NextResponse.json(videos);
    } catch{
        return NextResponse.json(
            {error: "Failed to fetch videos"},
            {status: 500}
        )
    }
}