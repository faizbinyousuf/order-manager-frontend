import { Card, CardContent } from "../ui/card";
import { CakeSlice, LayoutDashboard } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div className="w-full">
      <Card className="border border-gray-200 shadow-sm w-full">
        <CardContent className="flex justify-center items-center">
          <div className="flex items-center gap-2   absolute left-1/2 transform -translate-x-1/2">
            <CakeSlice className="size-5" />
            Order Form
          </div>
          <div className=" flex ml-auto">
            <Link to="/orders">
              <Button
                type="button"
                variant="outline"
                className="rounded-sm border-rose-300 text-rose-600 hover:bg-rose-50 hover:border-rose-400 bg-transparent"
              >
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Order Dashboard
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Header;
