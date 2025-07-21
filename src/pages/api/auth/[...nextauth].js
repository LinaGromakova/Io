import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"


export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
    //   credentials: {
    //     username: { label: 'Имя пользователя', type: 'text' },
    //     password: { label: 'Пароль', type: 'password' }
    //   },
      async authorize() {
       
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
});