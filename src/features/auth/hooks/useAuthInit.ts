// import { useLayoutEffect } from 'react';
// import { useAuth } from './useAuth';
// import { useFetch, useLocalStorage } from '@/shared/lib/hooks';
// import { useRouter } from 'next/router';

// export function useAuthInit() {
//   // const router = useRouter();
//   const { storage, removeUserData, updateUser } = useLocalStorage();
//   const { checkSession, setUser, setIsAuth } = useAuth();
//   const { getData } = useFetch();

//   const getUser = (userId: string) => {
//     return getData(`http://localhost:5000/api/user/${userId}`);
//   };

  
//   return { getUser };
// }
