-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "address" TEXT,
    "neighborhood" TEXT,
    "county" TEXT,
    "location" TEXT,
    "groupId" INTEGER NOT NULL,
    "store" BOOLEAN,
    "type_store" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cam" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "way" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Cam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlateCapture" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "camId" INTEGER NOT NULL,
    "date_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlateCapture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alert" (
    "id" SERIAL NOT NULL,
    "plate" TEXT NOT NULL,
    "date_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Alert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeenIn" (
    "id" SERIAL NOT NULL,
    "platecaptureId" INTEGER NOT NULL,

    CONSTRAINT "SeenIn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "superior" INTEGER NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" SERIAL NOT NULL,
    "table" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "permission" TEXT NOT NULL,
    "obs" TEXT NOT NULL,
    "rota" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PermissionGroup" (
    "id" SERIAL NOT NULL,
    "permissionId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "PermissionGroup_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cam" ADD CONSTRAINT "Cam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlateCapture" ADD CONSTRAINT "PlateCapture_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlateCapture" ADD CONSTRAINT "PlateCapture_camId_fkey" FOREIGN KEY ("camId") REFERENCES "Cam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alert" ADD CONSTRAINT "Alert_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeenIn" ADD CONSTRAINT "SeenIn_platecaptureId_fkey" FOREIGN KEY ("platecaptureId") REFERENCES "PlateCapture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionGroup" ADD CONSTRAINT "PermissionGroup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionGroup" ADD CONSTRAINT "PermissionGroup_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
