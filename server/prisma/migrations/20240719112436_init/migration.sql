-- CreateTable
CREATE TABLE "sleep_entries" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "sleepDuration" INTEGER NOT NULL,
    "entryDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sleep_entries_pkey" PRIMARY KEY ("id")
);
