import ImageKit from "imagekit"
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
});

export async function GET() {

    try {
        const authParams = imagekit.getAuthenticationParameters();
        return NextResponse.json(authParams);
    } catch {
        return NextResponse.json(
            {error: "Imagekit Authentication Failed"},
            {status: 500}
        )
    }

}