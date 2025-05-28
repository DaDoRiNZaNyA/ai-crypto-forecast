-- CreateTable
CREATE TABLE "public"."Forecast" (
    "id" SERIAL NOT NULL,
    "asset" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Forecast_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Forecast_asset_idx" ON "public"."Forecast"("asset");
