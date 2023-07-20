type Props = {
    code: string
};

const CodeContainer = ({ code }: Props) => {
  return (
    <div className="w-full p-4 bg-gray-800 text-gray-300 font-mono rounded-lg">
        <pre>{code}</pre>
    </div>
  );
};

export default CodeContainer;