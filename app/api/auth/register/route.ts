import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(request: NextRequest) {
    
    try {
        const {email, password} = await request.json();

        if(!email || !password){
            return NextResponse.json(
                {error: "Email and Password are required"},
                {status: 400}
            )
        }

        await connectDB();

        const existingUser = await User.findOne({email});

        if(existingUser){
            return NextResponse.json(
                {error: "Email is already registered"},
                {status: 400}
            )
        }

        await User.create({
            email,
            password
        })

        return NextResponse.json(
            {message: "User registered successfully"},
            {status: 201}
        )
    } catch{
        return NextResponse.json(
            {error: "Failed to register User"},
            {status: 500}
        )
    }
}