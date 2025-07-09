'use client'

import SkeletonLoading from "components/Skeleton-loading/SkeletonLoading"

function Loading() {
  return (
    (
      Array.from({ length: 3 }).map((_, index) => (
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
    )
  )
}

export default Loading