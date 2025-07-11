import { connectionSrt } from "@/lib/db";
import { Deliverypartner } from "@/lib/model/deliverypartner";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
    const payload = await request.json();
    let success = false;
    await mongoose.connect(connectionSrt);
   const result = await Deliverypartner.findOne({ moblie: payload.moblie });
    if (!result) {
        console.log(result);
        return NextResponse.json({ message: "Mobile number not found", success: false });
    }else if (result.password !== payload.password) {
        return NextResponse.json({ message: "Password is incorrect", success: false });
    }
    success=true
    return NextResponse.json({result, success })
}