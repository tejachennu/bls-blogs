'use client';

import Link from "next/link";
import {
  CalendarIcon,
  TrendingUp,
  Star,
  Users,
  Award,
  BookOpen,
  FileText,
  Globe,
  Truck,
  Box,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function BlogSidebar() {
  const whatsappUrl = `https://api.whatsapp.com/send/?phone=%2B12892012094&text=Hi+India+Visa+and+Consular+Services%2C+I+would+like+to+inquire+about+courier+services.&type=phone_number&app_absent=0`
const handleRedirect = (url) => {
  window.location.href = url;
};

  return (
    
    <div className="space-y-5">
      {/* Popular Posts */}
      {/* <Card className="border border-blue-100 dark:border-blue-800">
        <CardHeader className="pb-2 pt-3 px-4">
          <CardTitle className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-green-500" />
            Popular Posts
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          {[
            {
              title: "How to Apply for an Indian Visa from Canada",
              date: "May 15, 2025",
              views: "2.1k",
              category: "Visa",
            },
            {
              title: "OCI Card vs. PIO Card: What's the Difference?",
              date: "April 28, 2025",
              views: "1.8k",
              category: "OCI",
            },
            {
              title: "Indian Passport Renewal Process in Canada",
              date: "April 10, 2025",
              views: "1.5k",
              category: "Passport",
            },
          ].map((post, index) => (
            <div key={index}>
              <Link href="#" className="group block">
                <div className="space-y-1">
                  <Badge
                    variant="outline"
                    className="text-xs text-blue-600 border-blue-200"
                  >
                    {post.category}
                  </Badge>
                  <h3 className="text-xs font-medium group-hover:text-blue-600 transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="h-3 w-3 text-blue-500" />
                      {post.date}
                    </div>
                    <span>{post.views} views</span>
                  </div>
                </div>
              </Link>
              {index < 2 && <Separator className="my-3" />}
            </div>
          ))}
        </CardContent>
      </Card> */}

      {/* Categories */}
      {/* <Card className="border border-blue-100 dark:border-blue-800">
        <CardHeader className="pb-2 pt-3 px-4">
          <CardTitle className="flex items-center gap-2 text-sm">
            <BookOpen className="h-4 w-4 text-purple-500" />
            Categories
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-2">
            {[
              {
                name: "Passport",
                count: 12,
                color: "bg-blue-50 text-blue-700 hover:bg-blue-100",
              },
              {
                name: "PCC",
                count: 8,
                color: "bg-green-50 text-green-700 hover:bg-green-100",
              },
              {
                name: "Visa",
                count: 15,
                color: "bg-purple-50 text-purple-700 hover:bg-purple-100",
              },
              {
                name: "OCI",
                count: 6,
                color: "bg-orange-50 text-orange-700 hover:bg-orange-100",
              },
              {
                name: "Immigration",
                count: 10,
                color: "bg-red-50 text-red-700 hover:bg-red-100",
              },
              {
                name: "Travel",
                count: 4,
                color: "bg-yellow-50 text-yellow-700 hover:bg-yellow-100",
              },
            ].map((category) => (
              <Link
                key={category.name}
                href={`/category/${category.name.toLowerCase()}`}
                className="block"
              >
                <Badge
                  variant="secondary"
                  className={`w-full justify-between text-xs ${category.color} transition-colors`}
                >
                  {category.name}
                  <span className="ml-1 text-xs">{category.count}</span>
                </Badge>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card> */}

      {/* Expert Help */}
      {/* <Card className="border border-blue-100 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10">
        <CardHeader className="pb-2 pt-3 px-4">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Award className="h-4 w-4 text-amber-500" />
            Need Expert Help?
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                  EX
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs font-medium">Immigration Expert</p>
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  Available 24/7
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Our team of certified immigration consultants can help you with
              your PCC application and other consular services.
            </p>
            <div className="space-y-2">
              <Button className="w-full h-8 text-xs bg-blue-600 hover:bg-blue-700">
                <FileText className="h-3 w-3 mr-2" />
                Get Free Consultation
              </Button>
              <Button
                variant="outline"
                className="w-full h-8 text-xs text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                <Globe className="h-3 w-3 mr-2 text-blue-500" />
                View All Services
              </Button>
            </div>
          </div>
        </CardContent>
      </Card> */}
      {/* Expert Help */}
      <Card className="border border-blue-200 dark:border-blue-700 bg-blue-50/50 dark:bg-blue-900/20 shadow-lg rounded-xl transition-all hover:scale-105">
  <CardHeader className="pb-2 pt-3 px-4">
    <CardTitle className="flex items-center gap-3 text-lg font-semibold text-blue-600 dark:text-blue-400">
      <Award className="h-5 w-5 text-amber-500" />
      Need Expert Help?
    </CardTitle>
  </CardHeader>
  <CardContent className="p-4 space-y-3">
    <div className="space-y-2">
      <p className="text-sm font-semibold text-blue-600">Form Assist Expert</p>
      <p className="text-xs text-gray-600 dark:text-gray-400">Available 24/7</p>
    </div>
    <p className="text-sm text-gray-700 dark:text-gray-400">
      Our dedicated team will guide you through the PCC application process and provide clear instructions for all required documents.
    </p>
    <div className="space-y-2"> 
  <Button onClick={() => handleRedirect(whatsappUrl)} className="w-full h-10 text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
    Get Consultation
  </Button>
  <Button onClick={() => handleRedirect("https://blsindia-canada.ca/services")} variant="outline" className="w-full h-10 text-sm text-blue-600 border-blue-200 hover:bg-blue-50 rounded-lg transition-all">
    View All Services
  </Button>
</div>
  </CardContent>
      </Card>

      <Card className="border border-green-200 dark:border-green-700 bg-green-50/50 dark:bg-green-900/20 shadow-lg rounded-xl transition-all hover:scale-105">
        <CardHeader className="pb-2 pt-3 px-4">
          <CardTitle className="flex items-center gap-3 text-lg font-semibold text-green-600 dark:text-green-400">
            <Truck className="h-5 w-5 text-green-500" />
            Need Courier at Your Doorstep?
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-green-600">
              Purolator Pickup
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Fast & Reliable
            </p>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-400">
            Complete the form in minutes and instantly generate express shipping
            labels for your documents.
          </p>
          <div className="space-y-2 ">
        
            <Button onClick={() => handleRedirect("https://blsindia-canada.ca/pickup-drop?type=pickonly")} className="w-full h-10 text-sm bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:bg-green-700 transition-all">
              Get Pickup! 
            </Button>
               <Button onClick={() => handleRedirect("https://blsindia-canada.ca/pickup-instructions")}
              variant="outline"
              className="w-full h-10 text-sm text-green-600 border-green-200 hover:bg-green-50 rounded-lg transition-all"
            >
            
              View All Courier Options
            </Button>
         
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
