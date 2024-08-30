-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(300) NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "buyingPrice" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "sellingPrice" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
