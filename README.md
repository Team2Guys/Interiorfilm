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


          <DrawerMenu
            showDrawer={showDrawer}
            onClose={onClose}
            open={open}
            className="float-end"
            width={300}
            title={
              <>
                <div className="flex md:hidden mt-5 underline gap-2 items-center">
                  <IoFunnelOutline size={20} />
                  Filters{" "}
                </div>
              </>
            }
            content={
              <div className="space-y-2">
                <div className="p-2 bg-secondary">
                  <Collapse title="All Categories">
                    <ul className="px-1 pt-2 space-y-1">
                      {category?.map((item, index) => (
                        <li key={index}>
                          <Link href={"/"}>{item.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </Collapse>
                </div>
                  <div className="p-2 bg-secondary">
                  <Collapse title="Availability">
                  <Radio.Group onChange={onChange} value={value}>
                  <Space direction="vertical">
                    <Radio checked={inStockOnly} onChange={handleInStockChange} value={1}>In Stock</Radio>
                    <Radio checked={outOfStockOnly} onChange={handleOutOfStockChange} value={2}>Out Of Stock</Radio>
                    </Space>
                  </Radio.Group>
                  </Collapse>
                </div>
                <div className="p-2 bg-secondary">
                  <Collapse title="Filter Price">
                    <div className='flex gap-2'>
                      <Input
                        className='h-10'
                        placeholder='From'
                        type='number'
                        value={priceRange.from === Infinity ? '' : priceRange.from}
                        onChange={(e) => handlePriceChange('from', Number(e.target.value))}
                      />
                      <Input
                        className='h-10'
                        placeholder='To'
                        type='number'
                        value={priceRange.to === Infinity ? '' : priceRange.to}
                        onChange={(e) => handlePriceChange('to', Number(e.target.value))}
                      />
                    </div>
                  </Collapse>
                </div>
              </div>
            }
          />