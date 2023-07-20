type Props = {
    name: string
    inputType: string
    state: any
    handleChange: (event: React.SyntheticEvent) => void
};

const InputGroup = ({ name, inputType, state, handleChange }: Props) => {
  return (
    <div className="my-2 w-full flex justify-between items-center">
        <label className="mr-8 w-1/5">{name}</label>
        <input tabIndex={-1} required className="w-4/5 rounded-xl p-2 outline-none border-[1px] border-blue-500" value={state} onChange={handleChange} type={inputType} />
    </div>
  );
};

export default InputGroup;