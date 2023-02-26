/*
  Warnings:

  - You are about to drop the `Alert` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Cam` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PermissionGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlateCapture` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SeenIn` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Alert" DROP CONSTRAINT "Alert_userId_fkey";

-- DropForeignKey
ALTER TABLE "Cam" DROP CONSTRAINT "Cam_userId_fkey";

-- DropForeignKey
ALTER TABLE "PermissionGroup" DROP CONSTRAINT "PermissionGroup_groupId_fkey";

-- DropForeignKey
ALTER TABLE "PermissionGroup" DROP CONSTRAINT "PermissionGroup_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "PlateCapture" DROP CONSTRAINT "PlateCapture_camId_fkey";

-- DropForeignKey
ALTER TABLE "PlateCapture" DROP CONSTRAINT "PlateCapture_userId_fkey";

-- DropForeignKey
ALTER TABLE "SeenIn" DROP CONSTRAINT "SeenIn_platecaptureId_fkey";

-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_groupId_fkey";

-- DropTable
DROP TABLE "Alert";

-- DropTable
DROP TABLE "Cam";

-- DropTable
DROP TABLE "Group";

-- DropTable
DROP TABLE "Permission";

-- DropTable
DROP TABLE "PermissionGroup";

-- DropTable
DROP TABLE "PlateCapture";

-- DropTable
DROP TABLE "SeenIn";

-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "address" TEXT,
    "neighborhood" TEXT,
    "county" TEXT,
    "state" TEXT,
    "location" TEXT,
    "groupId" INTEGER NOT NULL,
    "store" BOOLEAN,
    "type_store" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "token" TEXT NOT NULL,
    "active_token" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cam" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT,
    "url" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "way" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "cam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "platecapture" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "camId" INTEGER NOT NULL,
    "date_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "platecapture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alert" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "emails" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "vehicle_type" TEXT,
    "vehicle_color" TEXT,
    "vehicle_model" TEXT,
    "vehicle_make" TEXT,
    "date_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "alert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seenin" (
    "id" SERIAL NOT NULL,
    "platecaptureId" INTEGER NOT NULL,

    CONSTRAINT "seenin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "superior" INTEGER NOT NULL,

    CONSTRAINT "group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permission" (
    "id" SERIAL NOT NULL,
    "table" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "permission" TEXT NOT NULL,
    "obs" TEXT NOT NULL,
    "rota" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissiongroup" (
    "id" SERIAL NOT NULL,
    "permissionId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "permissiongroup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cam" ADD CONSTRAINT "cam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "platecapture" ADD CONSTRAINT "platecapture_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "platecapture" ADD CONSTRAINT "platecapture_camId_fkey" FOREIGN KEY ("camId") REFERENCES "cam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alert" ADD CONSTRAINT "alert_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seenin" ADD CONSTRAINT "seenin_platecaptureId_fkey" FOREIGN KEY ("platecaptureId") REFERENCES "platecapture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissiongroup" ADD CONSTRAINT "permissiongroup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissiongroup" ADD CONSTRAINT "permissiongroup_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
