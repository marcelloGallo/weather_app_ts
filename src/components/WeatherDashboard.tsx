import { useState, useEffect, FormEvent } from "react";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Trash2, Eye, Loader2 } from "lucide-react";
import WeatherCard, { weatherInterface } from "./WeatherCard";

const API_URL = "http://localhost:8000/api";

// Define types for City and WeatherData
interface City {
  _id: string;
  name: string;
  createdAt: string;
}

function WeatherDashboard() {
  // Add types to state variables
  const [cities, setCities] = useState<City[]>([]);
  const [newCity, setNewCity] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [weatherData, setWeatherData] = useState<weatherInterface | null>(null);
  const [deleteCity, setDeleteCity] = useState<City | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await fetch(`${API_URL}/cities`);
      const data: City[] = await response.json();
      setCities(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch cities",
        variant: "destructive",
      });
    }
  };

  const handleAddCity = async (e: FormEvent) => {
    e.preventDefault();
    if (!newCity.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/cities`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCity }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      await fetchCities();
      setNewCity("");
      toast({
        title: "Success",
        description: "City added successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewWeather = async (city: City) => {
    setSelectedCity(city);
    try {
      const response = await fetch(`${API_URL}/cities/${city._id}/weather`);
      const data: weatherInterface = await response.json();
      setWeatherData(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch weather data",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCity = async () => {
    if (!deleteCity) return;

    try {
      await fetch(`${API_URL}/cities/${deleteCity._id}`, {
        method: "DELETE",
      });
      await fetchCities();
      setDeleteCity(null);
      toast({
        title: "Success",
        description: "City deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete city",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleAddCity} className="flex gap-4">
        <Input
          placeholder="Enter city name"
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
          className="max-w-sm"
        />
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Add City
        </Button>
      </form>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>City</TableHead>
              <TableHead>Added Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cities.map((city) => (
              <TableRow key={city._id}>
                <TableCell className="font-medium">{city.name}</TableCell>
                <TableCell>
                  {new Date(city.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleViewWeather(city)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeleteCity(city)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={!!selectedCity}
        onOpenChange={() => {
          setSelectedCity(null);
          setWeatherData(null);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Weather in {selectedCity?.name}</DialogTitle>
          </DialogHeader>
          {weatherData && <WeatherCard weather={weatherData} />}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteCity} onOpenChange={() => setDeleteCity(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {deleteCity?.name} from your cities.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCity}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default WeatherDashboard;
