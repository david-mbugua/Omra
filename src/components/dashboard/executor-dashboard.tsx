import React, { useState } from 'react';
import { 
  Home, 
  FileText, 
  Share2, 
  Users, 
  MessageSquare, 
  Scale, 
  Shield, 
  HelpCircle,
  Menu,
  Download,
  Upload,
  CheckCircle,
  XCircle,
  Clock,
  Phone,
  Mail,
  Eye,
  Settings,
  FileDown,
  Send,
  User,
  Copy,
  LogOut,
  Device,
  AlertTriangle,
  Timer
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

interface ExecutorDashboardProps {
  userName: string;
  onLogout: () => void;
}

export const ExecutorDashboard: React.FC<ExecutorDashboardProps> = ({ userName, onLogout }) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [privateNotes, setPrivateNotes] = useState('Initial review completed. Death certificate verified. Proceeding with asset distribution.');
  const [distributionConfirmations, setDistributionConfirmations] = useState({
    'house': false,
    'car': true,
    'savings': false,
    'investments': true
  });

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'will', label: 'Will & Legal Docs', icon: FileText },
    { id: 'assets', label: 'Distribute Assets', icon: Share2 },
    { id: 'beneficiaries', label: 'Beneficiaries', icon: Users },
    { id: 'timeline', label: 'Triggers & Timeline', icon: Timer },
    { id: 'messages', label: 'Messages & Notes', icon: MessageSquare },
    { id: 'lawyer', label: 'Lawyer Contact', icon: Scale },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'support', label: 'Support', icon: HelpCircle }
  ];

  const mockEstateData = {
    totalAssets: 'KES 4,250,000',
    distributedAssets: 2,
    pendingAssets: 2,
    beneficiariesContacted: 3,
    totalBeneficiaries: 4
  };

  const mockAssets = [
    { id: 'house', name: 'Family Home - Nairobi', beneficiary: 'Grace Mwangi', value: 'KES 2,800,000', status: 'Pending' },
    { id: 'car', name: '2019 Toyota Prado', beneficiary: 'Peter Kamau', value: 'KES 850,000', status: 'Distributed' },
    { id: 'savings', name: 'KCB Savings Account', beneficiary: 'Mary Wanjiku', value: 'KES 320,000', status: 'Pending' },
    { id: 'investments', name: 'NSE Portfolio', beneficiary: 'James Ochieng', value: 'KES 280,000', status: 'Distributed' }
  ];

  const mockBeneficiaries = [
    { id: 1, name: 'Grace Mwangi', relation: 'Daughter', phone: '+254 722 345 678', email: 'grace@email.com', kycStatus: 'Verified', idVerified: true },
    { id: 2, name: 'Peter Kamau', relation: 'Son', phone: '+254 733 456 789', email: 'peter@email.com', kycStatus: 'Pending', idVerified: false },
    { id: 3, name: 'Mary Wanjiku', relation: 'Sister', phone: '+254 711 234 567', email: 'mary@email.com', kycStatus: 'Verified', idVerified: true },
    { id: 4, name: 'James Ochieng', relation: 'Nephew', phone: '+254 700 987 654', email: 'james@email.com', kycStatus: 'Pending', idVerified: false }
  ];

  const mockTriggers = [
    { id: 1, event: 'Death Certificate Submitted', date: '2024-03-15', status: 'Completed', description: 'Official death certificate uploaded and verified' },
    { id: 2, event: 'Will Validation', date: '2024-03-18', status: 'Completed', description: 'Smart will validated by legal team' },
    { id: 3, event: 'Beneficiary Notification', date: '2024-03-20', status: 'In Progress', description: 'Notifying all beneficiaries of their inheritance' },
    { id: 4, event: 'Asset Verification', date: '2024-03-25', status: 'Pending', description: 'Verify ownership and value of all listed assets' },
    { id: 5, event: 'Asset Distribution', date: '2024-04-01', status: 'Pending', description: 'Begin distribution of assets to beneficiaries' }
  ];

  const mockMessages = [
    { id: 1, from: 'Estate Owner', date: '2024-02-10', subject: 'Important Instructions', content: 'Please ensure my daughter Grace receives the family home. The car should go to Peter as discussed.' },
    { id: 2, from: 'Estate Owner', date: '2024-02-15', subject: 'Investment Portfolio', content: 'James should receive my NSE portfolio. Please work with ABC Securities for the transfer.' },
    { id: 3, from: 'Estate Owner', date: '2024-02-20', subject: 'Final Wishes', content: 'Thank you for taking care of my estate. Please distribute fairly and help my family through this difficult time.' }
  ];

  const mockLawyer = {
    name: 'Advocate Sarah Mutua',
    firm: 'Mutua & Associates Advocates',
    phone: '+254 20 123 4567',
    email: 'sarah.mutua@mutualaw.co.ke',
    license: 'LSK/ADV/12345'
  };

  const mockAuditTrail = [
    { date: '2024-03-15', action: 'Death Certificate Uploaded', user: 'Grace Mwangi', ip: '154.123.45.67' },
    { date: '2024-03-18', action: 'Will Accessed', user: 'Executor John Doe', ip: '41.89.123.45' },
    { date: '2024-03-20', action: 'Beneficiary Contacted', user: 'Executor John Doe', ip: '41.89.123.45' },
    { date: '2024-03-22', action: 'Asset Distribution Started', user: 'Executor John Doe', ip: '41.89.123.45' }
  ];

  const toggleDistribution = (assetId: string) => {
    setDistributionConfirmations(prev => ({
      ...prev,
      [assetId]: !prev[assetId]
    }));
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <h1>Estate Management Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Estate Value</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">{mockEstateData.totalAssets}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Assets Distributed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-success">{mockEstateData.distributedAssets}/4</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pending Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-accent">{mockEstateData.pendingAssets}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Beneficiaries Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-info">{mockEstateData.beneficiariesContacted}/{mockEstateData.totalBeneficiaries}</p>
            <p className="text-sm text-muted-foreground">Contacted</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockTriggers.slice(0, 3).map((trigger) => (
                <div key={trigger.id} className="flex items-center space-x-3">
                  {trigger.status === 'Completed' ? (
                    <CheckCircle className="h-5 w-5 text-success" />
                  ) : trigger.status === 'In Progress' ? (
                    <Clock className="h-5 w-5 text-info" />
                  ) : (
                    <XCircle className="h-5 w-5 text-muted-foreground" />
                  )}
                  <div>
                    <p className="font-medium">{trigger.event}</p>
                    <p className="text-sm text-muted-foreground">{trigger.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start">
                <Upload className="mr-2 h-4 w-4" />
                Upload Distribution Proof
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Send className="mr-2 h-4 w-4" />
                Contact Beneficiary
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Eye className="mr-2 h-4 w-4" />
                Review Legal Documents
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderWill = () => (
    <div className="space-y-6">
      <h1>Will & Legal Documents</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Smart Will Document</CardTitle>
            <CardDescription>Last updated: February 28, 2024</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Will Summary</h4>
              <p className="text-sm text-muted-foreground mb-4">
                This is the last will and testament of Michael Njoroge, documenting the distribution of assets valued at KES 4,250,000 among four beneficiaries.
              </p>
              <div className="space-y-2">
                <p className="text-sm"><strong>Family Home:</strong> Grace Mwangi (Daughter)</p>
                <p className="text-sm"><strong>Vehicle:</strong> Peter Kamau (Son)</p>
                <p className="text-sm"><strong>Savings Account:</strong> Mary Wanjiku (Sister)</p>
                <p className="text-sm"><strong>Investment Portfolio:</strong> James Ochieng (Nephew)</p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              <Button variant="outline">
                <Eye className="mr-2 h-4 w-4" />
                View Full Document
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Legal Proof Documents</CardTitle>
            <CardDescription>Upload required documentation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-sm font-medium">Death Certificate</span>
                </div>
                <Badge variant="default" className="bg-success text-success-foreground">Verified</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-info" />
                  <span className="text-sm font-medium">Probate Grant</span>
                </div>
                <Button size="sm">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-info" />
                  <span className="text-sm font-medium">ID Verification</span>
                </div>
                <Button size="sm">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderAssets = () => (
    <div className="space-y-6">
      <h1>Distribute Assets</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Asset Distribution Overview</CardTitle>
          <CardDescription>Manage and confirm asset distributions to beneficiaries</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Beneficiary</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Confirmed</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAssets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell className="font-medium">{asset.name}</TableCell>
                  <TableCell>{asset.beneficiary}</TableCell>
                  <TableCell>{asset.value}</TableCell>
                  <TableCell>
                    <Badge variant={asset.status === 'Distributed' ? 'default' : 'secondary'} 
                           className={asset.status === 'Distributed' ? 'bg-success text-success-foreground' : ''}>
                      {asset.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={distributionConfirmations[asset.id] || false}
                      onCheckedChange={() => toggleDistribution(asset.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Upload className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upload Distribution Confirmations</CardTitle>
          <CardDescription>Upload proof of completed asset distributions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                Drop release forms here or click to upload
              </p>
            </div>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                Drop transfer receipts here or click to upload
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderBeneficiaries = () => (
    <div className="space-y-6">
      <h1>Beneficiaries</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Beneficiary Management</CardTitle>
          <CardDescription>Manage beneficiary contact information and verification status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Relation</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>KYC Status</TableHead>
                <TableHead>ID Verified</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockBeneficiaries.map((beneficiary) => (
                <TableRow key={beneficiary.id}>
                  <TableCell className="font-medium">{beneficiary.name}</TableCell>
                  <TableCell>{beneficiary.relation}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{beneficiary.phone}</p>
                      <p className="text-muted-foreground">{beneficiary.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={beneficiary.kycStatus === 'Verified' ? 'default' : 'secondary'}
                           className={beneficiary.kycStatus === 'Verified' ? 'bg-success text-success-foreground' : ''}>
                      {beneficiary.kycStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {beneficiary.idVerified ? (
                      <CheckCircle className="h-5 w-5 text-success" />
                    ) : (
                      <XCircle className="h-5 w-5 text-muted-foreground" />
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {!beneficiary.idVerified && (
                        <Button size="sm">
                          <Send className="mr-2 h-4 w-4" />
                          Send KYC
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const renderTimeline = () => (
    <div className="space-y-6">
      <h1>Triggers & Timeline</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Estate Processing Timeline</CardTitle>
          <CardDescription>Track trigger events and processing milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mockTriggers.map((trigger, index) => (
              <div key={trigger.id} className="flex items-start space-x-4">
                <div className="flex flex-col items-center">
                  {trigger.status === 'Completed' ? (
                    <CheckCircle className="h-6 w-6 text-success" />
                  ) : trigger.status === 'In Progress' ? (
                    <Clock className="h-6 w-6 text-info" />
                  ) : (
                    <div className="h-6 w-6 rounded-full border-2 border-muted-foreground" />
                  )}
                  {index < mockTriggers.length - 1 && (
                    <div className="h-8 w-0.5 bg-border mt-2" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{trigger.event}</h4>
                    <Badge variant={
                      trigger.status === 'Completed' ? 'default' :
                      trigger.status === 'In Progress' ? 'secondary' : 'outline'
                    } className={
                      trigger.status === 'Completed' ? 'bg-success text-success-foreground' :
                      trigger.status === 'In Progress' ? 'bg-info text-info-foreground' : ''
                    }>
                      {trigger.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{trigger.description}</p>
                  <p className="text-sm text-muted-foreground">{trigger.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-6">
      <h1>Messages & Notes</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Messages from Estate Owner</CardTitle>
            <CardDescription>Important instructions and final wishes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockMessages.map((message) => (
                <div key={message.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{message.subject}</h4>
                    <span className="text-sm text-muted-foreground">{message.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{message.content}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Private Executor Notes</CardTitle>
            <CardDescription>Your private notes (not shared with beneficiaries)</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Add your private notes here..."
              value={privateNotes}
              onChange={(e) => setPrivateNotes(e.target.value)}
              className="min-h-[200px]"
            />
            <Button className="mt-4">
              Save Notes
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderLawyer = () => (
    <div className="space-y-6">
      <h1>Lawyer Contact</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Assigned Legal Counsel</CardTitle>
            <CardDescription>Your legal representative for this estate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="h-10 w-10 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">{mockLawyer.name}</h4>
                  <p className="text-sm text-muted-foreground">{mockLawyer.firm}</p>
                  <p className="text-sm text-muted-foreground">License: {mockLawyer.license}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{mockLawyer.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{mockLawyer.email}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button>
                  <Phone className="mr-2 h-4 w-4" />
                  Call
                </Button>
                <Button variant="outline">
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Secure Legal Messages</CardTitle>
            <CardDescription>Encrypted communication with legal counsel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm font-medium">Advocate Sarah Mutua</p>
                <p className="text-sm text-muted-foreground">
                  The probate process is proceeding smoothly. Please ensure all beneficiaries provide proper ID verification before asset distribution.
                </p>
                <span className="text-xs text-muted-foreground">2 hours ago</span>
              </div>
              
              <div className="bg-primary/10 p-3 rounded-lg">
                <p className="text-sm font-medium">You</p>
                <p className="text-sm text-muted-foreground">
                  Two beneficiaries still need to complete KYC. Will send them the requirements today.
                </p>
                <span className="text-xs text-muted-foreground">1 day ago</span>
              </div>

              <div className="flex space-x-2">
                <Input placeholder="Type your secure message..." className="flex-1" />
                <Button>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      <h1>Security</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Account Security</CardTitle>
            <CardDescription>Manage your security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
              <Switch defaultChecked={true} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Email Notifications</h4>
                <p className="text-sm text-muted-foreground">Get notified of account activity</p>
              </div>
              <Switch defaultChecked={true} />
            </div>

            <Button className="w-full">
              <Settings className="mr-2 h-4 w-4" />
              Change Password
            </Button>

            <Button variant="destructive" className="w-full">
              <LogOut className="mr-2 h-4 w-4" />
              Log Out Other Devices
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Audit Trail</CardTitle>
            <CardDescription>Recent account activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockAuditTrail.map((entry, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{entry.action}</p>
                    <p className="text-xs text-muted-foreground">{entry.user} • {entry.date}</p>
                    <p className="text-xs text-muted-foreground">IP: {entry.ip}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderSupport = () => (
    <div className="space-y-6">
      <h1>Support</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Common questions about estate execution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">What documents do I need to distribute assets?</h4>
                <p className="text-sm text-muted-foreground">
                  You need the death certificate, probate grant, and your executor appointment letter.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">How long does the distribution process take?</h4>
                <p className="text-sm text-muted-foreground">
                  Typically 6-12 months, depending on asset complexity and beneficiary cooperation.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">What if a beneficiary cannot be contacted?</h4>
                <p className="text-sm text-muted-foreground">
                  The platform provides tools to locate beneficiaries. Contact support for assistance.
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Can I modify asset distribution?</h4>
                <p className="text-sm text-muted-foreground">
                  Only if explicitly allowed in the will or with court approval in exceptional circumstances.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact OMRA Support</CardTitle>
            <CardDescription>Get help from our estate management team</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Phone Support</p>
                  <p className="text-sm text-muted-foreground">+254 20 456 7890</p>
                  <p className="text-xs text-muted-foreground">Mon-Fri, 8AM-6PM EAT</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Email Support</p>
                  <p className="text-sm text-muted-foreground">executor@omra.co.ke</p>
                  <p className="text-xs text-muted-foreground">Response within 24 hours</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Input placeholder="Subject" />
              <Textarea placeholder="Describe your issue..." rows={4} />
              <Button className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderMainContent = () => {
    switch (activeSection) {
      case 'dashboard': return renderDashboard();
      case 'will': return renderWill();
      case 'assets': return renderAssets();
      case 'beneficiaries': return renderBeneficiaries();
      case 'timeline': return renderTimeline();
      case 'messages': return renderMessages();
      case 'lawyer': return renderLawyer();
      case 'security': return renderSecurity();
      case 'support': return renderSupport();
      default: return renderDashboard();
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-sidebar transition-all duration-300 flex-shrink-0`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            {sidebarOpen && (
              <h2 className="text-lg font-bold text-sidebar-foreground">Executor Portal</h2>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
          
          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${!sidebarOpen ? 'mx-auto' : ''}`} />
                  {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Executor Info */}
        {sidebarOpen && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-sidebar-accent rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <User className="h-5 w-5 text-sidebar-foreground" />
                <span className="text-sm font-medium text-sidebar-foreground">{userName}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-border"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto p-6">
          {renderMainContent()}
        </div>
      </div>
    </div>
  );
};