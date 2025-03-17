import { NextResponse } from "next/server"
import productsData from "./data.json"

export async function GET() {
  return NextResponse.json(productsData)
}

