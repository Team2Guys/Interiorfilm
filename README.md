This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
  


     {data.map((product, index) => {
       const options = lengthOptions(
        product.totalStockQuantity || 0
      );
      return (
        <div
        className="p-2 rounded-md mt-5 bg-white shadow block md:hidden"
        key={index}
      >
        <div className="space-y-2">
          <div className="flex gap-3">
            <div className="relative">
              <div className="bg-gray p-1 rounded-md">
                <Image
                  className="w-20 h-20 bg-contain"
                  width={80}
                  height={80}
                  src={product.imageUrl[0]?.imageUrl || product.imageUrl}
                  alt="Product"
                />
              </div>
              <div className="absolute -top-2 -right-2">
                <div
                  onClick={() => showDeleteConfirm(index)}
                  className="bg-white shadow h-5 w-5 rounded-full cursor-pointer"
                >
                  <IoCloseSharp size={20} />
                </div>
              </div>
            </div>
            <div className="space-y-1 w-8/12">
              <h1 className="text-14 font-semibold">
                {typeof product.name === "string" ? product.name : ""}
              </h1>
              <p>
                AED
                <span>
                  {pathName === "/wishlist"
                    ? product.discountPrice
                      ? product.discountPrice * (counts[index] || 1)
                      : product.price * (counts[index] || 1)
                    : product.discountPrice
                    ? product.discountPrice
                    : product.price}
                </span>
                .00
              </p>
              <div className="flex">
                <div
                  onClick={() => decrement(index)}
                  className="h-7 w-7 bg-[#E7E7EF] hover:bg-[#F0EFF2] flex justify-center items-center"
                >
                  <RxMinus size={20} />
                </div>
                <div className="h-7 w-7 bg-[#F0EFF2] hover:bg-[#E7E7EF] flex justify-center items-center">
                  <input
                    className="h-7 w-8 text-center"
                    type="text"
                    min={1}
                    max={100}
                    disabled
                    value={counts[index] || 1}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div
                  onClick={() => increment(index)}
                  className="h-7 w-7 bg-[#E7E7EF] hover:bg-[#F0EFF2] flex justify-center items-center"
                >
                  <RxPlus size={20} />
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <ProductSelect
                  className="w-[70%] h-10 border outline-none shipment text-20"
                  onChange={(value) => handleLengthChange(index, value)}
                  options={options}
                  defaultValue={`1.22 x ${
                    lengths[index] || product.length
                  } METERS`}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <h1 className="font-bold">Total: </h1>
            {pathName === "/wishlist" ? (
              <Button
                onClick={() => addToCart(product, index)}
                className="px-4 rounded-md"
                title={"Add To Cart"}
              />
            ) : (
              <p>
                AED
                <span>
                  {product.discountPrice
                    ? product.discountPrice *
                      (counts[index] || 1) *
                      (lengths[index] || product.length)
                    : product.price *
                      (counts[index] || 1) *
                      (lengths[index] || product.length)}
                </span>
                .00
              </p>
            )}
          </div>
        </div>
      </div>
      );
    })}