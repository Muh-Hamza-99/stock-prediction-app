type Props = {
    children: React.ReactNode
};

const PageContainer = ({ children }: Props) => {
  return (
    <div className="my-2 flex justify-center w-full">
        <div className="w-4/5">
          {children}
        </div>
    </div>
  );
};

export default PageContainer;