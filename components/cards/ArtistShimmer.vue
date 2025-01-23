<template>
    <div class="group flex flex-row gap-2 overflow-hidden py-2 w-full">
        <!-- Profile Info -->
        <div
            class="w-3/4 bg-light rounded cursor-pointer shadow-sm overflow-hidden flex-shrink-0">
            <div class="w-full relative px-4 mt-4">
                <!-- Thin line behind the image -->
                <div class="absolute inset-0 flex items-center justify-center z-0">
                    <div class="w-full h-1 bg-lightgrey"></div>
                </div>
                <!-- Image -->
                <img class="z-10 h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 relative rounded-full overflow-hidden bg-gray-200 animate-pulse" />
            </div>

            <!-- Artist Name -->
            <div class="space-y-1 p-4">
                <div class="h-4 bg-gray-200 rounded w-24 animate-pulse mb-2"></div>
            </div>
        </div>

        <!-- Social Media Links -->
        <div class="flex flex-col space-y-2 flex-shrink-0 w-1/4 text-center">
            <div class="p-1 bg-gray-200 animate-pulse shadow-sm w-8 h-8 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"></div>
            <div class="p-1 bg-gray-200 animate-pulse shadow-sm w-8 h-8 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"></div>
            <div class="p-1 bg-gray-200 animate-pulse shadow-sm w-8 h-8 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"></div>
        </div>
    </div>
</template>