// composables/useComments.ts
export const useComments = () => {
    const config = useRuntimeConfig();
    const backendApiUrl = config.public.backendApiUrl;

    const submitComment = async (commentData: { name: string; content: string }) => {
        try {
            const { data } = await useFetch(`${backendApiUrl}/comments`, {
                method: 'POST',
                body: commentData
            });

            console.log(data)

            return true
        } catch (error) {
            return false;
        }
    };

    return {
        submitComment
    };
};