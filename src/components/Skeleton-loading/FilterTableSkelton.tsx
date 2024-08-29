import React from 'react';
import { Skeleton } from 'antd';

const FilterTableSkeleton: React.FC = () => {
  const columns = 6; // Adjust based on your actual number of columns
  const rows = 5; // Adjust based on your actual number of rows

  return (
    <div className="mt-10">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            {/* <tr>
              {Array.from({ length: columns }).map((_, index) => (
                <th key={index} className="p-2 bg-slate-200">
                  <Skeleton.Input style={{ width: 200,height:50 }} active size="small" />
                </th>
              ))}
            </tr> */}
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <td key={colIndex} className="p-2 ml-4">
                    <Skeleton.Input style={{ width: 200 }} active size="small" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FilterTableSkeleton;
