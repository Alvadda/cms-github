-- CreateTable
CREATE TABLE "Stats" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255),
    "fromCach" INTEGER NOT NULL DEFAULT 0,
    "fromApi" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Stats_pkey" PRIMARY KEY ("id")
);
