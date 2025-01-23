<template>
    <section class="w-screen py-4 bg-transparent px-4 md:px-6 lg:px-8 xl:px-10">
        <!-- Album Image and Info Container -->
        <div class="flex flex-col md:flex-row items-start gap-4">
            <!-- Album Image -->
            <div class="flex-shrink-0 self-center">
                <img class="w-36 md:h-36 lg:w-48 lg:h-48 rounded object-cover bg-gray-200 animate-pulse" />
            </div>

            <!-- Album Info -->
            <div class="flex flex-col flex-1 w-full">
                <!-- Album Title -->
                <div class="h-4 bg-gray-200 rounded w-24 animate-pulse mb-2"></div>

                <!-- Stats -->
                <div class="space-y-1">
                    <div class="h-4 bg-gray-200 rounded w-24 animate-pulse mb-2"></div>
                    <div class="h-4 bg-gray-200 rounded w-24 animate-pulse mb-2"></div>
                    <div class="h-4 bg-gray-200 rounded w-24 animate-pulse mb-2"></div>
                    <div class="h-4 bg-gray-200 rounded w-24 animate-pulse mb-2"></div>
                    <div class="h-4 bg-gray-200 rounded w-24 animate-pulse mb-2"></div>
                </div>
            </div>
        </div>
    </section>
</template>
