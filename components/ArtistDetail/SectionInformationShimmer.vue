<template>
    <section
        class="grid grid-cols-1 gap-0 md:gap-1 lg:gap-2 xl:gap-3 w-full py-4 bg-transparent px-4 md:px-6 lg:px-8 xl:px-10">
        <!-- Artist Image and Info Container -->
        <div class="flex items-start gap-4">
            <!-- Artist Image -->
            <div class="flex-shrink-0">
                <img class="w-36 md:h-36 lg:w-48 lg:h-48 rounded object-cover bg-gray-200 animate-pulse" />
            </div>

            <!-- Artist Info -->
            <div class="flex flex-col flex-1">
                <!-- Artist Name -->
                <div class="h-4 bg-gray-200 rounded w-24 animate-pulse mb-2"></div>

                <!-- Stats -->
                <div class="space-y-1 mb-4 w-fit">
                    <div class="grid grid-cols-2 gap-4">
                        <div class="h-4 bg-gray-200 rounded w-24 animate-pulse mb-2"></div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="h-4 bg-gray-200 rounded w-24 animate-pulse mb-2"></div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="h-4 bg-gray-200 rounded w-24 animate-pulse mb-2"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Social Media Links -->
        <div class="flex space-x-2 text-center">
            <div class="p-1 bg-gray-200 animate-pulse shadow-sm w-8 h-8 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"></div>
            <div class="p-1 bg-gray-200 animate-pulse shadow-sm w-8 h-8 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"></div>
            <div class="p-1 bg-gray-200 animate-pulse shadow-sm w-8 h-8 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"></div>
        </div>
    </section>
</template>
