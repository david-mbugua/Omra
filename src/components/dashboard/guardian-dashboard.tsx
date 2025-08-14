"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Home, 
  User, 
  BookOpen, 
  School, 
  Paperclip, 
  MessageCircle, 
  Repeat, 
  Lock, 
  HelpCircle, 
  LogOut,
  Play,
  Download,
  Trash2,
  Upload,
  ChevronDown,
  Filter,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Settings,
  Shield,
  Clock,
  AlertCircle,
  CheckCircle,
  FileText,
  Heart,
  Pill
} from "lucide-react";

interface GuardianDashboardProps {
  userName: string;
  onLogOut: () => void;
}

type ActiveSection = 
  | "dashboard" 
  | "dependents" 
  | "care-instructions" 
  | "health-school" 
  | "documents" 
  | "messages" 
  | "life-triggers" 
  | "security" 
  | "support";

interface SidebarItem {
  id: ActiveSection;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const sidebarItems: SidebarItem[] = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "dependents", label: "Dependents", icon: User },
  { id: "care-instructions", label: "Care Instructions", icon: BookOpen },
  { id: "health-school", label: "Health & School Info", icon: School },
  { id: "documents", label: "Documents", icon: Paperclip },
  { id: "messages", label: "Messages from Parent", icon: MessageCircle },
  { id: "life-triggers", label: "Life Triggers", icon: Repeat },
  { id: "security", label: "Security", icon: Lock },
  { id: "support", label: "Support", icon: HelpCircle },
];

export const GuardianDashboard: React.FC<GuardianDashboardProps> = ({ userName, onLogOut }) => {
  const [activeSection, setActiveSection] = useState<ActiveSection>("dashboard");
  const [dependentFilter, setDependentFilter] = useState("all");

  const mockDependents = [
    {
      id: 1,
      name: "Emma Thompson",
      age: 12,
      birthday: "2012-03-15",
      status: "active" as const,
      notes: "Enjoys art classes. Allergic to peanuts. Prefers quiet environments for homework."
    },
    {
      id: 2,
      name: "Lucas Chen",
      age: 8,
      birthday: "2016-07-22",
      status: "pending" as const,
      notes: "Very energetic. Loves soccer. Needs reminders for chores and bedtime routine."
    }
  ];

  const mockMessages = [
    {
      id: 1,
      type: "text",
      content: "Emma has been doing great with her new routine. Please make sure she practices piano daily at 4 PM.",
      timestamp: "2024-12-20 14:30",
      hasAudio: false
    },
    {
      id: 2,
      type: "audio",
      content: "Audio message about Lucas's soccer practice schedule",
      timestamp: "2024-12-19 16:45",
      hasAudio: true,
      duration: "2:34"
    },
    {
      id: 3,
      type: "text",
      content: "Both kids should have their winter coats ready. Temperature dropping next week.",
      timestamp: "2024-12-18 09:15",
      hasAudio: false
    }
  ];

  const mockDocuments = [
    { id: 1, name: "Guardian Appointment Letter - Emma.pdf", type: "legal", uploadDate: "2024-12-15" },
    { id: 2, name: "Medical Consent - Lucas.pdf", type: "medical", uploadDate: "2024-12-14" },
    { id: 3, name: "School Emergency Contact Form.pdf", type: "school", uploadDate: "2024-12-13" }
  ];

  const mockTriggers = [
    {
      id: 1,
      event: "Primary Guardian Unavailable",
      status: "pending" as const,
      description: "Sarah Thompson - Business trip to Europe",
      activatedDate: "2024-12-18",
      yourRole: "secondary"
    },
    {
      id: 2,
      event: "Health Emergency Protocol",
      status: "active" as const,
      description: "Emma's allergy action plan is now in effect",
      activatedDate: "2024-12-10",
      yourRole: "primary"
    }
  ];

  const faqs = [
    {
      question: "What are my responsibilities as a guardian?",
      answer: "As an appointed guardian, you are responsible for the daily care, safety, and well-being of your assigned dependents. This includes following care instructions, maintaining emergency protocols, and keeping communication open with the primary estate owner."
    },
    {
      question: "How do I handle medical emergencies?",
      answer: "In case of medical emergencies, first call emergency services (911), then follow the specific medical protocols outlined in the Care Instructions section. Contact emergency contacts listed in Health & School Info immediately after ensuring the dependent's safety."
    },
    {
      question: "Can I modify care instructions?",
      answer: "Care instructions are set by the estate owner and cannot be modified by guardians. However, you can send messages to request clarification or suggest changes through the Messages section."
    },
    {
      question: "How often should I send updates?",
      answer: "Regular communication is encouraged. Send weekly updates about the dependent's well-being, any concerns, and daily activities through the Messages section."
    }
  ];

  const filteredDependents = dependentFilter === "all" 
    ? mockDependents 
    : mockDependents.filter(dep => dep.status === dependentFilter);

  const renderDashboard = () => (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Welcome back, {userName}</h1>
        <p className="text-muted-foreground">Here's an overview of your guardian responsibilities and current status.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dependents Assigned</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">1 active, 1 pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Care Readiness</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">Documents and protocols completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Triggers</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">1 active, 1 pending</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Getting Started as a Guardian</CardTitle>
          <CardDescription>Essential steps to ensure you're prepared for your guardian responsibilities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <p className="font-medium">Review Care Instructions</p>
              <p className="text-sm text-muted-foreground">Familiarize yourself with daily routines, medical needs, and emergency procedures.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <p className="font-medium">Verify Emergency Contacts</p>
              <p className="text-sm text-muted-foreground">Ensure all contact information is current and accessible.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
            <div>
              <p className="font-medium">Complete Document Upload</p>
              <p className="text-sm text-muted-foreground">Upload required identification and consent forms.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
            <div>
              <p className="font-medium">Set Up Security Preferences</p>
              <p className="text-sm text-muted-foreground">Configure two-factor authentication and review device access settings.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDependents = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dependents</h1>
          <p className="text-muted-foreground">Manage your assigned dependents and their information</p>
        </div>
        <div className="flex items-center gap-3">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={dependentFilter} onValueChange={setDependentFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredDependents.map((dependent) => (
          <Card key={dependent.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{dependent.name}</CardTitle>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm text-muted-foreground">Age: {dependent.age}</span>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Birthday: {new Date(dependent.birthday).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <Badge variant={dependent.status === "active" ? "default" : "secondary"}>
                  {dependent.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div>
                <p className="text-sm font-medium mb-2">Notes from Estate Owner:</p>
                <p className="text-sm text-muted-foreground">{dependent.notes}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderCareInstructions = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Care Instructions</h1>
        <p className="text-muted-foreground">Detailed care guidelines and routines for your dependents</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Medical Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Allergies</label>
                <p className="text-sm text-muted-foreground mt-1">Peanuts (severe), Shellfish (mild), Pollen (seasonal)</p>
              </div>
              <div>
                <label className="text-sm font-medium">Current Medications</label>
                <p className="text-sm text-muted-foreground mt-1">EpiPen (emergency), Children's Claritin (daily during allergy season)</p>
              </div>
              <div>
                <label className="text-sm font-medium">Primary Doctor</label>
                <p className="text-sm text-muted-foreground mt-1">Dr. Sarah Miller - Pediatrics<br />Phone: (555) 123-4567</p>
              </div>
              <div>
                <label className="text-sm font-medium">Medical Notes</label>
                <p className="text-sm text-muted-foreground mt-1">Regular check-ups every 6 months. Has mild asthma - inhaler in backpack.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              Daily Routines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">School Schedule</label>
                <p className="text-sm text-muted-foreground mt-1">Monday-Friday: 7:00 AM departure, 3:15 PM pickup<br />After-school care until 5:30 PM if needed</p>
              </div>
              <div>
                <label className="text-sm font-medium">Bedtime Routine</label>
                <p className="text-sm text-muted-foreground mt-1">8:00 PM - bath time<br />8:30 PM - reading time<br />9:00 PM - lights out</p>
              </div>
              <div>
                <label className="text-sm font-medium">Meal Preferences</label>
                <p className="text-sm text-muted-foreground mt-1">Breakfast: Cereal or toast<br />Lunch: Packed lunch for school<br />Dinner: No spicy food, loves pasta</p>
              </div>
              <div>
                <label className="text-sm font-medium">Screen Time</label>
                <p className="text-sm text-muted-foreground mt-1">Weekdays: 1 hour after homework<br />Weekends: 2 hours, educational content preferred</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-green-500" />
              Personal Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Favorite Activities</label>
                <p className="text-sm text-muted-foreground mt-1">Drawing and painting, reading chapter books, board games, nature walks</p>
              </div>
              <div>
                <label className="text-sm font-medium">Comfort Items</label>
                <p className="text-sm text-muted-foreground mt-1">Stuffed elephant "Ellie" for bedtime, blue blanket, favorite book series</p>
              </div>
              <div>
                <label className="text-sm font-medium">Social Preferences</label>
                <p className="text-sm text-muted-foreground mt-1">Enjoys small group activities, can be shy initially, loves helping with cooking</p>
              </div>
              <div>
                <label className="text-sm font-medium">Learning Style</label>
                <p className="text-sm text-muted-foreground mt-1">Visual learner, needs quiet space for homework, responds well to positive reinforcement</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderHealthSchool = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Health & School Information</h1>
        <p className="text-muted-foreground">Emergency contacts, school details, and medical insurance information</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-red-500" />
              Emergency Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Dr. Sarah Miller</p>
                    <p className="text-sm text-muted-foreground">Primary Pediatrician</p>
                  </div>
                  <Badge variant="outline">Primary</Badge>
                </div>
                <div className="mt-2 flex items-center gap-4">
                  <span className="flex items-center gap-1 text-sm">
                    <Phone className="h-4 w-4" />
                    (555) 123-4567
                  </span>
                  <span className="flex items-center gap-1 text-sm">
                    <Mail className="h-4 w-4" />
                    s.miller@healthcenter.com
                  </span>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Michael Thompson</p>
                    <p className="text-sm text-muted-foreground">Uncle / Secondary Contact</p>
                  </div>
                  <Badge variant="secondary">Secondary</Badge>
                </div>
                <div className="mt-2 flex items-center gap-4">
                  <span className="flex items-center gap-1 text-sm">
                    <Phone className="h-4 w-4" />
                    (555) 987-6543
                  </span>
                  <span className="flex items-center gap-1 text-sm">
                    <Mail className="h-4 w-4" />
                    m.thompson@email.com
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <School className="h-5 w-5 text-blue-500" />
              School Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">School Name</label>
              <p className="text-sm text-muted-foreground mt-1">Maplewood Elementary School</p>
            </div>
            <div>
              <label className="text-sm font-medium">Address</label>
              <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                123 Oak Street, Springfield, IL 62701
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Main Office</label>
                <p className="text-sm text-muted-foreground mt-1">(555) 456-7890</p>
              </div>
              <div>
                <label className="text-sm font-medium">Principal</label>
                <p className="text-sm text-muted-foreground mt-1">Mrs. Jennifer Adams</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Pickup Authorization</label>
              <p className="text-sm text-muted-foreground mt-1">
                Authorized Guardians: Sarah Thompson (Primary), You (Secondary)<br />
                Photo ID required for pickup. Office must be notified 2 hours in advance for schedule changes.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-500" />
              Insurance & Medical Cards
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Health Insurance</label>
              <p className="text-sm text-muted-foreground mt-1">
                Blue Cross Blue Shield<br />
                Member ID: BCB123456789<br />
                Group: THOMPSON-FAM
              </p>
            </div>
            <div>
              <label className="text-sm font-medium">Dental Insurance</label>
              <p className="text-sm text-muted-foreground mt-1">
                Delta Dental<br />
                Member ID: DD987654321<br />
                Next Cleaning: March 2025
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Documents</h1>
        <p className="text-muted-foreground">Manage guardian documents and upload required files</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Required Documents</CardTitle>
          <CardDescription>Please upload the following documents to complete your guardian profile</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 mx-auto text-gray-400 mb-4" />
            <Button variant="outline" className="mb-2">
              <Upload className="h-4 w-4 mr-2" />
              Upload Files
            </Button>
            <p className="text-sm text-muted-foreground">
              Drag and drop files here, or click to browse.<br />
              Accepted formats: PDF, JPG, PNG (max 10MB)
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Uploaded Documents</CardTitle>
          <CardDescription>Your currently uploaded guardian documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockDocuments.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {doc.type} • Uploaded {new Date(doc.uploadDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Required Documentation Checklist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Guardian Appointment Letter</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Medical Consent Forms</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Emergency Contact Forms</span>
            </div>
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              <span>Government Issued ID</span>
            </div>
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              <span>Background Check Certificate</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Messages from Parent</h1>
        <p className="text-muted-foreground">Communication and instructions from the estate owner</p>
      </div>

      <div className="space-y-4">
        {mockMessages.map((message) => (
          <Card key={message.id}>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-blue-500" />
                    <span className="font-medium">Sarah Thompson</span>
                    <Badge variant="outline">{message.type}</Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(message.timestamp).toLocaleDateString()} at{' '}
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                {message.type === "audio" ? (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Button variant="outline" size="sm">
                        <Play className="h-4 w-4 mr-2" />
                        Play Audio
                      </Button>
                      <div>
                        <p className="text-sm font-medium">{message.content}</p>
                        <p className="text-sm text-muted-foreground">Duration: {message.duration}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">{message.content}</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Send Response</CardTitle>
          <CardDescription>Reply to the estate owner with updates or questions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <textarea 
            className="w-full min-h-24 p-3 border rounded-lg resize-none"
            placeholder="Type your message here..."
          />
          <div className="flex gap-2">
            <Button>Send Message</Button>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Attach File
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderLifeTriggers = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Life Triggers</h1>
        <p className="text-muted-foreground">Track trigger events and your guardian status changes</p>
      </div>

      <div className="space-y-4">
        {mockTriggers.map((trigger) => (
          <Card key={trigger.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{trigger.event}</CardTitle>
                  <CardDescription>{trigger.description}</CardDescription>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge variant={trigger.status === "active" ? "default" : "secondary"}>
                    {trigger.status}
                  </Badge>
                  <Badge variant="outline">
                    Your Role: {trigger.yourRole}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Activated: {new Date(trigger.activatedDate).toLocaleDateString()}
              </div>
              
              {trigger.status === "active" && (
                <div className="mt-4 p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-orange-500" />
                    <p className="font-medium text-orange-800">Action Required</p>
                  </div>
                  <p className="text-sm text-orange-700 mt-1">
                    You are now the primary guardian. Please review care instructions and confirm availability.
                  </p>
                </div>
              )}

              {trigger.status === "pending" && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <p className="font-medium text-blue-800">On Standby</p>
                  </div>
                  <p className="text-sm text-blue-700 mt-1">
                    You are designated as secondary guardian. Stay informed and be prepared to step in if needed.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Life Triggers</CardTitle>
          <CardDescription>Learn about the different types of triggers and your responsibilities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Primary Guardian Unavailable</h4>
            <p className="text-sm text-muted-foreground">
              Activated when the primary guardian is temporarily unable to provide care due to travel, illness, or other circumstances.
            </p>
          </div>
          <Separator />
          <div>
            <h4 className="font-medium mb-2">Health Emergency Protocol</h4>
            <p className="text-sm text-muted-foreground">
              Triggered when specific medical conditions require immediate guardian involvement or protocol changes.
            </p>
          </div>
          <Separator />
          <div>
            <h4 className="font-medium mb-2">School Notification</h4>
            <p className="text-sm text-muted-foreground">
              Activated for school-related emergencies or when your immediate involvement in school matters is needed.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Security Settings</h1>
        <p className="text-muted-foreground">Manage your account security and access preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Password & Authentication</CardTitle>
          <CardDescription>Update your password and authentication methods</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Current Password</label>
            <Input type="password" placeholder="Enter current password" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">New Password</label>
            <Input type="password" placeholder="Enter new password" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Confirm New Password</label>
            <Input type="password" placeholder="Confirm new password" />
          </div>
          <Button>Update Password</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>Add an extra layer of security to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">Require a verification code in addition to your password</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Device History</CardTitle>
          <CardDescription>Recent devices that have accessed your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <p className="font-medium">iPhone 14 Pro</p>
                <p className="text-sm text-muted-foreground">Current device • Last active: Today at 2:30 PM</p>
              </div>
              <Badge variant="outline">Current</Badge>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <p className="font-medium">Chrome on Windows</p>
                <p className="text-sm text-muted-foreground">Last active: December 18, 2024 at 4:15 PM</p>
              </div>
              <Button variant="ghost" size="sm">Remove</Button>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <p className="font-medium">Safari on MacBook</p>
                <p className="text-sm text-muted-foreground">Last active: December 15, 2024 at 9:22 AM</p>
              </div>
              <Button variant="ghost" size="sm">Remove</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Preferences</CardTitle>
          <CardDescription>Configure your account and notification settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive updates about guardian activities</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">SMS Alerts</p>
              <p className="text-sm text-muted-foreground">Emergency notifications via text message</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Auto-lock Session</p>
              <p className="text-sm text-muted-foreground">Automatically sign out after 30 minutes of inactivity</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSupport = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Support</h1>
        <p className="text-muted-foreground">Get help and find answers to common questions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contact OMRA Support</CardTitle>
          <CardDescription>Get in touch with our support team for assistance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <Mail className="h-6 w-6 text-blue-500" />
              <div>
                <p className="font-medium">Email Support</p>
                <p className="text-sm text-muted-foreground">support@omra.com</p>
                <p className="text-xs text-muted-foreground">Response within 24 hours</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <Phone className="h-6 w-6 text-green-500" />
              <div>
                <p className="font-medium">Phone Support</p>
                <p className="text-sm text-muted-foreground">(555) OMRA-365</p>
                <p className="text-xs text-muted-foreground">Mon-Fri 8 AM - 8 PM EST</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Find answers to common guardian questions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border rounded-lg">
                <button
                  className="w-full text-left p-4 flex justify-between items-center hover:bg-gray-50"
                  onClick={() => {}}
                >
                  <span className="font-medium">{faq.question}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="px-4 pb-4">
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Links</CardTitle>
          <CardDescription>Helpful resources and documentation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-3">
            <Button variant="outline" className="justify-start h-auto p-4">
              <FileText className="h-5 w-5 mr-3" />
              <div className="text-left">
                <p className="font-medium">Guardian Handbook</p>
                <p className="text-sm text-muted-foreground">Complete guide to guardian responsibilities</p>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4">
              <Settings className="h-5 w-5 mr-3" />
              <div className="text-left">
                <p className="font-medium">Platform Tutorial</p>
                <p className="text-sm text-muted-foreground">Learn how to use the OMRA platform</p>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4">
              <AlertCircle className="h-5 w-5 mr-3" />
              <div className="text-left">
                <p className="font-medium">Emergency Procedures</p>
                <p className="text-sm text-muted-foreground">Step-by-step emergency protocols</p>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4">
              <MessageCircle className="h-5 w-5 mr-3" />
              <div className="text-left">
                <p className="font-medium">Community Forum</p>
                <p className="text-sm text-muted-foreground">Connect with other guardians</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderMainContent = () => {
    switch (activeSection) {
      case "dashboard": return renderDashboard();
      case "dependents": return renderDependents();
      case "care-instructions": return renderCareInstructions();
      case "health-school": return renderHealthSchool();
      case "documents": return renderDocuments();
      case "messages": return renderMessages();
      case "life-triggers": return renderLifeTriggers();
      case "security": return renderSecurity();
      case "support": return renderSupport();
      default: return renderDashboard();
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-[#2C2C3A] text-white flex flex-col">
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-600">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">O</span>
            </div>
            <span className="font-semibold text-lg">Omra Guardian</span>
          </div>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 py-4">
          <nav className="px-3 space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${
                    isActive 
                      ? 'bg-primary text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                  aria-label={`Navigate to ${item.label}`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </ScrollArea>

        {/* Logout Section */}
        <div className="p-4 border-t border-gray-600">
          <Button
            onClick={onLogOut}
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:bg-gray-700 hover:text-white"
            aria-label="Log out of your account"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Log Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {renderMainContent()}
        </div>
      </div>
    </div>
  );
};