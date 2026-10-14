import { useMutation, useQueryClient } from "@tanstack/react-query";
import exifr from "exifr";
import { getPhotoUploadUrls, uploadPhotoToS3, registerPhotoMetadata } from "@/features/post-log/api/postLogApi";

export function useUploadPostLogPhotos(meetingId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (files: File[]) => {
            const { uploads } = await getPhotoUploadUrls(
                meetingId,
                files.map((file, i) => ({
                    clientPhotoId: `photo-${i + 1}`,
                    contentType: file.type,
                    fileSize: file.size,
                }))
            );

            await Promise.all(
                uploads.map((upload, i) =>
                    uploadPhotoToS3(upload.uploadUrl, files[i], upload.requiredHeaders)
                )
            );

            const capturedAts = await Promise.all(
                files.map(async (file) => {
                    const exif = await exifr.parse(file).catch(() => null);
                    return exif?.DateTimeOriginal?.toISOString() ?? new Date(file.lastModified).toISOString();
                })
            );

            return registerPhotoMetadata(
                meetingId,
                uploads.map((upload, i) => ({
                    objectKey: upload.objectKey,
                    capturedAt: capturedAts[i],
                }))
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["postLogPhotoList", meetingId] });
        },
    });
}
