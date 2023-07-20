type Props = {
    columns: string[]
};

const TableHead = ({ columns }: Props) => {
  if (!columns || columns.length === 0) return null;
  return (
    <thead className="border-t-[1px] border-b-[1px]">
        <tr>{ columns.map(column => <th className="text-left tracking-tight p-2">{column}</th>) }</tr>
    </thead>
  );
};

export default TableHead;