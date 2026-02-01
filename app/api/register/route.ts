import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';
import { ApiError } from 'next/dist/server/api-utils';

export async function POST(req: NextRequest) {
    const body = await req.json();
    try {
        const apiRes = await api.post('auth/register', body);
        return NextResponse.json(apiRes.data)
    }
    catch (error) {
    return NextResponse.json(
      {
        error: (error as ApiError).response?.data?.error ?? (error as ApiError).message,
      },
      { status: (error as ApiError).status }
    )
  }
}  
// хз что у нас apiError