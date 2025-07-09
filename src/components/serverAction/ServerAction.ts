'use server';

import { revalidateTag as revalidate } from 'next/cache';

async function revalidateTagHanlder(name: string) {
  revalidate(name);
}

export default revalidateTagHanlder;
