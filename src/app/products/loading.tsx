'use client'
import Container from "components/Layout/Container/Container"
function Loading() {
  return (
    <Container className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-10">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex flex-col gap-4 p-2 animate-pulse">
          <div className="w-full h-[130px] sm:h-[300px] xl:h-[350px] bg-gray rounded-lg" />
          <div className="h-4 bg-gray rounded w-3/4" />
          <div className="h-4 bg-gray rounded w-1/2" />
          <div className="h-4 bg-gray rounded w-1/3" />
        </div>
      ))}
    </Container>
  )
}

export default Loading
