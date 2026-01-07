import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  IndianRupee,
  Search,
  Filter,
  Plus,
  Clock,
  CheckCircle,
  AlertTriangle,
  Mic
} from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { VoiceReminderButton } from "@/components/VoiceReminderButton";
import { ReminderCard } from "@/components/ReminderCard";
import { useToast } from "@/hooks/use-toast";
import { Reminder } from "@/types";

const Payments = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: "1",
      customerName: "अमित शर्मा",
      amount: "₹2,500",
      dueDate: "Today",
      phone: "+91 98765 43210",
      status: "overdue" as const,
      originalText: "Send Amit 2500 rupees reminder for today",
      createdAt: new Date().toISOString()
    },
    {
      id: "2",
      customerName: "प्रिया कुमार",
      amount: "₹1,200",
      dueDate: "Tomorrow",
      phone: "+91 87654 32109",
      status: "pending" as const,
      originalText: "Send Priya 1200 rupees reminder for tomorrow",
      createdAt: new Date().toISOString()
    }
  ]);

  const handleReminderCreated = (reminder: Reminder) => {
    setReminders(prev => [reminder, ...prev]);
  };

  const handleMarkPaid = (id: string) => {
    setReminders(prev => prev.map(r =>
      r.id === id ? { ...r, status: 'paid' } : r
    ));
    toast({
      title: "Payment Recorded",
      description: "Reminder marked as paid successfully.",
    });
  };

  const handleDeleteReminder = (id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
    toast({
      title: "Reminder Deleted",
      description: "Payment reminder has been removed.",
    });
  };

  const filteredReminders = reminders.filter(reminder => {
    const matchesSearch = reminder.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reminder.amount.includes(searchTerm);
    const matchesFilter = filterStatus === "all" || reminder.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusStats = () => {
    const pending = reminders.filter(r => r.status === 'pending').length;
    const overdue = reminders.filter(r => r.status === 'overdue').length;
    const paid = reminders.filter(r => r.status === 'paid').length;
    const total = reminders.length;

    return { pending, overdue, paid, total };
  };

  const { pending, overdue, paid, total } = getStatusStats();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />

        <main className="flex-1 overflow-auto">
          {/* Header */}
          <header className="bg-white dark:bg-card border-b border-border p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Payment Reminders</h1>
                  <p className="text-muted-foreground">Manage customer payment reminders with voice commands</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-primary-muted text-primary">
                <IndianRupee className="w-3 h-3 mr-1" />
                {total} Active
              </Badge>
            </div>
          </header>

          <div className="p-4 lg:p-6 space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Reminders</p>
                      <p className="text-2xl font-bold">{total}</p>
                    </div>
                    <div className="bg-primary-muted p-3 rounded-lg">
                      <IndianRupee className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Pending</p>
                      <p className="text-2xl font-bold text-warning">{pending}</p>
                    </div>
                    <div className="bg-warning/10 p-3 rounded-lg">
                      <Clock className="w-6 h-6 text-warning" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Overdue</p>
                      <p className="text-2xl font-bold text-destructive">{overdue}</p>
                    </div>
                    <div className="bg-destructive/10 p-3 rounded-lg">
                      <AlertTriangle className="w-6 h-6 text-destructive" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Paid</p>
                      <p className="text-2xl font-bold text-success">{paid}</p>
                    </div>
                    <div className="bg-success/10 p-3 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-success" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Voice Reminder Section */}
            <Card className="bg-gradient-card border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mic className="w-5 h-5" />
                  Create Voice Payment Reminder
                </CardTitle>
                <CardDescription>
                  Speak naturally: "Send [Customer Name] a [Amount] reminder for [Date]"
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VoiceReminderButton onReminderCreated={handleReminderCreated} variant="lg" />
              </CardContent>
            </Card>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="search">Search Reminders</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search by customer name or amount..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="filter">Filter by Status</Label>
                <div className="flex gap-2">
                  {['all', 'pending', 'overdue', 'paid'].map((status) => (
                    <Button
                      key={status}
                      variant={filterStatus === status ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterStatus(status)}
                      className="capitalize"
                    >
                      {status}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Reminders List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Payment Reminders ({filteredReminders.length})</h2>
                <Button variant="outline" size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Manual Reminder
                </Button>
              </div>

              {filteredReminders.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Mic className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">No reminders found</h3>
                    <p className="text-muted-foreground mb-4">
                      {searchTerm || filterStatus !== 'all'
                        ? "Try adjusting your search or filter criteria."
                        : "Create your first payment reminder using voice commands above."
                      }
                    </p>
                    <Button variant="gradient" className="gap-2">
                      <Mic className="w-4 h-4" />
                      Create Voice Reminder
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredReminders.map((reminder) => (
                    <ReminderCard
                      key={reminder.id}
                      reminder={reminder}
                      onMarkPaid={handleMarkPaid}
                      onDelete={handleDeleteReminder}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Payments;