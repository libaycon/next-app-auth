import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
    interface User {
        roles: {
            id: number
            name: String
        }[]
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        roles: User['roles']
    }
}