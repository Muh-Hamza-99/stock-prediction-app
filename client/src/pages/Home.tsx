import PageContainer from "../components/ui/PageContainer";

const Home = () => {
  return (
    <PageContainer>
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <h1 className="text-7xl text-blue-500 font-extrabold">S&P500 Prediction API</h1>
        <span className="mt-4 font-lg text-gray-600">Predictions for the most trending and popular stocks in the world!</span>
      </div>
    </PageContainer>
  );
};

export default Home;