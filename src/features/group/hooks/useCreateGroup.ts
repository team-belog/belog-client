import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createGroup,
  getCoverImageUploadUrl,
  uploadFileToS3,
} from "@/features/group/api/groupApi";
import { groupKeys } from "@/features/group/hooks/groupKeys";
import { ApiError } from "@/lib/apiError";
import type {
  CoverImageContentType,
  CreateGroupData,
  CreateGroupInput,
} from "@/features/group/types";

const COVER_IMAGE_CONTENT_TYPES: readonly string[] = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

function isCoverImageContentType(type: string): type is CoverImageContentType {
  return COVER_IMAGE_CONTENT_TYPES.includes(type);
}

async function uploadCoverImage(file: File) {
  if (!isCoverImageContentType(file.type)) {
    throw new ApiError(
      0,
      "UNSUPPORTED_IMAGE_TYPE",
      "JPEG, PNG, WebP 형식의 이미지만 업로드할 수 있습니다.",
    );
  }

  const { objectKey, uploadUrl } = await getCoverImageUploadUrl({
    contentType: file.type,
    fileSize: file.size,
  });
  await uploadFileToS3(uploadUrl, file, file.type);

  return objectKey;
}

export function useCreateGroup() {
  const queryClient = useQueryClient();

  return useMutation<CreateGroupData, ApiError, CreateGroupInput>({
    mutationFn: async ({ name, coverImage }) => {
      const coverImageObjectKey = coverImage
        ? await uploadCoverImage(coverImage)
        : undefined;

      return createGroup({ name, coverImageObjectKey });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupKeys.list() });
    },
  });
}
