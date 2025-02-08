-- CreateEnum
CREATE TYPE "PetType" AS ENUM ('DOG', 'CAT', 'BIRD', 'HORSE', 'NAC');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN DEFAULT false,
    "password" TEXT NOT NULL,
    "refreshToken" TEXT,
    "image" TEXT,
    "phoneNumber" TEXT,
    "address" TEXT,
    "city" TEXT,
    "zipCode" TEXT,
    "country" TEXT,
    "twoFactorEnabled" BOOLEAN,
    "isPro" BOOLEAN NOT NULL DEFAULT false,
    "onBoardingComplete" BOOLEAN NOT NULL DEFAULT false,
    "smsNotifications" BOOLEAN NOT NULL DEFAULT false,
    "emailNotifications" BOOLEAN NOT NULL DEFAULT false,
    "stripeId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "PetType" NOT NULL DEFAULT 'DOG',
    "weight" INTEGER,
    "height" INTEGER,
    "description" TEXT,
    "ownerId" TEXT NOT NULL,
    "nacType" TEXT,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "furColor" TEXT,
    "eyeColor" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
