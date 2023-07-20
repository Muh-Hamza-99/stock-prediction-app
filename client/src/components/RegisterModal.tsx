import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import ModalHeader from "./ui/ModalHeader";
import Button from "./ui/Button";

import { setJWT, toastErrorMessage } from "../lib/utilities";
import { Authentication } from "../lib/types";
import InputGroup from "./ui/InputGroup";

type Props = {
    visible: boolean,
    onClose: () => void;
};

const RegisterModal = ({ visible, onClose }: Props) => {
  const queryClient = useQueryClient();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const registerMutation = useMutation({
    mutationKey: ["user"],
    mutationFn: (data: Authentication) => {
        return axios.post("http://localhost:5000/api/users/register", data, { withCredentials: true }).then(response => response.data);
    },
    onSuccess: (data) => {
        setJWT(data?.token);
        queryClient.invalidateQueries(["user"]);
        window.location.reload();
    },
    onError: (error) => toastErrorMessage(error),
  });

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    registerMutation.mutate({ username, password });
    setUsername("");
    setPassword("");
    onClose();
  };

  if (!visible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
        <div className="w-2/5">
            <div className="bg-white p-4 flex flex-col rounded-lg">
                <ModalHeader title="Register" description="Create a new account and start predicting stock prices!" onClose={onClose} />
                <div className="w-full">
                    <form className="w-full flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                        <InputGroup name="Username" inputType="text" state={username} handleChange={event => setUsername((event.target as HTMLButtonElement).value)} />
                        <InputGroup name="Password" inputType="password" state={password} handleChange={event => setPassword((event.target as HTMLButtonElement).value)} />
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

export default RegisterModal;