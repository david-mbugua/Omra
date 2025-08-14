"use client";

import { useState } from "react";
import { 
  LayoutDashboard, 
  FolderOpen, 
  Users, 
  FileText, 
  Zap, 
  Shield, 
  Lock, 
  FileCheck, 
  CreditCard, 
  HelpCircle,
  Bell,
  Search,
  User,
  Plus,
  ChevronRight,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Activity,
  Clock,
  Settings,
  LogOut,
  Edit,
  Trash2,
  Eye,
  Upload,
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  AlertTriangle,
  UserCheck,
  FileSearch,
  History,
  Key,
  ShieldCheck,
  Star,
  Heart,
  Home,
  Briefcase,
  Copyright,
  Coins,
  Database,
  Target,
  UserPlus,
  UserX,
  Send,
  CheckSquare,
  XCircle,
  RefreshCw,
  Filter,
  SortAsc,
  MoreHorizontal,
  Paperclip,
  Info,
  ExternalLink,
  Copy,
  Share2,
  Percent,
  X
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface DashboardProps {
  userName: string;
  onNavigate: (path: string) => void;
  onAddAsset: () => void;
  onNotificationClick: () => void;
  onUserMenuClick: () => void;
  onSearchSubmit: (query: string) => void;
  onLogout: () => void;
}

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  path: string;
  badge?: string;
}

interface Asset {
  id: string;
  name: string;
  type: string;
  identifier: string;
  value: string;
  location: string;
  beneficiaries: { id: string; name: string; percentage: number }[];
  verified: boolean;
  verificationDoc?: string;
  verificationNotes?: string;
  notes: string;
  locationNotes?: string;
  documents: string[];
  lastUpdated: string;
}

interface Beneficiary {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  relationship: string;
  countryOfResidence: string;
  assignedAssets: { assetId: string; percentage: number }[];
  notes: string;
  verified: boolean;
  documents: string[];
}

interface LifeTrigger {
  id: string;
  type: string;
  threshold: string;
  recipients: string[];
  backupMethod: string;
  instructions: string;
  active: boolean;
}

interface InheritanceProtocol {
  checkInMonitoring: {
    monthlyCheckIns: boolean;
    escalateToDailyAfter3Missed: boolean;
    activateAfter7DailyMissed: boolean;
  };
  emergencyContact: {
    fullName: string;
    relationship: string;
    contact: string;
    requireConfirmation: boolean;
  } | null;
  lawyer: {
    fullName: string;
    firm: string;
    contact: string;
    requireVerification: boolean;
  } | null;
  executor: {
    fullName: string;
    relationship: string;
    contact: string;
    role: 'passive' | 'active';
    requireApproval: boolean;
  } | null;
}

interface TrustedPerson {
  id: string;
  fullName: string;
  role: string;
  email: string;
  phone: string;
  responsibilities: string[];
  documents: string[];
  twoFAEnabled: boolean;
  inviteStatus: 'pending' | 'accepted' | 'declined';
}

const sidebarItems: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { id: 'assets', label: 'Assets', icon: FolderOpen, path: '/assets', badge: '12' },
  { id: 'beneficiaries', label: 'Beneficiaries', icon: Users, path: '/beneficiaries', badge: '5' },
  { id: 'smart-will', label: 'Smart Will', icon: FileText, path: '/smart-will' },
  { id: 'life-triggers', label: 'Life Triggers', icon: Zap, path: '/life-triggers', badge: '3' },
  { id: 'trusted', label: 'Trusted', icon: Shield, path: '/trusted', badge: '4' },
  { id: 'security', label: 'Security', icon: Lock, path: '/security' },
  { id: 'upgrade-plan', label: 'Upgrade Plan', icon: CreditCard, path: '/upgrade' },
  { id: 'support', label: 'Support', icon: HelpCircle, path: '/support' }
];

// Mock data with Kenyan names and KES currency
const mockAssets: Asset[] = [
  {
    id: '1',
    name: 'M-Pesa Business Account',
    type: 'Bank Account',
    identifier: '254700123456',
    value: 'KES 2,450,000',
    location: 'Safaricom M-Pesa Account #254700123456',
    beneficiaries: [
      { id: '1', name: 'Grace Wanjiku', percentage: 70 },
      { id: '2', name: 'James Kimani', percentage: 30 }
    ],
    verified: true,
    verificationDoc: 'mpesa_statement.pdf',
    verificationNotes: 'Verified through official M-Pesa statement',
    notes: 'Primary business account with daily transactions',
    locationNotes: 'Login using main phone number. PIN: Ask Grace for emergency access',
    documents: ['mpesa_statement.pdf', 'business_registration.pdf'],
    lastUpdated: '2024-01-15'
  },
  {
    id: '2',
    name: 'Family Home - Kileleshwa',
    type: 'Property',
    identifier: 'Plot No. 1234/V',
    value: 'KES 15,000,000',
    location: 'Kileleshwa, Nairobi - Plot No. 1234/V',
    beneficiaries: [
      { id: '2', name: 'James Kimani', percentage: 100 }
    ],
    verified: false,
    verificationNotes: 'Title deed verification pending',
    notes: 'Family residence with title deed',
    locationNotes: 'Original title deed stored in safe deposit box at Equity Bank, Westlands branch',
    documents: ['title_deed.pdf'],
    lastUpdated: '2024-01-10'
  },
  {
    id: '3',
    name: 'Equity Bank Investment',
    type: 'Bank Account',
    identifier: '0123456789',
    value: 'KES 3,200,000',
    location: 'Equity Bank Account #0123456789',
    beneficiaries: [
      { id: '1', name: 'Grace Wanjiku', percentage: 60 },
      { id: '2', name: 'James Kimani', percentage: 40 }
    ],
    verified: true,
    verificationDoc: 'bank_statement.pdf',
    verificationNotes: 'Verified through official bank statement and investment certificate',
    notes: 'Fixed deposit and savings account',
    locationNotes: 'Account manager: Jane Doe (jane.doe@equitybank.co.ke). Requires ID and death certificate for access',
    documents: ['bank_statement.pdf', 'investment_certificate.pdf'],
    lastUpdated: '2024-01-18'
  }
];

const mockBeneficiaries: Beneficiary[] = [
  {
    id: '1',
    fullName: 'Grace Wanjiku Kamau',
    email: 'grace.wanjiku@gmail.com',
    phone: '+254722123456',
    relationship: 'Spouse',
    countryOfResidence: 'Kenya',
    assignedAssets: [
      { assetId: '1', percentage: 70 },
      { assetId: '3', percentage: 60 }
    ],
    notes: 'Primary beneficiary for all financial assets',
    verified: true,
    documents: ['marriage_certificate.pdf', 'national_id.pdf']
  },
  {
    id: '2',
    fullName: 'James Kimani Kamau',
    email: 'james.kimani@gmail.com',
    phone: '+254733456789',
    relationship: 'Child',
    countryOfResidence: 'Kenya',
    assignedAssets: [
      { assetId: '2', percentage: 100 },
      { assetId: '1', percentage: 30 },
      { assetId: '3', percentage: 40 }
    ],
    notes: 'Will receive family home upon reaching age 25',
    verified: true,
    documents: ['birth_certificate.pdf', 'national_id.pdf']
  }
];

const mockLifeTriggers: LifeTrigger[] = [
  {
    id: '1',
    type: 'Inactivity',
    threshold: '30 days of no login',
    recipients: ['grace.wanjiku@gmail.com', 'james.kimani@gmail.com'],
    backupMethod: 'Emergency contact notification',
    instructions: 'Notify all beneficiaries and begin asset verification process',
    active: true
  },
  {
    id: '2',
    type: 'Health Event',
    threshold: 'Hospital admission > 7 days',
    recipients: ['emergency.contact@gmail.com'],
    backupMethod: 'Medical provider notification',
    instructions: 'Activate health directive and notify medical proxy',
    active: true
  }
];

const mockTrustedPeople: TrustedPerson[] = [
  {
    id: '1',
    fullName: 'Peter Mwangi Ndung\'u',
    role: 'Executor',
    email: 'peter.mwangi@gmail.com',
    phone: '+254700987654',
    responsibilities: ['Manage estate distribution', 'Handle legal proceedings'],
    documents: ['executor_agreement.pdf', 'legal_authorization.pdf'],
    twoFAEnabled: true,
    inviteStatus: 'accepted'
  },
  {
    id: '2',
    fullName: 'Sarah Nyokabi Maina',
    role: 'Guardian',
    email: 'sarah.nyokabi@gmail.com',
    phone: '+254711234567',
    responsibilities: ['Care for minor children', 'Educational decisions'],
    documents: ['guardian_agreement.pdf'],
    twoFAEnabled: false,
    inviteStatus: 'pending'
  }
];

export const Dashboard = ({ 
  userName, 
  onNavigate, 
  onAddAsset, 
  onNotificationClick, 
  onUserMenuClick, 
  onSearchSubmit,
  onLogout
}: DashboardProps) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [willContent, setWillContent] = useState('');
  
  // Add this fix for inheritanceProtocol state
  const [inheritanceProtocol, setInheritanceProtocol] = useState<InheritanceProtocol>({
    checkInMonitoring: {
      monthlyCheckIns: true,
      escalateToDailyAfter3Missed: true,
      activateAfter7DailyMissed: false,
    },
    emergencyContact: null,
    lawyer: null,
    executor: null,
  });

  // Assets state
  const [assets, setAssets] = useState<Asset[]>(mockAssets);
  const [showAssetForm, setShowAssetForm] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [assetFormData, setAssetFormData] = useState({
    name: '',
    type: '',
    identifier: '',
    value: '',
    location: '',
    beneficiaries: [{ id: '', name: '', percentage: 100 }],
    verified: false,
    verificationDoc: '',
    verificationNotes: '',
    notes: '',
    locationNotes: ''
  });

  // Beneficiaries state
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>(mockBeneficiaries);
  const [showBeneficiaryForm, setShowBeneficiaryForm] = useState(false);
  const [editingBeneficiary, setEditingBeneficiary] = useState<Beneficiary | null>(null);
  const [beneficiaryFormData, setBeneficiaryFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    relationship: '',
    countryOfResidence: '',
    assignedAssets: [] as { assetId: string; percentage: number }[],
    notes: ''
  });

  // Life Triggers state
  const [lifeTriggers, setLifeTriggers] = useState<LifeTrigger[]>(mockLifeTriggers);
  const [showTriggerForm, setShowTriggerForm] = useState(false);
  const [editingTrigger, setEditingTrigger] = useState<LifeTrigger | null>(null);

  // Trusted People state
  const [trustedPeople, setTrustedPeople] = useState<TrustedPerson[]>(mockTrustedPeople);
  const [showTrustedForm, setShowTrustedForm] = useState(false);
  const [editingTrusted, setEditingTrusted] = useState<TrustedPerson | null>(null);
  const [trustedFormData, setTrustedFormData] = useState({
    fullName: '',
    role: '',
    email: '',
    phone: '',
    responsibilities: [] as string[],
    documents: [] as string[],
    twoFAEnabled: false,
    inviteStatus: 'pending' as 'pending' | 'accepted' | 'declined',
    notes: '',
  });
  const roleResponsibilities: Record<string, string[]> = {
    'Executor': [
      'Manage estate distribution',
      'Handle legal proceedings',
      'Pay outstanding debts',
      'Distribute assets to beneficiaries',
      'Obtain necessary legal approvals',
    ],
    'Guardian': [
      'Care for minor children',
      'Make educational decisions',
      'Approve medical treatment',
      'Provide emotional support',
      'Ensure daily wellbeing',
    ],
    'Trusted Contact': [
      'Provide emergency contact info',
      'Assist in verification during life triggers',
      'Respond to OMRA check-ins',
    ],
  };

  const handleSidebarClick = (item: SidebarItem) => {
    setActiveSection(item.id);
    onNavigate(item.path);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(searchQuery);
  };

  const handleLogoClick = () => {
    onNavigate('/');
  };

  const generateWill = () => {
    const generatedWill = `
LAST WILL AND TESTAMENT

I, ${userName}, being of sound mind and disposing memory, do hereby make, publish, and declare this to be my Last Will and Testament, hereby revoking all wills and codicils previously made by me.

${willContent}

ARTICLE I - ASSETS
I give, devise, and bequeath my assets as follows:
${assets.map(asset => `- ${asset.name} (${asset.value}) to ${asset.beneficiaries.map(b => b.name).join(', ')}`).join('\n')}

ARTICLE II - BENEFICIARIES
I hereby appoint the following beneficiaries:
${beneficiaries.map(b => `- ${b.fullName} (${b.relationship}) - ${b.email}`).join('\n')}

ARTICLE III - EXECUTORS
I hereby appoint the following person(s) as Executor(s):
${trustedPeople.filter(p => p.role === 'Executor').map(p => `- ${p.fullName} - ${p.email}`).join('\n')}

This will has been generated and secured using blockchain technology through Omra Platform.

IN WITNESS WHEREOF, I have executed this Last Will and Testament on this day of ${new Date().toLocaleDateString()}.

_________________________
${userName}
    `;
    
    return generatedWill;
  };

  const getAssetTypeIcon = (type: string) => {
    switch (type) {
      case 'Cryptocurrency': return Coins;
      case 'Financial': return DollarSign;
      case 'Real Estate': return Home;
      case 'Intellectual Property': return Copyright;
      default: return Database;
    }
  };

  const getRelationshipIcon = (relationship: string) => {
    switch (relationship) {
      case 'Spouse': return Heart;
      case 'Child': return Users;
      case 'Friend': return UserCheck;
      default: return User;
    }
  };

  const getTriggerIcon = (type: string) => {
    switch (type) {
      case 'Inactivity': return Clock;
      case 'Health Event': return Activity;
      case 'Manual Confirmation': return UserCheck;
      case 'Death Certificate Upload': return FileCheck;
      default: return AlertTriangle;
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Executor': return Briefcase;
      case 'Guardian': return Shield;
      case 'Trusted Contact': return UserCheck;
      default: return User;
    }
  };

  const getAssetIdentifierConfig = (assetType: string) => {
    switch (assetType) {
      case 'Cryptocurrency':
        return { label: 'Wallet Address or Public Key', placeholder: 'Enter wallet address or public key' };
      case 'Bank Account':
        return { label: 'Account Number / IBAN', placeholder: 'Enter account number or IBAN' };
      case 'Property':
        return { label: 'Parcel or Deed Number', placeholder: 'Enter parcel or deed number' };
      case 'Insurance':
        return { label: 'Policy Number', placeholder: 'Enter policy number' };
      case 'Device':
        return { label: 'Serial Number', placeholder: 'Enter device serial number' };
      case 'IP':
        return { label: 'Registration ID or Case Number', placeholder: 'Enter registration ID or case number' };
      case 'Other':
        return { label: 'Custom Identifier or Reference', placeholder: 'Enter custom identifier' };
      default:
        return { label: 'Asset Identifier', placeholder: 'Enter asset identifier' };
    }
  };

  const handleAssetFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAsset) {
      // Update existing asset
      setAssets(assets.map(asset => 
        asset.id === editingAsset.id 
          ? { ...asset, ...assetFormData, lastUpdated: new Date().toISOString().split('T')[0] }
          : asset
      ));
      setEditingAsset(null);
    } else {
      // Add new asset
      const newAsset: Asset = {
        id: Date.now().toString(),
        ...assetFormData,
        documents: [],
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      setAssets([...assets, newAsset]);
    }
    setShowAssetForm(false);
    setAssetFormData({
      name: '',
      type: '',
      identifier: '',
      value: '',
      location: '',
      beneficiaries: [{ id: '', name: '', percentage: 100 }],
      verified: false,
      verificationDoc: '',
      verificationNotes: '',
      notes: '',
      locationNotes: ''
    });
  };

  const addBeneficiaryToAsset = () => {
    const currentTotal = assetFormData.beneficiaries.reduce((sum, b) => sum + b.percentage, 0);
    if (currentTotal < 100) {
      setAssetFormData({
        ...assetFormData,
        beneficiaries: [...assetFormData.beneficiaries, { id: '', name: '', percentage: 100 - currentTotal }]
      });
    }
  };

  const removeBeneficiaryFromAsset = (index: number) => {
    if (assetFormData.beneficiaries.length > 1) {
      const newBeneficiaries = assetFormData.beneficiaries.filter((_, i) => i !== index);
      setAssetFormData({
        ...assetFormData,
        beneficiaries: newBeneficiaries
      });
    }
  };

  const updateBeneficiaryInAsset = (index: number, field: string, value: string | number) => {
    const newBeneficiaries = assetFormData.beneficiaries.map((b, i) => 
      i === index ? { ...b, [field]: value } : b
    );
    setAssetFormData({
      ...assetFormData,
      beneficiaries: newBeneficiaries
    });
  };

  const renderAssetForm = () => (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">
          {editingAsset ? 'Edit Asset' : 'Add New Asset'}
        </h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => {
            setShowAssetForm(false);
            setEditingAsset(null);
            setAssetFormData({
              name: '',
              type: '',
              identifier: '',
              value: '',
              location: '',
              beneficiaries: [{ id: '', name: '', percentage: 100 }],
              verified: false,
              verificationDoc: '',
              verificationNotes: '',
              notes: '',
              locationNotes: ''
            });
          }}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <form onSubmit={handleAssetFormSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="asset-name">Asset Name</Label>
            <Input
              id="asset-name"
              value={assetFormData.name}
              onChange={(e) => setAssetFormData({...assetFormData, name: e.target.value})}
              placeholder="Enter asset name"
              required
            />
          </div>
          <div>
            <Label htmlFor="asset-type">Asset Type</Label>
            <Select 
              value={assetFormData.type} 
              onValueChange={(value) => setAssetFormData({...assetFormData, type: value, identifier: ''})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select asset type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Bank Account">Bank Account</SelectItem>
                <SelectItem value="Cryptocurrency">Cryptocurrency</SelectItem>
                <SelectItem value="Property">Property</SelectItem>
                <SelectItem value="Insurance">Insurance</SelectItem>
                <SelectItem value="Device">Device</SelectItem>
                <SelectItem value="IP">Intellectual Property</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Dynamic Asset Identifier Field */}
        {assetFormData.type && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Label htmlFor="asset-identifier">
                {getAssetIdentifierConfig(assetFormData.type).label}
              </Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>This unique identifier helps locate and verify your asset</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              id="asset-identifier"
              value={assetFormData.identifier}
              onChange={(e) => setAssetFormData({...assetFormData, identifier: e.target.value})}
              placeholder={getAssetIdentifierConfig(assetFormData.type).placeholder}
              required
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="asset-value">Estimated Value (KES)</Label>
            <Input
              id="asset-value"
              value={assetFormData.value}
              onChange={(e) => setAssetFormData({...assetFormData, value: e.target.value})}
              placeholder="Enter estimated value"
              required
            />
          </div>
          <div>
            <Label htmlFor="asset-location">Location/Storage Info</Label>
            <Input
              id="asset-location"
              value={assetFormData.location}
              onChange={(e) => setAssetFormData({...assetFormData, location: e.target.value})}
              placeholder="Enter location or storage information"
              required
            />
          </div>
        </div>

        {/* Beneficiary Assignment Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <Label>Beneficiary Assignment</Label>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={addBeneficiaryToAsset}
              disabled={assetFormData.beneficiaries.reduce((sum, b) => sum + b.percentage, 0) >= 100}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Beneficiary
            </Button>
          </div>
          
          <div className="space-y-3">
            {assetFormData.beneficiaries.map((beneficiary, index) => (
              <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="flex-1">
                  <Input
                    value={beneficiary.name}
                    onChange={(e) => updateBeneficiaryInAsset(index, 'name', e.target.value)}
                    placeholder="Beneficiary name"
                    required
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={beneficiary.percentage}
                    onChange={(e) => updateBeneficiaryInAsset(index, 'percentage', parseInt(e.target.value) || 0)}
                    placeholder="0"
                    className="w-20"
                    min="0"
                    max="100"
                    required
                  />
                  <Percent className="w-4 h-4 text-muted-foreground" />
                </div>
                {assetFormData.beneficiaries.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeBeneficiaryFromAsset(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-sm text-muted-foreground mt-2">
            Total: {assetFormData.beneficiaries.reduce((sum, b) => sum + b.percentage, 0)}%
            {assetFormData.beneficiaries.reduce((sum, b) => sum + b.percentage, 0) !== 100 && (
              <span className="text-orange-600 ml-2">
                ⚠️ Total should equal 100%
              </span>
            )}
          </div>
        </div>

        {/* Verification Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Label>Verification</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-4 h-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Upload documents to verify asset ownership and legitimacy</p>
              </TooltipContent>
            </Tooltip>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Switch
                id="asset-verified"
                checked={assetFormData.verified}
                onCheckedChange={(checked) => setAssetFormData({...assetFormData, verified: checked})}
              />
              <Label htmlFor="asset-verified">Is this asset verified?</Label>
            </div>
            
            <div>
              <Label htmlFor="verification-doc">Upload Verification Document</Label>
              <div className="mt-2 border-2 border-dashed border-border rounded-lg p-4 text-center">
                <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PDF, JPG, PNG (max 5MB)
                </p>
              </div>
            </div>
            
            <div>
              <Label htmlFor="verification-notes">Notes for Verification (Optional)</Label>
              <Textarea
                id="verification-notes"
                value={assetFormData.verificationNotes}
                onChange={(e) => setAssetFormData({...assetFormData, verificationNotes: e.target.value})}
                placeholder="Add any notes about the verification process or requirements"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Location/Access Notes */}
        <div>
          <Label htmlFor="location-notes">Location / Access Notes (Optional)</Label>
          <Textarea
            id="location-notes"
            value={assetFormData.locationNotes}
            onChange={(e) => setAssetFormData({...assetFormData, locationNotes: e.target.value})}
            placeholder="Detailed instructions for accessing this asset (e.g., login steps, physical storage location, contact persons)"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="asset-notes">Additional Notes</Label>
          <Textarea
            id="asset-notes"
            value={assetFormData.notes}
            onChange={(e) => setAssetFormData({...assetFormData, notes: e.target.value})}
            placeholder="Any additional information about this asset"
            rows={3}
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => setShowAssetForm(false)}>
            Cancel
          </Button>
          <Button type="submit" disabled={
            assetFormData.beneficiaries.reduce((sum, b) => sum + b.percentage, 0) !== 100
          }>
            {editingAsset ? 'Update Asset' : 'Add Asset'}
          </Button>
        </div>
      </form>
    </Card>
  );

  const renderBeneficiaryForm = () => (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">
          {editingBeneficiary ? 'Edit Beneficiary' : 'Add New Beneficiary'}
        </h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => {
            setShowBeneficiaryForm(false);
            setEditingBeneficiary(null);
            setBeneficiaryFormData({
              fullName: '',
              email: '',
              phone: '',
              relationship: '',
              countryOfResidence: '',
              assignedAssets: [],
              notes: ''
            });
          }}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <form onSubmit={handleBeneficiaryFormSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h4 className="text-md font-medium">Basic Information</h4>
          
          <div>
            <Label htmlFor="beneficiary-fullname">Full Name *</Label>
            <Input
              id="beneficiary-fullname"
              value={beneficiaryFormData.fullName}
              onChange={(e) => setBeneficiaryFormData({...beneficiaryFormData, fullName: e.target.value})}
              placeholder="Enter full legal name"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="beneficiary-email">Email Address</Label>
              <Input
                id="beneficiary-email"
                type="email"
                value={beneficiaryFormData.email}
                onChange={(e) => setBeneficiaryFormData({...beneficiaryFormData, email: e.target.value})}
                placeholder="Enter email address (optional)"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Used for notifications and digital access
              </p>
            </div>
            
            <div>
              <Label htmlFor="beneficiary-phone">Phone Number</Label>
              <Input
                id="beneficiary-phone"
                type="tel"
                value={beneficiaryFormData.phone}
                onChange={(e) => setBeneficiaryFormData({...beneficiaryFormData, phone: e.target.value})}
                placeholder="Enter phone number (optional)"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="beneficiary-relationship">Relationship *</Label>
              <Select 
                value={beneficiaryFormData.relationship} 
                onValueChange={(value) => setBeneficiaryFormData({...beneficiaryFormData, relationship: value})}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Spouse">Spouse</SelectItem>
                  <SelectItem value="Child">Child</SelectItem>
                  <SelectItem value="Parent">Parent</SelectItem>
                  <SelectItem value="Sibling">Sibling</SelectItem>
                  <SelectItem value="Friend">Friend</SelectItem>
                  <SelectItem value="Partner">Partner</SelectItem>
                  <SelectItem value="Legal Heir">Legal Heir</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="beneficiary-country">Country of Residence</Label>
              <Select 
                value={beneficiaryFormData.countryOfResidence} 
                onValueChange={(value) => setBeneficiaryFormData({...beneficiaryFormData, countryOfResidence: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Kenya">Kenya</SelectItem>
                  <SelectItem value="Uganda">Uganda</SelectItem>
                  <SelectItem value="Tanzania">Tanzania</SelectItem>
                  <SelectItem value="Rwanda">Rwanda</SelectItem>
                  <SelectItem value="Ethiopia">Ethiopia</SelectItem>
                  <SelectItem value="South Africa">South Africa</SelectItem>
                  <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                  <SelectItem value="United States">United States</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                  <SelectItem value="Australia">Australia</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                Used for localization and jurisdiction-specific execution
              </p>
            </div>
          </div>
        </div>

        {/* Asset Assignment */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-md font-medium">Asset Assignment</h4>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={addAssetToBeneficiary}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Assign Asset
            </Button>
          </div>

          {beneficiaryFormData.assignedAssets.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Database className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No assets assigned yet</p>
              <p className="text-sm">Click "Assign Asset" to add assets to this beneficiary</p>
            </div>
          ) : (
            <div className="space-y-3">
              {beneficiaryFormData.assignedAssets.map((assignedAsset, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div className="md:col-span-2">
                      <Label htmlFor={`asset-${index}`}>Select Asset</Label>
                      <Select 
                        value={assignedAsset.assetId} 
                        onValueChange={(value) => updateBeneficiaryAsset(index, 'assetId', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose an asset" />
                        </SelectTrigger>
                        <SelectContent>
                          {assets.map((asset) => (
                            <SelectItem key={asset.id} value={asset.id}>
                              <div className="flex items-center justify-between w-full">
                                <span>{asset.name}</span>
                                <span className="text-sm text-muted-foreground ml-2">
                                  {asset.value}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {assignedAsset.assetId && (
                        <div className="mt-2 p-2 bg-muted/50 rounded text-sm">
                          <div className="flex justify-between">
                            <span>Asset Type:</span>
                            <span>{assets.find(a => a.id === assignedAsset.assetId)?.type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Estimated Value:</span>
                            <span>{getAssetValue(assignedAsset.assetId)}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-end gap-2">
                      <div className="flex-1">
                        <Label htmlFor={`percentage-${index}`}>Percentage Share</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id={`percentage-${index}`}
                            type="number"
                            value={assignedAsset.percentage}
                            onChange={(e) => updateBeneficiaryAsset(index, 'percentage', parseInt(e.target.value) || 0)}
                            placeholder="0"
                            min="0"
                            max="100"
                            className="w-20"
                          />
                          <Percent className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeAssetFromBeneficiary(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Assets Overview */}
          {beneficiaryFormData.assignedAssets.length > 0 && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <h5 className="font-medium mb-2">Assignment Summary</h5>
              <div className="space-y-1 text-sm">
                {beneficiaryFormData.assignedAssets.map((assignedAsset, index) => (
                  assignedAsset.assetId && (
                    <div key={index} className="flex justify-between">
                      <span>{getAssetName(assignedAsset.assetId)}</span>
                      <span className="font-medium">{assignedAsset.percentage}%</span>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Notes and Special Instructions */}
        <div>
          <Label htmlFor="beneficiary-notes">Notes / Special Instructions</Label>
          <Textarea
            id="beneficiary-notes"
            value={beneficiaryFormData.notes}
            onChange={(e) => setBeneficiaryFormData({...beneficiaryFormData, notes: e.target.value})}
            placeholder='e.g., "Only receives real estate," "Must be over 25," "Contact through legal representative"'
            rows={3}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Add any special conditions or instructions for this beneficiary
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setShowBeneficiaryForm(false)}
          >
            Cancel
          </Button>
          <Button type="submit">
            {editingBeneficiary ? 'Update Beneficiary' : 'Add Beneficiary'}
          </Button>
        </div>
      </form>
    </Card>
  );

  const handleBeneficiaryFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBeneficiary) {
      // Update existing beneficiary
      setBeneficiaries(beneficiaries.map(beneficiary => 
        beneficiary.id === editingBeneficiary.id 
          ? { ...beneficiary, ...beneficiaryFormData, verified: true }
          : beneficiary
      ));
      setEditingBeneficiary(null);
    } else {
      // Add new beneficiary
      const newBeneficiary: Beneficiary = {
        id: Date.now().toString(),
        ...beneficiaryFormData,
        verified: false,
        documents: []
      };
      setBeneficiaries([...beneficiaries, newBeneficiary]);
    }
    setShowBeneficiaryForm(false);
    setBeneficiaryFormData({
      fullName: '',
      email: '',
      phone: '',
      relationship: '',
      countryOfResidence: '',
      assignedAssets: [],
      notes: ''
    });
  };

  const addAssetToBeneficiary = () => {
    setBeneficiaryFormData({
      ...beneficiaryFormData,
      assignedAssets: [...beneficiaryFormData.assignedAssets, { assetId: '', percentage: 0 }]
    });
  };

  const removeAssetFromBeneficiary = (index: number) => {
    setBeneficiaryFormData({
      ...beneficiaryFormData,
      assignedAssets: beneficiaryFormData.assignedAssets.filter((_, i) => i !== index)
    });
  };

  const updateBeneficiaryAsset = (index: number, field: 'assetId' | 'percentage', value: string | number) => {
    const newAssignedAssets = beneficiaryFormData.assignedAssets.map((asset, i) => 
      i === index ? { ...asset, [field]: value } : asset
    );
    setBeneficiaryFormData({
      ...beneficiaryFormData,
      assignedAssets: newAssignedAssets
    });
  };

  const getAssetName = (assetId: string) => {
    const asset = assets.find(a => a.id === assetId);
    return asset ? asset.name : 'Unknown Asset';
  };

  const getAssetValue = (assetId: string) => {
    const asset = assets.find(a => a.id === assetId);
    return asset ? asset.value : 'N/A';
  };

  const renderBeneficiariesSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Beneficiaries</h2>
          <p className="text-muted-foreground">Define who will receive parts of your estate</p>
        </div>
        <Button onClick={() => setShowBeneficiaryForm(true)} className="gap-2">
          <UserPlus className="w-4 h-4" />
          Add Beneficiary
        </Button>
      </div>

      {(showBeneficiaryForm || editingBeneficiary) && renderBeneficiaryForm()}

      <div className="grid gap-6">
        {beneficiaries.map((beneficiary) => {
          const RelationIcon = getRelationshipIcon(beneficiary.relationship);
          return (
            <Card key={beneficiary.id} className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                  <RelationIcon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    <h3 className="font-semibold text-lg">{beneficiary.fullName}</h3>
                    <Badge variant={beneficiary.verified ? "default" : "secondary"}>
                      {beneficiary.verified ? "Verified" : "Pending"}
                    </Badge>
                    <Badge variant="outline">{beneficiary.relationship}</Badge>
                    {beneficiary.countryOfResidence && (
                      <Badge variant="outline" className="gap-1">
                        <MapPin className="w-3 h-3" />
                        {beneficiary.countryOfResidence}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-4">
                    <div className="space-y-1">
                      <label className="text-muted-foreground font-medium">Email</label>
                      <p className="font-medium break-all">{beneficiary.email || 'Not provided'}</p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-muted-foreground font-medium">Phone</label>
                      <p className="font-medium break-all">{beneficiary.phone || 'Not provided'}</p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-muted-foreground font-medium">Assigned Assets</label>
                      <p className="font-medium">{beneficiary.assignedAssets.length} assets</p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-muted-foreground font-medium">Documents</label>
                      <p className="font-medium">{beneficiary.documents.length} files</p>
                    </div>
                  </div>

                  {/* Asset Assignment Details */}
                  {beneficiary.assignedAssets.length > 0 && (
                    <div className="mb-4 p-4 bg-muted/30 rounded-lg">
                      <div className="text-sm font-medium mb-3">Asset Assignments:</div>
                      <div className="space-y-2">
                        {beneficiary.assignedAssets.map((assignedAsset, index) => (
                          <div key={index} className="flex justify-between items-center text-sm">
                            <span className="text-foreground">{getAssetName(assignedAsset.assetId)}</span>
                            <Badge variant="secondary" className="font-medium">
                              {assignedAsset.percentage}%
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {beneficiary.notes && (
                    <div className="p-3 bg-blue-50 rounded-lg text-sm">
                      <div className="font-medium text-blue-900 mb-1">Special Instructions:</div>
                      <p className="text-blue-800">{beneficiary.notes}</p>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setEditingBeneficiary(beneficiary);
                      setBeneficiaryFormData({
                        fullName: beneficiary.fullName,
                        email: beneficiary.email,
                        phone: beneficiary.phone,
                        relationship: beneficiary.relationship,
                        countryOfResidence: beneficiary.countryOfResidence,
                        assignedAssets: beneficiary.assignedAssets,
                        notes: beneficiary.notes
                      });
                      setShowBeneficiaryForm(true);
                    }}
                    className="min-w-[40px]"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="min-w-[40px]">
                    <UserX className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const renderSmartWillSection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Smart Will</h2>
        <p className="text-muted-foreground">Create a bespoke will with your content and auto-generated legal structure</p>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Your Will Content</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="will-content">Enter your will content:</Label>
              <Textarea
                id="will-content"
                placeholder="Write your personal wishes, special instructions, and any specific bequests here..."
                value={willContent}
                onChange={(e) => setWillContent(e.target.value)}
                className="min-h-[200px] mt-2"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              Your content will be incorporated into a legally structured will document with your assets, beneficiaries, and executors.
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Will Status</h3>
            <Badge variant="default">Up to Date</Badge>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <label className="text-muted-foreground">Last Updated</label>
              <p className="font-medium">January 18, 2024</p>
            </div>
            <div>
              <label className="text-muted-foreground">Assets Included</label>
              <p className="font-medium">12 assets</p>
            </div>
            <div>
              <label className="text-muted-foreground">Beneficiaries</label>
              <p className="font-medium">5 people</p>
            </div>
            <div>
              <label className="text-muted-foreground">Executors</label>
              <p className="font-medium">2 appointed</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Will Components</h3>
          <div className="space-y-3">
            {[
              { component: 'Personal Content', status: willContent ? 'Complete' : 'Pending', items: willContent ? 'Custom content added' : 'No content added' },
              { component: 'Asset Distribution', status: 'Complete', items: '12 assets assigned' },
              { component: 'Beneficiary Details', status: 'Complete', items: '5 beneficiaries verified' },
              { component: 'Executor Appointments', status: 'Complete', items: '2 executors confirmed' },
              { component: 'Guardian Assignments', status: 'Complete', items: '1 guardian appointed' },
              { component: 'Life Triggers', status: 'Complete', items: '3 triggers configured' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded">
                <div>
                  <p className="font-medium">{item.component}</p>
                  <p className="text-sm text-muted-foreground">{item.items}</p>
                </div>
                <Badge variant={item.status === 'Complete' ? 'default' : 'secondary'}>{item.status}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Actions</h3>
            <Button 
              className="gap-2"
              onClick={() => {
                const will = generateWill();
                // Open preview modal or new tab with will content
                console.log(will);
              }}
            >
              <Eye className="w-4 h-4" />
              Preview Will
            </Button>
          </div>
          <div className="flex gap-4">
            <Button 
              className="gap-2"
              onClick={() => {
                const will = generateWill();
                // Open preview modal or new tab with will content
                console.log(will);
              }}
            >
              <Eye className="w-4 h-4" />
              Preview Will
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
            <Button variant="outline" className="gap-2">
              <Share2 className="w-4 h-4" />
              Share with Executor
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderLifeTriggersSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Life Triggers</h2>
          <p className="text-muted-foreground">Monitor your status and automate inheritance protocol activation</p>
        </div>
        <Button onClick={() => setShowTriggerForm(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Trigger
        </Button>
      </div>

      {/* Inheritance Protocol Section */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="pb-4 border-b">
            <h3 className="text-lg font-semibold mb-2">OMRA's Automated Inheritance Protocol</h3>
            <p className="text-sm text-muted-foreground">
              This section monitors your status through regular check-ins and trusted contacts to ensure your legacy is only activated when necessary.
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Please review and set your preferences below:
            </p>
          </div>

          {/* Check-In Monitoring */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-medium text-sm">🔘</span>
              </div>
              <h4 className="font-semibold">Check-In Monitoring</h4>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-4">
                OMRA will send you monthly check-ins to confirm your well-being.
                If you miss 3 in a row, we'll escalate to daily check-ins. Continued silence will activate your inheritance protocol.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="monthly-checkins"
                    checked={inheritanceProtocol.checkInMonitoring.monthlyCheckIns}
                    onCheckedChange={(checked) => setInheritanceProtocol(prev => ({
                      ...prev,
                      checkInMonitoring: { ...prev.checkInMonitoring, monthlyCheckIns: !!checked }
                    }))}
                  />
                  <Label htmlFor="monthly-checkins" className="text-sm">
                    I understand and agree to monthly check-ins
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="daily-escalation"
                    checked={inheritanceProtocol.checkInMonitoring.escalateToDailyAfter3Missed}
                    onCheckedChange={(checked) => setInheritanceProtocol(prev => ({
                      ...prev,
                      checkInMonitoring: { ...prev.checkInMonitoring, escalateToDailyAfter3Missed: !!checked }
                    }))}
                  />
                  <Label htmlFor="daily-escalation" className="text-sm">
                    Enable daily check-ins after 3 missed monthly check-ins
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="protocol-activation"
                    checked={inheritanceProtocol.checkInMonitoring.activateAfter7DailyMissed}
                    onCheckedChange={(checked) => setInheritanceProtocol(prev => ({
                      ...prev,
                      checkInMonitoring: { ...prev.checkInMonitoring, activateAfter7DailyMissed: !!checked }
                    }))}
                  />
                  <Label htmlFor="protocol-activation" className="text-sm">
                    Allow OMRA to continue to protocol if no response after 7 daily attempts
                  </Label>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-medium text-sm">📇</span>
              </div>
              <h4 className="font-semibold">Add Emergency Contact (Optional)</h4>
            </div>
            
            <p className="text-sm text-muted-foreground">
              This person will be contacted to verify your status before OMRA begins your inheritance protocol.
            </p>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="emergency-name">Full Name</Label>
                <Input
                  id="emergency-name"
                  placeholder="Enter full name"
                  value={inheritanceProtocol.emergencyContact?.fullName || ''}
                  onChange={(e) => setInheritanceProtocol(prev => ({
                    ...prev,
                    emergencyContact: prev.emergencyContact ? 
                      { ...prev.emergencyContact, fullName: e.target.value } :
                      { fullName: e.target.value, relationship: '', contact: '', requireConfirmation: false }
                  }))}
                />
              </div>
              
              <div>
                <Label htmlFor="emergency-relationship">Relationship</Label>
                <Input
                  id="emergency-relationship"
                  placeholder="e.g., Spouse, Child, Friend"
                  value={inheritanceProtocol.emergencyContact?.relationship || ''}
                  onChange={(e) => setInheritanceProtocol(prev => ({
                    ...prev,
                    emergencyContact: prev.emergencyContact ? 
                      { ...prev.emergencyContact, relationship: e.target.value } :
                      { fullName: '', relationship: e.target.value, contact: '', requireConfirmation: false }
                  }))}
                />
              </div>
              
              <div>
                <Label htmlFor="emergency-contact">Email / Phone</Label>
                <Input
                  id="emergency-contact"
                  placeholder="Enter email or phone number"
                  value={inheritanceProtocol.emergencyContact?.contact || ''}
                  onChange={(e) => setInheritanceProtocol(prev => ({
                    ...prev,
                    emergencyContact: prev.emergencyContact ? 
                      { ...prev.emergencyContact, contact: e.target.value } :
                      { fullName: '', relationship: '', contact: e.target.value, requireConfirmation: false }
                  }))}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="emergency-confirmation"
                  checked={inheritanceProtocol.emergencyContact?.requireConfirmation || false}
                  onCheckedChange={(checked) => setInheritanceProtocol(prev => ({
                    ...prev,
                    emergencyContact: prev.emergencyContact ? 
                      { ...prev.emergencyContact, requireConfirmation: !!checked } :
                      { fullName: '', relationship: '', contact: '', requireConfirmation: !!checked }
                  }))}
                />
                <Label htmlFor="emergency-confirmation" className="text-sm">
                  Require confirmation from this contact before inheritance begins
                </Label>
              </div>
            </div>
          </div>

          {/* Lawyer */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-medium text-sm">⚖️</span>
              </div>
              <h4 className="font-semibold">Add a Lawyer (Optional)</h4>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Appoint a lawyer to confirm your status if you're unreachable.
            </p>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="lawyer-name">Full Name</Label>
                <Input
                  id="lawyer-name"
                  placeholder="Enter lawyer's full name"
                  value={inheritanceProtocol.lawyer?.fullName || ''}
                  onChange={(e) => setInheritanceProtocol(prev => ({
                    ...prev,
                    lawyer: prev.lawyer ? 
                      { ...prev.lawyer, fullName: e.target.value } :
                      { fullName: e.target.value, firm: '', contact: '', requireVerification: false }
                  }))}
                />
              </div>
              
              <div>
                <Label htmlFor="lawyer-firm">Law Firm / Title</Label>
                <Input
                  id="lawyer-firm"
                  placeholder="Enter law firm or title"
                  value={inheritanceProtocol.lawyer?.firm || ''}
                  onChange={(e) => setInheritanceProtocol(prev => ({
                    ...prev,
                    lawyer: prev.lawyer ? 
                      { ...prev.lawyer, firm: e.target.value } :
                      { fullName: '', firm: e.target.value, contact: '', requireVerification: false }
                  }))}
                />
              </div>
              
              <div>
                <Label htmlFor="lawyer-contact">Contact Info</Label>
                <Input
                  id="lawyer-contact"
                  placeholder="Enter contact information"
                  value={inheritanceProtocol.lawyer?.contact || ''}
                  onChange={(e) => setInheritanceProtocol(prev => ({
                    ...prev,
                    lawyer: prev.lawyer ? 
                      { ...prev.lawyer, contact: e.target.value } :
                      { fullName: '', firm: '', contact: e.target.value, requireVerification: false }
                  }))}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="lawyer-verification"
                  checked={inheritanceProtocol.lawyer?.requireVerification || false}
                  onCheckedChange={(checked) => setInheritanceProtocol(prev => ({
                    ...prev,
                    lawyer: prev.lawyer ? 
                      { ...prev.lawyer, requireVerification: !!checked } :
                      { fullName: '', firm: '', contact: '', requireVerification: !!checked }
                  }))}
                />
                <Label htmlFor="lawyer-verification" className="text-sm">
                  Require legal verification before inheritance is activated
                </Label>
              </div>
            </div>
          </div>

          {/* Executor */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-medium text-sm">🧑‍⚖️</span>
              </div>
              <h4 className="font-semibold">Assign an Executor (Optional)</h4>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Your executor will oversee or approve the release of your inheritance instructions.
            </p>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="executor-name">Full Name</Label>
                <Input
                  id="executor-name"
                  placeholder="Enter executor's full name"
                  value={inheritanceProtocol.executor?.fullName || ''}
                  onChange={(e) => setInheritanceProtocol(prev => ({
                    ...prev,
                    executor: prev.executor ? 
                      { ...prev.executor, fullName: e.target.value } :
                      { fullName: e.target.value, relationship: '', contact: '', role: 'passive', requireApproval: false }
                  }))}
                />
              </div>
              
              <div>
                <Label htmlFor="executor-relationship">Relationship</Label>
                <Input
                  id="executor-relationship"
                  placeholder="e.g., Spouse, Child, Friend, Lawyer"
                  value={inheritanceProtocol.executor?.relationship || ''}
                  onChange={(e) => setInheritanceProtocol(prev => ({
                    ...prev,
                    executor: prev.executor ? 
                      { ...prev.executor, relationship: e.target.value } :
                      { fullName: '', relationship: e.target.value, contact: '', role: 'passive', requireApproval: false }
                  }))}
                />
              </div>
              
              <div>
                <Label htmlFor="executor-contact">Contact Info</Label>
                <Input
                  id="executor-contact"
                  placeholder="Enter contact information"
                  value={inheritanceProtocol.executor?.contact || ''}
                  onChange={(e) => setInheritanceProtocol(prev => ({
                    ...prev,
                    executor: prev.executor ? 
                      { ...prev.executor, contact: e.target.value } :
                      { fullName: '', relationship: '', contact: e.target.value, role: 'passive', requireApproval: false }
                  }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Role:</Label>
                <div className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="executor-passive"
                      name="executor-role"
                      checked={inheritanceProtocol.executor?.role === 'passive'}
                      onChange={() => setInheritanceProtocol(prev => ({
                        ...prev,
                        executor: prev.executor ? 
                          { ...prev.executor, role: 'passive' } :
                          { fullName: '', relationship: '', contact: '', role: 'passive', requireApproval: false }
                      }))}
                    />
                    <Label htmlFor="executor-passive" className="text-sm">
                      Passive (notify only)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="executor-active"
                      name="executor-role"
                      checked={inheritanceProtocol.executor?.role === 'active'}
                      onChange={() => setInheritanceProtocol(prev => ({
                        ...prev,
                        executor: prev.executor ? 
                          { ...prev.executor, role: 'active' } :
                          { fullName: '', relationship: '', contact: '', role: 'active', requireApproval: false }
                      }))}
                    />
                    <Label htmlFor="executor-active" className="text-sm">
                      Active (must approve inheritance)
                    </Label>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="executor-approval"
                  checked={inheritanceProtocol.executor?.requireApproval || false}
                  onCheckedChange={(checked) => setInheritanceProtocol(prev => ({
                    ...prev,
                    executor: prev.executor ? 
                      { ...prev.executor, requireApproval: !!checked } :
                      { fullName: '', relationship: '', contact: '', role: 'passive', requireApproval: !!checked }
                  }))}
                />
                <Label htmlFor="executor-approval" className="text-sm">
                  Require executor approval before inheritance begins
                </Label>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-4 border-t">
            <Button 
              onClick={() => {
                // Save inheritance protocol settings
                console.log('Saving inheritance protocol:', inheritanceProtocol);
              }}
              className="gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              Save Protocol Settings
            </Button>
          </div>
        </div>
      </Card>

      {/* Existing Life Triggers */}
      <div className="grid gap-4">
        {lifeTriggers.map((trigger) => {
          const TriggerIcon = getTriggerIcon(trigger.type);
          return (
            <Card key={trigger.id} className="p-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <TriggerIcon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{trigger.type}</h3>
                    <Badge variant={trigger.active ? "default" : "secondary"}>
                      {trigger.active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <label className="text-muted-foreground">Threshold</label>
                      <p className="font-medium">{trigger.threshold}</p>
                    </div>
                    <div>
                      <label className="text-muted-foreground">Recipients</label>
                      <p className="font-medium">{trigger.recipients.length} contacts</p>
                    </div>
                    <div>
                      <label className="text-muted-foreground">Backup Method</label>
                      <p className="font-medium">{trigger.backupMethod}</p>
                    </div>
                    <div>
                      <label className="text-muted-foreground">Status</label>
                      <p className="font-medium">{trigger.active ? "Monitoring" : "Disabled"}</p>
                    </div>
                  </div>
                  <div className="mt-3 p-2 bg-muted/50 rounded text-sm">
                    <strong>Instructions:</strong> {trigger.instructions}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setEditingTrigger(trigger)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const renderTrustedForm = () => (
    <Card className="p-6 max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">
          {editingTrusted ? 'Edit Trusted Person' : 'Add Trusted Person'}
        </h3>
        <Button 
          variant="outline"
          size="sm"
          onClick={() => {
            setShowTrustedForm(false);
            setEditingTrusted(null);
            setTrustedFormData({
              fullName: '',
              role: '',
              email: '',
              phone: '',
              responsibilities: [],
              documents: [],
              twoFAEnabled: false,
              inviteStatus: 'pending',
              notes: '',
            });
          }}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      <form onSubmit={handleTrustedFormSubmit} className="space-y-5">
        <div>
          <Label htmlFor="trusted-fullname">Full Name *</Label>
          <Input
            id="trusted-fullname"
            value={trustedFormData.fullName}
            onChange={(e) => setTrustedFormData({...trustedFormData, fullName: e.target.value})}
            placeholder="Enter full legal name"
            required
          />
        </div>
        <div>
          <Label htmlFor="trusted-role">Role *</Label>
          <Select 
            value={trustedFormData.role}
            onValueChange={(value) => setTrustedFormData({...trustedFormData, role: value, responsibilities: roleResponsibilities[value] || []})}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Executor">Executor</SelectItem>
              <SelectItem value="Guardian">Guardian</SelectItem>
              <SelectItem value="Trusted Contact">Trusted Contact</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="trusted-email">Email</Label>
            <Input
              id="trusted-email"
              type="email"
              value={trustedFormData.email}
              onChange={(e) => setTrustedFormData({...trustedFormData, email: e.target.value})}
              placeholder="Enter email address"
            />
          </div>
          <div>
            <Label htmlFor="trusted-phone">Phone</Label>
            <Input
              id="trusted-phone"
              type="tel"
              value={trustedFormData.phone}
              onChange={(e) => setTrustedFormData({...trustedFormData, phone: e.target.value})}
              placeholder="Enter phone number"
            />
          </div>
        </div>
        {/* Responsibilities Section */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Responsibilities *</Label>
            <Button variant="outline" size="sm"
              type="button"
              onClick={() => setTrustedFormData({
                ...trustedFormData,
                responsibilities: [...trustedFormData.responsibilities, ''],
              })}
            >
              <Plus className="w-4 h-4 mr-1" />Add
            </Button>
          </div>
          <div className="space-y-2">
            {(trustedFormData.responsibilities || []).map((resp, idx) => (
              <div className="flex items-center gap-2" key={idx}>
                <Input
                  value={resp}
                  onChange={e => {
                    const next = [...trustedFormData.responsibilities];
                    next[idx] = e.target.value;
                    setTrustedFormData({ ...trustedFormData, responsibilities: next });
                  }}
                  placeholder="Responsibility description"
                  required
                />
                {trustedFormData.responsibilities.length > 1 && (
                  <Button type="button" size="icon" variant="ghost" onClick={() => {
                    setTrustedFormData({
                      ...trustedFormData,
                      responsibilities: trustedFormData.responsibilities.filter((_, i) => i !== idx)
                    });
                  }}><X className="w-4 h-4" /></Button>
                )}
              </div>
            ))}
          </div>
          <div className="text-xs text-muted-foreground">
            {trustedFormData.role &&
              (<>
                Typical: {roleResponsibilities[trustedFormData.role]?.join(', ')}
              </>)
            }
          </div>
        </div>
        {/* Document Upload Section */}
        <div>
          <Label>Upload Documents</Label>
          <div className="mt-2 border-2 border-dashed border-border rounded-lg p-4 text-center">
            <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              Click to upload or drag and drop
            </p>
            <Input type="file" multiple className="mt-2" onChange={handleDocumentUpload} />
            <div className="mt-2 flex flex-wrap gap-2 justify-center">
              {trustedFormData.documents.map((doc, i) => (
                <Badge key={i} variant="secondary">{doc}</Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">PDF, JPG, PNG accepted (max 5MB each)</p>
          </div>
        </div>
        {/* 2FA and Invite Status */}
        <div className="flex items-center gap-4">
          <Switch
            id="trusted-2fa"
            checked={trustedFormData.twoFAEnabled}
            onCheckedChange={checked => setTrustedFormData({...trustedFormData, twoFAEnabled: !!checked})}
          />
          <Label htmlFor="trusted-2fa">Enable Two-Factor Authentication</Label>
        </div>
        <div>
          <Label htmlFor="trusted-invite">Invite Status</Label>
          <Select 
            value={trustedFormData.inviteStatus}
            onValueChange={value => setTrustedFormData({...trustedFormData, inviteStatus: value as any})}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="declined">Declined</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Notes Field */}
        <div>
          <Label htmlFor="trusted-notes">Notes / Special Instructions (Optional)</Label>
          <Textarea
            id="trusted-notes"
            value={trustedFormData.notes}
            onChange={e => setTrustedFormData({...trustedFormData, notes: e.target.value})}
            placeholder="e.g., Only available on weekends, must consult with lawyer before decisions, etc."
            rows={3}
          />
        </div>
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => setShowTrustedForm(false)}>
            Cancel
          </Button>
          <Button type="submit">
            {editingTrusted ? 'Update Trusted Person' : 'Add Trusted Person'}
          </Button>
        </div>
      </form>
    </Card>
  );

  const handleTrustedFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTrusted) {
      setTrustedPeople(trustedPeople.map(person =>
        person.id === editingTrusted.id 
          ? { ...person, ...trustedFormData }
          : person
      ));
      setEditingTrusted(null);
    } else {
      const newPerson: TrustedPerson = {
        id: Date.now().toString(),
        ...trustedFormData,
      };
      setTrustedPeople([...trustedPeople, newPerson]);
    }
    setShowTrustedForm(false);
    setTrustedFormData({
      fullName: '',
      role: '',
      email: '',
      phone: '',
      responsibilities: [],
      documents: [],
      twoFAEnabled: false,
      inviteStatus: 'pending',
      notes: '',
    });
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filenames = Array.from(e.target.files).map(f => f.name);
      setTrustedFormData({
        ...trustedFormData,
        documents: [...trustedFormData.documents, ...filenames],
      });
    }
  };

  const renderTrustedSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Trusted People</h2>
          <p className="text-muted-foreground">Executors, guardians, and trusted contacts who help manage your legacy</p>
        </div>
        <Button onClick={() => setShowTrustedForm(true)} className="gap-2">
          <UserPlus className="w-4 h-4" />
          Add Trusted Person
        </Button>
      </div>

      {/* Role Descriptions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4 bg-blue-50/50 border-blue-200">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Briefcase className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Executor</h3>
              <p className="text-sm text-blue-700 leading-relaxed">
                Manages your estate after death, handles legal proceedings, distributes assets to beneficiaries, and ensures your will is executed properly.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-green-50/50 border-green-200">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Shield className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-green-900 mb-1">Guardian</h3>
              <p className="text-sm text-green-700 leading-relaxed">
                Cares for your minor children, makes educational and medical decisions, and ensures their well-being until they reach adulthood.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-purple-50/50 border-purple-200">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <UserCheck className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-purple-900 mb-1">Trusted Contact</h3>
              <p className="text-sm text-purple-700 leading-relaxed">
                Provides emergency contact information, helps verify your status during life triggers, and assists with account recovery.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="executors">Executors</TabsTrigger>
          <TabsTrigger value="guardians">Guardians</TabsTrigger>
          <TabsTrigger value="contacts">Trusted Contacts</TabsTrigger>
        </TabsList>
        {/* Trusted Form Modal */}
        {(showTrustedForm || editingTrusted) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            {renderTrustedForm()}
          </div>
        )}
        <TabsContent value="all" className="space-y-4">
          {trustedPeople.map((person) => {
            const RoleIcon = getRoleIcon(person.role);
            return (
              <Card key={person.id} className="p-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                    <RoleIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <h3 className="font-semibold text-base">{person.fullName}</h3>
                      <Badge variant="outline" className="text-xs">{person.role}</Badge>
                      <Badge variant={
                        person.inviteStatus === 'accepted' ? 'default' : 
                        person.inviteStatus === 'pending' ? 'secondary' : 'destructive'
                      } className="text-xs">
                        {person.inviteStatus}
                      </Badge>
                      {person.twoFAEnabled && (
                        <Badge variant="outline" className="gap-1 text-xs">
                          <ShieldCheck className="w-3 h-3" />
                          2FA
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm mb-4">
                      <div className="space-y-1">
                        <label className="text-muted-foreground font-medium">Email</label>
                        <p className="font-medium break-all">{person.email}</p>
                      </div>
                      <div className="space-y-1">
                        <label className="text-muted-foreground font-medium">Phone</label>
                        <p className="font-medium break-all">{person.phone}</p>
                      </div>
                      <div className="space-y-1">
                        <label className="text-muted-foreground font-medium">Responsibilities</label>
                        <p className="font-medium">{person.responsibilities.length} tasks</p>
                      </div>
                      <div className="space-y-1">
                        <label className="text-muted-foreground font-medium">Documents</label>
                        <p className="font-medium">{person.documents.length} files</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <div className="text-sm font-medium mb-2 text-foreground">Key Responsibilities:</div>
                        <div className="flex flex-wrap gap-1">
                          {person.responsibilities.map((responsibility, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {responsibility}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {person.role === 'Executor' && (
                        <div className="p-3 bg-blue-50/50 border border-blue-200 rounded-lg">
                          <div className="text-sm font-medium mb-1 text-blue-900">Executor Powers:</div>
                          <p className="text-xs text-blue-700 leading-relaxed">
                            This person can legally represent your estate, access financial accounts, sell assets, pay debts, and distribute inheritance according to your will.
                          </p>
                        </div>
                      )}
                      
                      {person.role === 'Guardian' && (
                        <div className="p-3 bg-green-50/50 border border-green-200 rounded-lg">
                          <div className="text-sm font-medium mb-1 text-green-900">Guardian Authority:</div>
                          <p className="text-xs text-green-700 leading-relaxed">
                            This person has legal authority to make decisions about your minor children's welfare, education, healthcare, and daily activities.
                          </p>
                        </div>
                      )}
                      
                      {person.role === 'Trusted Contact' && (
                        <div className="p-3 bg-purple-50/50 border border-purple-200 rounded-lg">
                          <div className="text-sm font-medium mb-1 text-purple-900">Contact Role:</div>
                          <p className="text-xs text-purple-700 leading-relaxed">
                            This person serves as an emergency contact and can help verify your status during life trigger events or account recovery situations.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setEditingTrusted(person)}
                      className="min-w-[40px]"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="min-w-[40px]"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="min-w-[40px]"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </TabsContent>
        
        <TabsContent value="executors" className="space-y-4">
          {trustedPeople.filter(person => person.role === 'Executor').map((person) => {
            const RoleIcon = getRoleIcon(person.role);
            return (
              <Card key={person.id} className="p-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                    <RoleIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <h3 className="font-semibold text-base">{person.fullName}</h3>
                      <Badge variant="outline" className="text-xs">{person.role}</Badge>
                      <Badge variant={
                        person.inviteStatus === 'accepted' ? 'default' : 
                        person.inviteStatus === 'pending' ? 'secondary' : 'destructive'
                      } className="text-xs">
                        {person.inviteStatus}
                      </Badge>
                      {person.twoFAEnabled && (
                        <Badge variant="outline" className="gap-1 text-xs">
                          <ShieldCheck className="w-3 h-3" />
                          2FA
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm mb-4">
                      <div className="space-y-1">
                        <label className="text-muted-foreground font-medium">Email</label>
                        <p className="font-medium break-all">{person.email}</p>
                      </div>
                      <div className="space-y-1">
                        <label className="text-muted-foreground font-medium">Phone</label>
                        <p className="font-medium break-all">{person.phone}</p>
                      </div>
                      <div className="space-y-1">
                        <label className="text-muted-foreground font-medium">Responsibilities</label>
                        <p className="font-medium">{person.responsibilities.length} tasks</p>
                      </div>
                      <div className="space-y-1">
                        <label className="text-muted-foreground font-medium">Documents</label>
                        <p className="font-medium">{person.documents.length} files</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <div className="text-sm font-medium mb-2 text-foreground">Key Responsibilities:</div>
                        <div className="flex flex-wrap gap-1">
                          {person.responsibilities.map((responsibility, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {responsibility}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="p-3 bg-blue-50/50 border border-blue-200 rounded-lg">
                        <div className="text-sm font-medium mb-1 text-blue-900">Executor Powers:</div>
                        <p className="text-xs text-blue-700 leading-relaxed">
                          This person can legally represent your estate, access financial accounts, sell assets, pay debts, and distribute inheritance according to your will.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setEditingTrusted(person)}
                      className="w-full"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </TabsContent>
        
        <TabsContent value="guardians" className="space-y-4">
          {trustedPeople.filter(person => person.role === 'Guardian').map((person) => {
            const RoleIcon = getRoleIcon(person.role);
            return (
              <Card key={person.id} className="p-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                    <RoleIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <h3 className="font-semibold text-base">{person.fullName}</h3>
                      <Badge variant="outline" className="text-xs">{person.role}</Badge>
                      <Badge variant={
                        person.inviteStatus === 'accepted' ? 'default' : 
                        person.inviteStatus === 'pending' ? 'secondary' : 'destructive'
                      } className="text-xs">
                        {person.inviteStatus}
                      </Badge>
                      {person.twoFAEnabled && (
                        <Badge variant="outline" className="gap-1 text-xs">
                          <ShieldCheck className="w-3 h-3" />
                          2FA
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm mb-4">
                      <div className="space-y-1">
                        <label className="text-muted-foreground font-medium">Email</label>
                        <p className="font-medium break-all">{person.email}</p>
                      </div>
                      <div className="space-y-1">
                        <label className="text-muted-foreground font-medium">Phone</label>
                        <p className="font-medium break-all">{person.phone}</p>
                      </div>
                      <div className="space-y-1">
                        <label className="text-muted-foreground font-medium">Responsibilities</label>
                        <p className="font-medium">{person.responsibilities.length} tasks</p>
                      </div>
                      <div className="space-y-1">
                        <label className="text-muted-foreground font-medium">Documents</label>
                        <p className="font-medium">{person.documents.length} files</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <div className="text-sm font-medium mb-2 text-foreground">Key Responsibilities:</div>
                        <div className="flex flex-wrap gap-1">
                          {person.responsibilities.map((responsibility, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {responsibility}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="p-3 bg-green-50/50 border border-green-200 rounded-lg">
                        <div className="text-sm font-medium mb-1 text-green-900">Guardian Authority:</div>
                        <p className="text-xs text-green-700 leading-relaxed">
                          This person has legal authority to make decisions about your minor children's welfare, education, healthcare, and daily activities.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setEditingTrusted(person)}
                      className="w-full"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </TabsContent>
        
        <TabsContent value="contacts" className="space-y-4">
          {trustedPeople.filter(person => person.role === 'Trusted Contact').map((person) => {
            const RoleIcon = getRoleIcon(person.role);
            return (
              <Card key={person.id} className="p-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                    <RoleIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <h3 className="font-semibold text-base">{person.fullName}</h3>
                      <Badge variant="outline" className="text-xs">{person.role}</Badge>
                      <Badge variant={
                        person.inviteStatus === 'accepted' ? 'default' : 
                        person.inviteStatus === 'pending' ? 'secondary' : 'destructive'
                      } className="text-xs">
                        {person.inviteStatus}
                      </Badge>
                      {person.twoFAEnabled && (
                        <Badge variant="outline" className="gap-1 text-xs">
                          <ShieldCheck className="w-3 h-3" />
                          2FA
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm mb-4">
                      <div className="space-y-1">
                        <label className="text-muted-foreground font-medium">Email</label>
                        <p className="font-medium break-all">{person.email}</p>
                      </div>
                      <div className="space-y-1">
                        <label className="text-muted-foreground font-medium">Phone</label>
                        <p className="font-medium break-all">{person.phone}</p>
                      </div>
                      <div className="space-y-1">
                        <label className="text-muted-foreground font-medium">Responsibilities</label>
                        <p className="font-medium">{person.responsibilities.length} tasks</p>
                      </div>
                      <div className="space-y-1">
                        <label className="text-muted-foreground font-medium">Documents</label>
                        <p className="font-medium">{person.documents.length} files</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <div className="text-sm font-medium mb-2 text-foreground">Key Responsibilities:</div>
                        <div className="flex flex-wrap gap-1">
                          {person.responsibilities.map((responsibility, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {responsibility}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="p-3 bg-purple-50/50 border border-purple-200 rounded-lg">
                        <div className="text-sm font-medium mb-1 text-purple-900">Contact Role:</div>
                        <p className="text-xs text-purple-700 leading-relaxed">
                          This person serves as an emergency contact and can help verify your status during life trigger events or account recovery situations.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setEditingTrusted(person)}
                      className="w-full"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </TabsContent>
      </Tabs>
    </div>
  );

  const renderSecuritySection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Security Settings</h2>
        <p className="text-muted-foreground">Manage your account security and privacy</p>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Authentication</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
              <Button variant="outline">Enable 2FA</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Password</h4>
                <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
              </div>
              <Button variant="outline">Change Password</Button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Login History</h3>
          <div className="space-y-3">
            {[
              { device: 'Chrome on Windows', location: 'Nairobi, Kenya', time: '2 hours ago', current: true },
              { device: 'iPhone App', location: 'Nairobi, Kenya', time: '1 day ago', current: false },
              { device: 'Safari on Mac', location: 'Nairobi, Kenya', time: '3 days ago', current: false }
            ].map((session, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded">
                <div>
                  <p className="font-medium">{session.device}</p>
                  <p className="text-sm text-muted-foreground">{session.location} • {session.time}</p>
                </div>
                {session.current && <Badge>Current</Badge>}
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recovery Options</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Recovery Email</h4>
                <p className="text-sm text-muted-foreground">recovery@gmail.com</p>
              </div>
              <Button variant="outline">Update</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Recovery Phone</h4>
                <p className="text-sm text-muted-foreground">+254722123456</p>
              </div>
              <Button variant="outline">Update</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderUpgradePlanSection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Upgrade Plan</h2>
        <p className="text-muted-foreground">Choose the best plan for your needs</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Free Will</h3>
            <div className="text-3xl font-bold mb-2">Free</div>
            <p className="text-sm text-muted-foreground mb-4">Basic will creation with blockchain security</p>
            <Button variant="outline" className="w-full">Current Plan</Button>
          </div>
          <div className="space-y-3 mt-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm">Basic will template</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm">Up to 5 assets</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm">Blockchain verification</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm">Email support</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-primary border-2">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Verified Will</h3>
            <div className="text-3xl font-bold mb-2">KES 15,000</div>
            <p className="text-sm text-muted-foreground mb-4">Professional notarization with immutable blockchain records</p>
            <Button className="w-full">Upgrade Now</Button>
          </div>
          <div className="space-y-3 mt-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm">Everything in Free Will</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm">Legal review by attorneys</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm">Notarization service</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm">Unlimited assets</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm">Priority support</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Trust Setup</h3>
            <div className="text-3xl font-bold mb-2">KES 50,000</div>
            <p className="text-sm text-muted-foreground mb-4">Complete trust services with advanced asset protection</p>
            <Button variant="outline" className="w-full">Coming Soon</Button>
          </div>
          <div className="space-y-3 mt-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm">Everything in Verified Will</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm">Trust establishment</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm">Asset protection planning</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm">Dedicated legal advisor</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm">Tax optimization strategies</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm">Ongoing trust management</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Benefits Descriptions Outside Cards */}
      <div className="grid gap-6 md:grid-cols-3 mt-8">
        {/* Free Will Benefits */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-sm mb-2">Perfect for:</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Individuals with simple estates who want basic digital inheritance protection. 
            Get started with essential will creation and blockchain security for your core assets.
          </p>
        </div>

        {/* Verified Will Benefits */}
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-sm mb-3 text-blue-900">Why Choose Verified Will:</h4>
          <div className="space-y-2 text-xs text-blue-800">
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
              <p className="leading-relaxed">
                <strong>Legal Certainty:</strong> Your will is reviewed by qualified attorneys and officially notarized, ensuring it meets all legal requirements and will hold up in court.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
              <p className="leading-relaxed">
                <strong>Immutable Security:</strong> Professional notarization combined with blockchain technology creates an unchangeable record that cannot be disputed or tampered with.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
              <p className="leading-relaxed">
                <strong>Peace of Mind:</strong> Eliminate family disputes and legal challenges with a professionally verified will that clearly documents your wishes.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
              <p className="leading-relaxed">
                <strong>Unlimited Assets:</strong> Perfect for growing portfolios - add as many assets as you need without restrictions.
              </p>
            </div>
          </div>
        </div>

        {/* Trust Setup Benefits */}
        <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
          <h4 className="font-semibold text-sm mb-3 text-emerald-900">Why Choose Trust Setup:</h4>
          <div className="space-y-2 text-xs text-emerald-800">
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0"></div>
              <p className="leading-relaxed">
                <strong>Maximum Asset Protection:</strong> Shield your wealth from creditors, lawsuits, and other legal claims through professionally structured trust arrangements.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0"></div>
              <p className="leading-relaxed">
                <strong>Tax Optimization:</strong> Minimize estate taxes and maximize wealth transfer to your beneficiaries through strategic trust planning.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0"></div>
              <p className="leading-relaxed">
                <strong>Generational Wealth:</strong> Create lasting family wealth structures that can benefit multiple generations while maintaining control and privacy.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0"></div>
              <p className="leading-relaxed">
                <strong>Privacy & Control:</strong> Keep your financial affairs private while maintaining control over how and when assets are distributed.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0"></div>
              <p className="leading-relaxed">
                <strong>Professional Management:</strong> Dedicated legal advisors handle all ongoing trust administration and compliance requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSupportSection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Support</h2>
        <p className="text-muted-foreground">Get help with your Omra account and services</p>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Contact Support</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Email Support</p>
                <p className="text-sm text-muted-foreground">support@omra.co.ke</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Phone Support</p>
                <p className="text-sm text-muted-foreground">+254 700 000 000</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Business Hours</p>
                <p className="text-sm text-muted-foreground">Monday - Friday: 8AM - 6PM EAT</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-primary pl-4">
              <h4 className="font-medium">How secure is my will on the blockchain?</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Your will is encrypted and stored on an immutable blockchain, ensuring it cannot be altered or deleted. Only authorized parties can access the content.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h4 className="font-medium">What happens if I forget my password?</h4>
              <p className="text-sm text-muted-foreground mt-1">
                You can reset your password using your recovery email or phone. For additional security, we recommend setting up 2FA.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h4 className="font-medium">How do life triggers work?</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Life triggers monitor specific events (like account inactivity) and automatically notify your beneficiaries or executors when conditions are met.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h4 className="font-medium">Can I update my will after creation?</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Yes, you can update your will at any time. Each update creates a new version on the blockchain while maintaining the complete history.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Legal Resources</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Kenyan Succession Law Guide</p>
                <p className="text-sm text-muted-foreground">Understanding your rights under Kenyan law</p>
              </div>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Will Writing Best Practices</p>
                <p className="text-sm text-muted-foreground">Tips for creating an effective will</p>
              </div>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Asset Documentation Checklist</p>
                <p className="text-sm text-muted-foreground">What documents you need for each asset type</p>
              </div>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderDashboardOverview = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome back, {userName}
        </h1>
        <p className="text-muted-foreground">
          Here's an overview of your digital legacy portfolio
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            title: 'Total Assets',
            value: 'KES 20,650,000',
            change: '+12.5%',
            changeType: 'increase' as const,
            icon: DollarSign,
            color: 'bg-blue-50 text-blue-600'
          },
          {
            title: 'Verified Assets',
            value: '8 of 12',
            change: '+2 this week',
            changeType: 'increase' as const,
            icon: CheckCircle,
            color: 'bg-green-50 text-green-600'
          },
          {
            title: 'Beneficiaries',
            value: '5',
            change: 'All verified',
            changeType: 'neutral' as const,
            icon: Users,
            color: 'bg-purple-50 text-purple-600'
          },
          {
            title: 'Life Triggers Active',
            value: '3',
            change: '1 pending',
            changeType: 'neutral' as const,
            icon: Activity,
            color: 'bg-orange-50 text-orange-600'
          }
        ].map((card, index) => {
          const Icon = card.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${card.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground mb-1">
                  {card.value}
                </div>
                <div className={`text-sm flex items-center gap-1 ${
                  card.changeType === 'increase' ? 'text-green-600' :
                  card.changeType === 'neutral' ? 'text-muted-foreground' :
                  'text-red-600'
                }`}>
                  {card.changeType === 'increase' && <TrendingUp className="w-3 h-3" />}
                  {card.change}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: '1',
                  title: 'M-Pesa Account Added',
                  description: 'M-Pesa Business Account successfully verified',
                  time: '2 hours ago',
                  type: 'asset',
                  status: 'completed'
                },
                {
                  id: '2',
                  title: 'Beneficiary Updated',
                  description: 'Grace Wanjiku contact information updated',
                  time: '5 hours ago',
                  type: 'beneficiary',
                  status: 'completed'
                },
                {
                  id: '3',
                  title: 'Will Document Generated',
                  description: 'Smart Will automatically updated with new assets',
                  time: '1 day ago',
                  type: 'will',
                  status: 'completed'
                }
              ].map((activity) => {
                const Icon = activity.type === 'asset' ? FolderOpen : 
                           activity.type === 'beneficiary' ? Users : FileText;
                return (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-foreground">{activity.title}</h4>
                        <Badge className="bg-green-100 text-green-800">
                          {activity.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{activity.description}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {activity.time}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              onClick={() => setActiveSection('assets')}
              className="w-full justify-start gap-2"
              variant="outline"
            >
              <Plus className="w-4 h-4" />
              Add New Asset
            </Button>
            
            <Button 
              onClick={() => setActiveSection('beneficiaries')}
              className="w-full justify-start gap-2"
              variant="outline"
            >
              <Users className="w-4 h-4" />
              Manage Beneficiaries
            </Button>
            
            <Button 
              onClick={() => setActiveSection('smart-will')}
              className="w-full justify-start gap-2"
              variant="outline"
            >
              <FileText className="w-4 h-4" />
              Update Smart Will
            </Button>
            
            <Button 
              onClick={() => setActiveSection('life-triggers')}
              className="w-full justify-start gap-2"
              variant="outline"
            >
              <Zap className="w-4 h-4" />
              Configure Triggers
            </Button>
            
            <Separator />
            
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Portfolio Health</span>
                <span className="text-sm text-muted-foreground">85%</span>
              </div>
              <Progress value={85} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                4 of 12 assets need verification
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderAssetsSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Assets</h2>
          <p className="text-muted-foreground">Manage your digital and physical assets</p>
        </div>
        <Button onClick={() => setShowAssetForm(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Asset
        </Button>
      </div>

      {(showAssetForm || editingAsset) && renderAssetForm()}

      <div className="grid gap-4">
        {assets.map((asset) => {
          const AssetIcon = getAssetTypeIcon(asset.type);
          return (
            <Card key={asset.id} className="p-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <AssetIcon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{asset.name}</h3>
                    <Badge variant="outline">{asset.type}</Badge>
                    <Badge variant={asset.verified ? "default" : "secondary"}>
                      {asset.verified ? "Verified" : "Pending"}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-3">
                    <div>
                      <label className="text-muted-foreground">Value</label>
                      <p className="font-medium">{asset.value}</p>
                    </div>
                    <div>
                      <label className="text-muted-foreground">Location</label>
                      <p className="font-medium">{asset.location}</p>
                    </div>
                    <div>
                      <label className="text-muted-foreground">Beneficiaries</label>
                      <p className="font-medium">{asset.beneficiaries.length} assigned</p>
                    </div>
                    <div>
                      <label className="text-muted-foreground">Last Updated</label>
                      <p className="font-medium">{asset.lastUpdated}</p>
                    </div>
                  </div>

                  {asset.beneficiaries.length > 0 && (
                    <div className="mb-3 p-3 bg-muted/50 rounded">
                      <div className="text-sm font-medium mb-2">Beneficiary Distribution:</div>
                      <div className="flex flex-wrap gap-2">
                        {asset.beneficiaries.map((beneficiary, index) => (
                          <div key={index} className="flex items-center gap-1 text-sm">
                            <span>{beneficiary.name}</span>
                            <Badge variant="secondary">{beneficiary.percentage}%</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {asset.notes && (
                    <div className="p-2 bg-blue-50 rounded text-sm">
                      <strong>Notes:</strong> {asset.notes}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setEditingAsset(asset);
                      setAssetFormData({
                        name: asset.name,
                        type: asset.type,
                        identifier: asset.identifier,
                        value: asset.value,
                        location: asset.location,
                        beneficiaries: asset.beneficiaries,
                        verified: asset.verified,
                        verificationDoc: asset.verificationDoc || '',
                        verificationNotes: asset.verificationNotes || '',
                        notes: asset.notes,
                        locationNotes: asset.locationNotes || ''
                      });
                      setShowAssetForm(true);
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const renderMainContent = () => {
    switch (activeSection) {
      case 'assets':
        return renderAssetsSection();
      case 'beneficiaries':
        return renderBeneficiariesSection();
      case 'smart-will':
        return renderSmartWillSection();
      case 'life-triggers':
        return renderLifeTriggersSection();
      case 'trusted':
        return renderTrustedSection();
      case 'security':
        return renderSecuritySection();
      case 'upgrade-plan':
        return renderUpgradePlanSection();
      case 'support':
        return renderSupportSection();
      default:
        return renderDashboardOverview();
    }
  };

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-background">
        {/* Sidebar */}
        <div className="w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-8 cursor-pointer" onClick={handleLogoClick}>
              <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">O</span>
              </div>
              <span className="text-xl font-bold">Omra</span>
            </div>
            
            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSidebarClick(item)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      isActive 
                        ? 'bg-sidebar-primary text-sidebar-primary-foreground' 
                        : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="bg-sidebar-accent text-sidebar-accent-foreground">
                        {item.badge}
                      </Badge>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-card border-b border-border px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search assets, beneficiaries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-80"
                  />
                </form>
              </div>
              
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={onNotificationClick}
                  className="relative"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></span>
                </Button>
                
                <Button 
                  variant="ghost" 
                  onClick={onUserMenuClick}
                  className="flex items-center gap-2"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden md:block">{userName}</span>
                </Button>
                
                <Button 
                  variant="ghost" 
                  onClick={onLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="hidden md:block">Log Out</span>
                </Button>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="flex-1 overflow-auto p-6">
            {renderMainContent()}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Dashboard;