import { useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaCopy } from "react-icons/fa";
import CodeEditor from "@uiw/react-textarea-code-editor";
import axios from "axios";

import PageContainer from "../components/ui/PageContainer";
import TableHead from "../components/ui/TableHead";
import Icon from "../components/ui/Icon";
import Problem from "../components/messages/Problem";
import Loading from "../components/messages/Loading";
import NotAuthenticated from "../components/messages/NotAuthenticated";
import RequestTableBody from "../components/RequestTableBody";

import { copyToClipboard, getJWT, isAuthenticated } from "../lib/utilities";
import Button from "../components/ui/Button";

const KeyDetails = () => {
  const authenticated = isAuthenticated();
  if (!authenticated) return (<NotAuthenticated />);

  const [requestMessage, setRequestMessage] = useState("Try out the endpoint using the button above!");
  const urlRef = useRef<HTMLSpanElement>(null);
  const queryClient = useQueryClient();
  const { keyId } = useParams();

  const getKeyQuery = useQuery({
    queryKey: ["keys", keyId],
    queryFn: () => {
        return axios.get(`http://localhost:5000/api/keys/${keyId}`, { headers: { "Authorisation": `Bearer ${getJWT()}` }}).then(response => response.data);
    },
  });

  const handleGetPrediction = async () => {
    try {
      setRequestMessage("Loading...this may take a while...");
      const { data } = await axios.get(`http://localhost:5000/api/keys/${keyId}/predict?stockName=AAPL&daysFromNow=1`, { headers: { "Authorisation": `Bearer ${getJWT()}` }});
      setRequestMessage(JSON.stringify(data));
    } catch (error) {
      console.log(error)
    } finally {
      queryClient.invalidateQueries(["keys", keyId])
    };
  };

  const deleteKeyMutation = useMutation({
    mutationKey: ["key"],
    mutationFn: (keyId: string) => {
      return axios.delete(`http://localhost:5000/api/keys/${keyId}`, { withCredentials: true, headers: { "Authorisation": `Bearer ${getJWT()}` } }).then(response => response.data);
    },
    onSuccess: () => queryClient.invalidateQueries(["user"]),
    onError: () => toast.error("Something went wrong!")
  });

  const handleDeleteKey = (keyId: string) => {
    deleteKeyMutation.mutate(keyId);
    window.location.href="/my-account";
  };

  if (getKeyQuery.isLoading) return (<Loading />);
  if (getKeyQuery.isError) return (<Problem />);
  return ( 
    <PageContainer>
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold mb-2">{getKeyQuery.data.key?.label}</h2>
            <button className="py-2 px-4 bg-red-500 text-white rounded-xl hover:bg-red-600" onClick={() => handleDeleteKey(getKeyQuery.data.key?.id)}>Delete Key</button>
        </div>
        <div className="w-full flex justify-between items-center p-2 my-2 border-2 rounded-xl">
              <span ref={urlRef} className="font-mono text-sm text-gray-600">{`http://localhost:5000/api/keys/${getKeyQuery.data.key?.id}/predict?stockName={string}&daysFromNow={integer}`}</span>
              <Icon onClick={() => copyToClipboard(urlRef.current?.innerText)} color="blue" icon={ FaCopy } />
        </div>
        <div className="w-full flex flex-col border-collapse mb-8">
          { getKeyQuery.data.key?.requests.length === 0 ? (<span>You have no requests with this key.</span>) : (
            <div className="w-full">
              <TableHead columns={["ID", "Message", "Status Code", "URL", "Auth Header", "Query", "Sent At"]} />
              <RequestTableBody rows={getKeyQuery.data.key?.requests} />
            </div>
          )}
        </div>
        <div className="w-full flex mb-8">
          <CodeEditor value={`const { data } = axios\n    .get('http://localhost:5000/api/keys/455k0z0oz35/predict?stockName=AAPL&daysFromNow=1',\n    headers: { 'Authorisation': 'Bearer <SECRET_API_KEY>' });\n\n//SECRET_API_KEY=${getJWT()}\n// Don't share this with anyone!\n\nconsole.log(data);`} language="js" style={{ fontSize: 16, borderRadius: 10, width: "50%" }} />
          <div className="w-1/2 mx-2 flex flex-col">
            <div className="w-full flex justify-end mb-2">
              <Button variant="fill" onClick={handleGetPrediction}>Request!</Button>
            </div>
            <CodeEditor value={requestMessage} language="json" style={{ fontSize: 16, borderRadius: 10 }} />
          </div>
        </div>
    </PageContainer>
  );
};

export default KeyDetails;