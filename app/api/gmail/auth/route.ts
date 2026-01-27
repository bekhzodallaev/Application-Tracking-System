import { NextResponse } from "next/server";
import { oauth2Client } from "@/app/lib/gmail";

export async function GET() {
    
    const authorizeUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt:'consent',
        scope:['https://www.googleapis.com/auth/gmail.readonly'],
    })
    return NextResponse.redirect(authorizeUrl);
}

