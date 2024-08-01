import type { NextAuthConfig } from 'next-auth';
import google from 'next-auth/providers/google';
import facebook from 'next-auth/providers/facebook';
import Credentials from 'next-auth/providers/credentials';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    jwt: async ({token, user}) => {
      if(user) {
        token.roles = user.roles
      }
      return Promise.resolve(token);
    },
    session: async ({session, token}) => {
      if(token) {
        session.user = {...session.user, roles: token.roles}
      }
      return Promise.resolve(session)
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const user = isLoggedIn ? auth.user: null;
      const isOnDashboard = nextUrl.pathname.startsWith('/cuentas/dashboard');
      const isNotDashboard = nextUrl.pathname.startsWith('/cuentas/usuario');
      const isCheckout = nextUrl.pathname.startsWith('/carrito_de_comparas/pago');

      const excluePath = nextUrl.pathname.startsWith('/cuentas/registrarse') || nextUrl.pathname.startsWith('/cuentas/recuperar_cuenta')

      if (!isLoggedIn && excluePath) return true;
      if(!isLoggedIn) return false;

      // TODO ------------------------
      
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [
    google,
    facebook,
    Credentials({})
  ], // Add providers with an empty array for now
} satisfies NextAuthConfig;