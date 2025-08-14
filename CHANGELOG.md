"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileText, Plus, Wrench, Zap } from "lucide-react";

export const ChangelogPage = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-display mb-4">Changelog</h1>
          <p className="text-lg">All notable changes to this project will be documented in this file.</p>
        </div>

        {/* Unreleased Section */}
        <Card className="mb-8 border-l-4 border-l-primary">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-primary border-primary">
                Unreleased
              </Badge>
              <CardTitle className="text-h2">Latest Updates</CardTitle>
            </div>
            <CardDescription>
              Current development progress and recent improvements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Added Section */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Plus className="w-5 h-5 text-success" />
                  <h3 className="text-h4 text-success">Added</h3>
                </div>
                <ul className="ml-7 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">
                      Added initial changelog structure to track major checkpoints and updates.
                    </p>
                  </li>
                </ul>
              </div>

              <Separator className="my-4" />

              {/* Changed Section */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Wrench className="w-5 h-5 text-info" />
                  <h3 className="text-h4 text-info">Changed</h3>
                </div>
                <ul className="ml-7 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-info rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">
                      Improved landing page copy to emphasize protecting legacies and forming trusts, adjusting main hero and call-to-action sections for stronger messaging.
                    </p>
                  </li>
                </ul>
              </div>

              <Separator className="my-4" />

              {/* Fixed Section */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-primary" />
                  <h3 className="text-h4 text-primary">Fixed</h3>
                </div>
                <ul className="ml-7 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">
                      Resolved runtime error caused by missing <code className="px-1.5 py-0.5 bg-muted rounded text-sm">inheritanceProtocol</code> variable in dashboard's "Life Triggers" section: added the proper React state to prevent ReferenceError.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Future Releases Section */}
        <Card className="border-dashed bg-muted/30">
          <CardHeader>
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-muted-foreground" />
              <CardTitle className="text-h3">Future Releases</CardTitle>
            </div>
            <CardDescription>
              Add subsequent releases and checkpoints below as the project evolves.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
              <p className="text-muted-foreground italic">
                Future changelog entries will appear here as new features and updates are released.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="mt-8 p-4 bg-neutral-light rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            This changelog follows the <a href="https://keepachangelog.com/" className="text-info hover:underline">Keep a Changelog</a> format for clear and consistent documentation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChangelogPage;