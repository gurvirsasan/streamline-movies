import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '../styles/Home.module.css';

import PocketBase from 'pocketbase';
import axios from 'axios';

const inter = Inter({ subsets: ['latin'] });

const getToken = async () => {
  const pb = new PocketBase('http://127.0.0.1:8090');
  const authData = await pb.admins.authWithPassword(
    'gurvirsasan@gmail.com',
    'Legend13##'
  );
  return authData.token;
};

const fetchAllUsers = async (token: string) => {
  if (token === '') return [];

  const res: any = await axios.get(
    'http://127.0.0.1:8090/api/collections/users/records',
    {
      headers: { Authorization: 'Bearer ' + token },
    }
  );
  console.log(res);
  const usersList: any[] = res.data.items;
  return usersList;
};

export default function Home(props: any) {
  const { users } = props;

  return (
    <>
      <h1>HOME</h1>
      {users?.map((user: any, index: number) => (
        <p key={index}>{user.email}</p>
      ))}
    </>
  );
}

export async function getServerSideProps() {
  const token = await getToken();
  const users = await fetchAllUsers(token);
  return {
    props: { users },
  };
}
