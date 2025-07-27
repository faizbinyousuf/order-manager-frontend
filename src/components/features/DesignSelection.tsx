import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette } from "lucide-react";

function DesignSelection() {
  return (
    <div>
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="border-b border-gray-100 bg-white">
          <CardTitle className="flex items-center gap-3">
            <Palette className="h-5 w-5" />
            Design Selection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className=" border rounded-lg p-4 cursor-pointer text-left">
              <img
                src="https://picsum.photos/200/100"
                alt="design images"
                className="w-full h-20 object-cover rounded mb-3 bg-gray-100"
              />
              <h4 className="font-medium text-gray-900 text-sm">
                Floral Pattern
              </h4>
              <p className="text-gray-600 text-sm">$25</p>
            </div>
            <div className=" border rounded-lg p-4 cursor-pointer text-left">
              <img
                src="https://picsum.photos/200/100"
                alt="design images"
                className="w-full h-20 object-cover rounded mb-3 bg-gray-100"
              />
              <h4 className="font-medium text-gray-900 text-sm">
                Floral Pattern
              </h4>
              <p className="text-gray-600 text-sm">$25</p>
            </div>
            <div className=" border rounded-lg p-4 cursor-pointer text-left">
              <img
                src="https://picsum.photos/200/100"
                alt="design images"
                className="w-full h-20 object-cover rounded mb-3 bg-gray-100"
              />
              <h4 className="font-medium text-gray-900 text-sm">
                Floral Pattern
              </h4>
              <p className="text-gray-600 text-sm">$25</p>
            </div>
            <div className=" border rounded-lg p-4 cursor-pointer text-left">
              <img
                src="https://picsum.photos/200/100"
                alt="design images"
                className="w-full h-20 object-cover rounded mb-3 bg-gray-100"
              />
              <h4 className="font-medium text-gray-900 text-sm">
                Floral Pattern
              </h4>
              <p className="text-gray-600 text-sm">$25</p>
            </div>
            <div className=" border rounded-lg p-4 cursor-pointer text-left">
              <img
                src="https://picsum.photos/200/100"
                alt="design images"
                className="w-full h-20 object-cover rounded mb-3 bg-gray-100"
              />
              <h4 className="font-medium text-gray-900 text-sm">
                Floral Pattern
              </h4>
              <p className="text-gray-600 text-sm">$25</p>
            </div>
            <div className=" border rounded-lg p-4 cursor-pointer text-left">
              <img
                src="https://picsum.photos/200/100"
                alt="design images"
                className="w-full h-20 object-cover rounded mb-3 bg-gray-100"
              />
              <h4 className="font-medium text-gray-900 text-sm">
                Floral Pattern
              </h4>
              <p className="text-gray-600 text-sm">$25</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default DesignSelection;
