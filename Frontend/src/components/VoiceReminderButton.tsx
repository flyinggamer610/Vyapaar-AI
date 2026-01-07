import { useState } from "react";
import { Mic, MicOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Reminder } from "@/types";

interface VoiceReminderButtonProps {
  onReminderCreated?: (reminder: Reminder) => void;
  variant?: "default" | "sm" | "lg";
}

export function VoiceReminderButton({ onReminderCreated, variant = "default" }: VoiceReminderButtonProps) {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const startListening = async () => {
    try {
      setIsListening(true);
      setTranscript("");
      setProgress(0);

      // Simulate voice recognition process
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 300);

      // Simulate voice input
      setTimeout(() => {
        setTranscript("Send Ramesh a 1200 rupees reminder for Friday");
        clearInterval(interval);
        setIsListening(false);
        processVoiceInput("Send Ramesh a 1200 rupees reminder for Friday");
      }, 3000);

    } catch (error) {
      toast({
        title: "Voice Recognition Error",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive",
      });
      setIsListening(false);
    }
  };

  const processVoiceInput = async (text: string) => {
    setIsProcessing(true);

    try {
      // Simulate AI processing to extract customer name, amount, and date
      await new Promise(resolve => setTimeout(resolve, 1500));

      const extractedData = {
        id: Date.now().toString(),
        customerName: "Ramesh Kumar",
        amount: "₹1,200",
        dueDate: "Friday",
        phone: "+91 98765 43210",
        status: "pending" as const,
        originalText: text,
        createdAt: new Date().toISOString()
      };

      onReminderCreated?.(extractedData);

      toast({
        title: "Voice Reminder Created",
        description: `Payment reminder for ${extractedData.customerName} has been created.`,
      });

    } catch (error) {
      toast({
        title: "Processing Error",
        description: "Failed to process voice input. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const stopListening = () => {
    setIsListening(false);
    setProgress(0);
  };

  if (variant === "sm") {
    return (
      <Button
        size="sm"
        variant={isListening ? "destructive" : "gradient"}
        onClick={isListening ? stopListening : startListening}
        disabled={isProcessing}
        className="gap-2"
      >
        {isProcessing ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : isListening ? (
          <MicOff className="w-4 h-4" />
        ) : (
          <Mic className="w-4 h-4" />
        )}
        {isProcessing ? "Processing..." : isListening ? "Stop" : "Voice Reminder"}
      </Button>
    );
  }

  return (
    <div className="space-y-4">
      <Button
        variant={isListening ? "destructive" : "gradient"}
        size={variant === "lg" ? "lg" : "default"}
        onClick={isListening ? stopListening : startListening}
        disabled={isProcessing}
        className="gap-2 w-full"
      >
        {isProcessing ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : isListening ? (
          <MicOff className="w-5 h-5" />
        ) : (
          <Mic className="w-5 h-5" />
        )}
        {isProcessing ? "Processing Voice..." : isListening ? "Stop Recording" : "🎙️ Voice Payment Reminder"}
      </Button>

      {(isListening || isProcessing) && (
        <Card className="border-primary bg-primary-muted">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 bg-primary rounded-full flex items-center justify-center ${isListening ? 'animate-pulse' : ''}`}>
                <Mic className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-primary">
                    {isListening ? "Listening..." : "Processing..."}
                  </h4>
                  <Badge variant="outline" className="text-xs">
                    {isListening ? "Recording" : "AI Processing"}
                  </Badge>
                </div>
                <p className="text-sm text-primary/80">
                  {isListening
                    ? 'Say: "Send [Customer] a [Amount] reminder for [Date]"'
                    : 'Extracting customer details...'
                  }
                </p>
              </div>
            </div>

            {transcript && (
              <div className="mb-3 p-2 bg-white/50 rounded text-sm">
                <strong>Heard:</strong> "{transcript}"
              </div>
            )}

            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>
      )}
    </div>
  );
}