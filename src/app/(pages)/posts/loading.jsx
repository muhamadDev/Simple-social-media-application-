import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";

const loopArray = ["a", "b", "c", "d", "e", "f"];

export default function Loading() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
            px-5 py-8 gap-x-5 gap-y-8"
        >

            {loopArray.map((item, index) => (
                <Card className="w-full px-2" key={index}>
                    <CardContent className="w-full p-2">
                        <Skeleton
                            className="rounded-3xl w-full aspect-square 
                            object-cover px-2 py-2" 
                        />
                    </CardContent>
                    <CardHeader>
                        <div className="text-2xl font-semibold leading-none tracking-tight">
                            <Skeleton className="h-5 w-[270px] my-2"/>
                        </div>
                        <CardDescription>
                            <Skeleton className="h-4 w-[220px] my-2"/>
                            <Skeleton className="h-4 w-[220px]"/>
                        </CardDescription>
                    </CardHeader>
        
                </Card>
            
            ))}
            
        </div>
    )
}