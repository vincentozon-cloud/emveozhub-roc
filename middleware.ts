// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // SIMULATION: In a real AWS environment, this would check a JWT or Session cookie
  const userRole = request.cookies.get('user-role')?.value as string || 'guest';

  // Protect the ROC Dashboard
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (userRole === 'guest') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};