import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const VIDEO_TYPES = ["video/mp4", "video/quicktime", "video/webm"];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Неоторизиран достъп" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "Не са избрани файлове" },
        { status: 400 }
      );
    }

    // Validate all files before processing
    for (const file of files) {
      const isImage = IMAGE_TYPES.includes(file.type);
      const isVideo = VIDEO_TYPES.includes(file.type);

      if (!isImage && !isVideo) {
        return NextResponse.json(
          {
            error: `Невалиден тип файл: ${file.name}. Позволени са: JPG, PNG, WebP, GIF, MP4, MOV, WebM`,
          },
          { status: 400 }
        );
      }

      if (isImage && file.size > MAX_IMAGE_SIZE) {
        return NextResponse.json(
          {
            error: `Изображението ${file.name} е твърде голямо. Максимум 5MB за изображения`,
          },
          { status: 400 }
        );
      }

      if (isVideo && file.size > MAX_VIDEO_SIZE) {
        return NextResponse.json(
          {
            error: `Видеото ${file.name} е твърде голямо. Максимум 50MB за видео`,
          },
          { status: 400 }
        );
      }
    }

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), "public", "uploads", "arrivals");
    await mkdir(uploadDir, { recursive: true });

    const timestamp = Date.now();
    const urls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const filename = `arrival-${timestamp}-${i}.${extension}`;

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filePath = path.join(uploadDir, filename);
      await writeFile(filePath, buffer);

      urls.push(`/uploads/arrivals/${filename}`);
    }

    return NextResponse.json({ urls });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Грешка при качване на файловете" },
      { status: 500 }
    );
  }
}
