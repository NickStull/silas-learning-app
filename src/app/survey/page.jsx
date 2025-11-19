"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Minus, X, PlusCircle, ArrowLeft } from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E2"];

const DEFAULT_OPTIONS = [
  { id: 1, name: "Fish", count: 0 },
  { id: 2, name: "Pizza", count: 0 },
  { id: 3, name: "Cheeseburgers", count: 0 },
  { id: 4, name: "Tacos", count: 0 },
];

// Custom Tooltip Component for better visibility
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg shadow-xl p-3">
        <p className="font-bold text-gray-900 dark:text-white text-base mb-1">{label}</p>
        <p className="text-gray-700 dark:text-gray-200 text-sm">
          Votes: <span className="font-bold text-lg">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function SurveyPage() {
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [newOption, setNewOption] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("surveyData");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setOptions(parsed);
      } catch (error) {
        console.error("Error loading saved data:", error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save data to localStorage with debouncing to avoid lag
  useEffect(() => {
    if (isLoaded) {
      const timeoutId = setTimeout(() => {
        localStorage.setItem("surveyData", JSON.stringify(options));
      }, 300); // Wait 300ms after last change before saving

      return () => clearTimeout(timeoutId);
    }
  }, [options, isLoaded]);

  const incrementCount = (id) => {
    setOptions(options.map((opt) => (opt.id === id ? { ...opt, count: opt.count + 1 } : opt)));
  };

  const decrementCount = (id) => {
    setOptions(
      options.map((opt) => (opt.id === id ? { ...opt, count: Math.max(0, opt.count - 1) } : opt))
    );
  };

  const removeOption = (id) => {
    if (options.length > 1) {
      setOptions(options.filter((opt) => opt.id !== id));
    }
  };

  const addOption = () => {
    if (newOption.trim()) {
      const newId = Math.max(...options.map((o) => o.id), 0) + 1;
      setOptions([...options, { id: newId, name: newOption.trim(), count: 0 }]);
      setNewOption("");
    }
  };

  const totalVotes = options.reduce((sum, opt) => sum + opt.count, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-3 sm:p-4 md:p-8 pb-8">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
        {/* Back Button */}
        <Link href="/">
          <Button variant="outline" size="lg" className="active:scale-95 transition-transform">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back Home
          </Button>
        </Link>

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            📊 Silas' Survey Lab
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 px-2">
            What should we have for dinner? Let's collect votes and see the results!
          </p>
        </div>

        {/* Survey Options */}
        <Card className="shadow-xl">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-xl sm:text-2xl">Survey Options</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Click + to add a vote, - to remove a vote.<br className="sm:hidden" /> Total votes: <span className="font-bold text-base sm:text-lg">{totalVotes}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            {options.map((option, index) => (
              <div
                key={option.id}
                className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-lg border-2 transition-shadow hover:shadow-md"
                style={{ borderColor: COLORS[index % COLORS.length] }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 sm:w-4 sm:h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-base sm:text-xl font-semibold truncate">{option.name}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                  <Button
                    onClick={() => decrementCount(option.id)}
                    size="icon"
                    className="h-12 w-12 sm:h-14 sm:w-14 rounded-full active:scale-90 transition-transform bg-red-500 hover:bg-red-600 text-white shadow-lg disabled:bg-gray-300 disabled:text-gray-500"
                    disabled={option.count === 0}
                  >
                    <Minus className="h-6 w-6 sm:h-7 sm:w-7 stroke-[3]" />
                  </Button>
                  <span className="text-2xl sm:text-3xl font-bold min-w-[2.5rem] sm:min-w-[3rem] text-center">
                    {option.count}
                  </span>
                  <Button
                    onClick={() => incrementCount(option.id)}
                    size="icon"
                    className="h-12 w-12 sm:h-14 sm:w-14 rounded-full active:scale-90 transition-transform bg-green-500 hover:bg-green-600 text-white shadow-lg"
                  >
                    <Plus className="h-6 w-6 sm:h-7 sm:w-7 stroke-[3]" />
                  </Button>
                  {options.length > 1 && (
                    <Button
                      onClick={() => removeOption(option.id)}
                      variant="destructive"
                      size="icon"
                      className="h-10 w-10 sm:h-12 sm:w-12 rounded-full ml-1 sm:ml-2 active:scale-90 transition-transform shadow-lg"
                    >
                      <X className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  )}
                </div>
              </div>
            ))}

            {/* Add New Option */}
            <div className="flex flex-col sm:flex-row gap-2 pt-3 sm:pt-4 border-t">
              <Input
                placeholder="Add a new option..."
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addOption()}
                className="text-base sm:text-lg h-12"
              />
              <Button onClick={addOption} size="lg" disabled={!newOption.trim()} className="w-full sm:w-auto h-12 active:scale-95 transition-transform">
                <PlusCircle className="h-5 w-5 mr-2" />
                <span className="whitespace-nowrap">Add Option</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Charts */}
        {totalVotes > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {/* Bar Chart */}
            <Card className="shadow-xl">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-lg sm:text-xl">📊 Bar Chart</CardTitle>
                <CardDescription className="text-sm">Compare votes side by side</CardDescription>
              </CardHeader>
              <CardContent className="px-2 sm:px-6">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={options} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12 }}
                      interval={0}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="count" name="Votes" radius={[8, 8, 0, 0]}>
                      {options.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Pie Chart */}
            <Card className="shadow-xl">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-lg sm:text-xl">🥧 Pie Chart</CardTitle>
                <CardDescription className="text-sm">See the percentage breakdown</CardDescription>
              </CardHeader>
              <CardContent className="px-2 sm:px-6">
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={options.filter((opt) => opt.count > 0)}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => {
                        const percentage = (percent * 100).toFixed(0);
                        return window.innerWidth < 640 ? `${percentage}%` : `${name}: ${percentage}%`;
                      }}
                      outerRadius={window.innerWidth < 640 ? 80 : 100}
                      fill="#8884d8"
                      dataKey="count"
                      style={{ fontSize: window.innerWidth < 640 ? '12px' : '14px' }}
                    >
                      {options.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                {/* Legend for mobile */}
                <div className="grid grid-cols-2 gap-2 mt-4 sm:hidden">
                  {options.filter((opt) => opt.count > 0).map((option, index) => (
                    <div key={option.id} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-xs truncate">{option.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Line Chart */}
            <Card className="shadow-xl">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-lg sm:text-xl">📈 Line Chart</CardTitle>
                <CardDescription className="text-sm">Track the trend of votes</CardDescription>
              </CardHeader>
              <CardContent className="px-2 sm:px-6">
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={options} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12 }}
                      interval={0}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="count"
                      name="Votes"
                      stroke="#8884d8"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Horizontal Bar Chart */}
            <Card className="shadow-xl">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-lg sm:text-xl">📊 Horizontal Bar Chart</CardTitle>
                <CardDescription className="text-sm">Another way to compare votes</CardDescription>
              </CardHeader>
              <CardContent className="px-2 sm:px-6">
                <ResponsiveContainer width="100%" height={Math.max(200, options.length * 50)}>
                  <BarChart data={options} layout="vertical" margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tick={{ fontSize: 12 }} />
                    <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="count" name="Votes" radius={[0, 8, 8, 0]}>
                      {options.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {totalVotes === 0 && (
          <Card className="shadow-xl">
            <CardContent className="py-8 sm:py-12">
              <div className="text-center space-y-2 px-4">
                <p className="text-xl sm:text-2xl">👆 Start voting to see the charts!</p>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Click the + buttons above to add votes and watch the graphs appear
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

