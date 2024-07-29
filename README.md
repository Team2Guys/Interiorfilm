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
   {/* {loggedInUser ? loggedInUser.fullName :
                  <p className='text-sm md:text-base'><span className='cursor-pointer' onClick={() => router.push('/login')}>Login</span>/<span className='cursor-pointer' onClick={() => router.push('/register')}>Register</span></p>
                } */}


                   <div className='sticky top-0 z-50 hidden'>

     
      <div className='bg-secondary  w-full py-3  '>
        <Container>
          <div className='flex justify-between flex-wrap lg:flex-nowrap gap-0 md:gap-2 items-center'>
            <Link href={"/"}>
              <Image className='w-14 lg:w-24' src={logo} alt="logo" width={100} height={100} />
            </Link>

            <div className='border border-gray w-3/6 lg:w-full max-w-screen-md flex'>

              <input className='w-full px-4 focus:outline-none active:border-none focus:border-none border-white' value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder='Search Product Here...' onKeyPress={handleKeyPress} />

              <Button className='rounded-l-md px-2 md:px-4' onClick={showModal} title={<IoSearch size={25} />} />
              <Modal title="" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer="" width={800}>
                <>
                  <div className='mt-8 space-y-3 mb-3'>
                    <input
                      className='w-full px-4 border h-14 rounded-md'
                      type="text"
                      placeholder='Search Product Here...'
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  {searchTerm && ( // Render products only when there is a search term
                    <div className="max-h-[400px] overflow-y-scroll  pr-2 bg-white rounded-md p-2">
                      {filteredProducts.length > 0 ? (
                        filteredProducts.map((product, index) => (
                          <Link
                            key={index}
                            href={{ pathname: `/detail/${generateSlug(product.name)}` }}
                            onClick={() => setIsModalOpen(false)}
                            className='shadow p-2 flex gap-2 mt-2 rounded-md border text-black hover:text-black border-gray hover:border-primary'
                          >
                            {product.posterImageUrl && (
                              <Image className='rounded-md' width={100} height={100} src={product.posterImageUrl.imageUrl} alt='image' />
                            )}
                            <div>
                              <p className='font-semibold text-lg md:text-xl'>{product.name}</p>
                              <p>{truncateText(product.description, 160)}</p>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <p className='text-dark dark:text-white' >No products found</p>
                      )}
                    </div>
                  )}
                </>
              </Modal>
            </div>
            <DrawerMenu
              showDrawer={showDrawer}
              onClose={onClose}
              open={open}
              width={250}
              title={<><div className='p-1 rounded-md block lg:hidden text-white bg-primary'>
                <RiMenuFold3Fill size={20} />
              </div></>}
              content={<>
                <ul className='space-y-2'>
                  <li><Link className='text-base font-semibold text-black hover:text-black' onClick={onClose} href="/">Home</Link></li>
                  <li><DrawerMenu
                      classDrawer=' back-transparent  backdrop-blur-md p-2 shadow-none'
                        className='text-base font-semibold text-black hover:text-black cursor-pointer'
                      width={500}
                      showDrawer={CategoryHandler}
                      onClose={CategoryHandlerclose}
                      open={category}
                        title={"product"}
                        content={<>
                          <Mobiletab staticConatiner='hidden bg-white'  cardClass=' rounded-md bg-white' className='color-white' />
                        </>}
                      /></li>
                  <li><Link className='text-base font-semibold text-black hover:text-black ' onClick={onClose} href="/about">About Us</Link></li>
                  <li><Link className='text-base font-semibold text-black hover:text-black' onClick={onClose} href="/contact">Contact Us</Link></li>
                </ul>
              </>}
            />
            <div className='hidden lg:flex items-center gap-2 md:gap-4 lg:gap-8'>
              <Link className='group relative' href="/wishlist">
                {WishlistItems.length > 0 ?
                  <>
                    <IoMdHeartEmpty className='text-primary group-hover:text-dark transition duration-200 ease-in' size={30} />
                    <div className='rounded-full text-white w-6 h-6 bg-dark group-hover:bg-primary absolute bottom-3 left-4 flex justify-center items-center transition duration-200 ease-in'>
                      {WishlistItems.reduce((count: any, item: any) => count + item.count, 0)}
                    </div>
                  </>
                  : <><IoMdHeartEmpty className='text-primary group-hover:text-dark transition duration-200 ease-in' size={30} /></>
                }
              </Link>

              <Link className='relative group' href="/cart">

                <PiBag className='text-primary group-hover:text-dark transition duration-200 ease-in' size={30} />
                {cartItems.length > 0 ?
                  <div className='rounded-full text-white w-6 h-6 bg-dark group-hover:bg-primary absolute bottom-3 left-4 flex justify-center items-center transition duration-200 ease-in'>
                    {cartItems.reduce((count: any, item: any) => count + item.count, 0)}
                  </div>
                  : <></>
                }
              </Link>

            {loggedInUser  ?
            <Profile/>
            :
            <Link className='text-base lg:text-lg' href="/profile">
            <FaRegUser size={25}className='text-primary'  />
            </Link>
            }
            
 
            </div>
          </div>
        </Container>
      </div>
      <div className='bg-primary py-4 hidden lg:block'>
        <ul className='flex justify-center gap-12 text-white'>
          <li><Link className='link-underline' href="/">Home</Link></li>
          <li><Popover className='cursor-pointer link-underline'  placement="bottom" trigger="hover" content={<Megamanu />} title="">
            Product
          </Popover></li>
          <li><Link className='link-underline' href="/about">About</Link></li>
          <li><Link className='link-underline' href="/contact">Contact</Link></li>
        </ul>
      </div>
      </div>
      <div className='bg-primary p-3 fixed w-full bottom-0 block lg:hidden z-50'>
        <div className='flex justify-evenly gap-4'>
          <Link className='text-base lg:text-lg' href="/"><MdOutlineHome size={30} className='text-white' /></Link>

          <Link className='group relative' href="/wishlist">
            {WishlistItems.length > 0 ?
              <>
                <IoMdHeartEmpty className='text-white transition duration-200 ease-in' size={30} />
                <div className='rounded-full text-dark w-6 h-6 bg-white absolute bottom-3 left-4 flex justify-center items-center transition duration-200 ease-in'>
                  {WishlistItems.reduce((count: any, item: any) => count + item.count, 0)}
                </div>
              </>
              : <><IoMdHeartEmpty className='text-white transition duration-200 ease-in' size={30} /></>
            }
          </Link>

          <Link className='relative group' href="/cart">

            <PiBag className='text-white transition duration-200 ease-in' size={30} />
            {cartItems.length > 0 ?
              <div className='rounded-full text-dark w-6 h-6 bg-white absolute bottom-3 left-4 flex justify-center items-center transition duration-200 ease-in'>
                {cartItems.reduce((count: any, item: any) => count + item.count, 0)}
              </div>
              : <></>
            }
          </Link>


            <Link className='text-base lg:text-lg' href="/profile">
            
            {loggedInUser  ?
            <Profile/>
            :
                        <FaRegUser size={25} className='text-white' />


            
            }
            
            </Link>
        </div>
      </div>