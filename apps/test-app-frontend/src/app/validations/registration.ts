import * as z from 'zod';

const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];
const MAX_IMAGE_SIZE = 4; //In MegaBytes

const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
  const result = sizeInBytes / (1024 * 1024);
  return +result.toFixed(decimalsNum);
};

export const userRegistrationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(50),
  firstName: z.string().min(2).max(25),
  lastName: z.string().min(2).max(25),
  pictures: z
    .custom<FileList>()
    .refine((files) => {
      return Array.from(files ?? []).length !== 0;
    }, 'Image is required')
    .refine((files) => {
      return Array.from(files ?? []).every(
        (file) => sizeInMB(file.size) <= MAX_IMAGE_SIZE
      );
    }, `The maximum image size is ${MAX_IMAGE_SIZE}MB`)
    .refine((files) => {
      return Array.from(files ?? []).every((file) =>
        ACCEPTED_IMAGE_TYPES.includes(file.type)
      );
    }, 'File type is not supported')
    .refine((files) => {
      return Array.from(files ?? []).length >= 4;
    }, 'The maximum images number is 4')
})


