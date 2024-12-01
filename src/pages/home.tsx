import { Toaster } from "@/components/ui/toaster";
import WeatherDashboard from "@/components/WeatherDashboard";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Weather Dashboard
        </h1>
        <WeatherDashboard />
      </div>
      <Toaster />
    </div>
  );
}

export default Home;
