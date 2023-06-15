import React from 'react';

type Props = {
  columns: string[];
  rowBuilder: () => React.ReactNode;
  footer?: () => React.ReactNode;
};

export const TableBuilder = ({ columns, rowBuilder, footer }: Props) => {
  return (
    <table className="min-w-full">
      <thead>
        <tr className="sticky top-0 bg-gray-200 text-left text-gray-800 text-sm font-semibold">
          {columns.map((c, i) => (
            <th key={i} className="p-2 uppercase border">{c}</th>
          ))}
        </tr>
      </thead>
      <tbody className='bg-white divide-y divide-gray-200'>
        {rowBuilder()}
      </tbody>
      {footer &&
        <tfoot>
          <tr className="sticky bottom-0 text-left bg-gray-200 text-gray-800 text-sm font-semibold">
            {footer()}
          </tr>
        </tfoot>
      }
    </table>
  );
};