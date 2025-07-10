'use client'

import Container from "components/Layout/Container/Container"
import SkeletonLoading from "components/Skeleton-loading/SkeletonLoading"

function Loading() {
  return (
  <Container className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 gap-2 mt-10">
      {
      Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="gap-10 flex flex-col">
          <SkeletonLoading
            avatar={{
              shape: "square",
              size: 280,
              className: "w-full flex flex-col",
            }}
            title={false}
            style={{ flexDirection: "column" }}
            paragraph={{ rows: 2 }}
            className="gap-10 flex"
            active={true}
          />
        </div>
      ))
    }
  </Container>
  )
}

export default Loading