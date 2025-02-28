import { connectDB } from "@/lib/db";
import Video from "@/models/Video";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(request: NextRequest, {params}: {params: {id: string}}) {
    try {
        const id = params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { error: "Invalid video ID format" },
                { status: 400 }
            );
        }

        await connectDB();

        const video = await Video.findById(id);

        if (!video) {
            return NextResponse.json(
                { error: "Video not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(video, { status: 200 });

    } catch {
        return NextResponse.json(
            { error: "Failed to fetch video" },
            { status: 500 }
        );
    }
}
