import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Helmet } from "react-helmet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { Class } from "@shared/schema";
import { Link } from "wouter";
import { CalendarDays, BookOpen, Clock, Award, Loader2 } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  
  const { data: classes, isLoading } = useQuery<Class[]>({
    queryKey: ["/api/classes"],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Dashboard | ClassConnect</title>
        <meta name="description" content="Manage your classes and account settings on ClassConnect." />
      </Helmet>
      
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Welcome back, {user?.name || user?.username}!
          </h1>
          <p className="text-neutral-600">
            Manage your classes and account settings from your personal dashboard.
          </p>
        </header>
        
        <Tabs defaultValue="my-classes" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="my-classes">My Classes</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="saved">Saved Classes</TabsTrigger>
            <TabsTrigger value="settings">Account Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="my-classes">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">Enrolled Classes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>No classes yet</CardTitle>
                    <CardDescription>You haven't enrolled in any classes yet.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600">
                      Explore our catalog to find classes that interest you.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link href="/explore">
                      <Button className="w-full">Browse Classes</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="recommended">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">Recommended For You</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {isLoading ? (
                  <div className="col-span-2 flex justify-center items-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <span className="ml-2">Loading recommendations...</span>
                  </div>
                ) : classes && classes.length > 0 ? (
                  classes.slice(0, 4).map((classItem) => (
                    <Card key={classItem.id}>
                      <CardHeader>
                        <CardTitle>{classItem.title}</CardTitle>
                        <CardDescription>{classItem.category}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>
                              {classItem.startDate 
                                ? new Date(classItem.startDate).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })
                                : 'Date to be announced'}
                            </span>
                          </div>
                          
                          <div className="flex items-center text-sm">
                            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>{classItem.time}</span>
                          </div>
                          
                          <div className="flex items-center text-sm">
                            <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>{classItem.format}</span>
                          </div>
                          
                          <div className="flex items-center text-sm">
                            <Award className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>{classItem.rating} / 5 rating</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">Enroll Now</Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>No recommendations available</CardTitle>
                        <CardDescription>We're preparing personalized recommendations for you.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-neutral-600">
                          Browse our class catalog to find something that interests you while we get to know your preferences.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Link href="/explore">
                          <Button className="w-full">Browse Classes</Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="saved">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">Saved Classes</h2>
              <Card>
                <CardHeader>
                  <CardTitle>No saved classes</CardTitle>
                  <CardDescription>You haven't saved any classes yet.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-600">
                    When browsing classes, click the save button to add them to your saved list for easy access later.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/explore">
                    <Button className="w-full">Browse Classes</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your account details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-neutral-500">Username</span>
                      <span className="text-neutral-900">{user?.username}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-neutral-500">Email</span>
                      <span className="text-neutral-900">{user?.email}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-neutral-500">Name</span>
                      <span className="text-neutral-900">{user?.name}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline">Edit Profile</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}