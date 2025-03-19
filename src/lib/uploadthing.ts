import { generateReactHelpers, generateUploadButton, generateUploadDropzone } from "@uploadthing/react"

import type { OurFileRouter } from "@/app/api/uploadthing/core"

export const UploadDropzone = generateUploadDropzone<OurFileRouter>()
export const { uploadFiles, useUploadThing } = generateReactHelpers<OurFileRouter>()
