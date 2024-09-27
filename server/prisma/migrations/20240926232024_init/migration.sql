-- CreateTable
CREATE TABLE "Measure" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "image" TEXT NOT NULL,
    "customer_code" TEXT NOT NULL,
    "datetime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "value" INTEGER,
    "confirmed" BOOLEAN NOT NULL DEFAULT false
);
