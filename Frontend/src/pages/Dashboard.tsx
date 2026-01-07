import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, IndianRupee, AlertTriangle, Mic, FileText, MessageCircle, Package, Users, Calendar, BarChart3, Menu } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { VoiceReminderButton } from "@/components/VoiceReminderButton";
import { ReminderCard } from "@/components/ReminderCard";
import { useToast } from "@/hooks/use-toast";
import { Reminder } from "@/types";
const Dashboard = () => {
  const [isListening, setIsListening] = useState(false);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const {
    toast
  } = useToast();
  const stats = [{
    title: "Today's Sales",
    value: "₹15,240",
    change: "+12%",
    isPositive: true,
    icon: IndianRupee,
    description: "15 transactions"
  }, {
    title: "This Week",
    value: "₹89,530",
    change: "+8%",
    isPositive: true,
    icon: TrendingUp,
    description: "89 transactions"
  }, {
    title: "Pending Payments",
    value: "₹12,400",
    change: "5 customers",
    isPositive: false,
    icon: AlertTriangle,
    description: "Due this week"
  }, {
    title: "Low Stock Items",
    value: "8",
    change: "Action needed",
    isPositive: false,
    icon: Package,
    description: "Items below threshold"
  }];
  const quickActions = [{
    title: "Voice Add Inventory",
    description: "Add products using voice commands",
    icon: Mic,
    action: () => setIsListening(!isListening),
    variant: "gradient" as const,
    isActive: isListening
  }, {
    title: "Generate Invoice",
    description: "Create new bill for customer",
    icon: FileText,
    action: () => { },
    variant: "hero" as const
  }, {
    title: "Send Payment Reminder",
    description: "WhatsApp reminder to customers",
    icon: MessageCircle,
    action: () => { },
    variant: "success" as const
  }, {
    title: "View Reports",
    description: "Business insights and analytics",
    icon: BarChart3,
    action: () => { },
    variant: "premium" as const
  }];
  const recentActivity = [{
    type: "sale",
    customer: "Rajesh Kumar",
    amount: "₹1,250",
    time: "10 min ago"
  }, {
    type: "payment",
    customer: "Priya Sharma",
    amount: "₹850",
    time: "25 min ago"
  }, {
    type: "inventory",
    customer: "Stock Added",
    amount: "20 items",
    time: "1 hour ago"
  }, {
    type: "reminder",
    customer: "Amit Singh",
    amount: "Payment reminder sent",
    time: "2 hours ago"
  }];
  const handleVoiceCommand = () => {
    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false);
      // Here would be actual voice processing
    }, 3000);
  };
  const handleReminderCreated = (reminder: Reminder) => {
    setReminders(prev => [reminder, ...prev]);
  };
  const handleMarkPaid = (id: string) => {
    setReminders(prev => prev.map(r => r.id === id ? {
      ...r,
      status: 'paid'
    } : r));
    toast({
      title: "Payment Recorded",
      description: "Reminder marked as paid successfully."
    });
  };
  const handleDeleteReminder = (id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
    toast({
      title: "Reminder Deleted",
      description: "Payment reminder has been removed."
    });
  };
  return <SidebarProvider>
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="border-b border-border p-4 lg:p-6 bg-inherit">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back! Here's your business overview</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-success-muted text-success">
                <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                Online
              </Badge>
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => <Card key={index} className="hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <div className="flex items-center gap-1">
                      {stat.isPositive ? <TrendingUp className="w-4 h-4 text-success" /> : <TrendingDown className="w-4 h-4 text-destructive" />}
                      <span className={`text-sm ${stat.isPositive ? 'text-success' : 'text-destructive'}`}>
                        {stat.change}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                  </div>
                  <div className="bg-primary-muted p-3 rounded-lg">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>)}
          </div>

          {/* Voice Recognition Card */}
          {isListening && <Card className="border-primary bg-primary-muted">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center animate-pulse">
                  <Mic className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary">Listening...</h3>
                  <p className="text-sm text-primary/80">Say something like "Add 10 packets of Maggi noodles at 12 rupees each"</p>
                </div>
              </div>
              <Progress value={33} className="mt-4" />
            </CardContent>
          </Card>}

          {/* Voice Payment Reminder */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Mic className="w-5 h-5" />
              Voice Payment Reminders
            </h2>
            <VoiceReminderButton onReminderCreated={handleReminderCreated} />
          </div>

          {/* Active Reminders */}
          {reminders.length > 0 && <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Recent Payment Reminders</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reminders.slice(0, 2).map(reminder => <ReminderCard key={reminder.id} reminder={reminder} onMarkPaid={handleMarkPaid} onDelete={handleDeleteReminder} />)}
            </div>
          </div>}

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={action.action}>
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${action.variant === 'gradient' ? 'bg-gradient-primary' : action.variant === 'hero' ? 'bg-gradient-hero' : action.variant === 'success' ? 'bg-gradient-success' : 'bg-gradient-card border border-primary/20'} group-hover:scale-110 transition-transform duration-300`}>
                  <action.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{action.title}</h3>
                <p className="text-sm text-muted-foreground">{action.description}</p>
                {action.isActive && <Badge className="mt-2 bg-primary text-primary-foreground">Active</Badge>}
              </CardContent>
            </Card>)}
          </div>

          {/* Recent Activity & AI Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Latest transactions and updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.type === 'sale' ? 'bg-success text-success-foreground' : activity.type === 'payment' ? 'bg-primary text-primary-foreground' : activity.type === 'inventory' ? 'bg-warning text-warning-foreground' : 'bg-accent text-accent-foreground'}`}>
                      {activity.type === 'sale' ? <IndianRupee className="w-4 h-4" /> : activity.type === 'payment' ? <Users className="w-4 h-4" /> : activity.type === 'inventory' ? <Package className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{activity.customer}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-sm">{activity.amount}</span>
                </div>)}
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card className="bg-gradient-card border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  AI Business Insights
                </CardTitle>
                <CardDescription>Smart recommendations for your business</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-white/50 rounded-lg">
                  <h4 className="font-semibold text-success mb-2">📈 Sales Peak Detected</h4>
                  <p className="text-sm text-muted-foreground">Your Maggi noodles sales increase by 40% on weekends. Consider stocking up!</p>
                </div>
                <div className="p-4 bg-white/50 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">💡 Payment Reminder</h4>
                  <p className="text-sm text-muted-foreground">5 customers have pending payments. Send WhatsApp reminders to improve cash flow.</p>
                </div>
                <div className="p-4 bg-white/50 rounded-lg">
                  <h4 className="font-semibold text-warning mb-2">⚠️ Stock Alert</h4>
                  <p className="text-sm text-muted-foreground">Tea packets are running low. Based on sales pattern, restock before Friday.</p>
                </div>
                <Button variant="gradient" size="sm" className="w-full">
                  View Detailed Analytics
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  </SidebarProvider>;
};
export default Dashboard;