import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
const privatePaths = ['/me']
const authPath = ['/login','/register']

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl
  const sessionToken = request.cookies.get('sessionToken')?.value
  console.log(sessionToken)

  //Check nếu chưa đăng nhập thì không cho vào private path
  if(privatePaths.some(path=> pathname.startsWith(path)) && !sessionToken ){
    return NextResponse.redirect(new URL('/login', request.url))
  }
  

  //Check nếu đăng nhập rồi thì không cho vào login/register nữa
  if(authPath.some(path=> pathname.startsWith(path)) && sessionToken ){
    return NextResponse.redirect(new URL('/me', request.url))
  }

  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/login','/register','/me']
};