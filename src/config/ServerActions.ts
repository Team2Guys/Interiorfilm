"use server";

import { revalidateTag as revalidate } from "next/cache";

async function revalidateTag_handler(name:string) {
    revalidate(name);
}

export default revalidateTag_handler;