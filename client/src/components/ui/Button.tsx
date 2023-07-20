type Props = {
    children: React.ReactNode
    variant: "outline" | "fill"
    onClick?: () => void
    rounded?: boolean
};

const Button = ({ children, variant, onClick, rounded }: Props) => {
  return (
    <button tabIndex={-1} onClick={onClick} className={`mx-2 border-2 border-blue-500 transition-all duration-100 ease-linear ${ variant === "outline" ? "bg-white text-blue-500 hover:bg-blue-500 hover:text-white" : "bg-blue-500 text-white hover:bg-white hover:text-blue-500" } ${ rounded ? "rounded-full p-2" : "rounded-lg px-4 py-2" }`}>
        {children}
    </button>
  );
};

export default Button;