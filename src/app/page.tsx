'use client'
import { useMount } from 'ahooks';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  useMount(() => {
    router.push('/chess');
  });
  return null;
}
