import { Skeleton } from "~/components/ui/skeleton";

interface TerminalSkeletonProps {
    className?: string;
}

export function TerminalSkeleton({ className = "" }: TerminalSkeletonProps) {
    return (
        <div
            className={`flex w-full flex-col overflow-hidden rounded-md border border-purple-800/50 bg-[#1a1625] shadow-lg md:h-[580px] ${className}`}>
            {/* Terminal header */}
            <div className="flex items-center justify-between bg-purple-900/50 px-3 py-2 text-sm font-medium text-white">
                <div className="flex items-center space-x-2">
                    <div className="flex space-x-1.5">
                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <Skeleton className="h-4 w-32 bg-purple-800/30" />
                </div>
                <div className="flex space-x-1">
                    <Skeleton className="h-6 w-6 rounded-full bg-purple-800/30" />
                    <Skeleton className="h-6 w-6 rounded-full bg-purple-800/30" />
                </div>
            </div>

            {/* Terminal output area */}
            <div className="flex-grow space-y-2 overflow-hidden px-4 py-3">
                <Skeleton className="h-4 w-full bg-purple-800/30" />
                <Skeleton className="h-4 w-3/4 bg-purple-800/30" />
                <Skeleton className="h-4 w-5/6 bg-purple-800/30" />
                <Skeleton className="h-4 w-2/3 bg-purple-800/30" />
                <Skeleton className="h-4 w-1/2 bg-purple-800/30" />
            </div>

            {/* Terminal input area */}
            <div className="border-t border-purple-800/50 px-3 py-2">
                <div className="flex items-center">
                    <Skeleton className="mr-2 h-5 w-32 bg-purple-800/30" />
                    <Skeleton className="h-8 flex-grow bg-purple-800/30" />
                </div>
            </div>
        </div>
    );
}
