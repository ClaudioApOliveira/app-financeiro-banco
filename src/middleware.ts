"use serve";

import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  try {
    // Obter o token de sessão
    const session = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    const { pathname } = req.nextUrl;    

    // Função para redirecionamento
    const redirectToSignin = () =>
      NextResponse.redirect(new URL("/api/auth/signin", req.url));

    // Caso o usuário esteja autenticado e tente acessar a página de login, redireciona para a home
    if (session && pathname.startsWith("/signin")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Liberar acesso ao /cadastro para todos os usuários (não importa se autenticado ou não)
    if (pathname.startsWith("/cadastro")) {
      return NextResponse.next();
    }

    // Se o usuário não estiver autenticado e tentar acessar qualquer rota que não seja a de login ou /cadastro, redireciona para o login
    if (!session && pathname !== "/signin") {
      return redirectToSignin();
    }

    // Permitir que a requisição continue para a página de login ou qualquer outra página autorizada
    return NextResponse.next();
  } catch (error) {
    console.error("Erro ao obter o token de sessão:", error);
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"], // Aplica o middleware a todas as rotas, exceto as listadas
};
