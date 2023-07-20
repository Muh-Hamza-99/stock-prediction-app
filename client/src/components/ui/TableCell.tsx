type Props = {
    children: React.ReactNode,
    className?: string
};

const TableCell = ({ children, className }: Props) => {
  return (
    <td className={`p-2 ${className}`}>{children}</td>
  );
};

export default TableCell;