type Props = {
    color?: string
    children: React.ReactNode
};

const Badge = ({ color, children }: Props) => {
  return (
    <span className={`inline-block py-1 px-2 rounded-md text-white m-[0.5rem] ${color}`}>
        {children}
    </span>
  );
};

export default Badge;