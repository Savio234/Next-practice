import { signUpSchema } from "@/types/forms";
import { NextResponse } from "next/server";
import toast from "react-hot-toast";

export async function POST(request: Request) {
    const body: unknown = await request.json();

    const result = signUpSchema.safeParse(body)
    let zodErrors = {}
    if (!result?.success) {
        result?.error?.issues.map((issue: any) =>
            zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
        )
    }

    return NextResponse.json(
        Object.keys(zodErrors).length > 0 ? {
            errors: zodErrors
        } : {
            success: true
        }
    )
}