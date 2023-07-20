import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import ModalHeader from "./ui/ModalHeader";
import Button from "./ui/Button";

import { getJWT, toastErrorMessage } from "../lib/utilities";
import InputGroup from "./ui/InputGroup";

type Props = {
    visible: boolean,
    onClose: () => void;
};

const KeyModal = ({ visible, onClose }: Props) => {
  const [label, setLabel] = useState("");
  const queryClient = useQueryClient();

  const keyMutation = useMutation({
    mutationKey: ["key"],
    mutationFn: (label: string) => {
        return axios.post("http://localhost:5000/api/keys", { label }, { withCredentials: true, headers: { "Authorisation": `Bearer ${getJWT()}` } }).then(response => response.data);
    },
    onSuccess: () => queryClient.invalidateQueries(["user"]),
    onError: (error) => toastErrorMessage(error),
  });

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    keyMutation.mutate(label);
    setLabel("");
    onClose();
  };

  if (!visible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
        <div className="w-2/5">
            <div className="w-full bg-white p-4 flex flex-col rounded-lg">
                <ModalHeader title="Create a key" description="Create a new key and starting predicting stock prices!" onClose={onClose} />
                <div className="w-full">
                    <form className="w-full flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                        <InputGroup name="Label" inputType="text" state={label} handleChange={event => setLabel((event.target as HTMLButtonElement).value)} />
                        <div className="w-full flex justify-end">
                            <Button variant="fill">Submit</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
};

export default KeyModal