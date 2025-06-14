import Link from "next/link"
import { CalendarIcon, TrendingUp, Star, Users, Award, BookOpen, FileText, Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function BlogSidebar() {
  return (
    <div className="space-y-5">
      {/* Newsletter Subscription */}
      <Card className="border border-blue-100 dark:border-blue-800">
        <CardHeader className="pb-2 pt-3 px-4">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Star className="h-4 w-4 text-amber-500" />
            Subscribe to Newsletter
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-3">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Get the latest updates on immigration services, document requirements, and expert tips delivered to your
              inbox.
            </p>
            <div className="space-y-2">
              <Input placeholder="Your email address" type="email" className="h-8 text-xs" />
              <Button className="w-full h-8 text-xs bg-blue-600 hover:bg-blue-700">Subscribe Now</Button>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Users className="h-3 w-3 text-blue-500" />
              <span>Join 5,000+ subscribers</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Popular Posts */}
      <Card className="border border-blue-100 dark:border-blue-800">
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
                  <Badge variant="outline" className="text-xs text-blue-600 border-blue-200">
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
      </Card>

      {/* Categories */}
      <Card className="border border-blue-100 dark:border-blue-800">
        <CardHeader className="pb-2 pt-3 px-4">
          <CardTitle className="flex items-center gap-2 text-sm">
            <BookOpen className="h-4 w-4 text-purple-500" />
            Categories
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-2">
            {[
              { name: "Passport", count: 12, color: "bg-blue-50 text-blue-700 hover:bg-blue-100" },
              { name: "PCC", count: 8, color: "bg-green-50 text-green-700 hover:bg-green-100" },
              { name: "Visa", count: 15, color: "bg-purple-50 text-purple-700 hover:bg-purple-100" },
              { name: "OCI", count: 6, color: "bg-orange-50 text-orange-700 hover:bg-orange-100" },
              { name: "Immigration", count: 10, color: "bg-red-50 text-red-700 hover:bg-red-100" },
              { name: "Travel", count: 4, color: "bg-yellow-50 text-yellow-700 hover:bg-yellow-100" },
            ].map((category) => (
              <Link key={category.name} href={`/category/${category.name.toLowerCase()}`} className="block">
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
      </Card>

      {/* Expert Help */}
      <Card className="border border-blue-100 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10">
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
                <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">EX</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs font-medium">Immigration Expert</p>
                <p className="text-xs text-blue-600 dark:text-blue-400">Available 24/7</p>
              </div>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Our team of certified immigration consultants can help you with your PCC application and other consular
              services.
            </p>
            <div className="space-y-2">
              <Button className="w-full h-8 text-xs bg-blue-600 hover:bg-blue-700">
                <FileText className="h-3 w-3 mr-2" />
                Get Free Consultation
              </Button>
              <Button variant="outline" className="w-full h-8 text-xs text-blue-600 border-blue-200 hover:bg-blue-50">
                <Globe className="h-3 w-3 mr-2 text-blue-500" />
                View All Services
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card className="border border-blue-100 dark:border-blue-800">
        <CardHeader className="pb-2 pt-3 px-4">
          <CardTitle className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-blue-500" />
            Quick Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-100 dark:border-blue-800">
              <div className="text-lg font-bold text-blue-600">5K+</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Applications</div>
            </div>
            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-100 dark:border-green-800">
              <div className="text-lg font-bold text-green-600">98%</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Success Rate</div>
            </div>
            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-md border border-purple-100 dark:border-purple-800">
              <div className="text-lg font-bold text-purple-600">24/7</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Support</div>
            </div>
            <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-md border border-amber-100 dark:border-amber-800">
              <div className="text-lg font-bold text-amber-600">15+</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Years Exp.</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
